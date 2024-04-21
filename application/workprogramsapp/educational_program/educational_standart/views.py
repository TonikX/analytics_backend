from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from workprogramsapp.permissions import IsExpertiseMasterStrict
from .models import EducationalStandard, TasksForEducationalStandard
from .serializers import (
    EducationalStandardListSerializer,
    EducationalStandardSingleObjectSerializer,
    TasksForEducationalStandardSerializer,
)


class EducationalStandardListView(generics.ListAPIView):
    """Эндпоинт для вывода списка всех образовательных стандартов."""

    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardListSerializer
    permission_classes = [IsAuthenticated]


class EducationalStandardSingleObjectView(generics.RetrieveAPIView):
    """Просмотр конкретного объекта образовательного стандарта."""

    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardSingleObjectSerializer
    permission_classes = [IsAuthenticated]


class EducationalStandardSingleObjectEditView(generics.UpdateAPIView):
    """Изменение конкретного объекта образовательного стандарта."""

    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardSingleObjectSerializer
    permission_classes = [IsAuthenticated]


class EducationalStandardSingleObjectDeleteView(generics.DestroyAPIView):
    """Удаление конкретного объекта образовательного стандарта."""

    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardSingleObjectSerializer
    permission_classes = [IsExpertiseMasterStrict]


class EducationalStandardCreateView(generics.CreateAPIView):
    """Создание  объекта образовательного стандарта."""

    queryset = EducationalStandard.objects.all()
    serializer_class = EducationalStandardSingleObjectSerializer
    permission_classes = [IsExpertiseMasterStrict]


class TasksForEducationalStandardListView(generics.ListAPIView):
    """Просмотр списка объектов проф.

    задач образовательного стандарта.
    """

    queryset = TasksForEducationalStandard.objects.all()
    serializer_class = TasksForEducationalStandardSerializer
    permission_classes = [IsAuthenticated]


class TasksForEducationalStandardSingleObjectView(generics.RetrieveAPIView):
    """Просмотр объекта проф.

    задач образовательного стандарта.
    """

    queryset = TasksForEducationalStandard.objects.all()
    serializer_class = TasksForEducationalStandardSerializer
    permission_classes = [IsAuthenticated]


class TasksForEducationalStandardDeleteView(generics.DestroyAPIView):
    """Удаление объекта проф.

    задач образовательного стандарта.
    """

    queryset = TasksForEducationalStandard.objects.all()
    serializer_class = TasksForEducationalStandardSerializer
    permission_classes = [IsExpertiseMasterStrict]


class TasksForEducationalStandardEditView(generics.UpdateAPIView):
    """Изменение объекта проф.

    задач образовательного стандарта.
    """

    queryset = TasksForEducationalStandard.objects.all()
    serializer_class = TasksForEducationalStandardSerializer
    permission_classes = [IsExpertiseMasterStrict]


class TasksForEducationalStandardCreateView(generics.CreateAPIView):
    """Создание объекта проф.

    задач образовательного стандарта.
    """

    queryset = TasksForEducationalStandard.objects.all()
    serializer_class = TasksForEducationalStandardSerializer
    permission_classes = [IsExpertiseMasterStrict]
