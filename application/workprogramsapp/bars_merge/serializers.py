from rest_framework import serializers

from workprogramsapp.bars_merge.models import BarsEPAssociate, BarsWorkProgramsAssociate
from workprogramsapp.models import WorkProgram
from workprogramsapp.serializers import FieldOfStudySerializer, WorkProgramShortForExperiseSerializer, \
    ImplementationAcademicPlanSerializer


class BarsEPAssociateSerializer(serializers.ModelSerializer):
    base_field_of_study = ImplementationAcademicPlanSerializer(many=True)

    class Meta:
        model = BarsEPAssociate
        fields = "__all__"


class BarsWorkProgramsAssociateSerializer(serializers.ModelSerializer):
    base_work_programs = WorkProgramShortForExperiseSerializer(many=True)

    class Meta:
        model = BarsWorkProgramsAssociate
        fields = "__all__"
