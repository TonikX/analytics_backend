import json
from ast import literal_eval

from rest_framework import serializers

from workprogramsapp.bars_merge.models import BarsEPAssociate, BarsWorkProgramsAssociate, HistoryOfSendingToBars
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


class HistoryOfSendingBarsSerializer(serializers.ModelSerializer):
    json_request_format = serializers.SerializerMethodField()

    def get_json_request_format(self, obj):
        return literal_eval(obj.request_text)

    """def to_representation(self, value):
        print(value.request_text)
        self.fields['request_text'] = literal_eval(value.request_text)
        return super().to_representation(value)"""

    class Meta:
        model = HistoryOfSendingToBars
        fields = ("work_program", "date_of_sending", "request_status", "json_request_format", "request_response")
