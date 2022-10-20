from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.models import DisciplineBlockModule, СertificationEvaluationTool
from workprogramsapp.serializers import \
    WorkProgramChangeInDisciplineBlockModuleSerializer, DisciplineBlockDetailAcademicSerializer, \
    ImplementationAcademicPlanCreateSerializer, DisciplineBlockForWPinFSSerializer, \
    СertificationEvaluationToolCreateSerializer


class DisciplineBlockModuleForWPinFSSerializer(serializers.ModelSerializer):
    descipline_block = DisciplineBlockForWPinFSSerializer(read_only=True, many=True)

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'descipline_block']


class DisciplineBlockModuleForModuleListDetailSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)
    descipline_block = DisciplineBlockDetailAcademicSerializer(many=True)
    editors = userProfileSerializer(many=True)

    # father = serializers.SerializerMethodField()
    # educational_programs_to_access = ImplementationAcademicPlanCreateSerializer(many=False, required=False)

    def to_representation(self, value):
        self.fields['childs'] = serializers.SerializerMethodField()
        self.fields['certification_evaluation_tools'] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_childs(self, obj):
        childs = DisciplineBlockModule.objects.filter(father=obj)
        if childs:
            return DisciplineBlockModuleWithoutFatherSerializer(childs, many=True).data
        else:
            return None

    def get_certification_evaluation_tools(self, obj):
        tools = СertificationEvaluationTool.objects.filter(discipline_block_module=obj)
        if tools:
            return СertificationEvaluationToolCreateSerializer(tools, many=True).data
        else:
            return None

    class Meta:
        depth = 10
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
    educational_programs_to_access = ImplementationAcademicPlanCreateSerializer(many=False, required=False)

    def to_representation(self, value):
        self.fields['childs'] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_childs(self, obj):
        childs = DisciplineBlockModule.objects.filter(father=obj)
        if childs:
            return DisciplineBlockModuleWithoutFatherSerializer(childs, many=True).data
        else:
            return None

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
        self.fields['childs'] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_childs(self, obj):
        childs = DisciplineBlockModule.objects.filter(father=obj)
        if childs:
            return DisciplineBlockModuleWithoutFatherSerializer(childs, many=True).data
        else:
            return None

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'selection_rule', 'change_blocks_of_work_programs_in_modules']


class DisciplineBlockModuleSerializer(serializers.ModelSerializer):
    change_blocks_of_work_programs_in_modules = WorkProgramChangeInDisciplineBlockModuleSerializer(many=True)

    # father = serializers.SerializerMethodField()

    def to_representation(self, value):
        self.fields['childs'] = serializers.SerializerMethodField()
        return super().to_representation(value)

    def get_childs(self, obj):
        childs = DisciplineBlockModule.objects.filter(father=obj)
        if childs:
            return DisciplineBlockModuleWithoutFatherSerializer(childs, many=True).data
        else:
            return None

    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'change_blocks_of_work_programs_in_modules', 'father', 'selection_rule']
        extra_kwargs = {
            'change_blocks_of_work_programs_in_modules': {'required': False}
        }


class DisciplineBlockModuleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisciplineBlockModule
        fields = ['id', 'name', 'type', 'description', 'descipline_block', 'editors', 'father', 'selection_rule',
                  'educational_programs_to_access']

    def create(self, validated_data):
        editor = validated_data.pop('editor')
        instance = super().create(validated_data)
        instance.editors.add(editor)

        return instance
