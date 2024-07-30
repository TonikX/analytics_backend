from django.db import models


class BlockSettings(models.Model):
    is_wp_blocked = models.BooleanField(verbose_name="Заблокировать РПД?", default=False)
    is_gia_blocked = models.BooleanField(verbose_name="Заблокировать ГИА?", default=False)
    is_practice_blocked = models.BooleanField(verbose_name="Заблокировать Практики?", default=False)

    @staticmethod
    def get_singleton():
        if not BlockSettings.objects.filter().exists():
            BlockSettings.objects.create()
        return BlockSettings.objects.filter().first()

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)
