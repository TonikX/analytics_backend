from workprogramsapp.models import ImplementationAcademicPlan, AcademicPlan, DisciplineBlock, \
    WorkProgramChangeInDisciplineBlockModule, WorkProgram, FieldOfStudy, DisciplineBlockModule, \
    WorkProgramInFieldOfStudy, WorkProgramIdStrUpForIsu, Zun, AcademicPlanUpdateConfiguration
from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_utils import AcademicPlanUpdateUtils
import copy


class AcademicPlanUpdateAspect:

    @staticmethod
    def discipline_difference_aspect(func):
        def wrapper(*args, **kwargs):
            # print("Something is happening before the function is called.")
            result = func(*args, **kwargs)
            # todo log deleted ids
            return result

        return wrapper

    @staticmethod
    def field_of_study_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_json = args[0]

            if FieldOfStudy.objects.filter(
                    number=isu_academic_plan_json['direction_code'],
                    qualification=AcademicPlanUpdateUtils.get_qualification(isu_academic_plan_json)
            ).exists():
                old_field_of_study_object = FieldOfStudy.objects.get(
                    number=isu_academic_plan_json['direction_code'],
                    qualification=AcademicPlanUpdateUtils.get_qualification(isu_academic_plan_json)
                )
            else:
                old_field_of_study_object = None

            updated_field_of_study = func(copy.deepcopy(old_field_of_study_object), *args, **kwargs)

            validated_field = ['title']
            for attr, value in updated_field_of_study.__dict__.items():
                if old_field_of_study_object is None or old_field_of_study_object.__dict__[attr] != value \
                        and validated_field.__contains__(attr):
                    print(attr, value)

            return updated_field_of_study

        return wrapper

    @staticmethod
    def academic_plan_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_json = args[0]

            if ImplementationAcademicPlan.objects.filter(
                    title=isu_academic_plan_json['edu_program_name'],
                    ap_isu_id=int(isu_academic_plan_json['id']),
                    year=isu_academic_plan_json['selection_year'],
                    language=AcademicPlanUpdateUtils.get_op_language(isu_academic_plan_json),
                    qualification=AcademicPlanUpdateUtils.get_qualification(isu_academic_plan_json)
            ).exists():
                old_implementation_academic_plan_object = ImplementationAcademicPlan.objects.get(
                    title=isu_academic_plan_json['edu_program_name'],
                    ap_isu_id=int(isu_academic_plan_json['id']),
                    year=isu_academic_plan_json['selection_year'],
                    qualification=AcademicPlanUpdateUtils.get_qualification(isu_academic_plan_json)
                )
            else:
                old_implementation_academic_plan_object = None

            updated_academic_plan_object, updated_implementation_academic_plan_object = func(
                copy.deepcopy(old_implementation_academic_plan_object), *args, **kwargs
            )

            for attr, value in old_implementation_academic_plan_object.__dict__.items():
                if updated_implementation_academic_plan_object.__dict__[attr] != value:
                    print(attr, value)

            return updated_academic_plan_object

        return wrapper

    @staticmethod
    def discipline_block_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_block_json, academic_plan_object = args

            if DisciplineBlock.objects.filter(
                    name=isu_academic_plan_block_json['block_name'],
                    academic_plan=academic_plan_object
            ).exists():
                old_discipline_block_object = DisciplineBlock.objects.get(
                    name=isu_academic_plan_block_json['block_name'],
                    academic_plan=academic_plan_object
                )
            else:
                old_discipline_block_object = None

            updated_discipline_block_object = func(copy.deepcopy(old_discipline_block_object), *args, **kwargs)

            for attr, value in updated_discipline_block_object.__dict__.items():
                if old_discipline_block_object is None or old_discipline_block_object.__dict__[attr] != value:
                    print(attr, value)

            return updated_discipline_block_object

        return wrapper

    @staticmethod
    def discipline_block_module_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_block_module_json, discipline_block_object = args
            print(discipline_block_object)

            if DisciplineBlockModule.objects.filter(
                    name=isu_academic_plan_block_module_json['module_name'],
                    descipline_block=discipline_block_object
            ).exists():
                old_discipline_block_module_object = DisciplineBlockModule.objects.get(
                    name=isu_academic_plan_block_module_json['module_name'],
                    descipline_block=discipline_block_object
                )
            else:
                old_discipline_block_module_object = None

            updated_discipline_block_module_object = func(
                copy.deepcopy(old_discipline_block_module_object), *args, **kwargs
            )

            for attr, value in updated_discipline_block_module_object.__dict__.items():
                if old_discipline_block_module_object is None \
                        or old_discipline_block_module_object.__dict__[attr] != value:
                    print(attr, value)

            return updated_discipline_block_module_object

        return wrapper

    @staticmethod
    def discipline_changes_aspect(func):
        def wrapper(*args, **kwargs):
            isu_academic_plan_discipline_json = args[1]

            # todo get() returned more than one WorkProgram -- it returned 11!
            if WorkProgram.objects.filter(
                    discipline_code=int(isu_academic_plan_discipline_json['disc_id'])
            ).exists():
                old_work_program_object = WorkProgram.objects.filter(
                    discipline_code=int(isu_academic_plan_discipline_json['disc_id'])
                )[0]
            else:
                old_work_program_object = None

            updated_work_program_object = func(
                copy.deepcopy(old_work_program_object), *args, **kwargs
            )

            # todo similar discipline_codes identified as different ?
            print("-----")
            print(old_work_program_object.discipline_code)
            print(updated_work_program_object.discipline_code)
            print(old_work_program_object.discipline_code != updated_work_program_object.discipline_code)
            print("-----")

            for attr, value in updated_work_program_object.__dict__.items():
                if old_work_program_object is None \
                        or old_work_program_object.__dict__[attr] != value:
                    print(attr, value)

            return updated_work_program_object

        return wrapper

    @staticmethod
    def linked_data_changes_aspect(func):
        def wrapper(*args, **kwargs):
            old_work_program_change_in_discipline_block_module_object, \
            old_work_program_in_field_of_study_object, \
            updated_work_program_change_in_discipline_block_module_object, \
            updated_work_program_in_field_of_study_object = func(
                *args, **kwargs
            )

            for attr, value in updated_work_program_change_in_discipline_block_module_object.__dict__.items():
                if old_work_program_change_in_discipline_block_module_object is None \
                        or old_work_program_change_in_discipline_block_module_object.__dict__[attr] != value:
                    print(attr, value)

            for attr, value in updated_work_program_in_field_of_study_object.__dict__.items():
                if old_work_program_in_field_of_study_object is None \
                        or old_work_program_in_field_of_study_object.__dict__[attr] != value:
                    print(attr, value)

            return updated_work_program_in_field_of_study_object

        return wrapper

    @staticmethod
    def work_program_id_str_up_for_isu_changes_aspect(func):
        def wrapper(*args, **kwargs):
            work_program_in_field_of_study_object, \
            isu_academic_plan_json, \
            isu_academic_plan_discipline_json = args

            if WorkProgramIdStrUpForIsu.objects.filter(
                    id_str_up=int(isu_academic_plan_discipline_json['str_up_id']),
                    ns_id=int(isu_academic_plan_json['ns_id']),
                    work_program_in_field_of_study=work_program_in_field_of_study_object
            ).exists():
                old_work_program_id_str_up_for_isu_object = WorkProgramIdStrUpForIsu.objects.get(
                    id_str_up=int(isu_academic_plan_discipline_json['str_up_id']),
                    ns_id=int(isu_academic_plan_json['ns_id']),
                    work_program_in_field_of_study=work_program_in_field_of_study_object
                )
            else:
                old_work_program_id_str_up_for_isu_object = None

            updated_work_program_id_str_up_for_isu_object = func(
                copy.deepcopy(old_work_program_id_str_up_for_isu_object), *args, **kwargs
            )

            for attr, value in updated_work_program_id_str_up_for_isu_object.__dict__.items():
                if old_work_program_id_str_up_for_isu_object is None \
                        or old_work_program_id_str_up_for_isu_object.__dict__[attr] != value:
                    print(attr, value)

            return updated_work_program_id_str_up_for_isu_object

        return wrapper
