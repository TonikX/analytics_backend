import pandas as pd
from django.core.management import BaseCommand

from dataprocessing.models import Items


class Command(BaseCommand):

    def handle(self, *args, **options):
        csv_path = "workprogramsapp/management/commands/files/dataprocessing_items.csv"
        normal_items = pd.read_csv(csv_path)

        for i in range(len(normal_items)):
            item = Items.objects.get(id=normal_items["id"][i])
            item.name = normal_items["name"][i]
            item.save()
