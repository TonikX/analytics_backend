from django.contrib.auth.models import Group
from rest_framework import serializers

from dataprocessing.models import User


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):

    def to_representation(self, value):
        self.fields["groups"] = GroupSerializer(many=True)
        return super().to_representation(value)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "isu_number",
            "groups",
        )
