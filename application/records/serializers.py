from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.models import WorkProgram, WorkProgramInFieldOfStudy, AcademicPlan, ImplementationAcademicPlan
from workprogramsapp.serializers import PrerequisitesOfWorkProgramInWorkProgramSerializer, \
    OutcomesOfWorkProgramInWorkProgramSerializer
from workprogramsapp.workprogram_additions.models import StructuralUnit


class ImplementationAcademicPlanForStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id',"ap_isu_id" ,'year' ,"title"]


class WorkProgramDescriptionOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProgram
        fields = ['id', 'discipline_code', 'title', 'description']


class WorkProgramDuplicatesSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=300)
    count = serializers.IntegerField()
    work_programs = serializers.ListField()





class ShortAcademicPlan(serializers.ModelSerializer):
    """
    Cериализатор УП
    """

    class Meta:
        model = AcademicPlan
        fields = ["id", "educational_profile"]


class ShortStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор подразделения разработчика РПД
    """

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class WorkProgramSerializerForStatistic(serializers.ModelSerializer):
    editors = userProfileSerializer(many=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code', "editors"]


class WorkProgramSerializerForStatisticExtended(serializers.ModelSerializer):
    editors = userProfileSerializer(many=True)
    academic_plans = serializers.SerializerMethodField()
    structural_unit = ShortStructuralUnitSerializer(many=False)

    def get_academic_plans(self, instance):
        return AcademicPlansStatisticSerializer(
            instance=AcademicPlan.objects.filter(
                discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program=instance.id),
            many=True).data

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', "structural_unit", 'discipline_code', "editors", "academic_plans"]


class Meta:
    model = WorkProgram
    fields = ['id', 'title', 'discipline_code', "editors", "academic_plans"]


class WorkProgramInFieldOfStudySerializerForStatistic(serializers.ModelSerializer):
    work_program = WorkProgramSerializerForStatistic(many=False)

    class Meta:
        model = WorkProgramInFieldOfStudy
        fields = "__all__"


class StructuralUnitWithWpSerializer(serializers.ModelSerializer):
    workprogram_in_structural_unit = WorkProgramSerializerForStatistic(many=True)

    class Meta:
        model = StructuralUnit
        fields = ["id", "title", "workprogram_in_structural_unit"]


class SuperShortWorkProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code']


class AcademicPlansStatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'year', 'education_form', 'qualification',
                  'author']


class RecordWorkProgramSerializer(serializers.ModelSerializer):
    # editors = userProfileSerializer(many=True)
    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'structural_unit', 'editors', 'language', 'discipline_sections',
                  'work_program_in_change_block']


class RecordAcademicPlanSerializer(serializers.ModelSerializer):
    print()

    class Meta:
        model = AcademicPlan
        fields = ['number']






class AcademicPlansDescriptionWpSerializer(serializers.ModelSerializer):
    wp_in_academic_plan = serializers.SerializerMethodField()
    academic_plan_in_field_of_study = ImplementationAcademicPlanForStatisticSerializer(many=True)

    def get_wp_in_academic_plan(self, instance):
        return WorkProgramDescriptionOnlySerializer(
            instance=WorkProgram.objects.filter(
                zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan=instance).distinct(),
            many=True).data

    class Meta:
        model = AcademicPlan
        fields = ['id', 'academic_plan_in_field_of_study', 'wp_in_academic_plan', ]


class WorkProgramPrerequisitesAndOutcomesSerializer(serializers.ModelSerializer):
    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(source='prerequisitesofworkprogram_set',
                                                                      many=True)
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(source='outcomesofworkprogram_set', many=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'prerequisites', 'outcomes']


class ImplementationAcademicPlanWpStatisticSerializer(serializers.ModelSerializer):
    total_count_of_wp = serializers.SerializerMethodField()
    accepted_wp = serializers.SerializerMethodField()
    wp_on_expertise = serializers.SerializerMethodField()
    wp_with_editors = serializers.SerializerMethodField()

    def get_total_count_of_wp(self, obj):
        return WorkProgram.objects.filter(
            zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study=obj).distinct().count()

    def get_accepted_wp(self, obj):
        return WorkProgram.objects.filter(
            zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study=obj,
            expertise_with_rpd__expertise_status="AC").distinct().count()

    def get_wp_on_expertise(self, obj):
        return WorkProgram.objects.filter(
            zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study=obj,
            expertise_with_rpd__expertise_status__in=["WK", "EX"]).distinct().count()

    def get_wp_with_editors(self, obj):
        return WorkProgram.objects.filter(
            zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study=obj,
            editors__isnull=False).distinct().count()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['academic_plan', 'title', 'year', 'total_count_of_wp', 'wp_with_editors', 'accepted_wp',
                  'wp_on_expertise']
