from django_cte import With
from rest_framework import serializers
from rest_framework.fields import BooleanField

from dataprocessing.serializers import userProfileSerializer, ShortStructuralUnitSerializer
from workprogramsapp.ap_improvment.module_ze_counter import make_modules_cte_up
from workprogramsapp.disciplineblockmodules.ze_module_logic import recursion_module
from workprogramsapp.expertise.serializers import ShortExpertiseSerializer
from workprogramsapp.models import WorkProgram, WorkProgramChangeInDisciplineBlockModule, DisciplineBlockModule, \
    DisciplineBlock, IsuObjectsSendLogger, AcademicPlan, FieldOfStudy, ImplementationAcademicPlan
from workprogramsapp.permissions import IsUniversalModule
from workprogramsapp.serializers import GIAPrimitiveSerializer, PracticePrimitiveSerializer, \
    ImplementationAcademicPlanShortForAPSerializer, PrerequisitesOfWorkProgramInWorkProgramSerializer, \
    OutcomesOfWorkProgramInWorkProgramSerializer, DisciplineSectionSerializer, BibliographicReferenceSerializer, \
    WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer, СertificationEvaluationToolForWorkProgramSerializer


class WorkProgramForAPSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""

    def to_representation(self, value):

        self.fields['wp_status'] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_wp_status(self, value):
        try:
            wp_status = value.expertise_with_rpd.all()[0].expertise_status
        except IndexError:
            wp_status = "WK"
        return wp_status

    class Meta:
        model = WorkProgram
        fields = ['id', 'zuns_for_wp', 'approval_date', 'authors', 'discipline_code', 'title', 'qualification',
                  'hoursFirstSemester', 'hoursSecondSemester', "ze_v_sem", 'number_of_semesters']


class WorkProgramChangeInDisciplineBlockModuleForAPSerializer(serializers.ModelSerializer):
    # work_program = WorkProgramForDisciplineBlockSerializer(many=True)
    # work_program = serializers.SerializerMethodField('get_id_of_wpcb')
    work_program = serializers.SerializerMethodField('get_id_of_wpcb')

    def to_representation(self, value):
        self.fields['work_program'] = WorkProgramForAPSerializer(required=False, many=True)
        self.fields['gia'] = GIAPrimitiveSerializer(required=False, many=True)
        self.fields['practice'] = PracticePrimitiveSerializer(required=False, many=True)
        self.fields['semester_start'] = serializers.SerializerMethodField()
        # self.fields['gia'] = GIASerializer(required=False, many=True)
        # self.fields['practice'] = PracticeSerializer(required=False, many=True)
        return super().to_representation(value)

    def get_semester_start(self, obj):
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
        fields = ['id', 'code', 'credit_units', 'change_type', 'work_program', 'discipline_block_module', 'practice',
                  'gia',
                  'semester_start', 'semester_duration']


class DisciplineBlockModuleWithoutFatherForAPSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleForAPSerializer(many=True)

    # father = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields['childs'] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_childs(self, obj):
        return DisciplineBlockModuleWithoutFatherForAPSerializer(
            obj.childs.all().prefetch_related("childs", "childs__childs", "change_blocks_of_work_programs_in_modules",
                                              "change_blocks_of_work_programs_in_modules__work_program",
                                              "change_blocks_of_work_programs_in_modules__work_program__zuns_for_wp",
                                              "change_blocks_of_work_programs_in_modules__work_program__expertise_with_rpd",
                                              "change_blocks_of_work_programs_in_modules__practice",
                                              "change_blocks_of_work_programs_in_modules__gia", ), many=True).data

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'selection_rule', 'change_blocks_of_work_programs_in_modules',
                  'selection_parametr', "laboriousness"]


class DisciplineBlockModuleForAPSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleForAPSerializer(many=True)

    # father = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields['childs'] = serializers.SerializerMethodField()

        self.fields["can_remove"] = serializers.SerializerMethodField()
        # self.fields["ze_by_sem"] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_can_remove(self, obj):
        can_remove_bool = IsUniversalModule.check_access(obj.id, self.context['request'].user)
        return can_remove_bool

    """def get_ze_by_sem(self, obj):
        max_ze, max_hours_lab, max_hours_lec, max_hours_practice, max_hours_cons = recursion_module_per_ze(obj)
        #print(max_hours_lec)
        return {"max_ze": max_ze}"""

    def get_childs(self, obj):
        return DisciplineBlockModuleWithoutFatherForAPSerializer(
            obj.childs.all().prefetch_related("change_blocks_of_work_programs_in_modules",
                                              "change_blocks_of_work_programs_in_modules__work_program",
                                              "change_blocks_of_work_programs_in_modules__work_program__zuns_for_wp",
                                              "change_blocks_of_work_programs_in_modules__work_program__expertise_with_rpd",
                                              "change_blocks_of_work_programs_in_modules__practice",
                                              "change_blocks_of_work_programs_in_modules__gia"), many=True).data

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'change_blocks_of_work_programs_in_modules', 'selection_rule',
                  'selection_parametr', "laboriousness"]
        extra_kwargs = {
            'change_blocks_of_work_programs_in_modules': {'required': False}
        }


class DisciplineBlockForAPSerializer(serializers.ModelSerializer):
    modules_in_discipline_block = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields["laboriousness"] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_laboriousness(self, obj):
        sum_ze = 0
        for module in DisciplineBlockModule.objects.filter(descipline_block=obj):
            try:
                sum_ze += module.laboriousness
            except TypeError:
                sum_ze = 0

        return sum_ze

    def get_modules_in_discipline_block(self, obj):
        dbms = DisciplineBlockModule.objects.filter(descipline_block=obj).prefetch_related("childs", "childs__childs",
                                                                                           "childs__childs__childs",
                                                                                           "change_blocks_of_work_programs_in_modules",
                                                                                           "change_blocks_of_work_programs_in_modules__work_program",
                                                                                           "change_blocks_of_work_programs_in_modules__practice",
                                                                                           "change_blocks_of_work_programs_in_modules__gia")
        if dbms.exists():
            try:
                for module in dbms:
                    if str(obj.academic_plan.id) in str(module.orderings_for_ups):
                        module.orderings_for_ups = list(
                            filter(lambda x: x['up_id'] == obj.academic_plan, module.orderings_for_ups))

                    else:
                        raise
                dbms = dbms.order_by('orderings_for_ups__0__number')

            except:
                for index, module in enumerate(dbms):
                    module_for_save = DisciplineBlockModule.objects.get(id=module.id)
                    if module_for_save.orderings_for_ups is not None:
                        if str(obj.academic_plan.id) not in str(module.orderings_for_ups):
                            module_for_save.orderings_for_ups.append(
                                {"up_id": obj.academic_plan.id, "number": index + 1})
                        else:
                            for ap_index in module_for_save.orderings_for_ups:
                                if ap_index['up_id'] == obj.academic_plan.id:
                                    ap_index['number'] = index + 1
                    else:
                        module_for_save.orderings_for_ups = []
                        module_for_save.orderings_for_ups.append({"up_id": obj.academic_plan.id, "number": index + 1})
                    module_for_save.save()
                dbms = dbms.order_by('orderings_for_ups__0__number')
        modules_in_discipline_block = DisciplineBlockModuleForAPSerializer(dbms, many=True,
                                                                           context={'request': self.context['request']})
        return modules_in_discipline_block.data

    class Meta:
        model = DisciplineBlock
        fields = ['id', 'name', 'modules_in_discipline_block']


class AcademicPlanForAPSerializer(serializers.ModelSerializer):
    discipline_blocks_in_academic_plan = DisciplineBlockForAPSerializer(many=True, required=False)
    can_edit = BooleanField(read_only=True)
    academic_plan_in_field_of_study = ImplementationAcademicPlanShortForAPSerializer(many=True)

    def to_representation(self, instance):
        self.fields["discipline_blocks_in_academic_plan"] = DisciplineBlockForAPSerializer(many=True, required=False,
                                                                                           context={
                                                                                               'request': self.context[
                                                                                                   'request']})
        data = super().to_representation(instance)
        # try:
        #     data["can_edit"] = self.context['request'].user == instance.author or bool(
        #         self.context['request'].user.groups.filter(name="academic_plan_developer"))\
        #                        or bool(
        #         self.context['request'].user.groups.filter(name="expertise_master"))
        # except KeyError:
        #     data["can_edit"] = False
        # print(instance.academic_plan_in_field_of_study.filter()[0].editors)
        editors = []
        if instance.academic_plan_in_field_of_study.filter().exists():
            editors = instance.academic_plan_in_field_of_study.filter()[0].editors.all()
        data["laboriousness"] = sum(
            [block["laboriousness"] if block["name"] != "Блок 4. Факультативные модули (дисциплины)" else 0 for block in
             data["discipline_blocks_in_academic_plan"]])
        if instance.on_check == 'on_check' and not bool(
                self.context['request'].user.groups.filter(name="expertise_master")):
            data["can_edit"] = False
        elif self.context['request'].user in editors and instance.on_check != 'verified':
            data["can_edit"] = True
        elif self.context['request'].user.is_staff or bool(
                self.context['request'].user.groups.filter(name="expertise_master")):
            data["can_edit"] = True
        else:
            data["can_edit"] = False
        if instance.on_check == 'on_check' and bool(
                self.context['request'].user.groups.filter(name="expertise_master")):
            data["can_validate"] = True
        else:
            data["can_validate"] = False
        data["discipline_blocks_in_academic_plan"] = sorted(data["discipline_blocks_in_academic_plan"],
                                                            key=lambda x: x["name"])
        if IsuObjectsSendLogger.objects.filter(error_status=0, obj_type='ap', ap_id=instance.id).exists():
            data["was_send_to_isu"] = True
        else:
            data["was_send_to_isu"] = False
        return data

    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'discipline_blocks_in_academic_plan', 'year',
                  'education_form', 'qualification', 'author', 'can_edit', 'academic_plan_in_field_of_study',
                  'ap_isu_id', 'on_check', 'excel_generation_errors']
        extra_kwargs = {
            'discipline_blocks_in_academic_plan': {'required': False},
            'academic_plan_in_field_of_study': {'required': False}
        }


class WorkProgramSerializerForList(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    # prerequisites = serializers.StringRelatedField(many=True)
    # discipline_sections = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    expertise_with_rpd = ShortExpertiseSerializer(many=True, read_only=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'approval_date', 'authors', 'discipline_code', 'qualification',
                  'title', 'expertise_with_rpd', 'work_status']


# ------------- Вложенность для рабочей программы

class FieldOfStudyImplementationSerializer(serializers.ModelSerializer):
    """
        Сериализатор образовательных программ (направлений)
    """

    class Meta:
        model = FieldOfStudy
        fields = ['number', 'id', 'title']


class ImplementationAcademicPlanForWPinFSSerializer(serializers.ModelSerializer):
    field_of_study = FieldOfStudyImplementationSerializer(many=True)

    # academic_plan = AcademicPlanSerializer()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id', 'year', 'field_of_study', 'title']


class AcademicPlanForWPinFSSerializer(serializers.ModelSerializer):
    academic_plan_in_field_of_study = ImplementationAcademicPlanForWPinFSSerializer(many=True)

    class Meta:
        model = AcademicPlan
        fields = ['id', 'educational_profile', 'number', 'approval_date', 'academic_plan_in_field_of_study']


class DisciplineBlockForWPinFSSCTESerializer(serializers.ModelSerializer):
    # modules_in_discipline_block = DisciplineBlockModuleSerializer(many=True)
    academic_plan = AcademicPlanForWPinFSSerializer(read_only=True)

    class Meta:
        model = DisciplineBlock
        fields = ['id', 'name', 'academic_plan']


class DisciplineBlockModuleForWPinFSSerializer(serializers.ModelSerializer):
    # descipline_block = DisciplineBlockForWPinFSSerializer(read_only=True, many=True)
    descipline_block = serializers.SerializerMethodField()

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'descipline_block']

    def get_descipline_block(self, instance):
        serializers = \
            DisciplineBlockForWPinFSSCTESerializer(DisciplineBlock.objects.filter(
                modules_in_discipline_block__in=self.get_blocks_for_all_children(instance)).
                                               select_related("academic_plan").
                                               prefetch_related("academic_plan__academic_plan_in_field_of_study",
                                                                "academic_plan__academic_plan_in_field_of_study__field_of_study")
                                               , many=True)
        return serializers.data

    def get_blocks_for_all_children(self, instance, include_self=True):
        """cte = With.recursive(make_modules_cte_up)
        # descipline_block__academic_plan__id = 7304
        modules = (
            cte.join(DisciplineBlockModule.cte_objects.all(), id=cte.col.id).annotate(
                recursive_name=cte.col.recursive_name,
                recursive_id=cte.col.recursive_id, depth=cte.col.depth, p=cte.col.p).filter(id=instance.id).with_cte(
                cte)
        )
        ids_upper = [module.recursive_id for module in modules.filter(p__isnull=True)]
        return DisciplineBlockModule.objects.filter(id__in=ids_upper)"""
        r = []
        if include_self:
            r.append(instance)
        for c in DisciplineBlockModule.objects.filter(childs=instance):
            _r = self.get_blocks_for_all_children(c, include_self=True)
            if 0 < len(_r):
                r.extend(_r)
        return r


class WorkProgramChangeInDisciplineBlockModuleForWPinFSRecursiveSerializer(serializers.ModelSerializer):
    discipline_block_module = DisciplineBlockModuleForWPinFSSerializer(read_only=True)

    class Meta:
        model = WorkProgramChangeInDisciplineBlockModule
        fields = ['id', 'discipline_block_module']



class WorkProgramSerializerCTE(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    # prerequisites = serializers.StringRelatedField(many=True)
    prerequisites = PrerequisitesOfWorkProgramInWorkProgramSerializer(source='prerequisitesofworkprogram_set',
                                                                      many=True)
    # outcomes = serializers.StringRelatedField(many=True)
    outcomes = OutcomesOfWorkProgramInWorkProgramSerializer(source='outcomesofworkprogram_set', many=True)
    # discipline_sections = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    discipline_sections = DisciplineSectionSerializer(many=True)
    # discipline_certification = CertificationSerializer(many=True)
    bibliographic_reference = BibliographicReferenceSerializer(many=True, required=False)
    #work_program_in_change_block = WorkProgramChangeInDisciplineBlockModuleForWPinFSRecursiveSerializer(many=True)
    expertise_with_rpd = ShortExpertiseSerializer(many=True, read_only=True)
    certification_evaluation_tools = СertificationEvaluationToolForWorkProgramSerializer(many=True)
    editors = userProfileSerializer(many=True)
    structural_unit = ShortStructuralUnitSerializer()
    #work_program_in_change_block_v2 = serializers.SerializerMethodField()

    class Meta:
        model = WorkProgram
        fields = ['id', 'approval_date', 'authors', 'discipline_code', 'qualification', 'prerequisites', 'outcomes',
                  'title', 'hoursFirstSemester', 'hoursSecondSemester', 'discipline_sections',
                  'discipline_certification',
                  'bibliographic_reference', 'description', 'video', #'work_program_in_change_block',
                  'expertise_with_rpd',
                  'work_status', 'certification_evaluation_tools', 'hours', 'extra_points', 'editors', 'language',
                  'structural_unit', 'have_course_project', 'have_diff_pass', 'have_pass', 'have_exam', 'lecture_hours',
                  'practice_hours', 'lab_hours', 'srs_hours', 'bars', 'lecture_hours_v2',
                  'practice_hours_v2', 'lab_hours_v2', 'srs_hours_v2', 'contact_hours_v2', 'number_of_semesters',
                  'read_notifications',
                  'implementation_format', "ze_v_sem", 'consultation_v2', 'moodle_link',
                  ]

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return WorkProgram.objects.create(**validated_data)

    """def get_work_program_in_change_block_v2(self, instance):
        serializers = DisciplineBlockModuleForWPinFSSerializer(DisciplineBlockModule.objects.filter
                                                               (change_blocks_of_work_programs_in_modules__work_program=instance)
                                                               , many=True)
        return serializers.data"""

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.discipline_code == None and self.context.get('request'):
            data["can_send_to_isu"] = bool(self.context['request'].user.groups.filter(name="expertise_master"))
        return data