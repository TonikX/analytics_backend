from django.core.management import BaseCommand
from django.db.models import Q

from workprogramsapp.educational_program.educational_standart.models import EducationalStandard
from workprogramsapp.models import ImplementationAcademicPlan, GeneralCharacteristics, Competence


class Command(BaseCommand):

    def handle(self, *args, **options):
        key_filter = Q(group_key__group_of_pk__educational_standard__isnull=True)
        over_filter = Q(group_over__group_of_pk__educational_standard__isnull=True)
        general_filter = Q(
            group_general__group_of_pk__educational_standard__isnull=True)
        competences_to_delete = Competence.objects.filter(key_filter & over_filter & general_filter).exclude(
            number__icontains="ПК")
        print(competences_to_delete)
        competences_to_delete.delete()
        print("done")
