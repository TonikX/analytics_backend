from rest_framework import serializers, viewsets

from .models import WorkProgram


class WorkProgramSerializer(serializers.ModelSerializer):
    prerequisites = serializers.StringRelatedField(many=True)
    outcomes = serializers.StringRelatedField(many=True)

    class Meta:
        model = WorkProgram
        fields = ['id',  'title', 'prerequisites', 'outcomes']
