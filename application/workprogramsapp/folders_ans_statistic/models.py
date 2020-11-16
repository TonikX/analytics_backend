from django.db import models

from analytics_project import settings


class WorkProgramInFolder(models.Model):
    RATING_CHOICES = [
        (0, 0),
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    ]
    folder = models.ForeignKey('Folder', verbose_name='Папка', on_delete=models.CASCADE)
    work_program = models.ForeignKey("WorkProgram", verbose_name='Рпд в папке', on_delete=models.CASCADE)
    work_program_rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, verbose_name="Важность рпд",
                                                           blank=True, null=True, default=0)


class Folder(models.Model):
    name = models.CharField(max_length=1024, verbose_name="Имя папки")
    description = models.CharField(max_length=1024, verbose_name="Описание папки", blank=True, null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Владелец папки', on_delete=models.CASCADE)
    work_program = models.ManyToManyField("WorkProgram", verbose_name='Рабочие программы',
                                          through=WorkProgramInFolder, related_name='works_program', blank=True,
                                          null=True)


