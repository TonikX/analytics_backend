import json
import os
import re
from collections import OrderedDict

import pandas
from django.db import transaction
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from django_super_deduper.merge import MergedModelInstance
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from dataprocessing.models import Items
from .expertise.models import Expertise, UserExpertise
from .folders_ans_statistic.models import WorkProgramInFolder, AcademicPlanInFolder, DisciplineBlockModuleInFolder
from .models import AcademicPlan, ImplementationAcademicPlan, WorkProgramChangeInDisciplineBlockModule, \
    DisciplineBlockModule, DisciplineBlock, Zun, WorkProgramInFieldOfStudy
from .models import FieldOfStudy, BibliographicReference, СertificationEvaluationTool
from .models import WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, EvaluationTool, DisciplineSection, \
    Topic, Indicator, Competence
from .notifications.models import UserNotification
# Права доступа
from .permissions import IsOwnerOrReadOnly, IsRpdDeveloperOrReadOnly, IsDisciplineBlockModuleEditor, \
    IsOwnerOrDodWorkerOrReadOnly
from .serializers import AcademicPlanSerializer, ImplementationAcademicPlanSerializer, \
    ImplementationAcademicPlanCreateSerializer, AcademicPlanCreateSerializer, \
    WorkProgramChangeInDisciplineBlockModuleSerializer, DisciplineBlockModuleSerializer, \
    DisciplineBlockModuleCreateSerializer, \
    WorkProgramInFieldOfStudySerializer, ZunSerializer, WorkProgramInFieldOfStudyCreateSerializer, ZunCreateSerializer, \
    ZunCreateSaveSerializer, WorkProgramForIndividualRoutesSerializer, AcademicPlanShortSerializer, \
    WorkProgramChangeInDisciplineBlockModuleUpdateSerializer, \
    WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer, AcademicPlanSerializerForList, \
    DisciplineBlockModuleDetailSerializer, DisciplineBlockModuleForModuleListDetailSerializer, \
    WorkProgramArchiveUpdateSerializer
from .serializers import BibliographicReferenceSerializer, \
    WorkProgramBibliographicReferenceUpdateSerializer, \
    PrerequisitesOfWorkProgramCreateSerializer, EvaluationToolForWorkProgramSerializer, EvaluationToolCreateSerializer, \
    IndicatorListSerializer
from .serializers import FieldOfStudySerializer, FieldOfStudyListSerializer, WorkProgramInFieldOfStudySerializerForCb, \
    WorkProgramInFieldOfStudyForCompeteceListSerializer
from .serializers import IndicatorSerializer, CompetenceSerializer, OutcomesOfWorkProgramSerializer, \
    ZunForManyCreateSerializer, \
    WorkProgramCreateSerializer, PrerequisitesOfWorkProgramSerializer
from .serializers import OutcomesOfWorkProgramCreateSerializer, СertificationEvaluationToolCreateSerializer
from .serializers import TopicSerializer, SectionSerializer, TopicCreateSerializer
from .serializers import WorkProgramSerializer, WorkProgramEditorsUpdateSerializer
from .workprogram_additions.models import StructuralUnit, UserStructuralUnit

""""Удалены старые views с использованием джанго рендеринга"""
"""Блок реализации API"""


# class WorkProgramsListApi(APIView):
# #     """
# #     Список рабочих программ для апи.
# #     """
# #     def get(self, request, format=None):
# #         WorkPrograms = WorkProgram.objects.all()
# #         serializer = WorkProgramSerializer(WorkPrograms, many=True)
# #         return Response(serializer.data)


class WorkProgramsListApi(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['discipline_code', 'title', 'editors__last_name', 'editors__first_name' ]
    filterset_fields = ['language',
                        'work_program_in_change_block__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__field_of_study__title',
                        'work_program_in_change_block__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__field_of_study__number',
                        'work_program_in_change_block__discipline_block_module__descipline_block__academic_plan__educational_profile', 'qualification',
                        'prerequisites', 'outcomes', 'structural_unit__title',
                        'work_program_in_change_block__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__title',
                        'editors__last_name', 'editors__first_name', 'work_status'
                        ]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    # def list(self, request, **kwargs):
    #     """
    #     Вывод всех результатов для одной рабочей программы по id
    #     """
    #     # Note the use of `get_queryset()` instead of `self.queryset`
    #     # queryset = BibliographicReference.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
    #     if request.GET.get('field') == True:
    #         queryset = WorkProgram.objects.filter(editors=request.use)
    #     return Response(serializer.data)

    def get_queryset(self):
        if self.request.GET.get('filter') == 'my':
            queryset = WorkProgram.objects.filter(editors=self.request.user)
        elif self.request.GET.get('filter') == 'iamexpert':
            queryset = WorkProgram.objects.filter(expertise_with_rpd__expertse_users_in_rpd__expert = self.request.user,
                                                  expertise_with_rpd__expertse_users_in_rpd__stuff_status = 'EX')
        else:
            queryset = WorkProgram.objects.filter()
        return queryset


class IndicatorListAPIView(generics.ListAPIView):
    serializer_class = IndicatorListSerializer
    queryset = Indicator.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['number', 'name', 'competence']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class IndicatorCreateAPIView(generics.CreateAPIView):
    serializer_class = IndicatorSerializer
    queryset = Indicator.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class IndicatorDestroyView(generics.DestroyAPIView):
    queryset = Indicator.objects.all()
    serializer_class = IndicatorSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class IndicatorUpdateView(generics.UpdateAPIView):
    queryset = Indicator.objects.all()
    serializer_class = IndicatorSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class IndicatorDetailsView(generics.RetrieveAPIView):
    queryset = Indicator.objects.all()
    serializer_class = IndicatorListSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ZunManyViewSet(viewsets.ModelViewSet):
    model = Zun
    queryset = Zun.objects.all()
    serializer_class = ZunForManyCreateSerializer
    http_method_names = ['post', 'delete', 'patch']

    def create(self, request, *args, **kwargs):
        """
        Example:
            {"wpa_in_fss": [74089, 74090, 74091],
            "zun": {
              "indicator_in_zun": 16,
              "items": []
                }
            }
        """

        for wp_in_fs in request.data['wpa_in_fss']:
            serializer = self.get_serializer(data=request.data['zun'])
            serializer.is_valid(raise_exception=True)
            serializer.save(wp_in_fs = WorkProgramInFieldOfStudy.objects.get(id = wp_in_fs))
        return Response(status=status.HTTP_201_CREATED)


# class IndicatorForCompetence(generics.ListAPIView):
#     serializer_class = IndicatorListSerializer
#     queryset = Indicator.objects.all()
#
#     def list(self, request, **kwargs):
#         """
#         Вывод всех результатов для одной рабочей программы по id
#         """
#         # Note the use of `get_queryset()` instead of `self.queryset`
#         queryset = OutcomesOfWorkProgram.objects.filter(competence__id=self.kwargs['competence_id'])
#         serializer = IndicatorSerializer(queryset, many=True)
#         return Response(serializer.data)


class CompetenceCreateView(generics.CreateAPIView):
    serializer_class = CompetenceSerializer
    queryset = Competence.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class CompetencesListView(generics.ListAPIView):
    serializer_class = CompetenceSerializer
    queryset = Competence.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'number']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class CompetenceListView(APIView):
    """
       Список компетеций.
    """
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request):
        competences = Competence.objects.all()
        serializer = CompetenceSerializer(competences, many=True)
        return Response(serializer.data)


class CompetenceUpdateView(APIView):
    """
        Редактирование (обновление) компетенции
    """
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, pk):
        competence = get_object_or_404(Competence, pk=pk)
        serializer = CompetenceSerializer(competence)
        return Response(serializer.data)

    def put(self, request, pk):
        competence = get_object_or_404(Competence, pk=pk)
        serializer = CompetenceSerializer(competence, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        competence = get_object_or_404(Competence, pk=pk)
        try:
            competence.delete()
            return Response(status=200)
        except:
            return Response(status=400)


class CompetenceIndicatorDetailView(APIView):
    """
       Индикаторы компетенции.
    """
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, pk):
        indicators = Indicator.objects.filter(competence=pk)
        serializer = IndicatorSerializer(indicators, many=True)
        return Response(serializer.data)


class DeleteIndicatorFromCompetenceView(APIView):
    """
        Удаление индикатора из компетенции
    """
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def post(self, request):
        competence_pk = request.data.get("competence_pk")
        indicator_pk = request.data.get("indicator_pk")
        try:
            indicator = Indicator.objects.get(pk=indicator_pk, competence=competence_pk)
            indicator.delete()
            return Response(status=200)
        except:
            return Response(status=400)


class AddIndicatorToCompetenceView(APIView):
    """
        Добавление индикатора в компетенцию (Создание индикатора)
    """
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def post(self, request):
        number = request.data.get("number")
        name = request.data.get("name")
        competence = request.data.get("competence")
        try:
            competence = Competence.objects.get(pk=competence)
            indicator = Indicator.objects.create(number=number, name=name, competence=competence)
            indicator.save()
            return Response(status=200)
        except:
            return Response(status=400)


class OutcomesOfWorkProgramList(generics.ListAPIView):
    serializer_class = OutcomesOfWorkProgramSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = OutcomesOfWorkProgram.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        serializer = OutcomesOfWorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class OutcomesOfWorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = OutcomesOfWorkProgramCreateSerializer
    queryset = OutcomesOfWorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        serializer = OutcomesOfWorkProgramCreateSerializer(data=request.data)

        # обновляем value для item
        item = Items.objects.get(id=request.data.get('item'))
        value = item.value
        item.value = int(value) + 1
        item.save()
        print(item)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OutcomesOfWorkProgramDestroyView(generics.DestroyAPIView):
    queryset = OutcomesOfWorkProgram.objects.all()
    serializer_class = OutcomesOfWorkProgramCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        try:
            obj = OutcomesOfWorkProgram.objects.get(pk=kwargs['pk'])

            # изменяем значение value для item
            item = Items.objects.get(name=obj.item)
            value = item.value
            item.value = int(value) - 1
            item.save()

            return self.destroy(request, *args, **kwargs)
        except:
            return self.destroy(request, *args, **kwargs)


class OutcomesOfWorkProgramUpdateView(generics.UpdateAPIView):
    queryset = OutcomesOfWorkProgram.objects.all()
    serializer_class = OutcomesOfWorkProgramCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class OutcomesForWorkProgramChangeBlock(generics.ListAPIView):
    serializer_class = PrerequisitesOfWorkProgramSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = OutcomesOfWorkProgram.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        serializer = OutcomesOfWorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class PrerequisitesOfWorkProgramList(generics.ListAPIView):
    serializer_class = PrerequisitesOfWorkProgramSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = PrerequisitesOfWorkProgram.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        serializer = PrerequisitesOfWorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class WorkProgramsWithOutcomesToPrerequisitesForThisWPView(generics.ListAPIView):
    '''
    Дисциплины, в которых в качестве результатов заявлены те ключевые слова, которые являются пререквизитами для этой дисциплины
    '''
    serializer_class = WorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def list(self, request, **kwargs):
        prerequisites_of_this_wp = PrerequisitesOfWorkProgram.objects.filter(
            workprogram__discipline_code=self.kwargs['discipline_code']).values("item__name")
        queryset = WorkProgram.objects.filter(outcomes__items__name__in=prerequisites_of_this_wp)
        serializer = WorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class WorkProgramsWithPrerequisitesToOutocomesForThisWPView(generics.ListAPIView):
    '''
    Дисциплины, у которых а качестве пререквизитов указаны ключевые слова, являющиеся результатами по этой дисциплине
    '''
    serializer_class = WorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def list(self, request, **kwargs):
        outcomes_of_this_wp = OutcomesOfWorkProgram.objects.filter(
            workprogram__discipline_code=self.kwargs['discipline_code']).values("item__name")
        print('dd', outcomes_of_this_wp)
        queryset = WorkProgram.objects.filter(prerequisites__items__name__in=outcomes_of_this_wp)
        serializer = WorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class WorkProgramsWithOutocomesForThisWPView(generics.ListAPIView):
    '''
    Дисциплины, в которых есть такие же результаты
    '''
    serializer_class = WorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def list(self, request, **kwargs):
        outcomes_of_this_wp = OutcomesOfWorkProgram.objects.filter(
            workprogram__discipline_code=self.kwargs['discipline_code']).values("item__name")
        print('dd', outcomes_of_this_wp)
        queryset = WorkProgram.objects.filter(outcomes__items__name__in=outcomes_of_this_wp)
        serializer = WorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class PrerequisitesOfWorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer
    queryset = PrerequisitesOfWorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        serializer = PrerequisitesOfWorkProgramCreateSerializer(data=request.data)
        # обновляем value для item
        item = Items.objects.get(id=request.data.get('item'))
        value = item.value
        item.value = int(value) + 1
        item.save()

        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PrerequisitesOfWorkProgramDestroyView(generics.DestroyAPIView):
    queryset = PrerequisitesOfWorkProgram.objects.all()
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        try:
            obj = PrerequisitesOfWorkProgram.objects.get(pk=kwargs['pk'])

            # изменяем значение value для item
            item = Items.objects.get(name=obj.item)
            value = item.value
            item.value = int(value) - 1
            item.save()

            return self.destroy(request, *args, **kwargs)
        except:
            return Response(status=400)


class PrerequisitesOfWorkProgramUpdateView(generics.UpdateAPIView):
    queryset = PrerequisitesOfWorkProgram.objects.all()
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


# Блок эндпоинтов рабочей программы

class WorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = WorkProgramCreateSerializer
    queryset = WorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, editors = [self.request.user])


class WorkProgramDestroyView(generics.DestroyAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializer
    permission_classes = [IsAdminUser]


class WorkProgramUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramCreateSerializer
    permission_classes = [IsOwnerOrReadOnly]


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        #print(request.data['id'])
        try:
            if request.data['implementation_format']=='online':
                DisciplineSection.objects.filter(work_program = serializer.data['id'])
                for section in DisciplineSection.objects.filter(work_program = serializer.data['id']):
                    section.consultations = section.lecture_classes + section.laboratory + \
                                            section.practical_lessons
                    #section.contact_work = 0
                    section.lecture_classes = 0
                    section.laboratory = 0
                    section.practical_lessons = 0
                    #section.SRO = 0
                    section.save()
            elif request.data['implementation_format']=='mixed' or request.data['implementation_format']=='offline':
                DisciplineSection.objects.filter(work_program = serializer.data['id'])
                for section in DisciplineSection.objects.filter(work_program = serializer.data['id']):
                    #section.contact_work = (section.consultations/21*11)
                    section.lecture_classes = (section.consultations/3)
                    section.laboratory = (section.consultations/3)
                    section.practical_lessons = (section.consultations/3)
                    #section.SRO = (section.consultations/8*2)
                    section.consultations = 0
                    section.save()
        except:
            pass
        response_serializer = WorkProgramSerializer(WorkProgram.objects.get(id = serializer.data['id']))
        return Response(response_serializer.data)


class WorkProgramEditorsUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramEditorsUpdateSerializer
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(WorkProgramSerializer(instance).data)


class WorkProgramDetailsView(generics.RetrieveAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


    def get(self, request, **kwargs):
        queryset = WorkProgram.objects.filter(pk=self.kwargs['pk'])
        serializer = WorkProgramSerializer(queryset, many=True)
        if len(serializer.data) == 0:
            return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)
        newdata = dict(serializer.data[0])
        try:
            newdata.update(
                {"expertise_status": Expertise.objects.get(work_program__id=self.kwargs['pk']).expertise_status})
            newdata.update(
                {"use_chat_with_id_expertise": Expertise.objects.get(work_program__id=self.kwargs['pk']).pk})
            if (Expertise.objects.get(work_program__id=self.kwargs['pk']).expertise_status == "WK" or
                Expertise.objects.get(work_program__id=self.kwargs['pk']).expertise_status == "RE") and (WorkProgram.objects.get(
                pk=self.kwargs['pk']).owner == request.user or WorkProgram.objects.filter(pk=self.kwargs['pk'],
                                                                                          editors__in=[request.user])):
                newdata.update({"can_edit": True})
            else:
                newdata.update({"can_edit": False})
        except Expertise.DoesNotExist:
            if WorkProgram.objects.get(pk=self.kwargs['pk']).owner == request.user or WorkProgram.objects.filter(
                    pk=self.kwargs['pk'], editors__in=[request.user]) or request.user.is_superuser:
                newdata.update({"can_edit": True, "expertise_status": False})
            else:
                newdata.update({"can_edit": False, "expertise_status": False})
            newdata.update({"use_chat_with_id_expertise": None})
        try:

            ue = UserExpertise.objects.filter(expert=request.user, expertise__work_program=self.kwargs['pk'])
            ue_save_obj = None
            for user_exp_object in ue:
                ue_save_obj = user_exp_object
                if user_exp_object.stuff_status == "EX":
                    ue_save_obj = user_exp_object
                    break
            if ue_save_obj:
                ue = ue_save_obj
            else:
                raise ValueError

            if Expertise.objects.get(work_program__id=self.kwargs['pk']).expertise_status in ["EX", "WK", "RE"]:
                newdata.update({"can_comment": True})
                newdata.update({"user_expertise_id": ue.id})
            else:
                newdata.update({"can_comment": False})
            if ue.stuff_status == "AU" or ue.stuff_status == "ED" or ue.stuff_status == "SE" or \
                    ue.user_expertise_status == "AP" or ue.user_expertise_status == "RE":
                newdata.update({"can_approve": False})
                if ue.user_expertise_status == "AP":
                    newdata.update({"your_approve_status": "AP"})
                else:
                    newdata.update({"your_approve_status": "RE"})
            else:
                newdata.update({"can_approve": True})
            if Expertise.objects.get(work_program__id=self.kwargs['pk']).expertise_status == "WK" or \
                    Expertise.objects.get(work_program__id=self.kwargs['pk']).expertise_status == "AC":
                newdata.update({"can_approve": False})
        except:
            newdata.update({"can_comment": False})
            newdata.update({"can_approve": False})
        if request.user.is_expertise_master == True and queryset[0].work_status == "w":
            newdata.update({"can_archive": True})
        else:
            newdata.update({"can_archive": False})
        if request.user.groups.filter(name="student"):
            newdata.update({"can_add_to_folder": True})
            newdata.update({"is_student": True})
        else:
            newdata.update({"can_add_to_folder": True})
            newdata.update({"is_student": False})
        try:
            newdata.update({"rating": WorkProgramInFolder.objects.get(work_program=self.kwargs['pk'],
                                                                      folder__owner=self.request.user).work_program_rating})
            newdata.update({"id_rating": WorkProgramInFolder.objects.get(work_program=self.kwargs['pk'],
                                                                         folder__owner=self.request.user).id})
        except:
            newdata.update({"rating": False})
        competences = Competence.objects.filter(indicator_in_competencse__zun__wp_in_fs__work_program__id = self.kwargs['pk']).distinct()
        competences_dict = []
        for competence in competences:
            zuns = Zun.objects.filter(wp_in_fs__work_program__id = self.kwargs['pk'], indicator_in_zun__competence__id = competence.id)
            zuns_array = []
            for zun in zuns:
                try:
                    indicator = Indicator.objects.get(competence = competence.id,
                                                          zun__id = zun.id)
                    indicator = IndicatorSerializer(indicator).data
                except:
                    indicator = None
                # indicators_array = []
                # for indicator in indicators:
                #     indicators_array.append({"id": indicator.id, "name": indicator.name, "number": indicator.number})
                items_array = []
                items = Items.objects.filter(item_in_outcomes__item_in_wp__id = zun.id,
                                             item_in_outcomes__item_in_wp__wp_in_fs__work_program__id = self.kwargs['pk'],
                                             item_in_outcomes__item_in_wp__indicator_in_zun__competence__id = competence.id)
                for item in items:
                    items_array.append({"id": item .id, "name": item .name})
                #serializer = WorkProgramInFieldOfStudySerializerForCb(WorkProgramInFieldOfStudy.objects.get(zun_in_wp = zun.id))
                queryset = ImplementationAcademicPlan.objects.filter(
                    academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__zuns_for_cb__zun_in_wp__id = zun.id)
                serializer = ImplementationAcademicPlanSerializer(queryset, many=True)
                zuns_array.append({"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                                   "attainments": zun.attainments, "indicator": indicator,
                                   "items": items_array, "educational_program": serializer.data,
                                   "wp_in_fs": WorkProgramInFieldOfStudySerializerForCb(WorkProgramInFieldOfStudy.objects.get(zun_in_wp = zun.id)).data["id"]})
            competences_dict.append({"id": competence.id, "name": competence.name, "number": competence.number,
                                     "zuns": zuns_array})
        newdata.update({"competences": competences_dict})
        newdata = OrderedDict(newdata)
        return Response(newdata, status=status.HTTP_200_OK)


class WorkProgramDetailsWithDisciplineCodeView(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramForIndividualRoutesSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        # Note the use of `get_queryset()` instead of `self.queryset`
        # queryset = BibliographicReference.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        try:
            print('f', WorkProgram.objects.get(discipline_code=self.kwargs['discipline_code']).discipline_code)
            queryset = WorkProgram.objects.filter(discipline_code=self.kwargs['discipline_code'])
            print(queryset)
            serializer = WorkProgramForIndividualRoutesSerializer(queryset, many=True)
            print(serializer.data)
            return Response(serializer.data)
        except:
            return Response({"error": "work program with such a code was not found"},
                            status=status.HTTP_400_BAD_REQUEST)


class WorkProgramFullDetailsWithDisciplineCodeView(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramForIndividualRoutesSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        # Note the use of `get_queryset()` instead of `self.queryset`
        # queryset = BibliographicReference.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        try:
            print('f', WorkProgram.objects.get(discipline_code=self.kwargs['discipline_code']).discipline_code)
            queryset = WorkProgram.objects.filter(discipline_code=self.kwargs['discipline_code'])
            print(queryset)
            serializer = WorkProgramSerializer(queryset, many=True)
            print(serializer.data)
            return Response(serializer.data)
        except:
            return Response({"error": "work program with such a code was not found"},
                            status=status.HTTP_400_BAD_REQUEST)


# Конец блока ендпоинтов рабочей программы


class TopicsListAPI(generics.ListAPIView):
    """
    API endpoint that represents a list of Topics.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class TopicCreateAPI(generics.CreateAPIView):
    """
    API endpoint that represents a list of Topics.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
        # print (Topic.objects.filter(discipline_section = serializer.validated_data['discipline_section']).count()+1)
        serializer.save(
            number=Topic.objects.filter(discipline_section=serializer.validated_data['discipline_section']).count() + 1)


class TopicDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Topic.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        topic_section = kwargs['pk']
        try:
            Topic.new_ordinal_number(topic_section, -1)
            return self.destroy(request, *args, **kwargs)
        except:
            return Response(status=400)


class EvaluationToolListAPI(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of Evaluation Tools.
    """
    queryset = EvaluationTool.objects.all()
    serializer_class = EvaluationToolCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class EvaluationToolDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Evaluation Tool.
    """
    queryset = EvaluationTool.objects.all()
    serializer_class = EvaluationToolCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class СertificationEvaluationToolListAPI(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of Evaluation Tools.
    """
    queryset = СertificationEvaluationTool.objects.all()
    serializer_class = СertificationEvaluationToolCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class СertificationEvaluationToolDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Evaluation Tool.
    """
    queryset = СertificationEvaluationTool.objects.all()
    serializer_class = СertificationEvaluationToolCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramInFieldOfStudyListAPI(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of WorkProgramInFieldOfStudy.
    """
    queryset = WorkProgramInFieldOfStudy.objects.all()
    serializer_class = WorkProgramInFieldOfStudyCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramInFieldOfStudyDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single WorkProgramInFieldOfStudy.
    """
    queryset = WorkProgramInFieldOfStudy.objects.all()
    serializer_class = WorkProgramInFieldOfStudyCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ZunListAPI(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of Zun.
    """
    serializer_class = ZunCreateSerializer
    queryset = Zun.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        for zun in request.data:
            Zun.objects.filter(wp_in_fs__id=zun.get('wp_changeblock'), indicator_in_zun__competence=
            Indicator.objects.filter(id=int(zun.get('indicator_in_zun')))[0].competence).delete()
            print('deleted')

        for new_zun in request.data:
            if WorkProgramInFieldOfStudy.objects.filter(id=new_zun.get('wp_changeblock'),
                                                        work_program__id=new_zun.get('work_program')):
                wp_in_fs = WorkProgramInFieldOfStudy.objects.filter(id=new_zun.get('wp_changeblock'),
                                                                    work_program__id=new_zun.get('work_program'))[0]
            else:
                wp_in_fs = WorkProgramInFieldOfStudy()
                wp_in_fs.work_program_change_in_discipline_block_module = \
                WorkProgramChangeInDisciplineBlockModule.objects.filter(id=int(new_zun.get('wp_changeblock')))[0]
                wp_in_fs.work_program = WorkProgram.objects.filter(id=int(new_zun.get('work_program')))[0]
                wp_in_fs.save()
            # wp_for_response_serializer =[]
            wp_cb = \
            WorkProgramChangeInDisciplineBlockModule.objects.filter(zuns_for_cb__id=int(new_zun.get('wp_changeblock')))[
                0]
            # wp_for_response_serializer.append(WorkProgramChangeInDisciplineBlockModule.objects.filter(id = int(new_zun.get('wp_changeblock')))[0])
            new_zun = {"wp_in_fs": zun.get('wp_changeblock'),
                       "indicator_in_zun": Indicator.objects.filter(id=int(new_zun.get('indicator_in_zun')))[0].id,
                       "items": new_zun.get('items')}
            serializer = ZunCreateSaveSerializer(data=new_zun)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        response_serializer = WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer(wp_cb)
        return Response(response_serializer.data)


class ZunDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Zun.я
    """
    queryset = Zun.objects.all()
    serializer_class = ZunCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, **kwargs):
        # for competences_id in request.data.getlist('comment_id[]'):
        #     competences_id = int(competences_id)
        #     zuns = Zun.objects.filter(indicator_in_zun__competence__id = competences_id, wp_in_fs = request.data["wp_in_fs"])
        #     for zun in zuns:
        #         zun.delete()

        zuns = Zun.objects.filter(indicator_in_zun__competence__id=kwargs['competences_id'],
                                  wp_in_fs=kwargs['wp_in_fs_id'])
        for zun in zuns:
            zun.delete()
        return Response(status=204)

    # def update(self, request, *args, **kwargs):
    #     for new_zun in request.data:
    #         print ('wp_changeblock', new_zun.get('wp_changeblock'))
    #         print (Zun.objects.get(id = kwargs['pk']).items)
    #         wp_changeblock_id = int(new_zun.get('wp_changeblock'))
    #         print ('wp_changeblock_id', wp_changeblock_id)
    #         wp_cb = WorkProgramChangeInDisciplineBlockModule.objects.filter(id = wp_changeblock_id)
    #         if Zun.objects.get(id = kwargs['pk']):
    #             for item in new_zun.get('items'):
    #                 print ('item', item)
    #         new_zun = {"id": Zun.objects.get(id = kwargs['pk']).id, "wp_in_fs" : Zun.objects.get(id = kwargs['pk']).wp_in_fs.id, "indicator_in_zun" : Indicator.objects.filter(id = int(new_zun.get('indicator_in_zun')))[0].id, "items": new_zun.get('items')}
    #         print(new_zun)
    #         serializer = ZunCreateSaveSerializer(Zun.objects.get(id = kwargs['pk']), data = new_zun)
    #         #print (serializer)
    #
    #         if serializer.is_valid(raise_exception=True):
    #             old_zun = Zun.objects.get(id = kwargs['pk']).items.clear()
    #             serializer.save()
    #             print ("Сохранение прошло")
    #             #return Response(serializer.data, status=status.HTTP_201_CREATED)
    #         else:
    #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #
    #     print ('чейнж блок', wp_cb)
    #     response_serializer = WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer(wp_cb, many=True)
    #     return Response(response_serializer.data)
    #     # return Response(serializer.data)


class DisciplineSectionListAPI(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of Discipline Sections.
    """
    queryset = DisciplineSection.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DisciplineSectionDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Discipline Section.
    """
    queryset = DisciplineSection.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        descipline_section = kwargs['pk']
        try:
            DisciplineSection.new_ordinal_number(descipline_section, -1)
            return self.destroy(request, *args, **kwargs)
        except:
            return Response(status=400)


class FieldOfStudyDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """
        Удаление, редактирование, просмотр образовательной программы (направления) по id
    """
    queryset = FieldOfStudy.objects.all()
    serializer_class = FieldOfStudySerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class FieldOfStudyListCreateView(generics.ListCreateAPIView):
    """
        Отображение списка ОП(направлений), создание образовательной программы (напрвления)
    """
    queryset = FieldOfStudy.objects.all()
    serializer_class = FieldOfStudyListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'number', 'faculty', 'educational_profile']
    permission_classes = [IsRpdDeveloperOrReadOnly]


@api_view(['GET', 'POST'])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def NewOrdinalNumbersForDesciplineSectionAPI(request):
    descipline_section = request.data.get('descipline_section')
    new_ordinal_number = request.data.get('new_ordinal_number')
    try:
        DisciplineSection.new_ordinal_number(descipline_section, new_ordinal_number)
        return Response(status=200)
    except:
        return Response(status=400)


@api_view(['GET', 'POST'])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def NewOrdinalNumbersForTopicAPI(request):
    topic = request.data.get('topic')
    new_ordinal_number = request.data.get('new_ordinal_number')
    try:
        Topic.new_ordinal_number(topic, new_ordinal_number)
        return Response(status=200)
    except:
        return Response(status=400)


@api_view(['GET', 'POST'])
def NewRealtionsForWorkProgramsInFieldOfStudyAPI(request):
    old_descipline_code = request.data.get('old_descipline_code')
    new_descipline_code = request.data.get('new_descipline_code')
    try:
        WorkProgram.new_relations(old_descipline_code, new_descipline_code)
        return Response(status=200)
    except:
        return Response(status=400)


# def merge(queryset):
#     main = queryset[0]
#     tail = queryset[1:]
#
#     related = main._meta.get_fields()
#
#     valnames = dict()
#     for r in related:
#         valnames.setdefault(r.model, []).append(r.field.name)
#
#     for place in tail:
#         for model, field_names in valnames.iteritems():
#             for field_name in field_names:
#                 print(**{field_name: place})
#                 print(**{field_name: main})
#                 print()
#                 model.objects.filter(**{field_name: place}).update(**{field_name: main})
#
#         place.delete()

    #self.message_user(request, "%s is merged with other places, now you can give it a canonical name." % main)


#class MyMergedModelInstance(MergedModelInstance):
    # """
    #     Custom way to handle Issue #11: Ignore models with managed = False
    #     Also, ignore auditlog models.
    # """
    # def _handle_o2m_related_field(self, related_field: Field, alias_object: Model):
    #     if not alias_object._meta.managed and "auditlog" not in alias_object._meta.model_name:
    #         return super()._handle_o2m_related_field(related_field, alias_object)
    #
    # def _handle_m2m_related_field(self, related_field: Field, alias_object: Model):
    #     if not alias_object._meta.managed and "auditlog" not in alias_object._meta.model_name:
    #         return super()._handle_m2m_related_field(related_field, alias_object)
    #
    # def _handle_o2o_related_field(self, related_field: Field, alias_object: Model):
    #     if not alias_object._meta.managed and "auditlog" not in alias_object._meta.model_name:
    #         return super()._handle_o2o_related_field(related_field, alias_object)

@transaction.atomic()
def merge(primary_object, alias_objects):
    # if not isinstance(alias_objects, list):
    #     alias_objects = [alias_objects]
    MergedModelInstance.create(primary_object, alias_objects, keep_old=False)
    return primary_object

from django.apps import apps
from django.contrib.contenttypes.fields import GenericForeignKey


def get_generic_fields():
    """Return a list of all GenericForeignKeys in all models."""
    generic_fields = []
    for model in apps.get_models():
        for field_name, field in model.__dict__.items():
            if isinstance(field, GenericForeignKey):
                generic_fields.append(field)
    return generic_fields


@transaction.atomic()
def merge_model_instances(primary_object, alias_objects):
    """
    Merge several model instances into one, the `primary_object`.
    Use this function to merge model objects and migrate all of the related
    fields from the alias objects the primary object.
    """
    generic_fields = get_generic_fields()

    # get related fields
    related_fields = list(filter(
        lambda x: x.is_relation is True,
        primary_object._meta.get_fields()))

    many_to_many_fields = list(filter(
        lambda x: x.many_to_many is True, related_fields))

    related_fields = list(filter(
        lambda x: x.many_to_many is False, related_fields))

    # Loop through all alias objects and migrate their references to the
    # primary object
    deleted_objects = []
    deleted_objects_count = 0
    for alias_object in alias_objects:
        # Migrate all foreign key references from alias object to primary
        # object.
        for many_to_many_field in many_to_many_fields:
            alias_varname = many_to_many_field.name
            related_objects = getattr(alias_object, alias_varname)
            for obj in related_objects.all():
                try:
                    # Handle regular M2M relationships.
                    getattr(alias_object, alias_varname).remove(obj)
                    getattr(primary_object, alias_varname).add(obj)
                except AttributeError:
                    # Handle M2M relationships with a 'through' model.
                    # This does not delete the 'through model.
                    # TODO: Allow the user to delete a duplicate 'through' model.
                    through_model = getattr(alias_object, alias_varname).through
                    kwargs = {
                        many_to_many_field.m2m_reverse_field_name(): obj,
                        many_to_many_field.m2m_field_name(): alias_object,
                    }
                    through_model_instances = through_model.objects.filter(**kwargs)
                    for instance in through_model_instances:
                        # Re-attach the through model to the primary_object
                        setattr(
                            instance,
                            many_to_many_field.m2m_field_name(),
                            primary_object)
                        instance.save()
                        # TODO: Here, try to delete duplicate instances that are
                        # disallowed by a unique_together constraint

        for related_field in related_fields:
            if related_field.one_to_many:
                alias_varname = related_field.get_accessor_name()
                related_objects = getattr(alias_object, alias_varname)
                for obj in related_objects.all():
                    field_name = related_field.field.name
                    setattr(obj, field_name, primary_object)
                    obj.save()
            elif related_field.one_to_one or related_field.many_to_one:
                alias_varname = related_field.name
                related_object = getattr(alias_object, alias_varname)
                primary_related_object = getattr(primary_object, alias_varname)
                if primary_related_object is None:
                    setattr(primary_object, alias_varname, related_object)
                    primary_object.save()
                elif related_field.one_to_one:
                    # self.stdout.write("Deleted {} with id {}\n".format(
                    #     related_object, related_object.id))
                    related_object.delete()

        for field in generic_fields:
            filter_kwargs = {}
            filter_kwargs[field.fk_field] = alias_object._get_pk_val()
            filter_kwargs[field.ct_field] = field.get_content_type(alias_object)
            related_objects = field.model.objects.filter(**filter_kwargs)
            for generic_related_object in related_objects:
                setattr(generic_related_object, field.name, primary_object)
                generic_related_object.save()

        if alias_object.id:
            print('!!')
            deleted_objects += [alias_object]
            # self.stdout.write("Deleted {} with id {}\n".format(
            #     alias_object, alias_object.id))
            alias_object.delete()
            deleted_objects_count += 1

@api_view(['GET', 'POST'])
def ChangeItemsView(request):
    try:
        item = Items.objects.filter(id = request.data.get('old_item_id'))[0]
        other_item = Items.objects.filter(name = item.name).exclude(id = item.id)
        merge(item, other_item)
    except:
        return Response(status=400)
    return Response(status=200)



class FileUploadWorkProgramOutcomesAPIView(APIView):
    """
    API эндпоинт для добавления данных о РПД из csv-файла, спарсенного с online.edu.ru
    """

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            data = handle_uploaded_file_v2(request.FILES['file'], str(request.FILES['file']))
            print(data)
            data.fillna('не задано', inplace=True)
            for i in range(len(data)):
                outcomes = data['KEYWORDS'][i].split(', ')
                outcomes_items = []
                print(outcomes)

                for o in outcomes:
                    # o = o.capitalize()
                    o = str(o)
                    print(o)

                    if Items.objects.filter(name=o).exists():
                        print('items finding', Items.objects.filter(name=o)[0])
                        outcomes_items.append(Items.objects.filter(name=o)[0])
                    else:
                        print('попытка сохранения')
                        item = Items(name=o)
                        item.save()
                        outcomes_items.append(item)
                        print('после сохранения', item)

                outcomes_items = Items.objects.filter(name__in=outcomes_items)
                print("Outcomes--", outcomes_items)

                if WorkProgram.objects.filter(discipline_code=data['DIS_CODE'][i]).exists():
                    # если запись уже есть то апдейтим
                    wp_obj = WorkProgram.objects.filter(discipline_code=data['DIS_CODE'][i])[0]
                    if len(outcomes_items) != 0:
                        for item in outcomes_items:
                            print('item', item)
                            # print ('jj', OutcomesOfWorkProgram.objects.filter(item = item, workprogram = wp_obj)[0])
                            if OutcomesOfWorkProgram.objects.filter(item=item, workprogram=wp_obj).exists():
                                print('результат существует')
                            else:
                                out_obj = OutcomesOfWorkProgram(item=item, workprogram=wp_obj, masterylevel="2")
                                out_obj.save()
                                print('item', item, 'was saved for')
                else:
                    print('Рпд не найдена')
            return Response({"Message": "All data processed"}, status=status.HTTP_201_CREATED)

        except:
            return Response({"Message": "Data not loaded"}, status=status.HTTP_400_BAD_REQUEST)


# Блок эндпоинтов рабочей программы


class BibliographicReferenceListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BibliographicReferenceSerializer
    queryset = BibliographicReference.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['description']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class BibliographicReferenceDestroyView(generics.DestroyAPIView):
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class BibliographicReferenceUpdateView(generics.UpdateAPIView):
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class BibliographicReferenceDetailsView(generics.RetrieveAPIView):
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramBibliographicReferenceUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramBibliographicReferenceUpdateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class BibliographicReferenceInWorkProgramList(generics.ListAPIView):
    serializer_class = BibliographicReferenceSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        # Note the use of `get_queryset()` instead of `self.queryset`
        # queryset = BibliographicReference.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        queryset = WorkProgram.objects.get(id=self.kwargs['workprogram_id']).bibliographic_reference.all()
        serializer = BibliographicReferenceSerializer(queryset, many=True)
        return Response(serializer.data)


class EvaluationToolInWorkProgramList(generics.ListAPIView):
    serializer_class = EvaluationToolForWorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]
    queryset = EvaluationTool

    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        try:
            queryset = EvaluationTool.objects.filter(evaluation_tools__in=DisciplineSection.objects.filter(
                work_program__id=self.kwargs['workprogram_id'])).distinct()
            serializer = EvaluationToolForWorkProgramSerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response(status=400)




class FieldOfStudiesForWorkProgramList(generics.ListAPIView):
    serializer_class = EvaluationToolForWorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def list(self, request, **kwargs):
        """
        Вывод учебных планов для одной рабочей программы по id
        """

        try:
            queryset = FieldOfStudy.objects.filter(
                implementation_academic_plan_in_field_of_study__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__id
                =self.kwargs['workprogram_id']).distinct()
            serializer = FieldOfStudySerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response(status=400)


class WorkProgramInFieldOfStudyForWorkProgramList(generics.ListAPIView):
    serializer_class = WorkProgramInFieldOfStudyForCompeteceListSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def list(self, request, **kwargs):
        """
        Вывод учебных планов для одной рабочей программы по id
        """
        queryset = WorkProgramInFieldOfStudy.objects.filter(
            work_program__id
            = self.kwargs['workprogram_id']).distinct()
        serializer = WorkProgramInFieldOfStudyForCompeteceListSerializer(queryset, many=True)
        return Response(serializer.data)
        try:
            queryset = WorkProgramInFieldOfStudy.objects.filter(
                work_program__id
                = self.kwargs['workprogram_id']).distinct()
            serializer = WorkProgramInFieldOfStudySerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response(status=400)


# Блок эндпоинтов для обрабоки файлов

from dataprocessing.serializers import FileUploadSerializer


def handle_uploaded_file_v2(file, filename):
    """
    Обработка файла csv спарсенного с online.edu.ru
    """

    if not os.path.exists('upload/'):
        os.mkdir('upload/')
    path = 'upload/' + filename

    with open(path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    df = pandas.read_csv(path, sep=';', encoding='utf-8')
    # df.dropna(subset=['Направления подготовки'], inplace = True)
    # df = df.drop(['Unnamed: 0'], axis=1)
    return df


def handle_uploaded_file(file, filename):
    """
    Обработка файла csv спарсенного с online.edu.ru
    """

    if not os.path.exists('upload/'):
        os.mkdir('upload/')
    path = 'upload/' + filename

    with open(path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    df = pandas.read_csv(path, sep=',', encoding='utf-8')
    df.dropna(subset=['Направления подготовки'], inplace=True)
    df = df.drop(['Unnamed: 0'], axis=1)
    return df


class FileUploadWorkProgramAPIView(APIView):
    """
    API эндпоинт для добавления данных о РПД из csv-файла, спарсенного с online.edu.ru
    """

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = handle_uploaded_file(request.FILES['file'], str(request.FILES['file']))
        data.fillna('не задано', inplace=True)
        for i in range(len(data)):
            try:

                # получаем список всех объектов-пререквизитов для дисциплины
                prerequisite = data['Ключевые слова-пререквизиты'][i].split(', ')
                prerequisite_items = []

                for p in prerequisite:
                    p = p.capitalize()
                    if Items.objects.filter(name=p).exists():
                        prerequisite_items.append(Items.objects.get(name=p))
                    else:
                        item = Items(name=p)
                        item.save()
                        prerequisite_items.append(item)

                prerequisite_items = Items.objects.filter(name__in=prerequisite_items)
                print("Pre--", prerequisite_items)

                # получаем список всех объектов-результатов для дисциплины
                outcomes = data['Ключевые слова содержания'][i].split(', ')
                outcomes_items = []

                for o in outcomes:
                    o = o.capitalize()

                    if Items.objects.filter(name=o).exists():
                        outcomes_items.append(Items.objects.get(name=o))
                    else:
                        item = Items(name=o)
                        item.save()
                        outcomes_items.append(item)

                outcomes_items = Items.objects.filter(name__in=outcomes_items)
                print("Outcomes--", outcomes_items)

                # получаем список всех направленний для дисциплины
                field_of_study = data['Направления подготовки'][i].split('                                         ')
                field_of_study.remove(field_of_study[len(field_of_study) - 1])
                fs_list = []
                for f in field_of_study:
                    number, title, empty = re.split('.([А-Я][^А-Я]*)', f)
                    if FieldOfStudy.objects.filter(number=number, title=title).exists():
                        fs_list.append(FieldOfStudy.objects.get(number=number, title=title))
                    else:
                        fs_obj = FieldOfStudy(number=number, title=title)
                        fs_obj.save()
                        fs_list.append(fs_obj)

                fs_list = FieldOfStudy.objects.filter(number__in=fs_list)
                print(fs_list)

                if WorkProgram.objects.filter(title=data['Название курса'][i]).exists():
                    # если запись уже есть то апдейтим
                    wp_obj = WorkProgram.objects.get(title=data['Название курса'][i])
                    if len(prerequisite_items) != 0:
                        for item in prerequisite_items:
                            prereq_obj = PrerequisitesOfWorkProgram(item=item, workprogram=wp_obj)
                            prereq_obj.save()
                    if len(outcomes_items) != 0:
                        for item in outcomes_items:
                            out_obj = OutcomesOfWorkProgram(item=item, workprogram=wp_obj)
                            out_obj.save()
                    """
                       Данная таблица больше не используется. Для дальнейшей работы код нужно заменить.
                       Связь направления и РПД реализована через таблицу WorkProgramInFieldOfStudy.
                    """
                    # for fs in fs_list:
                    #    fswp_obj = FieldOfStudyWorkProgram(field_of_study = fs, work_program = wp_obj)
                    #    fswp_obj.save()

                else:

                    # если нет, то записываем в БД и апдейтим
                    wp_obj = WorkProgram(title=data['Название курса'][i])
                    wp_obj.save()
                    if len(prerequisite_items) != 0:
                        for item in prerequisite_items:
                            prereq_obj = PrerequisitesOfWorkProgram(item=item, workprogram=wp_obj)
                            prereq_obj.save()

                    if len(outcomes_items) != 0:
                        for item in outcomes_items:
                            out_obj = OutcomesOfWorkProgram(item=item, workprogram=wp_obj)
                            out_obj.save()
                    """
                       Данная таблица больше не используется. Для дальнейшей работы код нужно заменить.
                       Связь направления и РПД реализована через таблицу WorkProgramInFieldOfStudy.
                    """
                    # for fs in fs_list:
                    #    fswp_obj = FieldOfStudyWorkProgram(field_of_study = fs, work_program = wp_obj)
                    #    fswp_obj.save()


            except:
                print(i)
                continue;
        return Response(status=200)


from discipline_code import IPv4_code_ver2


def handle_uploaded_csv(file, filename):
    """
    Обработка файла csv
    """

    if not os.path.exists('upload/'):
        os.mkdir('upload/')
    path = 'upload/' + filename

    with open(path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    in_df = pandas.read_excel(path)
    sys_df = pandas.DataFrame({'EP_ID':[], 'SUBJECT_CODE':[], 'CYCLE':[], 'MODULE_ID':[], 'COMPONENT':[],
                               'ISU_SUBJECT_ID':[], 'SUBJECT':[], 'IMPLEMENTOR_ID':[], 'IMPLEMENTOR':[],
                               'SUBFIELDCODE':[], 'MAJOR_NAME':[], 'OP_ID':[], 'SUBFIELDNAME':[],
                               'FACULTY_ID':[], 'FACULTY':[], 'OGNP_ID':[],'OGNP':[], 'YEAR':[], 'DEGREE':[],
                               'SEMESTER':[], 'LANGUAGE':[], 'CREDITS':[], 'LECTURE':[], 'PRACTICE':[], 'LAB':[],
                               'EXAM':[], 'PASS':[], 'DIFF':[], 'CP':[], 'SRS':[], 'ISOPTION':[], 'SEM_INFO':[],
                               'DIS_CODE':[], 'VERSION':[]})

    # df.to_excel("discipline_code/discipline_bank_updated5.xlsx", index=False)
    # sys_df = pandas.read_excel('discipline_code/discipline_bank_updated5.xlsx')
    print('IPv4_code generating')
    processed_data, db = IPv4_code_ver2.generate_df_w_unique_code(in_df, sys_df)
    now = datetime.datetime.now().isoformat("-").split(".")[0].replace(":","-")
    db.to_excel("discipline_code/discipline_bank_updated_{}.xlsx".format(now), index=False)
    print(processed_data.head())
    return processed_data


class FileUploadAPIView(APIView):
    """
    API-endpoint для загрузки файла sub_2019_2020_new
    """

    def post(self, request):
        print('Working')

        # serializer = FileUploadSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)

        data = handle_uploaded_csv(request.FILES['file'], str(request.FILES['file']))
        print(len(data['SUBJECT'].drop_duplicates().to_list()))
        # импортируем json с порядком модулей
        with open('workprogramsapp/modules-order.json', 'r',               #with open('/application/workprogramsapp/modules-order.json', 'r',
                  encoding='utf-8') as fh:  # открываем файл на чтение
            order = json.load(fh)

        # data['CREDITS'].fillna('0', inplace=True)
        # берем только первые 3 семестраа
        # data = data[(data['SEMESTER']<5)]

        print('============Создаю рпд и направления============')
        # создаем рпд и направления
        fs_count, wp_count, ap_count = 0, 0, 0
        for i in list(data.index.values):
            try:
                #print('clone', clone)
                print('---Новая строка---')
                if data['DEGREE'][i].strip() == 'Академический бакалавр':
                    qualification = 'bachelor'
                elif data['DEGREE'][i].strip() == 'Магистр':
                    qualification = 'master'
                else:
                    qualification = 'specialist'
                print(qualification)

                credit_units = [0 for i in range(0, 12)]
                units = data.loc[
                    (data['SUBFIELDNAME'] == data['SUBFIELDNAME'][i]) & (data['CYCLE'] == data['CYCLE'][i]) & (
                                data['COMPONENT'] == data['COMPONENT'][i]) & (data['SUBJECT'] == data['SUBJECT'][i])
                    & (data['YEAR'] == data['YEAR'][i])
                    ]
                print(units.index.values)
                # units = data[(data['SUBFIELDNAME']==data['SUBFIELDNAME'][i])&(data['CYCLE']==data['CYCLE'][i])&(data['COMPONENT']==data['COMPONENT'][i])&(data['SUBJECT']==data['SUBJECT'][i])].drop_duplicates()
                try:
                    for u in units.index.values:
                        if pandas.isna(units["CREDITS"][u]) or units["CREDITS"][u] == 0:
                            credit_units[int(units["SEMESTER"][u]) - 1] = "-"
                        elif units["SEMESTER"][u] == ".":
                            credit_units[11] = units["CREDITS"][u]
                        else:
                            credit_units[int(units["SEMESTER"][u]) - 1] = int(units["CREDITS"][u])
                    print('credit_units', credit_units)
                except:
                    print("mistake with units")
                    pass
                # проверяем если ОП уже существует в БД
                if FieldOfStudy.objects.filter(number=data['SUBFIELDCODE'][i], qualification=qualification).exists():
                    fs_obj = FieldOfStudy.objects.get(number=data['SUBFIELDCODE'][i], qualification=qualification)
                else:
                    # Записываем в БД новую ОП
                    #
                    fs_obj = FieldOfStudy(number=data['SUBFIELDCODE'][i], title=data['MAJOR_NAME'][i].strip(),
                                          qualification=qualification)
                    fs_obj.save()
                    fs_count += 1

                print('Направление подготовки: ', fs_obj)
                # Проверяем если Дисцпилина уже есть в БД
                #
                print(data['SUBJECT'][i].strip(), data['DIS_CODE'][i])
                regex = r'^[0-9]{2}\.' + str(data['DIS_CODE'][i])[3] + '.'
                print(regex)
                #TODO: ОГНП НЕКОРРЕКТНО СООТНОСЯТСЯ
                wp_list = WorkProgram.objects.filter(title=data['SUBJECT'][i].strip(),
                                                     zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__name=
                                                     data['COMPONENT'][i].strip(),
                                                     zuns_for_wp__work_program_change_in_discipline_block_module__change_type=
                                                     data['ISOPTION'][i],
                                                     credit_units=",".join(
                                                         map(str, credit_units)),
                                                     discipline_code__iregex=regex).distinct()
                print('Найдена РПД: ', wp_list)
                #print(WorkProgram.objects.get(discipline_code=data['DIS_CODE'][i], title=data['SUBJECT'][i].strip()))
                if wp_list.exists():
                    wp_obj = WorkProgram.objects.get(pk=wp_list[0].id)
                    if not wp_obj.old_discipline_code:
                        wp_obj.old_discipline_code=wp_obj.discipline_code
                        wp_obj.discipline_code = data['DIS_CODE'][i]
                        wp_obj.save()
                        print("Я взял старую РПД!!!")
                    elif data['DIS_CODE'][i] != wp_obj.discipline_code:
                        print('мы ее нашли', WorkProgram.objects.filter(discipline_code=data['DIS_CODE'][i], title=data['SUBJECT'][i].strip()).distinct())
                        try:
                            wp_obj = WorkProgram.objects.filter(discipline_code=data['DIS_CODE'][i], title=data['SUBJECT'][i].strip())[0]
                        except:
                            print("Я СКЛОНИРОВАЛ!!!")
                            clone = True
                            wp_obj = WorkProgram.clone_programm(wp_obj.id)
                            wp_obj.discipline_code = data['DIS_CODE'][i]
                            wp_obj.save()


                    """   # если да, то получаем объект
                    #
                    print('1', WorkProgram.objects.filter(title=data['SUBJECT'][i].strip(),
                                                          discipline_code=data['DIS_CODE'][i]))
                    wp_obj = WorkProgram.objects.get(title=data['SUBJECT'][i].strip(),
                                                     discipline_code=data['DIS_CODE'][i])
                    wp_obj.discipline_code = data['DIS_CODE'][i]  # заменить в параметры
                    wp_obj.credit_units = ",".join(map(str, credit_units))  # убрать
                    print('2', wp_obj)"""
                else:
                    # если нет, то записываем в БД

                    wp_obj = WorkProgram(title=data['SUBJECT'][i].strip(), discipline_code=data['DIS_CODE'][i],
                                         subject_code=data['SUBJECT_CODE'][i], qualification=qualification,
                                         credit_units=",".join(map(str, credit_units)))
                    print("Я СОЗДАЛ!!!")
                    wp_obj.save()
                    print(wp_obj.id)
                    wp_count += 1
                certification_for_wp = СertificationEvaluationTool.objects.filter(work_program=wp_obj)
                semester = 1
                if not СertificationEvaluationTool.objects.filter(work_program=wp_obj).exists():
                    print('найдено оценочное средство')
                    semester = 1
                else:
                    print('начало цыкола обработки семестров')
                    for tool in certification_for_wp:
                        print('замена номеров оценочных средств')
                        if tool.semester >= semester:
                            semester = tool.semester + 1
                if not СertificationEvaluationTool.objects.filter(work_program=wp_obj).exists():
                    print('создаются оценочные срадства')
                    if bool(data['PASS'][i]):
                        print('попытка 1')
                        СertificationEvaluationTool.objects.create(work_program=wp_obj, type="3", semester=semester)
                    if bool(data['DIFF'][i]):
                        print('попытка 2')
                        СertificationEvaluationTool.objects.create(work_program=wp_obj, type="2", semester=semester)
                    if bool(data['EXAM'][i]):
                        print('попытка 3')
                        СertificationEvaluationTool.objects.create(work_program=wp_obj, type="1", semester=semester)
                    if bool(data['CP'][i]):
                        print('попытка 4')
                        СertificationEvaluationTool.objects.create(work_program=wp_obj, type="4", semester=semester)
                    print('созданы оценочные срадства')
                # try:
                #     lecture_array = [float(x) for x in wp_obj.lecture_hours.split(",")]
                # except:
                #     wp_obj.lecture_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.practice_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.lab_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.srs_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                # if ',' not in wp_obj.lecture_hours and '.' not in wp_obj.lecture_hours:
                #print('1', len(list(wp_obj.lecture_hours)))
                #print('2', not wp_obj.lecture_hours)
                if not wp_obj.lecture_hours:
                    print('попытка создать массивыдля данных о семестрах')
                    wp_obj.lecture_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                    wp_obj.practice_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                    wp_obj.lab_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                    wp_obj.srs_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                    print('условие длинны лекционных часов прошло')
                if len(list(wp_obj.lecture_hours)) < 6:
                    print('2 попытка создать массивыдля данных о семестрах')
                    wp_obj.lecture_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                    wp_obj.practice_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                    wp_obj.lab_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                    wp_obj.srs_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                    print('2 условие длинны лекционных часов прошло')
                print('попытка вбить часы')
                lecture_array = [float(x) for x in wp_obj.lecture_hours.split(",")]
                practise_array = [float(x) for x in wp_obj.practice_hours.split(",")]
                lab_array = [float(x) for x in wp_obj.lab_hours.split(",")]
                srs_array = [float(x) for x in wp_obj.srs_hours.split(",")]
                print('семестр', data['SEMESTER'][i])
                print('лекционные часы:', float(str(data['LECTURE'][i]).replace(",", ".")))
                print(lecture_array)
                print(lecture_array[int(data['SEMESTER'][i]) - 1])
                lecture_array[int(data['SEMESTER'][i]) - 1] = float(str(data['LECTURE'][i]).replace(",", "."))
                print('практические часы:', float(str(data['PRACTICE'][i]).replace(",", ".")))
                practise_array[int(data['SEMESTER'][i]) - 1] = float(str(data['PRACTICE'][i]).replace(",", "."))
                print('лабораторные часы:', float(str(data['LAB'][i]).replace(",", ".")))
                lab_array[int(data['SEMESTER'][i]) - 1] = float(str(data['LAB'][i]).replace(",", "."))
                print('срс часы:', float(str(data['SRS'][i]).replace(",", ".")))
                srs_array[int(data['SEMESTER'][i]) - 1] = float(str(data['SRS'][i]).replace(",", "."))

                wp_obj.lecture_hours = str(lecture_array)[1:-1].replace(" ", "")
                wp_obj.practice_hours = str(practise_array)[1:-1].replace(" ", "")
                wp_obj.lab_hours = str(lab_array)[1:-1].replace(" ", "")
                wp_obj.srs_hours = str(srs_array)[1:-1].replace(" ", "")

                wp_obj.wp_isu_id = int(data['ISU_SUBJECT_ID'][i])

                if data['LANGUAGE'][i].strip().find("Русский") != -1 and data['LANGUAGE'][i].strip().find(
                        "Английский") != -1:
                    wp_obj.language = "ru/en"
                elif data['LANGUAGE'][i].strip() == "Русский":
                    wp_obj.language = "ru"
                elif data['LANGUAGE'][i].strip() == "Английский":
                    wp_obj.language = "en"
                elif data['LANGUAGE'][i].strip() == "Казахский":
                    wp_obj.language = "kz"
                elif data['LANGUAGE'][i].strip() == "Немецкий":
                    wp_obj.language = "de"

                try:
                    struct_unit=StructuralUnit.objects.get(title=data['IMPLEMENTOR'][i].strip(), isu_id=data['IMPLEMENTOR_ID'][i])
                except:
                    struct_unit=StructuralUnit.objects.create(title=data['IMPLEMENTOR'][i].strip(), isu_id=data['IMPLEMENTOR_ID'][i])
                wp_obj.structural_unit_id=struct_unit.id
                wp_obj.save()
                print('Рабочая программа дисциплины: ', wp_obj)

                """
                   Данная таблица больше не используется. Для дальнейшей работы код нужно заменить.
                   Связь направления и РПД реализована через таблицу WorkProgramInFieldOfStudy.
                """
                # if FieldOfStudyWorkProgram.objects.filter(field_of_study = fs_obj, work_program = wp_obj).exists():
                #    print('FieldOfStudyWorkProgram exist')
                # else:
                # Теперь записываем в FieldOfStudyWorkProgram
                # fswp_obj = FieldOfStudyWorkProgram(field_of_study = fs_obj, work_program = wp_obj)
                # fswp_obj.save()

                # print('Связь рабочей программы и дисциплины: done')

                if AcademicPlan.objects.filter(qualification=qualification, year=data['YEAR'][i],
                                               educational_profile=data['SUBFIELDNAME'][i].strip()).exists():
                    ap_obj = AcademicPlan.objects.get(qualification=qualification, year=data['YEAR'][i],
                                                      educational_profile=data['SUBFIELDNAME'][i].strip())
                    # EP_ID - учебный план
                    ap_obj.ap_isu_id=int(data['EP_ID'][i])
                    ap_obj.save()
                    print('старый', ap_obj)

                else:
                    # if data['TYPELEARNING'][i].strip() == "традиционное":
                    #     typelearning = 'internal'
                    # else:
                    #     typelearning = 'extramural'
                    typelearning = 'internal'
                    print(typelearning)
                    ap_obj = AcademicPlan(education_form=typelearning, qualification=qualification,
                                          year=data['YEAR'][i], educational_profile=data['SUBFIELDNAME'][i].strip(),
                                          ap_isu_id=int(data['EP_ID'][i]))
                    ap_obj.save()
                    ap_count += 1
                    print('новый', ap_obj)

                print('Учебный план: ', ap_obj)

                if ImplementationAcademicPlan.objects.filter(academic_plan=ap_obj, field_of_study=fs_obj,
                                                             year=data['YEAR'][i]).exists():
                    iap_obj=ImplementationAcademicPlan.objects.get(academic_plan=ap_obj, field_of_study=fs_obj,
                                                              year=data['YEAR'][i])
                    iap_obj.op_isu_id=int(data['OP_ID'][i])
                    iap_obj.save()
                    # OP_ID - образовательная программа
                    print('ImplementationAcademicPlan exist')
                else:
                    iap_obj = ImplementationAcademicPlan(academic_plan=ap_obj, field_of_study=fs_obj,
                                                         year=data['YEAR'][i], op_isu_id=int(data['OP_ID'][i]))
                    iap_obj.save()
                print('Связь учебного плана и направления: done')

                if DisciplineBlock.objects.filter(name=data['CYCLE'][i].strip(), academic_plan=ap_obj).exists():
                    db = DisciplineBlock.objects.get(name=data['CYCLE'][i].strip(), academic_plan=ap_obj)
                else:
                    db = DisciplineBlock(name=data['CYCLE'][i].strip(), academic_plan_id=ap_obj.id, )
                    db.save()

                print('Блок: ', db)

                try:
                    o = order[data['COMPONENT'][i].strip()]
                except:
                    order.update({data['COMPONENT'][i].strip(): len(order)})
                    o = order[data['COMPONENT'][i].strip()]

                if DisciplineBlockModule.objects.filter(name=data['COMPONENT'][i].strip(),
                                                        descipline_block=db).exists():
                    mdb = DisciplineBlockModule.objects.get(name=data['COMPONENT'][i].strip(), descipline_block=db)
                else:
                    mdb = DisciplineBlockModule(name=data['COMPONENT'][i].strip(), descipline_block=db,
                                                order=o)
                    mdb.save()

                print('Модуль в блоке: ', mdb)

                if (data['ISOPTION'][i] == 'Optionally' and WorkProgramChangeInDisciplineBlockModule.objects.filter(
                        discipline_block_module=mdb, change_type=data['ISOPTION'][i], subject_code = data['SUBJECT_CODE'][i]).exists()):
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module=mdb,
                                                                                       change_type=data['ISOPTION'][i], subject_code = data['SUBJECT_CODE'][i]
                                                                                       )
                    if WorkProgramInFieldOfStudy.objects.filter(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj)
                    else:
                        wpinfs = WorkProgramInFieldOfStudy(work_program_change_in_discipline_block_module=wpchangemdb,
                                                           work_program=wp_obj)
                        wpinfs.save()
                    # wpchangemdb.work_program.add(wp_obj)
                elif WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=mdb,
                                                                             change_type=data['ISOPTION'][i],
                                                                             work_program=wp_obj
                                                                             ).exists():
                    print('exist', wp_obj)

                else:
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule()
                    wpchangemdb.credit_units = ",".join(map(str, credit_units))
                    print('credit_units', credit_units)
                    print('wpchangemdb.credit_units', wpchangemdb.credit_units)
                    wpchangemdb.change_type = data['ISOPTION'][i]
                    wpchangemdb.discipline_block_module = mdb
                    wpchangemdb.subject_code = data['SUBJECT_CODE'][i]
                    wpchangemdb.save()


                    if WorkProgramInFieldOfStudy.objects.filter(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj)
                    else:


                        wpinfs = WorkProgramInFieldOfStudy(work_program_change_in_discipline_block_module=wpchangemdb,
                                                               work_program=wp_obj)
                        wpinfs.save()
                try:
                    if WorkProgram.objects.filter(title=data['SUBJECT'][i].strip(),
                                                  zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__name=
                                                  data['COMPONENT'][i].strip(),
                                                  # zuns_for_wp__work_program_change_in_discipline_block_module__change_type=
                                                  # data['ISOPTION'][i],
                                                  zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module= mdb,
                                                  ).count() > 1:
                        # wp_obj2 = WorkProgram.objects.filter(title=data['SUBJECT'][i].strip(),
                        #                                     zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__name=
                        #                                     data['COMPONENT'][i].strip(),
                        #                                     zuns_for_wp__work_program_change_in_discipline_block_module__change_type=
                        #                                     data['ISOPTION'][i],
                        #                                     zuns_for_wp__work_program_change_in_discipline_block_module = wpchangemdb,
                        #                                     )[0]
                        # print ('НАЙДЕНА ПОВТОРНАЯ РПД',  wp_obj)
                        # wpinfs.work_program = wp_obj2
                        # wpinfs.save()
                        if clone:
                            print ('УДАЛЯЕТСЯ СКЛОНИРОВАННАЯ рпд')
                            wp_obj.delete()
                            wpchangemdb.delete()
                except:
                    pass

                print('Рабочая программа дисциплины записана в модуль: done')

                # if Zun.objects.filter(wp_in_fs = wpinfs).exists():
                #     pass
                # else:
                #     zun = Zun(wp_in_fs = wpinfs)
                #     zun.save()
                #     #wpchangemdb.work_program.add(wp_obj)

            except  Exception as e:
                print(e)
                print('Строка ', i, 'не записалась, проверьте на опечатки или пустые значения')
                continue;

        print(f'Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}')

        return Response(status=200)


class AcademicPlanListAPIView(generics.ListAPIView):
    serializer_class = AcademicPlanSerializerForList
    queryset = AcademicPlan.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['academic_plan_in_field_of_study__qualification',
                     'academic_plan_in_field_of_study__title',
                     'academic_plan_in_field_of_study__year',
                     'academic_plan_in_field_of_study__field_of_study__title']
    ordering_fields = ['academic_plan_in_field_of_study__qualification',
                       'academic_plan_in_field_of_study__title',
                       'academic_plan_in_field_of_study__year',
                       'academic_plan_in_field_of_study__field_of_study__title']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class AcademicPlanListShortAPIView(generics.ListAPIView):
    serializer_class = AcademicPlanShortSerializer
    queryset = AcademicPlan.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['academic_plan_in_field_of_study__qualification',
                     'academic_plan_in_field_of_study__title',
                     'academic_plan_in_field_of_study__year',
                     'academic_plan_in_field_of_study__field_of_study__title']
    ordering_fields = ['academic_plan_in_field_of_study__qualification',
                       'academic_plan_in_field_of_study__title',
                       'academic_plan_in_field_of_study__year',
                       'academic_plan_in_field_of_study__field_of_study__title']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class AcademicPlanCreateAPIView(generics.CreateAPIView):
    serializer_class = AcademicPlanCreateSerializer
    queryset = AcademicPlan.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        AcademicPlan.clone_descipline_blocks(self, serializer)


class AcademicPlanDestroyView(generics.DestroyAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class AcademicPlanUpdateView(generics.UpdateAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class AcademicPlanDetailsView(generics.RetrieveAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, **kwargs):

        queryset = AcademicPlan.objects.filter(pk=self.kwargs['pk'])
        serializer = AcademicPlanSerializer(queryset, many=True, context={'request': request})
        if len(serializer.data) == 0:
            return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)
        newdata = dict(serializer.data[0])
        try:
            newdata.update({"rating": AcademicPlanInFolder.objects.get(academic_plan=self.kwargs['pk'],
                                                                       folder__owner=self.request.user).academic_plan_rating})
            newdata.update({"id_rating": AcademicPlanInFolder.objects.get(academic_plan=self.kwargs['pk'],
                                                                          folder__owner=self.request.user).id})
        except:
            newdata.update({"rating": False})
        newdata = OrderedDict(newdata)
        return Response(newdata, status=status.HTTP_200_OK)


class ImplementationAcademicPlanAPIView(generics.CreateAPIView):
    """
    API endpoint that represents a list of Topics.
    """
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ImplementationAcademicPlanListAPIView(generics.ListAPIView):
    serializer_class = ImplementationAcademicPlanSerializer
    queryset = ImplementationAcademicPlan.objects.all()
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    search_fields = ['academic_plan__educational_profile',
                     'field_of_study__title',
                     'field_of_study__number',
                     'field_of_study__qualification',
                     'academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__prerequisites__name',
                     'academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__outcomes__name',
                     ]
    filterset_fields = ['title',
                        'field_of_study__title',
                        'field_of_study__number',
                        'field_of_study__qualification',
                        'academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__prerequisites__name',
                        'academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__outcomes__name',
                        'academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__prerequisites__id',
                        'academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__outcomes__id',
                        'academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__structural_unit__title',
                        ]
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ImplementationAcademicPlanDestroyView(generics.DestroyAPIView):
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ImplementationAcademicPlanUpdateView(generics.UpdateAPIView):
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ImplementationAcademicPlanDetailsView(generics.RetrieveAPIView):
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramChangeInDisciplineBlockModuleListAPIView(generics.ListAPIView):
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['educational_profile']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramChangeInDisciplineBlockModuleCreateAPIView(generics.CreateAPIView):
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramChangeInDisciplineBlockModuleDestroyView(generics.DestroyAPIView):
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramChangeInDisciplineBlockModuleDetailsView(generics.RetrieveAPIView):
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramChangeInDisciplineBlockModuleUpdateView(generics.UpdateAPIView):
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    serializer_class = WorkProgramChangeInDisciplineBlockModuleUpdateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DisciplineBlockModuleCreateAPIView(generics.CreateAPIView):
    serializer_class = DisciplineBlockModuleCreateSerializer
    queryset = DisciplineBlockModule.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(editor=self.request.user)


class DisciplineBlockModuleDestroyView(generics.DestroyAPIView):
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DisciplineBlockModuleUpdateView(generics.UpdateAPIView):
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramInFieldOfStudyListView(generics.ListAPIView):
    """
        Отображение списка ОП(направлений), создание образовательной программы (напрвления)
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramInFieldOfStudySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['approval_date', 'authors', 'discipline_code', 'qualification']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ZunListAPIView(generics.ListAPIView):
    serializer_class = ZunSerializer
    queryset = Zun.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ZunCreateAPIView(generics.CreateAPIView):
    serializer_class = ZunSerializer
    queryset = Zun.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ZunDestroyView(generics.DestroyAPIView):
    queryset = Zun.objects.all()
    serializer_class = ZunSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ZunDetailsView(generics.RetrieveAPIView):
    queryset = Zun.objects.all()
    serializer_class = ZunSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ZunUpdateView(generics.UpdateAPIView):
    queryset = Zun.objects.all()
    serializer_class = ZunSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


# Конец блока ендпоинтов рабочей программы


class DisciplineBlockModuleShortListView(generics.ListAPIView):
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleCreateSerializer
    search_fields = ['name', 'descipline_block__name', 'descipline_block__academic_plan__educational_profile']
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['name', 'descipline_block__name', 'descipline_block__academic_plan__educational_profile']
    filterset_fields = ['change_blocks_of_work_programs_in_modules__work_program__prerequisites',
                        'change_blocks_of_work_programs_in_modules__work_program__outcomes',
                        'change_blocks_of_work_programs_in_modules__work_program__structural_unit__title',
                        'descipline_block__academic_plan__academic_plan_in_field_of_study__qualification']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DisciplineBlockModuleDetailListView(generics.ListAPIView):
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleForModuleListDetailSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'descipline_block__name']


class DisciplineBlockModuleDetailListForUserView(generics.ListAPIView):
    serializer_class = DisciplineBlockModuleForModuleListDetailSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'descipline_block__name', 'descipline_block__academic_plan__educational_profile']

    def get_queryset(self):
        return DisciplineBlockModule.objects.filter(editors=self.request.user)


class DisciplineBlockModuleDetailView(generics.RetrieveAPIView):
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleForModuleListDetailSerializer

    def get(self, request, **kwargs):
        queryset = DisciplineBlockModule.objects.filter(pk=self.kwargs['pk'])
        serializer = DisciplineBlockModuleForModuleListDetailSerializer(queryset, many=True)

        if len(serializer.data) == 0:
            return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)

        newdata = dict(serializer.data[0])
        try:
            newdata.update({"rating": DisciplineBlockModuleInFolder.objects.get(block_module=self.kwargs['pk'],
                                                                      folder__owner=self.request.user).module_rating})
            newdata.update({"id_rating": DisciplineBlockModuleInFolder.objects.get(block_module=self.kwargs['pk'],
                                                                         folder__owner=self.request.user).id})
        except:
            newdata.update({"rating": False})

        newdata['can_edit'] = IsDisciplineBlockModuleEditor.check_access(self.kwargs['pk'], self.request.user)
        newdata = OrderedDict(newdata)

        return Response(newdata, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAdminUser, ))
def CloneWorkProgramm(request):
    """
    Апи для клонирования рабочей программы
    Запрашивает id программы для клоинрования в поле program_id для тела запроса типа form-data
    В ответе передается число - айди созданной копии
    """
    prog_id = request.data.get('program_id')
    clone_program = WorkProgram.clone_programm(prog_id)
    clone_program.editors.add(request.user)
    clone_program.owner = request.user
    clone_program.save()

    serializer = WorkProgramSerializer(clone_program)
    return Response(status=200, data=serializer.data)


@api_view(['POST'])
def InsertModule(request):
    """
    Апи для вставки модуля в другой блок
    old_module_id - айди модуля блока дисциплины, который копируется для вставки в другой блок
    block_id - айди блока в который производиться вставка копии
    """
    module_id = request.data.get('old_module_id')
    block_id = request.data.get('block_id')
    cloned_module = DisciplineBlockModule.clone_module(module_id)
    cloned_module.descipline_block = DisciplineBlock.objects.get(pk=block_id)
    cloned_module.save()
    serializer = DisciplineBlockModuleDetailSerializer(cloned_module)
    return Response(status=200, data=serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def UserGroups(request):
    groups_names = []
    for group in request.user.groups.all():
        groups_names.append(group.name)
    if UserExpertise.objects.filter(expert=request.user) or \
            UserStructuralUnit.objects.filter(user=request.user, status__in=["leader", "deputy"]):
        groups_names.append("expertise_member")
    notification_nums=UserNotification.objects.filter(user=request.user, status="unread").count()
    return Response({"groups": groups_names, "notification_nums":notification_nums})


@api_view(['POST'])
def DisciplinesByNumber(request):
    try:
        numbers_array = request.data.get('numbers_array')
        wp_array = []
        queryset = WorkProgram.objects.filter(discipline_code__in=numbers_array)

        for wp in queryset:
            wp_array.append({"id": wp.id, "discipline_code": wp.discipline_code, "title": wp.title})
        return Response(wp_array)

    except:
        return Response(status=400)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def TimeoutTest(request):
    import time
    timer = 0
    while True:
        print("It took {} sec".format(timer))
        time.sleep(30)
        if timer < 7200:
            timer +=30
        else:
            break
    return Response(status=200)


class WorkProgramArchiveUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramArchiveUpdateSerializer
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        try:
            exp = Expertise.objects.get(work_program=instance)
            exp.expertise_status="AR"
            exp.save()
        except Expertise.DoesNotExist:
            pass
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(WorkProgramSerializer(instance).data)
