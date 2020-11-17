from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.folders_ans_statistic.models import Folder, WorkProgramInFolder
from workprogramsapp.serializers import WorkProgramShortForExperiseSerializer


class WorkProgramInFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProgramInFolder
        fields = "__all__"

    def to_representation(self, value):
        self.fields['work_program'] = WorkProgramShortForExperiseSerializer(many=False)
        return super().to_representation(value)


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
        #self.fields['work_program'] = WorkProgramShortForExperiseSerializer(many=True)
        self.fields['work_program_in_folder'] = WorkProgramInFolderSerializer(many=True)
        return super().to_representation(value)
