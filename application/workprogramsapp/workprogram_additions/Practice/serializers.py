from rest_framework import serializers

from workprogramsapp.workprogram_additions.Practice.models import PracticeTemplate


class PracticeTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PracticeTemplate
        fields = "__all__"
