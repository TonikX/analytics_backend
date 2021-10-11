from django.urls import path

from workprogramsapp.notifications.views import NotificationListView, CreateCustomNotification

urlpatterns = [

    path('api/notifications/list', NotificationListView.as_view()),
    path('api/notifications/create', CreateCustomNotification.as_view()),

    ]
