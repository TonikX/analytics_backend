from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.models import DisciplineBlockModule, СertificationEvaluationTool, ImplementationAcademicPlan
from workprogramsapp.serializers import \
    WorkProgramChangeInDisciplineBlockModuleSerializer, DisciplineBlockDetailAcademicSerializer, \
    DisciplineBlockForWPinFSSerializer, \
    СertificationEvaluationToolCreateSerializer, AcademicPlanInImplementationSerializer, \
    FieldOfStudyImplementationSerializer


class DisciplineBlockModuleForWPinFSSerializer(serializers.ModelSerializer):
    descipline_block = DisciplineBlockForWPinFSSerializer(read_only=True, many=True)

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'descipline_block']


class ImplementationAcademicPlanSerializerForBlockModule(serializers.ModelSerializer):
    academic_plan = AcademicPlanInImplementationSerializer()
    field_of_study = FieldOfStudyImplementationSerializer(many=True)
    is_included = serializers.SerializerMethodField()

    def get_is_included(self, instance):
        block_module = self._context
        return ImplementationAcademicPlan.objects.filter(id=instance.id,
                                                         academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block=block_module).exists()

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id', 'academic_plan', 'field_of_study', 'year', 'is_included']


class DisciplineBlockModuleForModuleListDetailSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)
    descipline_block = DisciplineBlockDetailAcademicSerializer(many=True)
    editors = userProfileSerializer(many=True)

    # father = serializers.SerializerMethodField()
    # educational_programs_to_access = ImplementationAcademicPlanCreateSerializer(many=False, required=False)

    def to_representation(self, value):
        self.fields['childs'] = DisciplineBlockModuleWithoutFatherSerializer(many=True)
        self.fields['certification_evaluation_tools'] = serializers.SerializerMethodField()
        self.fields['educational_programs_to_access'] = ImplementationAcademicPlanSerializerForBlockModule(many=True,
                                                                                                           required=False,
                                                                                                           context=value)
        return super().to_representation(value)

    def get_certification_evaluation_tools(self, obj):
        tools = СertificationEvaluationTool.objects.filter(discipline_block_module=obj)
        if tools:
            return СertificationEvaluationToolCreateSerializer(tools, many=True).data
        else:
            return None

    class Meta:
        depth = 2
        model = DisciplineBlockModule
        fields = "__all__"
        extra_kwargs = {
            'change_blocks_of_work_programs_in_modules': {'required': False}
        }


class SubDisciplineBlockModuleForModuleListDetailSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)
    descipline_block = DisciplineBlockDetailAcademicSerializer(many=True)
    editors = userProfileSerializer(many=True)

    class Meta:
        model = DisciplineBlockModule
        fields = "__all__"
        extra_kwargs = {
            'change_blocks_of_work_programs_in_modules': {'required': False}
        }


class DisciplineBlockModuleDetailSerializer(serializers.ModelSerializer):
    # father = serializers.SerializerMethodField()
    educational_programs_to_access = ImplementationAcademicPlanSerializerForBlockModule(many=True,
                                                                                        required=False)  # = serializers.SerializerMethodField()

    """def get_educational_programs_to_access(self, instance):
        imps=ImplementationAcademicPlan.objects.filter(modules_to_access=instance)
        for im"""

    def to_representation(self, value):
        self.fields['childs'] = DisciplineBlockModuleWithoutFatherSerializer(many=True)
        return super().to_representation(value)

    class Meta:
        model = DisciplineBlockModule
        fields = "__all__"
        depth = 10
        extra_kwargs = {
            'change_blocks_of_work_programs_in_modules': {'required': False}
        }


class DisciplineBlockModuleWithoutFatherSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)

    # father = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields['childs'] = DisciplineBlockModuleWithoutFatherSerializer(many=True)
        return super().to_representation(value)

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'selection_rule', 'change_blocks_of_work_programs_in_modules', 'childs']


class DisciplineBlockModuleSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)

    # father = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields['childs'] = DisciplineBlockModuleWithoutFatherSerializer(many=True)
        return super().to_representation(value)

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'change_blocks_of_work_programs_in_modules', 'selection_rule', 'childs']
        extra_kwargs = {
            'change_blocks_of_work_programs_in_modules': {'required': False}
        }


class DisciplineBlockModuleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'description', 'descipline_block', 'editors', 'selection_rule',
                  'educational_programs_to_access', 'childs', 'only_for_struct_units', ]

    def create(self, validated_data):
        editor = validated_data.pop('editor')
        instance = super().create(validated_data)
        instance.editors.add(editor)

        return instance

    def validate_childs(self, childs):
        print('dd')
        print(self.instance.childs.all())
        if self.instance.id in self.initial_data['childs'] and self.instance.id not in self.instance.childs.all():
            raise ValidationError('Модуль %s не может сослаться сам на себя' % self.instance.id)
        else:
            return childs


class ShortDisciplineBlockModuleForModuleListSerializer(serializers.ModelSerializer):
    """
    Сериализатор для вывода списка Модулей
    """
    editors = userProfileSerializer(many=True)

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'module_isu_id', 'name', 'type', 'editors']

