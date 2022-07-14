from django.urls import path
from .views import OnlineCourseViewSet, CourseCreditViewSet, CourseFieldOfStudyViewSet

urlpatterns = [
    path('api/course/onlinecourse/', OnlineCourseViewSet.as_view({'get': 'list'}), name='OnlineCourse-list'),
    path('api/course/onlinecourse/<int:pk>/', OnlineCourseViewSet.as_view({'get': 'retrieve'}), name='OnlineCourse-item'),
    path('api/course/coursecredit/', CourseCreditViewSet.as_view({'get': 'list'}), name='CourseCredit-list'),
    path('api/course/coursefieldofstudy/', CourseFieldOfStudyViewSet.as_view({'get': 'list'}), name='CourseFieldOfStudy-list'),
]
