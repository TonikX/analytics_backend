from django.db import models


"""
Ключевые компетенции
"""


class GroupOfOverProfCompetencesInGeneralCharacteristic(models.Model):
    """
    Группа над-профессиональных компетенций в общей характеристике
    """
    name = models.CharField(max_length=512, verbose_name="трудовая функция")
    general_characteristic = models.ForeignKey('GeneralCharacteristics', on_delete=models.CASCADE,
                                               verbose_name="Общая характеристика",
                                               related_name = "group_of_over_prof_competences")

    def __str__(self):
        return str(self.name) + '/' + str(self.general_characteristic)


class OverProfCompetencesInGroupOfGeneralCharacteristic(models.Model):
    """
    над-профессиональная компетенция в общей характеристике
    """

    group_of_pk = models.ForeignKey('GroupOfOverProfCompetencesInGeneralCharacteristic', on_delete=models.CASCADE,
                                    verbose_name="Группа над-профессиональных компетенций в ОХ",
                                    related_name = "competence_in_group_of_over_prof_competences")
    #labor_functions = models.CharField(max_length=512, verbose_name="Трудовая функция")


    def __str__(self):
        return str(self.group_of_pk) + '/' + str(self.competence)


class IndicatorInOverProfCompetenceInGeneralCharacteristic(models.Model):
    """
    Индикатор компетенции в общей характеристике
    """

    competence_in_group_of_pk = models.ForeignKey('OverProfCompetencesInGroupOfGeneralCharacteristic',
                                                  on_delete=models.CASCADE,
                                                  verbose_name="Группа над-профессиональных компетенций в ОХ",
                                                  related_name = "indicator_of_competence_in_group_of_over_prof_competences")
    indicator = models.ForeignKey('Indicator', on_delete=models.CASCADE, verbose_name="Индикатор ПК компетенции в ОХ")

    def __str__(self):
        return str(self.group_of_pk) + '/' + str(self.indicator)
