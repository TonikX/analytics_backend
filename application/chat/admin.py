from django.contrib import admin

from .models import Conversation, ConversationMember, Message, UserMessageStatus

admin.site.register(Conversation)
admin.site.register(ConversationMember)
admin.site.register(Message)
admin.site.register(UserMessageStatus)