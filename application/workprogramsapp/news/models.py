from django.db import models
from django.db.models import F
from mdeditor.fields import MDTextField
from dataprocessing.models import User


class NewsArticle(models.Model):
    title = models.CharField(max_length=512, verbose_name="Наименование новости", blank=True,
                             null=True)
    text = MDTextField(verbose_name="Текст новости", blank=True,
                            null=True)
    preview_img = models.TextField(blank=True, null=True)
    author = models.ForeignKey("dataprocessing.User", on_delete=models.SET_NULL, blank=True, null=True)
    notify_all = models.BooleanField(default=False, blank=True, null=True)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None, *args, **kwargs):
        super(NewsArticle, self).save(force_insert, force_update, *args, **kwargs)
        if self.notify_all:
            User.objects.all().update(unread_news=F('unread_news') + 1)
        else:
            User.objects.filter(do_news_notification=True).update(unread_news=F('unread_news') + 1)
