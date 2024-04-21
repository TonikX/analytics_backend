from typing import OrderedDict

from django.contrib.auth.models import Group
from django.db.models import Q
from rest_framework import serializers
from rest_framework.fields import BooleanField

from dataprocessing.serializers import ItemSerializer, userProfileSerializer
from gia_practice_app.GIA.models import GIA
from gia_practice_app.Practice.models import Practice
from onlinecourse.serializers import OnlineCourseSerializer
from .disciplineblockmodules.ze_module_logic import (
    recursion_module,
)
from .educational_program.educational_standart.models import EducationalStandard
from .expertise.common_serializers import ShortExpertiseSerializer
from .models import (
    WorkProgram,
    Indicator,
    Competence,
    OutcomesOfWorkProgram,
    DisciplineSection,
    Topic,
    EvaluationTool,
    PrerequisitesOfWorkProgram,
    Certification,
    BibliographicReference,
    FieldOfStudy,
    ImplementationAcademicPlan,
    AcademicPlan,
    DisciplineBlock,
    DisciplineBlockModule,
    WorkProgramChangeInDisciplineBlockModule,
    Zun,
    WorkProgramInFieldOfStudy,
    CertificationEvaluationTool,
    AcademicPlanUpdateLog,
    AcademicPlanUpdateSchedulerConfiguration,
    AcademicPlanUpdateConfiguration,
    IsuObjectsSendLogger,
    BugsLog,
)
from .permissions import IsUniversalModule
from .validators import validate_file_extension
from .workprogram_additions.serializers import (
    AdditionalMaterialSerializer,
    ShortStructuralUnitSerializer,
    ShortUniversityPartnerSerializer,
)


class AcademicPlanUpdateLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateLog
        fields = [
            "id",
            "object_type",
            "field_name",
            "old_value",
            "new_value",
            "updated_date_time",
            "academic_plan_id",
        ]


class AcademicPlanUpdateConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateConfiguration
        fields = [
            "id",
            "academic_plan_id",
            "academic_plan_title",
            "updated_date_time",
            "updates_enabled",
            "over_23",
        ]


class AcademicPlanUpdateConfigurationEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateConfiguration
        fields = ["updates_enabled"]


class AcademicPlanUpdateSchedulerConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateSchedulerConfiguration
        fields = ["days_interval", "execution_hours"]


class IndicatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Indicator
        fields = ["id", "number", "name", "competence"]


class EducationalStandardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalStandard
        fields = ["id", "name", "standard_date"]


class CompetenceWithStandardSerializer(serializers.ModelSerializer):

    educational_standard = serializers.SerializerMethodField()

    def get_educational_standard(self, instance) -> dict:
        key_filter = Q(
            group_of_key_competences__competence_in_group_of_key_competences__competence=instance
        )
        over_filter = Q(
            group_of_over_prof_competences__competence_in_group_of_over_prof_competences__competence=instance
        )
        general_filter = Q(
            group_of_general_prof_competences__competence_in_group_of_general_prof_competences__competence=instance
        )
        return EducationalStandardListSerializer(
            instance=EducationalStandard.objects.filter(
                key_filter | over_filter | general_filter
            ).distinct(),
            many=True,
        ).data

    class Meta:
        model = Competence
        fields = ["id", "number", "name", "educational_standard"]


class CompetenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Competence
        fields = ["id", "number", "name"]


class CompetenceForEPSerializer(serializers.ModelSerializer):

    indicator_in_competencse = IndicatorSerializer(many=True)

    class Meta:
        model = Competence
        fields = ["id", "number", "name", "indicator_in_competencse"]


class IndicatorListSerializer(serializers.ModelSerializer):
    competence = CompetenceSerializer()

    class Meta:
        model = Indicator
        fields = ["id", "number", "name", "competence"]


class IndicatorListWithoutCompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Indicator
        fields = ["id", "number", "name"]


class FieldOfStudyImplementationSerializer(serializers.ModelSerializer):

    class Meta:
        model = FieldOfStudy
        fields = [
            "number",
            "id",
            "title",
            "qualification",
            "educational_profile",
            "faculty",
        ]


class AcademicPlanInImplementationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlan
        fields = ["id", "educational_profile", "number", "approval_date"]


class ImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    academic_plan = AcademicPlanInImplementationSerializer()
    field_of_study = FieldOfStudyImplementationSerializer(many=True)

    class Meta:
        model = ImplementationAcademicPlan
        fields = ["id", "academic_plan", "field_of_study", "year"]


class ImplementationAcademicPlanCreateSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        updated_module = super(ImplementationAcademicPlanCreateSerializer, self).update(
            instance, validated_data
        )
        module_group = Group.objects.get(name="academic_plan_developer")
        for user in updated_module.editors.all():
            if module_group not in user.groups.all():
                user.groups.add(module_group)
                user.save()
        return updated_module

    class Meta:
        model = ImplementationAcademicPlan
        fields = "__all__"


class OutcomesOfWorkProgramSerializer(serializers.ModelSerializer):

    item = ItemSerializer()

    class Meta:
        model = OutcomesOfWorkProgram
        fields = ["id", "item", "workprogram", "masterylevel"]


class OutcomesOfWorkProgramCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = OutcomesOfWorkProgram
        fields = ["item", "workprogram", "masterylevel", "evaluation_tool"]
        extra_kwargs = {"evaluation_tool": {"required": False}}


class EvaluationToolSerializer(serializers.ModelSerializer):

    class Meta:
        model = EvaluationTool
        fields = "__all__"


class EvaluationToolForOutcomsSerializer(serializers.ModelSerializer):

    class Meta:
        model = EvaluationTool
        fields = [
            "id",
            "type",
            "name",
            "max",
            "min",
            "deadline",
            "check_point",
            "description",
            "evaluation_criteria",
        ]


class CertificationEvaluationToolForWorkProgramSerializer(serializers.ModelSerializer):

    class Meta:
        model = CertificationEvaluationTool
        fields = [
            "id",
            "type",
            "name",
            "description",
            "deadline",
            "min",
            "max",
            "semester",
            "evaluation_criteria",
        ]


class CertificationEvaluationToolCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CertificationEvaluationTool
        fields = [
            "id",
            "type",
            "name",
            "description",
            "deadline",
            "semester",
            "min",
            "max",
            "work_program",
            "evaluation_criteria",
            "discipline_block_module",
        ]


class OutcomesOfWorkProgramInWorkProgramSerializer(serializers.ModelSerializer):

    item = ItemSerializer()
    evaluation_tool = EvaluationToolForOutcomsSerializer(many=True)

    class Meta:
        model = OutcomesOfWorkProgram
        fields = ["id", "item", "masterylevel", "evaluation_tool"]
        extra_kwargs = {"evaluation_tool": {"required": False}}


class PrerequisitesOfWorkProgramCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ["item", "workprogram", "masterylevel"]


class PrerequisitesOfWorkProgramSerializer(serializers.ModelSerializer):

    item = ItemSerializer()

    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ["id", "item", "workprogram", "masterylevel"]


class PrerequisitesOfWorkProgramInWorkProgramSerializer(serializers.ModelSerializer):

    item = ItemSerializer()

    class Meta:
        model = PrerequisitesOfWorkProgram
        fields = ["id", "item", "masterylevel"]


class TopicSerializer(serializers.ModelSerializer):

    url_online_course = OnlineCourseSerializer(required=False)
    additional_materials_for_topic = AdditionalMaterialSerializer(many=True)

    class Meta:
        model = Topic
        fields = [
            "id",
            "discipline_section",
            "number",
            "description",
            "url_online_course",
            "additional_materials_for_topic",
        ]


class TopicCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = [
            "id",
            "discipline_section",
            "number",
            "description",
            "url_online_course",
        ]
        extra_kwargs = {"number": {"required": False}}


class SectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = DisciplineSection
        fields = "__all__"


class BibliographicReferenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = BibliographicReference
        fields = "__all__"


class DisciplineSectionSerializer(serializers.ModelSerializer):

    topics = TopicSerializer(many=True)
    evaluation_tools = EvaluationToolSerializer(many=True)

    class Meta:
        model = DisciplineSection
        fields = [
            "id",
            "ordinal_number",
            "name",
            "topics",
            "evaluation_tools",
            "contact_work",
            "lecture_classes",
            "laboratory",
            "practical_lessons",
            "SRO",
            "total_hours",
            "consultations",
        ]


class CertificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Certification
        fields = "__all__"


class WorkProgramForIndividualRoutesSerializer(serializers.ModelSerializer):

    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(
        source="prerequisitesofworkprogram_set", many=True
    )
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(
        source="outcomesofworkprogram_set", many=True
    )

    class Meta:
        model = WorkProgram
        fields = [
            "id",
            "title",
            "discipline_code",
            "qualification",
            "prerequisites",
            "outcomes",
        ]


class WorkProgramCreateSerializer(serializers.ModelSerializer):

    evaluation_tools = serializers.ListField(
        write_only=True,
        required=False,
        child=serializers.ListField(
            write_only=True, required=False, child=serializers.IntegerField()
        ),
    )

    def create(self, validated_data) -> WorkProgram:

        evaluation_tools = validated_data.pop("evaluation_tools", None)
        wp = super(WorkProgramCreateSerializer, self).create(validated_data)
        for i in range(len(evaluation_tools)):
            for tool in evaluation_tools[i]:
                CertificationEvaluationTool.objects.create(
                    type=tool, work_program=wp, semester=i + 1
                )
        return wp

    class Meta:
        model = WorkProgram
        fields = [
            "id",
            "discipline_code",
            "authors",
            "qualification",
            "title",
            "hoursFirstSemester",
            "hoursSecondSemester",
            "bibliographic_reference",
            "description",
            "video",
            "owner",
            "editors",
            "hours",
            "extra_points",
            "language",
            "structural_unit",
            "bars",
            "number_of_semesters",
            "implementation_format",
            "lecture_hours_v2",
            "practice_hours_v2",
            "practice_hours_v2",
            "practice_hours_v2",
            "lab_hours_v2",
            "srs_hours_v2",
            "contact_hours_v2",
            "ze_v_sem",
            "evaluation_tools",
            "consultation_v2",
            "moodle_link",
        ]
        extra_kwargs = {"bibliographic_reference": {"required": False}}


class WorkProgramEditorsUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkProgram
        fields = ["editors"]


class WorkProgramArchiveUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkProgram
        fields = ["work_status"]


class BibliographicReferenceForWorkProgramSerializer(serializers.ModelSerializer):

    class Meta:
        model = BibliographicReference
        fields = ["id"]


class Geeks(object):
    def __init__(self, dictionary):
        self.dict = dictionary


class WorkProgramBibliographicReferenceUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkProgram
        fields = ["bibliographic_reference"]


class DisciplineSectionForEvaluationToolsSerializer(serializers.ModelSerializer):

    class Meta:
        model = DisciplineSection
        fields = ["id", "ordinal_number", "name"]


class FieldOfStudySerializer(serializers.ModelSerializer):

    class Meta:
        model = FieldOfStudy
        fields = "__all__"


class EvaluationToolForWorkProgramSerializer(serializers.ModelSerializer):

    descipline_sections = DisciplineSectionForEvaluationToolsSerializer(
        many=True, source="evaluation_tools"
    )

    class Meta:
        model = EvaluationTool
        fields = [
            "id",
            "type",
            "name",
            "description",
            "check_point",
            "deadline",
            "min",
            "max",
            "descipline_sections",
            "semester",
            "evaluation_criteria",
        ]


class EvaluationToolCreateSerializer(serializers.ModelSerializer):

    descipline_sections = serializers.PrimaryKeyRelatedField(
        many=True, source="evaluation_tools", queryset=DisciplineSection.objects.all()
    )

    class Meta:
        model = EvaluationTool
        fields = [
            "type",
            "name",
            "description",
            "check_point",
            "deadline",
            "semester",
            "min",
            "max",
            "descipline_sections",
            "evaluation_criteria",
        ]


class EvaluationToolListSerializer(serializers.ModelSerializer):

    descipline_sections = serializers.PrimaryKeyRelatedField(
        many=True, source="evaluation_tools", queryset=DisciplineSection.objects.all()
    )
    wp_id = serializers.SerializerMethodField()

    def get_wp_id(self, instance) -> int:
        try:
            id_wp = WorkProgram.objects.filter(
                discipline_sections__evaluation_tools=instance
            )[0].id
        except IndexError:
            id_wp = None
        return id_wp

    class Meta:
        model = EvaluationTool
        fields = [
            "id",
            "type",
            "name",
            "description",
            "check_point",
            "deadline",
            "semester",
            "min",
            "max",
            "descipline_sections",
            "evaluation_criteria",
            "wp_id",
        ]


class ZunSerializer(serializers.ModelSerializer):

    indicator_in_zun = IndicatorListSerializer()

    class Meta:
        model = Zun
        fields = ["id", "indicator_in_zun", "items"]


class ZunForManyCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zun
        fields = [
            "id",
            "indicator_in_zun",
            "items",
            "wp_in_fs",
            "knowledge",
            "skills",
            "attainments",
        ]


class ZunForDetailAcademicPlanSerializer(serializers.ModelSerializer):

    indicator_in_zun = IndicatorListSerializer()
    items = OutcomesOfWorkProgramSerializer(many=True)

    class Meta:
        model = Zun
        fields = ["id", "indicator_in_zun", "items"]


class WorkProgramInFieldOfStudySerializerForCb(serializers.ModelSerializer):

    zun_in_wp = ZunForDetailAcademicPlanSerializer(many=True)

    class Meta:
        model = WorkProgramInFieldOfStudy
        fields = ["id", "zun_in_wp"]


class ZunCreateSerializer(serializers.Serializer):

    indicator_in_zun = serializers.PrimaryKeyRelatedField(
        queryset=Indicator.objects.all()
    )
    wp_changeblock = serializers.IntegerField()
    work_program = serializers.IntegerField()

    items = serializers.PrimaryKeyRelatedField(
        allow_null=True,
        required=False,
        queryset=OutcomesOfWorkProgram.objects.all(),
        many=True,
    )


class ZunCreateSaveSerializer(serializers.ModelSerializer):

    def update(self, instance, validated_data):
        instance.indicator_in_zun = validated_data.get(
            "content", instance.indicator_in_zun
        )

        for item in validated_data.get("items"):
            instance.items.add(item)
        return instance

    class Meta:
        model = Zun
        fields = ["id", "indicator_in_zun", "wp_in_fs", "items"]

        extra_kwargs = {"items": {"allow_null": True}}


class WorkProgramInFieldOfStudyCreateSerializer(serializers.ModelSerializer):

    zun_in_wp = ZunCreateSerializer(many=True, read_only=True)

    class Meta:
        model = WorkProgramInFieldOfStudy
        fields = [
            "id",
            "work_program_change_in_discipline_block_module",
            "work_program",
            "zun_in_wp",
        ]


class RecursiveField(serializers.Serializer):
    def to_representation(self, value) -> OrderedDict:
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class WorkProgramForDisciplineBlockSerializer(serializers.ModelSerializer):

    zuns_for_wp = serializers.SerializerMethodField("clarify_zuns_for_wp")

    wp_in_fs_id = serializers.SerializerMethodField("wp_in_fs_id_get")

    def to_representation(self, value) -> OrderedDict:

        self.fields["wp_status"] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_wp_status(self, value) -> str:
        try:
            wp_status = value.expertise_with_rpd.all()[0].expertise_status
        except IndexError:
            wp_status = "WK"
        return wp_status

    class Meta:
        model = WorkProgram
        fields = [
            "id",
            "wp_in_fs_id",
            "approval_date",
            "authors",
            "discipline_code",
            "title",
            "qualification",
            "hoursFirstSemester",
            "hoursSecondSemester",
            "zuns_for_wp",
            "ze_v_sem",
            "number_of_semesters",
        ]

    def clarify_zuns_for_wp(self, obj, *args, **kwargs) -> dict:
        zuns_for_wp_objects = obj.zuns_for_wp.all().filter(
            work_program_change_in_discipline_block_module=self.context.get("parent_cb_id"),
            work_program=obj.id
        )
        serializers = WorkProgramInFieldOfStudySerializerForCb(
            zuns_for_wp_objects,
            many=True
        )
        return serializers.data

    def wp_in_fs_id_get(self, obj, *args, **kwargs) -> int:
        return obj.zuns_for_wp.all().filter(
            work_program_change_in_discipline_block_module=self.context.get("parent_cb_id"),
            work_program=obj.id
        )[0].id


class WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer(
    serializers.ModelSerializer
):

    work_program = serializers.SerializerMethodField("get_id_of_wpcb")

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = [
            "id",
            "code",
            "credit_units",
            "change_type",
            "work_program",
            "semester_start",
            "semester_duration",
        ]

    def get_id_of_wpcb(self, obj) -> dict:
        work_program = WorkProgram.objects.filter(work_program_in_change_block=obj.id)
        serializers = WorkProgramForDisciplineBlockSerializer(
            work_program, many=True, context={"parent_cb_id": obj.id}
        )
        return serializers.data


class WorkProgramChangeInDisciplineBlockModuleSerializer(serializers.ModelSerializer):

    work_program = serializers.SerializerMethodField("get_id_of_wpcb")

    def to_representation(self, value) -> OrderedDict:
        self.fields["gia"] = GIAPrimitiveSerializer(required=False, many=True)
        self.fields["practice"] = PracticePrimitiveSerializer(required=False, many=True)
        self.fields["semester_start"] = serializers.SerializerMethodField()

        return super().to_representation(value)

    def get_semester_start(self, obj) -> list:
        if obj.semester_start:
            return obj.semester_start
        else:
            try:
                ze_list = obj.credit_units.split(",")
                for i, el in enumerate(ze_list):
                    if int(el) != 0:
                        return [i + 1]
            except IndexError:
                return []
            except AttributeError:
                return []

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = [
            "id",
            "code",
            "credit_units",
            "change_type",
            "work_program",
            "discipline_block_module",
            "practice",
            "gia",
            "semester_start",
            "semester_duration",
        ]

    def get_id_of_wpcb(self, obj) -> dict:
        work_program = obj.work_program
        serializers = WorkProgramForDisciplineBlockSerializer(
            work_program,
            many=True,
            context={'parent_cb_id': obj.id}
        )
        return serializers.data


class DisciplineBlockModuleWithoutFatherSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = (
        WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)
    )

    def to_representation(self, value) -> OrderedDict:
        self.fields["childs"] = serializers.SerializerMethodField()
        self.fields["laboriousness"] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_childs(self, obj):
        return DisciplineBlockModuleWithoutFatherSerializer(
            obj.childs.all(), many=True).data
        """.prefetch_related("childs",
        "change_blocks_of_work_programs_in_modules",
        "change_blocks_of_work_programs_in_modules__work_program",
        "change_blocks_of_work_programs_in_modules__work_program__zuns_for_wp",
        "change_blocks_of_work_programs_in_modules__work_program__expertise_wit
        h_rpd", "change_blocks_of_work_programs_in_modules__practice",
        "change_blocks_of_work_programs_in_modules__gia", ),
        many=True).data."""

    def get_laboriousness(self, obj) -> int:
        unit_final_sum = recursion_module(obj)
        return unit_final_sum

    class Meta:
        model = DisciplineBlockModule
        fields = [
            "id",
            "name",
            "type",
            "selection_rule",
            "change_blocks_of_work_programs_in_modules",
            "selection_parametr",
        ]


class DisciplineBlockModuleSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = (
        WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)
    )

    def to_representation(self, value) -> OrderedDict:
        self.fields["childs"] = serializers.SerializerMethodField()
        self.fields["laboriousness"] = serializers.SerializerMethodField()
        self.fields["can_remove"] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_laboriousness(self, obj) -> int:
        unit_final_sum = recursion_module(obj)
        return unit_final_sum

    def get_can_remove(self, obj) -> bool:
        can_remove_bool = IsUniversalModule.check_access(
            obj.id, self.context["request"].user
        )
        return can_remove_bool

    def get_childs(self, obj) -> dict:
        return DisciplineBlockModuleWithoutFatherSerializer(
            obj.childs.all(),
            many=True
        ).data
        """.prefetch_related("childs__childs", "childs",
        "change_blocks_of_work_programs_in_modules",
        "change_blocks_of_work_programs_in_modules__work_program",
        "change_blocks_of_work_programs_in_modules__work_program__zuns_for_wp",
        "change_blocks_of_work_programs_in_modules__work_program__expertise_wit
        h_rpd", "change_blocks_of_work_programs_in_modules__practice",
        "change_blocks_of_work_programs_in_modules__gia"), many=True).data."""

    class Meta:
        model = DisciplineBlockModule
        fields = [
            "id",
            "name",
            "type",
            "change_blocks_of_work_programs_in_modules",
            "selection_rule",
            "selection_parametr",
        ]
        extra_kwargs = {
            "change_blocks_of_work_programs_in_modules": {"required": False}
        }


class DisciplineBlockSerializer(serializers.ModelSerializer):
    modules_in_discipline_block = serializers.SerializerMethodField()

    def to_representation(self, value) -> OrderedDict:
        self.fields["laboriousness"] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_laboriousness(self, obj) -> int:
        sum_ze = 0
        for module in DisciplineBlockModule.objects.filter(descipline_block=obj):
            sum_ze += recursion_module(module)
        return sum_ze

    def get_modules_in_discipline_block(self, obj) -> dict:
        dbms = DisciplineBlockModule.objects.filter(descipline_block=obj)
        """.prefetch_related("childs",
        "change_blocks_of_work_programs_in_modules",
        "change_blocks_of_work_programs_in_modules__work_program",
        "change_blocks_of_work_programs_in_modules__practice",
        "change_blocks_of_work_programs_in_modules__gia")"""
        if dbms.exists():
            try:
                for module in dbms:
                    if str(obj.academic_plan.id) in str(module.orderings_for_ups):
                        module.orderings_for_ups = list(
                            filter(
                                lambda x: x["up_id"] == obj.academic_plan,
                                module.orderings_for_ups,
                            )
                        )

                    else:
                        raise
                dbms = dbms.order_by("orderings_for_ups__0__number")

            except:
                for index, module in enumerate(dbms):
                    module_for_save = DisciplineBlockModule.objects.get(id=module.id)
                    if module_for_save.orderings_for_ups is not None:
                        if str(obj.academic_plan.id) not in str(
                            module.orderings_for_ups
                        ):
                            module_for_save.orderings_for_ups.append(
                                {"up_id": obj.academic_plan.id, "number": index + 1}
                            )
                        else:
                            for ap_index in module_for_save.orderings_for_ups:
                                if ap_index["up_id"] == obj.academic_plan.id:
                                    ap_index["number"] = index + 1
                    else:
                        module_for_save.orderings_for_ups = []
                        module_for_save.orderings_for_ups.append(
                            {"up_id": obj.academic_plan.id, "number": index + 1}
                        )
                    module_for_save.save()
                dbms = dbms.order_by("orderings_for_ups__0__number")
        modules_in_discipline_block = DisciplineBlockModuleSerializer(
            dbms, many=True, context={"request": self.context["request"]}
        )
        return modules_in_discipline_block.data

    class Meta:
        model = DisciplineBlock
        fields = ["id", "name", "modules_in_discipline_block"]


class ImplementationAcademicPlanShortForAPSerializer(serializers.ModelSerializer):
    field_of_study = FieldOfStudyImplementationSerializer(many=True)
    university_partner = ShortUniversityPartnerSerializer(many=True)
    editors = userProfileSerializer(many=True)
    structural_unit = ShortStructuralUnitSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = [
            "id",
            "year",
            "qualification",
            "title",
            "field_of_study",
            "plan_type",
            "training_period",
            "structural_unit",
            "total_intensity",
            "military_department",
            "university_partner",
            "editors",
        ]


class AcademicPlanSerializer(serializers.ModelSerializer):
    discipline_blocks_in_academic_plan = DisciplineBlockSerializer(
        many=True, required=False
    )
    can_edit = BooleanField(read_only=True)
    academic_plan_in_field_of_study = ImplementationAcademicPlanShortForAPSerializer(
        many=True
    )

    def to_representation(self, instance) -> OrderedDict:
        self.fields["discipline_blocks_in_academic_plan"] = DisciplineBlockSerializer(
            many=True, required=False, context={"request": self.context["request"]}
        )
        data = super().to_representation(instance)

        editors = []
        if instance.academic_plan_in_field_of_study.filter().exists():
            editors = instance.academic_plan_in_field_of_study.filter()[0].editors.all()
        data["laboriousness"] = sum(
            [
                (
                    block["laboriousness"]
                    if block["name"] != "Блок 4. Факультативные модули (дисциплины)"
                    else 0
                )
                for block in data["discipline_blocks_in_academic_plan"]
            ]
        )
        if instance.on_check == "on_check" and not bool(
            self.context["request"].user.groups.filter(name="expertise_master")
        ):
            data["can_edit"] = False
        elif (
            self.context["request"].user in editors and instance.on_check != "verified"
        ):
            data["can_edit"] = True
        elif self.context["request"].user.is_staff or bool(
            self.context["request"].user.groups.filter(name="expertise_master")
        ):
            data["can_edit"] = True
        else:
            data["can_edit"] = False
        if instance.on_check == "on_check" and bool(
            self.context["request"].user.groups.filter(name="expertise_master")
        ):
            data["can_validate"] = True
        else:
            data["can_validate"] = False
        data["discipline_blocks_in_academic_plan"] = sorted(
            data["discipline_blocks_in_academic_plan"], key=lambda x: x["name"]
        )
        if IsuObjectsSendLogger.objects.filter(
            error_status=0, obj_type="ap", ap_id=instance.id
        ).exists():
            data["was_send_to_isu"] = True
        else:
            data["was_send_to_isu"] = False
        return data

    class Meta:
        model = AcademicPlan
        fields = [
            "id",
            "educational_profile",
            "number",
            "approval_date",
            "discipline_blocks_in_academic_plan",
            "year",
            "education_form",
            "qualification",
            "author",
            "can_edit",
            "academic_plan_in_field_of_study",
            "ap_isu_id",
            "on_check",
            "excel_generation_errors",
        ]
        extra_kwargs = {
            "discipline_blocks_in_academic_plan": {"required": False},
            "academic_plan_in_field_of_study": {"required": False},
        }


class AcademicPlanForRepresentationSerializer(serializers.ModelSerializer):
    discipline_blocks_in_academic_plan = DisciplineBlockSerializer(
        many=True, required=False
    )
    can_edit = BooleanField(read_only=True)

    class Meta:
        model = AcademicPlan
        fields = [
            "id",
            "educational_profile",
            "number",
            "approval_date",
            "discipline_blocks_in_academic_plan",
            "year",
            "education_form",
            "qualification",
            "author",
            "can_edit",
        ]


class AcademicPlanCreateSerializer(serializers.ModelSerializer):
    fos_pk = serializers.IntegerField(
        source="academic_plan_in_field_of_study.field_of_study.id", write_only=True
    )

    def create(self, validated_data) -> AcademicPlan:
        try:
            ap_in_fs = validated_data.pop("academic_plan_in_field_of_study")
            fos_pk = ap_in_fs["field_of_study"]["id"]
            ap = AcademicPlan.objects.create(**validated_data)
            imp = ImplementationAcademicPlan.objects.create(
                academic_plan=ap,
                title=validated_data.pop("educational_profile"),
                qualification=validated_data.pop("qualification"),
                year=validated_data["year"],
            )
            imp.field_of_study.add(FieldOfStudy.objects.get(id=fos_pk))
        except KeyError:
            ap = AcademicPlan.objects.create(**validated_data)
            imp = ImplementationAcademicPlan.objects.create(academic_plan=ap)
        return ap

    class Meta:
        model = AcademicPlan
        fields = [
            "id",
            "educational_profile",
            "number",
            "approval_date",
            "year",
            "education_form",
            "author",
            "fos_pk",
            "qualification",
        ]


class WorkProgramShortForExperiseSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkProgram
        fields = [
            "id",
            "title",
            "discipline_code",
            "qualification",
            "prerequisites",
            "outcomes",
        ]


class WorkProgramChangeInDisciplineBlockModuleSerializerDetail(
    serializers.ModelSerializer
):
    work_program = WorkProgramShortForExperiseSerializer(many=True)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = "__all__"


class PracticePrimitiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practice
        fields = "__all__"


class GIAPrimitiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = GIA
        fields = "__all__"


class WorkProgramChangeInDisciplineBlockModuleUpdateSerializer(
    serializers.ModelSerializer
):
    work_program = serializers.PrimaryKeyRelatedField(
        many=True, queryset=WorkProgram.objects.all()
    )
    gia = serializers.PrimaryKeyRelatedField(many=True, queryset=GIA.objects.all())
    practice = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Practice.objects.all()
    )

    def to_representation(self, value) -> OrderedDict:
        return super().to_representation(value)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = [
            "id",
            "code",
            "credit_units",
            "change_type",
            "work_program",
            "semester_start",
            "semester_duration",
            "gia",
            "practice",
        ]
        extra_kwargs = {"work_program": {"required": False}}


class ImplementationAcademicPlanForWPinFSSerializer(serializers.ModelSerializer):
    field_of_study = FieldOfStudyImplementationSerializer(many=True)

    class Meta:
        model = ImplementationAcademicPlan
        fields = ["id", "year", "field_of_study", "title"]


class AcademicPlanForWPinFSSerializer(serializers.ModelSerializer):
    academic_plan_in_field_of_study = ImplementationAcademicPlanForWPinFSSerializer(
        many=True
    )

    class Meta:
        model = AcademicPlan
        fields = [
            "id",
            "educational_profile",
            "number",
            "approval_date",
            "academic_plan_in_field_of_study",
        ]


class DisciplineBlockDetailAcademicSerializer(serializers.ModelSerializer):

    academic_plan = AcademicPlanForWPinFSSerializer()

    class Meta:
        model = DisciplineBlock
        fields = "__all__"


class DisciplineBlockForWPinFSSerializer(serializers.ModelSerializer):

    academic_plan = AcademicPlanForWPinFSSerializer(read_only=True)

    class Meta:
        model = DisciplineBlock
        fields = ["id", "name", "academic_plan"]


class DisciplineBlockModuleForWPinFSSerializer(serializers.ModelSerializer):

    descipline_block = serializers.SerializerMethodField()

    class Meta:
        model = DisciplineBlockModule
        fields = ["id", "name", "descipline_block"]

    def get_descipline_block(self, instance) -> dict:
        serializers = DisciplineBlockForWPinFSSerializer(
            DisciplineBlock.objects.filter(
                modules_in_discipline_block__in=self.get_blocks_for_all_children(
                    instance
                )
            ),
            many=True,
        )
        return serializers.data

    def get_blocks_for_all_children(self, instance, include_self=True) -> list:
        r = []
        if include_self:
            r.append(instance)
        for c in DisciplineBlockModule.objects.filter(childs=instance):
            _r = self.get_blocks_for_all_children(c, include_self=True)
            if 0 < len(_r):
                r.extend(_r)
        return r


class WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(
    serializers.ModelSerializer
):
    discipline_block_module = DisciplineBlockModuleForWPinFSSerializer(read_only=True)
    zuns_for_wp = WorkProgramInFieldOfStudySerializerForCb(many=True, read_only=True)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = [
            "id",
            "code",
            "credit_units",
            "change_type",
            "discipline_block_module",
            "zuns_for_wp",
            "semester_start",
            "semester_duration",
        ]


class WorkProgramInFieldOfStudySerializer(serializers.ModelSerializer):

    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(
        source="prerequisitesofworkprogram_set", many=True
    )

    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(
        source="outcomesofworkprogram_set", many=True
    )

    work_program_in_change_block = (
        WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(
            many=True, read_only=True
        )
    )

    class Meta:
        model = WorkProgram
        fields = [
            "id",
            "title",
            "approval_date",
            "authors",
            "discipline_code",
            "qualification",
            "prerequisites",
            "outcomes",
            "hoursFirstSemester",
            "hoursSecondSemester",
            "description",
            "video",
            "work_program_in_change_block",
        ]


class WorkProgramInFieldOfStudyWithAPSerializer(serializers.ModelSerializer):

    work_program_change_in_discipline_block_module = (
        WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(many=False)
    )

    class Meta:
        model = WorkProgramInFieldOfStudy
        fields = ["id", "work_program_change_in_discipline_block_module"]


class WorkProgramSerializer(serializers.ModelSerializer):

    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(
        source="prerequisitesofworkprogram_set", many=True
    )

    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(
        source="outcomesofworkprogram_set", many=True
    )

    discipline_sections = DisciplineSectionSerializer(many=True)
    discipline_certification = CertificationSerializer(many=True)
    bibliographic_reference = BibliographicReferenceSerializer(
        many=True, required=False
    )
    work_program_in_change_block = (
        WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(many=True)
    )
    expertise_with_rpd = ShortExpertiseSerializer(many=True, read_only=True)
    certification_evaluation_tools = (
        CertificationEvaluationToolForWorkProgramSerializer(many=True)
    )
    editors = userProfileSerializer(many=True)
    structural_unit = ShortStructuralUnitSerializer()
    work_program_in_change_block_v2 = serializers.SerializerMethodField()

    class Meta:
        model = WorkProgram
        fields = [
            "id",
            "approval_date",
            "authors",
            "discipline_code",
            "qualification",
            "prerequisites",
            "outcomes",
            "title",
            "hoursFirstSemester",
            "hoursSecondSemester",
            "discipline_sections",
            "discipline_certification",
            "bibliographic_reference",
            "description",
            "video",
            "work_program_in_change_block",
            "expertise_with_rpd",
            "work_status",
            "certification_evaluation_tools",
            "hours",
            "extra_points",
            "editors",
            "language",
            "structural_unit",
            "have_course_project",
            "have_diff_pass",
            "have_pass",
            "have_exam",
            "lecture_hours",
            "practice_hours",
            "lab_hours",
            "srs_hours",
            "bars",
            "lecture_hours_v2",
            "practice_hours_v2",
            "lab_hours_v2",
            "srs_hours_v2",
            "contact_hours_v2",
            "number_of_semesters",
            "read_notifications",
            "implementation_format",
            "ze_v_sem",
            "consultation_v2",
            "moodle_link",
            "work_program_in_change_block_v2",
        ]

    def create(self, validated_data):
        return WorkProgram.objects.create(**validated_data)

    def get_work_program_in_change_block_v2(self, instance) -> dict:
        serializers = DisciplineBlockModuleForWPinFSSerializer(
            DisciplineBlockModule.objects.filter(
                change_blocks_of_work_programs_in_modules__work_program=instance
            ),
            many=True,
        )
        return serializers.data

    def to_representation(self, instance) -> OrderedDict:
        data = super().to_representation(instance)
        if instance.discipline_code == None and self.context.get("request"):
            data["can_send_to_isu"] = bool(
                self.context["request"].user.groups.filter(name="expertise_master")
            )
        return data


class WorkProgramSerializerByName(serializers.ModelSerializer):
    class Meta:
        model = WorkProgram
        fields = ["id", "title", "discipline_code"]


class AcademicPlanSerializerForList(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlan
        fields = [
            "id",
            "educational_profile",
            "number",
            "approval_date",
            "year",
            "education_form",
            "qualification",
        ]


class AcademicPlanShortSerializer(serializers.ModelSerializer):

    can_edit = BooleanField(read_only=True)
    academic_plan_in_field_of_study = ImplementationAcademicPlanShortForAPSerializer(
        many=True
    )

    def to_representation(self, instance) -> OrderedDict:
        data = super().to_representation(instance)
        data["can_edit"] = self.context["request"].user.id == instance.author or bool(
            self.context["request"].user.groups.filter(name="academic_plan_developer")
        )
        return data

    class Meta:
        model = AcademicPlan
        fields = [
            "id",
            "educational_profile",
            "number",
            "approval_date",
            "year",
            "education_form",
            "qualification",
            "author",
            "can_edit",
            "academic_plan_in_field_of_study",
        ]
        extra_kwargs = {"discipline_blocks_in_academic_plan": {"required": False}}


class ImplementationAcademicPlanSerializer(serializers.ModelSerializer):
    academic_plan = AcademicPlanInImplementationSerializer()
    field_of_study = FieldOfStudyImplementationSerializer(many=True)

    structural_unit = ShortStructuralUnitSerializer()
    university_partner = ShortUniversityPartnerSerializer(many=True)
    editors = userProfileSerializer(many=True)

    class Meta:
        model = ImplementationAcademicPlan
        fields = [
            "id",
            "academic_plan",
            "year",
            "qualification",
            "title",
            "field_of_study",
            "year",
            "plan_type",
            "training_period",
            "structural_unit",
            "total_intensity",
            "military_department",
            "university_partner",
            "editors",
        ]


class FieldOfStudyListSerializer(serializers.ModelSerializer):

    implementation_academic_plan_in_field_of_study = (
        ImplementationAcademicPlanSerializer(many=True)
    )

    class Meta:
        model = FieldOfStudy
        fields = [
            "id",
            "title",
            "number",
            "qualification",
            "educational_profile",
            "faculty",
            "implementation_academic_plan_in_field_of_study",
        ]


class WorkProgramChangeInDisciplineBlockModuleForCompetencesSerializer(
    serializers.ModelSerializer
):
    discipline_block_module = DisciplineBlockModuleForWPinFSSerializer(read_only=True)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = [
            "id",
            "code",
            "credit_units",
            "change_type",
            "discipline_block_module",
            "semester_start",
            "semester_duration",
        ]


class WorkProgramInFieldOfStudyForCompeteceListSerializer(serializers.ModelSerializer):

    work_program_change_in_discipline_block_module = (
        WorkProgramChangeInDisciplineBlockModuleForCompetencesSerializer()
    )

    class Meta:
        model = WorkProgramInFieldOfStudy
        fields = ["id", "work_program_change_in_discipline_block_module", "zun_in_wp"]


class WorkProgramInFieldOfStudyShortSerializer(serializers.ModelSerializer):

    work_program_in_change_block = (
        WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(
            many=True, read_only=True
        )
    )

    class Meta:
        model = WorkProgram
        fields = [
            "id",
            "title",
            "approval_date",
            "authors",
            "discipline_code",
            "work_program_in_change_block",
        ]


class BugsLogSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=False, validators=[validate_file_extension])

    class Meta:
        model = BugsLog
        fields = ["title", "description", "file"]
