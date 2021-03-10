import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Сериализаторы
from .serializers import OverProfCompetencesInGroupOfGeneralCharacteristicSerializer, IndicatorInOverProfCompetenceInGeneralCharacteristicSerializer,\
    CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer, CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer, \
    GroupOfOverProfCompetencesInGeneralCharacteristicSerializer, CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer


from .models import GroupOfOverProfCompetencesInGeneralCharacteristic, OverProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInOverProfCompetenceInGeneralCharacteristic

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


class OverProfCompetencesInGroupOfGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = OverProfCompetencesInGroupOfGeneralCharacteristic.objects.all()
    serializer_class = OverProfCompetencesInGroupOfGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer
        return OverProfCompetencesInGroupOfGeneralCharacteristicSerializer


class GroupOfOverProfCompetencesInGeneralCharacteristicsSet(viewsets.ModelViewSet):
    queryset = GroupOfOverProfCompetencesInGeneralCharacteristic.objects.all()
    serializer_class = GroupOfOverProfCompetencesInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer
        return GroupOfOverProfCompetencesInGeneralCharacteristicSerializer


class IndicatorGroupOfOverProfCompetencesInGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = IndicatorInOverProfCompetenceInGeneralCharacteristic.objects.all()
    serializer_class = IndicatorInOverProfCompetenceInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer
        return GroupOfOverProfCompetencesInGeneralCharacteristicSerializer