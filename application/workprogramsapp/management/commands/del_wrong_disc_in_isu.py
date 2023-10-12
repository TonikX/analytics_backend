from django.core.management.base import BaseCommand, CommandError

from workprogramsapp.models import DisciplineBlockModule, DisciplineBlockModuleInIsu


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        DisciplineBlockModule.objects.filter(isu_module__isu_id=10302, isu_module__new_id=None,
                                             isu_module__academic_plan__id=7330)[0].delete()
