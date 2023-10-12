import datetime

from django.contrib.postgres.forms import JSONField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from analytics_project import settings
from .consts_for_models import *


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class PracticeTemplate(models.Model):
    general_provisions = models.TextField(max_length=16384, default=GENERAL, verbose_name="Общие положения")
    structure_and_content = models.TextField(max_length=16384, default=STRUCTURE,
                                             verbose_name="CОДЕРЖАНИЕ И СТРУКТУРА ПРАКТИКИ")

    reporting_materials = models.TextField(max_length=16384, default=REPORTS,
                                           verbose_name="ОТЧЕТНЫЕ МАТЕРИАЛЫ ПО ПРАКТИКЕ")
    ovz = models.TextField(max_length=8192, default=OVZ, verbose_name="Проведение ГИА для лиц с ОВЗ")


class Practice(models.Model):
    PRIMARY_VOCATIONAL_EDUCATION = 'primary_vocational_education'
    SECONADARY_VOCATIONAL_EDUCATION = 'secondary_vocational_education'
    BACHELOR = 'bachelor'
    SPECIALIST = 'specialist'
    MASTER = 'master'
    All_LEVELS = 'All_levels'
    QUALIFICATION_CHOICES = (
        (PRIMARY_VOCATIONAL_EDUCATION, 'Primary vocational education'),
        (SECONADARY_VOCATIONAL_EDUCATION, 'Secondary vocational education'),
        (BACHELOR, 'Bachelor'),
        (SPECIALIST, 'Specialist'),
        (MASTER, 'Master'),
        (All_LEVELS, 'All_levels')
    )

    languages_for_wp = (
        ('ru', 'ru'),
        ('en', 'en'),
        ('kz', 'kz'),
        ('de', 'de'),
        ('ru/en', 'ru/en'),
    )

    kinds = (
        ('educational', 'учебная'),
        ('production', 'производственная'),
    )
    ways = (
        ('stationary', 'Стационарная '),
        ('external', 'Выездная '),
        ('stationary-external', 'Стационарно / выездная '),
    )
    formats = (
        ('dedicated', 'Выделенная '),
        ('dispersed', 'Рассредоточенная'),
    )
    types = (
        ('intro', 'ознакомительная'),
        ('std-intro', 'учебно-ознакомительная'),
        ('tech', 'технологическая'),
        ('constr', 'конструкторская'),
        ('sci-res', 'научно-исследовательская'),
        ('sci-res-work', 'научно-исследовательская работа'),
        ('cons-exp', 'консультативно-экспертная'),
        ('res-inter', 'научно-исследовательская работа / Research Internship'),
        ('org-contr', 'организационно-управленческая'),
        ('sci-ped', 'научно-педагогическая'),
        ('exp-res', 'экспериментально-исследовательская работа'),
        ('proj-constr', 'проектно-конструкторская'),
        ('tech-proj-inter', 'проектно конструкторская / Tech Project Internship'),
        ('prod-tech', 'производственно-технологическая'),
        ('ind-tech', 'технологическая (проектно-технологическая) / Industrial and tech Internship'),
        ('teh-proj-tech-intet', 'технологическая (проектно-технологическая)/ Tech Project Internship'),
        ('tech-proj-tech', 'технологическая (проектно-технологическая)'),
        ("expl", 'эксплуатационная'),
        ('senior-inter', 'преддипломная'),
        ('senior-inter-eng', 'преддипломная / Senior internship'),
        ('inter', 'стажировка'),
    )
    discipline_code = models.IntegerField(max_length=1024, blank=True, null=True)
    title = models.CharField(max_length=1024, verbose_name="Наименование", blank=True, null=True)

    editors = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="editors_practice",
                                     verbose_name="Редакторы РПД",
                                     blank=True, null=True)

    practice_base = models.ForeignKey('PracticeTemplate', on_delete=models.SET_NULL,
                                      verbose_name='Базовый шаблон Практики',
                                      related_name='practice_heir', blank=True, null=True)
    year = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(1984), max_value_current_year], blank=True, null=True)
    authors = models.CharField(max_length=1024, verbose_name="Авторский состав", blank=True, null=True)
    # Это поле пока оставляем текстовым, когда станет понятно что ОХ, сделаем подтягиеваемым программно (или нет?)
    op_leader = models.CharField(max_length=1024, verbose_name="Руководитель образовательной программы",
                                 blank=True, null=True)
    structural_unit = models.ForeignKey('workprogramsapp.StructuralUnit', on_delete=models.SET_NULL,
                                        verbose_name='Структурное подразделени',
                                        related_name='practice_in_structural_unit', blank=True, null=True)

    language = models.CharField(choices=languages_for_wp, max_length=15, verbose_name='Языки',
                                blank=True, null=True)
    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name='Квалификация',
                                     blank=True, null=True)
    kind_of_practice = models.CharField(choices=kinds, max_length=15, verbose_name='Вид практики',
                                        blank=True, null=True)
    type_of_practice = models.CharField(choices=types, max_length=15, verbose_name='Тип практики',
                                        blank=True, null=True)
    way_of_doing_practice = models.CharField(choices=ways, max_length=15, verbose_name='Способ прохождения практики',
                                             blank=True, null=True)
    format_practice = models.CharField(choices=formats, max_length=15, verbose_name='Формат прохождения практики',
                                       blank=True, null=True)

    features_content_and_internship = models.TextField(max_length=4096,
                                                       verbose_name="Особенности содержания и прохождения практики",
                                                       blank=True, null=True)
    features_internship = models.TextField(max_length=4096,
                                           verbose_name="Особенности содержания практики",
                                           blank=True, null=True)
    additional_reporting_materials = models.TextField(max_length=4096,
                                                      verbose_name="ДОПОЛНИТЕЛЬНЫЕ ОТЧЕТНЫЕ МАТЕРИАЛЫ ПО ПРАКТИКЕ",
                                                      default="презентация, отчет на 20 страниц",
                                                      blank=True, null=True)
    form_of_certification_tools = models.CharField(max_length=4096,
                                                   verbose_name="Форма  промежуточной аттестации")
    passed_great_mark = models.TextField(max_length=4096, default=GREAT,
                                         verbose_name="Зачтено (отлично)")
    passed_good_mark = models.TextField(max_length=4096, default=GOOD,
                                        verbose_name="Зачтено (хорошо)")
    passed_satisfactorily_mark = models.TextField(max_length=4096, default=SATIS,
                                                  verbose_name="Зачтено (удовлетворительно)")
    not_passed_mark = models.TextField(max_length=4096, default=UNSATISF,
                                       verbose_name="Не зачтено (неудовлетворительно)")
    bibliographic_reference = models.ManyToManyField('workprogramsapp.BibliographicReference', blank=True, null=True,
                                                     verbose_name='Рекомендуемые источники',
                                                     related_name='practise_refs')
    prerequisites = models.ManyToManyField("dataprocessing.Items", related_name='practice_prerequisites',
                                           through='PrerequisitesOfPractice', blank=True, null=True,
                                           verbose_name="Пререквизиты")
    outcomes = models.ManyToManyField("dataprocessing.Items", related_name='practice',
                                      through='OutcomesOfPractice',
                                      verbose_name="Постреквизиты")

    evaluation_tools_current_control = models.TextField(max_length=8192, default=EVALUATION,
                                                        verbose_name="ОЦЕНОЧНЫЕ СРЕДСТВА ДЛЯ ПРОВЕДЕНИЯ ТЕКУЩЕГО КОНТРОЛЯ И  ПРОМЕЖУТОЧНОЙ АТТЕСТАЦИИ ПО ПРАКТИКЕ.Текущий контроль")
    term_hours_info_table = JSONField()
    prac_isu_id = models.IntegerField(blank=True, null=True, verbose_name="ID практики в ИСУ")
    ze_v_sem = models.CharField(max_length=1024, blank=True, null=True,
                                verbose_name="Количество зачетных единиц по семестрам в Практике")
    evaluation_tools_v_sem = models.CharField(max_length=1024, blank=True, null=True,
                                              verbose_name="Оценочные средства по семестрам в Практике")
    number_of_semesters = models.IntegerField(blank=True, null=True, verbose_name="Количество семестров в практике")


class PrerequisitesOfPractice(models.Model):
    '''
    Модель для пререквизитов практик
    '''

    item = models.ForeignKey("dataprocessing.Items", on_delete=models.CASCADE, verbose_name="Пререквизит")
    practice = models.ForeignKey(Practice, on_delete=models.CASCADE, verbose_name="Рабочая программа")
    MasterylevelChoices = [
        ('1', 'low'),
        ('2', 'average'),
        ('3', 'high'),
    ]
    masterylevel = models.CharField(
        max_length=1,
        choices=MasterylevelChoices,
        default=1, verbose_name="Уровень"
    )


class OutcomesOfPractice(models.Model):
    '''
    Модель для результатов практик
    '''

    item = models.ForeignKey("dataprocessing.Items", on_delete=models.CASCADE, verbose_name="Пререквизит",
                             related_name="practice_item_in_outcomes")
    practice = models.ForeignKey(Practice, on_delete=models.CASCADE, verbose_name="Рабочая программа")
    MasterylevelChoices = [
        ('1', 'low'),
        ('2', 'average'),
        ('3', 'high'),
    ]
    masterylevel = models.CharField(
        max_length=1,
        choices=MasterylevelChoices,
        default=1, verbose_name="Уровень"
    )


# class PracticeInFieldOfStudy(models.Model):
#     work_program_change_in_discipline_block_module = models.ForeignKey(
#         "workprogramsapp.WorkProgramChangeInDisciplineBlockModule",
#         on_delete=models.CASCADE, related_name="practice_zun"
#         )
#     practice = models.ForeignKey(Practice, on_delete=models.CASCADE, related_name="zuns_for_pr")


class ZunPractice(models.Model):
    '''
    Модель для зунов
    '''
    practice_in_fs = models.ForeignKey('workprogramsapp.PracticeInFieldOfStudy', on_delete=models.SET_NULL, blank=True,
                                       null=True,
                                       related_name="zun_in_practice")
    indicator_in_zun = models.ForeignKey('workprogramsapp.Indicator', on_delete=models.CASCADE, blank=True, null=True,
                                         related_name="zun_practice")
    knowledge = models.CharField(max_length=10000, blank=True, null=True)
    skills = models.CharField(max_length=10000, blank=True, null=True)
    attainments = models.CharField(max_length=10000, blank=True, null=True)
    items = models.ManyToManyField('OutcomesOfPractice', verbose_name="Учебная сущность и уровень освоения",
                                   blank=True, null=True, related_name="item_in_practice")
    wp_in_fs_saved_fk_id_str_up = models.IntegerField(verbose_name="Id строки учебного плана", blank=True, null=True)
    prac_isu_id = models.IntegerField(blank=True, null=True, verbose_name="ID практики в ИСУ")
