from django.db import models

"""
Профессиональные компетенции
"""


class GroupOfPkCompetencesInGeneralCharacteristic(models.Model):
    """
    Группа профессиональных компетенций в общей характеристике
    """
    types = (
        ('prof', 'on prof standard base'),
        ('fore', 'foresights'),
        ('min', 'minor'),
        ('add_qual', 'additional qualification'),
    )

    name = models.CharField(max_length=512, verbose_name="трудовая функция")
    general_characteristic = models.ForeignKey('GeneralCharacteristics', on_delete=models.CASCADE,
                                               verbose_name="Общая характеристика",
                                               related_name="group_of_pk_competences")
    type_of_pk_competence = models.CharField(choices=types, max_length=15, verbose_name='Тип компетенции',
                                             blank=True, null=True)
    def __str__(self):
        return str(self.name) + '/' + str(self.general_characteristic)


class PkCompetencesInGroupOfGeneralCharacteristic(models.Model):
    """
    Профессиональная компетенция в общей характеристике
    """


    group_of_pk = models.ForeignKey('GroupOfPkCompetencesInGeneralCharacteristic', on_delete=models.CASCADE,
                                    verbose_name="Группа профессиональных компетенций в ОХ",
                                    related_name="competence_in_group_of_pk_competences")
    # general_characteristic = models.ForeignKey('GeneralCharacteristics', on_delete=models.CASCADE, verbose_name="Общая характеристика", blank=True, null=True)
    competence = models.ForeignKey('Competence', on_delete=models.CASCADE, verbose_name="Компетенция", blank=True,
                                   null=True, related_name='pk_group')
    professional_standard = models.ForeignKey('ProfessionalStandard', on_delete=models.SET_NULL,
                                              verbose_name="Профессиональный стандарт", blank=True, null=True)
    generalized_labor_functions = models.ManyToManyField('GeneralizedLaborFunctions',
                                                         verbose_name="Выбранные обобщенные трудовые функции", blank=True, null=True)
    kinds_of_activity = models.ForeignKey('KindsOfActivity', on_delete=models.SET_NULL,
                                          verbose_name="Сферы проф. деятельности", blank=True, null=True)
    kinds_of_activity_for_miner = models.CharField(max_length=2048, verbose_name="трудовая функция", blank=True, null=True)

    def __str__(self):
        return str(self.group_of_pk) + '/' + str(self.competence)


class IndicatorInPkCompetenceInGeneralCharacteristic(models.Model):
    """
    Индикатор компетенции в общей характеристике
    """

    competence_in_group_of_pk = models.ForeignKey('PkCompetencesInGroupOfGeneralCharacteristic',
                                                  on_delete=models.CASCADE,
                                                  verbose_name="Группа профессиональных компетенций в ОХ",
                                                  related_name="indicator_of_competence_in_group_of_pk_competences")
    indicator = models.ForeignKey('Indicator', on_delete=models.CASCADE, verbose_name="Индикатор ПК компетенции в ОХ")

    def __str__(self):
        return str(self.competence_in_group_of_pk) + '/' + str(self.indicator)
