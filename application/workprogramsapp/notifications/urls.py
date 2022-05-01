from django.urls import path

from workprogramsapp.notifications.emails.views import CreateMail
from workprogramsapp.notifications.views import NotificationListView, CreateCustomNotification

urlpatterns = [

    path('api/notifications/list', NotificationListView.as_view()),
    path('api/notifications/create', CreateCustomNotification.as_view()),
    path('api/send_email', CreateMail, name="mail_creation")

    ]
