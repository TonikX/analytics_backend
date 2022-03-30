from django.db import models
from dataprocessing.models import Items


class OnlineCourse(models.Model):
    """
    Модель онлайн курса
    """
    title = models.CharField(max_length=4000, verbose_name='Название', blank=False, null=False)
    id_from_roo = models.CharField(max_length=4000, verbose_name='ID, который приходит от РОО', blank=True, null=True)
    description = models.TextField(verbose_name='Описание', blank=False, null=False)
    institution = models.CharField(max_length=4000, verbose_name='Правообладатель', blank=False, null=False)
    platform = models.CharField(max_length=4000, verbose_name='Платформа', blank=False, null=False)
    LanguageChoices = [
        ('ru', 'Русский'),
        ('en', 'Английский'),
        ('ru/en', 'Русский/Английский'),
    ]
    language = models.CharField(
        max_length=30,
        choices=LanguageChoices,
        verbose_name='Язык онлайн курса',
        blank=False, null=False
    )
    started_at = models.CharField(max_length=4000, blank=True, null=True, verbose_name='Дата начала курса')
    record_end_at = models.DateField(null=True, verbose_name='Дата окончания записи на курс')
    finished_at = models.DateField(null=True, verbose_name='Дата окончания курса')
    rating = models.FloatField(blank=True, null=True, verbose_name='Рейтинг пользователей')
    visitors_number = models.IntegerField(blank=True, null=True,
                                          verbose_name='Количество записавшихся на текущую сессию')
    duration = models.IntegerField(blank=True, null=True, verbose_name='Длительность онлайн курса, недель')
    content = models.CharField(max_length=40000, blank=True, null=True, verbose_name='Содержание онлайн курса')
    lectures_number = models.IntegerField(blank=True, null=True, verbose_name='Количество лекций')
    external_url = models.CharField(max_length=4000, blank=True, null=True, verbose_name='Ссылка на онлайн курс')
    roc_url = models.CharField(max_length=4000, blank=True, null=True, verbose_name='Ссылка на онлайн курс online.edu.ru')
    has_certificate = models.CharField(max_length=40, blank=True, null=True, verbose_name='Возможность получить сертификат')
    credits = models.FloatField(blank=True, null=True, verbose_name='Трудоемкость курса в з.е.')
    requirements = models.CharField(max_length=40000, verbose_name='Требования', blank=True, null=True)
    competences = models.CharField(max_length=40000, verbose_name='Компетенции', blank=True, null=True)
    learning_outcome = models.CharField(max_length=40000, verbose_name='Результаты', blank=True, null=True)
    learning_outcome_list = models.ManyToManyField(Items)
    actual = models.BooleanField(blank=False, default=True, verbose_name='Актуальный курс')

    class Meta:
        verbose_name = 'Онлайн курс'
        verbose_name_plural = 'Онлайн курсы'

    def __str__(self):
        return self.title
