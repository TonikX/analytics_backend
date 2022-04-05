from rest_framework import viewsets, filters

from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly
from workprogramsapp.workprogram_additions.GIA.models import GIA, GIABaseTemplate, CriteriaVKR
from workprogramsapp.workprogram_additions.GIA.serializers import GIASerializer, GIABaseTemplateSerializer, \
    CriteriaVKRSerializer
from workprogramsapp.workprogram_additions.Practice.models import Practice, PracticeTemplate
from workprogramsapp.workprogram_additions.Practice.serializers import PracticeSerializer, PracticeTemplateSerializer


class GIASet(viewsets.ModelViewSet):
    queryset = GIA.objects.all()
    serializer_class = GIASerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]


class GIABaseTemplateSet(viewsets.ModelViewSet):
    queryset = GIABaseTemplate.objects.all()
    serializer_class = GIABaseTemplateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]


class CriteriaVKRSet(viewsets.ModelViewSet):
    queryset = CriteriaVKR.objects.all()
    serializer_class = CriteriaVKRSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]
