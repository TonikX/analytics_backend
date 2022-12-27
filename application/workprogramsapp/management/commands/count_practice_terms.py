from django.core.management.base import BaseCommand

from gia_practice_app.Practice.models import Practice


class Command(BaseCommand):

    def handle(self, *args, **options):
        for practice in Practice.objects.all():
            try:
                practice.number_of_semesters = len(eval(practice.evaluation_tools_v_sem))
                practice.save()
            except Exception as e:
                print(str(e))
