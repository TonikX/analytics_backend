from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from workprogramsapp.feedback.views import FeedbackRecordSet

router = DefaultRouter()

router.register(r"api/feedback", FeedbackRecordSet, basename="feedback")

urlpatterns = [
    url(r"^", include(router.urls)),
]
