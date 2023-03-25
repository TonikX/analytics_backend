from gia_practice_app.GIA.models import GIA
from gia_practice_app.GIA.serializers import GIAPrimitiveSerializer, GIASmallSerializer
from gia_practice_app.Practice.models import Practice
from gia_practice_app.Practice.serializers import PracticeCompetenceSerializer
from workprogramsapp.educational_program.serializers import WorkProgramCompetenceIndicatorSerializer
from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule, WorkProgram


def recursion_module_matrix(block_module, unique_wp, unique_gia, unique_practice, first_ap_iter):
    block_module_dict = {"name": block_module.name, "type": block_module.type,
                         "change_blocks_of_work_programs_in_modules": [], "childs": []}
    # block_dict["modules_in_discipline_block"].append(block_module_dict)
    if block_module.childs.all().exists():
        for child in block_module.childs.all():
            block_module_dict["childs"].append(recursion_module_matrix(child, unique_wp, unique_gia, unique_practice))
    for change_block in WorkProgramChangeInDisciplineBlockModule.objects.filter(
            discipline_block_module=block_module):
        change_block_dict = {"change_type": change_block.change_type,
                             "credit_units": change_block.credit_units, "work_program": [], "practice": [], 'gia': []}
        # block_module_dict["change_blocks_of_work_programs_in_modules"].append(change_block_dict)
        for work_program in WorkProgram.objects.filter(work_program_in_change_block=change_block):
            if (work_program.id not in unique_wp) or first_ap_iter:

                serializer = WorkProgramCompetenceIndicatorSerializer(work_program)
                change_block_dict['work_program'].append(serializer.data)
                unique_wp.append(work_program.id)
            else:
                pass
                # print(work_program)
        for practice in Practice.objects.filter(practice_in_change_block=change_block):
            if (practice.id not in unique_practice) or first_ap_iter:
                serializer = PracticeCompetenceSerializer(practice)
                change_block_dict['practice'].append(serializer.data)
                unique_practice.append(practice.id)
            else:
                pass
                # print(work_program)
        for gia in GIA.objects.filter(gia_in_change_block=change_block):
            if (gia.id not in unique_gia) or first_ap_iter:
                serializer = GIASmallSerializer(gia)
                change_block_dict['gia'].append(serializer.data)
                unique_gia.append(gia.id)
            else:
                pass
                # print(work_program)

        if change_block_dict["work_program"] or change_block_dict["practice"] or change_block_dict["gia"]:
            block_module_dict["change_blocks_of_work_programs_in_modules"].append(change_block_dict)
    return block_module_dict
