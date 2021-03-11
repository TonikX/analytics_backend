from django.db import models
from workprogramsapp.models import Topic


"""
Материалы тем
"""

class AdditionalMaterial(models.Model):
    topic = models.ForeignKey('Topic', on_delete=models.CASCADE, verbose_name='тема рабочей программы',
                              related_name='additional_materials_for_topic')
    title = models.CharField(max_length=300, verbose_name="Описание")
    url = models.URLField(verbose_name="Ссылка на материал")


