from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.folders_ans_statistic.models import Folder, WorkProgramInFolder, AcademicPlanInFolder, \
 DisciplineBlockModuleInFolder
from workprogramsapp.serializers import WorkProgramShortForExperiseSerializer, AcademicPlanShortSerializer, \
    DisciplineBlockModuleSerializer


# ПАПКИ С РПД
class WorkProgramInFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProgramInFolder
        fields = "__all__"

    def to_representation(self, value):
        self.fields['work_program'] = WorkProgramShortForExperiseSerializer(many=False)
        return super().to_representation(value)


class FolderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ["id", "name", "description"]


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ["id", "name", "description", "owner", 'work_program_in_folder']

    def update(self, instance, validated_data):
        print(validated_data)
        # ... logic to save ingredients for this recipe instance
        return instance

    def to_representation(self, value):
        self.fields['owner'] = userProfileSerializer(many=False)
        # self.fields['work_program'] = WorkProgramShortForExperiseSerializer(many=True)
        self.fields['work_program_in_folder'] = WorkProgramInFolderSerializer(many=True)
        self.fields['academic_plan_in_folder'] = AcademicPlanInFolderSerializer(many=True)
        self.fields['block_module_in_folder'] = ModuleInFolderSerializer(many=True)
        return super().to_representation(value)


# ПАПКИ С АКАДЕМПЛАНАМИ
class AcademicPlanInFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanInFolder
        fields = "__all__"

    def to_representation(self, value):
        self.fields['academic_plan'] = AcademicPlanShortSerializer(many=False)
        return super().to_representation(value)





# ПАПКИ С МОДУЛЯМИ
class ModuleInFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisciplineBlockModuleInFolder
        fields = "__all__"

    def to_representation(self, value):
        self.fields['block_module'] = DisciplineBlockModuleSerializer(many=False)
        return super().to_representation(value)



