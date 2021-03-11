import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Сериализаторы
from .serializers import AdditionalMaterialSerializer, CreateAdditionalMaterialSerializer


from .models import AdditionalMaterial

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


class AdditionalMaterialSet(viewsets.ModelViewSet):
    queryset = AdditionalMaterial.objects.all()
    serializer_class = AdditionalMaterialSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateAdditionalMaterialSerializer
        if self.action == 'update':
            return CreateAdditionalMaterialSerializer
        if self.action == 'partial_update':
            return CreateAdditionalMaterialSerializer
        return AdditionalMaterialSerializer