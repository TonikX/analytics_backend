from rest_framework import serializers, viewsets

from .models import WorkProgram, Indicator, Competence, CompetenceIndicator


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
        fields = ['number', 'name']

class CompetenceSerializer(serializers.ModelSerializer):
    """Сериализатор Компетенций"""
    class Meta:
        model = Competence
        fields = ['number', 'name']

class CompetenceIndicatorSerializer(serializers.ModelSerializer):
    indicators = IndicatorSerializer(many=True)
    class Meta:
        model = Competence
        fields = ['number','name', 'indicators']