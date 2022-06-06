from django.db import models

class ValidationAcademicPlanChat(models.Model):
    conversation = models.ForeignKey('chat.Conversation', on_delete=models.CASCADE, verbose_name='Чат')
    implementation_of_academic_plan = models.ForeignKey('ImplementationAcademicPlan', on_delete=models.CASCADE,
                                                        verbose_name='Учебный план')

    def __str__(self):
        return str(self.conversation) + " " + str(self.implementation_of_academic_plan)

class ValidationRunResult(models.Model):
    '''
        Модель запуска валидации
    '''

    plans_count = models.IntegerField(blank=True, null=True, default=0, verbose_name='Всего учебных планов')
    invalid_plans_count = models.IntegerField(blank=True, null=True, default=0, verbose_name='Невалидных учебных планов')
    run_datetime = models.DateTimeField(editable=False, auto_now_add=True, blank=False, null=False)

    def __str__(self):
        return "Невалидных планов " + str(self.invalid_plans_count) + " из " + str(self.plans_count)


class AcademicPlanValidationResult(models.Model):
    '''
        Модель для результата валидации учебного плана
    '''

    validation_run_result = models.ForeignKey('ValidationRunResult', on_delete=models.CASCADE, verbose_name="Результат валидации", blank=False,
                                 null=False)
    implementation_of_academic_plan = models.ForeignKey('ImplementationAcademicPlan', on_delete=models.CASCADE,
                                                        verbose_name='Учебный план')
    has_blocks_error = models.BooleanField(default=False)
    has_hours_error = models.BooleanField(default=False)
    has_specialization_error = models.BooleanField(default=False)
    has_ognp_error = models.BooleanField(default=False)
    has_format_error = models.BooleanField(default=False)

    def __str__(self):
        return str(self.validation_run_result) + " " + str(self.implementation_of_academic_plan)
