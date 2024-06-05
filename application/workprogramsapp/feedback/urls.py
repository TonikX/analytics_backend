from django.conf.urls import include
from django.urls import re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp.feedback.views import FeedbackRecordSet

router = DefaultRouter()

router.register(r"api/feedback", FeedbackRecordSet, basename="feedback")

urlpatterns = [
    re_path(r"^", include(router.urls)),
]
