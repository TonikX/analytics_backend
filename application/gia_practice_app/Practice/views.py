from rest_framework import viewsets, filters

from gia_practice_app.Practice.models import Practice, PracticeTemplate
from gia_practice_app.Practice.serializers import PracticeSerializer, PracticeTemplateSerializer, \
    PracticePrimitiveSerializer
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly



class PracticeSet(viewsets.ModelViewSet):
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return PracticePrimitiveSerializer
        return PracticeSerializer


class PracticeTemplateSet(viewsets.ModelViewSet):
    queryset = PracticeTemplate.objects.all()
    serializer_class = PracticeTemplateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]
