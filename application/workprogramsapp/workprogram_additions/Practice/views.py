from rest_framework import viewsets, filters

from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly
from workprogramsapp.workprogram_additions.Practice.models import Practice, PracticeTemplate
from workprogramsapp.workprogram_additions.Practice.serializers import PracticeSerializer, PracticeTemplateSerializer


class PracticeSet(viewsets.ModelViewSet):
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]


class PracticeTemplateSet(viewsets.ModelViewSet):
    queryset = PracticeTemplate.objects.all()
    serializer_class = PracticeTemplateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]
