from rest_framework import filters
from rest_framework import viewsets

from workprogramsapp.educational_program.general_prof_competencies.models import (
    GeneralProfCompetencesInGroupOfGeneralCharacteristic,
    GroupOfGeneralProfCompetencesInEducationalStandard,
    IndicatorInGeneralProfCompetenceInGeneralCharacteristic,
)
from workprogramsapp.educational_program.general_prof_competencies.serializers import (
    CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer,
    CreateGroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer,
    CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer,
    GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer,
    GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer,
    IndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer,
)
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


class GeneralProfCompetencesInGroupOfGeneralCharacteristicSet(viewsets.ModelViewSet):
    queryset = GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.all()
    serializer_class = GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == "update":
            return CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
        if self.action == "partial_update":
            return CreateGeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
        return GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer


class GroupOfGeneralProfCompetencesInGeneralCharacteristicsSet(viewsets.ModelViewSet):
    queryset = GroupOfGeneralProfCompetencesInEducationalStandard.objects.all()
    serializer_class = GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateGroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
        if self.action == "update":
            return CreateGroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
        return GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer


class IndicatorGroupOfGeneralProfCompetencesInGeneralCharacteristicSet(
    viewsets.ModelViewSet
):
    queryset = IndicatorInGeneralProfCompetenceInGeneralCharacteristic.objects.all()
    serializer_class = IndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return (
                CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer
            )
        if self.action == "update":
            return (
                CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer
            )
        if self.action == "partial_update":
            return (
                CreateIndicatorInGeneralProfCompetenceInGeneralCharacteristicSerializer
            )
        return GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer
