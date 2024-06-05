from django.core.management import BaseCommand

from workprogramsapp.bars_merge.models import AcceptedBarsInWp


class Command(BaseCommand):

    def handle(self, *args, **options):
        AcceptedBarsInWp.objects.filter(
            year_of_study="2022/2023", semester_of_sending=0
        ).delete()
