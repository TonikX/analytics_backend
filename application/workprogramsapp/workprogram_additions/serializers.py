# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from .models import AdditionalMaterial, StructuralUnit, UserStructuralUnit
from workprogramsapp.models import Indicator, Competence

# Другие сериализаторы
from dataprocessing.serializers import userProfileSerializer
from ..models import WorkProgramInFieldOfStudy, WorkProgram

"""
Материалы тем
"""


class AdditionalMaterialSerializer(serializers.ModelSerializer):
    """
    Дополнительный материал в теме РПД
    """

    class Meta:
        model = AdditionalMaterial
        fields = "__all__"


class CreateAdditionalMaterialSerializer(serializers.ModelSerializer):
    """
    Дополнительный материал в теме РПД
    """

    class Meta:
        model = AdditionalMaterial
        fields = "__all__"


class CreateStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор создания подразделения разработчика РПД
    """

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class UserStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор работника в подразделении
    """
    user = userProfileSerializer()

    user = userProfileSerializer()

    class Meta:
        model = UserStructuralUnit
        fields = "__all__"


class CreateUserStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор создания работника в подразделении
    """

    class Meta:
        model = UserStructuralUnit
        fields = "__all__"


class StructuralUnitSerializer(serializers.ModelSerializer):
    user_in_structural_unit = UserStructuralUnitSerializer(many = True)
    """
    Cериализатор подразделения разработчика РПД
    """

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class ShortStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор подразделения разработчика РПД
    """

    class Meta:
        model = UserStructuralUnit
        fields = "__all__"


class StructuralUnitSerializer(serializers.ModelSerializer):
    user_in_structural_unit = UserStructuralUnitSerializer(many=True)

    class Meta:
        model = StructuralUnit
        fields = "__all__"


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


class CompetenceFullSerializer(serializers.ModelSerializer):
    """Сериализатор Компетенций"""
    indicator_in_competencse = IndicatorSerializer(many = True)

    class Meta:
        model = Competence
        fields = ['id','number', 'name', 'indicator_in_competencse']


class IndicatorListSerializer(serializers.ModelSerializer):
    competence = CompetenceSerializer()

    class Meta:
        model = Indicator
        fields = ['id','number', 'name', 'competence']

