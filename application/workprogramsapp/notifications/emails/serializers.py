# Библиотеки для сариализации
from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.notifications.emails.models import SentMail


# Сериализаторы
class BaseEmailSerializer(serializers.Serializer):
    groups = serializers.ListField(allow_empty=True, required=False, child=serializers.CharField(), default=[])
    faculties = serializers.ListField(allow_empty=True, required=False, child=serializers.IntegerField(), default=[])
    users = serializers.ListField(allow_empty=True, required=False, child=serializers.IntegerField(), default=[])
    topic = serializers.CharField()
    text = serializers.CharField()
    send_to_all = serializers.BooleanField(required=False, default=False)


class EmailSerializer(serializers.ModelSerializer):

    def to_representation(self, value):
        self.fields['users'] = userProfileSerializer(many=True)
        return super().to_representation(value)

    class Meta:
        model = SentMail
        fields = "__all__"
