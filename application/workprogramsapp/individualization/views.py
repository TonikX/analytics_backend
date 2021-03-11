import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import IndividualImplementationAcademicPlan
from .serializers import IndividualImplementationAcademicPlanSerializer,CreateIndividualImplementationAcademicPlanSerializer


class IndividualImplementationAcademicPlansSet(viewsets.ModelViewSet):
    queryset = IndividualImplementationAcademicPlan.objects.all()
    serializer_class = IndividualImplementationAcademicPlanSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateIndividualImplementationAcademicPlanSerializer
        if self.action == 'update':
            return CreateIndividualImplementationAcademicPlanSerializer
        return IndividualImplementationAcademicPlanSerializer