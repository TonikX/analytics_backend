from django.core.management import BaseCommand

from workprogramsapp.educational_program.educational_standart.models import EducationalStandard
from workprogramsapp.models import ImplementationAcademicPlan, GeneralCharacteristics


class Command(BaseCommand):
    """
    Метод для создания шаблонов общих характеристик (февраль 2023)
    """

    def add_arguments(self, parser):
        parser.add_argument('year', nargs='+', type=int)

    def handle(self, *args, **options):
        year = options["year"][0]
        print("year")
        for iap in ImplementationAcademicPlan.objects.filter(year=year):
            if GeneralCharacteristics.objects.filter(educational_program__title=iap.title,
                                                     educational_program__year=iap.year).exists():
                gh = GeneralCharacteristics.objects.filter(educational_program__title=iap.title,
                                                           educational_program__year=iap.year)[0]
                gh.educational_program.add(iap)
            else:
                gh = GeneralCharacteristics.objects.create()
                gh.educational_program.add(iap)
                if iap.qualification == 'bachelor':
                    gh.educational_standard = \
                        EducationalStandard.objects.filter(name='ОС Университета ИТМО уровня бакалавриат')[0]
                elif iap.qualification == 'master':
                    gh.educational_standard = \
                        EducationalStandard.objects.filter(name='ОС Университета ИТМО уровня магистратура')[0]
            gh.save()
        print("done")
