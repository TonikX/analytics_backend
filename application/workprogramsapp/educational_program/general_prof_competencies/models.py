from django.db import models


"""
Ключевые компетенции
"""


class GroupOfGeneralProfCompetencesInGeneralCharacteristic(models.Model):
    """
    Группа общепрофессиональных компетенций в общей характеристике
    """
    name = models.CharField(max_length=512, verbose_name="трудовая функция")
    general_characteristic = models.ForeignKey('GeneralCharacteristics', on_delete=models.CASCADE,
                                               verbose_name="Общая характеристика",
                                               related_name = "group_of_general_prof_competences")

    def __str__(self):
        return str(self.name) + '/' + str(self.general_characteristic)


class GeneralProfCompetencesInGroupOfGeneralCharacteristic(models.Model):
    """
    общепрофессиональная компетенция в общей характеристике
    """

    group_of_pk = models.ForeignKey('GroupOfGeneralProfCompetencesInGeneralCharacteristic', on_delete=models.CASCADE,
                                    verbose_name="Группа общепрофессиональных компетенций в ОХ",
                                    related_name = "competence_in_group_of_general_prof_competences")
    #labor_functions = models.CharField(max_length=512, verbose_name="Трудовая функция")
    competence = models.ForeignKey('Competence', on_delete=models.CASCADE, verbose_name="Компетенция",
                                   blank=True, null=True)


    def __str__(self):
        return str(self.group_of_pk) + '/' + str(self.competence)


class IndicatorInGeneralProfCompetenceInGeneralCharacteristic(models.Model):
    """
    Индикатор компетенции в общей характеристике
    """

    competence_in_group_of_pk = models.ForeignKey('GeneralProfCompetencesInGroupOfGeneralCharacteristic',
                                                  on_delete=models.CASCADE,
                                                  verbose_name="Группа общепрофессиональных компетенций в ОХ",
                                                  related_name = "indicator_of_competence_in_group_of_general_prof_competences")
    indicator = models.ForeignKey('Indicator', on_delete=models.CASCADE, verbose_name="Индикатор ПК компетенции в ОХ")

    def __str__(self):
        return str(self.competence_in_group_of_pk) + '/' + str(self.indicator)
