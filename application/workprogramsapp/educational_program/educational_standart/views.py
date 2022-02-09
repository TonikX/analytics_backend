import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import EducationalStandard, TasksForProfStandard

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly
from .serializers import EducationalStandardListSerializer, EducationalStandardSingleObjectSerializer, \
    TasksForProfStandardSerializer


class EducationalStandardListView(generics.ListAPIView):
    """
    Эндпоинт для вывода списка всех образовательных стандартов
    """
    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardListSerializer
    permission_classes = [IsAuthenticated]


class EducationalStandardSingleObjectView(generics.RetrieveAPIView):
    """
    Просмотр конкретного объекта образовательного стандарта
    """
    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardSingleObjectSerializer
    permission_classes = [IsAuthenticated]


class EducationalStandardSingleObjectEditView(generics.UpdateAPIView):
    """
    Изменение конкретного объекта образовательного стандарта
    """
    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardSingleObjectSerializer
    permission_classes = [IsAuthenticated]


class EducationalStandardSingleObjectDeleteView(generics.DestroyAPIView):
    """
    Удаление конкретного объекта образовательного стандарта
    """
    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardSingleObjectSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class EducationalStandardCreateView(generics.CreateAPIView):
    """
    Создание  объекта образовательного стандарта
    """
    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardSingleObjectSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class TasksForProfStandardListView(generics.ListAPIView):
    """
    Просмотр списка объектов проф.  задач образовательного стандарта
    """
    queryset = TasksForProfStandard.objects.all()
    serializer_class = TasksForProfStandardSerializer
    permission_classes = [IsAuthenticated]


class TasksForProfStandardSingleObjectView(generics.RetrieveAPIView):
    """
    Просмотр объекта проф. задач образовательного стандарта
    """
    queryset = TasksForProfStandard.objects.all()
    serializer_class = TasksForProfStandardSerializer
    permission_classes = [IsAuthenticated]


class TasksForProfStandardDeleteView(generics.DestroyAPIView):
    """
    Удаление объекта проф. задач образовательного стандарта
    """
    queryset = TasksForProfStandard.objects.all()
    serializer_class = TasksForProfStandardSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class TasksForProfStandardEditView(generics.UpdateAPIView):
    """
    Изменение объекта проф. задач образовательного стандарта
    """
    queryset = TasksForProfStandard.objects.all()
    serializer_class = TasksForProfStandardSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class TasksForProfStandardCreateView(generics.CreateAPIView):
    """
    Создание объекта проф. задач образовательного стандарта
    """
    queryset = TasksForProfStandard.objects.all()
    serializer_class = TasksForProfStandardSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

