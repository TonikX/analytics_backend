from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from django.db.models.query import QuerySet


# Права доступа
from workprogramsapp.permissions import IsOwnerOrReadOnly, IsRpdDeveloperOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


# Модели данных

from workprogramsapp.models import Profession, SkillsOfProfession, Role, SkillsOfRole


# Сериализаторы
from workprogramsapp.profession.serializers import ProfessionSerializer, ProfessionCreateSerializer, SkillsOfProfessionInProfessionSerializer, SkillsOfProfessionInProfessionCreateSerializer, \
    RoleSerializer, RoleCreateSerializer, SkillsOfRoleInRoleSerializer, SkillsOfRoleInRoleCreateSerializer


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


class SkillsOfProfessionInProfessionList(generics.ListAPIView):
    serializer_class = SkillsOfProfessionInProfessionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


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


class RolesListApi(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RoleCreateAPIView(generics.CreateAPIView):
    serializer_class = RoleCreateSerializer
    queryset = Role.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RoleDestroyView(generics.DestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RoleUpdateView(generics.UpdateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RoleDetailsView(generics.RetrieveAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class SkillsOfRoleInRoleList(generics.ListAPIView):
    serializer_class = SkillsOfRoleInRoleSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


    def get_queryset(self):
        return SkillsOfRole.objects.filter(role__id=self.kwargs['role_id'])


from itertools import groupby
from operator import itemgetter
from rest_framework.response import Response


class SkillsOfRoleInRoleWithItemsList(generics.ListAPIView):
    serializer_class = SkillsOfRoleInRoleCreateSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


    def get_queryset(self):
        # query = SkillsOfRole.objects.all().query
        #         # query.group_by = ['item']
        #         # results = QuerySet(query=query, model=SkillsOfRole)

        # return results
        items = SkillsOfRole.objects.values('id', 'item', 'masterylevel', 'role').order_by('item')
        rows = groupby(items, itemgetter('item'))
        return Response({c_title: list(items) for c_title, items in rows})


class SkillsOfRoleInRoleCreateAPIView(generics.CreateAPIView):
    serializer_class = SkillsOfRoleInRoleCreateSerializer
    queryset = SkillsOfRole.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class SkillsOfRoleInRoleDestroyView(generics.DestroyAPIView):
    queryset = SkillsOfRole.objects.all()
    serializer_class = SkillsOfRoleInRoleCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class SkillsOfRoleInRoleUpdateView(generics.UpdateAPIView):
    queryset = SkillsOfRole.objects.all()
    serializer_class = SkillsOfRoleInRoleCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]