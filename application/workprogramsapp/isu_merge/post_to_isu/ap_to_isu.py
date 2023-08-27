from django.db import IntegrityError
from sentry_sdk import capture_exception

from analytics_project import settings
from workprogramsapp.isu_merge.academic_plan_update.isu_service import IsuService, IsuUser
from workprogramsapp.isu_merge.post_to_isu.updaters_isu_logic import generate_wp_in_lower_module_for_ap_isu, \
    post_module_to_isu, post_wp_to_isu, post_gia_to_isu, post_practice_to_isu, post_ap_to_isu
from workprogramsapp.models import DisciplineBlock, WorkProgram, WorkProgramChangeInDisciplineBlockModule, \
    DisciplineBlockModule, DisciplineBlockModuleInIsu, ImplementationAcademicPlan

TOKEN = "xd"  # login fucntion here


def recursion_ap_to_isu(modules, lines_of_plan, block, ap, father_id=None, required = True):
    """
    from workprogramsapp.models import *
    from workprogramsapp.isu_merge.post_to_isu.ap_to_isu import *
    lines_of_plan=[]
    modules = DisciplineBlockModule.objects.filter(father_module__id=148574)
    block=DisciplineBlock.objects.get(id=29646)
    len(recursion_ap_to_isu(modules, lines_of_plan, block))

    """
    for module in modules:
        required = required and (module.selection_rule == "all")
        try:
            isu_module = DisciplineBlockModuleInIsu.objects.get(module=module, isu_father_id=father_id,
                                                                academic_plan=ap)
            id_created = isu_module.isu_id
        except DisciplineBlockModuleInIsu.DoesNotExist:
            id_created = post_module_to_isu(token=TOKEN, module=module, block=block, parent_id=father_id, ap_id=ap.id)

            try:
                DisciplineBlockModuleInIsu.objects.create(module=module, isu_father_id=father_id,
                                                          academic_plan=ap, isu_id=id_created)
            except IntegrityError:
                lines_of_plan.append({"error_module": module.id})
                break
                #id_created = None

        if module.childs.all().exists():
            recursion_ap_to_isu(module.childs.all(), lines_of_plan, block, ap, id_created, required)
        else:
            for changeblock in WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module):
                disc_id = None
                program_type = None
                if changeblock.gia.all():
                    disc_id = changeblock.gia.all()[0].discipline_code
                    program_type = "gia"
                elif changeblock.practice.all():
                    disc_id = changeblock.practice.all()[0].discipline_code
                    program_type = "prac"
                elif changeblock.work_program.all():
                    program_type = "wp"
                    try:
                        disc_id = int(changeblock.work_program.all()[0].discipline_code)
                    except ValueError as e:
                        capture_exception(e)
                    except TypeError:
                        disc_id = None
                if not disc_id:
                    if program_type == "wp":
                        wp_obj = changeblock.work_program.all()[0]
                        disc_id = post_wp_to_isu(token=TOKEN, wp=wp_obj, ap_id=ap.id)
                        wp_obj.discipline_code = str(disc_id)
                        wp_obj.save()
                    elif program_type == "gia":
                        gia_obj = changeblock.gia.all()[0]
                        disc_id = post_gia_to_isu(token=TOKEN, gia=gia_obj, ap_id=ap.id)
                        gia_obj.discipline_code = disc_id
                        gia_obj.save()
                    elif program_type == "prac":
                        prac_obj = changeblock.practice.all()[0]
                        disc_id = post_practice_to_isu(token=TOKEN, practice=prac_obj, ap_id=ap.id)
                        prac_obj.discipline_code = disc_id
                        prac_obj.save()
                    else:
                        continue
                lines_of_plan.append(
                    generate_wp_in_lower_module_for_ap_isu(module=module, changeblock=changeblock, disc_id=disc_id,
                                                           isu_id_lower_module=id_created, required=required))
    return lines_of_plan


def ap_isu_generate_dict(ap):
    """

    from workprogramsapp.models import *
    from workprogramsapp.isu_merge.post_to_isu.ap_to_isu import *
    ap=AcademicPlan.objects.get(id=7382)
    ap_isu_generate_dict(ap)
    """
    global TOKEN
    isu_logger = IsuService(
        IsuUser(
            settings.ISU["ISU_CLIENT_ID"],
            settings.ISU["ISU_CLIENT_SECRET"]
        )
    )
    isu_logger.get_access_token(add_headers={"scope": "service.edu-complex-isu"})
    TOKEN = isu_logger.token
    # print(TOKEN)
    ap_dict = {"main_plan_id": ap.ap_isu_id, "lines_of_plans": []}
    for block in DisciplineBlock.objects.filter(academic_plan=ap).order_by("name"):
        recursion_ap_to_isu(modules=DisciplineBlockModule.objects.filter(descipline_block=block),
                            lines_of_plan=ap_dict["lines_of_plans"], block=block, ap=ap)
    _, code, json_dict, = post_ap_to_isu(TOKEN, ap_dict, ap)
    json_dict["ap_dict"] = ap_dict
    return code, json_dict
