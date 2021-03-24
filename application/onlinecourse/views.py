from rest_framework import filters
from rest_framework import generics, permissions, viewsets, renderers
from django_filters.rest_framework import DjangoFilterBackend
from django.db import models

from .models import Institution, Platform, OnlineCourse, CourseCredit, CourseRequirement, CourseFieldOfStudy,\
    CourseLearningOutcome, CourseWorkProgram
from .serializers import InstitutionSerializer, PlatformSerializer, OnlineCourseSerializer, \
    CourseCreditSerializer, CourseRequirementSerializer, CourseFieldOfStudySerializer, CourseLearningOutcomeSerializer,\
    CourseWorkProgramSerializer


class InstitutionViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Правообладатель"""
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']


class PlatformViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Платформа"""
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']


class OnlineCourseViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Онлайн курс"""
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['title', 'platform__title', 'institution__title']
    ordering_fields = ['title', 'platform__title', 'institution__title', 'language', 'started_at', 'rating']
    filterset_fields = ['platform__title', 'institution__title', 'language']


class CourseCreditViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Перезачет"""
    queryset = CourseCredit.objects.all()
    serializer_class = CourseCreditSerializer


class CourseRequirementViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Требования для онлайн курса"""
    queryset = CourseRequirement.objects.all()
    serializer_class = CourseRequirementSerializer


class CourseFieldOfStudyViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Требования для онлайн курса"""
    queryset = CourseFieldOfStudy.objects.all()
    serializer_class = CourseFieldOfStudySerializer


class CourseLearningOutcomeViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Требования для онлайн курса"""
    queryset = CourseLearningOutcome.objects.all()
    serializer_class = CourseLearningOutcomeSerializer


class CourseWorkProgramViewSet(viewsets.ModelViewSet):
    """Контроллер для модели РПД и онлайн курс"""
    queryset = CourseWorkProgram.objects.all()
    serializer_class = CourseWorkProgramSerializer
