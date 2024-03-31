from django.core.management.base import BaseCommand

from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule


class Command(BaseCommand):

    def handle(self, *args, **options):
        WorkProgramChangeInDisciplineBlockModule.objects.filter(
            discipline_block_module__descipline_block=None
        ).delete()
