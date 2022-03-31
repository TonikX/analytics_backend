from rest_framework import viewsets

from workprogramsapp.workprogram_additions.Practice.models import Practice


class PracticeSet(viewsets.ModelViewSet):
    queryset = Practice.objects.all()
    serializer_class = GroupOfOverProfCompetencesInGeneralCharacteristicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer
        if self.action == 'update':
            return CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer
        if self.action == 'partial_update':
            return CreateGroupOfOverProfCompetencesInGeneralCharacteristicSerializer
        return GroupOfOverProfCompetencesInGeneralCharacteristicSerializer