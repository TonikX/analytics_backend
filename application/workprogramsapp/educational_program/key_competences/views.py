import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Сериализаторы
from .serializers import KeyCompetencesInGroupOfGeneralCharacteristicSerializer, \
    IndicatorInKeyCompetenceInGeneralCharacteristicSerializer, \
    CreateKeyCompetencesInGroupOfGeneralCharacteristicSerializer, \
    CreateGroupOfKeyCompetencesInGeneralCharacteristicSerializer, \
    GroupOfKeyCompetencesInGeneralCharacteristicSerializer, \
    CreateIndicatorInKeyCompetenceInGeneralCharacteristicSerializer

from .models import GroupOfKeyCompetencesInEducationalStandard, KeyCompetencesInGroupOfGeneralCharacteristic, \
    IndicatorInKeyCompetenceInGeneralCharacteristic

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


class KeyCompetencesInGroupOfGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = GroupOfKeyCompetencesInEducationalStandard.objects.all()
    serializer_class = KeyCompetencesInGroupOfGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateKeyCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateKeyCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreateKeyCompetencesInGroupOfGeneralCharacteristicSerializer
        return KeyCompetencesInGroupOfGeneralCharacteristicSerializer


class GroupOfKeyCompetencesInGeneralCharacteristicsSet(viewsets.ModelViewSet):
    queryset = GroupOfKeyCompetencesInEducationalStandard.objects.all()
    serializer_class = GroupOfKeyCompetencesInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateGroupOfKeyCompetencesInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateGroupOfKeyCompetencesInGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreateGroupOfKeyCompetencesInGeneralCharacteristicSerializer
        return GroupOfKeyCompetencesInGeneralCharacteristicSerializer


class IndicatorGroupOfKeyCompetencesInGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = IndicatorInKeyCompetenceInGeneralCharacteristic.objects.all()
    serializer_class = IndicatorInKeyCompetenceInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateIndicatorInKeyCompetenceInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateIndicatorInKeyCompetenceInGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreateIndicatorInKeyCompetenceInGeneralCharacteristicSerializer
        return GroupOfKeyCompetencesInGeneralCharacteristicSerializer
