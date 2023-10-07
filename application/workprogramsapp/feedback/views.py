import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from collections import OrderedDict
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

from .models import FeedbackRecord
from .serializers import FeedbackRecordSerializer
# CreateElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer
from ..folders_ans_statistic.models import IndividualImplementationAcademicPlanInFolder


class FeedbackRecordSet(viewsets.ModelViewSet):
    queryset = FeedbackRecord.objects.all()
    serializer_class = FeedbackRecordSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    # filterset_fields = ['implementation_of_academic_plan__academic_plan__educational_profile',
    #                     'implementation_of_academic_plan__field_of_study__title',
    #                     'implementation_of_academic_plan__field_of_study__number',
    #                     'implementation_of_academic_plan__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__prerequisites__name',
    #                     'implementation_of_academic_plan__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__outcomes__name',
    #                     ]
    # http_method_names = ['get', 'post']

    # def get_serializer_class(self):
    #     if self.action == 'list':
    #         return ShortIndividualImplementationAcademicPlanSerializer
    #     if self.action == 'create':
    #         return CreateIndividualImplementationAcademicPlanSerializer
    #     if self.action == 'update':
    #         return CreateIndividualImplementationAcademicPlanSerializer
    #     return IndividualImplementationAcademicPlanSerializer