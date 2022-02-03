# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from workprogramsapp.models import ProfessionalStandard, GeneralizedLaborFunctions, KindsOfActivity

# --Работа с образовательной программой
from rest_framework.fields import BooleanField, SerializerMethodField

from workprogramsapp.models import EducationalProgram, GeneralCharacteristics, Department, \
    ProfessionalStandard

# Другие сериализаторы
from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.serializers import CompetenceSerializer, ImplementationAcademicPlanSerializer, \
    CompetenceForEPSerializer, IndicatorListSerializer
from .educational_standart.serializers import EducationalStandardListSerializer, TasksForProfStandardSerializer, \
    EducationalStandardSingleObjectSerializer
from .general_prof_competencies.models import GroupOfGeneralProfCompetencesInEducationalStandard
from .key_competences.models import GroupOfKeyCompetencesInEducationalStandard
from .over_professional_competencies.models import GroupOfOverProfCompetencesInEducationalStandard
from .pk_comptencies.serializers import GroupOfPkCompetencesInGeneralCharacteristicSerializer
from .general_prof_competencies.serializers import GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
from .over_professional_competencies.serializers import GroupOfOverProfCompetencesInGeneralCharacteristicSerializer
from .key_competences.serializers import GroupOfKeyCompetencesInGeneralCharacteristicSerializer
from ..workprogram_additions.serializers import ShortStructuralUnitSerializer


class EducationalProgramSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""
    manager = userProfileSerializer()
    academic_plan_for_ep = ImplementationAcademicPlanSerializer()
    can_edit = BooleanField(read_only=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            data["can_edit"] = self.context['request'].user == instance.manager or bool(
                self.context['request'].user.groups.filter(name="education_plan_developer"))
        except KeyError:
            data["can_edit"] = False
        return data

    class Meta:
        model = EducationalProgram
        fields = "__all__"


class EducationalProgramUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""

    class Meta:
        model = EducationalProgram
        fields = "__all__"


class EducationalCreateProgramSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""

    class Meta:
        model = EducationalProgram
        fields = ['qualification', 'manager', 'year_of_recruitment', 'academic_plan_for_ep']


class GeneralLaborFunctionsSerializer(serializers.ModelSerializer):
    """Сериализатор обобщенных трудовых функций"""

    class Meta:
        model = GeneralizedLaborFunctions
        fields = "__all__"


class KindsOfActivitySerializer(serializers.ModelSerializer):
    """Сериализатор сфер проф. деятельности"""

    class Meta:
        model = KindsOfActivity
        fields = "__all__"


class ProfessionalStandardSerializer(serializers.ModelSerializer):
    """Сериализатор Проф. стандартов"""

    def to_representation(self, value):
        self.fields['generalized_labor_functions'] = GeneralLaborFunctionsSerializer(many=True, required=False)
        return super().to_representation(value)

    class Meta:
        model = ProfessionalStandard
        fields = "__all__"


class GeneralCharacteristicsSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""

    educational_program = EducationalProgramSerializer()
    group_of_general_prof_competences = SerializerMethodField()
    group_of_key_competences = SerializerMethodField()
    group_of_over_prof_competences = SerializerMethodField()
    group_of_pk_competences = GroupOfPkCompetencesInGeneralCharacteristicSerializer(many=True)
    developers = userProfileSerializer(many=True)
    employers_representatives = userProfileSerializer(many=True)
    director_of_megafaculty = userProfileSerializer()
    dean_of_the_faculty = userProfileSerializer()
    scientific_supervisor_of_the_educational_program = userProfileSerializer()

    #########################################################
    educational_standard = EducationalStandardSingleObjectSerializer()

    def get_group_of_general_prof_competences(self, instance):
        try:
            return GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer(
                instance=GroupOfGeneralProfCompetencesInEducationalStandard.objects.filter(
                    educational_standard=instance.educational_standard), many=True).data
        except GroupOfGeneralProfCompetencesInEducationalStandard.DoesNotExist:
            return None

    def get_group_of_key_competences(self, instance):
        try:
            return GroupOfKeyCompetencesInGeneralCharacteristicSerializer(
                instance=GroupOfKeyCompetencesInEducationalStandard.objects.filter(
                    educational_standard=instance.educational_standard), many=True).data
        except GroupOfGeneralProfCompetencesInEducationalStandard.DoesNotExist:
            return None

    def get_group_of_over_prof_competences(self, instance):
        try:
            return GroupOfOverProfCompetencesInGeneralCharacteristicSerializer(
                instance=GroupOfOverProfCompetencesInEducationalStandard.objects.filter(
                    educational_standard=instance.educational_standard), many=True).data
        except GroupOfGeneralProfCompetencesInEducationalStandard.DoesNotExist:
            return None

    def to_representation(self, value):
        self.fields['tasks_for_prof_standards'] = \
            TasksForProfStandardSerializer(many=True, required=False)
        self.fields['structural_unit_implementer'] = \
            ShortStructuralUnitSerializer(many=False, required=False)
        self.fields['area_of_activity'] = ProfessionalStandardSerializer(many=True)
        self.fields['kinds_of_activity'] = KindsOfActivitySerializer(many=True)
        return super().to_representation(value)

    class Meta:
        model = GeneralCharacteristics
        fields = ['id', 'area_of_activity', 'educational_program', 'group_of_pk_competences',
                  'group_of_over_prof_competences', 'group_of_key_competences', 'group_of_general_prof_competences',
                  'developers', 'employers_representatives', 'director_of_megafaculty', 'dean_of_the_faculty',
                  'scientific_supervisor_of_the_educational_program',
                  'objects_of_activity', 'kinds_of_activity', 'tasks_of_activity', 'type_of_activity', 'annotation',

                  'educational_standard', 'tasks_for_prof_standards', 'language', 'is_only_in_university',
                  'is_global_educational_program', 'is_online_format', 'collaboration_russian_in_online_format',
                  'is_collaboration_foreign', 'collaboration_foreign', 'realization_format',
                  'structural_unit_implementer']


class DepartmentSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""
    dean = userProfileSerializer()

    class Meta:
        model = Department
        fields = "__all__"
