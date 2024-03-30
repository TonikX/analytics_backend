from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from workprogramsapp.educational_program.general_prof_competencies.models import (
    GeneralProfCompetencesInGroupOfGeneralCharacteristic,
    GroupOfGeneralProfCompetencesInEducationalStandard,
    IndicatorInGeneralProfCompetenceInGeneralCharacteristic,
)
from workprogramsapp.models import Indicator
from workprogramsapp.serializers import (
    CompetenceSerializer,
    IndicatorListWithoutCompetenceSerializer,
)


class IndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Индикатор компетенции в общей характеристике."""

    indicator = IndicatorListWithoutCompetenceSerializer()

    class Meta:
        model = IndicatorInGeneralProfCompetenceInGeneralCharacteristic
        fields = ["id", "indicator"]


class CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer(
    serializers.Serializer
):
    """Индикатор компетенции в общей характеристике."""

    competence_in_group_of_pk = serializers.IntegerField(min_value=1, write_only=True)
    indicator = serializers.ListField(
        child=serializers.IntegerField(min_value=1, write_only=True), write_only=True
    )

    def create(self, validated_data):
        competence = GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.get(
            pk=validated_data.pop("competence_in_group_of_pk")
        )
        indicators = validated_data.pop("indicator")

        for ind in indicators:
            try:
                IndicatorInGeneralProfCompetenceInGeneralCharacteristic.objects.create(
                    competence_in_group_of_pk=GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.get(
                        pk=competence.id
                    ),
                    indicator=Indicator.objects.get(pk=ind),
                )
            except:
                raise serializers.ValidationError({"error": "indicator not found"})
        return Response(status=status.HTTP_201_CREATED)


class GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор просмотра общепрофессиональных компетенций."""

    indicator_of_competence_in_group_of_general_prof_competences = (
        IndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer(many=True)
    )
    competence = CompetenceSerializer()

    class Meta:
        model = GeneralProfCompetencesInGroupOfGeneralCharacteristic
        fields = [
            "id",
            "indicator_of_competence_in_group_of_general_prof_competences",
            "competence",
        ]


class CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и изменения общепрофессиональных компетенций."""

    def create(self, validated_data):
        pk = GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.create(
            **validated_data
        )
        for indicator in Indicator.objects.filter(competence=pk.competence):
            IndicatorInGeneralProfCompetenceInGeneralCharacteristic.objects.create(
                competence_in_group_of_pk=pk, indicator=indicator
            )
        return pk

    class Meta:
        model = GeneralProfCompetencesInGroupOfGeneralCharacteristic
        fields = "__all__"


class GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор вывода группы общепрофессиональных компетенций
    в общей характеристике образовательной программы."""

    competence_in_group_of_general_prof_competences = (
        GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer(many=True)
    )

    class Meta:
        model = GroupOfGeneralProfCompetencesInEducationalStandard
        fields = ["id", "name", "competence_in_group_of_general_prof_competences"]


class CreateGroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и редактирования группы общепрофессиональных компетенций
    в общей характеристике образовательной программы."""

    class Meta:
        model = GroupOfGeneralProfCompetencesInEducationalStandard
        fields = ["id", "name", "educational_standard"]
