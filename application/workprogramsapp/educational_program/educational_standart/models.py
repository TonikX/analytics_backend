import datetime

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

"""
Ключевые компетенции
"""


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class TasksForProfStandard(models.Model):
    """
    Список задач проф. стандарта
    """
    name = models.CharField(max_length=512, verbose_name="Наименование")

    def __str__(self):
        return str(self.name)


class EducationalStandard(models.Model):
    """
    Таблица образовательного стандарта
    """
    name = models.CharField(max_length=512, verbose_name="Наименование образовательного стандарта")
    standard_date = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(1984), max_value_current_year], blank=True, null=True,
        verbose_name="Дата образовательного стандарта")
    tasks_prof_standard = models.ManyToManyField(TasksForProfStandard, verbose_name="Список задач проф. стандарта",
                                                 related_name="standard_for_tasks")

    def __str__(self):
        return str(self.name) + " " + str(self.standard_date)
