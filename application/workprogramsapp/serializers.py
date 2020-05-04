from rest_framework import serializers, viewsets

from .models import WorkProgram, Indicator, Competence, CompetenceIndicator, OutcomesOfWorkProgram, DisciplineSection, Topic, EvaluationTool, PrerequisitesOfWorkProgram, Certification

from dataprocessing.serializers import ItemSerializer


class IndicatorSerializer(serializers.ModelSerializer):
    """Сериализатор Индикаторов"""
    class Meta:
        model = Indicator
        fields = ['id','number', 'name']


class CompetenceSerializer(serializers.ModelSerializer):
    """Сериализатор Компетенций"""
    class Meta:
        model = Competence
        fields = ['id','number', 'name']


class CompetenceIndicatorSerializer(serializers.ModelSerializer):
    """Сериализатор компетенции вмести с индикаторами"""
    indicators = IndicatorSerializer(many=True)
    class Meta:
        model = Competence
        fields = ['id','number','name', 'indicators']


class OutcomesOfWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор создания результата обучения"""
    item  = ItemSerializer()
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


class TopicSerializer(serializers.ModelSerializer):
    """Сериализатор Тем"""
    class Meta:
        model = Topic
        fields = ['number', 'description', 'online_course']


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


class DisciplineSectionSerializer(serializers.ModelSerializer):
    """Сериализатор Разделов"""
    topics = TopicSerializer(many = True)
    evaluation_tools = EvaluationToolSerializer(many = True)
    class Meta:
        model = DisciplineSection
        fields = ['id', 'name', 'topics', 'evaluation_tools', 'contact_work', 'lecture_classes', 'laboratory', 'practical_lessons', 'SRO', 'total_hours']


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


    class Meta:
        model = WorkProgram
        fields = ['discipline_code', 'qualification', 'prerequisites', 'outcomes', 'title', 'hoursFirstSemester', 'hoursSecondSemester', 'discipline_sections','discipline_certification']



