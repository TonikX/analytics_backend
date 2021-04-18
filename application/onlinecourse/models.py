from django.db import models
from dataprocessing.models import Items

class Institution(models.Model):
    """
    Модель для правообладателей онлайн курсов
    """
    title = models.CharField(max_length=1024, verbose_name='Название', blank=False, null=False)
    id_from_roo = models.CharField(max_length=1024, verbose_name='ID, который приходит от РОО', blank=True, null=True)

    class Meta:
        verbose_name = 'Правообладатель'
        verbose_name_plural = 'Правообладатели'

    def __str__(self):
        return self.title


class Platform(models.Model):
    """
    Модель для платформ, на которых размещены онлайн курсы
    """
    title = models.CharField(max_length=1024, verbose_name='Название', blank=False, null=False)
    id_from_roo = models.CharField(max_length=1024, verbose_name='ID, который приходит от РОО', blank=True, null=True)

    class Meta:
        verbose_name = 'Платформа'
        verbose_name_plural = 'Платформы'

    def __str__(self):
        return self.title


class OnlineCourse(models.Model):
    """
    Модель онлайн курса
    """
    title = models.CharField(max_length=1024, verbose_name='Название', blank=False, null=False)
    id_from_roo = models.CharField(max_length=1024, verbose_name='ID, который приходит от РОО', blank=True, null=True)
    description = models.TextField(verbose_name='Описание', blank=False, null=False)
    institution = models.ForeignKey('Institution', on_delete=models.CASCADE, verbose_name="Правообладатель", blank=False,
                                    null=False)
    platform = models.ForeignKey('Platform', on_delete=models.CASCADE, verbose_name="Платформа", blank=False,
                                 null=False)
    LanguageChoices = [
        ('ru', 'Русский'),
        ('en', 'Английский'),
        ('ru/en', 'Русский/Английский'),
    ]
    language = models.CharField(
        max_length=5,
        choices=LanguageChoices,
        verbose_name='Язык онлайн курса',
        blank=False, null=False
    )
    started_at = models.DateField(blank=True, null=True, verbose_name='Дата начала курса')
    created_at = models.DateField(blank=True, null=True, verbose_name='Дата создания курса')
    record_end_at = models.DateField(blank=True, null=True, verbose_name='Дата окончания записи на курс')
    finished_at = models.DateField(blank=True, null=True, verbose_name='Дата окончания курса')
    rating = models.FloatField(blank=True, null=True, verbose_name='Рейтинг пользователей')
    experts_rating = models.FloatField(blank=True, null=True, verbose_name='Рейтинг экспертов')
    visitors_number = models.IntegerField(blank=True, null=True,
                                          verbose_name='Количество записавшихся на текущую сессию')
    total_visitors_number = models.IntegerField(blank=True, null=True,
                                                verbose_name='Количество записавшихся на все сессии онлайн курса')
    duration = models.IntegerField(blank=True, null=True, verbose_name='Длительность онлайн курса, недель')
    volume = models.IntegerField(blank=True, null=True, verbose_name='Объем онлайн курса, часов')
    intensity_per_week = models.IntegerField(blank=True, null=True,
                                             verbose_name='Требуемое время для изучения онлайн-курса, часов в неделю')
    content = models.TextField(blank=True, null=True, verbose_name='Содержание онлайн курса')
    lectures_number = models.IntegerField(blank=True, null=True, verbose_name='Количество лекций')
    external_url = models.URLField(blank=True, null=True, verbose_name='Ссылка на онлайн курс')
    has_certificate = models.BooleanField(blank=True, null=True, verbose_name='Возможность получить сертификат')
    credits = models.FloatField(blank=True, null=True, verbose_name='Трудоемкость курса в з.е.')
    requirements = models.TextField(verbose_name='Требования', blank=True, null=True)
    competences = models.TextField(verbose_name='Компетенции', blank=True, null=True)
    learning_outcome = models.TextField(verbose_name='Результаты', blank=True, null=True)
    learning_outcome_list = models.ManyToManyField(Items)


    class Meta:
        verbose_name = 'Онлайн курс'
        verbose_name_plural = 'Онлайн курсы'

    def __str__(self):
        return self.title



