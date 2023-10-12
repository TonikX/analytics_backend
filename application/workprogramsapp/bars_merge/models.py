from django.db import models
from django.utils import timezone


class BarsWorkProgramsAssociate(models.Model):
    bars_id = models.PositiveIntegerField(verbose_name="Id РПД в системе БАРС 2.0")
    base_work_programs = models.ManyToManyField('WorkProgram', verbose_name="Рабочая программа",
                                                related_name="work_program_in_bars")
    is_in_bars = models.BooleanField(verbose_name="Отправлялась ли в БАРС", default=False)
    term = models.PositiveIntegerField(verbose_name="Семестр")


class HistoryOfSendingToBars(models.Model):
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE,
                                     verbose_name='РПД',
                                     related_name="wp_in_send_history")
    date_of_sending = models.DateField(default=timezone.now)
    request_text = models.TextField(verbose_name='Текст запроса в БАРС', blank=True, null=True)
    request_response = models.TextField(verbose_name='Текст ответа БАРС', blank=True, null=True)
    request_status = models.IntegerField(verbose_name='Статус запроса в БАРС', blank=True, null=True)


class AcceptedBarsInWp(models.Model):
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, verbose_name='РПД',
                                     related_name="accepted_wp_in_bars")
    year_of_study = models.TextField(verbose_name='Учебный год', blank=True, null=True)
    semester_of_sending = models.IntegerField(verbose_name='Весенний или осенний семестр', blank=True, null=True)


class BarsEPAssociate(models.Model):
    bars_id = models.PositiveIntegerField(verbose_name="Id ОП в системе БАРС 2.0")
    base_field_of_study = models.ManyToManyField('ImplementationAcademicPlan', verbose_name="Направление",
                                                 related_name="field_of_study_in_bars")
    is_in_bars = models.BooleanField(verbose_name="Отправлялась ли в БАРС", default=False)
