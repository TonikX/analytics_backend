from rest_framework.response import Response
from rest_framework import response, status

# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from .models import PkCompetencesInGroupOfGeneralCharacteristic, \
    GroupOfPkCompetencesInGeneralCharacteristic, IndicatorInPkCompetenceInGeneralCharacteristic
from workprogramsapp.models import ProfessionalStandard
from workprogramsapp.models import Indicator

# Другие сериализаторы
from workprogramsapp.serializers import CompetenceSerializer, ImplementationAcademicPlanSerializer, \
    CompetenceForEPSerializer, IndicatorListSerializer, \
    IndicatorListWithoutCompetenceSerializer

"""
Вспомогательные
"""

class ShortProfessionalStandardSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""


    class Meta:
        model = ProfessionalStandard
        fields = ['title', 'code']


"""
Профессиональные компетенции
"""

class IndicatorInPkCompetenceInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """
    Индикатор компетенции в общей характеристике
    """

    indicator = IndicatorListWithoutCompetenceSerializer()

    class Meta:
        model = IndicatorInPkCompetenceInGeneralCharacteristic
        fields = "__all__"


class CreateIndicatorInPkCompetenceInGeneralCharacteristicSerializer(serializers.Serializer):
    """
    Индикатор компетенции в общей характеристике
    """
    competence_in_group_of_pk = serializers.IntegerField(min_value=1, write_only=True)
    indicator = serializers.ListField(
        child=serializers.IntegerField(min_value=1, write_only=True), write_only=True
    )

    def create(self, validated_data):
        competence = PkCompetencesInGroupOfGeneralCharacteristic.objects.get(pk = validated_data.pop('competence_in_group_of_pk'))
        indicators = validated_data.pop('indicator')

        for ind in indicators:
            try:
                IndicatorInPkCompetenceInGeneralCharacteristic. \
                    objects.create(competence_in_group_of_pk =
                                                   PkCompetencesInGroupOfGeneralCharacteristic.objects.get
                                   (pk = competence.id), indicator = Indicator.objects.get(pk = ind))
            except:
                raise serializers.ValidationError({"error":"indicator not found"})
        return Response(status=status.HTTP_201_CREATED)


class PkCompetencesInGroupOfGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор просмотра профессиональных компетенций"""
    indicator_of_competence_in_group_of_pk_competences = IndicatorInPkCompetenceInGeneralCharacteristicSerializer(many=True)
    competence = CompetenceSerializer()
    professional_standard = ShortProfessionalStandardSerializer()

    class Meta:
        model = PkCompetencesInGroupOfGeneralCharacteristic
        fields = ['id', 'indicator_of_competence_in_group_of_pk_competences', 'competence', 'professional_standard', 'labor_functions']


class CreatePkCompetencesInGroupOfGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор создания и изменения профессиональных компетенций"""

    class Meta:
        model = PkCompetencesInGroupOfGeneralCharacteristic
        fields = "__all__"


class GroupOfPkCompetencesInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    competence_in_group_of_pk_competences = PkCompetencesInGroupOfGeneralCharacteristicSerializer(many=True)

    class Meta:
        model = GroupOfPkCompetencesInGeneralCharacteristic
        fields = ['id','name', 'competence_in_group_of_pk_competences']


class CreateGroupOfPkCompetencesInGeneralCharacteristicSerializer(serializers.ModelSerializer):
    """Сериализатор создания и редактирования группы профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    class Meta:
        model = GroupOfPkCompetencesInGeneralCharacteristic
        fields = ['id','name', 'general_characteristic']

