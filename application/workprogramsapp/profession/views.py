from rest_framework import generics
from rest_framework import filters
from rest_framework.response import Response


# Права доступа
from workprogramsapp.permissions import IsOwnerOrReadOnly, IsRpdDeveloperOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


# Модели данных

from workprogramsapp.models import Profession, SkillsOfProfession


# Сериализаторы
from workprogramsapp.profession.serializers import ProfessionSerializer, ProfessionCreateSerializer, SkillsOfProfessionInProfessionSerializer, SkillsOfProfessionInProfessionCreateSerializer


# Пагинация
from rest_framework.pagination import PageNumberPagination


# Блок реализации API для CRUD интерфейсов

class ProfessionsListApi(generics.ListAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionCreateAPIView(generics.CreateAPIView):
    serializer_class = ProfessionCreateSerializer
    queryset = Profession.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionDestroyView(generics.DestroyAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionUpdateView(generics.UpdateAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionDetailsView(generics.RetrieveAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class SkillsOfProfessionInProfessionList(generics.ListAPIView):
    serializer_class = SkillsOfProfessionInProfessionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    #
    # def list(self, request, **kwargs):
    #     """
    #     Вывод всех навыков для конкретной профессии
    #     """
    #     # Note the use of `get_queryset()` instead of `self.queryset`
    #     queryset = SkillsOfProfession.objects.filter(profession__id=self.kwargs['profession_id'])
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #     serializer = SkillsOfProfessionInProfessionSerializer(queryset, many=True)
    #     return Response(serializer.data)
    def get_queryset(self):
        return SkillsOfProfession.objects.filter(profession__id=self.kwargs['profession_id'])



class SkillsOfProfessionInProfessionCreateAPIView(generics.CreateAPIView):
    serializer_class = SkillsOfProfessionInProfessionCreateSerializer
    queryset = SkillsOfProfession.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class SkillsOfProfessionInProfessionDestroyView(generics.DestroyAPIView):
    queryset = SkillsOfProfession.objects.all()
    serializer_class = SkillsOfProfessionInProfessionCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class SkillsOfProfessionInProfessionUpdateView(generics.UpdateAPIView):
    queryset = SkillsOfProfession.objects.all()
    serializer_class = SkillsOfProfessionInProfessionCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]