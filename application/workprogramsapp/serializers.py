from rest_framework import serializers, viewsets

from .models import WorkProgram, Indicator, Competence, OutcomesOfWorkProgram, DisciplineSection, Topic, EvaluationTool, PrerequisitesOfWorkProgram, Certification, OnlineCourse, BibliographicReference

from dataprocessing.serializers import ItemSerializer


class IndicatorSerializer(serializers.ModelSerializer):
    """Сериализатор Индикаторов"""
    class Meta:
        model = Indicator
        fields = ['id','number', 'name', 'competence']


class CompetenceSerializer(serializers.ModelSerializer):
    """Сериализатор Компетенций"""
    class Meta:
        model = Competence
        fields = ['id','number', 'name']


class OutcomesOfWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор работы с результатом обучения"""
    item  = ItemSerializer()
    class Meta:
        model = OutcomesOfWorkProgram
        fields = ['item', 'workprogram', 'masterylevel']


class OutcomesOfWorkProgramCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания результата обучения"""
    class Meta:
        model = OutcomesOfWorkProgram
        fields = ['item', 'workprogram', 'masterylevel']


class OutcomesOfWorkProgramInWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор вывода результата обучения для вывода результата в рабочей программе"""
    item_name  = serializers.ReadOnlyField(source='item.name')
    item_id  = serializers.ReadOnlyField(source='item.id')
    class Meta:
        model = OutcomesOfWorkProgram
        fields = ['item_id', 'item_name', 'masterylevel']


class PrerequisitesOfWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""
    item  = ItemSerializer()
    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ['item', 'workprogram', 'masterylevel']


class PrerequisitesOfWorkProgramInWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор вывода пререквизита обучения для вывода пререквизита в рабочей программе"""
    item_name  = serializers.ReadOnlyField(source='item.name')
    item_id  = serializers.ReadOnlyField(source='item.id')
    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ['item_id', 'item_name', 'masterylevel']


class OnlineCourseSerializer(serializers.ModelSerializer):
    """Сериализатор онлайн курсов"""

    class Meta:
        model = OnlineCourse
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    """Сериализатор Тем"""
    url_online_course = OnlineCourseSerializer(required=False)
    class Meta:
        model = Topic
        fields = ['id', 'discipline_section', 'number', 'description', 'url_online_course']


class TopicCreateSerializer(serializers.ModelSerializer):
    """Сериализатор Тем"""
    class Meta:
        model = Topic
        fields = ['id', 'discipline_section', 'number', 'description', 'url_online_course']


class EvaluationToolSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов"""
    class Meta:
        model = EvaluationTool
        fields = "__all__"


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
    topics = TopicSerializer(many = True)
    evaluation_tools = EvaluationToolSerializer(many = True)
    class Meta:
        model = DisciplineSection
        fields = ['id', 'ordinal_number', 'name', 'topics', 'evaluation_tools', 'contact_work', 'lecture_classes', 'laboratory', 'practical_lessons', 'SRO', 'total_hours']


class CertificationSerializer(serializers.ModelSerializer):
    """Сериализатор аттестации"""

    class Meta:
        model = Certification
        fields = "__all__"


class WorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    #prerequisites = serializers.StringRelatedField(many=True)
    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(source='prerequisitesofworkprogram_set', many=True)
    # outcomes = serializers.StringRelatedField(many=True)
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(source='outcomesofworkprogram_set', many=True)
    #discipline_sections = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    discipline_sections = DisciplineSectionSerializer(many = True)
    discipline_certification = CertificationSerializer(many = True)
    bibliographic_reference = BibliographicReferenceSerializer(many = True)


    class Meta:
        model = WorkProgram
        fields = ['discipline_code', 'qualification', 'prerequisites', 'outcomes', 'title', 'hoursFirstSemester', 'hoursSecondSemester', 'discipline_sections','discipline_certification', 'bibliographic_reference']

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return WorkProgram.objects.create(**validated_data)

class WorkProgramCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания рабочих программ"""

    class Meta:
        model = WorkProgram
        fields = ['discipline_code', 'qualification', 'title', 'hoursFirstSemester', 'hoursSecondSemester', 'bibliographic_reference']









