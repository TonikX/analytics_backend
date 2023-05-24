from django.db import models
from django.db.models import DO_NOTHING

from workprogramsapp.educational_program.educational_standart.models import EducationalStandard

"""
Ключевые компетенции
"""


class GroupOfKeyCompetencesInEducationalStandard(models.Model):
    """
    Группа ключевых компетенций в образовательном стандарте
    """
    name = models.CharField(max_length=512, verbose_name="трудовая функция")
    educational_standard = models.ForeignKey(EducationalStandard, on_delete=models.CASCADE,
                                             verbose_name="Образовательный стандарт",
                                             related_name="group_of_key_competences",
                                             blank=True, null=True)


    def __str__(self):
        return str(self.name) + '/' + str(self.educational_standard)


class KeyCompetencesInGroupOfGeneralCharacteristic(models.Model):
    """
    Ключевая компетенция в общей характеристике
    """

    group_of_pk = models.ForeignKey('GroupOfKeyCompetencesInEducationalStandard', on_delete=models.CASCADE,
                                    verbose_name="Группа ключевых компетенций в ОС",
                                    related_name="competence_in_group_of_key_competences",  blank=True, null=True)
    # labor_functions = models.CharField(max_length=512, verbose_name="Трудовая функция")
    competence = models.ForeignKey('Competence', on_delete=models.DO_NOTHING, verbose_name="Компетенция",
                                   blank=True, null=True, related_name="group_key")

    def __str__(self):
        return str(self.group_of_pk) + '/' + str(self.competence)


class IndicatorInKeyCompetenceInGeneralCharacteristic(models.Model):
    """
    Индикатор компетенции в общей характеристике
    """

    competence_in_group_of_pk = models.ForeignKey('KeyCompetencesInGroupOfGeneralCharacteristic',
                                                  on_delete=models.CASCADE,
                                                  verbose_name="Группа ключевых компетенций в ОС",
                                                  related_name="indicator_of_competence_in_group_of_key_competences")
    indicator = models.ForeignKey('Indicator', on_delete=models.CASCADE, verbose_name="Индикатор ПК компетенции в ОХ")

    def __str__(self):
        return str(self.competence_in_group_of_pk) + '/' + str(self.indicator)
