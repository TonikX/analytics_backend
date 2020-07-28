from django.db import models
from dataprocessing.models import Items
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator
from model_clone import CloneMixin


class FieldOfStudyWorkProgram(models.Model):
    '''
    Модель для связи направления и рабочей программы
    '''
    field_of_study = models.ForeignKey('FieldOfStudy', on_delete=models.CASCADE, verbose_name = 'Образовательная программа')
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, verbose_name = 'Рабочая программа')
    #competence = models.ForeignKey('Competence',null=True,  on_delete=models.CASCADE, verbose_name = 'Компетенции')

    # class Meta:
    #     unique_together = ('work_program', 'field_of_study')


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class WorkProgram(models.Model):
    '''
    Модель для рабочей программы
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

    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True)
    discipline_code = models.CharField(max_length=1024, blank=True, null=True)
    subject_code = models.CharField(max_length=1024, blank=True, null=True)
    authors = models.CharField(max_length=1024, blank=True, null=True)
    prerequisites = models.ManyToManyField(Items, related_name='WorkProgramPrerequisites',)
    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name = 'Квалификация', blank=True, null=True)
    prerequisites = models.ManyToManyField(Items, related_name='WorkProgramPrerequisites',
                                           through='PrerequisitesOfWorkProgram', blank=True, null=True, verbose_name = "Пререквизиты")
    outcomes = models.ManyToManyField(Items, related_name='WorkProgramOutcomes', through='OutcomesOfWorkProgram', verbose_name = "Постреквизиты")
    title = models.CharField(max_length=1024, verbose_name = "Название")
    hoursFirstSemester = models.IntegerField(blank=True, null=True, verbose_name = "Количество часов в 1 семестре")
    hoursSecondSemester = models.IntegerField(blank=True, null=True, verbose_name = "Количество часов в 2 семестре")
    #goals = models.CharField(max_length=1024, verbose_name = "Цели освоения" )
    #result_goals = models.CharField(max_length=1024, verbose_name = "Результаты освоения" )
    field_of_studies = models.ManyToManyField('FieldOfStudy', through=FieldOfStudyWorkProgram, verbose_name = "Предметная область", related_name='workprograms_in_fieldofstudy')
    bibliographic_reference = models.ManyToManyField('BibliographicReference', verbose_name='Библиогравическая_ссылка', related_name='bibrefs')
    #evaluation_tool = models.ManyToManyField('EvaluationTool', verbose_name='Оценочное средство')
    description = models.CharField(max_length=5000, blank=True, null=True)
    video = models.CharField(max_length=1024, blank=True, null=True)
    credit_units = models.CharField(max_length=1024, blank=True, null=True)
    semester_hour = models.CharField(max_length=1024, blank=True, null=True)

    # list_of_references = models.TextField(blank=True, null=True)
    # guidelines = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title


class PrerequisitesOfWorkProgram(models.Model):
    '''
    Модель для пререквизитов рабочей программы
    '''
    # class Meta:
    #     auto_created = True

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name ="Пререквизит" )
    workprogram = models.ForeignKey(WorkProgram, on_delete=models.CASCADE, verbose_name = "Рабочая программа")
    MasterylevelChoices = [
        ('1', 'low'),
        ('2', 'average'),
        ('3', 'high'),
    ]
    masterylevel = models.CharField(
        max_length=1,
        choices=MasterylevelChoices,
        default=1, verbose_name = "Уровень"
    )
    # def __str__(self):
    #     return self.item

class OutcomesOfWorkProgram(models.Model):
    '''
    Модель для результатов обучения по рабочей программе
    '''
    # class Meta:
    #     auto_created = True

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name = "Постреквизит")
    workprogram = models.ForeignKey(WorkProgram, on_delete=models.CASCADE, verbose_name = "Рабочая программа" )
    MasterylevelChoices = [
        ('1', 'low'),
        ('2', 'average'),
        ('3', 'high'),
    ]
    masterylevel = models.CharField(
        max_length=1,
        choices=MasterylevelChoices,
        default=1, verbose_name = "Уровень"
    )
    evaluation_tool = models.ManyToManyField('EvaluationTool', verbose_name='Оценочные средства', related_name='evaluation_tool_of_outcomes', blank = True, null = True)

#
# class User(AbstractUser):
#     '''
#     Модель для пользователей
#     '''
#     first_name = models.CharField(max_length=1024)
#     last_name = models.CharField(max_length=1024)
#     patronymic = models.CharField(max_length=1024)
#     isu_number = models.CharField(max_length=1024)
#
#     def __str__(self):
#         return self.first_name + ' ' + self.last_name


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
    number = models.CharField(unique=True, max_length=1024, verbose_name = 'Шифр ОП')
    title = models.CharField(unique=True, max_length=1024, verbose_name = 'Название ОП', blank = True, null = True)
    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name = 'Квалификация', blank = True, null = True)
    educational_profile = models.CharField(unique=True, max_length=1024, verbose_name = 'Профиль ОП', blank = True, null = True)
    faculty = models.CharField(max_length=150, verbose_name = 'Факультет (Структурное подразделение)', null=True)
    education_form = models.CharField(choices=EDUCATION_FORM_CHOICES, max_length=1024, verbose_name = 'Форма обучения', blank = True, null = True)


    def __str__(self):
        return self.number


# class CompetenceIndicator(models.Model):
#     '''
#     Модель для связи компетенций и индикаторов
#     '''
#     competence = models.ForeignKey('Competence', on_delete=models.CASCADE)
#     indicator = models.ForeignKey('Indicator', on_delete=models.CASCADE)
#     #field_of_study = models.ForeignKey('FieldOfStudy', on_delete=models.CASCADE)
#
#     class Meta:
#         unique_together = ('competence', 'indicator')


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


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


    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name = 'Квалификация', blank = True, null = True)
    educational_profile = models.CharField(unique=True, max_length=1024, verbose_name = 'Профиль ОП', blank = True, null = True)
    number = models.CharField(unique=True, max_length=1024, verbose_name = 'Номер учебного плана', blank = True, null = True)
    field_of_study = models.ManyToManyField('FieldOfStudy', through='ImplementationAcademicPlan', related_name="block_in_academic_plan", blank = True, null = True)
    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True)
    year = models.CharField(max_length=1024, blank = True, null = True)
    education_form = models.CharField(choices=EDUCATION_FORM_CHOICES, max_length=1024, verbose_name = 'Форма обучения', blank = True, null = True)


    #TODO: Добавить год набора

    def __str__(self):
        return (self.educational_profile)


    def clone_descipline_blocks(id, siap):
        DisciplineBlocks = DisciplineBlock.objects.filter(academic_plan__educational_profile = 'Экспертный профиль')
        for Block in DisciplineBlocks:
            block_clone = Block.make_clone(attrs={'academic_plan_id': siap.data.get("id")})
            print (Block.modules_in_discipline_block.all())
            for Module in Block.modules_in_discipline_block.all():
                module_clone = Module.make_clone(attrs={'descipline_block_id': block_clone.id})

    def new_descipline_blocks(iap, siap):
        blocks = ['Блок 1', 'Блок 2', 'Блок 3']
        print (siap.data.get("id"))

        for block in blocks:
            db = DisciplineBlock()
            db.name = block
            db.academic_plan_id = siap.data.get("id")
            db.save()
            print (db.id)
            DisciplineBlock.new_descipline_block_modules(db.id)


class ImplementationAcademicPlan(models.Model):
    '''
    Модель приминения учебного плана в направлении
    '''
    academic_plan = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE, verbose_name = 'Учебный план', related_name="academic_plan_in_field_of_study")
    field_of_study = models.ForeignKey('FieldOfStudy', on_delete=models.CASCADE, verbose_name = 'Направление подготовки')
    year = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(1984), max_value_current_year])
    period_of_study = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return str(self.academic_plan)


class DisciplineBlock(CloneMixin, models.Model):
    '''
    Модель блока дисциплин
    '''
    name = models.CharField(max_length=1024)
    academic_plan = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE, verbose_name = 'Учебный план в направлении', related_name="discipline_blocks_in_academic_plan", blank=True, null=True)
    #work_program = models.ManyToManyField('WorkProgram', verbose_name = "Рабочая программа", blank=True, null=True)

    def __str__(self):
        return (str(self.name) + str(self.academic_plan))


    def clone_descipline_block_modules(id):
        DisciplineBlockModules = DisciplineBlockModule.objects.all()
        clone = DisciplineBlockModules.make_clone(attrs={'academic_plan': id})
        print (clone)

    def new_descipline_block_modules(id):
        blocks = ['Модуль 1', 'Модуль 2', 'Модуль 3']
        print ('id for modules', id)

        for block in blocks:
            db = DisciplineBlockModule()
            db.name = block
            db.descipline_block_id = id
            db.save()


# class DisciplineBlockModule(models.Model):
#     '''
#     Модель блока дисциплин
#     '''
#     name = models.CharField(max_length=1024)
#     descipline_block = models.ForeignKey('DisciplineBlock', on_delete=models.CASCADE, verbose_name = 'Модуль в блоке', related_name="modules_in_discipline_block", blank=True, null=True)
#     work_program = models.ManyToManyField('WorkProgram', verbose_name = "Рабочая программа", blank=True, null=True)
#
#     def __str__(self):
#         return (str(self.name) + str(self.descipline_block))


class DisciplineBlockModule(CloneMixin, models.Model):
    '''
    Модель модуля блока дисциплин
    '''
    name = models.CharField(max_length=1024)
    descipline_block = models.ForeignKey('DisciplineBlock', on_delete=models.CASCADE, verbose_name = 'Модуль в блоке', related_name="modules_in_discipline_block", blank=True, null=True)
    order = models.IntegerField(blank=True, null=True, verbose_name = "Порядок модулей")
    #work_program = models.ManyToManyField('WorkProgram', verbose_name = "Рабочая программа", blank=True, null=True)
    class Meta: 
        ordering = ['order']
        
    def __str__(self):
        return (str(self.name) + str(self.descipline_block))


class WorkProgramChangeInDisciplineBlockModule(models.Model):
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
    change_type = models.CharField(choices=CHANGE_CHOICES, max_length=1024, verbose_name = 'Форма обучения', blank = True, null = True)
    discipline_block_module = models.ForeignKey('DisciplineBlockModule', on_delete=models.CASCADE, verbose_name = 'Модуль в блоке', related_name="change_blocks_of_work_programs_in_modules", blank=True, null=True)
    work_program = models.ManyToManyField('WorkProgram', verbose_name = "Рабочая программа", through='WorkProgramInFieldOfStudy', related_name="work_program_in_change_block")
    #zuns = models.ManyToManyField('Zun', verbose_name = "Зуны", through='WorkProgramInFieldOfStudy', related_name="zuns_in_changeblock")


    def __str__(self):
        return (str(self.discipline_block_module) + str(self.work_program))


class WorkProgramInFieldOfStudy(models.Model):
    work_program_change_in_discipline_block_module = models.ForeignKey('WorkProgramChangeInDisciplineBlockModule', on_delete=models.CASCADE)
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, related_name="zuns_for_wp")
    # indicators = models.ManyToManyField('Indicator', through=CompetenceIndicator)


class Zun(models.Model):
    '''
    Модель для компетенций
    '''
    wp_in_fs = models.ForeignKey('WorkProgramInFieldOfStudy', on_delete=models.CASCADE, blank=True, null=True, related_name="zun_in_wp")
    indicator_in_zun = models.ForeignKey('Indicator', on_delete=models.CASCADE, blank=True, null=True)
    knowledge = models.CharField(max_length=1024, blank=True, null=True)
    skills = models.CharField(max_length=1024, blank=True, null=True)
    attainments = models.CharField(max_length=1024, blank=True, null=True)
    items = models.ManyToManyField('OutcomesOfWorkProgram', verbose_name = "Учебная сущность и уровень освоения")

    # def __str__(self):
    #     return (str(self.work_program_change_in_discipline_block_module) + str(self.work_program))


class Competence(models.Model):
    '''
    Модель для компетенций
    '''
    number = models.CharField(unique=True, max_length=1024)
    name = models.CharField(unique=True, max_length=1024)
    #field_of_study = models.ForeignKey('Indicator', on_delete=models.CASCADE)
    #work_program = models.ForeignKey('work_program', on_delete=models.CASCADE)
    # indicators = models.ManyToManyField('Indicator', through=CompetenceIndicator)

    def __str__(self):
        return self.name


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
    number = models.CharField(unique=True, max_length=1024)
    name = models.CharField(max_length=1024)
    #work_programs = models.ManyToManyField('WorkProgram', through=IndicatorWorkProgram, blank=True, null=True)
    competence = models.ForeignKey('Competence', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class EvaluationTool(models.Model):
    '''
    Модель для оценочных средств
    '''
    type = models.CharField(max_length=1024, verbose_name = "Тип оценочного средства")
    name = models.CharField(unique=True, max_length=1024, verbose_name = "Наименование оценочного средства")
    description = models.CharField(max_length=50000, verbose_name = "Описание", blank = True, null = True)
    check_point = models.BooleanField(verbose_name = "Контрольная точка", blank = True, null = True)
    deadline = models.IntegerField(verbose_name = "Срок сдачи в неделях", blank = True, null = True)
    semester = models.IntegerField(verbose_name = "Семестр в котором сдается оценочное средство", blank = True, null = True)
    min = models.IntegerField(verbose_name = "Максимальное значение", blank = True, null = True)
    max = models.IntegerField(verbose_name = "Минимальное значение", blank = True, null = True)


    def __str__(self):
        return self.name


class DisciplineSection(models.Model):
    '''
    Модель для разделов дисциплин
    '''

    ordinal_number = models.IntegerField(max_length=1024, verbose_name = "номер раздела")
    name = models.CharField(max_length=1024, verbose_name = "Раздел")
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, verbose_name='Рабочая программа', related_name='discipline_sections')
    evaluation_tools = models.ManyToManyField('EvaluationTool', verbose_name='Фонды оценочных средств', blank = True, null = True, related_name='evaluation_tools')
    #description = models.CharField(max_length=1024, verbose_name = "Раздел", blank = True, null = True)
    contact_work = models.DecimalField(verbose_name = "Контактная работа", max_digits=5, decimal_places=2, blank = True, null = True)
    lecture_classes = models.DecimalField(verbose_name = "Занятия лекционного типа", max_digits=5, decimal_places=2, blank = True, null = True)
    laboratory = models.DecimalField(verbose_name = "Лабораторные занятия", max_digits=5, decimal_places=2, blank = True, null = True)
    practical_lessons = models.DecimalField(verbose_name = "Практические занятия", max_digits=5, decimal_places=2, blank = True, null = True)
    SRO = models.DecimalField(verbose_name = "СРО", max_digits=5, decimal_places=2, blank = True, null = True)
    total_hours = models.DecimalField(verbose_name = "Всего часов", max_digits=5, decimal_places=2, blank = True, null = True)

    def __str__(self):
        return self.name


    def new_ordinal_number(descipline_section, new_ordinal_number):
        '''
        :param new_ordinal_number: если равен -1, то значит запрос на удаление элемента из списка,
                                   любое другое значение - запрос на изменение порядка в списке.
        '''
        new_ordinal_number = int(new_ordinal_number)
        section = DisciplineSection.objects.get(pk = descipline_section)
        if new_ordinal_number == -1:
            sections = DisciplineSection.objects.filter(work_program=section.work_program).order_by('ordinal_number')
            for sec in sections:
                if sec.ordinal_number > section.ordinal_number:
                    sec.ordinal_number -= 1
                    sec.save()
        elif int(section.ordinal_number) > int(new_ordinal_number):
            section.ordinal_number = new_ordinal_number
            section.save()
            sections = DisciplineSection.objects.filter(work_program = section.work_program, ordinal_number__gte=new_ordinal_number).exclude(pk = descipline_section).order_by('ordinal_number')
            for sec in sections:
                sec.ordinal_number = new_ordinal_number+1
                sec.save()
                new_ordinal_number +=1
        else:
            section.ordinal_number = new_ordinal_number
            section.save()
            sections = DisciplineSection.objects.filter(work_program = section.work_program, ordinal_number__lte=new_ordinal_number).exclude(pk = descipline_section).order_by('ordinal_number')
            for sec in sections:
                sec.ordinal_number = new_ordinal_number-1
                sec.save()
                new_ordinal_number -=1


    class Meta:
        ordering = ['ordinal_number']


class OnlineCourse(models.Model):
    '''
    Модель описания онлайн курса
    '''
    title = models.CharField(max_length=512, verbose_name = "Название курсу")
    platform = models.CharField(max_length=512, verbose_name = "Платформа", blank = True, null = True)
    description = models.CharField(max_length=50000, verbose_name = "Описание", blank = True, null = True)
    course_url = models.URLField(verbose_name = "Ссылка на курс")


class BibliographicReference(models.Model):
    '''
    Модель описания онлайн курса
    '''
    description = models.CharField(max_length=5000, verbose_name = "Описание", blank = True, null = True)
    #work_program = models.ManyToManyField('WorkProgram', on_delete=models.CASCADE, verbose_name='Рабочая программа', related_name='discipline_sections')


class Topic(models.Model):
    '''
    Модель для темы
    '''
    discipline_section = models.ForeignKey('DisciplineSection', on_delete=models.CASCADE, verbose_name = "Раздел", related_name = "topics")
    number = models.IntegerField(max_length=1024, verbose_name = "номер темы в разделе")
    description = models.CharField(max_length=1024, verbose_name = "Описание", blank = True, null = True)
    #online_course = models.CharField(max_length=1024, verbose_name = "Реализация раздела дисциплины с помощью онлайн-курса", blank = True, null = True)
    url_online_course = models.ForeignKey('OnlineCourse', on_delete=models.CASCADE, verbose_name='Онлайн курс', blank = True, null = True, related_name='topic_with_online_course')



    def new_ordinal_number(topic, new_ordinal_number):
        new_ordinal_number = int(new_ordinal_number)
        section = Topic.objects.get(pk = topic)
        if new_ordinal_number==-1:
            sections = Topic.objects.filter(discipline_section  = section.discipline_section).order_by('number')
            for sec in sections:
                if sec.number > section.number:
                    sec.number -= 1
                    sec.save()
        elif int(section.number) > int(new_ordinal_number):
            section.number = new_ordinal_number
            section.save()
            sections = Topic.objects.filter(discipline_section  = section.discipline_section, number__gte=new_ordinal_number).exclude(pk = topic).order_by('number')
            for sec in sections:
                sec.number = new_ordinal_number+1
                sec.save()
                new_ordinal_number +=1
        else:
            section.number = new_ordinal_number
            section.save()
            sections = Topic.objects.filter(discipline_section  = section.discipline_section, number__lte=new_ordinal_number).exclude(pk = topic).order_by('number')
            for sec in sections:
                sec.number = new_ordinal_number-1
                sec.save()
                new_ordinal_number -=1


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
    type = models.CharField(choices = CERTIFICATION_TYPE_CHOICES, max_length=1024)
    semestr = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=1024, verbose_name = "Описание", blank = True, null = True)
    deadline = models.IntegerField(verbose_name = "Срок сдачи в неделях", blank = True, null = True)
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, related_name='discipline_certification')

