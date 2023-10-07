import datetime

from django.db.models import Count
# Сериализаторы
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Сериализаторы
from .serializers import PkCompetencesInGroupOfGeneralCharacteristicSerializer, \
    IndicatorInPkCompetenceInGeneralCharacteristicSerializer, \
    CreatePkCompetencesInGroupOfGeneralCharacteristicSerializer, \
    CreateGroupOfPkCompetencesInGeneralCharacteristicSerializer, \
    GroupOfPkCompetencesInGeneralCharacteristicSerializer, \
    CreateIndicatorInPkCompetenceInGeneralCharacteristicSerializer

from .models import PkCompetencesInGroupOfGeneralCharacteristic, \
    GroupOfPkCompetencesInGeneralCharacteristic, IndicatorInPkCompetenceInGeneralCharacteristic

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


class PkCompetencesInGroupOfGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = PkCompetencesInGroupOfGeneralCharacteristic.objects.all()
    serializer_class = PkCompetencesInGroupOfGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    permission_classes = (IsRpdDeveloperOrReadOnly,)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreatePkCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreatePkCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreatePkCompetencesInGroupOfGeneralCharacteristicSerializer
        return PkCompetencesInGroupOfGeneralCharacteristicSerializer


class GroupOfPkCompetencesInGeneralCharacteristicsSet(viewsets.ModelViewSet):
    queryset = GroupOfPkCompetencesInGeneralCharacteristic.objects.all()
    serializer_class = GroupOfPkCompetencesInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = (IsRpdDeveloperOrReadOnly,)

    def get_queryset(self):
        type_pk = self.request.query_params.get('type_of_pk_competence')
        if type_pk:
            queryset = GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(type_of_pk_competence=type_pk)
        else:
            queryset = GroupOfPkCompetencesInGeneralCharacteristic.objects.all()
        return queryset

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateGroupOfPkCompetencesInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateGroupOfPkCompetencesInGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreateGroupOfPkCompetencesInGeneralCharacteristicSerializer
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer


class IndicatorGroupOfPkCompetencesInGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = IndicatorInPkCompetenceInGeneralCharacteristic.objects.all()
    serializer_class = IndicatorInPkCompetenceInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = (IsRpdDeveloperOrReadOnly,)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateIndicatorInPkCompetenceInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateIndicatorInPkCompetenceInGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreateIndicatorInPkCompetenceInGeneralCharacteristicSerializer
        return GroupOfPkCompetencesInGeneralCharacteristicSerializer
