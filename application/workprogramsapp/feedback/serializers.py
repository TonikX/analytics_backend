# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных

from .models import FeedbackRecord

# Сериализаторы

from workprogramsapp.serializers import WorkProgramInFieldOfStudyShortSerializer
from dataprocessing.serializers import userProfileSerializer

from django.db import transaction
from rest_framework.response import Response


class FeedbackRecordSerializer(serializers.ModelSerializer):
    word_program = WorkProgramInFieldOfStudyShortSerializer()
    user = userProfileSerializer()

    class Meta:
        model = FeedbackRecord
        fields = "__all__"
