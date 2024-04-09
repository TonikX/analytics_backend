from typing import Union

from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.fields import BooleanField, SerializerMethodField

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.educational_program.educational_standart.serializers import (
    TasksForEducationalStandardSerializer,
    EducationalStandardSingleObjectSerializer,
)
from workprogramsapp.educational_program.general_prof_competencies.models import (
    GroupOfGeneralProfCompetencesInEducationalStandard,
)
from workprogramsapp.educational_program.general_prof_competencies.serializers import (
    GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer,
)
from workprogramsapp.educational_program.key_competences.models import (
    GroupOfKeyCompetencesInEducationalStandard,
)
from workprogramsapp.educational_program.key_competences.serializers import (
    GroupOfKeyCompetencesInGeneralCharacteristicSerializer,
)
from workprogramsapp.educational_program.over_professional_competencies.models import (
    GroupOfOverProfCompetencesInEducationalStandard,
)
from workprogramsapp.educational_program.over_professional_competencies.serializers import (
    GroupOfOverProfCompetencesInGeneralCharacteristicSerializer,
)
from workprogramsapp.educational_program.pk_comptencies.models import (
    GroupOfPkCompetencesInGeneralCharacteristic,
)
from workprogramsapp.educational_program.pk_comptencies.serializers import (
    GroupOfPkCompetencesInGeneralCharacteristicSerializer,
)
from workprogramsapp.models import (
    Competence,
    EmployerRepresentative,
    GeneralizedLaborFunctions,
    Indicator,
    KindsOfActivity,
    ObjectsOfActivity,
    WorkProgram,
    WorkProgramInFieldOfStudy,
    Zun,
)
from workprogramsapp.models import (
    CompetenceComments,
    Department,
    EducationalProgram,
    GeneralCharacteristics,
    ImplementationAcademicPlan,
    ProfessionalStandard,
)
from workprogramsapp.serializers import (
    AcademicPlanInImplementationSerializer,
    FieldOfStudyImplementationSerializer,
    ImplementationAcademicPlanSerializer,
    IndicatorSerializer,
    WorkProgramInFieldOfStudySerializerForCb,
)
from workprogramsapp.workprogram_additions.serializers import (
    ShortStructuralUnitSerializer,
)


class EducationalProgramSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы."""

    manager = userProfileSerializer()
    academic_plan_for_ep = ImplementationAcademicPlanSerializer()
    can_edit = BooleanField(read_only=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            data["can_edit"] = self.context["request"].user == instance.manager or bool(
                self.context["request"].user.groups.filter(
                    name="education_plan_developer"
                )
            )
        except KeyError:
            data["can_edit"] = False
        return data

    class Meta:
        model = EducationalProgram
        fields = "__all__"


class EducationalProgramUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы."""

    class Meta:
        model = EducationalProgram
        fields = "__all__"


class EducationalCreateProgramSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы."""

    class Meta:
        model = EducationalProgram
        fields = [
            "qualification",
            "manager",
            "year_of_recruitment",
            "academic_plan_for_ep",
        ]


class GeneralLaborFunctionsSerializer(serializers.ModelSerializer):
    """Сериализатор обобщенных трудовых функций."""

    class Meta:
        model = GeneralizedLaborFunctions
        fields = ["id", "code", "name", "qualification_level", "professional_standard"]


class KindsOfActivitySerializerForEd(serializers.ModelSerializer):
    """Сериализатор сфер проф. деятельности."""

    class Meta:
        model = KindsOfActivity
        fields = "__all__"


class ObjectsOfActivitySerializer(serializers.ModelSerializer):
    """Сериализатор Объектов проф. деятельности."""

    class Meta:
        model = ObjectsOfActivity
        fields = "__all__"


class ProfessionalStandardSerializer(serializers.ModelSerializer):
    """Сериализатор Проф. стандартов."""

    def to_representation(self, value):
        self.fields["generalized_labor_functions"] = GeneralLaborFunctionsSerializer(
            many=True, required=False
        )
        return super().to_representation(value)

    class Meta:
        model = ProfessionalStandard
        fields = "__all__"


class EmployerSerializer(serializers.ModelSerializer):
    """Сериализатор Представителей работодателей."""

    class Meta:
        model = EmployerRepresentative
        fields = "__all__"


class GeneralCharacteristicsSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы."""

    group_of_general_prof_competences = SerializerMethodField(required=False)
    group_of_key_competences = SerializerMethodField()
    group_of_over_prof_competences = SerializerMethodField()

    group_of_pk_competences_prof = SerializerMethodField()
    group_of_pk_competences_foresight = SerializerMethodField()
    group_of_pk_competences_minor = SerializerMethodField()
    group_of_pk_competences_additional_qualification = SerializerMethodField()

    def get_group_of_pk_competences_prof(self, instance) -> dict:
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer(
            instance=GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(
                general_characteristic=instance, type_of_pk_competence="prof"
            ),
            many=True,
        ).data

    def get_group_of_pk_competences_foresight(self, instance) -> dict:
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer(
            instance=GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(
                general_characteristic=instance, type_of_pk_competence="fore"
            ),
            many=True,
        ).data

    def get_group_of_pk_competences_minor(self, instance) -> dict:
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer(
            instance=GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(
                general_characteristic=instance, type_of_pk_competence="min"
            ),
            many=True,
        ).data

    def get_group_of_pk_competences_additional_qualification(self, instance) -> dict:
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer(
            instance=GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(
                general_characteristic=instance, type_of_pk_competence="add_qual"
            ),
            many=True,
        ).data

    def get_group_of_general_prof_competences(self, instance) -> Union[dict, None]:
        try:
            return GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer(
                instance=GroupOfGeneralProfCompetencesInEducationalStandard.objects.filter(
                    educational_standard=instance.educational_standard
                ),
                many=True,
            ).data
        except GroupOfGeneralProfCompetencesInEducationalStandard.DoesNotExist:
            return None

    def get_group_of_key_competences(self, instance) -> Union[dict, None]:
        try:
            return GroupOfKeyCompetencesInGeneralCharacteristicSerializer(
                instance=GroupOfKeyCompetencesInEducationalStandard.objects.filter(
                    educational_standard=instance.educational_standard
                ),
                many=True,
            ).data
        except GroupOfGeneralProfCompetencesInEducationalStandard.DoesNotExist:
            return None

    def get_group_of_over_prof_competences(self, instance) -> Union[dict, None]:
        try:
            return GroupOfOverProfCompetencesInGeneralCharacteristicSerializer(
                instance=GroupOfOverProfCompetencesInEducationalStandard.objects.filter(
                    educational_standard=instance.educational_standard
                ),
                many=True,
            ).data
        except GroupOfGeneralProfCompetencesInEducationalStandard.DoesNotExist:
            return None

    def to_representation(self, instance):
        self.fields["tasks_for_prof_standards"] = TasksForEducationalStandardSerializer(
            many=True, required=False
        )
        self.fields["structural_unit_implementer"] = ShortStructuralUnitSerializer(
            many=False, required=False
        )
        self.fields["area_of_activity"] = ProfessionalStandardSerializer(many=True)
        self.fields["additional_area_of_activity"] = ProfessionalStandardSerializer(
            many=True
        )
        self.fields["kinds_of_activity"] = KindsOfActivitySerializerForEd(many=True)
        self.fields["objects_of_activity"] = ObjectsOfActivitySerializer(many=True)
        self.fields["educational_program"] = ImplementationAcademicPlanSerializer(
            many=True
        )
        self.fields["educational_standard"] = (
            EducationalStandardSingleObjectSerializer()
        )
        self.fields["employers_in_characteristic"] = EmployerSerializer(
            many=True, required=False
        )
        self.fields["ep_supervisor"] = userProfileSerializer(required=False)
        self.fields["dean_of_the_faculty"] = userProfileSerializer(required=False)

        data = super().to_representation(instance)

        editors = []
        if instance.on_check == "on_check" or instance.on_check == "verified":
            data["can_edit"] = False
        else:
            for ep in instance.educational_program.all():
                for editor in ep.editors.all():
                    editors.append(editor)
                    group = Group.objects.get(name="education_plan_developer")
                    editor.groups.add(group)
            data["can_edit"] = bool(self.context["request"].user in editors)

        return data

    class Meta:
        model = GeneralCharacteristics
        fields = [
            "id",
            "area_of_activity",
            "additional_area_of_activity",
            "educational_program",
            "group_of_over_prof_competences",
            "group_of_key_competences",
            "group_of_general_prof_competences",
            "objects_of_activity",
            "kinds_of_activity",
            "tasks_of_activity",
            "annotation",
            "educational_standard",
            "tasks_for_prof_standards",
            "language",
            "is_only_in_university",
            "is_global_educational_program",
            "is_online_format",
            "collaboration_russian_in_online_format",
            "is_collaboration_foreign",
            "collaboration_foreign",
            "realization_format",
            "structural_unit_implementer",
            "group_of_pk_competences_prof",
            "group_of_pk_competences_foresight",
            "group_of_pk_competences_minor",
            "group_of_pk_competences_additional_qualification",
            "employers_in_characteristic",
            "ep_supervisor",
            "directors_position",
            "dean_of_the_faculty",
            "cluster_name",
            "science_type",
            "industrial_type",
            "corporate_type",
            "enterprise_type",
            "target_master_type",
            "dean_of_the_faculty_directors_position",
            "on_check",
        ]
        extra_kwargs = {"employers_in_characteristic": {"required": False}}


class WorkProgramCompetenceIndicatorSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы."""

    competences = SerializerMethodField()

    def get_competences(self, instance) -> dict:
        competences = Competence.objects.filter(
            indicator_in_competencse__zun__wp_in_fs__work_program=instance
        ).distinct()
        competences_dict = []
        for competence in competences:
            zuns = Zun.objects.filter(
                wp_in_fs__work_program=instance,
                indicator_in_zun__competence__id=competence.id,
            )
            zuns_array = []
            for zun in zuns:
                try:
                    indicator = Indicator.objects.get(
                        competence=competence.id, zun__id=zun.id
                    )
                    indicator = IndicatorSerializer(indicator).data
                except:
                    indicator = None

                zuns_array.append(
                    {
                        "id": zun.id,
                        "knowledge": zun.knowledge,
                        "skills": zun.skills,
                        "attainments": zun.attainments,
                        "indicator": indicator,
                        "wp_in_fs": WorkProgramInFieldOfStudySerializerForCb(
                            WorkProgramInFieldOfStudy.objects.get(zun_in_wp=zun.id)
                        ).data["id"],
                    }
                )
            competences_dict.append(
                {
                    "id": competence.id,
                    "name": competence.name,
                    "number": competence.number,
                    "zuns": zuns_array,
                }
            )
        return {"competences": competences_dict}

    class Meta:
        model = WorkProgram
        fields = ["id", "title", "competences"]


class DepartmentSerializer(serializers.ModelSerializer):
    """Сериализатор образовательной программы."""

    dean = userProfileSerializer()

    class Meta:
        model = Department
        fields = "__all__"


class ImplementationAcademicPlanShortSerializer(serializers.ModelSerializer):
    academic_plan = AcademicPlanInImplementationSerializer()
    field_of_study = FieldOfStudyImplementationSerializer(many=True)

    class Meta:
        model = ImplementationAcademicPlan
        fields = [
            "id",
            "title",
            "qualification",
            "academic_plan",
            "field_of_study",
            "year",
        ]


class CompetenceCommentSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        self.fields["user"] = userProfileSerializer(many=False, read_only=True)
        return super().to_representation(value)

    class Meta:
        model = CompetenceComments
        fields = "__all__"


class CompetenceSerializerForIndicator(serializers.ModelSerializer):
    """Сериализатор Компетенций"""

    class Meta:
        model = Competence
        fields = ["id", "number", "name"]


class IndicatorForUnfilledSerializer(serializers.ModelSerializer):

    class Meta:
        model = Indicator
        fields = ["id", "number", "name"]
