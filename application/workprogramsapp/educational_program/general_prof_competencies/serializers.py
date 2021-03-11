# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from .models import GeneralProfCompetencesInGroupOfGeneralCharacteristic, GroupOfGeneralProfCompetencesInGeneralCharacteristic, IndicatorInGeneralProfCompetenceInGeneralCharacteristic

# Другие сериализаторы
from workprogramsapp.serializers import CompetenceSerializer, ImplementationAcademicPlanSerializer, CompetenceForEPSerializer, IndicatorListSerializer, IndicatorListWithoutCompetenceSerializer


"""
Ключевые компетенции
"""

class IndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """
    Индикатор компетенции в общей характеристике
    """

    indicator = IndicatorListWithoutCompetenceSerializer()

    class Meta:
        model = IndicatorInGeneralProfCompetenceInGeneralCharacteristic
        fields = ['id', 'indicator']


class CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """
    Индикатор компетенции в общей характеристике
    """

    class Meta:
        model = IndicatorInGeneralProfCompetenceInGeneralCharacteristic
        fields = "__all__"


class GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор просмотра общепрофессиональных компетенций"""
    indicator_of_competence_in_group_of_general_prof_competences = IndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer(many=True)
    competence = CompetenceSerializer()

    class Meta:
        model = GeneralProfCompetencesInGroupOfGeneralCharacteristic
        fields = ['id', 'indicator_of_competence_in_group_of_general_prof_competences', 'competence']


class CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор создания и изменения общепрофессиональных компетенций"""

    class Meta:
        model = GeneralProfCompetencesInGroupOfGeneralCharacteristic
        fields = "__all__"


class GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы общепрофессиональных куомпетенций в общей характеристике образовтаельной программы"""

    competence_in_group_of_general_prof_competences = GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer(many=True)

    class Meta:
        model = GroupOfGeneralProfCompetencesInGeneralCharacteristic
        fields = ['id', 'name', 'competence_in_group_of_general_prof_competences']


class CreateGroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор создания и редактирования группы общепрофессиональных куомпетенций в общей характеристике образовтаельной программы"""

    class Meta:
        model = GroupOfGeneralProfCompetencesInGeneralCharacteristic
        fields = ['id', 'name', 'general_characteristic']

