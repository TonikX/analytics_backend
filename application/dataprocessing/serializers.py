from rest_framework import serializers, viewsets

from .models import User

class userProfileSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с акканутами"""
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

