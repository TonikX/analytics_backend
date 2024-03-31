from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.individualization.models import (
    DisciplineBlockModuleInDisciplineBlock,
    ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule,
    IndividualImplementationAcademicPlan,
    WorkProgramInWorkProgramChangeInDisciplineBlockModule,
)
from workprogramsapp.models import ImplementationAcademicPlan
from workprogramsapp.serializers import (
    AcademicPlanInImplementationSerializer,
    AcademicPlanSerializer,
    FieldOfStudyImplementationSerializer,
)


class ImplementationAcademicPlanSerializerIndividual(serializers.ModelSerializer):
    academic_plan = AcademicPlanSerializer()
    field_of_study = FieldOfStudyImplementationSerializer(many=True)
    # user = userProfileSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ["id", "academic_plan", "field_of_study", "year"]


class ShortImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    academic_plan = AcademicPlanInImplementationSerializer()
    field_of_study = FieldOfStudyImplementationSerializer()
    # user = userProfileSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ["id", "academic_plan", "field_of_study", "year"]


class WorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer(
    serializers.ModelSerializer
):
    """Сериализатор вывода группы профессиональных компетенций."""

    class Meta:
        model = WorkProgramInWorkProgramChangeInDisciplineBlockModule
        fields = "__all__"


class CreateWorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer(
    serializers.ModelSerializer
):
    """Сериализатор создания и редактирования группы профессиональных компетенций."""

    class Meta:
        model = WorkProgramInWorkProgramChangeInDisciplineBlockModule
        fields = "__all__"


class IndividualImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы профессиональных компетенций."""

    implementation_of_academic_plan = ImplementationAcademicPlanSerializerIndividual()
    user = userProfileSerializer()

    class Meta:
        model = IndividualImplementationAcademicPlan
        fields = "__all__"


class ShortIndividualImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы профессиональных компетенций."""

    implementation_of_academic_plan = ImplementationAcademicPlanSerializerIndividual()
    user = userProfileSerializer()

    class Meta:
        model = IndividualImplementationAcademicPlan
        fields = "__all__"


class CreateIndividualImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    """Сериализатор создания и редактирования группы профессиональных компетенций."""

    class Meta:
        model = IndividualImplementationAcademicPlan
        fields = "__all__"


class DisciplineBlockModuleInDisciplineBlockSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с выбором модуля в блоке учебного плана."""

    class Meta:
        model = DisciplineBlockModuleInDisciplineBlock
        fields = "__all__"


class ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule
        fields = "__all__"
