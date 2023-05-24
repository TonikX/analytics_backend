import datetime

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

"""
Ключевые компетенции
"""


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)+3


class TasksForEducationalStandard(models.Model):
    """
    Список задач обоазовательного стандарта
    """
    name = models.CharField(max_length=512, verbose_name="Наименование")
    educational_standard = models.ForeignKey("EducationalStandard", on_delete=models.CASCADE,
                                             related_name="tasks_prof_standard", blank=True, null=True)

    def __str__(self):
        return str(self.name)


class EducationalStandard(models.Model):
    """
    Таблица образовательного стандарта
    """
    name = models.CharField(max_length=512, verbose_name="Наименование образовательного стандарта")
    standard_date = models.PositiveIntegerField(
        default=current_year(), blank=True, null=True,
        verbose_name="Дата образовательного стандарта")

    def __str__(self):
        return str(self.name) + " " + str(self.standard_date)
