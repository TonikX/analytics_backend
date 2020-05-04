from rest_framework import serializers, viewsets

from .models import User, Items

class userProfileSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с акканутами"""
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    """Сериализатор Ключевого слова"""
    class Meta:
        model = Items
        fields = '__all__'

