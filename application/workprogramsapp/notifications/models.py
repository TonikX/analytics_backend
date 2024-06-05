from django.conf import settings
from django.db import models

from workprogramsapp.expertise.models import Expertise, ExpertiseComments
from workprogramsapp.models import AcademicPlan


class UserNotification(models.Model):
    """Базовый класс оповещений."""

    status_choices = (
        ("read", "read"),
        ("unread", "unread"),
    )
    status = models.CharField(
        max_length=30,
        choices=status_choices,
        verbose_name="Статус нотификации",
        default="unread",
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True
    )
    message = models.CharField(
        max_length=4096, verbose_name="Сообщение нотификации", blank=True, null=True
    )
    notification_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ("-notification_date",)


class ExpertiseNotification(UserNotification):
    """Оповещения об экспертизе."""

    expertise = models.ForeignKey(
        Expertise, on_delete=models.CASCADE, blank=True, null=True
    )


class AcademicPlanUpdateNotification(UserNotification):
    """Оповещения об обновлениях в учебном плане."""

    academic_plan = models.ForeignKey(
        AcademicPlan, on_delete=models.CASCADE, blank=True, null=True
    )


class NotificationComments(UserNotification):
    comment_new = models.ForeignKey(
        ExpertiseComments, on_delete=models.CASCADE, blank=True, null=True
    )


class EmailReset(models.Model):
    user = models.ForeignKey(
        "dataprocessing.User", on_delete=models.CASCADE, blank=True, null=True
    )
    key = models.CharField(max_length=256, blank=True, null=True)
    email = models.CharField(max_length=256, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)
