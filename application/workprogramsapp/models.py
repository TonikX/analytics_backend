import datetime

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from model_clone import CloneMixin
from django.contrib.postgres.fields import ArrayField

from dataprocessing.models import Items
from onlinecourse.models import OnlineCourse, Institution
'''
class FieldOfStudyWorkProgram(models.Model):

    #Модель для связи направления и рабочей программы

    field_of_study = models.ForeignKey('FieldOfStudy', on_delete=models.CASCADE,
                                       verbose_name='Образовательная программа')
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, verbose_name='Рабочая программа')
    # competence = models.ForeignKey('Competence',null=True,  on_delete=models.CASCADE, verbose_name = 'Компетенции')

    # class Meta:
    #     unique_together = ('work_program', 'field_of_study')
'''

def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class WorkProgram(CloneMixin, models.Model):
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
    # goals = models.CharField(max_length=1024, verbose_name = "Цели освоения" )
    # result_goals = models.CharField(max_length=1024, verbose_name = "Результаты освоения" )
    #field_of_studies = models.ManyToManyField('FieldOfStudy', through=FieldOfStudyWorkProgram,
    #                                          verbose_name="Предметная область",
    #                                          related_name='workprograms_in_fieldofstudy')
    bibliographic_reference = models.ManyToManyField('BibliographicReference', blank=True, null=True, verbose_name='Библиогравическая_ссылка',
                                                     related_name='bibrefs')
    # evaluation_tool = models.ManyToManyField('EvaluationTool', verbose_name='Оценочное средство')
    description = models.CharField(max_length=5000, blank=True, null=True)
    video = models.CharField(max_length=1024, blank=True, null=True)
    credit_units = models.CharField(max_length=1024, blank=True, null=True)
    semester_hour = models.CharField(max_length=1024, blank=True, null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    work_status = models.CharField(max_length=1, choices=status_choise, verbose_name='Архив', default = 'w')
    hours = models.IntegerField(blank=True, null=True, verbose_name="Сумма часов по разделам")
    extra_points = models.CharField(choices=extra_points_choise, max_length=1, verbose_name='Квалификация',
                                   blank=True, null=True)
    editors = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="editors", verbose_name="Редакторы РПД", blank=True, null=True)
    language = models.CharField(choices=languages_for_wp, max_length=15, verbose_name='Языки',
                                blank=True, null=True)
    have_course_project=models.BooleanField(blank=True, null=True, verbose_name="Имеет ли РПД курсовой проект")
    have_diff_pass=models.BooleanField(blank=True, null=True, verbose_name="Имеет ли РПД дифф. зачет")
    have_pass = models.BooleanField(blank=True, null=True, verbose_name="Имеет ли РПД зачет")
    have_exam = models.BooleanField(blank=True, null=True, verbose_name="Имеет ли РПД экзамен")
    lecture_hours = models.CharField(max_length=1024, null=True,blank=True, verbose_name="Часы лекций")
    practice_hours = models.CharField(max_length=1024, null=True,blank=True, verbose_name="Часы Практик")
    lab_hours = models.CharField(max_length=1024, null=True,blank=True, verbose_name="Часы лабораторных работ")
    srs_hours = models.CharField(max_length=1024, null=True,blank=True, verbose_name="Часы СРС")
    old_discipline_code = models.CharField(max_length=1024, blank=True, null=True)
    wp_isu_id = models.IntegerField(blank=True, null=True, verbose_name="ID РПД в ИСУ")
    structural_unit = models.ForeignKey('StructuralUnit', on_delete=models.SET_NULL,
                                        verbose_name='Структурное подразделени',
                                        related_name='workprogram_in_structural_unit', blank=True, null=True)
    # language = models.CharField(choices=languages_for_wp, max_length=100, verbose_name='Язык', blank=True, null=True)

    _clone_many_to_many_fields = ['prerequisites', 'field_of_studies', 'bibliographic_reference', 'editors']





# list_of_references = models.TextField(blank=True, null=True)
    # guidelines = models.TextField(blank=True, null=True)


    def __str__(self):
        return (self.title)


    def new_relations(old_descipline_code, new_descipline_code):
        old_work_program = WorkProgram.objects.get(id = old_descipline_code)
        print ('old', old_work_program, old_work_program.id)
        new_work_program = WorkProgram.objects.get(id = new_descipline_code)
        print ('new', new_work_program, new_work_program.id)
        for wp_in_fs in WorkProgramInFieldOfStudy.objects.filter(work_program = old_work_program):
            wp_in_fs.work_program = new_work_program
            wp_in_fs.save()
            print ('замена прошла')
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
            clone_dict={'id':disp.id, 'clone_id':clone_discipline.id}
            disp_clone_list.append(clone_dict)
        for eva in EvaluationTool.objects.filter():
            evaluation_disciplines = eva.evaluation_tools.all().filter(work_program_id=programm_id)
            if (evaluation_disciplines):
                clone_eva = eva.make_clone()
                for disp in evaluation_disciplines:
                    for elem in disp_clone_list:
                        if (disp.id==elem['id']):
                            DisciplineSection.objects.get(pk=elem['clone_id']).evaluation_tools.add(clone_eva)
                clone_dict={'id':eva.id, 'clone_id':clone_eva.id}
                eva_clone_list.append(clone_dict)
        for out in OutcomesOfWorkProgram.objects.filter(workprogram=program):
            clone_outcomes = out.make_clone(attrs={'workprogram': clone_program})
            for eva in out.evaluation_tool.all():
                for elem in eva_clone_list:
                    if(eva.id==elem['id']):
                        clone_outcomes.evaluation_tool.add(EvaluationTool.objects.get(pk=elem['clone_id']))
        for cerf in СertificationEvaluationTool.objects.filter(work_program=program):
            cerf.make_clone(attrs={'work_program': clone_program})
        return clone_program


class PrerequisitesOfWorkProgram(models.Model):
    '''
    Модель для пререквизитов рабочей программы
    '''
    # class Meta:
    #     auto_created = True

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


class OutcomesOfWorkProgram(CloneMixin,models.Model):
    '''
    Модель для результатов обучения по рабочей программе
    '''
    # class Meta:
    #     auto_created = True

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Постреквизит")
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
    number = models.CharField(max_length=1024, verbose_name = 'Шифр ОП')
    title = models.CharField(max_length=1024, verbose_name = 'Название ОП', blank = True, null = True)
    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024,
                                     verbose_name = 'Квалификация', blank = True, null = True)
    educational_profile = models.CharField(max_length=1024, verbose_name = 'Профиль ОП',
                                           blank = True, null = True)
    faculty = models.CharField(max_length=150, verbose_name = 'Факультет (Структурное подразделение)',
                               null=True)
    education_form = models.CharField(choices=EDUCATION_FORM_CHOICES, max_length=1024, verbose_name = 'Форма обучения', blank = True, null = True)


    def __str__(self):
        return self.number


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


    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name = '- Квалификация', blank = True, null = True)
    educational_profile = models.CharField(max_length=1024, verbose_name = '- Профиль ОП', blank = True, null = True)
    number = models.CharField(unique=True, max_length=1024, verbose_name = '- Номер учебного плана', blank = True, null = True)
    #field_of_study = models.ManyToManyField('FieldOfStudy', related_name="block_in_academic_plan", blank = True, null = True)
    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True)
    year = models.CharField(max_length=1024, blank = True, null = True)
    education_form = models.CharField(choices=EDUCATION_FORM_CHOICES, max_length=1024, verbose_name = 'Форма обучения', blank = True, null = True)
    author=models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Автор учебного плана', on_delete = models.CASCADE, related_name = 'academic_plan_author', blank = True, null = True)
    ap_isu_id = models.PositiveIntegerField(verbose_name = "ID учебного плана в ИСУ", blank=True, null=True)


    #TODO: Добавить год набора

    def __str__(self):
        return str(self.ap_isu_id)


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


    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name = 'Квалификация', blank = True, null = True)
    #academic_plan = models.ForeignKey('ImplementationAcademicPlan', on_delete=models.CASCADE, verbose_name = 'Учебный план', related_name="academic_plan_in_educational_program")
    year_of_recruitment = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(1984), max_value_current_year])
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank = True, null = True)
    academic_plan_for_ep = models.ForeignKey('ImplementationAcademicPlan', on_delete=models.SET_NULL, verbose_name = 'Учебный план_1', related_name="academic_plan_in_educational_program", blank = True, null = True)


class GeneralCharacteristics(models.Model):
    '''
    Модель описания характеристики образовтаельной программы
    '''
    educational_program = models.ForeignKey('EducationalProgram', on_delete=models.SET_NULL, verbose_name = 'Образовательная программа', related_name="general_characteristics_in_educational_program", blank = True, null = True)
    area_of_activity = models.ManyToManyField('ProfessionalAreaOfGeneralCharacteristics', verbose_name = 'Область профессиональной деятельности')
    objects_of_activity = models.CharField(max_length=512, verbose_name="Объекты профессиональной деятельности", blank=True, null=True)
    kinds_of_activity = models.CharField(max_length=512, verbose_name="Сферы профессиональной деятельности, к которому (которым) готовятся выпускники", blank=True, null=True)
    tasks_of_activity = models.CharField(max_length=512, verbose_name="Задачи профессиональной деятельности ", blank=True, null=True)
    type_of_activity = models.CharField(max_length=512, verbose_name="Тип основной профессиональной образовательной программы", blank=True, null=True)
    # ok_competences = models.ManyToManyField('Competence', verbose_name="ОБЩЕКУЛЬТУРНЫЕ КОМПЕТЕНЦИИ", related_name="ok_competences_in_gh", blank=True)
    # kc_competences = models.ManyToManyField('Competence', verbose_name="Ключевые компетенции", related_name="kc_competences_in_gh", blank=True)
    #pk_competences = models.ManyToManyField('Indicator', verbose_name="ПРОФЕССИОНАЛЬНЫЕ КОМПЕТЕНЦИИ", through = 'PkCompetencesInGeneralCharacteristics', related_name="pk_competences_in_gh", blank=True)
    # np_competences = models.ManyToManyField('Competence', verbose_name="Надпрофессиональные компетенции", related_name="np_competences_in_gh", blank=True,)
    #pps = ArrayField(models.CharField(max_length=512, verbose_name="Сведения о профессорско-преподавательском составе, необходимом для реализации основной профессиональной образовательной программы"), blank=True, null=True)
    pps = models.TextField(max_length=55512, verbose_name="Сведения о профессорско-преподавательском составе, необходимом для реализации ", blank=True, null=True)
    annotation = models.TextField(max_length=55512, verbose_name="Аннотация основной профессиональной образовательной программы", blank=True, null=True)
    developers = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name="Сотрудники Университета ИТМО", related_name="ok_competences_in_gh", blank=True)
    employers_representatives = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name="Представители работодателей", related_name="employers_representatives_in_gh", blank=True)
    director_of_megafaculty = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Директор мегафакультета", related_name="director_of_megafaculty_in_gh", blank=True, null=True)
    dean_of_the_faculty = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Декан факультета", related_name="dean_of_the_faculty_in_gh", blank=True, null=True)
    scientific_supervisor_of_the_educational_program = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Научный руководитель образовательной программы",
                                                                         related_name="scientific_supervisor_of_the_educational_program_in_gh", blank=True, null=True)

    def __str__(self):
        return str(self.educational_program) + str(self.director_of_megafaculty) + str(self.scientific_supervisor_of_the_educational_program)


class Department(models.Model):
    """
    Факультет
    """
    title = models.CharField(max_length=512, verbose_name="Название факультета")
    mini_titile = models.CharField(max_length=512, verbose_name="Краткое название факультета", blank=True, null=True)
    dean = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Декан", blank=True, null=True)

    def __str__(self):
        return str(self.title)


class ProfessionalAreaOfGeneralCharacteristics(models.Model):
    """
    Профессиональный стандарт
    """
    # general_characteristic = models.ForeignKey('GeneralCharacteristics', on_delete=models.CASCADE, verbose_name="ОХ", blank=True, null=True)
    title = models.CharField(max_length=512, verbose_name="Наименование бласти проф деятельности", blank=True, null=True)
    professional_standard = models.ManyToManyField('ProfessionalStandard', verbose_name="Профессиональный стандарт", blank=True)

    def __str__(self):
        return str(self.title)


class ProfessionalStandard(models.Model):
    """
    Профессиональный стандарт
    """
    title = models.CharField(max_length=512, verbose_name="Наименование профессионального стандарта из данной области")
    code = models.CharField(max_length=512, verbose_name="Код профессионального стандарта из данной области", blank=True, null=True)

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

    academic_plan = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE, verbose_name = 'Учебный план', related_name="academic_plan_in_field_of_study", blank=True, null=True)
    field_of_study = models.ManyToManyField('FieldOfStudy', verbose_name = 'Направление подготовки', related_name="implementation_academic_plan_in_field_of_study") #todo сделать многие ко многим
    year = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(1984), max_value_current_year], blank=True, null=True)
    period_of_study = models.CharField(max_length=100, blank=True, null=True)
    op_isu_id = models.PositiveIntegerField(verbose_name = "ID ОП в ИСУ", blank=True, null=True)
    ns_id = models.PositiveIntegerField(verbose_name = "ID учебного плана в ИСУ", blank=True, null=True)
    ap_isu_id = models.PositiveIntegerField(verbose_name = "ID учебного плана в ИСУ", blank=True, null=True)
    ns_id = models.PositiveIntegerField(verbose_name = "ID учебного плана в ИСУ", blank=True, null=True)
    qualification = models.CharField(choices=QUALIFICATION_CHOICES, max_length=1024, verbose_name = 'Квалификация', blank = True, null = True)
    educational_profile = models.CharField(max_length=1024, verbose_name = 'Профиль ОП', blank = True, null = True)
    language = models.CharField(choices=languages_for_wp, max_length=15, verbose_name='Языки',
                                blank=True, null=True)
    title = models.CharField(max_length=1024, verbose_name = 'Название', blank = True, null = True)

    def __str__(self):
        return str(self.academic_plan)


class DisciplineBlock(CloneMixin,models.Model):
    '''
    Модель блока дисциплин
    '''
    name = models.CharField(max_length=1024)
    academic_plan = models.ForeignKey('AcademicPlan', on_delete=models.CASCADE,
                                      verbose_name='Учебный план в направлении',
                                      related_name="discipline_blocks_in_academic_plan", blank=True, null=True)

    # work_program = models.ManyToManyField('WorkProgram', verbose_name = "Рабочая программа", blank=True, null=True)

    def __str__(self):
        return (str(self.name) + str(self.academic_plan))

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

    TYPES = [
        ('universal_module', 'universal_module'),
        ('physical_culture', 'physical_culture'),
        ('philosophy_thinking"', 'philosophy_thinking"'),
        ('digital_culture', 'digital_culture'),
        ('entrepreneurial_culture', 'entrepreneurial_culture'),
        ('soft_skills', 'soft_skills'),
        ('ognp', 'ognp'),
        ('natural_science_module', 'natural_science_module'),
        ('general_professional_module', 'general_professional_module'),
        ('elective_module', 'elective_module'),
        ('interdisciplinary_module_of_the_faculty', 'interdisciplinary_module_of_the_faculty'),
        ('faculty_module', 'faculty_module'),
        ('profile_professional_module', 'profile_professional_module'),
        ('math_module', 'math_module'),
        ('digital_culture_in_professional_activities', 'digital_culture_in_professional_activities'),
        ('specialization_module', 'specialization_module'),
        ('gia', 'gia'),
        ('practice', 'practice'),
        ('optional_disciplines', 'optional_disciplines'),
    ]

    type = models.CharField(choices=TYPES, max_length=100, default='faculty_module')
    name = models.CharField(max_length=1024)
    descipline_block = models.ManyToManyField('DisciplineBlock', verbose_name='Модуль в блоке',
                                              related_name='modules_in_discipline_block', blank=True)
    order = models.IntegerField(blank=True, null=True, verbose_name="Порядок модулей")
    description = models.CharField(max_length=10240, verbose_name="Описания блока модуля дисциплин", blank=True, null=True)
    # work_program = models.ManyToManyField('WorkProgram', verbose_name = "Рабочая программа", blank=True, null=True)
    class Meta:
        ordering = ['order']

    def __str__(self):
        return (str(self.name) + str(self.descipline_block))

    def clone_module(module_id):
        module = DisciplineBlockModule.objects.get(pk=module_id)
        clone_module = module.make_clone()
        wp_in_module=WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module)
        for change in wp_in_module:
            clone_change=change.make_clone(attrs={'discipline_block_module': clone_module})
            wp_in_fos=WorkProgramInFieldOfStudy.objects.filter(work_program_change_in_discipline_block_module=change)
            for wp in wp_in_fos:
                clone_wp_in_fos = wp.make_clone(attrs={'work_program_change_in_discipline_block_module': clone_change})
        return clone_module


class WorkProgramChangeInDisciplineBlockModule(CloneMixin,models.Model):
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
    change_type = models.CharField(choices=CHANGE_CHOICES, max_length=1024, verbose_name='Форма обучения', blank=True,
                                   null=True)
    discipline_block_module = models.ForeignKey('DisciplineBlockModule', on_delete=models.CASCADE,
                                                verbose_name='Модуль в блоке',
                                                related_name="change_blocks_of_work_programs_in_modules", blank=True,
                                                null=True)
    work_program = models.ManyToManyField('WorkProgram', verbose_name="Рабочая программа",
                                          through='WorkProgramInFieldOfStudy',
                                          related_name="work_program_in_change_block")
    subject_code = models.CharField(max_length=1024, verbose_name="Срок сдачи в неделях", blank=True, null=True)

    # zuns = models.ManyToManyField('Zun', verbose_name = "Зуны", through='WorkProgramInFieldOfStudy', related_name="zuns_in_changeblock")

    def __str__(self):
        return (str(self.discipline_block_module) + str(self.work_program))


class WorkProgramInFieldOfStudy(CloneMixin,models.Model):
    work_program_change_in_discipline_block_module = models.ForeignKey('WorkProgramChangeInDisciplineBlockModule',
                                                                       on_delete=models.CASCADE, related_name="zuns_for_cb")
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE, related_name="zuns_for_wp")
    id_str_up = models.IntegerField(verbose_name="Id строки учебного плана", blank=True, null=True)
    # indicators = models.ManyToManyField('Indicator', through=CompetenceIndicator)


class WorkProgramIdStrUpForIsu(CloneMixin,models.Model):
    id_str_up = models.IntegerField(verbose_name="Id строки учебного плана", blank=True, null=True)
    ns_id = models.PositiveIntegerField(verbose_name = "ID учебного плана в ИСУ", blank=True, null=True)
    work_program_in_field_of_study = models.ForeignKey('WorkProgramInFieldOfStudy', on_delete=models.CASCADE, related_name="zuns_for_wp")
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
    wp_in_fs = models.ForeignKey('WorkProgramInFieldOfStudy', on_delete=models.CASCADE, blank=True, null=True, related_name="zun_in_wp")
    indicator_in_zun = models.ForeignKey('Indicator', on_delete=models.CASCADE, blank=True, null=True)
    knowledge = models.CharField(max_length=1024, blank=True, null=True)
    skills = models.CharField(max_length=1024, blank=True, null=True)
    attainments = models.CharField(max_length=1024, blank=True, null=True)
    items = models.ManyToManyField('OutcomesOfWorkProgram', verbose_name = "Учебная сущность и уровень освоения", blank=True, null=True)

    # def __str__(self):
    #     return (str(self.work_program_change_in_discipline_block_module) + str(self.work_program))



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
    # work_programs = models.ManyToManyField('WorkProgram', through=IndicatorWorkProgram, blank=True, null=True)
    competence = models.ForeignKey('Competence', on_delete=models.CASCADE, related_name = "indicator_in_competencse")

    def __str__(self):
        return self.name


class EvaluationTool(CloneMixin,models.Model):
    '''
    Модель для оценочных средств
    '''
    type = models.CharField(max_length=1024, verbose_name="Тип оценочного средства")
    name = models.CharField(max_length=1024, verbose_name="Наименование оценочного средства")
    description = models.CharField(max_length=50000, verbose_name="Описание", blank=True, null=True)
    check_point = models.BooleanField(verbose_name="Контрольная точка", blank=True, null=True)
    deadline = models.IntegerField(verbose_name="Срок сдачи в неделях", blank=True, null=True)
    semester = models.IntegerField(verbose_name="Семестр в котором сдается оценочное средство", blank=True, null=True)
    min = models.IntegerField(verbose_name="Максимальное значение", blank=True, null=True)
    max = models.IntegerField(verbose_name="Минимальное значение", blank=True, null=True)

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
        ('4', 'Coursework')
    ]
    type = models.CharField(choices=types, default='1',max_length=1024, verbose_name="Тип оценочного средства")
    name = models.CharField(blank=True, null=True, max_length=1024, verbose_name="Наименование оценочного средства", default="No name")
    description = models.CharField(max_length=50000, verbose_name="Описание", blank=True, null=True)
    #check_point = models.BooleanField(verbose_name="Контрольная точка", blank=True, null=True)
    deadline = models.IntegerField(verbose_name="Срок сдачи в неделях", blank=True, null=True)
    semester = models.IntegerField(verbose_name="Семестр в котором сдается оценочное средство", blank=True, null=True)
    min = models.IntegerField(verbose_name="Максимальное значение", blank=True, null=True)
    max = models.IntegerField(verbose_name="Минимальное значение", blank=True, null=True)
    work_program = models.ForeignKey("WorkProgram", verbose_name='Аттестационное оценочное средство', related_name = "certification_evaluation_tools", on_delete=models.CASCADE)

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
    description = models.CharField(max_length=5000, verbose_name="Описание", blank=True, null=True)
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
    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True, verbose_name='Профессия')
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
    approval_date = models.DateTimeField(editable=True, auto_now_add=True, blank=True, null=True, verbose_name='Профессия')
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

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Пререквизит", related_name = 'item_in_sop')
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

    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Пререквизит", related_name = 'item_in_sor')
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

