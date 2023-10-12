import pandas as pd
from django.core.management import BaseCommand

from gia_practice_app.Practice.models import Practice


class Command(BaseCommand):

    def handle(self, *args, **options):

        csv_path = "workprogramsapp/management/commands/files/practice_for_del_by_isu_prac_id_202310071000.csv"
        prac = pd.read_csv(csv_path, sep=",")
        counter_done = 0
        for i in range(len(prac)):
            try:
                this_prac = Practice.objects.filter(discipline_code=prac["discipline_code"][i],
                                                    prac_isu_id__isnull=False)
                print(this_prac)
                counter_done += 1
            except:
                pass
        print("Removed: ", counter_done)
