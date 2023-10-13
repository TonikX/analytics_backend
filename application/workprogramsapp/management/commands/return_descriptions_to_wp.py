import pandas as pd
from django.core.management import BaseCommand

from dataprocessing.models import Items, Domain
from workprogramsapp.models import WorkProgram


class Command(BaseCommand):

    def handle(self, *args, **options):
        csv_path = "workprogramsapp/management/commands/files/wp_detail_202308041339.csv"
        wp_descriptions = pd.read_csv(csv_path, sep=";")
        counter_done = 0
        for i in range(len(wp_descriptions)):
            try:
                wp = WorkProgram.objects.get(id=wp_descriptions["id"][i])
                wp.description = wp_descriptions["description"][i]
                counter_done += 1
                wp.save()
            except:
                pass
        print("done", counter_done)
