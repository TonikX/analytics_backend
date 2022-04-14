from rest_framework import viewsets, filters

from gia_practice_app.GIA.models import GIA, GIABaseTemplate, CriteriaVKR
from gia_practice_app.GIA.serializers import GIASerializer, GIABaseTemplateSerializer, CriteriaVKRSerializer
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly



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
