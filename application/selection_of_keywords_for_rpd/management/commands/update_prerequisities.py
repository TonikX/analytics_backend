from pathlib import Path
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Closes the specified poll for voting"

    def handle(self, *args, **options):
        exec(
            Path(
                "selection_of_keywords_for_rpd/recommendation_of_prerequisites/v1/entities-writer.py"
            ).read_text()
        )
        exec(
            Path(
                "selection_of_keywords_for_rpd/recommendation_of_prerequisites/v1/usage-writer.py"
            ).read_text()
        )
        exec(
            Path(
                "selection_of_keywords_for_rpd/recommendation_of_prerequisites/v1/mf.py"
            ).read_text()
        )
