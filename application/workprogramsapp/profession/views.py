from rest_framework import generics
from rest_framework import filters


# Права доступа
from workprogramsapp.permissions import IsOwnerOrReadOnly, IsRpdDeveloperOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


# Модели данных

from workprogramsapp.models import Profession, SkillsOfProfession


# Сериализаторы
from workprogramsapp.profession.serializers import ProfessionSerializer



# Блок реализации API для CRUD интерфейсов

class ProfessionsListApi(generics.ListAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionCreateAPIView(generics.CreateAPIView):
    serializer_class = ProfessionSerializer
    queryset = Profession.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionDestroyView(generics.DestroyAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ProfessionUpdateView(generics.UpdateAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    permission_classes = [IsOwnerOrReadOnly]


class ProfessionDetailsView(generics.RetrieveAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]
