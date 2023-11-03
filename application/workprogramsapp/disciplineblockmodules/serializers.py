from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import Group
from rest_framework.fields import SerializerMethodField

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.models import DisciplineBlockModule, СertificationEvaluationTool, ImplementationAcademicPlan, \
    DisciplineBlock
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
        fields = ['id', 'academic_plan', 'field_of_study', 'year', 'is_included', 'title']


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
        fields = ['id', 'name', 'type', 'change_blocks_of_work_programs_in_modules', 'selection_rule', 'childs', 'module_isu_id']
        extra_kwargs = {
            'change_blocks_of_work_programs_in_modules': {'required': False}
        }


class DisciplineBlockModuleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'description', 'descipline_block', 'editors', 'selection_rule',
                  'educational_programs_to_access', 'childs', 'only_for_struct_units', 'module_isu_id', 'selection_parametr']

    def create(self, validated_data):
        editor = validated_data.pop('editor')
        instance = super().create(validated_data)
        instance.editors.add(editor)

        return instance

    def update(self, instance, validated_data):
        updated_module = super(DisciplineBlockModuleCreateSerializer, self).update(instance, validated_data)
        module_group = Group.objects.get(name='blockmodule_editor')
        for user in updated_module.editors.all():
            if module_group not in user.groups.all():
                user.groups.add(module_group)
                user.save()
        return updated_module

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


class DisciplineBlockModuleUpdateForBlockRelationSerializer(serializers.ModelSerializer):
    """
    Сериализатор для обновления связей с блоками
    """

    class Meta:
        model = DisciplineBlockModule
        fields = ['descipline_block']

    @transaction.atomic
    def update(self, instance, validated_data):
        if 'descipline_block' in validated_data:
            descipline_blocks = validated_data.pop('descipline_block')
            for block in descipline_blocks:
                instance.descipline_block.add(block)
        return super().update(instance, validated_data)


class BodyParamsForDisciplineBlockModuleUpdateForBlockRelationSerializer(serializers.ModelSerializer):
    """
    Сериализатор для вывода списка Модулей
    """
    module = serializers.PrimaryKeyRelatedField(source='modules_in_discipline_block', many=True, queryset=DisciplineBlockModule.objects.all()
                                                )
    descipline_block = serializers.IntegerField(source='id')


    class Meta:
        model = DisciplineBlock
        fields = ['module', 'descipline_block']


class ImplementationAcademicPlanForModuleSerializer(serializers.ModelSerializer):
    field_of_study = FieldOfStudyImplementationSerializer(many=True)

    on_check = SerializerMethodField()
    ap_id = SerializerMethodField()

    def get_on_check(self, instance):
        on_check_field = instance.academic_plan.on_check
        return on_check_field

    def get_ap_id(self, instance):
        ap_id_field = instance.academic_plan.id
        return ap_id_field

    class Meta:
        model = ImplementationAcademicPlan
        fields = ['id', 'year', 'field_of_study', 'title', "on_check", "ap_id"]