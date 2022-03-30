import threading, time
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import OnlineCourse
from workprogramsapp.models import FieldOfStudy, CourseCredit, CourseFieldOfStudy
from .serializers import OnlineCourseSerializer, CourseCreditSerializer, CourseFieldOfStudySerializer
from .data_onlinecourse import get_data
import pandas as pd
import re

from . import thread


class OnlineCourseViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Онлайн курс"""
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['title', 'platform', 'institution',
                     'course_field_of_study__field_of_study__number', 'course_field_of_study__field_of_study__title']
    ordering_fields = ['title', 'platform', 'institution', 'language', 'started_at', 'rating']
    filterset_fields = ['platform__title', 'institution__title', 'language',
                        'course_field_of_study__field_of_study__number', 'course_field_of_study__field_of_study__title']


class CourseCreditViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Перезачет"""
    queryset = CourseCredit.objects.all()
    serializer_class = CourseCreditSerializer


class CourseFieldOfStudyViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Требования для онлайн курса"""
    queryset = CourseFieldOfStudy.objects.all()
    serializer_class = CourseFieldOfStudySerializer


thread.course_thread.start()
thread.course_actual_thread.start()
