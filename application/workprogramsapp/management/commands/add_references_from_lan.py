import requests
from django.core.management.base import BaseCommand, CommandError

from analytics_project.settings import LAN_TOKEN
from workprogramsapp.models import DisciplineBlockModule, BibliographicReference


class Command(BaseCommand):

    def handle(self, *args, **options):
        data_exists = True
        counter = 0
        while data_exists:
            r = requests.get(
                f'https://openapi.e.lanbook.com/1.0/resource/book?limit=100&offset={counter}'
                f'&fields=bibliographicRecord%2C%20pages%2C%20authors%2C%20name%2C%20publisher%2C%20description%2C%20year',
                headers={"X-Auth-Token": LAN_TOKEN})
            bibliogpraphic_data = r.json()
            if not bibliogpraphic_data["data"]:
                data_exists = False
                break
            else:
                for bibl in bibliogpraphic_data["data"]:
                    bib_obj = BibliographicReference.objects.create(bib_reference=bibl["bibliographicRecord"],
                                                                    pages=bibl["pages"],
                                                                    title=bibl["name"], authors=bibl["authors"],
                                                                    publishing_company=bibl["publisher"],
                                                                    description=bibl["description"], year=bibl["year"])
                    print(bib_obj)
                counter += 100
        print("done")
