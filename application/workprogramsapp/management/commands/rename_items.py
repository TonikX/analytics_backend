import pandas as pd
from django.core.management import BaseCommand

from dataprocessing.models import Items, Domain


class Command(BaseCommand):

    def handle(self, *args, **options):
        csv_path = "workprogramsapp/management/commands/files/dataprocessing_items.csv"
        normal_items = pd.read_csv(csv_path)

        for i in range(len(normal_items)):
            try:
                item = Items.objects.get(id=normal_items["id"][i])
                item.domain = Domain.objects.get(id=normal_items["domain_id"][i])
                item.save()
            except Exception:
                pass
