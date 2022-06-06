# chat/views.py
import datetime
from django.shortcuts import render
from rest_framework.response import Response

from .models import Message, Conversation, ConversationMember, UserMessageStatus
from .serializers import ConversationSerializer, MessageSerializer, ConversationMemberSerializer, \
    UserMessageStatusSerializer
from dataprocessing.models import User
from rest_framework import generics


def index(request):
    return render(request, 'chat/index.html', {})


def room(request, chat_id, user_id):
    return render(request, 'chat/room.html', {
        'chat_id': chat_id,
        'user_id': user_id
    })


def send_message_to_conversation(conversation_id, text, user_id):
    user = User.objects.get(id=user_id)
    conversation = Conversation.objects.get(id=conversation_id)
    message = Message.objects.create(text=text, sent_datetime=datetime.datetime.now(), user=user, conversation=conversation)
    message.save()
    conversation_members = ConversationMember.objects.filter(conversation=conversation_id, left_datetime=None)
    for conversation_member in conversation_members:
        add_unread_message(message.id, conversation_member.user.id)


def add_conversation(user_ids, name, admin_id):
    conversation = Conversation.objects.create(conversation_name=name)
    conversation.save()
    for user_id in user_ids:
        user = User.objects.get(id=user_id)
        conversation_member = ConversationMember.objects.create(conversation=conversation, user=user)
        conversation_member.save()

    admin = User.objects.get(id=admin_id)
    conversation_admin = ConversationMember.objects.create(conversation=conversation, user=admin, is_admin=True)
    conversation_admin.save()

    return conversation


def add_unread_message(message_id, user_id):
    user = User.objects.get(id=user_id)
    message = Message.objects.get(id=message_id)
    message_status = UserMessageStatus.objects.create(user=user, message=message)
    message_status.save()


def mark_message_read(message_status_id):
    message_status = UserMessageStatus.objects.get(id=message_status_id)
    message_status.read = True
    message_status.save()


class MessageListConversationIdAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Messages by conversation_id.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        messages = Message.objects.filter(conversation=conversation_id).order_by('-id')[:10][::-1]
        return messages


class ConversationListUserIdAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Conversations by user_id.
    """
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        conversation_members = ConversationMember.objects.filter(user=user_id, left_datetime=None)
        conversations = []
        for conversation_member in conversation_members:
            conversations.append(Conversation.objects.get(id=conversation_member.conversation_id))

        return conversations


class MemberListAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Users by conversation_id.
    """
    queryset = ConversationMember.objects.all()
    serializer_class = ConversationMemberSerializer

    def get_queryset(self):
        conversation_id = self.kwargs['conversation_id']
        members = ConversationMember.objects.filter(conversation=conversation_id, left_datetime=None)
        return members


class ConversationMemberAPIView(generics.ListAPIView):
    """
    API endpoint to update conversation members
    """
    queryset = ConversationMember.objects.all()
    serializer_class = ConversationMemberSerializer

    def delete(self, request, **kwargs):
        user_id = kwargs['user_id']
        conversation_id = kwargs['conversation_id']
        try:
            member = ConversationMember.objects.get(user=user_id, conversation=conversation_id)
            member.left_datetime = datetime.datetime.now()
            member.save()
            return Response(status=200)
        except:
            return Response(status=400)

    def post(self, request, **kwargs):
        user_id = kwargs['user_id']
        conversation_id = kwargs['conversation_id']
        existing_member = ConversationMember.objects.get(user=user_id, conversation=conversation_id)
        if existing_member:
            existing_member.left_datetime = None
            existing_member.save()
            serializer = ConversationMemberSerializer(existing_member)
            return Response(serializer.data)
        else:
            user = User.objects.get(id=user_id)
            conversation = Conversation.objects.get(id=conversation_id)
            member = ConversationMember.objects.create(user=user, conversation=conversation)
            member.save()
            serializer = ConversationMemberSerializer(member)
            return Response(serializer.data)


class UserMessageStatusAPIView(generics.ListAPIView):
    """
    API endpoint to update message status
    """
    def post(self, request, **kwargs):
        user_id = request.user.id
        message_id = kwargs['message_id']
        existing_status = UserMessageStatus.objects.get(message=message_id, user=user_id)
        if existing_status:
            existing_status.read = True
            existing_status.save()
        else:
            user = User.objects.get(id=user_id)
            message = Message.objects.get(id=message_id)
            status = UserMessageStatus.objects.create(user=user, message=message, read=True)
            status.save()
        return Response(status=200)


    def get(self, request, **kwargs):
        user_id = request.user.id
        unread_messages = UserMessageStatus.objects.filter(user=user_id, read=False)
        unique_ids = {message.message.conversation_id for message in unread_messages}
        return Response(unique_ids)


class UserMessageStatusListAPIView(generics.ListAPIView):
    """
    API endpoint to get list of unread messages
    """
    queryset = UserMessageStatus.objects.all()
    serializer_class = UserMessageStatusSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return UserMessageStatus.objects.get(user=user_id, read=False)


class UserReadConversationMessageAPIView(generics.ListAPIView):
    """
    API endpoint to mark message as read
    """

    def post(self, request, **kwargs):
        user_id = request.user.id
        conversation_id = kwargs['conversation_id']
        unread_messages = UserMessageStatus.objects.filter(user=user_id, message__conversation=conversation_id, read=False)
        for message in unread_messages:
            message.read = True
            message.save()
        return Response(status=200)
