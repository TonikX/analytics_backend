import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from collections import OrderedDict
from rest_framework import status

from .models import IndividualImplementationAcademicPlan, WorkProgramInWorkProgramChangeInDisciplineBlockModule
from .serializers import IndividualImplementationAcademicPlanSerializer,CreateIndividualImplementationAcademicPlanSerializer,\
    ShortIndividualImplementationAcademicPlanSerializer


class IndividualImplementationAcademicPlansSet(viewsets.ModelViewSet):
    queryset = IndividualImplementationAcademicPlan.objects.all()
    serializer_class = IndividualImplementationAcademicPlanSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)

    def get_serializer_class(self):
        if self.action == 'list':
            return ShortIndividualImplementationAcademicPlanSerializer
        if self.action == 'create':
            return CreateIndividualImplementationAcademicPlanSerializer
        if self.action == 'update':
            return CreateIndividualImplementationAcademicPlanSerializer
        return IndividualImplementationAcademicPlanSerializer


    def retrieve(self, request, *args, **kwargs):
        # do your customization here
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        newdata = dict(serializer.data)
        for discipline_block in newdata['implementation_of_academic_plan']['academic_plan']['discipline_blocks_in_academic_plan']:
            print(discipline_block['id'])
            for module in discipline_block['modules_in_discipline_block']:
                print(module['id'])
                for change_block in module['change_blocks_of_work_programs_in_modules']:
                    if change_block['change_type'] == "Optionally":
                        for work_program in change_block['work_program']:
                            try:
                                if work_program['id'] != \
                                        WorkProgramInWorkProgramChangeInDisciplineBlockModule.objects.\
                                                get(individual_implementation_of_academic_plan = newdata['id'],
                                                    work_program_change_in_discipline_block_module = change_block['id']).work_program.id:
                                    print('dd')
                                    del change_block['work_program']
                            except:
                                pass
        return Response(OrderedDict(newdata), status=status.HTTP_200_OK)