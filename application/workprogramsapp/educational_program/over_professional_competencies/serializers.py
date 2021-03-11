# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from .models import OverProfCompetencesInGroupOfGeneralCharacteristic, GroupOfOverProfCompetencesInGeneralCharacteristic, IndicatorInOverProfCompetenceInGeneralCharacteristic

# Другие сериализаторы
from workprogramsapp.serializers import CompetenceSerializer, ImplementationAcademicPlanSerializer, CompetenceForEPSerializer, IndicatorListSerializer, IndicatorListWithoutCompetenceSerializer


"""
Ключевые компетенции
"""

class IndicatorInOverProfCompetenceInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """
    Индикатор компетенции в общей характеристике
    """

    indicator = IndicatorListWithoutCompetenceSerializer()

    class Meta:
        model = IndicatorInOverProfCompetenceInGeneralCharacteristic
        fields = ['id', 'indicator']


class CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """
    Индикатор компетенции в общей характеристике
    """

    class Meta:
        model = IndicatorInOverProfCompetenceInGeneralCharacteristic
        fields = "__all__"



class OverProfCompetencesInGroupOfGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор просмотра над-профессиональных компетенций"""
    indicator_of_competence_in_group_of_over_prof_competences = IndicatorInOverProfCompetenceInGeneralCharacteristicSerializer(many=True)
    competence = CompetenceSerializer()

    class Meta:
        model = OverProfCompetencesInGroupOfGeneralCharacteristic
        fields = ['id', 'indicator_of_competence_in_group_of_over_prof_competences', 'competence']


class CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор создания и изменения над-профессиональных компетенций"""

    class Meta:
        model = OverProfCompetencesInGroupOfGeneralCharacteristic
        fields = "__all__"


class GroupOfOverProfCompetencesInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы над-профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    competence_in_group_of_over_prof_competences = OverProfCompetencesInGroupOfGeneralCharacteristicSerializer(many=True)

    class Meta:
        model = GroupOfOverProfCompetencesInGeneralCharacteristic
        fields = ['id','name', 'competence_in_group_of_over_prof_competences']


class CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор создания и редактирования группы над-профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    class Meta:
        model = GroupOfOverProfCompetencesInGeneralCharacteristic
        fields = ['id','name', 'general_characteristic']

