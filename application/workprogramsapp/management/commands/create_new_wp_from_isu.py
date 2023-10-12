from django.core.management import BaseCommand

from workprogramsapp.isu_merge.academic_plan_update.isu_service import IsuService, IsuUser
from django.conf import settings

from workprogramsapp.models import WorkProgram, СertificationEvaluationTool
from workprogramsapp.workprogram_additions.models import StructuralUnit


class Command(BaseCommand):

    def handle(self, *args, **options):
        isu_logger = IsuService(
            IsuUser(
                settings.ISU["ISU_CLIENT_ID"],
                settings.ISU["ISU_CLIENT_SECRET"]
            )
        )
        isu_logger.get_access_token(add_headers={"scope": "service.edu-complex-isu"})
        list_of_wp = isu_logger.get_wp_from_bank()
        counter = 0
        for wp_dict in list_of_wp:
            if wp_dict["disc_type"] == 1:  # Если тип "Дисциплина"
                try:
                    WorkProgram.objects.get(discipline_code=str(wp_dict["id"]))
                except WorkProgram.DoesNotExist:
                    last_sem = 1
                    counter += 1
                    realisation_format = None
                    department = None
                    if wp_dict["format_id"] == 1:
                        realisation_format = "offline"
                    elif wp_dict["format_id"] == 2:
                        realisation_format = "mixed"
                    elif wp_dict["format_id"] == 3:
                        realisation_format = "online"

                    department_by_id = StructuralUnit.objects.filter(isu_id=wp_dict["dep_id"])
                    if department_by_id.exists():
                        department = department_by_id.first()
                    else:
                        department_by_name = StructuralUnit.objects.filter(title=wp_dict["dep_name"])
                        if department_by_name.exists():
                            department = department_by_name.first()
                        else:
                            department_by_short_name = StructuralUnit.objects.filter(
                                short_name=wp_dict["dep_short_name"])
                            if department_by_short_name.exists():
                                department = department_by_short_name.first()

                    try:
                        discipline_hours = isu_logger.get_wp_hours(str(wp_dict["id"]))[0]
                    except TypeError:
                        continue
                    practice_hours = [0, 0, 0, 0, 0, 0]
                    lecture_hours = [0, 0, 0, 0, 0, 0]
                    lab_hours = [0, 0, 0, 0, 0, 0]
                    cons_hours = [0, 0, 0, 0, 0, 0]
                    srs_hours = [0, 0, 0, 0, 0, 0]
                    ze_v_sem = [0, 0, 0, 0, 0, 0]
                    contact_hours = [0, 0, 0, 0, 0, 0]
                    certification_types = {5: '1', 9: '2', 6: '3', 7: '4', 8: '5'}
                    cerf_list = []
                    for sem_dict in discipline_hours["discipline_content"]:
                        fake_srs = 0
                        sem = sem_dict["disc_sem_order"]-1
                        srs_counter = 0
                        for type_dict in sem_dict["discipline_acts"]:
                            wt_id = type_dict["wt_id"]

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
                                cerf = СertificationEvaluationTool.objects.create(type=certification_types[wt_id],
                                                                                  semester=sem + 1)
                                cerf_list.append(cerf)

                        srs_hours[sem] = round(fake_srs - 0.1 * (srs_counter), 2)
                        ze_v_sem[sem] = int((fake_srs + srs_counter) / 36)
                        contact_hours[sem] = round(srs_counter * 1.1, 2)
                        last_sem = len(cerf_list)
                    practice = ", ".join([str(hour) for hour in practice_hours]) if practice_hours else "0.0, 0, 0, 0"
                    lecture = ", ".join([str(hour) for hour in lecture_hours]) if lecture_hours else "0.0, 0, 0, 0"
                    lab = ", ".join([str(hour) for hour in lab_hours]) if lab_hours else "0.0, 0, 0, 0"
                    cons = ", ".join([str(hour) for hour in cons_hours]) if cons_hours else "0.0, 0, 0, 0"
                    srs = ", ".join([str(hour) for hour in srs_hours])
                    ze = ", ".join([str(ze_in_list) for ze_in_list in ze_v_sem])
                    contact = ", ".join([str(hour) for hour in contact_hours])
                    created_wp = WorkProgram.objects.create(discipline_code=str(wp_dict["id"]),
                                                            title=wp_dict["disc_name_ru"],
                                                            description=wp_dict["abstract_ru"],
                                                            language=wp_dict["disc_lang_code"].lower(),
                                                            implementation_format=realisation_format,
                                                            structural_unit=department,
                                                            practice_hours_v2=practice,
                                                            lecture_hours_v2=lecture,
                                                            lab_hours_v2=lab,
                                                            srs_hours_v2=srs,
                                                            ze_v_sem=ze,
                                                            contact_hours_v2=contact,
                                                            number_of_semesters=last_sem)
                    for cerf_to_connect in cerf_list:
                        cerf_to_connect.work_program = created_wp
                        cerf_to_connect.save()
                    print(str(wp_dict["id"]), practice, lecture, lab, cons, srs, wp_dict["disc_lang_code"].lower(),
                          realisation_format, department, counter)
        print("done")
