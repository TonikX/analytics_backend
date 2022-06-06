from rest_framework import serializers
from .models import Conversation, ConversationMember, Message, UserMessageStatus
from dataprocessing.serializers import userProfileSerializer

class ConversationSerializer(serializers.ModelSerializer):
    """
        Сериализатор диалогов
    """

    class Meta:
        model = Conversation
        fields = "__all__"


class ConversationMemberSerializer(serializers.ModelSerializer):
    """
        Сериализатор участников чата
    """
    user = userProfileSerializer()
    class Meta:
        model = ConversationMember
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    """
        Сериализатор Сообщений
    """
    user = userProfileSerializer()
    class Meta:
        model = Message
        fields = '__all__'


class UserMessageStatusSerializer(serializers.ModelSerializer):
    """
        Сериализатор Статуса Сообщений
    """
    user = userProfileSerializer()
    message = MessageSerializer()
    class Meta:
        model = UserMessageStatus
        fields = '__all__'
