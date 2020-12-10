from django.db import models

from analytics_project import settings

from datetime import datetime


class UserExpertise(models.Model):
    STUFF_STATUS_CHOICES = [
        ('AU', 'Автор РПД'),
        ('EX', 'Эксперт'),
    ]
    USER_EXPERTISE_STATUS_CHOISES=[
        ("AP", "Одобрить"),
        ("RE", "Отправить на доработку")
    ]


    expert = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Эксперт', on_delete = models.CASCADE, related_name = 'expertse_in_rpd')
    expertise = models.ForeignKey('Expertise', verbose_name='Экспертиза', on_delete = models.CASCADE, related_name = 'expertse_users_in_rpd')
    stuff_status = models.CharField(choices = STUFF_STATUS_CHOICES, max_length=1024, verbose_name="Роль эксперта", default = 'EX')
    user_expertise_status=models.CharField(choices = USER_EXPERTISE_STATUS_CHOISES, max_length = 1024, blank=True, null=True, verbose_name="статус экспертизы пользователя")
    expert_result = models.CharField(verbose_name = "Результаты экспертизы", max_length = 50000, blank=True, null=True)


class Expertise(models.Model):
    STATUS_CHOICES = [
        ('WK', 'В работе'),
        ('EX', 'На экспертизе'),
        ('AC', 'Одобрено'),
        ('AR', 'Архив')
    ]


    work_program = models.ForeignKey('WorkProgram', related_name = 'expertise_with_rpd', on_delete=models.CASCADE)
    expertise_status = models.CharField(choices = STATUS_CHOICES, max_length=1024, verbose_name="Статус экспертизы", default = 'EX')
    experts = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name='Эксперты', through = UserExpertise, related_name = 'experts_in_expertise')
    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True)
    date_of_last_change = models.DateTimeField(editable=True, auto_now=True, blank=True, null=True)
    #
    #
    # def __init__(self, *args, **kwargs):
    #     super(Expertise, self).__init__(*args, **kwargs)
    #     self.old_expertise_status = self.expertise_status
    #
    #
    # def create(self, *args, **kwargs):
    #     if self.expertise_status and self.old_expertise_status != self.expertise_status:
    #         self.date_of_last_change = datetime.now()
    #         super(Expertise, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.pk)


class ExpertiseComments(models.Model):
    BLOCK_CHOICES = [
        ('MA', 'Главное'),
        ('PR', 'Пререквизиты'),
        ('SE', 'Разделы'),
        ('TH', 'Темы'),
        ('SO', 'Источники'),
        ('EV', 'Оценчные средства'),
        ('RE', 'Результаты обучения'),
        ('CO', 'Контрольные средства'),
    ]


    comment_block = models.CharField(choices = BLOCK_CHOICES, max_length=1024, verbose_name="Блок комментария")
    user_expertise = models.ForeignKey('UserExpertise', on_delete = models.CASCADE)
    comment_text = models.CharField(max_length = 50000, verbose_name = "Комментарий")
    comment_date = models.DateTimeField(auto_now_add=True, blank=True, verbose_name='Дата комментария')
