from rest_framework import serializers

from workprogramsapp.models import IsuObjectsSendLogger


class IsuHistoryListViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = IsuObjectsSendLogger
        fields = "__all__"
