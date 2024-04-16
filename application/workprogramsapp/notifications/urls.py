from django.conf.urls import include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp.notifications.emails.views import (
    CreateMail,
    CustomConfirmEmailView,
    EmailSet,
    email_reset_confirm,
    email_reset_request,
)
from workprogramsapp.notifications.views import (
    CreateCustomNotification,
    NotificationListView,
)

router = DefaultRouter()
router.register(r"api/email", EmailSet, basename="email")

urlpatterns = [
    path("api/email/confirm", email_reset_confirm, name="mail_confirm"),
    path("api/email/confirm/<str:key>", CustomConfirmEmailView),
    path("api/email/reset", email_reset_request, name="mail_reset"),
    path("api/email/send_email", CreateMail, name="mail_creation"),
    path("api/notifications/create", CreateCustomNotification.as_view()),
    path("api/notifications/list", NotificationListView.as_view()),
    re_path(r"^", include(router.urls)),
]
