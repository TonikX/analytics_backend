# chat/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('chat', views.index, name='index'),
    path('chat/<int:user_id>/<int:chat_id>/', views.room, name='room'),
    path('api/chat/conversation/<int:conversation_id>', views.MessageListConversationIdAPIView.as_view()),
    path('api/chat/conversation/<int:conversation_id>/members', views.MemberListAPIView.as_view()),
    path('api/chat/conversation/<int:conversation_id>/<int:user_id>', views.ConversationMemberAPIView.as_view()),
    path('api/chat/conversations', views.ConversationListUserIdAPIView.as_view()),
    path('api/chat/unread_messages', views.UserMessageStatusAPIView.as_view()),
    path('api/chat/unread_messages/<int:message_id>', views.UserMessageStatusAPIView.as_view()),
    # path('api/chat/message_status/<int:user_id>/', views.UserUnreadConversationListAPIView.as_view()),
    path('api/chat/unread_messages/<int:conversation_id>/read', views.UserReadConversationMessageAPIView.as_view()),
]