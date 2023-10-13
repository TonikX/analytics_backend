from django.db import models


class ClassroomGroup(models.Model):
    '''
    Модель для хранения аудиторий
    '''
    name = models.CharField(max_length=1024, verbose_name="Наименование группы")
    version = models.IntegerField(verbose_name="Версия обновления", blank=True, null=True)
    updated_at = models.DateTimeField(verbose_name="Дата обновления", blank=True, null=True)
    service_id = models.IntegerField(verbose_name="id в апи-сервисе", blank=True, null=True)

    def __str__(self):
        return self.name


class Classroom(models.Model):
    '''
    Модель для хранения аудиторий
    '''
    name = models.CharField(max_length=1024, verbose_name="Наименование аудитории")
    volume = models.IntegerField(verbose_name="Вместимость", blank=True, null=True)
    version = models.IntegerField(verbose_name="Версия обновления", blank=True, null=True)
    updated_at = models.DateTimeField(verbose_name="Дата обновления", blank=True, null=True)
    service_id = models.IntegerField(verbose_name="id в апи-сервисе", blank=True, null=True)
    isu_id = models.IntegerField(verbose_name="id в ИСУ", blank=True, null=True)
    is_fake = models.BooleanField(verbose_name="настоящая ли аудитория", blank=True, null=True)
    # is_blacklisted = models.BooleanField(verbose_name="уточняется", blank=True, null=True)

    building_part = models.ForeignKey("BuildingPart", on_delete=models.CASCADE, blank=True, null=True,
                                      verbose_name="часть здания")
    departments = models.ManyToManyField("workprogramsapp.Department", verbose_name="Факультеты", blank=True,
                                         null=True, )
    group = models.ManyToManyField("ClassroomGroup", blank=True, null=True,
                              verbose_name="группа аудитория")

    def __str__(self):
        return self.name


class BuildingPart(models.Model):
    '''
    Модель для хранения частей зданий
    '''
    address = models.CharField(max_length=4096, verbose_name="Адрес части здания")
    version = models.IntegerField(verbose_name="Версия обновления", blank=True, null=True)
    updated_at = models.DateTimeField(verbose_name="Дата обновления", blank=True, null=True)
    service_id = models.IntegerField(verbose_name="id в апи-сервисе", blank=True, null=True)
    isu_id = models.IntegerField(verbose_name="id в ИСУ", blank=True, null=True)

    building = models.ForeignKey("Building", on_delete=models.CASCADE, blank=True, null=True,
                                 verbose_name="здание")


class Building(models.Model):
    '''
    Модель для хранения зданий
    '''
    version = models.IntegerField(verbose_name="Версия обновления", blank=True, null=True)
    updated_at = models.DateTimeField(verbose_name="Дата обновления", blank=True, null=True)
    service_id = models.IntegerField(verbose_name="id в апи-сервисе", blank=True, null=True)
    isu_id = models.IntegerField(verbose_name="id в ИСУ", blank=True, null=True),
    name = models.CharField(max_length=1024, verbose_name="Наименование здания")
    short_name = models.CharField(max_length=1024, verbose_name="Сокращенное наименование здания")
    is_external = models.BooleanField(verbose_name="внешнее здание", blank=True, null=True)
