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

from .models import IndividualImplementationAcademicPlan, WorkProgramInWorkProgramChangeInDisciplineBlockModule,\
    DisciplineBlockModuleInDisciplineBlock
from .serializers import IndividualImplementationAcademicPlanSerializer,CreateIndividualImplementationAcademicPlanSerializer,\
    ShortIndividualImplementationAcademicPlanSerializer
from ..folders_ans_statistic.models import IndividualImplementationAcademicPlanInFolder


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
            delete_module = []
            k = 0
            for module in discipline_block['modules_in_discipline_block']:
                print(module['id'])

                for change_block in module['change_blocks_of_work_programs_in_modules']:
                    if change_block['change_type'] == "Optionally":
                        i = 0
                        delete = []
                        for work_program in change_block['work_program']:
                            try:
                                if work_program['id'] != \
                                        WorkProgramInWorkProgramChangeInDisciplineBlockModule.objects. \
                                                get(individual_implementation_of_academic_plan = newdata['id'],
                                                    work_program_change_in_discipline_block_module = change_block['id']).work_program.id:
                                    delete.append(i)

                            except:
                                pass
                            i +=1
                        a = 0
                        for i in delete:
                            print(i)
                            del change_block['work_program'][i-a]
                            a +=1



                if module['type'] == "specialization_module":

                    print('module id', module['id'] )
                    print('2module id',DisciplineBlockModuleInDisciplineBlock.objects. \
                          get(individual_implementation_of_academic_plan = newdata['id'],
                              discipline_block = discipline_block['id']).discipline_block_module.id)
                    try:
                        if module['id'] != \
                                DisciplineBlockModuleInDisciplineBlock.objects. \
                                        get(individual_implementation_of_academic_plan = newdata['id'],
                                            discipline_block = discipline_block['id']).discipline_block_module.id:
                            #change_block['work_program'].pop(i)
                            #del change_block['work_program'][i]
                            delete_module.append(k)
                            print('dd',k)
                            #del change_block[work_program]

                            #change_block.remove(work_program['id'])

                    except:
                        pass
                k +=1
            a = 0

            for i in delete_module:
                print('dddddd', k)
                del discipline_block['modules_in_discipline_block'][i]
                a +=1
        try:
            newdata[0].update({"rating": IndividualImplementationAcademicPlanInFolder.objects.get(individual_implementation_of_academic_plan=self.kwargs['pk'],
                                                                      folder__owner=self.request.user).module_rating})
            newdata[0].update({"id_rating": IndividualImplementationAcademicPlanInFolder.objects.get(individual_implementation_of_academic_plan=self.kwargs['pk'],
                                                                         folder__owner=self.request.user).id})
        except:
            newdata.update({"rating": False})
        return Response(OrderedDict(newdata), status=status.HTTP_200_OK)


class IndividualImplementationAcademicPlanForUser(generics.ListAPIView):
    serializer_class = ShortIndividualImplementationAcademicPlanSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = IndividualImplementationAcademicPlan.objects.filter(user=self.request.user)
        page = self.paginate_queryset(queryset)
        serializer = ShortIndividualImplementationAcademicPlanSerializer(queryset, many=True)
        return self.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def SaveImplementationAcademicPlans(request):
    implementations=request.data.get('implementation_set')
    for imp in implementations:
        IndividualImplementationAcademicPlan.objects.filter(pk=imp).update(user=request.user)
    return Response("null", status=status.HTTP_200_OK)
