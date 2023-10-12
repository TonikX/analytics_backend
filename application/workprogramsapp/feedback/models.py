from django.db import models
from django.conf import settings

from workprogramsapp.models import WorkProgram

class FeedbackRecord(models.Model):
    '''
    Модель записи обратной связи к РПД
    '''
    types = [
        ('wish', 'wish'),
        ('comment', 'comment'),
        ('claim', 'claim')
    ]
    type = models.CharField(choices=types, default='1',max_length=1024, verbose_name="Тип комментария")
    word_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE,
                                                        verbose_name = 'Рабочая программа',
                                                        related_name="feedback_records")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    comment = models.CharField(max_length=1024, blank=True, null=True)
    date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return str(self.pk) + '/' + str(self.word_program) + '/' + str(self.user)
