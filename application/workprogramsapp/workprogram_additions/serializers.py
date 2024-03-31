from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer, ItemSerializer
from workprogramsapp.models import (
    Competence,
    Indicator,
    OutcomesOfWorkProgram,
    PrerequisitesOfWorkProgram,
)
from workprogramsapp.models import WorkProgram
from workprogramsapp.workprogram_additions.models import (
    AdditionalMaterial,
    StructuralUnit,
    UniversityPartner,
    UserStructuralUnit,
)


class AdditionalMaterialSerializer(serializers.ModelSerializer):
    """Просмотр дополнительного материал в теме РПД."""

    class Meta:
        model = AdditionalMaterial
        fields = "__all__"


class CreateAdditionalMaterialSerializer(serializers.ModelSerializer):
    """Создание дополнительного материала в теме РПД."""

    class Meta:
        model = AdditionalMaterial
        fields = "__all__"


class CreateStructuralUnitSerializer(serializers.ModelSerializer):
    """Сериализатор создания подразделения разработчика РПД."""

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class UserStructuralUnitSerializer(serializers.ModelSerializer):
    """Сериализатор работника в подразделении."""

    user = userProfileSerializer()

    class Meta:
        model = UserStructuralUnit
        fields = "__all__"


class CreateUserStructuralUnitSerializer(serializers.ModelSerializer):
    """Сериализатор создания работника в подразделении."""

    class Meta:
        model = UserStructuralUnit
        fields = "__all__"


class StructuralUnitSerializer(serializers.ModelSerializer):
    """Сериализатор подразделения разработчика РПД"""

    user_in_structural_unit = UserStructuralUnitSerializer(many=True)

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class ShortStructuralUnitSerializer(serializers.ModelSerializer):
    """Сериализатор подразделения разработчика РПД."""

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class ShortUniversityPartnerSerializer(serializers.ModelSerializer):
    """Сериализатор университета-партнера"""

    class Meta:
        model = UniversityPartner
        fields = "__all__"


class IndicatorSerializerAdd(serializers.ModelSerializer):
    """Сериализатор индикаторов."""

    class Meta:
        model = Indicator
        fields = ["id", "number", "name", "competence"]


class CompetenceSerializer(serializers.ModelSerializer):
    """Сериализатор компетенций."""

    class Meta:
        model = Competence
        fields = ["id", "number", "name"]


class CompetenceFullSerializer(serializers.ModelSerializer):
    """Сериализатор компетенций."""

    indicator_in_competencse = IndicatorSerializerAdd(many=True)

    class Meta:
        model = Competence
        fields = ["id", "number", "name", "indicator_in_competencse"]


class IndicatorListSerializer(serializers.ModelSerializer):
    competence = CompetenceSerializer()

    class Meta:
        model = Indicator
        fields = ["id", "number", "name", "competence"]


class OutcomesOfWorkProgramInWorkProgramSerializerAdd(serializers.ModelSerializer):
    """Сериализатор вывода результата обучения для вывода результата в рабочей программе."""

    # item_name  = serializers.ReadOnlyField(source='item.name')
    # item_id  = serializers.ReadOnlyField(source='item.id')
    item = ItemSerializer()

    class Meta:
        model = OutcomesOfWorkProgram
        fields = ["item", "masterylevel"]
        extra_kwargs = {"evaluation_tool": {"required": False}}


class PrerequisitesOfWorkProgramSerializerAdd(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения."""

    item = ItemSerializer()

    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ["item", "masterylevel"]


class WorkProgramItemsPrerequisitesSerializer(serializers.ModelSerializer):
    prerequisites = PrerequisitesOfWorkProgramSerializerAdd(
        source="prerequisitesofworkprogram_set", many=True
    )
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializerAdd(
        source="outcomesofworkprogram_set", many=True
    )

    class Meta:
        model = WorkProgram
        fields = ["id", "title", "discipline_code", "prerequisites", "outcomes"]
