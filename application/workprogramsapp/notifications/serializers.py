# Библиотеки для сариализации
from rest_framework import serializers

from dataprocessing.models import User
from workprogramsapp.expertise.common_serializers import ShortExpertiseSerializer
from workprogramsapp.expertise.serializers import CommentSerializer, CommentSerializerFull
from workprogramsapp.notifications.models import UserNotification, ExpertiseNotification, NotificationComments, \
    AcademicPlanUpdateNotification


# Модели данных
# Сериализаторы


class NotificationSerializer(serializers.ModelSerializer):
    expertise = serializers.SerializerMethodField()
    academic_plan = serializers.SerializerMethodField()
    expertise_comment = serializers.SerializerMethodField()
    basic = serializers.SerializerMethodField()

    def get_expertise(self, instance):
        try:
            exp = ExpertiseNotificationSerializer(
                instance=ExpertiseNotification.objects.get(usernotification_ptr_id=instance.id)).data
            return exp
        except ExpertiseNotification.DoesNotExist:
            return None

    def get_expertise_comment(self, instance):
        try:
            exp = ExpertiseCommentsNotificationSerializer(
                instance=NotificationComments.objects.get(usernotification_ptr_id=instance.id)).data
            return exp
        except NotificationComments.DoesNotExist:
            return None

    def get_academic_plan(self, instance):
        try:
            ap = AcademicPlanUpdateNotificationSerializer(
                instance=AcademicPlanUpdateNotification.objects.get(usernotification_ptr_id=instance.id)).data
            return ap
        except AcademicPlanUpdateNotification.DoesNotExist:
            return None

    def get_basic(self, instance):
        return NotificationCreateSerializer(
            instance=UserNotification.objects.get(id=instance.id)).data

    class Meta:
        model = UserNotification
        fields = ["expertise_comment", "expertise", "basic", "academic_plan"]


class ExpertiseNotificationSerializer(serializers.ModelSerializer):
    expertise = ShortExpertiseSerializer(many=False)

    class Meta:
        model = ExpertiseNotification
        fields = "__all__"


class ExpertiseCommentsNotificationSerializer(serializers.ModelSerializer):
    comment_new = CommentSerializerFull(many=False)

    class Meta:
        model = NotificationComments
        fields = "__all__"


class AcademicPlanUpdateNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicPlanUpdateNotification
        fields = "__all__"


class NotificationCreateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        if not validated_data["user"]:
            users = User.objects.all()
            for user in users:
                UserNotification.objects.create(user=user, message=validated_data["message"])
            return validated_data
        notification = UserNotification.objects.create(**validated_data)
        return notification

    class Meta:
        model = UserNotification
        fields = "__all__"
