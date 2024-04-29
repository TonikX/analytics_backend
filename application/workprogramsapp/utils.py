from workprogramsapp.models import (
    DisciplineBlock,
    DisciplineBlockModule,
    WorkProgramChangeInDisciplineBlockModule,
)


def remove_empty_changeblocks():
    WorkProgramChangeInDisciplineBlockModule.objects.filter(
        discipline_block_module__descipline_block=None
    ).delete()


def count_disciplines_in_plan(isu_id):
    counter = 0
    for block in DisciplineBlock.objects.filter(
        academic_plan__academic_plan_in_field_of_study__ap_isu_id=isu_id
    ):
        if block.name != "Блок 4. Факультативные модули (дисциплины)":
            for module in block.modules_in_discipline_block.all():
                counter += DisciplineBlockModule.get_all_changeblocks_from_module(
                    module
                ).count()
    return counter
