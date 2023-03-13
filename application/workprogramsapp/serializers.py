from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.fields import BooleanField

from dataprocessing.serializers import ItemSerializer, userProfileSerializer
from gia_practice_app.GIA.models import GIA
from gia_practice_app.Practice.models import Practice
from onlinecourse.serializers import OnlineCourseSerializer
# from gia_practice_app.GIA.serializers import GIASerializer, GIAPrimitiveSerializer
# from gia_practice_app.Practice.serializers import PracticeSerializer, PracticePrimitiveSerializer
from .disciplineblockmodules.ze_module_logic import recursion_module, recursion_module_per_ze
from .expertise.common_serializers import ShortExpertiseSerializer
from .expertise.models import Expertise
from .models import WorkProgram, Indicator, Competence, OutcomesOfWorkProgram, DisciplineSection, Topic, EvaluationTool, \
    PrerequisitesOfWorkProgram, Certification, BibliographicReference, FieldOfStudy, \
    ImplementationAcademicPlan, AcademicPlan, DisciplineBlock, DisciplineBlockModule, \
    WorkProgramChangeInDisciplineBlockModule, Zun, WorkProgramInFieldOfStudy, СertificationEvaluationTool, \
    AcademicPlanUpdateLog, AcademicPlanUpdateSchedulerConfiguration, AcademicPlanUpdateConfiguration, \
    IsuObjectsSendLogger
from .workprogram_additions.serializers import AdditionalMaterialSerializer, ShortStructuralUnitSerializer, \
    ShortUniversityPartnerSerializer


# from gia_practice_app.GIA.serializers import GIASerializer, GIAPrimitiveSerializer
# from gia_practice_app.Practice.serializers import PracticeSerializer, PracticePrimitiveSerializer


class AcademicPlanUpdateLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateLog
        fields = ['id', 'object_type', 'field_name', 'old_value', 'new_value', 'updated_date_time', 'academic_plan_id']


class AcademicPlanUpdateConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateConfiguration
        fields = ['id', 'academic_plan_id', 'academic_plan_title', 'updated_date_time', 'updates_enabled']


class AcademicPlanUpdateConfigurationEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateConfiguration
        fields = ['updates_enabled']


class AcademicPlanUpdateSchedulerConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateSchedulerConfiguration
        fields = ['days_interval', 'execution_hours']


class IndicatorSerializer(serializers.ModelSerializer):
    """Сериализатор Индикаторов"""

    class Meta:
        model = Indicator
        fields = ['id', 'number', 'name', 'competence']


class CompetenceSerializer(serializers.ModelSerializer):
    """Сериализатор Компетенций"""

    class Meta:
        model = Competence
        fields = ['id', 'number', 'name']


class CompetenceForEPSerializer(serializers.ModelSerializer):
    """Сериализатор Компетенций"""
    indicator_in_competencse = IndicatorSerializer(many=True)

    class Meta:
        model = Competence
        fields = ['id', 'number', 'name', 'indicator_in_competencse']


class IndicatorListSerializer(serializers.ModelSerializer):
    competence = CompetenceSerializer()

    class Meta:
        model = Indicator
        fields = ['id', 'number', 'name', 'competence']


class IndicatorListWithoutCompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicator
        fields = ['id', 'number', 'name']


class FieldOfStudyImplementationSerializer(serializers.ModelSerializer):
    """
        Сериализатор образовательных программ (направлений)
    """

    # implementation_academic_plan_in_field_of_study = ImplementationAcademicPlanSerializer(many = True)

    class Meta:
        model = FieldOfStudy
        fields = ['number', 'id', 'title', 'qualification', 'educational_profile', 'faculty']


class AcademicPlanInImplementationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date']


class ImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    academic_plan = AcademicPlanInImplementationSerializer()
    field_of_study = FieldOfStudyImplementationSerializer(many=True)

    # academic_plan = AcademicPlanSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id', 'academic_plan', 'field_of_study', 'year']


class ImplementationAcademicPlanCreateSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        updated_module = super(ImplementationAcademicPlanCreateSerializer, self).update(instance, validated_data)
        module_group = Group.objects.get(name='academic_plan_developer')
        for user in updated_module.editors.all():
            if module_group not in user.groups.all():
                user.groups.add(module_group)
                user.save()
        return updated_module

    class Meta:
        model = ImplementationAcademicPlan
        fields = "__all__"


class OutcomesOfWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор работы с результатом обучения"""
    item = ItemSerializer()

    class Meta:
        model = OutcomesOfWorkProgram
        fields = ['id', 'item', 'workprogram', 'masterylevel']


class OutcomesOfWorkProgramCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания результата обучения"""

    class Meta:
        model = OutcomesOfWorkProgram
        fields = ['item', 'workprogram', 'masterylevel', 'evaluation_tool']
        extra_kwargs = {
            'evaluation_tool': {'required': False}
        }


class EvaluationToolSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов"""

    class Meta:
        model = EvaluationTool
        fields = "__all__"


class EvaluationToolForOutcomsSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов"""

    class Meta:
        model = EvaluationTool
        fields = ['id', 'type', 'name', 'max', 'min', 'deadline', 'check_point', 'description', 'evaluation_criteria']


class СertificationEvaluationToolForWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов"""

    class Meta:
        model = СertificationEvaluationTool
        fields = ['id', 'type', 'name', 'description', 'deadline', 'min', 'max', 'semester', 'evaluation_criteria']


class СertificationEvaluationToolCreateSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов"""

    class Meta:
        model = СertificationEvaluationTool
        fields = ['id', 'type', 'name', 'description', 'deadline', 'semester', 'min', 'max', 'work_program',
                  'evaluation_criteria', 'discipline_block_module']


class OutcomesOfWorkProgramInWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор вывода результата обучения для вывода результата в рабочей программе"""
    # item_name  = serializers.ReadOnlyField(source='item.name')
    # item_id  = serializers.ReadOnlyField(source='item.id')
    item = ItemSerializer()
    evaluation_tool = EvaluationToolForOutcomsSerializer(many=True)

    class Meta:
        model = OutcomesOfWorkProgram
        fields = ['id', 'item', 'masterylevel', 'evaluation_tool']
        extra_kwargs = {
            'evaluation_tool': {'required': False}
        }


class PrerequisitesOfWorkProgramCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""

    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ['item', 'workprogram', 'masterylevel']


class PrerequisitesOfWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""
    item = ItemSerializer()

    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ['id', 'item', 'workprogram', 'masterylevel']


class PrerequisitesOfWorkProgramInWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор вывода пререквизита обучения для вывода пререквизита в рабочей программе"""
    # item_name  = serializers.ReadOnlyField(source='item.name')
    # item_id  = serializers.ReadOnlyField(source='item.id')
    item = ItemSerializer()

    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ['id', 'item', 'masterylevel']


class TopicSerializer(serializers.ModelSerializer):
    """Сериализатор Тем"""
    url_online_course = OnlineCourseSerializer(required=False)
    additional_materials_for_topic = AdditionalMaterialSerializer(many=True)

    class Meta:
        model = Topic
        fields = ['id', 'discipline_section', 'number', 'description', 'url_online_course',
                  'additional_materials_for_topic']


class TopicCreateSerializer(serializers.ModelSerializer):
    """Сериализатор Тем"""

    class Meta:
        model = Topic
        fields = ['id', 'discipline_section', 'number', 'description', 'url_online_course']
        extra_kwargs = {
            'number': {'required': False}
        }


class SectionSerializer(serializers.ModelSerializer):
    """Сериализатор Разделов"""

    class Meta:
        model = DisciplineSection
        fields = "__all__"


class BibliographicReferenceSerializer(serializers.ModelSerializer):
    """Сериализатор Разделов"""

    class Meta:
        model = BibliographicReference
        fields = "__all__"


class DisciplineSectionSerializer(serializers.ModelSerializer):
    """Сериализатор Разделов"""
    topics = TopicSerializer(many=True)
    evaluation_tools = EvaluationToolSerializer(many=True)

    class Meta:
        model = DisciplineSection
        fields = ['id', 'ordinal_number', 'name', 'topics', 'evaluation_tools', 'contact_work', 'lecture_classes',
                  'laboratory', 'practical_lessons', 'SRO', 'total_hours', 'consultations']


class CertificationSerializer(serializers.ModelSerializer):
    """Сериализатор аттестации"""

    class Meta:
        model = Certification
        fields = "__all__"


class WorkProgramForIndividualRoutesSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(source='prerequisitesofworkprogram_set',
                                                                      many=True)
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(source='outcomesofworkprogram_set', many=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code', 'qualification', 'prerequisites', 'outcomes']


class WorkProgramCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания рабочих программ"""

    evaluation_tools = serializers.ListField(write_only=True, required=False,
                                             child=serializers.ListField(write_only=True, required=False,
                                                                         child=serializers.IntegerField()))

    def create(self, validated_data):

        evaluation_tools = validated_data.pop("evaluation_tools", None)
        wp = super(WorkProgramCreateSerializer, self).create(validated_data)
        for i in range(len(evaluation_tools)):
            for tool in evaluation_tools[i]:
                СertificationEvaluationTool.objects.create(type=tool, work_program=wp, semester=i + 1)
        return wp

    class Meta:
        model = WorkProgram
        fields = ['id', 'discipline_code', 'authors', 'qualification', 'title', 'hoursFirstSemester',
                  'hoursSecondSemester', 'bibliographic_reference', 'description', 'video', 'owner', 'editors', 'hours',
                  'extra_points', 'language', 'structural_unit', 'bars', 'number_of_semesters', 'implementation_format',
                  'lecture_hours_v2', 'practice_hours_v2', 'practice_hours_v2', 'practice_hours_v2', 'lab_hours_v2',
                  'srs_hours_v2', 'contact_hours_v2', "ze_v_sem", "evaluation_tools", 'consultation_v2', 'moodle_link']
        extra_kwargs = {
            'bibliographic_reference': {'required': False}
        }


class WorkProgramEditorsUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания рабочих программ"""

    class Meta:
        model = WorkProgram
        fields = ['editors']


class WorkProgramArchiveUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор для отправки РПД в архив"""

    class Meta:
        model = WorkProgram
        fields = ['work_status']


class BibliographicReferenceForWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор Разделов"""

    class Meta:
        model = BibliographicReference
        fields = ['id']


class Geeks(object):
    def __init__(self, dictonary):
        self.dict = bibliographic_references


class WorkProgramBibliographicReferenceUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания рабочих программ"""

    # bibliographic_reference = BibliographicReferenceForWorkProgramSerializer(many=True, read_only=False)
    # bibliographic_reference = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=BibliographicReference.objects.all())
    # bibliographic_references = serializers.DictField(
    #     child = serializers.CharField())
    # , source='bibrefs_set'
    # bibrefs = BibliographicReferenceForWorkProgramSerializer(many=True, read_only=True)

    class Meta:
        model = WorkProgram
        fields = ['bibliographic_reference']
    #
    # def update(self, instance, validated_data):
    #     tags_data = validated_data.pop('bibliographic_references')
    #     print (validated_data('bibliographic_references'))
    #     for tag_data in tags_data:
    #         print(tags_data)
    # print (tags_data[0])
    #     instance = super(WorkProgramBibliographicReferenceUpdateSerializer, self).update(instance, validated_data)
    #
    #     for tag_data in tags_data:
    #         tag_qs = BibliographicReference.objects.filter(name__iexact=tag_data['bibliographic_reference'])
    #
    #         if tag_qs.exists():
    #             tag = tag_qs.first()
    #         else:
    #             tag = BibliographicReferenceSerializer.objects.create(**tag_data)
    #
    #         instance.bibliographic_reference.add(tag)
    #
    #     return instance


class DisciplineSectionForEvaluationToolsSerializer(serializers.ModelSerializer):
    """Сериализатор Разделов для оценочных средств"""

    class Meta:
        model = DisciplineSection
        fields = ['id', 'ordinal_number', 'name']


class FieldOfStudySerializer(serializers.ModelSerializer):
    """
        Сериализатор образовательных программ (направлений)
    """

    class Meta:
        model = FieldOfStudy
        fields = "__all__"


class EvaluationToolForWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов"""
    # descipline_sections = serializers.StringRelatedField(many=True, source='evaluation_tools')
    descipline_sections = DisciplineSectionForEvaluationToolsSerializer(many=True, source='evaluation_tools')

    class Meta:
        model = EvaluationTool
        fields = ['id', 'type', 'name', 'description', 'check_point', 'deadline', 'min', 'max', 'descipline_sections',
                  'semester', 'evaluation_criteria']


class EvaluationToolCreateSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов"""
    descipline_sections = serializers.PrimaryKeyRelatedField(many=True, source='evaluation_tools',
                                                             queryset=DisciplineSection.objects.all())

    # descipline_sections = DisciplineSectionForEvaluationToolsSerializer(many=True, source='evaluation_tools')

    class Meta:
        model = EvaluationTool
        fields = ['type', 'name', 'description', 'check_point', 'deadline', 'semester', 'min', 'max',
                  'descipline_sections', 'evaluation_criteria']


class EvaluationToolListSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов для ListView"""
    descipline_sections = serializers.PrimaryKeyRelatedField(many=True, source='evaluation_tools',
                                                             queryset=DisciplineSection.objects.all())
    wp_id = serializers.SerializerMethodField()

    def get_wp_id(self, instance):
        try:
            id_wp = WorkProgram.objects.filter(discipline_sections__evaluation_tools=instance)[0].id
        except IndexError:
            id_wp = None
        return id_wp

    # descipline_sections = DisciplineSectionForEvaluationToolsSerializer(many=True, source='evaluation_tools')

    class Meta:
        model = EvaluationTool
        fields = ['id', 'type', 'name', 'description', 'check_point', 'deadline', 'semester', 'min', 'max',
                  'descipline_sections', 'evaluation_criteria', 'wp_id']


class ZunSerializer(serializers.ModelSerializer):
    """Сериализатор Зунов"""
    indicator_in_zun = IndicatorListSerializer()

    class Meta:
        model = Zun
        fields = ['id', 'indicator_in_zun', 'items']


class ZunForManyCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания нескольких Зунов"""

    # def __init__(self, *args, **kwargs):
    #     many = kwargs.pop('many', True)
    #     super(ZunForManyCreateSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = Zun
        fields = ['id', 'indicator_in_zun', 'items', 'wp_in_fs', 'knowledge', 'skills', 'attainments']


class ZunForDetailAcademicPlanSerializer(serializers.ModelSerializer):
    """Сериализатор Зунов"""
    indicator_in_zun = IndicatorListSerializer()
    items = OutcomesOfWorkProgramSerializer(many=True)

    class Meta:
        model = Zun
        fields = ['id', 'indicator_in_zun', 'items']


class WorkProgramInFieldOfStudySerializerForCb(serializers.ModelSerializer):
    """Сериализатор Зунов"""
    zun_in_wp = ZunForDetailAcademicPlanSerializer(many=True)

    class Meta:
        model = WorkProgramInFieldOfStudy
        fields = ['id', 'zun_in_wp']


class ZunCreateSerializer(serializers.Serializer):
    """Сериализатор Зунов"""
    # indicator_in_zun = IndicatorListSerializer()
    indicator_in_zun = serializers.PrimaryKeyRelatedField(queryset=Indicator.objects.all())
    wp_changeblock = serializers.IntegerField()
    work_program = serializers.IntegerField()
    # knowledge = serializers.CharField()
    # kills = serializers.CharField()
    # attainments = serializers.CharField()
    # zuns_in_changeblock = serializers.PrimaryKeyRelatedField(queryset=Zun.objects.all())
    items = serializers.PrimaryKeyRelatedField(allow_null=True, required=False,
                                               queryset=OutcomesOfWorkProgram.objects.all(), many=True)


class ZunCreateSaveSerializer(serializers.ModelSerializer):
    """Сериализатор Сохранения Зунов"""

    def update(self, instance, validated_data):
        instance.indicator_in_zun = validated_data.get('content', instance.indicator_in_zun)

        for item in validated_data.get('items'):
            instance.items.add(item)
        return instance

    class Meta:
        model = Zun
        fields = ['id', 'indicator_in_zun', 'wp_in_fs', 'items']
        # 'knowledge', 'skills', 'attainments'
        extra_kwargs = {
            'items': {'allow_null': True}
        }

    # def create(self, validated_data):
    #     #wp_in_fs = validated_data.get('wp_changeblock', [])
    #     zun = Zun(indicator_in_zun=validated_data.get('indicator_in_zun', None),
    #               knowledge=validated_data.get('knowledge', None),
    #               skills=validated_data.get('skills', None),
    #               attainments=validated_data.get('attainments', None))
    #     zun.save()
    #
    #     return zun


class WorkProgramInFieldOfStudyCreateSerializer(serializers.ModelSerializer):
    """Сериализатор Зунов"""
    zun_in_wp = ZunCreateSerializer(many=True, read_only=True)

    class Meta:
        model = WorkProgramInFieldOfStudy
        fields = ['id', 'work_program_change_in_discipline_block_module', 'work_program', 'zun_in_wp']


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class WorkProgramForDisciplineBlockSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    # prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(source='prerequisitesofworkprogram_set', many=True)
    # outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(source='outcomesofworkprogram_set', many=True)
    # zuns_for_wp = WorkProgramInFieldOfStudySerializerForCb(many=True)
    zuns_for_wp = serializers.SerializerMethodField('clarify_zuns_for_wp')
    # zuns_for_wp = RecursiveField(many=True)
    wp_in_fs_id = serializers.SerializerMethodField('wp_in_fs_id_get')

    def to_representation(self, value):

        self.fields['wp_status'] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_wp_status(self, value):
        try:
            wp_status = Expertise.objects.get(work_program=value).expertise_status
        except Expertise.DoesNotExist:
            wp_status = "WK"
        return wp_status

    class Meta:
        model = WorkProgram
        fields = ['id', 'wp_in_fs_id', 'approval_date', 'authors', 'discipline_code', 'title', 'qualification',
                  'hoursFirstSemester', 'hoursSecondSemester', 'zuns_for_wp', "ze_v_sem", 'number_of_semesters']

    def clarify_zuns_for_wp(self, obj, *args, **kwargs):
        zuns_for_wp_objects = WorkProgramInFieldOfStudy.objects.filter(
            work_program_change_in_discipline_block_module=self.context.get('parent_cb_id'), work_program=obj.id)
        serializers = WorkProgramInFieldOfStudySerializerForCb(zuns_for_wp_objects, many=True)
        return serializers.data

    def wp_in_fs_id_get(self, obj, *args, **kwargs):
        return WorkProgramInFieldOfStudy.objects.filter(
            work_program_change_in_discipline_block_module=self.context.get('parent_cb_id'), work_program=obj.id)[0].id


class WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer(serializers.ModelSerializer):
    # work_program = WorkProgramForDisciplineBlockSerializer(many=True)
    work_program = serializers.SerializerMethodField('get_id_of_wpcb')

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = ['id', 'code', 'credit_units', 'change_type', 'work_program', 'semester_start',
                  'semester_duration']

    def get_id_of_wpcb(self, obj):
        work_program = WorkProgram.objects.filter(work_program_in_change_block=obj.id)
        serializers = WorkProgramForDisciplineBlockSerializer(work_program, many=True, context={'parent_cb_id': obj.id})
        return serializers.data


class WorkProgramChangeInDisciplineBlockModuleSerializer(serializers.ModelSerializer):
    # work_program = WorkProgramForDisciplineBlockSerializer(many=True)
    # work_program = serializers.SerializerMethodField('get_id_of_wpcb')
    work_program = serializers.SerializerMethodField('get_id_of_wpcb')

    def to_representation(self, value):
        self.fields['gia'] = GIAPrimitiveSerializer(required=False, many=True)
        self.fields['practice'] = PracticePrimitiveSerializer(required=False, many=True)
        self.fields['semester_start'] = serializers.SerializerMethodField()
        # self.fields['gia'] = GIASerializer(required=False, many=True)
        # self.fields['practice'] = PracticeSerializer(required=False, many=True)
        return super().to_representation(value)

    def get_semester_start(self, obj):
        if obj.semester_start:
            return obj.semester_start
        else:
            try:
                ze_list = obj.credit_units.split(",")
                for i, el in enumerate(ze_list):
                    if int(el) != 0:
                        return [i + 1]
            except IndexError:
                return []
            except AttributeError:
                return []

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = ['id', 'code', 'credit_units', 'change_type', 'work_program', 'discipline_block_module', 'practice',
                  'gia',
                  'semester_start', 'semester_duration']

    def get_id_of_wpcb(self, obj):
        work_program = WorkProgram.objects.filter(work_program_in_change_block=obj.id)
        serializers = WorkProgramForDisciplineBlockSerializer(work_program, many=True, context={'parent_cb_id': obj.id})
        return serializers.data


class DisciplineBlockModuleWithoutFatherSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)

    # father = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields['childs'] = DisciplineBlockModuleWithoutFatherSerializer(many=True)
        self.fields['laboriousness'] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_laboriousness(self, obj):
        unit_final_sum = recursion_module(obj)

        return unit_final_sum

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'selection_rule', 'change_blocks_of_work_programs_in_modules',
                  'selection_parametr']


class DisciplineBlockModuleSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)

    # father = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields['childs'] = DisciplineBlockModuleWithoutFatherSerializer(many=True)
        self.fields["laboriousness"] = serializers.SerializerMethodField()
        # self.fields["ze_by_sem"] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_laboriousness(self, obj):
        unit_final_sum = recursion_module(obj)

        return unit_final_sum

    """def get_ze_by_sem(self, obj):
        max_ze, max_hours_lab, max_hours_lec, max_hours_practice, max_hours_cons = recursion_module_per_ze(obj)
        #print(max_hours_lec)
        return {"max_ze": max_ze}"""

    def get_childs(self, obj):
        childs = DisciplineBlockModule.objects.filter(father_module=obj)
        if childs:
            return DisciplineBlockModuleWithoutFatherSerializer(childs, many=True).data
        else:
            return None

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'change_blocks_of_work_programs_in_modules', 'selection_rule',
                  'selection_parametr']
        extra_kwargs = {
            'change_blocks_of_work_programs_in_modules': {'required': False}
        }


class DisciplineBlockSerializer(serializers.ModelSerializer):
    modules_in_discipline_block = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields["laboriousness"] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_laboriousness(self, obj):
        sum_ze = 0
        for module in DisciplineBlockModule.objects.filter(descipline_block=obj):
            sum_ze += recursion_module(module)

        return sum_ze

    def get_modules_in_discipline_block(self, obj):
        dbms = DisciplineBlockModule.objects.filter(descipline_block=obj)
        if dbms.exists():
            try:
                for module in dbms:
                    if str(obj.academic_plan.id) in str(module.orderings_for_ups):
                        module.orderings_for_ups = list(
                            filter(lambda x: x['up_id'] == obj.academic_plan, module.orderings_for_ups))

                    else:
                        raise
                dbms = dbms.order_by('orderings_for_ups__0__number')

            except:
                for index, module in enumerate(dbms):
                    module_for_save = DisciplineBlockModule.objects.get(id=module.id)
                    if module_for_save.orderings_for_ups is not None:
                        if str(obj.academic_plan.id) not in str(module.orderings_for_ups):
                            module_for_save.orderings_for_ups.append(
                                {"up_id": obj.academic_plan.id, "number": index + 1})
                        else:
                            for ap_index in module_for_save.orderings_for_ups:
                                if ap_index['up_id'] == obj.academic_plan.id:
                                    ap_index['number'] = index + 1
                    else:
                        module_for_save.orderings_for_ups = []
                        module_for_save.orderings_for_ups.append({"up_id": obj.academic_plan.id, "number": index + 1})
                    module_for_save.save()
                dbms = dbms.order_by('orderings_for_ups__0__number')
        modules_in_discipline_block = DisciplineBlockModuleSerializer(dbms, many=True)
        return modules_in_discipline_block.data

    class Meta:
        model = DisciplineBlock
        fields = ['id', 'name', 'modules_in_discipline_block']


class ImplementationAcademicPlanShortForAPSerializer(serializers.ModelSerializer):
    field_of_study = FieldOfStudyImplementationSerializer(many=True)
    university_partner = ShortUniversityPartnerSerializer(many=True)
    editors = userProfileSerializer(many=True)
    structural_unit = ShortStructuralUnitSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id', 'year', 'qualification', 'title', 'field_of_study', 'plan_type', 'training_period',
                  'structural_unit', 'total_intensity', 'military_department',
                  'university_partner', 'editors']


class AcademicPlanSerializer(serializers.ModelSerializer):
    discipline_blocks_in_academic_plan = DisciplineBlockSerializer(many=True, required=False)
    can_edit = BooleanField(read_only=True)
    academic_plan_in_field_of_study = ImplementationAcademicPlanShortForAPSerializer(many=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # try:
        #     data["can_edit"] = self.context['request'].user == instance.author or bool(
        #         self.context['request'].user.groups.filter(name="academic_plan_developer"))\
        #                        or bool(
        #         self.context['request'].user.groups.filter(name="expertise_master"))
        # except KeyError:
        #     data["can_edit"] = False
        # print(instance.academic_plan_in_field_of_study.filter()[0].editors)
        data["laboriousness"] = sum(
            [block["laboriousness"] if block["name"] != "Блок 4. Факультативные модули (дисциплины)" else 0 for block in
             data["discipline_blocks_in_academic_plan"]])
        if instance.on_check == 'on_check' and not bool(
                self.context['request'].user.groups.filter(name="expertise_master")):
            data["can_edit"] = False
        elif self.context['request'].user in instance.academic_plan_in_field_of_study.filter()[0].editors.all() and \
                instance.on_check != 'verified':
            data["can_edit"] = True
        elif self.context['request'].user.is_staff or bool(
                self.context['request'].user.groups.filter(name="expertise_master")):
            data["can_edit"] = True
        else:
            data["can_edit"] = False
        if instance.on_check == 'on_check' and bool(
                self.context['request'].user.groups.filter(name="expertise_master")):
            data["can_validate"] = True
        else:
            data["can_validate"] = False
        data["discipline_blocks_in_academic_plan"] = sorted(data["discipline_blocks_in_academic_plan"],
                                                            key=lambda x: x["name"])
        if IsuObjectsSendLogger.objects.filter(error_status=0, obj_type='ap', ap_id=instance.id).exists():
            data["was_send_to_isu"] = True
        else:
            data["was_send_to_isu"] = False
        return data

    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'discipline_blocks_in_academic_plan', 'year',
                  'education_form', 'qualification', 'author', 'can_edit', 'academic_plan_in_field_of_study',
                  'ap_isu_id', 'on_check', 'excel_generation_errors']
        extra_kwargs = {
            'discipline_blocks_in_academic_plan': {'required': False},
            'academic_plan_in_field_of_study': {'required': False}
        }


class AcademicPlanForRepresentationSerializer(serializers.ModelSerializer):
    discipline_blocks_in_academic_plan = DisciplineBlockSerializer(many=True, required=False)
    can_edit = BooleanField(read_only=True)

    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'discipline_blocks_in_academic_plan', 'year',
                  'education_form', 'qualification', 'author', 'can_edit']


class AcademicPlanCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'year', 'education_form', 'author']


class WorkProgramShortForExperiseSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code', 'qualification', 'prerequisites', 'outcomes']


class WorkProgramChangeInDisciplineBlockModuleSerializerDetail(serializers.ModelSerializer):
    work_program = WorkProgramShortForExperiseSerializer(many=True)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = "__all__"


class PracticePrimitiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practice
        fields = "__all__"


class GIAPrimitiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = GIA
        fields = "__all__"


class WorkProgramChangeInDisciplineBlockModuleUpdateSerializer(serializers.ModelSerializer):
    work_program = serializers.PrimaryKeyRelatedField(many=True, queryset=WorkProgram.objects.all())
    gia = serializers.PrimaryKeyRelatedField(many=True, queryset=GIA.objects.all())
    practice = serializers.PrimaryKeyRelatedField(many=True, queryset=Practice.objects.all())

    def to_representation(self, value):
        # self.fields['gia'] = GIAPrimitiveSerializer(required=False, many=True)
        # self.fields['practice'] = PracticePrimitiveSerializer(required=False, many=True)
        return super().to_representation(value)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = ['id', 'code', 'credit_units', 'change_type', 'work_program', 'semester_start', 'semester_duration',
                  'gia', 'practice']
        extra_kwargs = {
            'work_program': {'required': False}
        }


class ImplementationAcademicPlanForWPinFSSerializer(serializers.ModelSerializer):
    field_of_study = FieldOfStudyImplementationSerializer(many=True)

    # academic_plan = AcademicPlanSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id', 'year', 'field_of_study', 'title']


class AcademicPlanForWPinFSSerializer(serializers.ModelSerializer):
    academic_plan_in_field_of_study = ImplementationAcademicPlanForWPinFSSerializer(many=True)

    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'academic_plan_in_field_of_study']


class DisciplineBlockDetailAcademicSerializer(serializers.ModelSerializer):
    # modules_in_discipline_block = DisciplineBlockModuleSerializer(many=True)
    academic_plan = AcademicPlanForWPinFSSerializer()

    class Meta:
        model = DisciplineBlock
        fields = "__all__"


class DisciplineBlockForWPinFSSerializer(serializers.ModelSerializer):
    # modules_in_discipline_block = DisciplineBlockModuleSerializer(many=True)
    academic_plan = AcademicPlanForWPinFSSerializer(read_only=True)

    class Meta:
        model = DisciplineBlock
        fields = ['id', 'name', 'academic_plan']


class DisciplineBlockModuleForWPinFSSerializer(serializers.ModelSerializer):
    # descipline_block = DisciplineBlockForWPinFSSerializer(read_only=True, many=True)
    descipline_block = serializers.SerializerMethodField()

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'descipline_block']

    def get_descipline_block(self, instance):
        serializers = DisciplineBlockForWPinFSSerializer(DisciplineBlock.objects.filter
                                                         (modules_in_discipline_block__in=self.get_blocks_for_all_children(instance))
                                                         , many=True)
        return serializers.data

    def get_blocks_for_all_children(self, instance, include_self=True):
        r = []
        if include_self:
            r.append(instance)
        for c in DisciplineBlockModule.objects.filter(childs=instance):
            _r = self.get_blocks_for_all_children(c, include_self=True)
            if 0 < len(_r):
                r.extend(_r)
        return r


class WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(serializers.ModelSerializer):
    discipline_block_module = DisciplineBlockModuleForWPinFSSerializer(read_only=True)
    zuns_for_wp = WorkProgramInFieldOfStudySerializerForCb(many=True, read_only=True)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = ['id', 'code', 'credit_units', 'change_type', 'discipline_block_module', 'zuns_for_wp',
                  'semester_start', 'semester_duration']


class WorkProgramInFieldOfStudySerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    # prerequisites = serializers.StringRelatedField(many=True)
    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(source='prerequisitesofworkprogram_set',
                                                                      many=True)
    # outcomes = serializers.StringRelatedField(many=True)
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(source='outcomesofworkprogram_set', many=True)
    # discipline_sections = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    # discipline_sections = DisciplineSectionSerializer(many = True)
    # discipline_certification = CertificationSerializer(many = True)
    # bibliographic_reference = BibliographicReferenceSerializer(many = True, required=False)
    work_program_in_change_block = WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(many=True,
                                                                                               read_only=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'approval_date', 'authors', 'discipline_code', 'qualification', 'prerequisites',
                  'outcomes', 'hoursFirstSemester', 'hoursSecondSemester', 'description', 'video',
                  'work_program_in_change_block']


# class ShortExpertiseSerializer(serializers.ModelSerializer):
#     """
#     Короткий вывод информации об экспертизе
#     """
#
#     class Meta:
#         model = Expertise
#         fields = ['expertise_status']


class WorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    # prerequisites = serializers.StringRelatedField(many=True)
    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(source='prerequisitesofworkprogram_set',
                                                                      many=True)
    # outcomes = serializers.StringRelatedField(many=True)
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(source='outcomesofworkprogram_set', many=True)
    # discipline_sections = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    discipline_sections = DisciplineSectionSerializer(many=True)
    discipline_certification = CertificationSerializer(many=True)
    bibliographic_reference = BibliographicReferenceSerializer(many=True, required=False)
    work_program_in_change_block = WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(many=True)
    expertise_with_rpd = ShortExpertiseSerializer(many=True, read_only=True)
    certification_evaluation_tools = СertificationEvaluationToolForWorkProgramSerializer(many=True)
    editors = userProfileSerializer(many=True)
    structural_unit = ShortStructuralUnitSerializer()
    work_program_in_change_block_v2 = serializers.SerializerMethodField()

    class Meta:
        model = WorkProgram
        fields = ['id', 'approval_date', 'authors', 'discipline_code', 'qualification', 'prerequisites', 'outcomes',
                  'title', 'hoursFirstSemester', 'hoursSecondSemester', 'discipline_sections',
                  'discipline_certification',
                  'bibliographic_reference', 'description', 'video', 'work_program_in_change_block',
                  'expertise_with_rpd',
                  'work_status', 'certification_evaluation_tools', 'hours', 'extra_points', 'editors', 'language',
                  'structural_unit', 'have_course_project', 'have_diff_pass', 'have_pass', 'have_exam', 'lecture_hours',
                  'practice_hours', 'lab_hours', 'srs_hours', 'bars', 'lecture_hours_v2',
                  'practice_hours_v2', 'lab_hours_v2', 'srs_hours_v2', 'contact_hours_v2', 'number_of_semesters',
                  'read_notifications',
                  'implementation_format', "ze_v_sem", 'consultation_v2', 'moodle_link',
                  'work_program_in_change_block_v2']

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return WorkProgram.objects.create(**validated_data)

    def get_work_program_in_change_block_v2(self, instance):
        serializers = DisciplineBlockModuleForWPinFSSerializer(DisciplineBlockModule.objects.filter
                                                               (change_blocks_of_work_programs_in_modules__work_program=instance)
                                                               , many=True)
        return serializers.data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["can_send_to_isu"] = bool(self.context['request'].user.groups.filter(name="expertise_master"))
        return data


class WorkProgramSerializerByName(serializers.ModelSerializer):
    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code']


class AcademicPlanSerializerForList(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'year', 'education_form', 'qualification']


class AcademicPlanShortSerializer(serializers.ModelSerializer):
    # discipline_blocks_in_academic_plan = DisciplineBlockSerializer(many=True, requirлинed=False)
    can_edit = BooleanField(read_only=True)
    academic_plan_in_field_of_study = ImplementationAcademicPlanShortForAPSerializer(many=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["can_edit"] = self.context['request'].user.id == instance.author or bool(
            self.context['request'].user.groups.filter(name="academic_plan_developer"))
        return data

    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'year', 'education_form', 'qualification',
                  'author', "can_edit", 'academic_plan_in_field_of_study']
        extra_kwargs = {
            'discipline_blocks_in_academic_plan': {'required': False}
        }


class ImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    academic_plan = AcademicPlanInImplementationSerializer()
    field_of_study = FieldOfStudyImplementationSerializer(many=True)
    # academic_plan = AcademicPlanSerializer()
    structural_unit = ShortStructuralUnitSerializer()
    university_partner = ShortUniversityPartnerSerializer(many=True)
    editors = userProfileSerializer(many=True)

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id', 'academic_plan', 'year', 'qualification', 'title', 'field_of_study', 'year',
                  'plan_type', 'training_period', 'structural_unit', 'total_intensity', 'military_department',
                  'university_partner', 'editors']


class FieldOfStudyListSerializer(serializers.ModelSerializer):
    """
        Сериализатор образовательных программ (направлений)
    """
    implementation_academic_plan_in_field_of_study = ImplementationAcademicPlanSerializer(many=True)

    class Meta:
        model = FieldOfStudy
        fields = ['id', 'title', 'number', 'qualification', 'educational_profile', 'faculty',
                  'implementation_academic_plan_in_field_of_study']


class WorkProgramChangeInDisciplineBlockModuleForCompetencesSerializer(serializers.ModelSerializer):
    discipline_block_module = DisciplineBlockModuleForWPinFSSerializer(read_only=True)

    # zuns_for_wp = WorkProgramInFieldOfStudySerializerForCb(many=True, read_only=True)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = ['id', 'code', 'credit_units', 'change_type', 'discipline_block_module',
                  'semester_start', 'semester_duration']


class WorkProgramInFieldOfStudyForCompeteceListSerializer(serializers.ModelSerializer):
    """Сериализатор Зунов"""
    work_program_change_in_discipline_block_module = WorkProgramChangeInDisciplineBlockModuleForCompetencesSerializer()

    class Meta:
        model = WorkProgramInFieldOfStudy
        fields = ['id', 'work_program_change_in_discipline_block_module', 'zun_in_wp']


class WorkProgramInFieldOfStudyShortSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    work_program_in_change_block = WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(many=True,
                                                                                               read_only=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'approval_date', 'authors', 'discipline_code', 'work_program_in_change_block']
