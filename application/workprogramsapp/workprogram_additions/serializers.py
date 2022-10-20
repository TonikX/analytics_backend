# Библиотеки для сариализации
from rest_framework import serializers

# Другие сериализаторы
from dataprocessing.serializers import userProfileSerializer, ItemSerializer
from workprogramsapp.models import Indicator, Competence, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram
# Модели данных
from .models import AdditionalMaterial, StructuralUnit, UserStructuralUnit
from ..models import WorkProgram

"""
Материалы тем
"""


class AdditionalMaterialSerializer(serializers.ModelSerializer):
    """
    Дополнительный материал в теме РПД
    """

    class Meta:
        model = AdditionalMaterial
        fields = "__all__"


class CreateAdditionalMaterialSerializer(serializers.ModelSerializer):
    """
    Дополнительный материал в теме РПД
    """

    class Meta:
        model = AdditionalMaterial
        fields = "__all__"


class CreateStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор создания подразделения разработчика РПД
    """

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class UserStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор работника в подразделении
    """
    user = userProfileSerializer()

    class Meta:
        model = UserStructuralUnit
        fields = "__all__"


class CreateUserStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор создания работника в подразделении
    """

    class Meta:
        model = UserStructuralUnit
        fields = "__all__"


class StructuralUnitSerializer(serializers.ModelSerializer):
    user_in_structural_unit = UserStructuralUnitSerializer(many=True)
    """
    Cериализатор подразделения разработчика РПД
    """

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class ShortStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор подразделения разработчика РПД
    """

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class IndicatorSerializerAdd(serializers.ModelSerializer):
    """Сериализатор Индикаторов"""

    class Meta:
        model = Indicator
        fields = ['id', 'number', 'name', 'competence']


class CompetenceSerializer(serializers.ModelSerializer):
    """Сериализатор Компетенций"""

    class Meta:
        model = Competence
        fields = ['id', 'number', 'name']


class CompetenceFullSerializer(serializers.ModelSerializer):
    """Сериализатор Компетенций"""
    indicator_in_competencse = IndicatorSerializerAdd(many=True)

    class Meta:
        model = Competence
        fields = ['id', 'number', 'name', 'indicator_in_competencse']


class IndicatorListSerializer(serializers.ModelSerializer):
    competence = CompetenceSerializer()

    class Meta:
        model = Indicator
        fields = ['id', 'number', 'name', 'competence']


class OutcomesOfWorkProgramInWorkProgramSerializerAdd(serializers.ModelSerializer):
    """Сериализатор вывода результата обучения для вывода результата в рабочей программе"""
    # item_name  = serializers.ReadOnlyField(source='item.name')
    # item_id  = serializers.ReadOnlyField(source='item.id')
    item = ItemSerializer()

    class Meta:
        model = OutcomesOfWorkProgram
        fields = ['item', 'masterylevel']
        extra_kwargs = {
            'evaluation_tool': {'required': False}
        }


class PrerequisitesOfWorkProgramSerializerAdd(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""
    item = ItemSerializer()
    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ['item', 'masterylevel']


class WorkProgramItemsPrerequisitesSerializer(serializers.ModelSerializer):
    prerequisites = PrerequisitesOfWorkProgramSerializerAdd(source='prerequisitesofworkprogram_set',
                                                               many=True)
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializerAdd(source='outcomesofworkprogram_set', many=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code', 'prerequisites', 'outcomes']
