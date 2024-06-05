from django.core.management import BaseCommand

from gia_practice_app.GIA.models import GIA


class Command(BaseCommand):

    def handle(self, *args, **options):
        GIA.objects.filter(title="preparation").update(
            title="Подготовка к защите и защита ВКР"
        )
        GIA.objects.filter(title="preparation-en").update(
            title="Подготовка к защите и защита ВКР / Preparation for Thesis Defense and Thesis Defense"
        )
