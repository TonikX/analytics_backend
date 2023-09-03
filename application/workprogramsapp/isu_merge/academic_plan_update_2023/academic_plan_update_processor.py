import copy

from django.conf import settings
from django.utils import timezone
from sentry_sdk import capture_exception

from gia_practice_app.Practice.models import Practice, PracticeTemplate
from workprogramsapp.isu_merge.academic_plan_update_2023.academic_plan_update_aspect import AcademicPlanUpdateAspect
from workprogramsapp.isu_merge.academic_plan_update_2023.academic_plan_update_utils import AcademicPlanUpdateUtils
from workprogramsapp.isu_merge.academic_plan_update_2023.isu_service import IsuService, IsuUser
from workprogramsapp.isu_merge.academic_plan_update_2023.academic_plan_modules_updater import \
    discipline_block_module_object_relations_updater
from workprogramsapp.isu_merge.academic_plan_update_2023.process_modules_with_hashes import get_ap_jsons
from workprogramsapp.models import ImplementationAcademicPlan, AcademicPlan, DisciplineBlock, \
    WorkProgramChangeInDisciplineBlockModule, WorkProgram, FieldOfStudy, DisciplineBlockModule, \
    WorkProgramInFieldOfStudy, WorkProgramIdStrUpForIsu, Zun, AcademicPlanUpdateConfiguration, \
    СertificationEvaluationTool, DisciplineBlockModuleInIsu, PracticeInFieldOfStudy
from workprogramsapp.workprogram_additions.models import StructuralUnit


class AcademicPlanUpdateProcessor:

    def __init__(self):
        print('-------------------------Сработало')
        self.isu_service = IsuService(
            IsuUser(
                settings.ISU["ISU_CLIENT_ID"],
                settings.ISU["ISU_CLIENT_SECRET"]
            )
        )

    @staticmethod
    def __get_old_academic_plan_by_id__(plan_id):
        print('ap', AcademicPlan.objects.get(ap_isu_id=plan_id))
        return AcademicPlan.objects.get(ap_isu_id=plan_id)

    @staticmethod
    def __del_disciplines_ids_by_academic_plan__(academic_plan_id, new_disciplines_ids):
        wcbms = WorkProgramChangeInDisciplineBlockModule. \
            objects.filter(discipline_block_module__descipline_block__academic_plan__ap_isu_id=academic_plan_id) \
            .exclude(work_program__discipline_code__in=new_disciplines_ids).delete()

    @staticmethod
    def __get_disciplines_ids_by_academic_plan__(academic_plan_id):
        wcbms = WorkProgramChangeInDisciplineBlockModule. \
            objects.filter(discipline_block_module__descipline_block__academic_plan__ap_isu_id=academic_plan_id)
        work_programs_ids = []
        for wcbm in wcbms.all():
            for work_program in wcbm.work_program.all():
                work_programs_ids.append(work_program.discipline_code)
        return work_programs_ids

    @AcademicPlanUpdateAspect.discipline_difference_aspect
    def __update_disciplines__(self, old_academic_plan, isu_academic_plan_json):
        old_disciplines_ids = self.__get_disciplines_ids_by_academic_plan__(old_academic_plan.ap_isu_id)
        new_disciplines_ids = AcademicPlanUpdateUtils.get_disciplines_ids_from_academic_plan_json(
            isu_academic_plan_json)
        # print(old_disciplines_ids)

        to_del = set(map(int, [float(i[0]) for i in [i for i in old_disciplines_ids if i != '']])) - set(
            map(int, new_disciplines_ids))

        self.__del_disciplines_ids_by_academic_plan__(old_academic_plan.ap_isu_id, new_disciplines_ids)
        # for wp in to_del:
        # todo get() returned more than one WorkProgram -- it returned 11!
        # WorkProgramChangeInDisciplineBlockModule. \
        #    objects.filter(work_program=WorkProgram.objects.get(discipline_code=int(wp)),
        #                   discipline_block_module__descipline_block__academic_plan__ap_isu_id=int(
        #                       isu_academic_plan_json.ap_isu_id))
        # WorkProgramChangeInDisciplineBlockModule.delete()
        return to_del

    @staticmethod
    @AcademicPlanUpdateAspect.field_of_study_changes_aspect
    def __process_field_of_study__(field_of_study_object, isu_academic_plan_json):
        if field_of_study_object is not None:
            field_of_study_object.title = isu_academic_plan_json['direction_name']
            field_of_study_object.save()
        else:
            field_of_study_object = FieldOfStudy(
                number=isu_academic_plan_json['direction_code'],
                title=isu_academic_plan_json['direction_name'].strip(),
                qualification=AcademicPlanUpdateUtils.get_qualification(isu_academic_plan_json)
            )
            field_of_study_object.save()
        return field_of_study_object

    @staticmethod
    @AcademicPlanUpdateAspect.discipline_changes_aspect
    def __process_discipline__(work_program_object,
                               isu_academic_plan_json,
                               isu_academic_plan_discipline_json,
                               module_object):
        if work_program_object is None:
            work_program_object = WorkProgram(
                title=isu_academic_plan_discipline_json['name'].strip(),
                # subject_code=isu_academic_plan_discipline_json['plan_order'],
                # qualification=AcademicPlanUpdateUtils.get_qualification(isu_academic_plan_json),
                discipline_code=str(isu_academic_plan_discipline_json['id'])
            )

        # realisation_format = None
        # department = None
        """if wp_dict["format_id"] == 1:
            realisation_format = "offline"
        elif wp_dict["format_id"] == 2:
            realisation_format = "mixed"
        elif wp_dict["format_id"] == 3:
            realisation_format = "online"""

        def choose_department(isu_academic_plan_discipline_json):
            department = None
            department_obj = isu_academic_plan_discipline_json["department"]
            department_by_id = StructuralUnit.objects.filter(isu_id=department_obj["id"])
            if department_by_id.exists():
                department = department_by_id.first()
            else:
                department_by_name = StructuralUnit.objects.filter(title=department_obj["name"])
                if department_by_name.exists():
                    department = department_by_name.first()
                else:
                    department_by_short_name = StructuralUnit.objects.filter(
                        short_name=department_obj["short_name"])
                    if department_by_short_name.exists():
                        department = department_by_short_name.first()
            return department

        def process_hours(hours: list):
            return ", ".join([str(hour) for hour in hours]) if hours else "0, 0, 0, 0"

        practice_hours = [0, 0, 0, 0, 0, 0]
        lecture_hours = [0, 0, 0, 0, 0, 0]
        lab_hours = [0, 0, 0, 0, 0, 0]
        cons_hours = [0, 0, 0, 0, 0, 0]
        srs_hours = [0, 0, 0, 0, 0, 0]
        ze_v_sem = [0, 0, 0, 0, 0, 0]
        contact_hours = [0, 0, 0, 0, 0, 0]
        certification_types = {5: '1', 9: '2', 6: '3', 7: '4', 8: '5'}
        cerf_list = []

        discipline_contents = list(isu_academic_plan_discipline_json["contents"].values())[0]
        for sem_dict in discipline_contents:
            fake_srs = 0
            sem = sem_dict["order"] - 1
            srs_counter = 0
            for type_dict in sem_dict["activities"]:
                wt_id = type_dict["workTypeId"]
                if wt_id == 0:
                    continue
                if wt_id == 1:
                    lecture_hours[sem] = type_dict["volume"]
                    srs_counter += type_dict["volume"]
                elif wt_id == 2:
                    lab_hours[sem] = type_dict["volume"]
                    srs_counter += type_dict["volume"]
                elif wt_id == 3:
                    practice_hours[sem] = type_dict["volume"]
                    srs_counter += type_dict["volume"]
                elif wt_id == 12:
                    cons_hours[sem] = type_dict["volume"]
                    srs_counter += type_dict["volume"]
                elif wt_id == 4:
                    fake_srs = type_dict["volume"]
                else:
                    cerf = СertificationEvaluationTool(type=certification_types[wt_id],
                                                       semester=sem + 1)
                    cerf_list.append(cerf)

            srs_hours[sem] = round(fake_srs - 0.1 * (srs_counter), 2)
            ze_v_sem[sem] = sem_dict["creditPoints"]
            contact_hours[sem] = round(srs_counter * 1.1, 2)
            # last_sem = len(cerf_list)

        # work_program_object.description = isu_academic_plan_discipline_json["description"]
        work_program_object.language = isu_academic_plan_discipline_json["langCode"].lower()
        work_program_object.structural_unit = choose_department(isu_academic_plan_discipline_json)

        work_program_object.practice_hours_v2 = process_hours(practice_hours)
        work_program_object.lecture_hours_v2 = process_hours(lecture_hours)
        work_program_object.lab_hours_v2 = process_hours(lab_hours)
        work_program_object.srs_hours_v2 = process_hours(srs_hours)
        work_program_object.ze_v_sem = process_hours(ze_v_sem)
        work_program_object.contact_hours_v2 = process_hours(contact_hours)
        work_program_object.number_of_semesters = isu_academic_plan_discipline_json["disciplineDuration"]

        work_program_object.save()

        for cerf_to_connect in cerf_list:
            is_cerf_exist = СertificationEvaluationTool.objects.filter(work_program=work_program_object,
                                                                       type=cerf_to_connect.type,
                                                                       semester=cerf_to_connect.semester)
            if not is_cerf_exist.exists():
                cerf_to_connect.work_program = work_program_object
                cerf_to_connect.save()

        # def watchmaker(hours, ze):
        #     ze = ze
        #     sem = 0
        #     all_ze_indexes_in_rpd = 0
        #     # todo was  lecture_hours_v2 = [0, 0, 0, 0], with 10752 index out of range
        #     lecture_hours_v2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        #     ## print(lecture_hours_v2)
        #     for i in hours:
        #         ## print(hours)
        #         if ze[all_ze_indexes_in_rpd] >= 1.0:
        #             lecture_hours_v2[sem] = i
        #             sem += 1
        #         all_ze_indexes_in_rpd += 1
        #
        #     return str(lecture_hours_v2).strip("[]")
        #
        # def structural_unit(isu_academic_plan_discipline_json):
        #     if StructuralUnit.objects.filter(title=str(isu_academic_plan_discipline_json['discipline_doer'].strip())):
        #         st_unit = \
        #             StructuralUnit.objects.filter(title=isu_academic_plan_discipline_json['discipline_doer'].strip())[0]
        #         st_unit.isu_id = int(isu_academic_plan_discipline_json['discipline_doer_id'])
        #         # print('Структурное подразделение записалось')
        #         st_unit.save()
        #     else:
        #         # print(isu_academic_plan_discipline_json['discipline_doer'].strip())
        #         # print(isu_academic_plan_discipline_json['discipline_doer_id'])
        #         StructuralUnit.objects.create(title=isu_academic_plan_discipline_json['discipline_doer'].strip(),
        #                                       isu_id=int(isu_academic_plan_discipline_json['discipline_doer_id']))
        #         st_unit = StructuralUnit.objects.get(title=isu_academic_plan_discipline_json['discipline_doer'].strip(),
        #                                              isu_id=int(
        #                                                  isu_academic_plan_discipline_json['discipline_doer_id']))
        #         # print('Структурное подразделение выбралось')
        #     return st_unit
        #
        # def semesters(ze):
        #     sem = 0
        #     for i in ze:
        #         if i > 0:
        #             sem += 1
        #     return sem
        #
        # ze = AcademicPlanUpdateUtils.get_ze(isu_academic_plan_discipline_json)
        # lec = AcademicPlanUpdateUtils.get_lec(isu_academic_plan_discipline_json)
        # prac = AcademicPlanUpdateUtils.get_prac(isu_academic_plan_discipline_json)
        # lab = AcademicPlanUpdateUtils.get_lab(isu_academic_plan_discipline_json)
        # consultation = AcademicPlanUpdateUtils.get_consultation(isu_academic_plan_discipline_json)
        #
        # work_program_object.number_of_semesters = int(
        #     semesters([float(x) for x in ze])
        # )
        #
        # work_program_object.lecture_hours_v2 = watchmaker(
        #     [float(x) for x in lec],
        #     [float(x) for x in ze]
        # )
        #
        # work_program_object.practice_hours_v2 = watchmaker(
        #     [float(x) for x in prac],
        #     [float(x) for x in ze]
        # )
        #
        # work_program_object.consultation_v2 = watchmaker(
        #     [float(x) for x in consultation],
        #     [float(x) for x in ze]
        # )
        #
        # work_program_object.lab_hours_v2 = watchmaker(
        #     [float(x) for x in lab],
        #     [float(x) for x in ze]
        # )
        #
        # work_program_object.srs_hours_v2 = watchmaker(
        #     [
        #         float(x) for x in
        #         AcademicPlanUpdateUtils.set_srs(
        #             AcademicPlanUpdateUtils.get_srs(
        #                 ze,
        #                 lec,
        #                 prac,
        #                 lab
        #             ),
        #             ze,
        #             lec,
        #             prac,
        #             lab,
        #             module_object.name
        #         )
        #     ],
        #     [float(x) for x in ze]
        # )
        #
        # work_program_object.discipline_code = str(isu_academic_plan_discipline_json['disc_id'])
        # if isu_academic_plan_discipline_json['discipline_doer'] and \
        #         isu_academic_plan_discipline_json['discipline_doer_id'] is not None:
        #     work_program_object.structural_unit = structural_unit(isu_academic_plan_discipline_json)
        # work_program_object.save()
        return work_program_object

    @staticmethod
    # @AcademicPlanUpdateAspect.academic_plan_changes_aspect
    def __process_academic_plan__(isu_academic_plan_json):
        # if implementation_academic_plan_object is not None:
        #     implementation_academic_plan_object.op_isu_id = int(isu_academic_plan_json['edu_program_id'])
        #     implementation_academic_plan_object.ap_isu_id = int(isu_academic_plan_json['id'])
        #     implementation_academic_plan_object.ns_id = int(isu_academic_plan_json['ns_id'])
        #     implementation_academic_plan_object.title = isu_academic_plan_json['edu_program_name']
        #     implementation_academic_plan_object.field_of_study.add(field_of_study)
        #     implementation_academic_plan_object.save()
        # else:
        #     implementation_academic_plan_object = ImplementationAcademicPlan(
        #         title=isu_academic_plan_json['edu_program_name'],
        #         year=isu_academic_plan_json['selection_year'],
        #         language=AcademicPlanUpdateUtils.get_op_language(isu_academic_plan_json),
        #         qualification=AcademicPlanUpdateUtils.get_qualification(isu_academic_plan_json)
        #     )
        #     implementation_academic_plan_object.op_isu_id = int(isu_academic_plan_json['edu_program_id'])
        #     implementation_academic_plan_object.ap_isu_id = int(isu_academic_plan_json['id'])
        #     implementation_academic_plan_object.ns_id = int(isu_academic_plan_json['ns_id'])
        #     implementation_academic_plan_object.title = isu_academic_plan_json['edu_program_name']
        #     implementation_academic_plan_object.save()
        #     implementation_academic_plan_object.field_of_study.add(field_of_study)
        #     implementation_academic_plan_object.save()
        if AcademicPlan.objects.filter(ap_isu_id=int(isu_academic_plan_json['id'])).exists():
            academic_plan_object = AcademicPlan.objects.get(ap_isu_id=int(isu_academic_plan_json['id']))
            # ToDo: Тут сделать удалитель привязок
            # implementation_academic_plan_object.academic_plan = academic_plan_object
            # implementation_academic_plan_object.save()
        else:
            academic_plan_object = AcademicPlan()
            academic_plan_object.ap_isu_id = int(isu_academic_plan_json['id'])
            # implementation_academic_plan_object.academic_plan = academic_plan_object
            # implementation_academic_plan_object.save()
        return academic_plan_object  # , implementation_academic_plan_object

    @staticmethod
    @AcademicPlanUpdateAspect.discipline_block_changes_aspect
    def __process_discipline_block__(discipline_block_object, isu_academic_plan_block_json, academic_plan_object,
                                     isu_academic_plan_json):
        if discipline_block_object is not None:
            return discipline_block_object
        else:
            discipline_block_object = DisciplineBlock(
                name=isu_academic_plan_block_json['blockName'],
                academic_plan=academic_plan_object
            )
            discipline_block_object.save()
        return discipline_block_object

    @staticmethod
    def __del_block_modules__(block_modules_to_del_ids, isu_academic_plan_json, discipline_block_object):

        bm = DisciplineBlockModule.objects.filter(
            descipline_block=discipline_block_object,
            descipline_block__academic_plan__ap_isu_id=isu_academic_plan_json['id']) \
            .exclude(id__in=block_modules_to_del_ids).delete()

    @staticmethod
    def __del_block_modules__by__father__module__(block_modules_not_for_del_ids, discipline_block_module_object,
                                                  isu_academic_plan_block_module_json,
                                                  isu_academic_plan_json,
                                                  father_module_json):
        bms = DisciplineBlockModule.objects.filter(father_module=discipline_block_module_object) \
            .exclude(id__in=block_modules_not_for_del_ids)
        for bm in bms:
            father_module_id = father_module_json.get("id") if father_module_json else None
            DisciplineBlockModuleInIsu.objects.filter(
                module=bm,
                academic_plan=AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]
                # order=AcademicPlanUpdateUtils().get_module_order(isu_academic_plan_block_module_json)
            ).delete()
            bm.father_module.remove(discipline_block_module_object)

    @staticmethod
    def __del_father_block_modules__(block_modules_not_for_del_ids,
                                     discipline_block_object,
                                     isu_academic_plan_json, ):

        bms = DisciplineBlockModule.objects.filter(father_module=None, descipline_block__academic_plan=AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]) \
            .exclude(id__in=block_modules_not_for_del_ids)
        for bm in bms:
            DisciplineBlockModuleInIsu.objects.filter(
                module=bm,
                academic_plan=AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]
                # order=AcademicPlanUpdateUtils().get_module_order(isu_academic_plan_block_module_json)
            ).delete()
            bm.descipline_block.remove(discipline_block_object)

    @staticmethod
    def __del_block__(block_to_del_ids, isu_academic_plan_json):

        b = DisciplineBlock.objects.filter(
            academic_plan__ap_isu_id=isu_academic_plan_json['id']) \
            .exclude(id__in=block_to_del_ids).delete()

    @staticmethod
    @AcademicPlanUpdateAspect.discipline_block_module_changes_aspect
    def __process_block_module__(discipline_block_module_object,
                                 isu_academic_plan_block_module_json,
                                 # discipline_block_object,
                                 isu_academic_plan_json,
                                 father_module
                                 ):
        father_module_id = father_module.get("id") if father_module else None
        new_id = isu_academic_plan_block_module_json.get("new_id")
        if str(isu_academic_plan_block_module_json["id"]) == new_id:
            new_id = None
        if discipline_block_module_object is None:
            discipline_block_module_object = DisciplineBlockModule(
                name=isu_academic_plan_block_module_json['name'],
                module_isu_id=isu_academic_plan_block_module_json['id'],
                # order=AcademicPlanUpdateUtils().get_module_order(isu_academic_plan_block_module_json)
            )
            discipline_block_module_object.save()
        if new_id:
            if not DisciplineBlockModuleInIsu.objects.filter(
                    module__name=isu_academic_plan_block_module_json['name'],
                    new_id=new_id,
                    isu_father_id=father_module_id,
                    academic_plan=AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]
            ).exists():
                discipline_block_module_object_in_isu = DisciplineBlockModuleInIsu(
                    module=discipline_block_module_object,
                    new_id=new_id,
                    isu_id=isu_academic_plan_block_module_json['id'],
                    isu_father_id=father_module_id,
                    academic_plan=AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]
                    # order=AcademicPlanUpdateUtils().get_module_order(isu_academic_plan_block_module_json)
                )
                discipline_block_module_object_in_isu.save()
        else:
            if not DisciplineBlockModuleInIsu.objects.filter(
                    module__name=isu_academic_plan_block_module_json['name'],
                    isu_id=isu_academic_plan_block_module_json['id'],
                    isu_father_id=father_module_id,
                    academic_plan=AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]
            ).exists():
                discipline_block_module_object_in_isu = DisciplineBlockModuleInIsu(
                    module=discipline_block_module_object,
                    isu_id=isu_academic_plan_block_module_json['id'],
                    isu_father_id=father_module_id,
                    academic_plan=AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]
                    # order=AcademicPlanUpdateUtils().get_module_order(isu_academic_plan_block_module_json)
                )
                discipline_block_module_object_in_isu.save()

        rules_ids = {1: "choose_n_from_m", 2: "all", 21: "any_quantity", 41: "by_credit_units",
                     61: "no_more_than_n_credits"}
        discipline_block_module_object.selection_rule = rules_ids[
            isu_academic_plan_block_module_json["choiceParameterId"]]
        discipline_block_module_object.selection_parametr = ", ".join(
            [str(el) for el in isu_academic_plan_block_module_json["rules"]]) if \
            isu_academic_plan_block_module_json["rules"] else None
        discipline_block_module_object.save()

        return discipline_block_module_object

    @staticmethod
    @AcademicPlanUpdateAspect.linked_data_changes_aspect
    def __process_practice_linked_data__(discipline_block_module_object,
                                         practice_object,
                                         isu_academic_plan_discipline_json,
                                         isu_academic_plan_json):

        # ToDo: Сделать обработку случая option == 'Optionally' (Приоритет --+)
        replaceable = isu_academic_plan_discipline_json["replaceable"]
        option = 'Required' if not replaceable else 'Optionally'

        old_work_program_change_in_discipline_block_module = None
        old_practice_in_field_of_study = None

        """if (option == 'Optionally' and WorkProgramChangeInDisciplineBlockModule.objects.filter(
                discipline_block_module=discipline_block_module_object,
                change_type=option,
                # subject_code=AcademicPlanUpdateUtils.num_to_int(
                #     isu_academic_plan_discipline_json['plan_order'],
                #     isu_academic_plan_discipline_json['discipline_name']
                # )
         ).exists()):
            old_work_program_change_in_discipline_block_module = WorkProgramChangeInDisciplineBlockModule.objects.get(
                discipline_block_module=discipline_block_module_object,
                change_type=option,
                # subject_code=AcademicPlanUpdateUtils.num_to_int(
                #     isu_academic_plan_discipline_json['plan_order'],
                #     isu_academic_plan_discipline_json['discipline_name']
                # )
            )
            list_of_start_terms = [int(sem) for sem in isu_academic_plan_discipline_json["contents"]]
            old_work_program_change_in_discipline_block_module.semester_start = list_of_start_terms
            old_work_program_change_in_discipline_block_module.save()

            work_program_change_in_discipline_block_module = copy.deepcopy(
                old_work_program_change_in_discipline_block_module)
            work_program_change_in_discipline_block_module.save()

            if PracticeInFieldOfStudy.objects.filter(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
            ).exists():
                old_practice_in_field_of_study = PracticeInFieldOfStudy.objects.get(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
                )
                practice_in_field_of_study = copy.deepcopy(old_practice_in_field_of_study)
                practice_in_field_of_study.save()
            else:
                practice_in_field_of_study = PracticeInFieldOfStudy(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
                )
                practice_in_field_of_study.save()"""
        if WorkProgramChangeInDisciplineBlockModule.objects.filter(
                discipline_block_module=discipline_block_module_object,
                change_type=option,
                practice=practice_object
        ).exists():
            old_work_program_change_in_discipline_block_module = \
                WorkProgramChangeInDisciplineBlockModule.objects.filter(
                    discipline_block_module=discipline_block_module_object,
                    #=option,
                    practice=practice_object
                )[0]
            list_of_start_terms = [int(sem) for sem in isu_academic_plan_discipline_json["contents"]]
            old_work_program_change_in_discipline_block_module.semester_start = list_of_start_terms
            old_work_program_change_in_discipline_block_module.save()
            work_program_change_in_discipline_block_module = copy \
                .deepcopy(old_work_program_change_in_discipline_block_module)
            if PracticeInFieldOfStudy.objects.filter(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
            ).exists():
                old_practice_in_field_of_study = PracticeInFieldOfStudy.objects.get(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
                )
                practice_in_field_of_study = copy.deepcopy(old_practice_in_field_of_study)
                practice_in_field_of_study.save()
            else:
                practice_in_field_of_study = PracticeInFieldOfStudy(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
                )
                practice_in_field_of_study.save()
        else:
            work_program_change_in_discipline_block_module = WorkProgramChangeInDisciplineBlockModule()
            work_program_change_in_discipline_block_module.change_type = option
            work_program_change_in_discipline_block_module.discipline_block_module = discipline_block_module_object
            list_of_start_terms = [int(sem) for sem in isu_academic_plan_discipline_json["contents"]]
            work_program_change_in_discipline_block_module.semester_start = list_of_start_terms
            work_program_change_in_discipline_block_module.save()
            work_program_change_in_discipline_block_module.practice.add(practice_object)
            work_program_change_in_discipline_block_module.save()
            print(work_program_change_in_discipline_block_module)
            if PracticeInFieldOfStudy.objects.filter(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
            ).exists():
                old_practice_in_field_of_study = PracticeInFieldOfStudy.objects.get(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
                )
                practice_in_field_of_study = copy.deepcopy(old_practice_in_field_of_study)
                practice_in_field_of_study.save()
            else:
                practice_in_field_of_study = PracticeInFieldOfStudy(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    practice=practice_object
                )
                practice_in_field_of_study.save()
        return old_work_program_change_in_discipline_block_module, \
               old_practice_in_field_of_study, \
               work_program_change_in_discipline_block_module, \
               practice_in_field_of_study

    @staticmethod
    @AcademicPlanUpdateAspect.linked_data_changes_aspect
    def __process_linked_data__(discipline_block_module_object,
                                work_program_object,
                                isu_academic_plan_discipline_json,
                                isu_academic_plan_json):

        # ToDo: Сделать обработку случая option == 'Optionally' (Приоритет --+)
        replaceable = isu_academic_plan_discipline_json["replaceable"]
        option = 'Required' if not replaceable else 'Optionally'

        old_work_program_change_in_discipline_block_module = None
        old_work_program_in_field_of_study = None
        """if (option == 'Optionally' and WorkProgramChangeInDisciplineBlockModule.objects.filter(
                discipline_block_module=discipline_block_module_object,
                change_type=option,
                # subject_code=AcademicPlanUpdateUtils.num_to_int(
                #     isu_academic_plan_discipline_json['plan_order'],
                #     isu_academic_plan_discipline_json['discipline_name']
                # )
        ).exists()):
            old_work_program_change_in_discipline_block_module = WorkProgramChangeInDisciplineBlockModule.objects.get(
                discipline_block_module=discipline_block_module_object,
                change_type=option,
                # subject_code=AcademicPlanUpdateUtils.num_to_int(
                #     isu_academic_plan_discipline_json['plan_order'],
                #     isu_academic_plan_discipline_json['discipline_name']
                # )
            )
            list_of_start_terms = [int(sem) for sem in isu_academic_plan_discipline_json["contents"]]
            old_work_program_change_in_discipline_block_module.semester_start = list_of_start_terms
            old_work_program_change_in_discipline_block_module.save()

            work_program_change_in_discipline_block_module = copy.deepcopy(
                old_work_program_change_in_discipline_block_module)
            work_program_change_in_discipline_block_module.save()

            if WorkProgramInFieldOfStudy.objects.filter(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
            ).exists():
                old_work_program_in_field_of_study = WorkProgramInFieldOfStudy.objects.get(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
                )
                work_program_in_field_of_study = copy.deepcopy(old_work_program_in_field_of_study)
                work_program_in_field_of_study.save()
            else:
                work_program_in_field_of_study = WorkProgramInFieldOfStudy(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
                )
                work_program_in_field_of_study.save()"""
        if WorkProgramChangeInDisciplineBlockModule.objects.filter(
                discipline_block_module=discipline_block_module_object,
                #change_type=option,
                work_program=work_program_object
        ).exists():
            old_work_program_change_in_discipline_block_module = \
                WorkProgramChangeInDisciplineBlockModule.objects.filter(
                    discipline_block_module=discipline_block_module_object,
                    change_type=option,
                    work_program=work_program_object
                )[0]
            list_of_start_terms = [int(sem) for sem in isu_academic_plan_discipline_json["contents"]]
            old_work_program_change_in_discipline_block_module.semester_start = list_of_start_terms
            old_work_program_change_in_discipline_block_module.save()
            work_program_change_in_discipline_block_module = copy \
                .deepcopy(old_work_program_change_in_discipline_block_module)
            if WorkProgramInFieldOfStudy.objects.filter(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
            ).exists():
                old_work_program_in_field_of_study = WorkProgramInFieldOfStudy.objects.get(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
                )
                work_program_in_field_of_study = copy.deepcopy(old_work_program_in_field_of_study)
                work_program_in_field_of_study.save()
            else:
                work_program_in_field_of_study = WorkProgramInFieldOfStudy(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
                )
                work_program_in_field_of_study.save()
        else:
            work_program_change_in_discipline_block_module = WorkProgramChangeInDisciplineBlockModule()
            work_program_change_in_discipline_block_module.change_type = option
            work_program_change_in_discipline_block_module.discipline_block_module = discipline_block_module_object
            list_of_start_terms = [int(sem) for sem in isu_academic_plan_discipline_json["contents"]]
            work_program_change_in_discipline_block_module.semester_start = list_of_start_terms
            work_program_change_in_discipline_block_module.save()
            work_program_change_in_discipline_block_module.work_program.add(work_program_object)
            work_program_change_in_discipline_block_module.save()
            print(work_program_change_in_discipline_block_module)
            if WorkProgramInFieldOfStudy.objects.filter(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
            ).exists():
                old_work_program_in_field_of_study = WorkProgramInFieldOfStudy.objects.get(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
                )
                work_program_in_field_of_study = copy.deepcopy(old_work_program_in_field_of_study)
                work_program_in_field_of_study.save()
            else:
                work_program_in_field_of_study = WorkProgramInFieldOfStudy(
                    work_program_change_in_discipline_block_module=work_program_change_in_discipline_block_module,
                    work_program=work_program_object
                )
                work_program_in_field_of_study.save()
        return old_work_program_change_in_discipline_block_module, \
               old_work_program_in_field_of_study, \
               work_program_change_in_discipline_block_module, \
               work_program_in_field_of_study

    @staticmethod
    @AcademicPlanUpdateAspect.work_program_id_str_up_for_isu_changes_aspect
    def __process_work_program_id_str_up_for_isu__(work_program_id_str_up_for_isu_object,
                                                   work_program_in_field_of_study_object,
                                                   isu_academic_plan_json,
                                                   isu_academic_plan_discipline_json):
        if work_program_id_str_up_for_isu_object is None:
            work_program_id_str_up_for_isu_object = WorkProgramIdStrUpForIsu(
                id_str_up=int(isu_academic_plan_discipline_json['str_up_id']),
                ns_id=int(isu_academic_plan_json['ns_id']),
                work_program_in_field_of_study=work_program_in_field_of_study_object
            )
            work_program_id_str_up_for_isu_object.number = AcademicPlanUpdateUtils.num_to_int(
                isu_academic_plan_discipline_json['plan_order'],
                isu_academic_plan_discipline_json['discipline_name']
            )
            work_program_id_str_up_for_isu_object.dis_id = isu_academic_plan_discipline_json['dis_id']
            work_program_id_str_up_for_isu_object.ze_v_sem = AcademicPlanUpdateUtils.ze_to_format(
                AcademicPlanUpdateUtils.get_ze(
                    isu_academic_plan_discipline_json))
            work_program_id_str_up_for_isu_object.lec_v_sem = AcademicPlanUpdateUtils.ze_to_format(
                AcademicPlanUpdateUtils.get_lec(
                    isu_academic_plan_discipline_json))
            work_program_id_str_up_for_isu_object.prak_v_sem = AcademicPlanUpdateUtils.ze_to_format(
                AcademicPlanUpdateUtils.get_prac(
                    isu_academic_plan_discipline_json))
            work_program_id_str_up_for_isu_object.lab_v_sem = AcademicPlanUpdateUtils.ze_to_format(
                AcademicPlanUpdateUtils.get_lab(
                    isu_academic_plan_discipline_json))
            work_program_id_str_up_for_isu_object.ekz_v_sem = AcademicPlanUpdateUtils.ze_to_format(
                AcademicPlanUpdateUtils.set_control(
                    isu_academic_plan_discipline_json['exam'],
                    int(float(isu_academic_plan_json['training_period']))
                ))
            work_program_id_str_up_for_isu_object.zach_v_sem = AcademicPlanUpdateUtils.ze_to_format(
                AcademicPlanUpdateUtils.set_control(
                    isu_academic_plan_discipline_json['credit'],
                    int(float(isu_academic_plan_json['training_period']))
                ))
            work_program_id_str_up_for_isu_object.dif_zach_v_sem = AcademicPlanUpdateUtils.ze_to_format(
                AcademicPlanUpdateUtils.set_control(
                    isu_academic_plan_discipline_json['diff_credit'],
                    int(float(isu_academic_plan_json['training_period']))
                ))
            work_program_id_str_up_for_isu_object.kp_v_sem = AcademicPlanUpdateUtils.ze_to_format(
                AcademicPlanUpdateUtils.set_control(
                    isu_academic_plan_discipline_json['course_project'],
                    int(float(isu_academic_plan_json['training_period']))
                ))
            work_program_id_str_up_for_isu_object.save()

            for zun in Zun.objects.filter(
                    wp_in_fs_saved_fk_id_str_up=int(isu_academic_plan_discipline_json['str_up_id'])
            ):
                zun.wp_in_fs = work_program_in_field_of_study_object
                zun.save()
        return work_program_id_str_up_for_isu_object

    @staticmethod
    def __del_work_program_in_field_of_study__(discipline_block_module, new_disciplines_ids, isu_academic_plan_json):
        # ToDo: Сделать обработку удалятора модуля из блока, как в __del_old_wpcbms_by_module__ (так, чтобы модуль не удалялся вообще) (приоритет +++)
        wcbms = WorkProgramInFieldOfStudy. \
            objects.filter(
            work_program_change_in_discipline_block_module__discipline_block_module=discipline_block_module) \
            .exclude(work_program__id__in=new_disciplines_ids)
        for wcbm in wcbms:
            wcbm.backup_module=DisciplineBlockModule.objects.get(change_blocks_of_work_programs_in_modules__zuns_for_cb=wcbm)
            wcbm.backup_ap = AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]
            wcbm.work_program_change_in_discipline_block_module = None
            wcbm.save()

    @staticmethod
    def __del_practice_in_field_of_study__(discipline_block_module, new_disciplines_ids, isu_academic_plan_json):
        pfos = PracticeInFieldOfStudy. \
            objects.filter(
            work_program_change_in_discipline_block_module__discipline_block_module=discipline_block_module) \
            .exclude(practice__id__in=new_disciplines_ids)
        for pfo in pfos:
            pfo.backup_module = DisciplineBlockModule.objects.get(
                change_blocks_of_work_programs_in_modules__zuns_for_cb_for_practice=pfo)
            pfo.backup_ap = AcademicPlan.objects.filter(ap_isu_id=isu_academic_plan_json['id'])[0]
            pfo.work_program_change_in_discipline_block_module = None
            pfo.save()



    @staticmethod
    def __del_old_wpcbms_by_module__(discipline_block_module_object,
                                     work_program_change_in_discipline_block_modules_not_for_del):
        wcbms = WorkProgramChangeInDisciplineBlockModule. \
            objects.filter(discipline_block_module=discipline_block_module_object, work_program=None).delete()
        wcbms = WorkProgramChangeInDisciplineBlockModule. \
            objects.filter(discipline_block_module=discipline_block_module_object).exclude \
            (discipline_block_module=discipline_block_module_object,
             work_program__id__in=work_program_change_in_discipline_block_modules_not_for_del).delete()

    @staticmethod
    def recursion_module_updater(module,
                                 isu_academic_plan_json,
                                 discipline_block_object=None,
                                 father_module=None,

                                 ):
        """

        :param module: словарь с модулем
        :param isu_academic_plan_json: Json со всем УП
        :param discipline_block_object: django-объект блока (посылается только для тех модулей которые включены непосредственно в блок)
        :param father_module: словарь с модулем отцом (посылается только для модулей, которые вложенны в модуль, а не в блок)
        :return: модуль или РПД (РПП)

        Метод обрабатывает переданный блок модуля или РПД. Модуль сам определяет тип объекта.
        Если внутри переданного модуля есть модули, модуль рекурсивно вызовет обработку всех вложенных модулей.
        """

        # block_modules_to_del_ids.append(discipline_block_module_object.id)
        disciplines_for_del_in_module = []
        work_program_change_in_discipline_block_modules_not_for_del = []
        modules_not_for_del = []
        discipline_not_for_del = []
        practices_not_for_del = []
        if module['type'] == "module":
            """
            ToDo: предполагается доработать функционал поиска модуля на нашей стороне и создания нового в случае необходимости в 
            AcademicPlanUpdateProcessor.__process_block_module__ и в его дектораторе  @AcademicPlanUpdateAspect.discipline_block_module_changes_aspect
            __process_block_module__ - создает или изменяет существующий объект
            discipline_block_module_changes_aspect - ищет существующий объект
            """
            discipline_block_module_object = AcademicPlanUpdateProcessor \
                .__process_block_module__(
                module,
                isu_academic_plan_json,
                # discipline_block_object,
                father_module
            )
            if discipline_block_object is not None:
                print('Not Father', discipline_block_object)
                discipline_block_module_object.descipline_block.add(discipline_block_object)
                discipline_block_module_object.save()
                discipline_block_object = None
            elif father_module is not None:
                new_id = father_module.get("new_id")

                if str(father_module.get("id")) == new_id:
                    new_id = None
                if new_id:
                    father_module_object = DisciplineBlockModule.objects.get(isu_module__new_id=new_id)
                    discipline_block_module_object.father_module.add(DisciplineBlockModule.objects.filter(
                        name=father_module['name'],
                        isu_module__new_id=new_id,
                        # order=AcademicPlanUpdateUtils().get_module_order(isu_academic_plan_block_module_json)
                    )[0])
                else:
                    discipline_block_module_object.father_module.add(DisciplineBlockModule.objects.filter(
                        name=father_module['name'],
                        isu_module__isu_id=father_module['id'],
                        isu_module__new_id=None
                        # order=AcademicPlanUpdateUtils().get_module_order(isu_academic_plan_block_module_json)
                    )[0])

                discipline_block_module_object.save()
            father_module = module
            for children_module_dict in module['children']:
                """
                Одна из Важнейших частей кода, тут происходит вызов обработчика вложенного модуля или РПД
                """
                module = children_module_dict
                children_module = AcademicPlanUpdateProcessor.recursion_module_updater(module,
                                                                                       isu_academic_plan_json, None,
                                                                                       father_module)
                if children_module_dict['type'] == "module":
                    modules_not_for_del.append(children_module.id)
                if children_module_dict['type'] == "discipline":
                    if "practice" in children_module_dict["rpdUrl"]:
                        practices_not_for_del.append(
                            children_module.id)
                    else:
                        discipline_not_for_del.append(
                            children_module.id)

                if children_module == None:
                    continue

            AcademicPlanUpdateProcessor.__del_block_modules__by__father__module__(modules_not_for_del,
                                                                                  discipline_block_module_object,
                                                                                  module,
                                                                                  isu_academic_plan_json,
                                                                                  father_module
                                                                                  )

            if module["blockName"] == "Блок 2. Практика":
                AcademicPlanUpdateProcessor.__del_practice_in_field_of_study__(discipline_block_module_object,
                                                                               practices_not_for_del,
                                                                               isu_academic_plan_json)

            AcademicPlanUpdateProcessor.__del_work_program_in_field_of_study__(discipline_block_module_object,
                                                                               discipline_not_for_del,
                                                                               isu_academic_plan_json)
            if discipline_not_for_del:
                AcademicPlanUpdateProcessor.__del_old_wpcbms_by_module__(discipline_block_module_object,
                                                                         discipline_not_for_del)

            return discipline_block_module_object

        elif module['type'] == "discipline":
            if father_module == None:
                return None
            isu_academic_plan_discipline_json = module
            # for isu_academic_plan_discipline_json in module['contents']:
            print("---------------", father_module['name'], father_module['id'])
            father_module_object = DisciplineBlockModule.objects.filter(
                name=father_module['name'],
                isu_module__isu_id=father_module['id'],
                # order=AcademicPlanUpdateUtils().get_module_order(isu_academic_plan_block_module_json)
            )[0]
            if "practice" in isu_academic_plan_discipline_json["rpdUrl"]:
                practice_object = AcademicPlanUpdateProcessor.__process_practice__(
                    isu_academic_plan_json,
                    isu_academic_plan_discipline_json,
                    father_module_object
                )
                print("PRACTICE", practice_object)
                practice_in_field_of_study_object, \
                work_program_change_in_discipline_block_module_object = \
                    AcademicPlanUpdateProcessor.__process_practice_linked_data__(
                        father_module_object,
                        practice_object,
                        isu_academic_plan_discipline_json,
                        isu_academic_plan_json
                    )
                work_program_change_in_discipline_block_modules_not_for_del.append(
                    work_program_change_in_discipline_block_module_object.id)
                return practice_object

            work_program_object = AcademicPlanUpdateProcessor.__process_discipline__(
                isu_academic_plan_json,
                isu_academic_plan_discipline_json,
                father_module_object
            )
            # print(practice_object)
            work_program_in_field_of_study_object, \
            work_program_change_in_discipline_block_module_object = \
                AcademicPlanUpdateProcessor.__process_linked_data__(
                    father_module_object,
                    work_program_object,
                    isu_academic_plan_discipline_json,
                    isu_academic_plan_json
                )
            work_program_change_in_discipline_block_modules_not_for_del.append(
                work_program_change_in_discipline_block_module_object.id)
            disciplines_for_del_in_module.append(work_program_object.id)
            # AcademicPlanUpdateProcessor.__del_work_program_in_field_of_study__(father_module_object,
            #                                                                   disciplines_for_del_in_module)
            # AcademicPlanUpdateProcessor.__del_old_wpcbms_by_module__(father_module_object,
            #                                                         work_program_change_in_discipline_block_modules_not_for_del)
            return work_program_object

    def update_academic_plans(self):
        academic_plans_ids = AcademicPlanUpdateConfiguration.objects.filter(updates_enabled=True,
                                                                            over_23=True).values_list(
            'academic_plan_id', flat=True)
        father_module_not_for_del = []

        # Магия для того чтобы починить поломанные модули в ИСУ
        get_ap_jsons()
        # ------
        for plan_id in academic_plans_ids:
            try:
                plan_id = str(plan_id)

                old_academic_plan = self.__get_old_academic_plan_by_id__(plan_id)
                imp = ImplementationAcademicPlan.objects.get(academic_plan=old_academic_plan)
                isu_academic_plan_json = imp.isu_modified_plan
                # isu_academic_plan_json = json.loads(json.dumps(test_plan['result']))
                if isu_academic_plan_json is not None:
                    # self.__update_disciplines__(old_academic_plan, isu_academic_plan_json)

                    # field_of_study = self.__process_field_of_study__(isu_academic_plan_json)

                    academic_plan = self.__process_academic_plan__(isu_academic_plan_json)
                    block_to_del_ids = []
                    for block in isu_academic_plan_json['structure']:
                        discipline_block_object = self.__process_discipline_block__(
                            block,
                            academic_plan,
                            isu_academic_plan_json
                        )
                        block_to_del_ids.append(discipline_block_object.id)
                        block_modules_to_del_ids = []

                        for module in block['children']:
                            print('-- Module lvl 1')
                            print('block', discipline_block_object)
                            father_module = self.recursion_module_updater(module, isu_academic_plan_json,
                                                                          discipline_block_object, None)
                            father_module_not_for_del.append(father_module.id)


                            if father_module == None:
                                print('!!!!!!!!!!!!!!!!!!!')
                                continue
                        AcademicPlanUpdateProcessor.__del_father_block_modules__(father_module_not_for_del,
                                                                                 discipline_block_object,
                                                                                 isu_academic_plan_json)
                        print(block_modules_to_del_ids)
                        # self.__del_block_modules__(block_modules_to_del_ids, isu_academic_plan_json,
                        #                           discipline_block_object)
                    #
                    # print(block_to_del_ids)
                    # self.__del_block__(block_to_del_ids, isu_academic_plan_json,
                    #                   )

                    academic_plan_update_configuration = AcademicPlanUpdateConfiguration.objects \
                        .get(academic_plan_id=plan_id)
                    academic_plan_update_configuration.updated_date_time = timezone.now()
                    academic_plan_update_configuration.save()
            except Exception as e:
                import traceback
                traceback.print_exc()
                print(e)
                # capture_exception(e)

    @staticmethod
    @AcademicPlanUpdateAspect.practice_changes_aspect
    def __process_practice__(practice_object,
                             isu_academic_plan_json,
                             isu_academic_plan_practice_json,
                             module_object):
        if practice_object is None:
            pt = PracticeTemplate.objects.create()
            practice_object = Practice(
                title=isu_academic_plan_practice_json['name'].strip(),
                # subject_code=isu_academic_plan_practice_json['plan_order'],
                # qualification=AcademicPlanUpdateUtils.get_qualification(isu_academic_plan_json),
                prac_isu_id=str(isu_academic_plan_practice_json['id']),
                discipline_code=str(isu_academic_plan_practice_json['id'])
            )
            practice_object.save()
            practice_object.practice_base = pt
            practice_object.save()


        def choose_department(isu_academic_plan_discipline_json):
            department = None
            department_obj = isu_academic_plan_discipline_json["department"]
            department_by_id = StructuralUnit.objects.filter(isu_id=department_obj["id"])
            if department_by_id.exists():
                department = department_by_id.first()
            else:
                department_by_name = StructuralUnit.objects.filter(title=department_obj["name"])
                if department_by_name.exists():
                    department = department_by_name.first()
                else:
                    department_by_short_name = StructuralUnit.objects.filter(
                        short_name=department_obj["short_name"])
                    if department_by_short_name.exists():
                        department = department_by_short_name.first()
            return department

        def process_hours(hours: list):
            return ", ".join([str(hour) for hour in hours]) if hours else "0, 0, 0, 0"

        ze_v_sem = [0, 0, 0, 0, 0, 0]
        certification_types = {5: '1', 9: '2', 6: '3', 7: '4', 8: '5'}
        cerf_list = []
        discipline_contents = list(isu_academic_plan_practice_json["contents"].values())[0]
        for sem_dict in discipline_contents:
            sem = sem_dict["order"] - 1
            ze_v_sem[sem] = sem_dict["creditPoints"]
            activity_list = []
            for activity in sem_dict["activities"]:

                if activity["workTypeId"] in certification_types.keys():
                    activity_list.append(int(certification_types[activity["workTypeId"]]))
            cerf_list.append(activity_list)
            #last_sem = len(cerf_list)

        # work_program_object.description = isu_academic_plan_discipline_json["description"]
        practice_object.language = isu_academic_plan_practice_json["langCode"].lower()
        practice_object.structural_unit = choose_department(isu_academic_plan_practice_json)
        practice_object.ze_v_sem = process_hours(ze_v_sem)
        practice_object.number_of_semesters = isu_academic_plan_practice_json["disciplineDuration"]
        practice_object.evaluation_tools_v_sem = str(cerf_list)

        practice_object.save()

        """if wp_dict["format_id"] == 1:
            realisation_format = "offline"
        elif wp_dict["format_id"] == 2:
            realisation_format = "mixed"
        elif wp_dict["format_id"] == 3:
            realisation_format = "online"""


        return practice_object
