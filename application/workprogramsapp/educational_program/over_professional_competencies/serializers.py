from rest_framework.response import Response
from rest_framework import response, status

# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from .models import OverProfCompetencesInGroupOfGeneralCharacteristic, GroupOfOverProfCompetencesInGeneralCharacteristic, IndicatorInOverProfCompetenceInGeneralCharacteristic
from workprogramsapp.models import Indicator

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
    competence_in_group_of_pk = serializers.IntegerField(min_value=1, write_only=True)
    indicator = serializers.ListField(
        child=serializers.IntegerField(min_value=1, write_only=True), write_only=True
    )

    def create(self, validated_data):
        competence = OverProfCompetencesInGroupOfGeneralCharacteristic.objects.get(pk = validated_data.pop('competence_in_group_of_pk'))
        indicators = validated_data.pop('indicator')

        for ind in indicators:
            try:
                IndicatorInOverProfCompetenceInGeneralCharacteristic. \
                    objects.create(competence_in_group_of_pk =
                                                   OverProfCompetencesInGroupOfGeneralCharacteristic.objects.get
                                   (pk = competence.id), indicator = Indicator.objects.get(pk = ind))
            except:
                raise serializers.ValidationError({"error":"indicator not found"})
        return Response(status=status.HTTP_201_CREATED)


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

