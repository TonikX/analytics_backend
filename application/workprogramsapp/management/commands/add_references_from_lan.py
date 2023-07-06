import requests
from django.core.management.base import BaseCommand, CommandError

from workprogramsapp.models import DisciplineBlockModule


class Command(BaseCommand):

    def handle(self, *args, **options):
        data_exists=True
        counter = 0
        while data_exists:
            r = requests.get(f'https://openapi.e.lanbook.com/1.0/resource/book?limit=100&offset-{counter}')
            biliogpraphic_data = r.json

