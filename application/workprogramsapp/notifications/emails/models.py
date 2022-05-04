from django.conf import settings
from django.db import models


class SentMail(models.Model):
    """
    Отправленные письма
    """
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='users_for_mail',
                                  verbose_name='Пользователи, которым было отправлено это письмо', blank=True)
    topic = models.CharField(max_length=2048, blank=True, null=True, verbose_name="Тема письма")
    text = models.TextField(verbose_name="Текст письма", blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ('-date',)
