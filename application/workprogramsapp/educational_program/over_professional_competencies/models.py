from django.db import models

from workprogramsapp.educational_program.educational_standart.models import EducationalStandard

"""
Ключевые компетенции
"""


class GroupOfOverProfCompetencesInEducationalStandard(models.Model):
    """
    Группа над-профессиональных компетенций в общей характеристике
    """
    name = models.CharField(max_length=512, verbose_name="трудовая функция")
    educational_standard = models.ForeignKey(EducationalStandard, on_delete=models.CASCADE,
                                             verbose_name="Образовательный стандарт",
                                             related_name="group_of_over_prof_competences",
                                             blank=True, null=True)

    def __str__(self):
        return str(self.name) + '/' + str(self.educational_standard)


class OverProfCompetencesInGroupOfGeneralCharacteristic(models.Model):
    """
    над-профессиональная компетенция в общей характеристике
    """

    group_of_pk = models.ForeignKey('GroupOfOverProfCompetencesInEducationalStandard', on_delete=models.CASCADE,
                                    verbose_name="Группа над-профессиональных компетенций в ОС",
                                    related_name="competence_in_group_of_over_prof_competences")
    # labor_functions = models.CharField(max_length=512, verbose_name="Трудовая функция")
    competence = models.ForeignKey('Competence', on_delete=models.CASCADE, verbose_name="Компетенция",
                                   blank=True, null=True, related_name="group_over")

    def __str__(self):
        return str(self.group_of_pk) + '/' + str(self.competence)


class IndicatorInOverProfCompetenceInGeneralCharacteristic(models.Model):
    """
    Индикатор компетенции в общей характеристике
    """

    competence_in_group_of_pk = models.ForeignKey('OverProfCompetencesInGroupOfGeneralCharacteristic',
                                                  on_delete=models.CASCADE,
                                                  verbose_name="Группа над-профессиональных компетенций в ОС",
                                                  related_name="indicator_of_competence_in_group_of_over_prof_competences")
    indicator = models.ForeignKey('Indicator', on_delete=models.CASCADE, verbose_name="Индикатор ПК компетенции в ОХ")

    def __str__(self):
        return str(self.competence_in_group_of_pk) + '/' + str(self.indicator)
