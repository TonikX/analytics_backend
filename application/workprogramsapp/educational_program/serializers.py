# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from workprogramsapp.models import ProfessionalStandard, GeneralizedLaborFunctions, KindsOfActivity, \
    EmployerRepresentative

# --Работа с образовательной программой
from rest_framework.fields import BooleanField, SerializerMethodField

from workprogramsapp.models import EducationalProgram, GeneralCharacteristics, Department, \
    ProfessionalStandard

# Другие сериализаторы
from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.serializers import ImplementationAcademicPlanSerializer
from .educational_standart.serializers import TasksForProfStandardSerializer, \
    EducationalStandardSingleObjectSerializer
from .general_prof_competencies.models import GroupOfGeneralProfCompetencesInEducationalStandard
from .key_competences.models import GroupOfKeyCompetencesInEducationalStandard
from .over_professional_competencies.models import GroupOfOverProfCompetencesInEducationalStandard
from .pk_comptencies.models import GroupOfPkCompetencesInGeneralCharacteristic
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


class EmployerSerializer(serializers.ModelSerializer):
    """Сериализатор Представителей работодателей"""

    class Meta:
        model = EmployerRepresentative
        fields = "__all__"

class GeneralCharacteristicsSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""

    group_of_general_prof_competences = SerializerMethodField(required=False)
    group_of_key_competences = SerializerMethodField()
    group_of_over_prof_competences = SerializerMethodField()
    # group_of_pk_competences = GroupOfPkCompetencesInGeneralCharacteristicSerializer(many=True, required=False)
    group_of_pk_competences_prof = SerializerMethodField()
    group_of_pk_competences_foresight = SerializerMethodField()
    group_of_pk_competences_minor = SerializerMethodField()

    ep_supervisor = userProfileSerializer(required=False)
    dean_of_the_faculty = userProfileSerializer(required=False)

    def get_group_of_pk_competences_prof(self, instance):
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer(
            instance=GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(general_characteristic=instance,
            competence_in_group_of_pk_competences__type_of_pk_competence="prof"), many=True).data

    def get_group_of_pk_competences_foresight(self, instance):
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer(
            instance=GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(general_characteristic=instance,
            competence_in_group_of_pk_competences__type_of_pk_competence="fore"), many=True).data

    def get_group_of_pk_competences_minor(self, instance):
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer(
            instance=GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(general_characteristic=instance,
            competence_in_group_of_pk_competences__type_of_pk_competence="min"), many=True).data

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
        self.fields['tasks_for_prof_standards'] = TasksForProfStandardSerializer(many=True, required=False)
        self.fields['structural_unit_implementer'] = ShortStructuralUnitSerializer(many=False, required=False)
        self.fields['area_of_activity'] = ProfessionalStandardSerializer(many=True)
        self.fields['kinds_of_activity'] = KindsOfActivitySerializer(many=True)
        self.fields['educational_program'] = ImplementationAcademicPlanSerializer(many=True)
        self.fields['educational_standard'] = EducationalStandardSingleObjectSerializer()
        self.fields['employers_in_characteristic'] = EmployerSerializer(many=True)
        return super().to_representation(value)

    class Meta:
        model = GeneralCharacteristics
        fields = ['id', 'area_of_activity', 'educational_program',
                  'group_of_over_prof_competences', 'group_of_key_competences', 'group_of_general_prof_competences',
                  'objects_of_activity', 'kinds_of_activity', 'tasks_of_activity', 'annotation',

                  'educational_standard', 'tasks_for_prof_standards', 'language', 'is_only_in_university',
                  'is_global_educational_program', 'is_online_format', 'collaboration_russian_in_online_format',
                  'is_collaboration_foreign', 'collaboration_foreign', 'realization_format',
                  'structural_unit_implementer',
                  'group_of_pk_competences_prof', 'group_of_pk_competences_foresight', 'group_of_pk_competences_minor',
                  'employers_in_characteristic', 'ep_supervisor', 'directors_position', 'dean_of_the_faculty',
                  'cluster_name']


class DepartmentSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы"""
    dean = userProfileSerializer()

    class Meta:
        model = Department
        fields = "__all__"
