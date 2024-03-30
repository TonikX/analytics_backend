from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from workprogramsapp.educational_program.over_professional_competencies.models import (
    OverProfCompetencesInGroupOfGeneralCharacteristic,
    GroupOfOverProfCompetencesInEducationalStandard,
    IndicatorInOverProfCompetenceInGeneralCharacteristic,
)
from workprogramsapp.models import Indicator
from workprogramsapp.serializers import (
    CompetenceSerializer,
    IndicatorListWithoutCompetenceSerializer,
)


class IndicatorInOverProfCompetenceInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Индикатор компетенции в общей характеристике."""

    indicator = IndicatorListWithoutCompetenceSerializer()

    class Meta:
        model = IndicatorInOverProfCompetenceInGeneralCharacteristic
        fields = ["id", "indicator"]


class CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer(
    serializers.Serializer
):
    """Индикатор компетенции в общей характеристике."""

    competence_in_group_of_pk = serializers.IntegerField(min_value=1, write_only=True)
    indicator = serializers.ListField(
        child=serializers.IntegerField(min_value=1, write_only=True), write_only=True
    )

    def create(self, validated_data):
        competence = OverProfCompetencesInGroupOfGeneralCharacteristic.objects.get(
            pk=validated_data.pop("competence_in_group_of_pk")
        )
        indicators = validated_data.pop("indicator")

        for ind in indicators:
            try:
                IndicatorInOverProfCompetenceInGeneralCharacteristic.objects.create(
                    competence_in_group_of_pk=OverProfCompetencesInGroupOfGeneralCharacteristic.objects.get(
                        pk=competence.id
                    ),
                    indicator=Indicator.objects.get(pk=ind),
                )
            except:
                raise serializers.ValidationError({"error": "indicator not found"})
        return Response(status=status.HTTP_201_CREATED)


class OverProfCompetencesInGroupOfGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор просмотра над-профессиональных компетенций."""

    indicator_of_competence_in_group_of_over_prof_competences = (
        IndicatorInOverProfCompetenceInGeneralCharacteristicSerializer(many=True)
    )
    competence = CompetenceSerializer()

    class Meta:
        model = OverProfCompetencesInGroupOfGeneralCharacteristic
        fields = [
            "id",
            "indicator_of_competence_in_group_of_over_prof_competences",
            "competence",
        ]


class CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и изменения над-профессиональных компетенций."""

    def create(self, validated_data):
        pk = OverProfCompetencesInGroupOfGeneralCharacteristic.objects.create(
            **validated_data
        )
        for indicator in Indicator.objects.filter(competence=pk.competence):
            IndicatorInOverProfCompetenceInGeneralCharacteristic.objects.create(
                competence_in_group_of_pk=pk, indicator=indicator
            )
        return pk

    class Meta:
        model = OverProfCompetencesInGroupOfGeneralCharacteristic
        fields = "__all__"


class GroupOfOverProfCompetencesInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор вывода группы над-профессиональных компетенций
    в общей характеристике образовательной программы."""

    competence_in_group_of_over_prof_competences = (
        OverProfCompetencesInGroupOfGeneralCharacteristicSerializer(many=True)
    )

    class Meta:
        model = GroupOfOverProfCompetencesInEducationalStandard
        fields = ["id", "name", "competence_in_group_of_over_prof_competences"]


class CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и редактирования группы над-профессиональных компетенций
    в общей характеристике образовательной программы."""

    class Meta:
        model = GroupOfOverProfCompetencesInEducationalStandard
        fields = ["id", "name", "educational_standard"]
