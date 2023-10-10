from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from workprogramsapp.notifications.emails.views import CreateMail, EmailSet, email_reset_confirm, email_reset_request, \
    CustomConfirmEmailView
from workprogramsapp.notifications.views import NotificationListView, CreateCustomNotification

router = DefaultRouter()
router.register(r'api/email', EmailSet, basename='email')

urlpatterns = [

    path('api/notifications/list', NotificationListView.as_view()),
    path('api/notifications/create', CreateCustomNotification.as_view()),
    url(r'^', include(router.urls)),
    path('api/email/send_email', CreateMail, name="mail_creation"),
    path('api/email/reset', email_reset_request, name="mail_reset"),
    path('api/email/confirm', email_reset_confirm, name="mail_confirm"),
    path('api/email/confirm/<str:key>', CustomConfirmEmailView)


]
