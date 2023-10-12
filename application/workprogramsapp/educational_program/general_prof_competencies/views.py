import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Сериализаторы
from .serializers import GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer, \
    IndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer, \
    CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer, \
    CreateGroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer, \
    GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer, \
    CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer

from .models import GroupOfGeneralProfCompetencesInEducationalStandard, \
    GeneralProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInGeneralProfCompetenceInGeneralCharacteristic

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


class GeneralProfCompetencesInGroupOfGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.all()
    serializer_class = GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
        return GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer


class GroupOfGeneralProfCompetencesInGeneralCharacteristicsSet(viewsets.ModelViewSet):
    queryset = GroupOfGeneralProfCompetencesInEducationalStandard.objects.all()
    serializer_class = GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateGroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateGroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
        return GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer


class IndicatorGroupOfGeneralProfCompetencesInGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = IndicatorInGeneralProfCompetenceInGeneralCharacteristic.objects.all()
    serializer_class = IndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer
        return GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
