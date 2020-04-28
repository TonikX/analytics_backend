from rest_framework import serializers, viewsets

from .models import WorkProgram, Indicator, Competence, CompetenceIndicator, \
    EvaluationTool, DisciplineSection, Topic


class WorkProgramSerializer(serializers.ModelSerializer):
    prerequisites = serializers.StringRelatedField(many=True)
    outcomes = serializers.StringRelatedField(many=True)

    class Meta:
        model = WorkProgram
        fields = ['id',  'title', 'prerequisites', 'outcomes']

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

class EvaluationToolSerializer(serializers.ModelSerializer):
    """Сериализатор ФОСов"""
    class Meta:
        model = EvaluationTool
        fields = "__all__"

class TopicSerializer(serializers.ModelSerializer):
    """Сериализатор Тем"""
    class Meta:
        model = Topic
        fields = ('id', 'number', 'description', 'discipline_section')

class SectionSerializer(serializers.ModelSerializer):
    """Сериализатор Разделов"""
    class Meta:
        model = DisciplineSection
        fields = "__all__"