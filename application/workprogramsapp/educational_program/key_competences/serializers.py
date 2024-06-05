from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from workprogramsapp.educational_program.key_competences.models import (
    GroupOfKeyCompetencesInEducationalStandard,
    IndicatorInKeyCompetenceInGeneralCharacteristic,
    KeyCompetencesInGroupOfGeneralCharacteristic,
)
from workprogramsapp.models import Indicator
from workprogramsapp.serializers import (
    CompetenceSerializer,
    IndicatorListWithoutCompetenceSerializer,
)


class IndicatorInKeyCompetenceInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Индикатор компетенции в общей характеристике."""

    indicator = IndicatorListWithoutCompetenceSerializer()

    class Meta:
        model = IndicatorInKeyCompetenceInGeneralCharacteristic
        fields = ["id", "indicator"]


class CreateIndicatorInKeyCompetenceInGeneralCharacteristicSerializer(
    serializers.Serializer
):
    """Индикатор компетенции в общей характеристике."""

    competence_in_group_of_pk = serializers.IntegerField(min_value=1, write_only=True)
    indicator = serializers.ListField(
        child=serializers.IntegerField(min_value=1, write_only=True), write_only=True
    )

    def create(self, validated_data):
        competence = KeyCompetencesInGroupOfGeneralCharacteristic.objects.get(
            pk=validated_data.pop("competence_in_group_of_pk")
        )
        indicators = validated_data.pop("indicator")

        for ind in indicators:
            try:
                IndicatorInKeyCompetenceInGeneralCharacteristic.objects.create(
                    competence_in_group_of_pk=KeyCompetencesInGroupOfGeneralCharacteristic.objects.get(
                        pk=competence.id
                    ),
                    indicator=Indicator.objects.get(pk=ind),
                )
            except Exception:
                raise serializers.ValidationError({"error": "indicator not found"})
        return Response(status=status.HTTP_201_CREATED)


class KeyCompetencesInGroupOfGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор просмотра ключевых компетенций."""

    indicator_of_competence_in_group_of_key_competences = (
        IndicatorInKeyCompetenceInGeneralCharacteristicSerializer(many=True)
    )
    competence = CompetenceSerializer()

    class Meta:
        model = KeyCompetencesInGroupOfGeneralCharacteristic
        fields = [
            "id",
            "indicator_of_competence_in_group_of_key_competences",
            "competence",
        ]


class CreateKeyCompetencesInGroupOfGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и изменения ключевых компетенций."""

    def create(self, validated_data):
        pk = KeyCompetencesInGroupOfGeneralCharacteristic.objects.create(
            **validated_data
        )
        for indicator in Indicator.objects.filter(competence=pk.competence):
            IndicatorInKeyCompetenceInGeneralCharacteristic.objects.create(
                competence_in_group_of_pk=pk, indicator=indicator
            )
        return pk

    class Meta:
        model = KeyCompetencesInGroupOfGeneralCharacteristic
        fields = "__all__"


class GroupOfKeyCompetencesInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор вывода группы ключевых компетенций в общей характеристике
    образовательной программы."""

    competence_in_group_of_key_competences = (
        KeyCompetencesInGroupOfGeneralCharacteristicSerializer(many=True)
    )

    class Meta:
        model = GroupOfKeyCompetencesInEducationalStandard
        fields = ["id", "name", "competence_in_group_of_key_competences"]


class CreateGroupOfKeyCompetencesInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и редактирования группы ключевых компетенций в
    общей характеристике образовательной программы."""

    class Meta:
        model = GroupOfKeyCompetencesInEducationalStandard
        fields = ["id", "name", "educational_standard"]
