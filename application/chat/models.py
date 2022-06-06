from django.db import models
from django.conf import settings

class Conversation(models.Model):
    '''
        Модель для диалогов
    '''

    conversation_name = models.CharField(max_length=128, blank=True, verbose_name='Название')

    def __str__(self):
        return self.conversation_name


class Message(models.Model):
    '''
        Модель для сообщений
    '''

    text = models.TextField(verbose_name='Текст сообщения', blank=False, null=False)
    sent_datetime = models.DateTimeField(editable=False, auto_now_add=True, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    conversation = models.ForeignKey('Conversation', on_delete=models.CASCADE, verbose_name="Диалог", blank=False,
                                 null=False)

    def __str__(self):
        return self.text


class ConversationMember(models.Model):
    '''
        Модель для участника диалога
    '''

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'conversation'], name='conversation member')
        ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    conversation = models.ForeignKey('Conversation', on_delete=models.CASCADE, verbose_name="Диалог", blank=False,
                                 null=False)
    joined_datetime = models.DateTimeField(editable=False, auto_now_add=True, blank=True, null=True)
    left_datetime = models.DateTimeField(editable=False, auto_now_add=False, blank=True, null=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)


class UserMessageStatus(models.Model):
    '''
        Модель для статуса сообщения
    '''

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'message'], name='unique message user')
        ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    message = models.ForeignKey('Message', on_delete=models.CASCADE, verbose_name="Сообщение", blank=False,
                                 null=False)
    read = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user) + " " + str(self.message) + " " + str(self.read)
