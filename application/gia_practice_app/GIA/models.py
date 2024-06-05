import datetime

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

import gia_practice_app.GIA.consts_for_models as const
from analytics_project import settings


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class CriteriaVKR(models.Model):
    """Критерии оценивания ВКР."""

    great = models.TextField(max_length=4096, verbose_name="Отлично")
    good = models.TextField(max_length=4096, verbose_name="Хорошо")
    satisfactorily = models.TextField(max_length=4096, verbose_name="Удовлетворительно")
    unsatisfactory = models.TextField(
        max_length=4096, verbose_name="Неудовлетворительно"
    )


class GIABaseTemplate(models.Model):
    gia_components = models.CharField(
        max_length=1024,
        default="Подготовка к защите и защита ВКР",
        verbose_name="Составляющие государственной итоговой аттестации",
    )
    general_provisions = models.TextField(
        max_length=8192, default=const.GENERAL_PROVISION, verbose_name="Общие положения"
    )

    vkr_theme_choice_time = models.CharField(
        max_length=1024,
        default="1 декабря - 31 января",
        verbose_name="Сроки выбора и согласования темы и руководителя ВКР",
    )
    correction_theme_time = models.CharField(
        max_length=1024,
        default="до 31 марта",
        verbose_name="Сроки Корректировки / уточнения темы ВКР",
    )
    upload_to_isu_time = models.CharField(
        max_length=1024,
        default="за 10 дней до дня защиты ВКР",
        verbose_name="Сроки Загрузки итоговой работы в ИСУ",
    )
    manager_feedback_time = models.CharField(
        max_length=1024,
        default="за 7 дней до защиты ВКР",
        verbose_name="Сроки Отзыва руководителя ВКР",
    )
    manager_feedback_acception_time = models.CharField(
        max_length=1024,
        default="за 5 дней до защиты ВКР",
        verbose_name="Сроки подтверждения ознакомления с отзывом руководителя на ВКР в ИСУ",
    )
    presentation_of_materials_time = models.CharField(
        max_length=1024,
        default="за 2 дня до защиты ВКР",
        verbose_name="Сроки представления материалов в ГЭК",
    )
    vkr_defence_time = models.CharField(
        max_length=1024,
        default="По графику проведения ГИА по ОП",
        verbose_name="Сроки защиты ВКР",
    )

    structure_elements = models.TextField(
        max_length=4096,
        default=const.STRUCTURE_ELEMENTS,
        verbose_name="Структурные элементы ВКР",
    )
    professional_problems_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Готовность к решению профессиональных задач",
        related_name="vkr_prof_problems",
        blank=True,
        null=True,
    )
    vkr_mark = models.CharField(
        max_length=4096,
        default=const.VKR_MARK,
        verbose_name="Оценка ВКР на заседании ГЭК",
    )
    gia_ovz = models.TextField(
        max_length=8192,
        default=const.GIA_OVZ,
        verbose_name="Проведение ГИА для лиц с ОВЗ",
    )
    template_year = models.PositiveIntegerField(
        default=current_year(),
        validators=[MinValueValidator(1984), max_value_current_year],
        blank=True,
        null=True,
    )

    def save(self, *args, **kwargs):
        self.professional_problems_marks, created = CriteriaVKR.objects.get_or_create(
            great="да", good="да", satisfactorily="да", unsatisfactory="нет"
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Шаблон ГИА {self.template_year} года"


class GIA(models.Model):
    types = [
        ("1", "Exam"),
        ("2", "Differentiated credit"),
        ("3", "Offset"),
        ("4", "Coursework"),
        ("5", "course_project"),
    ]

    discipline_code = models.IntegerField(blank=True, null=True)
    title = models.CharField(
        max_length=1024, verbose_name="Наименование", blank=True, null=True
    )
    gia_base = models.ForeignKey(
        "GIABaseTemplate",
        on_delete=models.SET_NULL,
        verbose_name="Базовый шаблон ГИА",
        related_name="gia_heir",
        blank=True,
        null=True,
    )

    editors = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="editors_gia",
        verbose_name="Редакторы РПД",
        blank=True,
    )
    year = models.PositiveIntegerField(
        default=current_year(),
        validators=[MinValueValidator(1984), max_value_current_year],
        blank=True,
        null=True,
    )
    authors = models.CharField(
        max_length=1024, verbose_name="Авторский состав", blank=True, null=True
    )
    # Это поле пока оставляем текстовым, когда станет понятно что ОХ, сделаем подтягиеваемым программно (или нет?)
    op_leader = models.CharField(
        max_length=1024,
        verbose_name="Руководитель образовательной программы",
        blank=True,
        null=True,
    )
    structural_unit = models.ForeignKey(
        "workprogramsapp.StructuralUnit",
        on_delete=models.SET_NULL,
        verbose_name="Структурное подразделени",
        related_name="gia_in_structural_unit",
        blank=True,
        null=True,
    )

    general_provisions_other_documents = models.CharField(
        max_length=8192,
        verbose_name="Другие документы по решению руководителя ОП",
        blank=True,
        null=True,
    )

    filling_and_approval_time = models.CharField(
        max_length=1024,
        default="не позднее 1 марта",
        verbose_name="Сроки заполнения и согласовани язадания на ВКР в ИСУ",
    )
    work_on_vkr_content_time = models.CharField(
        max_length=1024,
        default="1 декабря - 25 мая",
        verbose_name="Сроки работы над содержанием ВКР",
    )
    pre_defence_time = models.CharField(
        max_length=1024,
        default="февраль - 1 просмотр, май - 2 просмотр",
        verbose_name="Сроки предварительналй защита ВКР",
    )
    anti_plagiarism_analysis_time = models.CharField(
        max_length=1024,
        default="проверка май - перед предзащитой",
        verbose_name="Сроки проверки текста ВКР в системе “Антиплагиат”",
    )

    preliminary_defense = models.CharField(
        max_length=4096,
        verbose_name="Предварительная защита ВКР, Рекомендации",
        blank=True,
        null=True,
    )
    anti_plagiarism = models.CharField(
        max_length=4096,
        verbose_name="Проверка текста ВКР в системе “Антиплагиат”, Рекомендации",
        blank=True,
        null=True,
    )
    structure_elements_optional = models.TextField(
        max_length=4096,
        default=const.ADDITIONAL_STRUCTURE_ELEMENTS,
        verbose_name="структурные элементы ВКР, дополнительные",
        blank=True,
        null=True,
    )
    optional_design_requirements = models.CharField(
        max_length=4096,
        verbose_name="Дополнительные требования к оформлению ВКР",
        blank=True,
        null=True,
    )
    content_requirements = models.CharField(
        max_length=4096,
        verbose_name="Требования к содержанию ВКР",
        blank=True,
        null=True,
    )
    defence_presentation_requirements = models.CharField(
        max_length=4096,
        verbose_name="Требования к представлению ВКР на защите",
        blank=True,
        null=True,
    )
    content_correspondence_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Соответствие содержания работы утвержденной теме ВКР",
        related_name="vkr_content",
        blank=True,
        null=True,
    )
    relevance_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Обоснование актуальности темы, корректность постановки цели и задач исследования",
        related_name="vkr_relevance",
        blank=True,
        null=True,
    )
    specialization_correspondence_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Соответствие  работы направлению, профилю и специализации подготовки",
        related_name="vkr_specialization",
        blank=True,
        null=True,
    )
    correctness_of_methods_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Корректность выбора использования методов исследования",
        related_name="vkr_methods",
        blank=True,
        null=True,
    )
    quality_and_logic_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Качество, логика и полнота изложения представленных материалов",
        related_name="vkr_quality",
        blank=True,
        null=True,
    )
    validity_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Обоснованность положений, выносимых на защиту",
        related_name="vkr_validity",
        blank=True,
        null=True,
    )

    significance_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Научная и/или практическая значимость работы",
        related_name="vkr_significance",
        blank=True,
        null=True,
    )
    implementation_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Внедрение результатов работы",
        related_name="vkr_implementation",
        blank=True,
        null=True,
    )
    report_quality_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Качество доклада",
        related_name="vkr_report",
        blank=True,
        null=True,
    )
    presentation_quality_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Качество презентации",
        related_name="vkr_presentation",
        blank=True,
        null=True,
    )
    answers_quality_marks = models.ForeignKey(
        "CriteriaVKR",
        on_delete=models.SET_NULL,
        verbose_name="Качество и уровень ответов на вопросы",
        related_name="vkr_answers",
        blank=True,
        null=True,
    )
    ze_v_sem = models.CharField(
        max_length=1024,
        blank=True,
        null=True,
        verbose_name="Количество зачетных единиц в Практике",
    )
    type = models.CharField(
        choices=types,
        default="1",
        max_length=1024,
        verbose_name="Тип аттестационного оценочного средства",
    )

    def save(self, *args, **kwargs):
        self.content_correspondence_marks = CriteriaVKR.objects.create(
            great=const.CONTENT_GREAT,
            good=const.CONTENT_GOOD,
            satisfactorily=const.CONTENT_SATIS,
            unsatisfactory=const.CONTENT_UNSATISF,
        )
        self.relevance_marks = CriteriaVKR.objects.create(
            great=const.RELEV_GREAT,
            good=const.RELEV_GOOD,
            satisfactorily=const.RELEV_SATIS,
            unsatisfactory=const.RELEV_UNSATISF,
        )
        self.specialization_correspondence_marks = CriteriaVKR.objects.create(
            great=const.SPEC_GREAT,
            good=const.SPEC_GOOD,
            satisfactorily=const.SPEC_SATIS,
            unsatisfactory=const.SPEC_UNSATISF,
        )
        self.correctness_of_methods_marks = CriteriaVKR.objects.create(
            great=const.CORRECT_GREAT,
            good=const.CORRECT_GOOD,
            satisfactorily=const.CORRECT_SATIS,
            unsatisfactory=const.CORRECT_UNSATISF,
        )
        self.quality_and_logic_marks = CriteriaVKR.objects.create(
            great=const.QUALITY_GREAT,
            good=const.QUALITY_GOOD,
            satisfactorily=const.QUALITY_SATIS,
            unsatisfactory=const.QUALITY_UNSATISF,
        )
        self.validity_marks = CriteriaVKR.objects.create(
            great=const.VALIDITY_GREAT,
            good=const.VALIDITY_GOOD,
            satisfactorily=const.VALIDITY_SATIS,
            unsatisfactory=const.VALIDITY_UNSATISF,
        )
        self.significance_marks = CriteriaVKR.objects.create(
            great=const.SIGN_GREAT,
            good=const.SIGN_GOOD,
            satisfactorily=const.SIGN_SATIS,
            unsatisfactory=const.SIGN_UNSATISF,
        )
        self.implementation_marks = CriteriaVKR.objects.create(
            great=const.IMP_GREAT,
            good=const.IMP_GOOD,
            satisfactorily=const.IMP_SATIS,
            unsatisfactory=const.IMP_UNSATISF,
        )
        self.report_quality_marks = CriteriaVKR.objects.create(
            great=const.REPORT_GREAT,
            good=const.REPORT_GOOD,
            satisfactorily=const.REPORT_SATIS,
            unsatisfactory=const.REPORT_UNSATISF,
        )
        self.presentation_quality_marks = CriteriaVKR.objects.create(
            great=const.PRES_GREAT,
            good=const.PRES_GOOD,
            satisfactorily=const.PRES_SATIS,
            unsatisfactory=const.PRES_UNSATISF,
        )
        self.answers_quality_marks = CriteriaVKR.objects.create(
            great=const.ANSW_GREAT,
            good=const.ANSW_GOOD,
            satisfactorily=const.ANSW_SATIS,
            unsatisfactory=const.ANSW_UNSATISF,
        )

        super().save(*args, **kwargs)
