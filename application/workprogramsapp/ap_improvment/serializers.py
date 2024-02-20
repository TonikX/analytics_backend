from rest_framework import serializers
from rest_framework.fields import BooleanField

from workprogramsapp.disciplineblockmodules.ze_module_logic import recursion_module
from workprogramsapp.expertise.serializers import ShortExpertiseSerializer
from workprogramsapp.models import WorkProgram, WorkProgramChangeInDisciplineBlockModule, DisciplineBlockModule, \
    DisciplineBlock, IsuObjectsSendLogger, AcademicPlan
from workprogramsapp.permissions import IsUniversalModule
from workprogramsapp.serializers import GIAPrimitiveSerializer, PracticePrimitiveSerializer, \
    ImplementationAcademicPlanShortForAPSerializer


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
            sum_ze += module.laboriousness

        return sum_ze

    def get_modules_in_discipline_block(self, obj):
        dbms = DisciplineBlockModule.objects.filter(descipline_block=obj).prefetch_related("childs","childs__childs", "childs__childs__childs",
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
                                                                                      context={'request': self.context[
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
