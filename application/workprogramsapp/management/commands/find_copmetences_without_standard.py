from django.core.management import BaseCommand
from django.db.models import Q

from workprogramsapp.educational_program.educational_standart.models import EducationalStandard
from workprogramsapp.models import ImplementationAcademicPlan, GeneralCharacteristics, Competence, Zun


class Command(BaseCommand):

    def handle(self, *args, **options):
        key_filter = Q(group_key__group_of_pk__educational_standard__isnull=True)
        over_filter = Q(group_over__group_of_pk__educational_standard__isnull=True)
        general_filter = Q(
            group_general__group_of_pk__educational_standard__isnull=True)
        competences_to_delete = Competence.objects.filter(key_filter & over_filter & general_filter).exclude(
            number__icontains="ПК")
        zuns_without_standard = Zun.objects.filter(indicator_in_zun__competence__in=competences_to_delete)
        key_filter = Q(group_key__group_of_pk__educational_standard__isnull=False)
        over_filter = Q(group_over__group_of_pk__educational_standard__isnull=False)
        general_filter = Q(
            group_general__group_of_pk__educational_standard__isnull=False)
        competences_to_save = Competence.objects.filter(key_filter | over_filter | general_filter).exclude(
            number__icontains="ПК")
        zuns_with_standard = Zun.objects.filter(indicator_in_zun__competence__in=competences_to_save)
        print("ЗУНы с компетенциями в стандартах:", zuns_with_standard.count())
        print("ЗУНы с компетенциями  НЕ в стандартах:", zuns_without_standard.count())
        print("Их процентное соотношение (не/в):", (zuns_without_standard.count()/ zuns_with_standard.count())*100)
        print("done")
