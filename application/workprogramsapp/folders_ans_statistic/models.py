from django.db import models

from analytics_project import settings


# РПД
class WorkProgramInFolder(models.Model):
    RATING_CHOICES = [
        (0, 0),
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    ]
    folder = models.ForeignKey('Folder', verbose_name='Папка', on_delete=models.CASCADE,
                               related_name="work_program_in_folder")
    work_program = models.ForeignKey("WorkProgram", verbose_name='Рпд в папке', on_delete=models.CASCADE)
    work_program_rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, verbose_name="Важность рпд",
                                                           blank=True, null=True, default=0)
    comment = models.CharField(max_length=10240, verbose_name="Комментарий", blank=True, null=True)


# УП
class AcademicPlanInFolder(models.Model):
    RATING_CHOICES = [
        (0, 0),
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    ]
    folder = models.ForeignKey('Folder', verbose_name='Папка', on_delete=models.CASCADE,
                               related_name="academic_plan_in_folder")
    academic_plan = models.ForeignKey("AcademicPlan", verbose_name='УП в папке', on_delete=models.CASCADE)
    academic_plan_rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, verbose_name="Важность уп",
                                                            blank=True, null=True, default=0)
    comment = models.CharField(max_length=10240, verbose_name="Комментарий", blank=True, null=True)


# МОДУЛИ
class DisciplineBlockModuleInFolder(models.Model):
    RATING_CHOICES = [
        (0, 0),
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    ]
    folder = models.ForeignKey('Folder', verbose_name='Папка', on_delete=models.CASCADE,
                               related_name="block_module_in_folder")
    block_module = models.ForeignKey("DisciplineBlockModule", verbose_name='модуль в папке', on_delete=models.CASCADE)
    work_program_rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, verbose_name="Важность модуля",
                                                           blank=True, null=True, default=0)
    comment = models.CharField(max_length=10240, verbose_name="Комментарий", blank=True, null=True)


# ТРАЕКТОРИИ
class IndividualImplementationAcademicPlanInFolder(models.Model):
    RATING_CHOICES = [
        (0, 0),
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    ]
    folder = models.ForeignKey('Folder', verbose_name='Папка', on_delete=models.CASCADE,
                               related_name="individual_implementation_of_academic_plan_in_folder")
    individual_implementation_of_academic_plan = models.ForeignKey("IndividualImplementationAcademicPlan", verbose_name='траектория в папке', on_delete=models.CASCADE)
    work_program_rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, verbose_name="Важность траектории",
                                                           blank=True, null=True, default=0)
    comment = models.CharField(max_length=10240, verbose_name="Комментарий", blank=True, null=True)


class Folder(models.Model):
    name = models.CharField(max_length=1024, verbose_name="Имя папки")
    description = models.CharField(max_length=1024, verbose_name="Описание папки", blank=True, null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Владелец папки', on_delete=models.CASCADE)
    work_program = models.ManyToManyField("WorkProgram", verbose_name='Рабочие программы',
                                          through=WorkProgramInFolder, related_name='works_program_folder',
                                          blank=True,
                                          null=True)
    academic_plan = models.ManyToManyField("AcademicPlan", verbose_name='Академические планы',
                                           through=AcademicPlanInFolder, related_name='academic_plans_folder',
                                           blank=True,
                                           null=True)
    block_module = models.ManyToManyField("DisciplineBlockModule", verbose_name='Модули дисциплины',
                                          through=DisciplineBlockModuleInFolder, related_name='block_modules_folder',
                                          blank=True,
                                          null=True)
    individual_implementation_of_academic_plan = models.ManyToManyField("IndividualImplementationAcademicPlan",
                                                                        verbose_name='Индивидуальные траектории',
                                                                        through=IndividualImplementationAcademicPlanInFolder,
                                                                        related_name='individual_implementation_of_academic_plan_folder',
                                                                        blank=True,
                                                                        null=True)
