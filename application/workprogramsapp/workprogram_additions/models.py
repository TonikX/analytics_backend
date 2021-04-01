from django.db import models
from workprogramsapp.models import Topic, WorkProgram
from django.conf import settings


class AdditionalMaterial(models.Model):
    """
    Материалы тем
    """

    topic = models.ForeignKey('Topic', on_delete=models.CASCADE, verbose_name='тема рабочей программы',
                              related_name='additional_materials_for_topic')
    title = models.CharField(max_length=300, verbose_name="Описание")
    url = models.URLField(verbose_name="Ссылка на материал")


class StructuralUnit(models.Model):

    title = models.CharField(max_length=300, verbose_name="Описание")
    isu_id = models.IntegerField(blank=True, null=True, verbose_name="ID структурного подразделения в ИСУ")


class UserStructuralUnit(models.Model):

    status_choise = (
        ('leader', 'leader'),
        ('deputy', 'deputy'),
        ('employee', 'employee'),
    )
    structural_unit = models.ForeignKey('StructuralUnit', on_delete=models.SET_NULL, verbose_name='Структурное подразделени',
                                     related_name='user_in_structural_unit', blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=status_choise, verbose_name='Архив', default = 'l')