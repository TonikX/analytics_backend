# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from .models import KeyCompetencesInGroupOfGeneralCharacteristic, GroupOfKeyCompetencesInGeneralCharacteristic, IndicatorInKeyCompetenceInGeneralCharacteristic

# Другие сериализаторы
from workprogramsapp.serializers import CompetenceSerializer, ImplementationAcademicPlanSerializer, CompetenceForEPSerializer, IndicatorListSerializer, IndicatorListWithoutCompetenceSerializer


"""
Ключевые компетенции
"""

class IndicatorInKeyCompetenceInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """
    Индикатор компетенции в общей характеристике
    """

    indicator = IndicatorListWithoutCompetenceSerializer()

    class Meta:
        model = IndicatorInKeyCompetenceInGeneralCharacteristic
        fields = ['id', 'indicator']


class CreateIndicatorInKeyCompetenceInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """
    Индикатор компетенции в общей характеристике
    """

    class Meta:
        model = IndicatorInKeyCompetenceInGeneralCharacteristic
        fields = "__all__"



class KeyCompetencesInGroupOfGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор просмотра ключевых компетенций"""
    indicator_of_competence_in_group_of_key_competences = IndicatorInKeyCompetenceInGeneralCharacteristicSerializer(many=True)
    competence = CompetenceSerializer()

    class Meta:
        model = KeyCompetencesInGroupOfGeneralCharacteristic
        fields = ['id', 'indicator_of_competence_in_group_of_key_competences', 'competence']

class CreateKeyCompetencesInGroupOfGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор создания и изменения ключевых компетенций"""

    class Meta:
        model = KeyCompetencesInGroupOfGeneralCharacteristic
        fields = "__all__"


class GroupOfKeyCompetencesInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы ключевых куомпетенций в общей характеристике образовтаельной программы"""

    competence_in_group_of_key_competences = KeyCompetencesInGroupOfGeneralCharacteristicSerializer(many=True)

    class Meta:
        model = GroupOfKeyCompetencesInGeneralCharacteristic
        fields = ['id', 'name', 'competence_in_group_of_key_competences']


class CreateGroupOfKeyCompetencesInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор создания и редактирования группы ключевых куомпетенций в общей характеристике образовтаельной программы"""

    class Meta:
        model = GroupOfKeyCompetencesInGeneralCharacteristic
        fields = ['id', 'name']

