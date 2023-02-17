from workprogramsapp.educational_program.serializers import WorkProgramCompetenceIndicatorSerializer
from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule, WorkProgram


def recursion_module_matrix(block_module, unique_wp):
    block_module_dict = {"name": block_module.name, "type": block_module.type,
                         "change_blocks_of_work_programs_in_modules": [], "childs": []}
    # block_dict["modules_in_discipline_block"].append(block_module_dict)
    if block_module.childs.all().exists():
        for child in block_module.childs.all():
            block_module_dict["childs"].append(recursion_module_matrix(child, unique_wp))
    for change_block in WorkProgramChangeInDisciplineBlockModule.objects.filter(
            discipline_block_module=block_module):
        change_block_dict = {"change_type": change_block.change_type,
                             "credit_units": change_block.credit_units, "work_program": []}
        # block_module_dict["change_blocks_of_work_programs_in_modules"].append(change_block_dict)
        for work_program in WorkProgram.objects.filter(work_program_in_change_block=change_block):
            if work_program.id not in unique_wp:

                serializer = WorkProgramCompetenceIndicatorSerializer(work_program)
                change_block_dict['work_program'].append(serializer.data)
                unique_wp.append(work_program.id)
            else:
                pass
                # print(work_program)
        if change_block_dict["work_program"]:
            block_module_dict["change_blocks_of_work_programs_in_modules"].append(change_block_dict)
    return block_module_dict
