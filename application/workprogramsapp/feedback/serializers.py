from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.serializers import WorkProgramInFieldOfStudyShortSerializer
from .models import FeedbackRecord


class FeedbackRecordSerializer(serializers.ModelSerializer):
    word_program = WorkProgramInFieldOfStudyShortSerializer()
    user = userProfileSerializer()

    class Meta:
        model = FeedbackRecord
        fields = "__all__"
