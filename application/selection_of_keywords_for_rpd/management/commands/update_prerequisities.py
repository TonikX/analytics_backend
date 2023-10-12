from pathlib import Path
from collections import defaultdict
from selection_of_keywords_for_rpd.recommendation_of_prerequisites.v1.connection_to_postgre import connection_to_postgre
from django.core.management.base import BaseCommand, CommandError

from workprogramsapp.models import DisciplineBlockModule


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    # def add_arguments(self, parser):
    #     parser.add_argument('nums', nargs='+', type=int)

    def handle(self, *args, **options):
        exec(Path("selection_of_keywords_for_rpd/recommendation_of_prerequisites/v1/entities-writer.py").read_text())
        exec(Path("selection_of_keywords_for_rpd/recommendation_of_prerequisites/v1/usage-writer.py").read_text())
        exec(Path("selection_of_keywords_for_rpd/recommendation_of_prerequisites/v1/mf.py").read_text())