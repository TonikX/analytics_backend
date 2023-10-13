import pandas as pd
from django.core.management import BaseCommand

from dataprocessing.models import Items, Domain
from gia_practice_app.Practice.models import ZunPractice
from workprogramsapp.educational_program.general_prof_competencies.models import \
    IndicatorInGeneralProfCompetenceInGeneralCharacteristic, GeneralProfCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.key_competences.models import IndicatorInKeyCompetenceInGeneralCharacteristic, \
    KeyCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.over_professional_competencies.models import \
    IndicatorInOverProfCompetenceInGeneralCharacteristic, OverProfCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.pk_comptencies.models import IndicatorInPkCompetenceInGeneralCharacteristic, \
    PkCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.models import Competence, Indicator, Zun


class Command(BaseCommand):

    def handle(self, *args, **options):
       """ for competence in Competence.objects.all():
            for same_name_comp in Competence.objects.filter(number=competence.number).exclude(
                    id=competence.id):
                if "ПК" in competence.number:
                    continue
                indicators_name_set = set(
                    [indicator.name for indicator in Indicator.objects.filter(competence=competence)])
                same_indicators_name_set = set(
                    [indicator.name for indicator in Indicator.objects.filter(competence=same_name_comp)])
                if len(indicators_name_set) == len(same_indicators_name_set):
                    # Обрабатываем инидикаторы а ненужные удаляем
                    for indicator in Indicator.objects.filter(competence=competence):
                        indicator_to_delete = Indicator.objects.get(name=indicator.name, competence=same_name_comp)
                        Zun.objects.filter(indicator_in_zun=indicator_to_delete).update(indicator_in_zun=indicator)
                        ZunPractice.objects.filter(indicator_in_zun=indicator_to_delete).update(
                            indicator_in_zun=indicator)
                        for indicator_class in [IndicatorInGeneralProfCompetenceInGeneralCharacteristic,
                                                IndicatorInKeyCompetenceInGeneralCharacteristic,
                                                IndicatorInOverProfCompetenceInGeneralCharacteristic,
                                                IndicatorInPkCompetenceInGeneralCharacteristic]:
                            indicator_class.objects.filter(indicator=indicator_to_delete).update(indicator=indicator)
                        indicator_to_delete.delete()

                    # Обрабатываем компетенции и удаляем
                    for comp_class in [GeneralProfCompetencesInGroupOfGeneralCharacteristic,
                                       KeyCompetencesInGroupOfGeneralCharacteristic,
                                       OverProfCompetencesInGroupOfGeneralCharacteristic,
                                       PkCompetencesInGroupOfGeneralCharacteristic]:
                        comp_class.objects.filter(competence=same_name_comp).update(competence=competence)
                    same_name_comp.delete()"""
    print("done")

