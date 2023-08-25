from workprogramsapp.disciplineblockmodules.ze_module_logic import generate_full_ze_list
from workprogramsapp.models import WorkProgram, DisciplineBlockModule, ImplementationAcademicPlan, \
    WorkProgramChangeInDisciplineBlockModule


def create_wp_by_term(year_of_study: int):
    work_programs = WorkProgram.objects.filter(work_status="w")
    for wp in work_programs:
        ze_wp = [int(unit) for unit in wp.ze_v_sem.split(", ")]
        # ImplementationAcademicPlan_get_all_imp_by_modules
        modules_with_wp = DisciplineBlockModule.objects.filter(
            change_blocks_of_work_programs_in_modules__work_program=wp)
        for module in modules_with_wp:
            plans_in_module = ImplementationAcademicPlan.get_all_imp_by_modules([module])
            for imp in plans_in_module:
                year_imp = imp.year
                changeblock_in_wp = WorkProgramChangeInDisciplineBlockModule.objects.filter(
                    discipline_block_module=module, work_program = wp)
                for changeblock in changeblock_in_wp:
                    if changeblock.semester_start:
                        ze_list = generate_full_ze_list(ze_wp, changeblock.semester_start)
                    elif changeblock.credit_units:
                        ze_list = [[int(unit) for unit in changeblock.credit_units.split(", ")]]
                    else:
                        continue
                    

