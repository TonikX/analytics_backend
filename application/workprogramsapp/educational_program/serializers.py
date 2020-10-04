# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных

# --Работа с образовательной программой
from workprogramsapp.models import EducationalProgram, GeneralCharacteristics, Department

# Другие сериализаторы
from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.serializers import CompetenceSerializer, ImplementationAcademicPlanSerializer


class EducationalProgramSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""
    manager = userProfileSerializer()
    academic_plan_for_ep = ImplementationAcademicPlanSerializer()


    class Meta:
        model = EducationalProgram
        fields = "__all__"


class GeneralCharacteristicsSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""
    educational_program = EducationalProgramSerializer()
    ok_competences = CompetenceSerializer(many = True)
    opk_competences = CompetenceSerializer(many = True)
    pk_competences = CompetenceSerializer(many = True)
    psk_competences = CompetenceSerializer(many = True)
    developers = userProfileSerializer(many = True)
    employers_representatives = userProfileSerializer(many = True)
    director_of_megafaculty = userProfileSerializer()
    dean_of_the_faculty = userProfileSerializer()
    scientific_supervisor_of_the_educational_program = userProfileSerializer()


    class Meta:
        model = GeneralCharacteristics
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""
    dean = userProfileSerializer()

    class Meta:
        model = Department
        fields = "__all__"
