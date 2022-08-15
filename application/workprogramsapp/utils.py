from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule


def remove_empty_changeblocks():
    result=WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module__descipline_block=None).delete()
