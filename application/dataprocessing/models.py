from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings



class User(AbstractUser):
    '''
    Модель для пользователей
    '''

    #role = models.CharField("Роль", max_length=15, default='student')
    #tel = models.CharField("Телефон", max_length=15, blank=True, null=True)
    patronymic = models.CharField(max_length=1024, blank=True, null=True)
    isu_number = models.CharField(max_length=1024, blank=True, null=True)

    # def __str__(self):
    #     return self.first_name + ' ' + self.last_name

    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

    def __str__(self):
        return self.username


class Domain(models.Model):
    name = models.CharField(max_length=200, blank=True, verbose_name='Название')
    user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name = 'domain_user', verbose_name='Пользователи')
    def __str__(self):
        return self.name


class Items(models.Model):
    name = models.CharField(max_length=200, blank=True, verbose_name='Название')
    domain = models.ForeignKey(Domain, null = True, blank = True, help_text='Укажите область', verbose_name='Область знаний',on_delete=models.CASCADE,)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = 'Автор', verbose_name='Пользователи', blank=True, null = True)
    value = models.IntegerField(blank=True, null = True, default = 0, verbose_name='Значение')
    source = models.CharField(max_length=200, blank=True, verbose_name='Источник')
    #date_created = models.DateField(auto_now_add = True)
    def __str__(self):
        return self.name


class Relation(models.Model):
    STATUS_CHOICES = (
        ('0', 'неопределенное'),
        ('1', 'включает в себя'),
        ('3', 'является пререквизитом для'),
        ('4', 'имеет пререквизит'),
        ('5', 'тождество'),
        ('6', 'относится к'),
        ('7', 'отсутствует'),
    )

    item1 = models.ForeignKey(Items,on_delete=models.CASCADE, related_name = 'item1', verbose_name='Элемент РПД')
    relation = models.CharField(max_length=10, choices=STATUS_CHOICES, default='1', verbose_name='Связь')
    item2 = models.ManyToManyField(Items, related_name = 'item2', verbose_name='Элемент РПД')




