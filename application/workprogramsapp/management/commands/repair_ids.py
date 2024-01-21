from django.core.management import BaseCommand

from gia_practice_app.Practice.models import Practice
from workprogramsapp.models import WorkProgram


class Command(BaseCommand):

    def handle(self, *args, **options):
        wps_to_fix = WorkProgram.objects.filter(discipline_code__contains="error_message")
        for wp in wps_to_fix:
            d_code = eval(wp.discipline_code)[0]
            wp.discipline_code=d_code
            wp.save()
            print(d_code)
        print("done")
