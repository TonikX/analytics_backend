import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .views import send_message_to_conversation
from dataprocessing.models import User

import datetime


class ChatConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.chat_group_name = None
        self.user_id = None
        self.chat_id = None

    def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.chat_group_name = 'chat_%s' % self.chat_id
        self.user = User.objects.get(id=self.user_id)

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.chat_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.chat_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        send_message_to_conversation(self.chat_id, message, self.user_id)
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'user_id': self.user_id,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        user_id = event['user_id']
        first_name = event['first_name']
        last_name = event['last_name']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'text': message,
            'conversation': self.chat_id,
            'sent_datetime': datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
            'user': {
                'id': user_id,
                'first_name': first_name,
                'last_name': last_name,
            }
        }))
