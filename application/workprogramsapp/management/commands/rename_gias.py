from django.core.management import BaseCommand

from dataprocessing.models import User
from django.contrib.auth.models import Group

from gia_practice_app.GIA.models import GIA
from workprogramsapp.models import WorkProgram


class Command(BaseCommand):

    def handle(self, *args, **options):
        GIA.objects.filter(title="preparation").update(title="Подготовка к защите и защита ВКР")
        GIA.objects.filter(title="preparation-en").update(
            title="Подготовка к защите и защита ВКР / Preparation for Thesis Defense and Thesis Defense")
        print("done")
