from rest_framework import filters
from rest_framework import viewsets

from workprogramsapp.educational_program.over_professional_competencies.models import (
    GroupOfOverProfCompetencesInEducationalStandard,
    IndicatorInOverProfCompetenceInGeneralCharacteristic,
    OverProfCompetencesInGroupOfGeneralCharacteristic,
)
from workprogramsapp.educational_program.over_professional_competencies.serializers import (
    CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer,
    CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer,
    CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer,
    GroupOfOverProfCompetencesInGeneralCharacteristicSerializer,
    IndicatorInOverProfCompetenceInGeneralCharacteristicSerializer,
    OverProfCompetencesInGroupOfGeneralCharacteristicSerializer,
)
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


class OverProfCompetencesInGroupOfGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = OverProfCompetencesInGroupOfGeneralCharacteristic.objects.all()
    serializer_class = OverProfCompetencesInGroupOfGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == "update":
            return CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == "partial_update":
            return CreateOverProfCompetencesInGroupOfGeneralCharacteristicSerializer
        return OverProfCompetencesInGroupOfGeneralCharacteristicSerializer


class GroupOfOverProfCompetencesInGeneralCharacteristicsSet(viewsets.ModelViewSet):
    queryset = GroupOfOverProfCompetencesInEducationalStandard.objects.all()
    serializer_class = GroupOfOverProfCompetencesInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer
        if self.action == "update":
            return CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer
        if self.action == "partial_update":
            return CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer
        return GroupOfOverProfCompetencesInGeneralCharacteristicSerializer


class IndicatorGroupOfOverProfCompetencesInGeneralCharacteristicSet(
    viewsets.ModelViewSet
):
    queryset = IndicatorInOverProfCompetenceInGeneralCharacteristic.objects.all()
    serializer_class = IndicatorInOverProfCompetenceInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer
        if self.action == "update":
            return CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer
        if self.action == "partial_update":
            return CreateIndicatorInOverProfCompetenceInGeneralCharacteristicSerializer
        return GroupOfOverProfCompetencesInGeneralCharacteristicSerializer
