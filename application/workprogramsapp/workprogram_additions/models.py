from django.conf import settings
from django.db import models


class AdditionalMaterial(models.Model):
    """Модель материалов тем."""

    topic = models.ForeignKey(
        "Topic",
        on_delete=models.CASCADE,
        verbose_name="тема рабочей программы",
        related_name="additional_materials_for_topic",
    )
    title = models.CharField(max_length=300, verbose_name="Описание")
    url = models.URLField(verbose_name="Ссылка на материал")


class StructuralUnit(models.Model):
    title = models.CharField(max_length=300, verbose_name="Описание")
    isu_id = models.IntegerField(
        blank=True, null=True, verbose_name="ID структурного подразделения в ИСУ"
    )
    short_name = models.CharField(
        max_length=300,
        verbose_name="Аббревиатура",
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.title


class UserStructuralUnit(models.Model):
    status_choise = (
        ("leader", "leader"),
        ("deputy", "deputy"),
        ("employee", "employee"),
    )
    structural_unit = models.ForeignKey(
        "StructuralUnit",
        on_delete=models.SET_NULL,
        verbose_name="Структурное подразделени",
        related_name="user_in_structural_unit",
        blank=True,
        null=True,
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="user_for_structural_unit",
    )
    status = models.CharField(
        max_length=30,
        choices=status_choise,
        verbose_name="Тип пользователя",
        default="employee",
        blank=True,
        null=True,
    )


class UniversityPartner(models.Model):
    title = models.CharField(max_length=300, verbose_name="Наименование ВУЗа")
    isu_id = models.IntegerField(
        blank=True, null=True, verbose_name="ID вуза в ИСУ (при иналичии)"
    )
    country = models.CharField(
        blank=True, null=True, max_length=300, verbose_name="Страна"
    )

    def __str__(self):
        return self.title
