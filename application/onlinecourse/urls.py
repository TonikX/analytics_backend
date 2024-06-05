from django.urls import path

from onlinecourse.views import (
    CourseCreditViewSet,
    CourseDataAPIView,
    CourseFieldOfStudyViewSet,
    InstitutionViewSet,
    OnlineCourseViewSet,
    PlatformViewSet,
)

urlpatterns = [
    path(
        "api/course/institution/",
        InstitutionViewSet.as_view({"get": "list"}),
        name="Institution-list",
    ),
    path(
        "api/course/platform/",
        PlatformViewSet.as_view({"get": "list"}),
        name="Platform-list",
    ),
    path(
        "api/course/onlinecourse/",
        OnlineCourseViewSet.as_view({"get": "list"}),
        name="OnlineCourse-list",
    ),
    path(
        "api/course/onlinecourse/<int:pk>/",
        OnlineCourseViewSet.as_view({"get": "retrieve"}),
        name="OnlineCourse-item",
    ),
    path(
        "api/course/coursecredit/",
        CourseCreditViewSet.as_view({"get": "list"}),
        name="CourseCredit-list",
    ),
    path(
        "api/course/coursefieldofstudy/",
        CourseFieldOfStudyViewSet.as_view({"get": "list"}),
        name="CourseFieldOfStudy-list",
    ),
    path(
        "api/course/upload_data/",
        CourseDataAPIView.as_view(),
        name="CourseDataUploader",
    ),
]
