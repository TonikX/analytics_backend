from django.core.management.base import BaseCommand, CommandError

from workprogramsapp.models import DisciplineBlockModule


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        modules = DisciplineBlockModule.objects.filter(selection_rule__in=["any_quantity", "no_more_than_n_credits"])
        for module in modules:
            print(module.id)
