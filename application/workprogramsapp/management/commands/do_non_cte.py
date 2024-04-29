from django.core.management.base import BaseCommand

from workprogramsapp.models import (
    AcademicPlan,
)


class Command(BaseCommand):
    help = "Closes the specified poll for voting"

    def handle(self, *args, **options):
        AcademicPlan.objects.get(id=7304).get_all_changeblocks_from_ap()
