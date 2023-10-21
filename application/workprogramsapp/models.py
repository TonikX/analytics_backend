import datetime

from django.conf import settings
from django.contrib.postgres.fields import JSONField, ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from model_clone import CloneMixin
from rest_framework.exceptions import ValidationError

from dataprocessing.models import Items
from onlinecourse.models import OnlineCourse, Institution
from workprogramsapp.educational_program.educational_standart.models import EducationalStandard, \
    TasksForEducationalStandard
from workprogramsapp.workprogram_additions.models import StructuralUnit


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year() + 2)(value)


class WorkProgram(CloneMixin, models.Model):
    '''
    Модель для рабочей программы
    '''
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
    status_choise = (
        ('w', 'inwork'),
        ('a', 'archive'),
    )

    extra_points_choise = (
        ('0', '0'),
        ('3', '3'),
    )

    languages_for_wp = (
        ('ru', 'ru'),
        ('en', 'en'),
        ('kz', 'kz'),
        ('de', 'de'),
        ('ru/en', 'ru/en'),
    )

    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True)
    discipline_code = models.CharField(max_length=1024, blank=True, null=True)
    subject_code = models.CharField(max_length=1024, blank=True, null=True)
    authors = models.CharField(max_length=1024, blank=True, null=True)
    prerequisites = models.ManyToManyField(Items, related_name='WorkProgramPrerequisites', )
    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name='Квалификация',
                                     blank=True, null=True)
    prerequisites = models.ManyToManyField(Items, related_name='WorkProgramPrerequisites',
                                           through='PrerequisitesOfWorkProgram', blank=True, null=True,
                                           verbose_name="Пререквизиты")
    outcomes = models.ManyToManyField(Items, related_name='WorkProgramOutcomes', through='OutcomesOfWorkProgram',
                                      verbose_name="Постреквизиты")
    title = models.CharField(max_length=1024, verbose_name="Название")
    hoursFirstSemester = models.IntegerField(blank=True, null=True, verbose_name="Количество часов в 1 семестре")
    hoursSecondSemester = models.IntegerField(blank=True, null=True, verbose_name="Количество часов в 2 семестре")
    bibliographic_reference = models.ManyToManyField('BibliographicReference', blank=True, null=True,
                                                     verbose_name='Библиогравическая_ссылка',
                                                     related_name='bibrefs')
    description = models.CharField(max_length=5000, blank=True, null=True)
    video = models.CharField(max_length=1024, blank=True, null=True)
    credit_units = models.CharField(max_length=1024, blank=True, null=True)
    semester_hour = models.CharField(max_length=1024, blank=True, null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    work_status = models.CharField(max_length=1, choices=status_choise, verbose_name='Архив', default='w')
    hours = models.IntegerField(blank=True, null=True, verbose_name="Сумма часов по разделам")
    extra_points = models.CharField(choices=extra_points_choise, max_length=1, verbose_name='Квалификация',
                                    blank=True, null=True)
    editors = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="editors", verbose_name="Редакторы РПД",
                                     blank=True, null=True)
    language = models.CharField(choices=languages_for_wp, max_length=15, verbose_name='Языки',
                                blank=True, null=True)
    have_course_project = models.BooleanField(blank=True, null=True, verbose_name="Имеет ли РПД курсовой проект")
    have_diff_pass = models.BooleanField(blank=True, null=True, verbose_name="Имеет ли РПД дифф. зачет")
    have_pass = models.BooleanField(blank=True, null=True, verbose_name="Имеет ли РПД зачет")
    have_exam = models.BooleanField(blank=True, null=True, verbose_name="Имеет ли РПД экзамен")
    lecture_hours = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы лекций")
    practice_hours = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы Практик")
    lab_hours = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы лабораторных работ")
    srs_hours = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы СРС")
    old_discipline_code = models.CharField(max_length=1024, blank=True, null=True)
    wp_isu_id = models.IntegerField(blank=True, null=True, verbose_name="ID РПД в ИСУ")
    structural_unit = models.ForeignKey('StructuralUnit', on_delete=models.SET_NULL,
                                        verbose_name='Структурное подразделени',
                                        related_name='workprogram_in_structural_unit', blank=True, null=True)
    bars = models.BooleanField(default=False, verbose_name="Нужно отослать дисциплину в БАРС")
    lecture_hours_v2 = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы лекций")
    practice_hours_v2 = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы Практик")
    lab_hours_v2 = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы лабораторных работ")
    srs_hours_v2 = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы СРС")
    contact_hours_v2 = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Часы Контактной работы")
    consultation_v2 = models.CharField(max_length=1024, null=True, blank=True, verbose_name="Консультации")
    number_of_semesters = models.IntegerField(blank=True, null=True, verbose_name="Количество семестров в дисциплине")
    ze_v_sem = models.CharField(max_length=1024, blank=True, null=True, verbose_name="Количество зачетных единиц у РПД")
    read_notifications = models.CharField(max_length=256,
                                          default='False, False, False, False, False, False, False, False, False, False',
                                          verbose_name="Прочитанность уведомлений")
    implementation_format_choise = (
        ('online', 'online'),
        ('mixed', 'mixed'),
        ('offline', 'offline'),
    )
    implementation_format = models.CharField(choices=implementation_format_choise, max_length=15,
                                             verbose_name='формат реализации',
                                             blank=True, null=True)
    is_oferta = models.BooleanField(blank=True, null=True, verbose_name="Оферта")
    moodle_link = models.URLField(max_length=1024, null=True, blank=True, verbose_name="Ссылка на мудл")

    _clone_many_to_many_fields = ['prerequisites', 'field_of_studies', 'bibliographic_reference', 'editors']

    def __str__(self):
        return (self.title)

    def new_relations(old_descipline_code, new_descipline_code):
        old_work_program = WorkProgram.objects.get(id=old_descipline_code)
        print('old', old_work_program, old_work_program.id)
        new_work_program = WorkProgram.objects.get(id=new_descipline_code)
        print('new', new_work_program, new_work_program.id)
        for wp_in_fs in WorkProgramInFieldOfStudy.objects.filter(work_program=old_work_program):
            wp_in_fs.work_program = new_work_program
            wp_in_fs.save()
            print('замена прошла')
        old_work_program.delete()

    def clone_programm(programm_id):
        program = WorkProgram.objects.get(pk=programm_id)
        clone_program = program.make_clone()
        discipline = DisciplineSection.objects.filter(work_program_id=programm_id)
        disp_clone_list = []
        eva_clone_list = []
        for disp in discipline:
            clone_discipline = disp.make_clone(attrs={'work_program': clone_program})
            topic = Topic.objects.filter(discipline_section=disp)
            for top in topic:
                top.make_clone(attrs={'discipline_section': clone_discipline})
            clone_dict = {'id': disp.id, 'clone_id': clone_discipline.id}
            disp_clone_list.append(clone_dict)
        for eva in EvaluationTool.objects.filter():
            evaluation_disciplines = eva.evaluation_tools.all().filter(work_program_id=programm_id)
            if (evaluation_disciplines):
                clone_eva = eva.make_clone()
                for disp in evaluation_disciplines:
                    for elem in disp_clone_list:
                        if (disp.id == elem['id']):
                            DisciplineSection.objects.get(pk=elem['clone_id']).evaluation_tools.add(clone_eva)
                clone_dict = {'id': eva.id, 'clone_id': clone_eva.id}
                eva_clone_list.append(clone_dict)
        for out in OutcomesOfWorkProgram.objects.filter(workprogram=program):
            clone_outcomes = out.make_clone(attrs={'workprogram': clone_program})
            for eva in out.evaluation_tool.all():
                for elem in eva_clone_list:
                    if (eva.id == elem['id']):
                        clone_outcomes.evaluation_tool.add(EvaluationTool.objects.get(pk=elem['clone_id']))
        for cerf in СertificationEvaluationTool.objects.filter(work_program=program):
            cerf.make_clone(attrs={'work_program': clone_program})
        return clone_program


class PrerequisitesOfWorkProgram(models.Model):
    '''
    Модель для пререквизитов рабочей программы
    '''

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Пререквизит")
    workprogram = models.ForeignKey(WorkProgram, on_delete=models.CASCADE, verbose_name="Рабочая программа")
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
    # def __str__(self):
    #     return self.item


class OutcomesOfWorkProgram(CloneMixin, models.Model):
    '''
    Модель для результатов обучения по рабочей программе
    '''
    # class Meta:
    #     auto_created = True

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Постреквизит",
                             related_name='item_in_outcomes')
    workprogram = models.ForeignKey(WorkProgram, on_delete=models.CASCADE, verbose_name="Рабочая программа")
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
    evaluation_tool = models.ManyToManyField('EvaluationTool', verbose_name='Оценочные средства',
                                             related_name='evaluation_tool_of_outcomes', blank=True, null=True)
    # _clone_many_to_many_fields =['evaluation_tool']

    # def __str__(self):
    #     return str(self.item) + str(self.workprogram)


class FieldOfStudy(models.Model):
    '''
    Модель для направлений
    '''
    PRIMARY_VOCATIONAL_EDUCATION = 'primary_vocational_education'
    SECONADARY_VOCATIONAL_EDUCATION = 'secondary_vocational_education'
    BACHELOR = 'bachelor'
    SPECIALIST = 'specialist'
    MASTER = 'master'
    QUALIFICATION_CHOICES = (
        (PRIMARY_VOCATIONAL_EDUCATION, 'Primary vocational education'),
        (SECONADARY_VOCATIONAL_EDUCATION, 'Secondary vocational education'),
        (BACHELOR, 'Bachelor'),
        (SPECIALIST, 'Specialist'),
        (MASTER, 'Master')
    )

    INTERNAL = 'internal'
    EXTRAMURAL = 'extramural'
    EDUCATION_FORM_CHOICES = (
        (INTERNAL, 'Internal'),
        (EXTRAMURAL, 'Extramural'),
    )
    number = models.CharField(max_length=1024, verbose_name='Шифр ОП')
    title = models.CharField(max_length=1024, verbose_name='Название ОП', blank=True, null=True)
    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024,
                                     verbose_name='Квалификация', blank=True, null=True)
    educational_profile = models.CharField(max_length=1024, verbose_name='Профиль ОП',
                                           blank=True, null=True)
    faculty = models.CharField(max_length=150, verbose_name='Факультет (Структурное подразделение)',
                               null=True)
    education_form = models.CharField(choices=EDUCATION_FORM_CHOICES, max_length=1024, verbose_name='Форма обучения',
                                      blank=True, null=True)

    def __str__(self):
        return 'Номер: ' + self.number + ' / Название: ' + str(self.title)


class CourseFieldOfStudy(models.Model):
    """
    Модель для связи онлайн курса и направления подготовки
    """
    course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, verbose_name="Онлайн курс", blank=False,
                               null=False, related_name="course_field_of_study")
    field_of_study = models.ForeignKey(FieldOfStudy, on_delete=models.CASCADE, verbose_name='Направление подготовки')

    class Meta:
        verbose_name = 'Онлайн курс и направления подготовки'
        verbose_name_plural = 'Онлайн курсы и направления подготовки'


class CourseCredit(models.Model):
    """
    Модель для связи онлайн курса, направления подготовки и  перезачета
    """
    course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, verbose_name="Онлайн курс", blank=False,
                               null=False, related_name="course_credit")
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, verbose_name="Правообладатель", blank=False,
                                    null=False)
    field_of_study = models.ForeignKey('FieldOfStudy', on_delete=models.CASCADE, verbose_name='Направление подготовки')

    class Meta:
        verbose_name = 'Перезачет'
        verbose_name_plural = 'Перезачеты'


class AcademicPlan(models.Model):
    '''
    Модель учебного плана
    '''
    PRIMARY_VOCATIONAL_EDUCATION = 'primary_vocational_education'
    SECONADARY_VOCATIONAL_EDUCATION = 'secondary_vocational_education'
    BACHELOR = 'bachelor'
    SPECIALIST = 'specialist'
    MASTER = 'master'
    QUALIFICATION_CHOICES = (
        (PRIMARY_VOCATIONAL_EDUCATION, 'Primary vocational education'),
        (SECONADARY_VOCATIONAL_EDUCATION, 'Secondary vocational education'),
        (BACHELOR, 'Bachelor'),
        (SPECIALIST, 'Specialist'),
        (MASTER, 'Master')
    )
    INTERNAL = 'internal'
    EXTRAMURAL = 'extramural'
    EDUCATION_FORM_CHOICES = (
        (INTERNAL, 'Internal'),
        (EXTRAMURAL, 'Extramural'),
    )

    check_status = (
        ('in_work', 'in_work'),
        ('on_check', 'on_check'),
        ('verified', 'verified'),
    )

    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name='- Квалификация',
                                     blank=True, null=True)
    educational_profile = models.CharField(max_length=1024, verbose_name='- Профиль ОП', blank=True, null=True)
    number = models.CharField(max_length=1024, verbose_name='- Номер учебного плана', blank=True,
                              null=True)
    # field_of_study = models.ManyToManyField('FieldOfStudy', related_name="block_in_academic_plan", blank = True, null = True)
    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True)
    year = models.CharField(max_length=1024, blank=True, null=True)
    education_form = models.CharField(choices=EDUCATION_FORM_CHOICES, max_length=1024, verbose_name='Форма обучения',
                                      blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Автор учебного плана', on_delete=models.CASCADE,
                               related_name='academic_plan_author', blank=True, null=True)
    ap_isu_id = models.PositiveIntegerField(verbose_name="ID учебного плана в ИСУ", blank=True, null=True)
    on_check = models.CharField(max_length=1024, verbose_name="Статус проверки", choices=check_status,
                                default="in_work")
    excel_generation_errors = JSONField(blank=True, null=True, verbose_name="Список ошибок в УП")

    # TODO: Добавить год набора

    def __str__(self):
        return 'Наш ИД: ' + str(self.id) + ' / ИСУ ИД: ' + str(self.ap_isu_id)

    def clone_descipline_blocks(id, siap):
        DisciplineBlocks = DisciplineBlock.objects.filter(academic_plan__educational_profile='Экспертный профиль')
        for Block in DisciplineBlocks:
            block_clone = Block.make_clone(attrs={'academic_plan_id': siap.data.get("id")})
            print(Block.modules_in_discipline_block.all())
            for Module in Block.modules_in_discipline_block.all():
                module_clone = Module.make_clone(attrs={'descipline_block_id': block_clone.id})

    def new_descipline_blocks(iap, siap):
        blocks = ['Блок 1', 'Блок 2', 'Блок 3']
        print(siap.data.get("id"))

        for block in blocks:
            db = DisciplineBlock()
            db.name = block
            db.academic_plan_id = siap.data.get("id")
            db.save()
            print(db.id)
            DisciplineBlock.new_descipline_block_modules(db.id)

    def get_all_changeblocks_from_ap(self):
        changeblock_in_ap = WorkProgramChangeInDisciplineBlockModule.objects.none()
        for block in DisciplineBlock.objects.filter(academic_plan__id=self.id):
            for module in DisciplineBlockModule.objects.filter(descipline_block=block):
                changeblock_in_ap = changeblock_in_ap | DisciplineBlockModule.get_all_changeblocks_from_module(module)
        return changeblock_in_ap


class EducationalProgram(models.Model):
    '''
    Модель описания образовтаельной программы
    '''
    PRIMARY_VOCATIONAL_EDUCATION = 'primary_vocational_education'
    SECONADARY_VOCATIONAL_EDUCATION = 'secondary_vocational_education'
    BACHELOR = 'bachelor'
    SPECIALIST = 'specialist'
    MASTER = 'master'
    QUALIFICATION_CHOICES = (
        (PRIMARY_VOCATIONAL_EDUCATION, 'Primary vocational education'),
        (SECONADARY_VOCATIONAL_EDUCATION, 'Secondary vocational education'),
        (BACHELOR, 'Bachelor'),
        (SPECIALIST, 'Specialist'),
        (MASTER, 'Master')
    )
    INTERNAL = 'internal'
    EXTRAMURAL = 'extramural'
    EDUCATION_FORM_CHOICES = (
        (INTERNAL, 'Internal'),
        (EXTRAMURAL, 'Extramural'),
    )

    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name='Квалификация',
                                     blank=True, null=True)
    # academic_plan = models.ForeignKey('ImplementationAcademicPlan', on_delete=models.CASCADE, verbose_name = 'Учебный план', related_name="academic_plan_in_educational_program")
    year_of_recruitment = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(1984), max_value_current_year])
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    academic_plan_for_ep = models.ForeignKey('ImplementationAcademicPlan', on_delete=models.SET_NULL,
                                             verbose_name='Учебный план_1',
                                             related_name="academic_plan_in_educational_program", blank=True, null=True)


class KindsOfActivity(models.Model):
    """
    Сферы проф. деятельности
    """
    name = models.CharField(max_length=1024, verbose_name='имя сферы проф. деятельности', blank=True, null=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = '1.1 Сферы деятельности в проф стандарте'
        verbose_name_plural = '1.1 Сферы деятельности в проф стандарте'


class ObjectsOfActivity(models.Model):
    """
    Объекты проф. деятельности
    """
    name = models.CharField(max_length=1024, verbose_name='имя объекта проф. деятельности', blank=True, null=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = '2.2 Объекты проф. деятельности выпускников'
        verbose_name_plural = '2.2 Объекты проф. деятельности выпускников'


class EmployerRepresentative(models.Model):
    organization_name = models.CharField(max_length=512, verbose_name="Наименование организации", blank=True,
                                         null=True)
    employer_position = models.CharField(max_length=512, verbose_name="Позиция работодателя", blank=True,
                                         null=True)

    fio_employer = models.CharField(max_length=512, verbose_name="ФИО работодателя", blank=True,
                                    null=True)
    general_characteristic = models.ForeignKey('GeneralCharacteristics', on_delete=models.SET_NULL,
                                               related_name='employers_in_characteristic',
                                               verbose_name="Общая характеристика", blank=True, null=True)


class GeneralCharacteristics(models.Model):
    '''
    Модель описания характеристики образовтаельной программы
    '''

    languages_for_gc = (
        ('ru', 'ru'),
        ('en', 'en'),
        ('kz', 'kz'),
        ('de', 'de'),
        ('ru/en', 'ru/en'),
    )

    format_choices = (
        ('online', 'online'),
        ('offline', 'offline'),
        ('mixed', 'mixed'),
    )

    check_status = (
        ('in_work', 'in_work'),
        ('on_check', 'on_check'),
        ('verified', 'verified'),
    )

    educational_program = models.ManyToManyField('ImplementationAcademicPlan', verbose_name='Образовательная программа',
                                                 related_name="general_characteristics_in_educational_program",
                                                 blank=True, null=True)
    area_of_activity = models.ManyToManyField('ProfessionalStandard',
                                              verbose_name='Проф. Стандарт/Область профессиональной деятельности',
                                              blank=True, null=True, related_name="area_in_characteristic")
    additional_area_of_activity = models.ManyToManyField('ProfessionalStandard',
                                                         verbose_name='Дополнительные Области профессиональной деятельности',
                                                         blank=True, null=True,
                                                         related_name="add_area_in_characteristic")
    objects_of_activity = models.ManyToManyField(ObjectsOfActivity,
                                                 verbose_name="Объекты проф. деятельности выпускников", blank=True,
                                                 null=True)
    kinds_of_activity = models.ManyToManyField(KindsOfActivity,
                                               verbose_name="Сферы профессиональной деятельности, к которому (которым) готовятся выпускники",
                                               blank=True, null=True)
    tasks_of_activity = models.ForeignKey(TasksForEducationalStandard, blank=True, null=True, on_delete=models.SET_NULL,
                                          verbose_name="Тип (типы) профессиональных задач, к решению которых готовятся выпускники")
    annotation = models.TextField(max_length=55512,
                                  verbose_name="Аннотация основной профессиональной образовательной программы",
                                  blank=True, null=True)

    #########################################
    educational_standard = models.ForeignKey(EducationalStandard, on_delete=models.SET_NULL,
                                             verbose_name='Образовательный стандарт',
                                             related_name="educational_standard_in_educational_program", blank=True,
                                             null=True)
    tasks_for_prof_standards = models.ManyToManyField(TasksForEducationalStandard,
                                                      verbose_name='Список задач образовательного стандарта',
                                                      related_name="tasks_for_prof_standards_in_educational_program",
                                                      blank=True, null=True)
    language = models.CharField(choices=languages_for_gc, max_length=15, verbose_name='Языки',
                                blank=True, null=True)
    is_only_in_university = models.BooleanField(blank=True, null=True, verbose_name="Тольков в университете итмо?")
    is_global_educational_program = models.BooleanField(blank=True, null=True,
                                                        verbose_name="Имеет статус международной ОП?")

    is_online_format = models.BooleanField(blank=True, null=True, verbose_name="В сетевой форме?")
    collaboration_russian_in_online_format = models.CharField(max_length=2048, blank=True, null=True,
                                                              verbose_name="Совместно с российскими партнерами:")

    is_collaboration_foreign = models.BooleanField(blank=True, null=True, verbose_name="В форме совместной ОП?")
    collaboration_foreign = models.CharField(max_length=2048, blank=True, null=True,
                                             verbose_name="Совместно с иностранными партнерами:")

    realization_format = models.CharField(choices=format_choices, max_length=15, verbose_name='Формат реализации',
                                          blank=True, null=True)

    structural_unit_implementer = models.ForeignKey('StructuralUnit', on_delete=models.SET_NULL, blank=True, null=True,
                                                    verbose_name='Подразделение-реализатор')

    ep_supervisor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                      verbose_name="руководитель ОП", related_name="director_of_megafaculty_in_gh",
                                      blank=True, null=True)
    directors_position = models.CharField(max_length=512, verbose_name="должность руководителя ОП", blank=True,
                                          null=True)
    dean_of_the_faculty = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                                            verbose_name="Декан факультета", related_name="dean_of_the_faculty_in_gh",
                                            blank=True, null=True)
    dean_of_the_faculty_directors_position = models.CharField(max_length=512, verbose_name="должность Декана", blank=True,
                                          null=True)
    cluster_name = models.CharField(max_length=512, verbose_name="Имя подразделения, кластера, института", blank=True,
                                    null=True)
    science_type = models.BooleanField(blank=True, null=True, verbose_name="Научная ОП?")
    industrial_type = models.BooleanField(blank=True, null=True, verbose_name="Индустриальная ОП?")
    corporate_type = models.BooleanField(blank=True, null=True, verbose_name="Корпоративная ОП?")
    enterprise_type = models.BooleanField(blank=True, null=True, verbose_name="Предпринемательская ОП?")
    target_master_type = models.BooleanField(blank=True, null=True, verbose_name="Магистратура перспективных направлений?")
    on_check = models.CharField(max_length=1024, verbose_name="Статус проверки", choices=check_status,
                                default="in_work")

    def __str__(self):
        return str(self.educational_program)

    class Meta:
        verbose_name = '1. Общая характеристика'
        verbose_name_plural = '1. Общая характеристика'


class Department(models.Model):
    """
    Факультет
    """
    title = models.CharField(max_length=512, verbose_name="Название факультета")
    mini_titile = models.CharField(max_length=512, verbose_name="Краткое название факультета", blank=True, null=True)
    dean = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Декан", blank=True,
                             null=True)
    # Поля из сервиса расписаний
    isu_id = models.IntegerField(verbose_name="id в ISU", blank=True, null=True)
    service_id = models.IntegerField(verbose_name="id в апи-сервисе", blank=True, null=True)
    title_service = models.CharField(max_length=512, verbose_name="Название факультета из сервиса расписаний",
                                     blank=True, null=True)
    activity_type = models.CharField(max_length=512, verbose_name="тип деятельности", blank=True, null=True)
    version = models.IntegerField(verbose_name="Версия обновления", blank=True, null=True)
    updated_at = models.DateTimeField(verbose_name="Дата обновления", blank=True, null=True)

    def __str__(self):
        return str(self.title)


class GeneralizedLaborFunctions(models.Model):
    qualification_choice = (
        ('3', '3'),
        ('4', '4'),
        ('5', '5'),
        ('6', '6'),
        ('7', '7'),
        ('8', '8'),
    )

    code = models.CharField(max_length=512, verbose_name="Код обощенной трудовой функции",
                            blank=True, null=True)
    name = models.CharField(max_length=512, verbose_name="обобщенные трудовые функции", blank=True, null=True)
    qualification_level = models.CharField(choices=qualification_choice, max_length=512,
                                           verbose_name="обобщенные трудовые функции", blank=True, null=True)
    professional_standard = models.ForeignKey('ProfessionalStandard', on_delete=models.CASCADE,
                                              verbose_name="Профессиональный стандарт",
                                              blank=True, null=True, related_name='generalized_labor_functions')

    def __str__(self):
        return str(self.name)


class ProfessionalStandard(models.Model):
    """
    Профессиональный стандарт
    """
    title = models.CharField(max_length=512, verbose_name="Наименование профессионального стандарта из данной области")
    code = models.CharField(max_length=512, verbose_name="Код профессионального стандарта из данной области",
                            blank=True, null=True)
    name_of_prof_area = models.CharField(max_length=512,
                                         verbose_name="Наименование  области проф. деятельности",
                                         blank=True, null=True)
    code_of_prof_area = models.CharField(max_length=512, verbose_name="Код обощенной трудовой функции",
                                         blank=True, null=True)

    registration_number = models.IntegerField(verbose_name="Регистрационный номер", blank=True, null=True)

    # generalized_labor_functions = models.ManyToManyField(GeneralizedLaborFunctions,
    #                                                      verbose_name="обобщенные трудовые функции", blank=True)

    def __str__(self):
        return str(self.title)


class ImplementationAcademicPlan(models.Model):
    '''
    Модель приминения учебного плана в направлении
    '''
    PRIMARY_VOCATIONAL_EDUCATION = 'primary_vocational_education'
    SECONADARY_VOCATIONAL_EDUCATION = 'secondary_vocational_education'
    BACHELOR = 'bachelor'
    SPECIALIST = 'specialist'
    MASTER = 'master'
    QUALIFICATION_CHOICES = (
        (PRIMARY_VOCATIONAL_EDUCATION, 'Primary vocational education'),
        (SECONADARY_VOCATIONAL_EDUCATION, 'Secondary vocational education'),
        (BACHELOR, 'Bachelor'),
        (SPECIALIST, 'Specialist'),
        (MASTER, 'Master')
    )
    INTERNAL = 'internal'
    EXTRAMURAL = 'extramural'
    EDUCATION_FORM_CHOICES = (
        (INTERNAL, 'Internal'),
        (EXTRAMURAL, 'Extramural'),
    )

    languages_for_wp = (
        ('ru', 'ru'),
        ('en', 'en'),
        ('kz', 'kz'),
        ('de', 'de'),
        ('ru/en', 'ru/en'),
    )

    types_of_plan = (
        ('base', 'Базовый'),
        ('individual', 'Индивидуальный'),
    )

    academic_plan = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE, verbose_name='Учебный план',
                                      related_name="academic_plan_in_field_of_study", blank=True, null=True)
    field_of_study = models.ManyToManyField('FieldOfStudy', verbose_name='Направление подготовки',
                                            related_name="implementation_academic_plan_in_field_of_study")
    year = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(1984), max_value_current_year], blank=True, null=True)
    period_of_study = models.CharField(max_length=100, blank=True, null=True)
    op_isu_id = models.PositiveIntegerField(verbose_name="ID ОП в ИСУ", blank=True, null=True)
    ns_id = models.PositiveIntegerField(verbose_name="ID учебного плана в ИСУ", blank=True, null=True)
    ap_isu_id = models.PositiveIntegerField(verbose_name="ID учебного плана в ИСУ", blank=True, null=True)
    ns_id = models.PositiveIntegerField(verbose_name="ID учебного плана в ИСУ", blank=True, null=True)
    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name='Квалификация',
                                     blank=True, null=True)
    educational_profile = models.CharField(max_length=1024, verbose_name='Профиль ОП', blank=True, null=True)
    language = models.CharField(choices=languages_for_wp, max_length=15, verbose_name='Языки',
                                blank=True, null=True)
    title = models.CharField(max_length=1024, verbose_name='Название', blank=True, null=True)
    old_json = JSONField(blank=True, null=True)
    new_json = JSONField(blank=True, null=True)
    editors = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                     related_name='implementation_academic_plan_block_modules',
                                     verbose_name='Редакторы образовательной программы', blank=True)

    # Новые поля из ИСУ (по логике могут конфликтовать с нашей базой)
    plan_type = models.CharField(max_length=1024, choices=types_of_plan, verbose_name='Тип плана', default="base")
    training_period = models.IntegerField(default=0, verbose_name="Срок обучения в годах")
    structural_unit = models.ForeignKey('StructuralUnit', on_delete=models.SET_NULL,
                                        verbose_name='Структурное подразделение',
                                        related_name='implementation_academic_plan_in_structural_unit', blank=True,
                                        null=True)
    total_intensity = models.IntegerField(default=0, verbose_name="Количество зачетных единиц")
    military_department = models.BooleanField(verbose_name="Наличие военной кафедры", default=False)
    university_partner = models.ManyToManyField('UniversityPartner',
                                                verbose_name='ВУЗ партнер',
                                                related_name='implementation_academic_plan_in_university_partner',
                                                blank=True)
    isu_modified_plan = JSONField(blank=True, null=True, verbose_name="JSON УП из ИСУ с модифицированным ID модулей")

    def __str__(self):
        return 'НАШ ОП ид: ' + str(self.id) + ' / ' + 'ОП ИСУ ИД: ' + str(self.op_isu_id)
    @staticmethod
    def get_all_imp_by_modules(modules):
        imp_list = ImplementationAcademicPlan.objects.none()
        for module in modules:
            fathers = module.father_module.prefetch_related("father_module")
            if fathers:
                imp_list = imp_list|ImplementationAcademicPlan.get_all_imp_by_modules(fathers)
            else:
                imp_list = imp_list | ImplementationAcademicPlan.objects.filter(
                    academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block=module)
        return imp_list



class DisciplineBlock(CloneMixin, models.Model):
    '''
    Модель блока дисциплин
    '''
    name = models.CharField(max_length=1024)
    academic_plan = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE,
                                      verbose_name='Учебный план в направлении',
                                      related_name="discipline_blocks_in_academic_plan", blank=True, null=True)

    # work_program = models.ManyToManyField('WorkProgram', verbose_name = "Рабочая программа", blank=True, null=True)

    def __str__(self):
        return ('Ид: ' + str(self.id) + str(self.name) + '/ Учебный план: ' + str(self.academic_plan))

    def clone_descipline_block_modules(id):
        DisciplineBlockModules = DisciplineBlockModule.objects.all()
        clone = DisciplineBlockModules.make_clone(attrs={'academic_plan': id})
        print(clone)

    def new_descipline_block_modules(id):
        blocks = ['Модуль 1', 'Модуль 2', 'Модуль 3']
        print('id for modules', id)

        for block in blocks:
            db = DisciplineBlockModule()
            db.name = block
            db.descipline_block_id = id
            db.save()


class DisciplineBlockModule(CloneMixin, models.Model):
    '''
    Модель модуля блока дисциплин
    '''

    TYPES = [
        ('universal_module', 'Универсальный модуль'),
        ('universal_fundamental_module', 'Университетский фундаментальный модуль'),
        ('physical_culture', 'Физическая культура'),
        ('philosophy_thinking', 'Модуль «Философия+Мышление»'),
        ('digital_culture', 'Модуль «Цифровая культура»'),
        ('entrepreneurial_culture', 'Модуль «Предпринимательская культура»'),
        ('soft_skills', 'Модуль «Soft Skills»'),
        ('ognp', 'ognp'),
        ('natural_science_module', 'natural_science_module'),
        ('general_professional_module', 'Общепрофессиональный модуль'),
        ('elective_module', 'Элективный модуль по группе направлений'),
        ('interdisciplinary_module_of_the_faculty', 'Межпрофильный модуль факультета'),
        ('faculty_module', 'Факультетский модуль'),
        # ('profile_professional_module', 'profile_professional_module'),
        ('math_module', 'Математический модуль'),
        ('digital_culture_in_professional_activities', 'Цифровая культура в профессиональной деятельности'),
        ('specialization_module', 'specialization_module'),
        ('gia', 'ГИА'),
        ('practice', 'Практика'),
        ('optional_disciplines', 'Факультативные дисциплины'),
        ('profile_professional_module', 'Профильный профессиональный модуль'),
        ('f_ognp', 'Фундаментальный модуль по ОГНП')
    ]

    CHANGE_TYPES = [
        ('choose_n_from_m', 'choose_n_from_m'),
        ('all', 'all'),
        ('any_quantity', 'any_quantity'),
        ('by_credit_units', 'by_credit_units'),
        ('no_more_than_n_credits', 'no_more_than_n_credits'),
    ]

    type = models.CharField(choices=TYPES, max_length=100, default='faculty_module', verbose_name='Тип модуля')
    name = models.CharField(max_length=1024, verbose_name='Название модуля')
    descipline_block = models.ManyToManyField('DisciplineBlock', verbose_name='Модуль в блоке',
                                              related_name='modules_in_discipline_block', blank=True)
    order = models.IntegerField(blank=True, null=True, verbose_name="Порядок модулей")
    selection_rule = models.CharField(choices=CHANGE_TYPES, max_length=100, blank=True, null=True,
                                      verbose_name='Правило выбора модуля')
    selection_parametr = models.CharField(max_length=100, verbose_name='Параметр выбора модуля', blank=True, null=True)
    description = models.CharField(max_length=10240, verbose_name="Описания блока модуля дисциплин", blank=True,
                                   null=True)
    editors = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='discipline_block_modules',
                                     verbose_name='Редакторы образовательных модулей', blank=True)
    module_isu_id = models.IntegerField(blank=True, null=True, verbose_name="ID модуля в ИСУ")
    childs = models.ManyToManyField('self', related_name="father_module", blank=True, symmetrical=False,
                                    null=True)
    # father = models.ForeignKey('self', on_delete=models.SET_NULL, related_name="inheritage_module",blank=True, null=True)
    educational_programs_to_access = models.ManyToManyField('ImplementationAcademicPlan',
                                                            verbose_name='Разрешенные образовательные программы',
                                                            related_name="modules_to_access", blank=True, null=True)

    only_for_struct_units = models.BooleanField(verbose_name="Доавбление только для тех же структрных подразеделений",
                                                blank=True, null=True, default=False)

    orderings_for_ups = JSONField(blank=True, null=True, verbose_name="Данные для сортировки в учебных планах")
    orderings_for_modules = JSONField(blank=True, null=True, verbose_name="Данные для сортировки в модулях")

    isu_ids_by_fathers = JSONField(blank=True, null=True, verbose_name="id модуля в ису по отцам")

    clone_info_json = JSONField(blank=True, null=True, verbose_name="JSON  информацией о клонировании")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return 'ID: ' + str(self.name) + '/ Name:' + str(self.name)

    def clone_module(module_id):
        module = DisciplineBlockModule.objects.get(pk=module_id)
        clone_module = module.make_clone()
        wp_in_module = WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module)
        for change in wp_in_module:
            clone_change = change.make_clone(attrs={'discipline_block_module': clone_module})
            wp_in_fos = WorkProgramInFieldOfStudy.objects.filter(work_program_change_in_discipline_block_module=change)
            for wp in wp_in_fos:
                clone_wp_in_fos = wp.make_clone(attrs={'work_program_change_in_discipline_block_module': clone_change})
        return clone_module

    def is_included_in_plan(self):
        instance = self
        if instance.descipline_block.all().exists():
            return True
        fathers = DisciplineBlockModule.objects.filter(childs=instance)
        for father in fathers:
            if father.descipline_block.all().exists():
                return True
        for father in fathers:
            father_3rds = DisciplineBlockModule.objects.filter(childs=father)
            for f3 in father_3rds:
                if f3.descipline_block.all().exists():
                    return True
        return False

    def get_structural_units(self) -> set:
        set_of_unit_id = set()
        for editor in self.editors.all():
            for unit in StructuralUnit.objects.filter(user_in_structural_unit__user=editor):
                set_of_unit_id.add(unit.id)

        return set_of_unit_id

    @staticmethod
    def get_all_changeblocks_from_module(module):
        changeblocks_in_module = WorkProgramChangeInDisciplineBlockModule.objects.none()
        if module.childs.exists():
            for child in module.childs.all():
                changeblocks_in_module = DisciplineBlockModule.get_all_changeblocks_from_module(
                    child) | changeblocks_in_module
        else:
            return changeblocks_in_module | WorkProgramChangeInDisciplineBlockModule.objects.filter(
                discipline_block_module=module)
        return changeblocks_in_module

    @staticmethod
    def new_ordinal_number(block, old_ordinal_number, new_ordinal_number):
        '''
        :param new_ordinal_number: если равен -1, то значит запрос на удаление элемента из списка,
                                   любое другое значение - запрос на изменение порядка в списке.
        '''
        modules = DisciplineBlockModule.objects.filter(descipline_block=block).order_by(
            'orderings_for_ups__0__number')
        if new_ordinal_number == -1:
            for module in modules:
                for ap_index in module.orderings_for_ups:
                    if ap_index['up_id'] == block.academic_plan.id and ap_index['number'] > old_ordinal_number:
                        ap_index['number'] = ap_index['number'] - 1

        elif int(old_ordinal_number) > int(new_ordinal_number):
            for module in modules:
                for ap_index in module.orderings_for_ups:
                    print(ap_index)
                    if int(ap_index['up_id']) == block.academic_plan.id and int(ap_index['number']) == old_ordinal_number:
                        ap_index['number'] = new_ordinal_number
                    elif int(ap_index['up_id']) == block.academic_plan.id and new_ordinal_number <= int(
                            ap_index['number']) <= old_ordinal_number:
                        ap_index['number'] = int(ap_index['number']) + 1
                module.save()

        else:
            for module in modules:
                for ap_index in module.orderings_for_ups:
                    if int(ap_index['up_id']) == block.academic_plan.id and int(ap_index['number']) == old_ordinal_number:
                        ap_index['number'] = new_ordinal_number
                    elif int(ap_index['up_id']) == block.academic_plan.id and old_ordinal_number < int(
                            ap_index['number']) <= new_ordinal_number:
                        ap_index['number'] = int(ap_index['number']) - 1
                module.save()


class WorkProgramChangeInDisciplineBlockModule(CloneMixin, models.Model):
    '''
    Модель хранения блоков выбора в модуле
    '''
    REQUIRED = 'Required'
    OPTIONALLY = 'Optionally'
    OGNP_SET = 'OGNP_set'
    SET_SPECIALIZATION = 'Set_specialization'
    FACULTATIV = 'Facultativ'
    OPT_SPECIALIZATION = 'Opt_specialization'
    LANG = 'Lang'
    MODULE = 'Module'

    CHANGE_CHOICES = (
        (REQUIRED, 'Required'),
        (OPTIONALLY, 'Optionally'),
        (OGNP_SET, 'OGNP_set'),
        (SET_SPECIALIZATION, 'Set_specialization'),
        (FACULTATIV, 'Facultativ'),
        (OPT_SPECIALIZATION, 'Opt_specialization'),
        (LANG, 'Lang'),
        (MODULE, 'Module')

    )

    code = models.CharField(max_length=1024, blank=True, null=True)
    credit_units = models.CharField(max_length=1024, blank=True, null=True)
    semester_hour = models.CharField(max_length=1024, blank=True, null=True)

    semester_start = ArrayField(
        models.IntegerField(blank=True),
        verbose_name="В каком семестре начинается (массив)",
        default=[]
    )
    semester_duration = models.IntegerField(verbose_name="Сколько семестров длится", blank=True, null=True)

    change_type = models.CharField(choices=CHANGE_CHOICES, max_length=1024, verbose_name='Форма обучения', blank=True,
                                   null=True)
    discipline_block_module = models.ForeignKey('DisciplineBlockModule', on_delete=models.CASCADE,
                                                verbose_name='Модуль в блоке',
                                                related_name="change_blocks_of_work_programs_in_modules", blank=True,
                                                null=True)
    work_program = models.ManyToManyField('WorkProgram', verbose_name="Рабочая программа",
                                          through='WorkProgramInFieldOfStudy',
                                          related_name="work_program_in_change_block")
    gia = models.ManyToManyField('gia_practice_app.GIA', verbose_name="Гиа",
                                 related_name="gia_in_change_block",
                                 through='GiaInFieldOfStudy', blank=True, null=True)
    practice = models.ManyToManyField('gia_practice_app.Practice', verbose_name="Практики",
                                      related_name="practice_in_change_block",
                                      through='PracticeInFieldOfStudy',
                                      blank=True, null=True)
    subject_code = models.CharField(max_length=1024, verbose_name="Срок сдачи в неделях", blank=True, null=True)

    # zuns = models.ManyToManyField('Zun', verbose_name = "Зуны", through='WorkProgramInFieldOfStudy', related_name="zuns_in_changeblock")

    def __str__(self):
        return 'ID' + (str(self.id)) + (str(self.discipline_block_module))


class WorkProgramInFieldOfStudy(CloneMixin, models.Model):
    work_program_change_in_discipline_block_module = models.ForeignKey('WorkProgramChangeInDisciplineBlockModule',
                                                                       on_delete=models.SET_NULL,
                                                                       related_name="zuns_for_cb", blank=True, null=True)
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, related_name="zuns_for_wp")
    id_str_up = models.IntegerField(verbose_name="Id строки учебного плана", blank=True, null=True)

    backup_module = models.ForeignKey('DisciplineBlockModule', on_delete=models.CASCADE,
                                      related_name="module_backup", blank=True, null=True)
    backup_ap = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE, related_name="ap_backup", blank=True,
                                  null=True)
    backup_date = models.DateTimeField(null=True, blank=True, verbose_name='Дата бэкапа')


class GiaInFieldOfStudy(models.Model):
    work_program_change_in_discipline_block_module = models.ForeignKey('WorkProgramChangeInDisciplineBlockModule',
                                                                       on_delete=models.SET_NULL,
                                                                       related_name="zuns_for_cb_for_gia",
                                                                       blank=True, null=True)
    gia = models.ForeignKey('gia_practice_app.GIA', on_delete=models.CASCADE, related_name="zuns_for_gia")
    id_str_up = models.IntegerField(verbose_name="Id строки учебного плана", blank=True, null=True)


class PracticeInFieldOfStudy(models.Model):
    work_program_change_in_discipline_block_module = models.ForeignKey('WorkProgramChangeInDisciplineBlockModule',
                                                                       on_delete=models.SET_NULL,
                                                                       related_name="zuns_for_cb_for_practice",
                                                                       blank=True, null=True)
    practice = models.ForeignKey('gia_practice_app.Practice', on_delete=models.CASCADE, related_name="zuns_for_pr",
                                 blank=True, null=True)
    id_str_up = models.IntegerField(verbose_name="Id строки учебного плана", blank=True, null=True)
    backup_module = models.ForeignKey('DisciplineBlockModule', on_delete=models.CASCADE,
                                      related_name="module_backup_practice", blank=True, null=True)
    backup_ap = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE, related_name="ap_backup_practice", blank=True,
                                  null=True)
    backup_date = models.DateTimeField(null=True, blank=True, verbose_name='Дата бэкапа')


class WorkProgramIdStrUpForIsu(CloneMixin, models.Model):
    id_str_up = models.IntegerField(verbose_name="Id строки учебного плана", blank=True, null=True)
    ns_id = models.PositiveIntegerField(verbose_name="ID учебного плана в ИСУ", blank=True, null=True)
    dis_id = models.IntegerField(verbose_name="Id дисциплины в ису", blank=True, null=True)
    work_program_in_field_of_study = models.ForeignKey('WorkProgramInFieldOfStudy', on_delete=models.CASCADE,
                                                       related_name="zuns_for_wp")
    number = models.CharField(max_length=1024, blank=True, null=True)
    ze_v_sem = models.CharField(max_length=1024, blank=True, null=True)
    lec_v_sem = models.CharField(max_length=1024, blank=True, null=True)
    prak_v_sem = models.CharField(max_length=1024, blank=True, null=True)
    lab_v_sem = models.CharField(max_length=1024, blank=True, null=True)
    ekz_v_sem = models.CharField(max_length=1024, blank=True, null=True)
    zach_v_sem = models.CharField(max_length=1024, blank=True, null=True)
    dif_zach_v_sem = models.CharField(max_length=1024, blank=True, null=True)
    kp_v_sem = models.CharField(max_length=1024, blank=True, null=True)


class Zun(models.Model):
    '''
    Модель для зунов
    '''
    wp_in_fs = models.ForeignKey('WorkProgramInFieldOfStudy', on_delete=models.SET_NULL, blank=True, null=True,
                                 related_name="zun_in_wp")
    indicator_in_zun = models.ForeignKey('Indicator', on_delete=models.CASCADE, blank=True, null=True,
                                         related_name="zun")
    knowledge = models.CharField(max_length=10000, blank=True, null=True)
    skills = models.CharField(max_length=10000, blank=True, null=True)
    attainments = models.CharField(max_length=10000, blank=True, null=True)
    items = models.ManyToManyField('OutcomesOfWorkProgram', verbose_name="Учебная сущность и уровень освоения",
                                   blank=True, null=True, related_name="item_in_wp")
    wp_in_fs_saved_fk_id_str_up = models.IntegerField(verbose_name="Id строки учебного плана", blank=True, null=True)

    # def __str__(self):
    #     return (str(self.work_program_change_in_discipline_block_module) + str(self.work_program))


class AcademicPlanUpdateConfiguration(models.Model):
    academic_plan_id = models.CharField(
        max_length=1024,
        verbose_name="Id учебного плана для обновления",
        blank=True,
        null=False
    )
    academic_plan_title = models.CharField(
        max_length=1024,
        verbose_name="Название учебного плана для обновления",
        blank=True,
        null=False
    )
    updated_date_time = models.DateTimeField(
        editable=True,
        blank=False,
        null=True,
        verbose_name='Дата обновления',
        auto_created=True,
    )
    updates_enabled = models.BooleanField(verbose_name="Обновления включены", blank=False, null=False)
    over_23 = models.BooleanField(verbose_name="Новый план", blank=False, null=False, default=False)

    class Meta:
        ordering = ['id']


class AcademicPlanUpdateSchedulerConfiguration(models.Model):
    days_interval = models.PositiveIntegerField(
        verbose_name="Интервал обновления в днях",
        blank=True,
        null=True
    )
    execution_hours = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name='Время запуска обновления'
    )
    updated_timestamp = models.BigIntegerField(
        blank=True,
        null=True,
        verbose_name='Дата последнего обновления'
    )

    def __str__(self):
        return str(self.updated_timestamp) + " " + str(self.execution_hours) + " " + str(self.days_interval)


class AcademicPlanUpdateLog(models.Model):
    academic_plan_id = models.PositiveIntegerField(
        verbose_name="ID учебного плана в ИСУ",
        blank=False,
        null=False
    )
    object_type = models.PositiveIntegerField(
        verbose_name="Измененный объект",
        blank=False,
        null=False
    )
    field_name = models.CharField(
        max_length=1024,
        verbose_name="Измененное поле",
        blank=False,
        null=False
    )
    old_value = models.CharField(
        max_length=1024,
        verbose_name="Старое значение",
        blank=True,
        null=True
    )
    new_value = models.CharField(
        max_length=1024,
        verbose_name="Новое значение",
        blank=True,
        null=True
    )
    updated_date_time = models.DateTimeField(
        editable=True,
        blank=False,
        null=False,
        verbose_name='Дата обновления'
    )

    class Meta:
        ordering = ['id']

    def __str__(self):
        return str(self.object_type) + " " + str(self.field_name) + " " + str(self.old_value) + " " + str(
            self.new_value) + " " + str(self.updated_date_time)


class Competence(models.Model):
    '''
    Модель для компетенций
    '''
    number = models.CharField(max_length=1024)
    name = models.CharField(max_length=1024)

    # field_of_study = models.ForeignKey('Indicator', on_delete=models.CASCADE)
    # work_program = models.ForeignKey('work_program', on_delete=models.CASCADE)
    # indicators = models.ManyToManyField('Indicator', through=CompetenceIndicator)

    def __str__(self):
        return self.name


class CompetenceComments(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_competence_comment")
    competence = models.ForeignKey("Competence", on_delete=models.CASCADE, related_name="competence_comment")
    comment_text = models.CharField(max_length=50000, verbose_name="Комментарий")
    comment_date = models.DateTimeField(auto_now_add=True, blank=True, verbose_name='Дата комментария')

# class IndicatorWorkProgram(models.Model):
#     '''
#     Модель для связи рабочих программ и индикаторов
#     '''
#     work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE)
#     indicator = models.ForeignKey('Indicator', on_delete=models.CASCADE)
#     #competence = models.ForeignKey('Competence', on_delete=models.CASCADE)
#     knowledge = models.CharField(max_length=1024)
#     skills = models.CharField(max_length=1024)
#     proficiency = models.CharField(max_length=1024)
#
#     # class Meta:
#     #     unique_together = ('competence', 'work_program', 'indicator')
#     def __str__(self):
#         return self.name


class Indicator(models.Model):
    '''
    Модель для индикаторов
    '''
    number = models.CharField(max_length=1024)
    name = models.CharField(max_length=1024)
    # work_programs = models.ManyToManyField('WorkProgram', through=IndicatorWorkProgram, blank=True, null=True)
    competence = models.ForeignKey('Competence', on_delete=models.CASCADE, related_name="indicator_in_competencse")

    def __str__(self):
        return self.name


class EvaluationTool(CloneMixin, models.Model):
    '''
    Модель для оценочных средств
    '''
    type = models.CharField(max_length=1024, verbose_name="Тип оценочного средства")
    name = models.CharField(max_length=1024, verbose_name="Наименование оценочного средства")
    description = models.CharField(max_length=5000000, verbose_name="Описание", blank=True, null=True)
    check_point = models.BooleanField(verbose_name="Контрольная точка", blank=True, null=True)
    deadline = models.IntegerField(verbose_name="Срок сдачи в неделях", blank=True, null=True)
    semester = models.IntegerField(verbose_name="Семестр в котором сдается оценочное средство", blank=True, null=True)
    min = models.IntegerField(verbose_name="Максимальное значение", blank=True, null=True)
    max = models.IntegerField(verbose_name="Минимальное значение", blank=True, null=True)
    evaluation_criteria = models.CharField(max_length=2048, verbose_name="Критерии оценивания", blank=True, null=True)

    def __str__(self):
        return self.name


class СertificationEvaluationTool(CloneMixin, models.Model):
    '''
    Модель для аттестационных оценочных средств
    '''
    types = [
        ('1', 'Exam'),
        ('2', 'Differentiated credit'),
        ('3', 'Offset'),
        ('4', 'Coursework'),
        ('5', 'course_project')
    ]
    type = models.CharField(choices=types, default='1', max_length=1024, verbose_name="Тип оценочного средства")
    name = models.CharField(blank=True, null=True, max_length=1024, verbose_name="Наименование оценочного средства",
                            default="No name")
    description = models.CharField(max_length=500000, verbose_name="Описание", blank=True, null=True)
    # check_point = models.BooleanField(verbose_name="Контрольная точка", blank=True, null=True)
    deadline = models.IntegerField(verbose_name="Срок сдачи в неделях", blank=True, null=True)
    semester = models.IntegerField(verbose_name="Семестр в котором сдается оценочное средство", blank=True, null=True)
    min = models.IntegerField(verbose_name="Максимальное значение", blank=True, null=True)
    max = models.IntegerField(verbose_name="Минимальное значение", blank=True, null=True)
    work_program = models.ForeignKey("WorkProgram", verbose_name='Аттестационное оценочное средство',
                                     related_name="certification_evaluation_tools", on_delete=models.CASCADE,
                                     blank=True, null=True)
    discipline_block_module = models.ForeignKey("DisciplineBlockModule",
                                                verbose_name='Аттестационное оценочное средство модуля',
                                                related_name="certification_evaluation_tools_module",
                                                on_delete=models.CASCADE, blank=True, null=True)
    evaluation_criteria = models.CharField(max_length=2048, verbose_name="Критерии оценивания", blank=True, null=True)

    def __str__(self):
        return self.name


class DisciplineSection(CloneMixin, models.Model):
    '''
    Модель для разделов дисциплин
    '''

    ordinal_number = models.IntegerField(max_length=1024, verbose_name="номер раздела")
    name = models.CharField(max_length=1024, verbose_name="Раздел")
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, verbose_name='Рабочая программа',
                                     related_name='discipline_sections')
    evaluation_tools = models.ManyToManyField('EvaluationTool', verbose_name='Фонды оценочных средств', blank=True,
                                              null=True, related_name='evaluation_tools')
    # description = models.CharField(max_length=1024, verbose_name = "Раздел", blank = True, null = True)
    contact_work = models.DecimalField(verbose_name="Контактная работа", max_digits=5, decimal_places=2, blank=True,
                                       null=True)
    lecture_classes = models.DecimalField(verbose_name="Занятия лекционного типа", max_digits=5, decimal_places=2,
                                          blank=True, null=True)
    laboratory = models.DecimalField(verbose_name="Лабораторные занятия", max_digits=5, decimal_places=2, blank=True,
                                     null=True)
    practical_lessons = models.DecimalField(verbose_name="Практические занятия", max_digits=5, decimal_places=2,
                                            blank=True, null=True)
    consultations = models.DecimalField(verbose_name="Консультации", max_digits=5, decimal_places=2,
                                        blank=True, null=True)
    SRO = models.DecimalField(verbose_name="СРО", max_digits=5, decimal_places=2, blank=True, null=True)
    total_hours = models.DecimalField(verbose_name="Всего часов", max_digits=5, decimal_places=2, blank=True, null=True)

    # _clone_many_to_many_fields = ['evaluation_tools']
    def __str__(self):
        return self.name

    def new_ordinal_number(descipline_section, new_ordinal_number):
        '''
        :param new_ordinal_number: если равен -1, то значит запрос на удаление элемента из списка,
                                   любое другое значение - запрос на изменение порядка в списке.
        '''
        new_ordinal_number = int(new_ordinal_number)
        section = DisciplineSection.objects.get(pk=descipline_section)
        if new_ordinal_number == -1:
            sections = DisciplineSection.objects.filter(work_program=section.work_program).order_by('ordinal_number')
            for sec in sections:
                if sec.ordinal_number > section.ordinal_number:
                    sec.ordinal_number -= 1
                    sec.save()
        elif int(section.ordinal_number) > int(new_ordinal_number):
            section.ordinal_number = new_ordinal_number
            section.save()
            sections = DisciplineSection.objects.filter(work_program=section.work_program,
                                                        ordinal_number__gte=new_ordinal_number).exclude(
                pk=descipline_section).order_by('ordinal_number')
            for sec in sections:
                sec.ordinal_number = new_ordinal_number + 1
                sec.save()
                new_ordinal_number += 1
        else:
            section.ordinal_number = new_ordinal_number
            section.save()
            sections = DisciplineSection.objects.filter(work_program=section.work_program,
                                                        ordinal_number__lte=new_ordinal_number).exclude(
                pk=descipline_section).order_by('ordinal_number')
            for sec in sections:
                sec.ordinal_number = new_ordinal_number - 1
                sec.save()
                new_ordinal_number -= 1

    class Meta:
        ordering = ['ordinal_number']


class BibliographicReference(models.Model):
    '''
    Модель описания онлайн курса
    '''
    accession_number = models.CharField(max_length=512, verbose_name="An/Номер статьи из eds", blank=True, null=True)
    authors = models.CharField(max_length=4096, verbose_name="Авторы", blank=True, null=True)
    main_author = models.CharField(max_length=1024, verbose_name="Главный автор", blank=True, null=True)
    publication_type = models.CharField(max_length=1024, verbose_name="Тип публикации", blank=True, null=True)
    title = models.CharField(max_length=4096, verbose_name="Наименование", blank=True, null=True)
    publishing_company = models.CharField(max_length=1024, verbose_name="Издатель", blank=True, null=True)
    year = models.CharField(max_length=512, verbose_name="Год издания", blank=True, null=True)
    number_of_edition = models.PositiveIntegerField(verbose_name="Номер издания", blank=True, null=True)
    pages = models.PositiveIntegerField(verbose_name="Количество страниц", blank=True, null=True)
    # Если получится понять что это, то возможно чузфилд
    format = models.CharField(max_length=512, verbose_name="Формат", blank=True, null=True)
    # Возможно тоже чузфилд, пока это захардкожено
    publishing_type = models.CharField(max_length=1024, verbose_name="Тип публикации", blank=True, null=True)
    bib_reference = models.CharField(max_length=4096, verbose_name="Библиогарфическая ссылка", blank=True, null=True)
    description = models.CharField(max_length=5000, verbose_name="Описание", blank=True, null=True)
    from_lan = models.BooleanField(verbose_name="Добавлено из ЭБС Лань", blank=True, null=True)
    # work_program = models.ManyToManyField('WorkProgram', on_delete=models.CASCADE, verbose_name='Рабочая программа', related_name='discipline_sections')


class Topic(CloneMixin, models.Model):
    '''
    Модель для темы
    '''
    discipline_section = models.ForeignKey('DisciplineSection', on_delete=models.CASCADE, verbose_name="Раздел",
                                           related_name="topics")
    number = models.IntegerField(max_length=1024, verbose_name="номер темы в разделе")
    description = models.CharField(max_length=1024, verbose_name="Описание", blank=True, null=True)
    # online_course = models.CharField(max_length=1024, verbose_name = "Реализация раздела дисциплины с помощью онлайн-курса", blank = True, null = True)
    url_online_course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, verbose_name='Онлайн курс',
                                          blank=True, null=True, related_name='topic_with_online_course')

    def new_ordinal_number(topic, new_ordinal_number):
        new_ordinal_number = int(new_ordinal_number)
        section = Topic.objects.get(pk=topic)
        if new_ordinal_number == -1:
            sections = Topic.objects.filter(discipline_section=section.discipline_section).order_by('number')
            for sec in sections:
                if sec.number > section.number:
                    sec.number -= 1
                    sec.save()
        elif int(section.number) > int(new_ordinal_number):
            section.number = new_ordinal_number
            section.save()
            sections = Topic.objects.filter(discipline_section=section.discipline_section,
                                            number__gte=new_ordinal_number).exclude(pk=topic).order_by('number')
            for sec in sections:
                sec.number = new_ordinal_number + 1
                sec.save()
                new_ordinal_number += 1
        else:
            section.number = new_ordinal_number
            section.save()
            sections = Topic.objects.filter(discipline_section=section.discipline_section,
                                            number__lte=new_ordinal_number).exclude(pk=topic).order_by('number')
            for sec in sections:
                sec.number = new_ordinal_number - 1
                sec.save()
                new_ordinal_number -= 1

    class Meta:
        ordering = ['number']

    def __str__(self):
        return (self.description)


class RouteComposition(models.Model):
    '''
    Модель для состава маршрутов (связь маршрутов и рабочих программ)
    '''
    route = models.ForeignKey('Route', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE)
    field_of_study = models.ForeignKey('FieldOfStudy', on_delete=models.CASCADE)
    semester = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('route', 'user', 'work_program')


class Route(models.Model):
    '''
    Модель для маршрутов
    '''
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    field_of_study = models.ForeignKey('FieldOfStudy', on_delete=models.CASCADE)
    work_programs = models.ManyToManyField('WorkProgram', through=RouteComposition)


class Certification(models.Model):
    '''
    Модель для аттестации
    '''
    CERTIFICATION_TYPE_CHOICES = [
        ('EX', 'Exam'),
        ('DF', 'Differentiated classification'),
        ('OS', 'Offset'),
    ]
    type = models.CharField(choices=CERTIFICATION_TYPE_CHOICES, max_length=1024)
    semestr = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=1024, verbose_name="Описание", blank=True, null=True)
    deadline = models.IntegerField(verbose_name="Срок сдачи в неделях", blank=True, null=True)
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, related_name='discipline_certification')


class Profession(models.Model):
    '''
    Модель для описания профессии
    '''
    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True,
                                         verbose_name='Профессия')
    title = models.CharField(max_length=1024, blank=True, null=True, verbose_name='Название профессии')
    skills = models.ManyToManyField(Items, related_name='profession_skils',
                                    through='SkillsOfProfession', blank=True, null=True,
                                    verbose_name="Навыки")

    def __str__(self):
        return (self.title)


class Role(models.Model):
    '''
    Модель для описания ролей
    '''
    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True,
                                         verbose_name='Профессия')
    title = models.CharField(max_length=1024, blank=True, null=True, verbose_name='Название профессии')
    skills = models.ManyToManyField(Items, related_name='role_skils',
                                    through='SkillsOfRole', blank=True, null=True,
                                    verbose_name="Навыки")

    def __str__(self):
        return (self.title)


class SkillsOfProfession(models.Model):
    '''
    Модель для навыков профессии
    '''

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Пререквизит", related_name='item_in_sop')
    profession = models.ForeignKey(Profession, on_delete=models.CASCADE, verbose_name="Рабочая программа")
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

    def __str__(self):
        return (str(self.item) + ' / ' + str(self.profession))


class SkillsOfRole(models.Model):
    '''
    Модель для навыков роли
    '''

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Пререквизит", related_name='item_in_sor')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, verbose_name="Рабочая программа")
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

    def __str__(self):
        return (str(self.item) + ' / ' + str(self.role))


class DisciplineBlockModuleInIsu(models.Model):
    module = models.ForeignKey(DisciplineBlockModule, on_delete=models.CASCADE, related_name="isu_module")
    isu_id = models.IntegerField(verbose_name="ИСУ ид модуля")
    isu_father_id = models.IntegerField(verbose_name="ИСУ ид родителя", blank=True, null=True)
    academic_plan = models.ForeignKey(AcademicPlan, on_delete=models.CASCADE, related_name="module_isu_in_plan",
                                      blank=True, null=True)
    new_id = models.CharField(max_length=1024, blank=True, null=True, verbose_name='ap_id and isu_module_id')


class IsuObjectsSendLogger(models.Model):
    ObjTypeChoices = [
        ('wp', 'Рабочая Программа'),
        ('practice', 'Практика'),
        ('gia', 'ГИА'),
        ('module', 'Модуль'),
        ('ap', 'Учебный план'),
    ]
    obj_type = models.CharField(
        max_length=50,
        choices=ObjTypeChoices,
        default=1, verbose_name="Тип объекта"
    )
    ap_id = models.IntegerField(verbose_name="ИД УП", blank=True, null=True, )
    obj_id = models.IntegerField(verbose_name="ИД объекта")
    generated_json = JSONField(verbose_name="Сгенерированный JSON объекта")
    error_status = models.IntegerField(verbose_name="номер ошибки")
    returned_data = JSONField(verbose_name="Вернувшийся ответ")
    date_of_sending = models.DateTimeField(default=timezone.now)


class IsuModulesHashes(models.Model):
    isu_id = models.IntegerField(verbose_name="ИСУ ид модуля")
    academic_plan = models.ForeignKey(ImplementationAcademicPlan, on_delete=models.CASCADE,
                                      related_name="module_isu_in_plan_by_hash",
                                      blank=True, null=True)
    ap_isu_id = models.IntegerField(verbose_name="ИСУ ид плана")
    module_hash = models.TextField(verbose_name="Хэш модуля")
    new_id = models.CharField(max_length=1024, blank=True, null=True, verbose_name='ap_id+isu_module_id')
