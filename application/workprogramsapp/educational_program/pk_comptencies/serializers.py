from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from workprogramsapp.educational_program.pk_comptencies.models import (
    GroupOfPkCompetencesInGeneralCharacteristic,
    IndicatorInPkCompetenceInGeneralCharacteristic,
    PkCompetencesInGroupOfGeneralCharacteristic,
)
from workprogramsapp.models import (
    GeneralizedLaborFunctions,
    KindsOfActivity,
    ProfessionalStandard,
)
from workprogramsapp.models import Indicator
from workprogramsapp.serializers import (
    CompetenceSerializer,
    IndicatorListWithoutCompetenceSerializer,
)


class GeneralLaborFunctionsSerializerPk(serializers.ModelSerializer):
    """Сериализатор обобщенных трудовых функций."""

    class Meta:
        model = GeneralizedLaborFunctions
        fields = "__all__"


class KindsOfActivitySerializer(serializers.ModelSerializer):
    """Сериализатор сфер проф.

    деятельности.
    """

    class Meta:
        model = KindsOfActivity
        fields = "__all__"


class ShortProfessionalStandardSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы."""

    class Meta:
        model = ProfessionalStandard
        fields = ["title", "code"]


class IndicatorInPkCompetenceInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Индикатор компетенции в общей характеристике."""

    indicator = IndicatorListWithoutCompetenceSerializer()

    class Meta:
        model = IndicatorInPkCompetenceInGeneralCharacteristic
        fields = "__all__"


class CreateIndicatorInPkCompetenceInGeneralCharacteristicSerializer(
    serializers.Serializer
):
    """Индикатор компетенции в общей характеристике."""

    competence_in_group_of_pk = serializers.IntegerField(min_value=1, write_only=True)
    indicator = serializers.ListField(
        child=serializers.IntegerField(min_value=1, write_only=True), write_only=True
    )

    def create(self, validated_data):
        competence = PkCompetencesInGroupOfGeneralCharacteristic.objects.get(
            pk=validated_data.pop("competence_in_group_of_pk")
        )
        indicators = validated_data.pop("indicator")

        for ind in indicators:
            try:
                IndicatorInPkCompetenceInGeneralCharacteristic.objects.create(
                    competence_in_group_of_pk=PkCompetencesInGroupOfGeneralCharacteristic.objects.get(
                        pk=competence.id
                    ),
                    indicator=Indicator.objects.get(pk=ind),
                )
            except Exception:
                raise serializers.ValidationError({"error": "indicator not found"})
        return Response(status=status.HTTP_201_CREATED)


class PkCompetencesInGroupOfGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор просмотра профессиональных компетенций."""

    indicator_of_competence_in_group_of_pk_competences = (
        IndicatorInPkCompetenceInGeneralCharacteristicSerializer(many=True)
    )
    competence = CompetenceSerializer()
    professional_standard = ShortProfessionalStandardSerializer()
    generalized_labor_functions = GeneralLaborFunctionsSerializerPk(many=True)
    kinds_of_activity = KindsOfActivitySerializer()

    class Meta:
        model = PkCompetencesInGroupOfGeneralCharacteristic
        fields = [
            "id",
            "indicator_of_competence_in_group_of_pk_competences",
            "competence",
            "professional_standard",
            "generalized_labor_functions",
            "kinds_of_activity",
            "kinds_of_activity_for_miner",
        ]


class CreatePkCompetencesInGroupOfGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и изменения профессиональных компетенций."""

    def create(self, validated_data):
        pk = PkCompetencesInGroupOfGeneralCharacteristic.objects.create(
            **validated_data
        )
        for indicator in Indicator.objects.filter(competence=pk.competence):
            IndicatorInPkCompetenceInGeneralCharacteristic.objects.create(
                competence_in_group_of_pk=pk, indicator=indicator
            )
        return pk

    class Meta:
        model = PkCompetencesInGroupOfGeneralCharacteristic
        fields = "__all__"


class GroupOfPkCompetencesInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор вывода группы профессиональных компетенций в общей
    характеристике образовательной программы."""

    competence_in_group_of_pk_competences = (
        PkCompetencesInGroupOfGeneralCharacteristicSerializer(many=True)
    )

    class Meta:
        model = GroupOfPkCompetencesInGeneralCharacteristic
        fields = [
            "id",
            "name",
            "competence_in_group_of_pk_competences",
            "type_of_pk_competence",
        ]


class CreateGroupOfPkCompetencesInGeneralCharacteristicSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и редактирования группы профессиональных
    компетенций в общей характеристике образовательной программы."""

    class Meta:
        model = GroupOfPkCompetencesInGeneralCharacteristic
        fields = ["id", "name", "general_characteristic", "type_of_pk_competence"]
