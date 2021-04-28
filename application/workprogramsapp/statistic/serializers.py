from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.models import WorkProgram, WorkProgramInFieldOfStudy
from workprogramsapp.workprogram_additions.models import StructuralUnit


class WorkProgramSerializerForStatistic(serializers.ModelSerializer):
    editors = userProfileSerializer(many=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code', "editors"]


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
