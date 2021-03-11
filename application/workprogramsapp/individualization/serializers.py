# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных

from .models import IndividualImplementationAcademicPlan, WorkProgramInWorkProgramChangeInDisciplineBlockModule
from workprogramsapp.models import ImplementationAcademicPlan

# Сериализаторы

from workprogramsapp.serializers import AcademicPlanSerializer, FieldOfStudyImplementationSerializer, AcademicPlanInImplementationSerializer, AcademicPlanForRepresentationSerializer
from dataprocessing.serializers import userProfileSerializer


class ImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    academic_plan = AcademicPlanSerializer()
    field_of_study = FieldOfStudyImplementationSerializer()
    #user = userProfileSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id','academic_plan', 'field_of_study', 'year']


class ShortImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    academic_plan = AcademicPlanInImplementationSerializer()
    field_of_study = FieldOfStudyImplementationSerializer()
    #user = userProfileSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id','academic_plan', 'field_of_study', 'year']


class WorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    class Meta:
        model = WorkProgramInWorkProgramChangeInDisciplineBlockModule
        fields = "__all__"


class CreateWorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer(serializers.ModelSerializer):
    """Сериализатор создания и редактирования группы профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    class Meta:
        model = WorkProgramInWorkProgramChangeInDisciplineBlockModule
        fields = "__all__"


class IndividualImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    implementation_of_academic_plan = ImplementationAcademicPlanSerializer()
    user = userProfileSerializer()


    class Meta:
        model = IndividualImplementationAcademicPlan
        fields = "__all__"


class ShortIndividualImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    """Сериализатор вывода группы профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    implementation_of_academic_plan = ShortImplementationAcademicPlanSerializer()
    user = userProfileSerializer()

    class Meta:
        model = IndividualImplementationAcademicPlan
        fields = "__all__"


class CreateIndividualImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    """Сериализатор создания и редактирования группы профессиональных куомпетенций в общей характеристике образовтаельной программы"""

    class Meta:
        model = IndividualImplementationAcademicPlan
        fields = "__all__"
