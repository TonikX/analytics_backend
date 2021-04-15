# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных

# Сериализаторы
from rest_framework.fields import ReadOnlyField, Field

from workprogramsapp.expertise.common_serializers import ShortExpertiseSerializer
from workprogramsapp.expertise.serializers import ExpertiseSerializer
from workprogramsapp.notifications.models import UserNotification, ExpertiseNotification
from workprogramsapp.serializers import AcademicPlanSerializer, FieldOfStudyImplementationSerializer, \
    AcademicPlanInImplementationSerializer, AcademicPlanForRepresentationSerializer
from dataprocessing.serializers import userProfileSerializer


class NotificationSerializer(serializers.ModelSerializer):
    expertise = serializers.SerializerMethodField()

    def get_expertise(self, instance):
        return ExpertiseNotificationSerializer(
            instance=ExpertiseNotification.objects.get(usernotification_ptr_id=instance.id)).data

    class Meta:
        model = UserNotification
        fields = ["expertise",]

class ExpertiseNotificationSerializer(serializers.ModelSerializer):
    expertise = ShortExpertiseSerializer(many=False)

    class Meta:
        model = ExpertiseNotification
        fields = "__all__"
