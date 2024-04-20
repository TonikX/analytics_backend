import json
import os
import re
import time
from collections import OrderedDict
from datetime import datetime

import pandas
from django.apps import apps
from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import transaction
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django_cte import With
from django_filters.rest_framework import DjangoFilterBackend
from django_super_deduper.merge import MergedModelInstance
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from dataprocessing.models import Items
from dataprocessing.serializers import FileUploadSerializer
from discipline_code import IPv4_code_ver2
from workprogramsapp.ap_improvement.module_ze_counter import make_modules_cte_up_for_wp
from workprogramsapp.ap_improvement.serializers import (
    AcademicPlanForAPSerializer,
    DisciplineBlockForWPinFSSCTESerializer,
    WorkProgramSerializerCTE,
    WorkProgramSerializerForList,
)
from workprogramsapp.educational_program.search_filters import CompetenceFilter
from workprogramsapp.expertise.models import Expertise, UserExpertise
from workprogramsapp.folders_ans_statistic.models import AcademicPlanInFolder
from workprogramsapp.models import (
    AcademicPlan,
    BibliographicReference,
    BugsLog,
    CertificationEvaluationTool,
    Competence,
    DisciplineBlock,
    DisciplineBlockModule,
    DisciplineSection,
    EvaluationTool,
    FieldOfStudy,
    ImplementationAcademicPlan,
    Indicator,
    OutcomesOfWorkProgram,
    PrerequisitesOfWorkProgram,
    Topic,
    WorkProgram,
    WorkProgramChangeInDisciplineBlockModule,
    WorkProgramInFieldOfStudy,
    Zun,
)
from workprogramsapp.notifications.models import UserNotification
from workprogramsapp.permissions import (
    IsAcademicPlanDeveloper,
    IsOwnerOrDodWorkerOrReadOnly,
    IsOwnerOrReadOnly,
    IsRpdDeveloperOrReadOnly,
)
from workprogramsapp.serializers import (
    AcademicPlanCreateSerializer,
    AcademicPlanSerializer,
    AcademicPlanSerializerForList,
    AcademicPlanShortSerializer,
    BibliographicReferenceSerializer,
    BugsLogSerializer,
    CertificationEvaluationToolCreateSerializer,
    CompetenceSerializer,
    CompetenceWithStandardSerializer,
    EvaluationToolCreateSerializer,
    EvaluationToolForWorkProgramSerializer,
    EvaluationToolListSerializer,
    FieldOfStudyListSerializer,
    FieldOfStudySerializer,
    ImplementationAcademicPlanCreateSerializer,
    ImplementationAcademicPlanSerializer,
    IndicatorListSerializer,
    IndicatorSerializer,
    OutcomesOfWorkProgramCreateSerializer,
    OutcomesOfWorkProgramSerializer,
    PrerequisitesOfWorkProgramCreateSerializer,
    PrerequisitesOfWorkProgramSerializer,
    SectionSerializer,
    TopicCreateSerializer,
    TopicSerializer,
    WorkProgramArchiveUpdateSerializer,
    WorkProgramBibliographicReferenceUpdateSerializer,
    WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer,
    WorkProgramChangeInDisciplineBlockModuleSerializer,
    WorkProgramChangeInDisciplineBlockModuleUpdateSerializer,
    WorkProgramCreateSerializer,
    WorkProgramEditorsUpdateSerializer,
    WorkProgramForIndividualRoutesSerializer,
    WorkProgramInFieldOfStudyCreateSerializer,
    WorkProgramInFieldOfStudyForCompeteceListSerializer,
    WorkProgramInFieldOfStudySerializer,
    WorkProgramSerializer,
    ZunCreateSaveSerializer,
    ZunCreateSerializer,
    ZunForManyCreateSerializer,
    ZunSerializer,
)
from workprogramsapp.workprogram_additions.models import (
    StructuralUnit,
    UserStructuralUnit,
)


class WorkProgramsListApi(generics.ListAPIView):
    queryset = WorkProgram.objects.all().select_related("structural_uni").prefetch_related("expertise_with_rpd", "editors", "prerequisites", "outcomes")
    serializer_class = WorkProgramSerializerForList
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ["discipline_code", "title", "editors__last_name", "editors__first_name", "id"]
    filterset_fields = ["language",
                        "qualification",
                        "prerequisites", "outcomes", "structural_unit__title",
                        "editors__last_name", "editors__first_name", "work_status",
                        "expertise_with_rpd__expertise_status"
                        ]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self):
        if self.request.GET.get("filter") == "my":
            queryset = WorkProgram.objects.filter(editors=self.request.user)
        elif self.request.GET.get("filter") == "iamexpert":
            queryset = WorkProgram.objects.filter(
                expertise_with_rpd__expertse_users_in_rpd__expert=self.request.user,
                expertise_with_rpd__expertse_users_in_rpd__stuff_status="EX",
            )
        else:
            queryset = WorkProgram.objects.filter()
        return queryset


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class IndicatorListAPIView(generics.ListAPIView):
    serializer_class = IndicatorListSerializer
    queryset = Indicator.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["number", "name", "competence"]
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
    http_method_names = ["post", "delete", "patch"]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request, *args, **kwargs):
        """
        Example:
            {
            "workprogram_id": 1 - ссылка на РПД
            "gh_id": 1 новое - ссылка на ОХ
            "zun": {
              "indicator_in_zun": 85,
              "items": []
                }
            }
            OR
            {
            "workprogram_id": 1 - ссылка на РПД
            "gh_id": 1 новое - ссылка на ОХ
            "zun": [
            {
              "indicator_in_zun": 85,
              "items": []
            },
            {
              "indicator_in_zun": 85,
              "items": []
            }
                ]
            }
        """
        if request.data.get("iap_id") is not None:
            aps = AcademicPlan.objects.filter(
                academic_plan_in_field_of_study__id=int(request.data.get("iap_id"))
            )
        else:
            aps = AcademicPlan.objects.filter(
                academic_plan_in_field_of_study__general_characteristics_in_educational_program__id=int(
                    request.data.get("gh_id")
                )
            )
        wp_in_fss = WorkProgramInFieldOfStudy.objects.filter(
            Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(request.data.get("workprogram_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
        ).distinct()
        for wp_in_fs in wp_in_fss:
            zun_obj = request.data["zun"]
            if type(zun_obj) is list:
                for zun in zun_obj:
                    serializer = self.get_serializer(data=zun)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(wp_in_fs=wp_in_fs)
            else:
                serializer = self.get_serializer(data=request.data["zun"])
                serializer.is_valid(raise_exception=True)
                serializer.save(wp_in_fs=wp_in_fs)
        return Response(status=status.HTTP_201_CREATED)


class ZunManyForAllGhViewSet(viewsets.ModelViewSet):
    model = Zun
    queryset = Zun.objects.all()
    serializer_class = ZunForManyCreateSerializer
    http_method_names = ["post", "delete", "patch"]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request, *args, **kwargs):
        """
        Example:
            {
            "workprogram_id": 1 - ссылка на РПД
            "zun": {
              "indicator_in_zun": 85,
              "items": []
                }
            }

        OR
            {
            "workprogram_id": 1 - ссылка на РПД
            "zun": [
            {
              "indicator_in_zun": 85,
              "items": []
            },
            {
              "indicator_in_zun": 85,
              "items": []
            }
                ]
        """
        wp_in_fss = WorkProgramInFieldOfStudy.objects.filter(
            work_program__id=int(request.data.get("workprogram_id"))
        ).distinct()
        for wp_in_fs in wp_in_fss:
            zun_obj = request.data["zun"]
            print(type(zun_obj))
            if type(zun_obj) is list:
                for zun in zun_obj:
                    serializer = self.get_serializer(data=zun)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(wp_in_fs=wp_in_fs)
            else:
                serializer = self.get_serializer(data=request.data["zun"])
                serializer.is_valid(raise_exception=True)
                serializer.save(wp_in_fs=wp_in_fs)
        return Response(status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        for_all = request.data.get("for_all")
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if for_all:
            wp = WorkProgram.objects.get(zuns_for_wp=instance.wp_in_fs)
            Zun.objects.filter(
                wp_in_fs__work_program=wp,
                skills=instance.skills,
                attainments=instance.attainments,
                knowledge=instance.knowledge,
                indicator_in_zun__id=instance.indicator_in_zun.id,
            ).update(
                skills=request.data["skills"],
                attainments=request.data["attainments"],
                knowledge=request.data["knowledge"],
            )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        else:
            return Response({"message": "failed", "details": serializer.errors})


class CompetenceCreateView(generics.CreateAPIView):
    serializer_class = CompetenceSerializer
    queryset = Competence.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class CompetencesListView(generics.ListAPIView):
    serializer_class = CompetenceWithStandardSerializer
    queryset = Competence.objects.all()
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_class = CompetenceFilter
    search_fields = ["name", "number"]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    @extend_schema(
        methods=["GET"],
        parameters=[
            OpenApiParameter(
                name="ap_id",
                location=OpenApiParameter.QUERY,
                description="выводит все компетенции по айди Impmplementation-a входящие в связанный ОХ",
                type=OpenApiTypes.BOOL,
            ),
            OpenApiParameter(
                name="in_standard",
                location=OpenApiParameter.QUERY,
                description="Выводит все ПК или компетенции, входящие в Образовательные стандарты",
                type=OpenApiTypes.BOOL,
            ),
        ],
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def boolean(self, string):
        if string.lower() in ["0", "no", "false"]:
            response = False
        if string.lower() in ["1", "yes", "true"]:
            response = True
        return response

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        ap_id = self.request.GET.get("ap_id")
        in_standard = self.boolean(self.request.GET.get("in_standard"))

        if ap_id:
            key_filter = Q(
                group_key__group_of_pk__educational_standard__educational_standard_in_educational_program__educational_program__academic_plan__id=ap_id
            )
            over_filter = Q(
                group_over__group_of_pk__educational_standard__educational_standard_in_educational_program__educational_program__academic_plan__id=ap_id
            )
            general_filter = Q(
                group_general__group_of_pk__educational_standard__educational_standard_in_educational_program__educational_program__academic_plan__id=ap_id
            )
            pk_filter = Q(
                pk_group__group_of_pk__general_characteristic__educational_program__academic_plan__id=ap_id
            )
            queryset = queryset.filter(
                key_filter | over_filter | general_filter | pk_filter
            )

        if in_standard:
            key_filter = Q(group_key__group_of_pk__educational_standard__isnull=False)
            over_filter = Q(group_over__group_of_pk__educational_standard__isnull=False)
            general_filter = Q(
                group_general__group_of_pk__educational_standard__isnull=False
            )
            queryset = queryset.filter(key_filter | over_filter | general_filter)

        queryset = queryset.filter().distinct()
        queryset = self.filter_queryset(queryset.all())

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CompetenceListView(APIView):
    """Список компетеций."""

    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    def get(self, request):
        competences = Competence.objects.all()
        serializer = CompetenceSerializer(competences, many=True)
        return Response(serializer.data)


class CompetenceUpdateView(APIView):
    """Редактирование (обновление) компетенции."""

    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

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
    """Индикаторы компетенции."""

    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    def get(self, request, pk):
        indicators = Indicator.objects.filter(competence=pk)
        serializer = IndicatorSerializer(indicators, many=True)
        return Response(serializer.data)


class DeleteIndicatorFromCompetenceView(APIView):
    """Удаление индикатора из компетенции."""

    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

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
    """Добавление индикатора в компетенцию (Создание индикатора)."""

    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    def post(self, request):
        number = request.data.get("number")
        name = request.data.get("name")
        competence = request.data.get("competence")
        try:
            competence = Competence.objects.get(pk=competence)
            indicator = Indicator.objects.create(
                number=number, name=name, competence=competence
            )
            indicator.save()
            return Response(status=200)
        except:
            return Response(status=400)


class OutcomesOfWorkProgramList(generics.ListAPIView):
    serializer_class = OutcomesOfWorkProgramSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return OutcomesOfWorkProgram.objects.none()

    def list(self, request, **kwargs):
        """Вывод всех результатов для одной рабочей программы по id."""

        queryset = OutcomesOfWorkProgram.objects.filter(
            workprogram__id=self.kwargs["workprogram_id"]
        )
        serializer = OutcomesOfWorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class OutcomesOfWorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = OutcomesOfWorkProgramCreateSerializer
    queryset = OutcomesOfWorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        serializer = OutcomesOfWorkProgramCreateSerializer(data=request.data)

        # обновляем value для item
        item = Items.objects.get(id=request.data.get("item"))
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
            obj = OutcomesOfWorkProgram.objects.get(pk=kwargs["pk"])

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

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return OutcomesOfWorkProgram.objects.none()

    def list(self, request, **kwargs):
        """Вывод всех результатов для одной рабочей программы по id."""
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = OutcomesOfWorkProgram.objects.filter(
            workprogram__id=self.kwargs["workprogram_id"]
        )
        serializer = OutcomesOfWorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class PrerequisitesOfWorkProgramList(generics.ListAPIView):
    serializer_class = PrerequisitesOfWorkProgramSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return PrerequisitesOfWorkProgram.objects.none()

    def list(self, request, **kwargs):
        """Вывод всех результатов для одной рабочей программы по id."""

        queryset = PrerequisitesOfWorkProgram.objects.filter(
            workprogram__id=self.kwargs["workprogram_id"]
        )
        serializer = PrerequisitesOfWorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class WorkProgramsWithOutcomesToPrerequisitesForThisWPView(generics.ListAPIView):
    """
    Дисциплины у которых в качестве результатов заявлены ключевые слова
    являющиеся пререквизитами для этой дисциплины.
    """

    serializer_class = WorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return WorkProgram.objects.none()

    def list(self, request, **kwargs):
        prerequisites_of_this_wp = PrerequisitesOfWorkProgram.objects.filter(
            workprogram__discipline_code=self.kwargs["discipline_code"]
        ).values("item__name")
        queryset = WorkProgram.objects.filter(
            outcomes__items__name__in=prerequisites_of_this_wp
        )
        serializer = WorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class WorkProgramsWithPrerequisitesToOutocomesForThisWPView(generics.ListAPIView):
    """
    Дисциплины у которых в качестве пререквизитов указаны ключевые слова
    являющиеся результатами по этой дисциплине.
    """

    serializer_class = WorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return WorkProgram.objects.none()

    def list(self, request, **kwargs):
        outcomes_of_this_wp = OutcomesOfWorkProgram.objects.filter(
            workprogram__discipline_code=self.kwargs["discipline_code"]
        ).values("item__name")
        print("dd", outcomes_of_this_wp)
        queryset = WorkProgram.objects.filter(
            prerequisites__items__name__in=outcomes_of_this_wp
        )
        serializer = WorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class WorkProgramsWithOutocomesForThisWPView(generics.ListAPIView):
    """Дисциплины, в которых есть такие же результаты."""

    serializer_class = WorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return WorkProgram.objects.none()

    def list(self, request, **kwargs):
        outcomes_of_this_wp = OutcomesOfWorkProgram.objects.filter(
            workprogram__discipline_code=self.kwargs["discipline_code"]
        ).values("item__name")
        print("dd", outcomes_of_this_wp)
        queryset = WorkProgram.objects.filter(
            outcomes__items__name__in=outcomes_of_this_wp
        )
        serializer = WorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class PrerequisitesOfWorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer
    queryset = PrerequisitesOfWorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        serializer = PrerequisitesOfWorkProgramCreateSerializer(data=request.data)
        # обновляем value для item
        item = Items.objects.get(id=request.data.get("item"))
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
            obj = PrerequisitesOfWorkProgram.objects.get(pk=kwargs["pk"])

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


class WorkProgramCreateAPIView(generics.CreateAPIView):
    """
    API для создание рабочей програмы
    Поле evaluation_tools принимает двумерный массив с id-типами оценочных средств. Индекс каждого подмасива - номер
    семестра

    Пример:
    "evaluation_tools": [[1,4],[1]]
    """

    serializer_class = WorkProgramCreateSerializer
    queryset = WorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, editors=[self.request.user])


class WorkProgramDestroyView(generics.DestroyAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializer
    permission_classes = [IsAdminUser]


class WorkProgramUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramCreateSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        try:
            if request.data["implementation_format"] == "online":
                DisciplineSection.objects.filter(work_program=serializer.data["id"])
                for section in DisciplineSection.objects.filter(
                    work_program=serializer.data["id"]
                ):
                    section.consultations = (
                        section.lecture_classes
                        + section.laboratory
                        + section.practical_lessons
                    )
                    section.lecture_classes = 0
                    section.laboratory = 0
                    section.practical_lessons = 0
                    section.save()
            elif (
                request.data["implementation_format"] == "mixed"
                or request.data["implementation_format"] == "offline"
            ):
                DisciplineSection.objects.filter(work_program=serializer.data["id"])
                for section in DisciplineSection.objects.filter(
                    work_program=serializer.data["id"]
                ):
                    section.lecture_classes = section.consultations / 3
                    section.laboratory = section.consultations / 3
                    section.practical_lessons = section.consultations / 3
                    section.consultations = 0
                    section.save()
        except:
            pass
        response_serializer = WorkProgramSerializer(
            WorkProgram.objects.get(id=serializer.data["id"]),
            context={"request": request},
        )
        return Response(response_serializer.data)


class WorkProgramEditorsUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramEditorsUpdateSerializer
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        try:
            expertise = Expertise.objects.get(work_program=instance)
            for editor in request.data["editors"]:
                UserExpertise.objects.get_or_create(
                    expertise=expertise, expert_id=editor, stuff_status="ED"
                )
        except Expertise.DoesNotExist:
            pass
        if getattr(instance, "_prefetched_objects_cache", None):
            instance._prefetched_objects_cache = {}

        return Response(
            WorkProgramSerializer(instance, context={"request": request}).data
        )


# Префетчи с экспертизами и юзерэкспертизами, передавать в сериализеры все ОС префетчами. Посмотреть сериализер на
# наличие неиспользуемых полей. Сделать другую подгрузку Планов
class WorkProgramDetailsView(generics.RetrieveAPIView):
    queryset = WorkProgram.objects.all().prefetch_related("expertise_with_rpd",
                                                          "expertise_with_rpd__expertse_users_in_rpd",
                                                          "discipline_sections",
                                                          "discipline_sections__topics",
                                                          "discipline_sections__evaluation_tools",
                                                          "prerequisitesofworkprogram_set",
                                                          "outcomesofworkprogram_set",
                                                          "certification_evaluation_tools",
                                                          "editors"
                                                          )
    serializer_class = WorkProgramSerializerCTE
    permission_classes = [IsRpdDeveloperOrReadOnly]
    def generate_modules(self, wp):
        work_program_in_change_block = []
        modules_grouped={}
        cte = With(None, "module_cte", False)
        cte.query = make_modules_cte_up_for_wp(cte, wp.id).query
        #print(cte.queryset().with_cte(cte).filter(descipline_block__id__isnull=False))
        modules = cte.queryset().with_cte(cte).filter(descipline_block__id__isnull=False)
        for module in modules:
            if modules_grouped.get(module["recursive_id"]) is not None:
                modules_grouped[module["recursive_id"]]["upper_modules"].append(module["id"])
            else:
                modules_grouped[module["recursive_id"]] = {"id":module["recursive_id"], "name":module["recursive_name"], "descipline_block": None, "upper_modules": [module["id"]]}

        for modules_dict in modules_grouped.values():
            upper_modules = modules_dict.pop("upper_modules")
            discipline_block_module = modules_dict
            discipline_block_module["descipline_block"] = DisciplineBlockForWPinFSSCTESerializer(
                DisciplineBlock.objects.filter(modules_in_discipline_block__id__in=upper_modules).prefetch_related(
                    "academic_plan__academic_plan_in_field_of_study",
                    "academic_plan__academic_plan_in_field_of_study__field_of_study"), many=True).data
            cb_dict = {"id": None, "discipline_block_module": discipline_block_module}
            work_program_in_change_block.append(cb_dict)

        return work_program_in_change_block



    def get(self, request, **kwargs):
        queryset = self.get_object()

        serializer = WorkProgramSerializerCTE(queryset, context={'request': request})
        if len(serializer.data) == 0:
            return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)

        newdata = dict(serializer.data)
        wp = queryset
        expertise = wp.expertise_with_rpd.all().first()
        try:

            newdata.update(
                {"expertise_status": expertise.expertise_status})
            newdata.update(
                {"use_chat_with_id_expertise": expertise.pk})

            if request.user.is_expertise_master:
                newdata.update({"can_see_comments": True})
            else:
                newdata.update({"can_see_comments": False})

            if (expertise.expertise_status == "WK" or expertise.expertise_status == "RE") and \
                    (wp.owner == request.user or request.user in wp.editors.all()):
                newdata.update({"can_edit": True})
            else:
                newdata.update({"can_edit": False})
        except AttributeError:  # Expertise does not Exisits
            if wp.owner == request.user or request.user in wp.editors.all() or request.user.is_superuser:
                newdata.update({"can_edit": True, "expertise_status": False})
            else:
                newdata.update({"can_edit": False, "expertise_status": False})
            newdata.update({"use_chat_with_id_expertise": None})

        try:
            ue = expertise.expertse_users_in_rpd.filter(expert=request.user)
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

            newdata.update({"can_see_comments": True})

            if expertise.expertise_status in ["EX", "WK", "RE"]:
                newdata.update({"can_comment": True})
                newdata.update({"user_expertise_id": ue.id})
            else:
                newdata.update({"can_comment": False})
            if (
                ue.stuff_status == "AU"
                or ue.stuff_status == "ED"
                or ue.stuff_status == "SE"
                or ue.user_expertise_status == "AP"
                or ue.user_expertise_status == "RE"
            ):
                newdata.update({"can_approve": False})
                if ue.user_expertise_status == "AP":
                    newdata.update({"your_approve_status": "AP"})
                else:
                    newdata.update({"your_approve_status": "RE"})
            else:
                newdata.update({"can_approve": True})
            if expertise.expertise_status == "WK" or expertise.expertise_status == "AC":
                newdata.update({"can_approve": False})
        except:
            newdata.update({"can_comment": False})
            newdata.update({"can_approve": False})
        if (request.user.is_expertise_master == True or request.user in wp.editors.all()) and wp.work_status == "w":
            newdata.update({"can_archive": True})
        else:
            newdata.update({"can_archive": False})
        if request.user.is_expertise_master and  wp.work_status == "a":
            newdata.update({"can_return_from_archive": True})
        else:
            newdata.update({"can_return_from_archive": False})

        if request.user.groups.filter(name="student"):
            newdata.update({"can_add_to_folder": True})
            newdata.update({"is_student": True})
        else:
            newdata.update({"can_add_to_folder": True})
            newdata.update({"is_student": False})
        newdata.update({"work_program_in_change_block": self.generate_modules(wp)})
        """try:
            newdata.update({"rating": wp.work_program_in_folder.filter(folder__owner=self.request.user).first.work_program_rating})
            newdata.update({"id_rating": wp.work_program_in_folder.filter(folder__owner=self.request.user).first.id})
        except:

            newdata.update({"rating": False})"""
        """competences = Competence.objects.filter(
            indicator_in_competencse__zun__wp_in_fs__work_program__id=self.kwargs['pk']).distinct()
        competences_dict = []
        for competence in competences:
            zuns = Zun.objects.filter(wp_in_fs__work_program__id=self.kwargs['pk'],
                                      indicator_in_zun__competence__id=competence.id)
            zuns_array = []
            for zun in zuns:
                try:
                    indicator = Indicator.objects.get(competence=competence.id,
                                                      zun__id=zun.id)
                    indicator = IndicatorSerializer(indicator).data
                except:
                    indicator = None
                # indicators_array = []
                # for indicator in indicators:
                #     indicators_array.append({"id": indicator.id, "name": indicator.name, "number": indicator.number})
                items_array = []
                items = Items.objects.filter(item_in_outcomes__item_in_wp__id=zun.id,
                                             item_in_outcomes__item_in_wp__wp_in_fs__work_program__id=self.kwargs['pk'],
                                             item_in_outcomes__item_in_wp__indicator_in_zun__competence__id=competence.id)
                for item in items:
                    items_array.append({"id": item.id, "name": item.name})
                # serializer = WorkProgramInFieldOfStudySerializerForCb(WorkProgramInFieldOfStudy.objects.get(zun_in_wp = zun.id))
                #queryset = ImplementationAcademicPlan.objects.filter(
                #    academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__zuns_for_cb__zun_in_wp__id=zun.id)
                modules = DisciplineBlockModule.objects.filter(
                    change_blocks_of_work_programs_in_modules__zuns_for_cb__zun_in_wp__id=zun.id)
                queryset = ImplementationAcademicPlan.get_all_imp_by_modules(modules=modules)
                serializer = ImplementationAcademicPlanSerializer(queryset, many=True)
                if queryset.exists():
                    zuns_array.append({"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                                       "attainments": zun.attainments, "indicator": indicator,
                                       "items": items_array, "educational_program": serializer.data,
                                       "wp_in_fs": WorkProgramInFieldOfStudySerializerForCb(
                                           WorkProgramInFieldOfStudy.objects.get(zun_in_wp=zun.id)).data["id"]})
            competences_dict.append({"id": competence.id, "name": competence.name, "number": competence.number,
                                     "zuns": zuns_array})
        newdata.update({"competences": competences_dict})"""

        newdata = OrderedDict(newdata)
        return Response(newdata, status=status.HTTP_200_OK)


class WorkProgramDetailsWithDisciplineCodeView(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramForIndividualRoutesSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, **kwargs):
        """Вывод всех результатов для одной рабочей программы по id."""

        try:
            print(
                "f",
                WorkProgram.objects.get(
                    discipline_code=self.kwargs["discipline_code"]
                ).discipline_code,
            )
            queryset = WorkProgram.objects.filter(
                discipline_code=self.kwargs["discipline_code"]
            )
            print(queryset)
            serializer = WorkProgramForIndividualRoutesSerializer(queryset, many=True)
            print(serializer.data)
            return Response(serializer.data)
        except:
            return Response(
                {"error": "work program with such a code was not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class WorkProgramFullDetailsWithDisciplineCodeView(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramForIndividualRoutesSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, **kwargs):
        """Вывод всех результатов для одной рабочей программы по id."""
        try:
            print(
                "f",
                WorkProgram.objects.get(
                    discipline_code=self.kwargs["discipline_code"]
                ).discipline_code,
            )
            queryset = WorkProgram.objects.filter(
                discipline_code=self.kwargs["discipline_code"]
            )
            print(queryset)
            serializer = WorkProgramSerializer(queryset, many=True)
            print(serializer.data)
            return Response(serializer.data)
        except:
            return Response(
                {"error": "work program with such a code was not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )


# Конец блока ендпоинтов рабочей программы


class TopicsListAPI(generics.ListAPIView):
    """Эндпоинт, представляющий список тем."""

    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class TopicCreateAPI(generics.CreateAPIView):
    """Эндпоинт для создания тем."""

    queryset = Topic.objects.all()
    serializer_class = TopicCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(
            number=Topic.objects.filter(
                discipline_section=serializer.validated_data["discipline_section"]
            ).count()
            + 1
        )


class TopicDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """Эндпоинт, представляющий конкретную тему."""

    queryset = Topic.objects.all()
    serializer_class = TopicCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        topic_section = kwargs["pk"]
        try:
            Topic.new_ordinal_number(topic_section, -1)
            return self.destroy(request, *args, **kwargs)
        except:
            return Response(status=400)


class EvaluationToolListAPI(generics.ListCreateAPIView):
    """endpoint that represents a list of Evaluation Tools."""

    queryset = EvaluationTool.objects.all()
    serializer_class = EvaluationToolListSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class EvaluationToolDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """endpoint that represents a single Evaluation Tool."""

    queryset = EvaluationTool.objects.all()
    serializer_class = EvaluationToolCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class CertificationEvaluationToolListAPI(generics.ListCreateAPIView):
    """Эндпоинт, представляющий список оценочных средств."""

    queryset = CertificationEvaluationTool.objects.all()
    serializer_class = CertificationEvaluationToolCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class CertificationEvaluationToolDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """Эндпоинт, представляющий конкретное оценочное средство."""

    queryset = CertificationEvaluationTool.objects.all()
    serializer_class = CertificationEvaluationToolCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramInFieldOfStudyListAPI(generics.ListCreateAPIView):
    """Эндпоинт, представляющий список РПД в области исследования."""

    queryset = WorkProgramInFieldOfStudy.objects.all()
    serializer_class = WorkProgramInFieldOfStudyCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class WorkProgramInFieldOfStudyDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """Эндпоинт, представляющий конкретную РПД в области исследования."""

    queryset = WorkProgramInFieldOfStudy.objects.all()
    serializer_class = WorkProgramInFieldOfStudyCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ZunListAPI(generics.ListCreateAPIView):
    """Эндпоинт, представляющий список Зунов."""

    serializer_class = ZunCreateSerializer
    queryset = Zun.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        for zun in request.data:
            Zun.objects.filter(
                wp_in_fs__id=zun.get("wp_changeblock"),
                indicator_in_zun__competence=Indicator.objects.filter(
                    id=int(zun.get("indicator_in_zun"))
                )[0].competence,
            ).delete()
            print("deleted")

        for new_zun in request.data:
            if WorkProgramInFieldOfStudy.objects.filter(
                id=new_zun.get("wp_changeblock"),
                work_program__id=new_zun.get("work_program"),
            ):
                wp_in_fs = WorkProgramInFieldOfStudy.objects.filter(
                    id=new_zun.get("wp_changeblock"),
                    work_program__id=new_zun.get("work_program"),
                )[0]
            else:
                wp_in_fs = WorkProgramInFieldOfStudy()
                wp_in_fs.work_program_change_in_discipline_block_module = (
                    WorkProgramChangeInDisciplineBlockModule.objects.filter(
                        id=int(new_zun.get("wp_changeblock"))
                    )[0]
                )
                wp_in_fs.work_program = WorkProgram.objects.filter(
                    id=int(new_zun.get("work_program"))
                )[0]
                wp_in_fs.save()
            # wp_for_response_serializer =[]
            wp_cb = WorkProgramChangeInDisciplineBlockModule.objects.filter(
                zuns_for_cb__id=int(new_zun.get("wp_changeblock"))
            )[0]
            # wp_for_response_serializer.append(WorkProgramChangeInDisciplineBlockModule.objects.filter(id = int(new_zun.get('wp_changeblock')))[0])
            new_zun = {
                "wp_in_fs": zun.get("wp_changeblock"),
                "indicator_in_zun": Indicator.objects.filter(
                    id=int(new_zun.get("indicator_in_zun"))
                )[0].id,
                "items": new_zun.get("items"),
            }
            serializer = ZunCreateSaveSerializer(data=new_zun)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        response_serializer = (
            WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer(wp_cb)
        )
        return Response(response_serializer.data)


class ZunDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """Эндпоинт, представляющий конкретный Зун."""

    queryset = Zun.objects.all()
    serializer_class = ZunCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, **kwargs):

        zuns = Zun.objects.filter(
            indicator_in_zun__competence__id=kwargs["competences_id"],
            wp_in_fs=kwargs["wp_in_fs_id"],
        )
        for zun in zuns:
            zun.delete()
        return Response(status=204)


class DisciplineSectionListAPI(generics.ListCreateAPIView):
    """Эндпоинт, представляющий список разделов дисциплин."""

    queryset = DisciplineSection.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class DisciplineSectionDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """Эндпоинт, представляющий конкретный раздел дисциплин."""

    queryset = DisciplineSection.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        descipline_section = kwargs["pk"]
        try:
            DisciplineSection.new_ordinal_number(descipline_section, -1)
            return self.destroy(request, *args, **kwargs)
        except:
            return Response(status=400)


class FieldOfStudyDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """Удаление, редактирование, просмотр образовательной программы (направления) по id"""

    queryset = FieldOfStudy.objects.all()
    serializer_class = FieldOfStudySerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class FieldOfStudyListCreateView(generics.ListCreateAPIView):
    """Отображение списка ОП(направлений), создание образовательной программы (напрвления)"""

    queryset = FieldOfStudy.objects.all()
    serializer_class = FieldOfStudyListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "number", "faculty", "educational_profile"]
    permission_classes = [IsRpdDeveloperOrReadOnly]


@extend_schema(
    methods=["GET", "POST"],
    parameters=[
        OpenApiParameter(
            name="descipline_section",
            type=OpenApiTypes.INT,
            description="id раздела дисциплины",
        ),
        OpenApiParameter(
            name="new_ordinal_number",
            type=OpenApiTypes.INT,
            description="Новый порядок дисциплины в разделе",
        ),
    ],
    request=None,
    responses=None,
)
@api_view(["GET", "POST"])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def NewOrdinalNumbersForDesciplineSectionAPI(request):
    descipline_section = request.data.get("descipline_section")
    new_ordinal_number = request.data.get("new_ordinal_number")
    try:
        DisciplineSection.new_ordinal_number(descipline_section, new_ordinal_number)
        return Response(status=200)
    except:
        return Response(status=400)


@extend_schema(
    methods=["GET", "POST"],
    parameters=[
        OpenApiParameter(name="topic", type=OpenApiTypes.INT, description="id темы"),
        OpenApiParameter(
            name="new_ordinal_number",
            type=OpenApiTypes.INT,
            description="Новый порядок темы в разделе",
        ),
    ],
    request=None,
    responses=None,
)
@api_view(["GET", "POST"])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def NewOrdinalNumbersForTopicAPI(request):
    topic = request.data.get("topic")
    new_ordinal_number = request.data.get("new_ordinal_number")
    try:
        Topic.new_ordinal_number(topic, new_ordinal_number)
        return Response(status=200)
    except:
        return Response(status=400)


@extend_schema(
    methods=["GET", "POST"],
    parameters=[
        OpenApiParameter(
            name="old_descipline_code",
            type=OpenApiTypes.INT,
            description="Старый код дисциплины",
        ),
        OpenApiParameter(
            name="new_descipline_code",
            type=OpenApiTypes.INT,
            description="Новый код дисциплины",
        ),
    ],
    request=None,
    responses=None,
)
@api_view(["GET", "POST"])
def NewRealtionsForWorkProgramsInFieldOfStudyAPI(request):
    old_descipline_code = request.data.get("old_descipline_code")
    new_descipline_code = request.data.get("new_descipline_code")
    try:
        WorkProgram.new_relations(old_descipline_code, new_descipline_code)
        return Response(status=200)
    except:
        return Response(status=400)


@transaction.atomic()
def merge(primary_object, alias_objects):
    MergedModelInstance.create(primary_object, alias_objects, keep_old=False)
    return primary_object


def get_generic_fields():
    """Возвращает список всех GenericForeignKeys во всех моделях."""
    generic_fields = []
    for model in apps.get_models():
        for field_name, field in model.__dict__.items():
            if isinstance(field, GenericForeignKey):
                generic_fields.append(field)
    return generic_fields


@transaction.atomic()
def merge_model_instances(primary_object, alias_objects):
    generic_fields = get_generic_fields()

    related_fields = list(
        filter(lambda x: x.is_relation is True, primary_object._meta.get_fields())
    )

    many_to_many_fields = list(filter(lambda x: x.many_to_many is True, related_fields))

    related_fields = list(filter(lambda x: x.many_to_many is False, related_fields))

    deleted_objects = []
    deleted_objects_count = 0
    for alias_object in alias_objects:
        # Migrate all foreign key references from alias object to primary object.
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
                            primary_object,
                        )
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
            print("!!")
            deleted_objects += [alias_object]
            alias_object.delete()
            deleted_objects_count += 1


@extend_schema(request=None, responses=None)
@api_view(["GET", "POST"])
def ChangeItemsView(request):
    try:
        item = Items.objects.filter(id=request.data.get("old_item_id"))[0]
        other_item = Items.objects.filter(name=item.name).exclude(id=item.id)
        merge(item, other_item)
    except:
        return Response(status=400)
    return Response(status=200)


class FileUploadWorkProgramOutcomesAPIView(APIView):
    """Эндпоинт для добавления данных о РПД из csv-файла с online.edu.ru."""

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            data = handle_uploaded_file_v2(
                request.FILES["file"], str(request.FILES["file"])
            )
            print(data)
            data.fillna("не задано", inplace=True)
            for i in range(len(data)):
                outcomes = data["KEYWORDS"][i].split(", ")
                outcomes_items = []
                print(outcomes)

                for o in outcomes:
                    # o = o.capitalize()
                    o = str(o)
                    print(o)

                    if Items.objects.filter(name=o).exists():
                        print("items finding", Items.objects.filter(name=o)[0])
                        outcomes_items.append(Items.objects.filter(name=o)[0])
                    else:
                        print("попытка сохранения")
                        item = Items(name=o)
                        item.save()
                        outcomes_items.append(item)
                        print("после сохранения", item)

                outcomes_items = Items.objects.filter(name__in=outcomes_items)
                print("Outcomes--", outcomes_items)

                if WorkProgram.objects.filter(
                    discipline_code=data["DIS_CODE"][i]
                ).exists():
                    wp_obj = WorkProgram.objects.filter(
                        discipline_code=data["DIS_CODE"][i]
                    )[0]
                    if len(outcomes_items) != 0:
                        for item in outcomes_items:
                            print("item", item)
                            if OutcomesOfWorkProgram.objects.filter(
                                item=item, workprogram=wp_obj
                            ).exists():
                                print("результат существует")
                            else:
                                out_obj = OutcomesOfWorkProgram(
                                    item=item, workprogram=wp_obj, masterylevel="2"
                                )
                                out_obj.save()
                                print("item", item, "was saved for")
                else:
                    print("Рпд не найдена")
            return Response(
                {"Message": "All data processed"}, status=status.HTTP_201_CREATED
            )

        except:
            return Response(
                {"Message": "Data not loaded"}, status=status.HTTP_400_BAD_REQUEST
            )


class BibliographicReferenceListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BibliographicReferenceSerializer
    queryset = BibliographicReference.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["description"]
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

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return BibliographicReference.objects.none()

    def list(self, request, **kwargs):
        """Вывод всех результатов для одной рабочей программы по id."""
        queryset = WorkProgram.objects.get(
            id=self.kwargs["workprogram_id"]
        ).bibliographic_reference.all()
        serializer = BibliographicReferenceSerializer(queryset, many=True)
        return Response(serializer.data)


class EvaluationToolInWorkProgramList(generics.ListAPIView):
    serializer_class = EvaluationToolForWorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]
    queryset = EvaluationTool

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return FieldOfStudy.objects.none()

    def list(self, request, **kwargs):
        """Вывод всех результатов для одной рабочей программы по id."""
        try:
            queryset = EvaluationTool.objects.filter(
                evaluation_tools__in=DisciplineSection.objects.filter(
                    work_program__id=self.kwargs["workprogram_id"]
                )
            ).distinct()
            serializer = EvaluationToolForWorkProgramSerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response(status=400)


class FieldOfStudiesForWorkProgramList(generics.ListAPIView):
    serializer_class = EvaluationToolForWorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return FieldOfStudy.objects.none()

    def list(self, request, **kwargs):
        """Вывод учебных планов для одной рабочей программы по id."""

        try:
            queryset = FieldOfStudy.objects.filter(
                implementation_academic_plan_in_field_of_study__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__id=self.kwargs[
                    "workprogram_id"
                ]
            ).distinct()
            serializer = FieldOfStudySerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response(status=400)


class WorkProgramInFieldOfStudyForWorkProgramList(generics.ListAPIView):
    serializer_class = WorkProgramInFieldOfStudyForCompeteceListSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return WorkProgramInFieldOfStudy.objects.none()

    def list(self, request, **kwargs):
        """Вывод учебных планов для одной рабочей программы по id."""
        queryset = WorkProgramInFieldOfStudy.objects.filter(
            work_program__id=self.kwargs["workprogram_id"],
        ).distinct()

        modules = DisciplineBlockModule.objects.none()
        for module in queryset:
            modules = modules | DisciplineBlockModule.objects.filter(
                id__in=self.get_blocks_for_all_children(
                    module.work_program_change_in_discipline_block_module.discipline_block_module,
                )
            )

        serializer = WorkProgramInFieldOfStudyForCompeteceListSerializer(
            queryset, many=True
        )
        return Response(serializer.data)

    def get_blocks_for_all_children(self, instance, include_self=True):
        r = []
        if include_self:
            r.append(instance.id)
        for c in DisciplineBlockModule.objects.filter(childs=instance):
            _r = self.get_blocks_for_all_children(c, include_self=True)
            if 0 < len(_r):
                r.extend(_r)
        return r


class WorkProgramInFieldOfStudyForWorkProgramForGHList(generics.ListAPIView):
    serializer_class = WorkProgramInFieldOfStudyForCompeteceListSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return WorkProgramInFieldOfStudy.objects.none()

    def list(self, request, **kwargs):
        """Вывод учебных планов для одной рабочей программы по id."""
        aps = AcademicPlan.objects.filter(
            academic_plan_in_field_of_study__general_characteristics_in_educational_program__id=int(
                self.kwargs["gh_id"]
            )
        )
        print(aps)
        wp_in_fss = WorkProgramInFieldOfStudy.objects.filter(
            Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                work_program__id=int(self.kwargs["workprogram_id"]),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
        ).distinct()
        print(wp_in_fss)
        serializer = WorkProgramInFieldOfStudyForCompeteceListSerializer(
            wp_in_fss, many=True
        )
        return Response(serializer.data)


def handle_uploaded_file_v2(file, filename):
    """Обработка файла csv с online.edu.ru."""

    if not os.path.exists("upload/"):
        os.mkdir("upload/")
    path = "upload/" + filename

    with open(path, "wb+") as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    df = pandas.read_csv(path, sep=";", encoding="utf-8")
    return df


def handle_uploaded_file(file, filename):
    """Обработка файла csv с online.edu.ru."""

    if not os.path.exists("upload/"):
        os.mkdir("upload/")
    path = "upload/" + filename

    with open(path, "wb+") as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    df = pandas.read_csv(path, sep=",", encoding="utf-8")
    df.dropna(subset=["Направления подготовки"], inplace=True)
    df = df.drop(["Unnamed: 0"], axis=1)
    return df


class FileUploadWorkProgramAPIView(APIView):
    """Эндпоинт для добавления данных о РПД из csv-файла с online.edu.ru."""

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = handle_uploaded_file(request.FILES["file"], str(request.FILES["file"]))
        data.fillna("не задано", inplace=True)
        for i in range(len(data)):
            try:
                prerequisite = data["Ключевые слова-пререквизиты"][i].split(", ")
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

                outcomes = data["Ключевые слова содержания"][i].split(", ")
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

                field_of_study = data["Направления подготовки"][i].split(
                    "                                         "
                )
                field_of_study.remove(field_of_study[len(field_of_study) - 1])
                fs_list = []
                for f in field_of_study:
                    number, title, empty = re.split(".([А-Я][^А-Я]*)", f)
                    if FieldOfStudy.objects.filter(number=number, title=title).exists():
                        fs_list.append(
                            FieldOfStudy.objects.get(number=number, title=title)
                        )
                    else:
                        fs_obj = FieldOfStudy(number=number, title=title)
                        fs_obj.save()
                        fs_list.append(fs_obj)

                fs_list = FieldOfStudy.objects.filter(number__in=fs_list)
                print(fs_list)

                if WorkProgram.objects.filter(title=data["Название курса"][i]).exists():
                    wp_obj = WorkProgram.objects.get(title=data["Название курса"][i])
                    if len(prerequisite_items) != 0:
                        for item in prerequisite_items:
                            prereq_obj = PrerequisitesOfWorkProgram(
                                item=item, workprogram=wp_obj
                            )
                            prereq_obj.save()
                    if len(outcomes_items) != 0:
                        for item in outcomes_items:
                            out_obj = OutcomesOfWorkProgram(
                                item=item, workprogram=wp_obj
                            )
                            out_obj.save()

                else:

                    # если нет, то записываем в БД и апдейтим
                    wp_obj = WorkProgram(title=data["Название курса"][i])
                    wp_obj.save()
                    if len(prerequisite_items) != 0:
                        for item in prerequisite_items:
                            prereq_obj = PrerequisitesOfWorkProgram(
                                item=item, workprogram=wp_obj
                            )
                            prereq_obj.save()

                    if len(outcomes_items) != 0:
                        for item in outcomes_items:
                            out_obj = OutcomesOfWorkProgram(
                                item=item, workprogram=wp_obj
                            )
                            out_obj.save()
            except:
                print(i)
                continue
        return Response(status=200)


def handle_uploaded_csv(file, filename):

    if not os.path.exists("upload/"):
        os.mkdir("upload/")
    path = "upload/" + filename

    with open(path, "wb+") as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    in_df = pandas.read_excel(path)
    sys_df = pandas.DataFrame(
        {
            "EP_ID": [],
            "SUBJECT_CODE": [],
            "CYCLE": [],
            "MODULE_ID": [],
            "COMPONENT": [],
            "ISU_SUBJECT_ID": [],
            "SUBJECT": [],
            "IMPLEMENTOR_ID": [],
            "IMPLEMENTOR": [],
            "SUBFIELDCODE": [],
            "MAJOR_NAME": [],
            "OP_ID": [],
            "SUBFIELDNAME": [],
            "FACULTY_ID": [],
            "FACULTY": [],
            "OGNP_ID": [],
            "OGNP": [],
            "YEAR": [],
            "DEGREE": [],
            "SEMESTER": [],
            "LANGUAGE": [],
            "CREDITS": [],
            "LECTURE": [],
            "PRACTICE": [],
            "LAB": [],
            "EXAM": [],
            "PASS": [],
            "DIFF": [],
            "CP": [],
            "SRS": [],
            "ISOPTION": [],
            "SEM_INFO": [],
            "DIS_CODE": [],
            "VERSION": [],
        }
    )

    print("IPv4_code generating")
    processed_data, db = IPv4_code_ver2.generate_df_w_unique_code(in_df, sys_df)
    now = datetime.now().isoformat("-").split(".")[0].replace(":", "-")
    db.to_excel(
        "discipline_code/discipline_bank_updated_{}.xlsx".format(now), index=False
    )
    print(processed_data.head())
    return processed_data


class FileUploadAPIView(APIView):
    """Эндпоинт для загрузки файла sub_2019_2020_new."""

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    def post(self, request):

        data = handle_uploaded_csv(request.FILES["file"], str(request.FILES["file"]))
        print(len(data["SUBJECT"].drop_duplicates().to_list()))
        # импортируем json с порядком модулей
        with open(
            "workprogramsapp/modules-order.json",
            "r",
            encoding="utf-8",
        ) as fh:  # открываем файл на чтение
            order = json.load(fh)

        print("============Создаю рпд и направления============")
        # создаем рпд и направления
        fs_count, wp_count, ap_count = 0, 0, 0
        for i in list(data.index.values):
            try:
                print("---Новая строка---")
                if data["DEGREE"][i].strip() == "Академический бакалавр":
                    qualification = "bachelor"
                elif data["DEGREE"][i].strip() == "Магистр":
                    qualification = "master"
                else:
                    qualification = "specialist"
                print(qualification)

                credit_units = [0 for i in range(0, 12)]
                units = data.loc[
                    (data["SUBFIELDNAME"] == data["SUBFIELDNAME"][i])
                    & (data["CYCLE"] == data["CYCLE"][i])
                    & (data["COMPONENT"] == data["COMPONENT"][i])
                    & (data["SUBJECT"] == data["SUBJECT"][i])
                    & (data["YEAR"] == data["YEAR"][i])
                ]
                print(units.index.values)
                try:
                    for u in units.index.values:
                        if pandas.isna(units["CREDITS"][u]) or units["CREDITS"][u] == 0:
                            credit_units[int(units["SEMESTER"][u]) - 1] = "-"
                        elif units["SEMESTER"][u] == ".":
                            credit_units[11] = units["CREDITS"][u]
                        else:
                            credit_units[int(units["SEMESTER"][u]) - 1] = int(
                                units["CREDITS"][u]
                            )
                    print("credit_units", credit_units)
                except:
                    print("mistake with units")
                    pass
                # проверяем если ОП уже существует в БД
                if FieldOfStudy.objects.filter(
                    number=data["SUBFIELDCODE"][i], qualification=qualification
                ).exists():
                    fs_obj = FieldOfStudy.objects.get(
                        number=data["SUBFIELDCODE"][i], qualification=qualification
                    )
                else:
                    # Записываем в БД новую ОП
                    fs_obj = FieldOfStudy(
                        number=data["SUBFIELDCODE"][i],
                        title=data["MAJOR_NAME"][i].strip(),
                        qualification=qualification,
                    )
                    fs_obj.save()
                    fs_count += 1

                print("Направление подготовки: ", fs_obj)
                # Проверяем если Дисцпилина уже есть в БД
                print(data["SUBJECT"][i].strip(), data["DIS_CODE"][i])
                regex = r"^[0-9]{2}\." + str(data["DIS_CODE"][i])[3] + "."
                print(regex)
                # TODO: ОГНП НЕКОРРЕКТНО СООТНОСЯТСЯ
                wp_list = WorkProgram.objects.filter(
                    title=data["SUBJECT"][i].strip(),
                    zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__name=data[
                        "COMPONENT"
                    ][
                        i
                    ].strip(),
                    zuns_for_wp__work_program_change_in_discipline_block_module__change_type=data[
                        "ISOPTION"
                    ][
                        i
                    ],
                    credit_units=",".join(map(str, credit_units)),
                    discipline_code__iregex=regex,
                ).distinct()
                print("Найдена РПД: ", wp_list)
                if wp_list.exists():
                    wp_obj = WorkProgram.objects.get(pk=wp_list[0].id)
                    if not wp_obj.old_discipline_code:
                        wp_obj.old_discipline_code = wp_obj.discipline_code
                        wp_obj.discipline_code = data["DIS_CODE"][i]
                        wp_obj.save()
                        print("Я взял старую РПД!!!")
                    elif data["DIS_CODE"][i] != wp_obj.discipline_code:
                        print(
                            "мы ее нашли",
                            WorkProgram.objects.filter(
                                discipline_code=data["DIS_CODE"][i],
                                title=data["SUBJECT"][i].strip(),
                            ).distinct(),
                        )
                        try:
                            wp_obj = WorkProgram.objects.filter(
                                discipline_code=data["DIS_CODE"][i],
                                title=data["SUBJECT"][i].strip(),
                            )[0]
                        except:
                            print("Я СКЛОНИРОВАЛ!!!")
                            clone = True
                            wp_obj = WorkProgram.clone_programm(wp_obj.id)
                            wp_obj.discipline_code = data["DIS_CODE"][i]
                            wp_obj.save()
                else:
                    wp_obj = WorkProgram(
                        title=data["SUBJECT"][i].strip(),
                        discipline_code=data["DIS_CODE"][i],
                        subject_code=data["SUBJECT_CODE"][i],
                        qualification=qualification,
                        credit_units=",".join(map(str, credit_units)),
                    )
                    print("Я СОЗДАЛ!!!")
                    wp_obj.save()
                    print(wp_obj.id)
                    wp_count += 1
                certification_for_wp = CertificationEvaluationTool.objects.filter(
                    work_program=wp_obj
                )
                semester = 1
                if not CertificationEvaluationTool.objects.filter(
                    work_program=wp_obj
                ).exists():
                    print("найдено оценочное средство")
                    semester = 1
                else:
                    print("начало цыкола обработки семестров")
                    for tool in certification_for_wp:
                        print("замена номеров оценочных средств")
                        if tool.semester >= semester:
                            semester = tool.semester + 1
                if not CertificationEvaluationTool.objects.filter(
                    work_program=wp_obj
                ).exists():
                    print("создаются оценочные срадства")
                    if bool(data["PASS"][i]):
                        print("попытка 1")
                        CertificationEvaluationTool.objects.create(
                            work_program=wp_obj, type="3", semester=semester
                        )
                    if bool(data["DIFF"][i]):
                        print("попытка 2")
                        CertificationEvaluationTool.objects.create(
                            work_program=wp_obj, type="2", semester=semester
                        )
                    if bool(data["EXAM"][i]):
                        print("попытка 3")
                        CertificationEvaluationTool.objects.create(
                            work_program=wp_obj, type="1", semester=semester
                        )
                    if bool(data["CP"][i]):
                        print("попытка 4")
                        CertificationEvaluationTool.objects.create(
                            work_program=wp_obj, type="4", semester=semester
                        )
                    print("созданы оценочные срадства")
                if not wp_obj.lecture_hours:
                    print("попытка создать массивыдля данных о семестрах")
                    wp_obj.lecture_hours = str([0 for _ in range(10)])[1:-1].replace(
                        " ", ""
                    )
                    wp_obj.practice_hours = str([0 for _ in range(10)])[1:-1].replace(
                        " ", ""
                    )
                    wp_obj.lab_hours = str([0 for _ in range(10)])[1:-1].replace(
                        " ", ""
                    )
                    wp_obj.srs_hours = str([0 for _ in range(10)])[1:-1].replace(
                        " ", ""
                    )
                    print("условие длинны лекционных часов прошло")
                if len(list(wp_obj.lecture_hours)) < 6:
                    print("2 попытка создать массивыдля данных о семестрах")
                    wp_obj.lecture_hours = str([0 for _ in range(10)])[1:-1].replace(
                        " ", ""
                    )
                    wp_obj.practice_hours = str([0 for _ in range(10)])[1:-1].replace(
                        " ", ""
                    )
                    wp_obj.lab_hours = str([0 for _ in range(10)])[1:-1].replace(
                        " ", ""
                    )
                    wp_obj.srs_hours = str([0 for _ in range(10)])[1:-1].replace(
                        " ", ""
                    )
                    print("2 условие длинны лекционных часов прошло")
                print("попытка вбить часы")
                lecture_array = [float(x) for x in wp_obj.lecture_hours.split(",")]
                practise_array = [float(x) for x in wp_obj.practice_hours.split(",")]
                lab_array = [float(x) for x in wp_obj.lab_hours.split(",")]
                srs_array = [float(x) for x in wp_obj.srs_hours.split(",")]
                print("семестр", data["SEMESTER"][i])
                print(
                    "лекционные часы:", float(str(data["LECTURE"][i]).replace(",", "."))
                )
                print(lecture_array)
                print(lecture_array[int(data["SEMESTER"][i]) - 1])
                lecture_array[int(data["SEMESTER"][i]) - 1] = float(
                    str(data["LECTURE"][i]).replace(",", ".")
                )
                print(
                    "практические часы:",
                    float(str(data["PRACTICE"][i]).replace(",", ".")),
                )
                practise_array[int(data["SEMESTER"][i]) - 1] = float(
                    str(data["PRACTICE"][i]).replace(",", ".")
                )
                print(
                    "лабораторные часы:", float(str(data["LAB"][i]).replace(",", "."))
                )
                lab_array[int(data["SEMESTER"][i]) - 1] = float(
                    str(data["LAB"][i]).replace(",", ".")
                )
                print("срс часы:", float(str(data["SRS"][i]).replace(",", ".")))
                srs_array[int(data["SEMESTER"][i]) - 1] = float(
                    str(data["SRS"][i]).replace(",", ".")
                )

                wp_obj.lecture_hours = str(lecture_array)[1:-1].replace(" ", "")
                wp_obj.practice_hours = str(practise_array)[1:-1].replace(" ", "")
                wp_obj.lab_hours = str(lab_array)[1:-1].replace(" ", "")
                wp_obj.srs_hours = str(srs_array)[1:-1].replace(" ", "")

                wp_obj.wp_isu_id = int(data["ISU_SUBJECT_ID"][i])

                if (
                    data["LANGUAGE"][i].strip().find("Русский") != -1
                    and data["LANGUAGE"][i].strip().find("Английский") != -1
                ):
                    wp_obj.language = "ru/en"
                elif data["LANGUAGE"][i].strip() == "Русский":
                    wp_obj.language = "ru"
                elif data["LANGUAGE"][i].strip() == "Английский":
                    wp_obj.language = "en"
                elif data["LANGUAGE"][i].strip() == "Казахский":
                    wp_obj.language = "kz"
                elif data["LANGUAGE"][i].strip() == "Немецкий":
                    wp_obj.language = "de"

                try:
                    struct_unit = StructuralUnit.objects.get(
                        title=data["IMPLEMENTOR"][i].strip(),
                        isu_id=data["IMPLEMENTOR_ID"][i],
                    )
                except:
                    struct_unit = StructuralUnit.objects.create(
                        title=data["IMPLEMENTOR"][i].strip(),
                        isu_id=data["IMPLEMENTOR_ID"][i],
                    )
                wp_obj.structural_unit_id = struct_unit.id
                wp_obj.save()
                print("Рабочая программа дисциплины: ", wp_obj)

                if AcademicPlan.objects.filter(
                    qualification=qualification,
                    year=data["YEAR"][i],
                    educational_profile=data["SUBFIELDNAME"][i].strip(),
                ).exists():
                    ap_obj = AcademicPlan.objects.get(
                        qualification=qualification,
                        year=data["YEAR"][i],
                        educational_profile=data["SUBFIELDNAME"][i].strip(),
                    )
                    ap_obj.ap_isu_id = int(data["EP_ID"][i])
                    ap_obj.save()
                    print("старый", ap_obj)

                else:
                    typelearning = "internal"
                    print(typelearning)
                    ap_obj = AcademicPlan(
                        education_form=typelearning,
                        qualification=qualification,
                        year=data["YEAR"][i],
                        educational_profile=data["SUBFIELDNAME"][i].strip(),
                        ap_isu_id=int(data["EP_ID"][i]),
                    )
                    ap_obj.save()
                    ap_count += 1
                    print("новый", ap_obj)

                print("Учебный план: ", ap_obj)

                if ImplementationAcademicPlan.objects.filter(
                    academic_plan=ap_obj, field_of_study=fs_obj, year=data["YEAR"][i]
                ).exists():
                    iap_obj = ImplementationAcademicPlan.objects.get(
                        academic_plan=ap_obj,
                        field_of_study=fs_obj,
                        year=data["YEAR"][i],
                    )
                    iap_obj.op_isu_id = int(data["OP_ID"][i])
                    iap_obj.save()
                    print("ImplementationAcademicPlan exist")
                else:
                    iap_obj = ImplementationAcademicPlan(
                        academic_plan=ap_obj,
                        field_of_study=fs_obj,
                        year=data["YEAR"][i],
                        op_isu_id=int(data["OP_ID"][i]),
                    )
                    iap_obj.save()
                print("Связь учебного плана и направления: done")

                if DisciplineBlock.objects.filter(
                    name=data["CYCLE"][i].strip(), academic_plan=ap_obj
                ).exists():
                    db = DisciplineBlock.objects.get(
                        name=data["CYCLE"][i].strip(), academic_plan=ap_obj
                    )
                else:
                    db = DisciplineBlock(
                        name=data["CYCLE"][i].strip(),
                        academic_plan_id=ap_obj.id,
                    )
                    db.save()

                print("Блок: ", db)

                try:
                    o = order[data["COMPONENT"][i].strip()]
                except:
                    order.update({data["COMPONENT"][i].strip(): len(order)})
                    o = order[data["COMPONENT"][i].strip()]

                if DisciplineBlockModule.objects.filter(
                    name=data["COMPONENT"][i].strip(), descipline_block=db
                ).exists():
                    mdb = DisciplineBlockModule.objects.get(
                        name=data["COMPONENT"][i].strip(), descipline_block=db
                    )
                else:
                    mdb = DisciplineBlockModule(
                        name=data["COMPONENT"][i].strip(), descipline_block=db, order=o
                    )
                    mdb.save()

                print("Модуль в блоке: ", mdb)

                if (
                    data["ISOPTION"][i] == "Optionally"
                    and WorkProgramChangeInDisciplineBlockModule.objects.filter(
                        discipline_block_module=mdb,
                        change_type=data["ISOPTION"][i],
                        subject_code=data["SUBJECT_CODE"][i],
                    ).exists()
                ):
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule.objects.get(
                        discipline_block_module=mdb,
                        change_type=data["ISOPTION"][i],
                        subject_code=data["SUBJECT_CODE"][i],
                    )
                    if WorkProgramInFieldOfStudy.objects.filter(
                        work_program_change_in_discipline_block_module=wpchangemdb,
                        work_program=wp_obj,
                    ).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(
                            work_program_change_in_discipline_block_module=wpchangemdb,
                            work_program=wp_obj,
                        )
                    else:
                        wpinfs = WorkProgramInFieldOfStudy(
                            work_program_change_in_discipline_block_module=wpchangemdb,
                            work_program=wp_obj,
                        )
                        wpinfs.save()
                elif WorkProgramChangeInDisciplineBlockModule.objects.filter(
                    discipline_block_module=mdb,
                    change_type=data["ISOPTION"][i],
                    work_program=wp_obj,
                ).exists():
                    print("exist", wp_obj)

                else:
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule()
                    wpchangemdb.credit_units = ",".join(map(str, credit_units))
                    print("credit_units", credit_units)
                    print("wpchangemdb.credit_units", wpchangemdb.credit_units)
                    wpchangemdb.change_type = data["ISOPTION"][i]
                    wpchangemdb.discipline_block_module = mdb
                    wpchangemdb.subject_code = data["SUBJECT_CODE"][i]
                    wpchangemdb.save()

                    if WorkProgramInFieldOfStudy.objects.filter(
                        work_program_change_in_discipline_block_module=wpchangemdb,
                        work_program=wp_obj,
                    ).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(
                            work_program_change_in_discipline_block_module=wpchangemdb,
                            work_program=wp_obj,
                        )
                    else:

                        wpinfs = WorkProgramInFieldOfStudy(
                            work_program_change_in_discipline_block_module=wpchangemdb,
                            work_program=wp_obj,
                        )
                        wpinfs.save()
                try:
                    if (
                        WorkProgram.objects.filter(
                            title=data["SUBJECT"][i].strip(),
                            zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__name=data[
                                "COMPONENT"
                            ][
                                i
                            ].strip(),
                            # zuns_for_wp__work_program_change_in_discipline_block_module__change_type=
                            # data['ISOPTION'][i],
                            zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module=mdb,
                        ).count()
                        > 1
                    ):
                        if clone:
                            print("УДАЛЯЕТСЯ СКЛОНИРОВАННАЯ рпд")
                            wp_obj.delete()
                            wpchangemdb.delete()
                except:
                    pass

                print("Рабочая программа дисциплины записана в модуль: done")

            except Exception as e:
                print(e)
                print(
                    "Строка ",
                    i,
                    "не записалась, проверьте на опечатки или пустые значения",
                )
                continue

        print(
            f"Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}"
        )

        return Response(status=200)


class AcademicPlanListAPIView(generics.ListAPIView):
    serializer_class = AcademicPlanSerializerForList
    queryset = AcademicPlan.objects.all()
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    search_fields = [
        "id",
        "academic_plan_in_field_of_study__qualification",
        "academic_plan_in_field_of_study__title",
        "academic_plan_in_field_of_study__year",
        "academic_plan_in_field_of_study__field_of_study__title",
        "academic_plan_in_field_of_study__field_of_study__number",
        "ap_isu_id",
    ]
    ordering_fields = [
        "academic_plan_in_field_of_study__qualification",
        "academic_plan_in_field_of_study__title",
        "academic_plan_in_field_of_study__year",
        "academic_plan_in_field_of_study__field_of_study__title",
    ]
    filterset_fields = ["academic_plan_in_field_of_study__qualification"]
    permission_classes = [IsRpdDeveloperOrReadOnly]

class AcademicPlanListShortAPIView(generics.ListAPIView):
    serializer_class = AcademicPlanShortSerializer
    queryset = AcademicPlan.objects.all().prefetch_related("academic_plan_in_field_of_study", "academic_plan_in_field_of_study__field_of_study", "academic_plan_in_field_of_study__structural_unit", "author")
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ["academic_plan_in_field_of_study__qualification",
                     "academic_plan_in_field_of_study__title",
                     "academic_plan_in_field_of_study__year",
                     "academic_plan_in_field_of_study__field_of_study__title",
                     "academic_plan_in_field_of_study__field_of_study__number",
                     "ap_isu_id",
                     "id"]
    ordering_fields = ["academic_plan_in_field_of_study__qualification",
                       "academic_plan_in_field_of_study__title",
                       "academic_plan_in_field_of_study__year",
                       "academic_plan_in_field_of_study__field_of_study__title"]
    filterset_fields = ["academic_plan_in_field_of_study__qualification"]
    permission_classes = [IsRpdDeveloperOrReadOnly]


class AcademicPlanCreateAPIView(generics.CreateAPIView):
    serializer_class = AcademicPlanCreateSerializer
    queryset = AcademicPlan.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
        academic_plan = serializer.save(author=self.request.user)
        DisciplineBlock.objects.create(
            name="Блок 1. Модули (дисциплины)", academic_plan=academic_plan
        )
        DisciplineBlock.objects.create(
            name="Блок 2. Практика", academic_plan=academic_plan
        )
        DisciplineBlock.objects.create(name="Блок 3. ГИА", academic_plan=academic_plan)
        DisciplineBlock.objects.create(
            name="Блок 4. Факультативные модули (дисциплины)",
            academic_plan=academic_plan,
        )
        AcademicPlan.clone_descipline_blocks(self, serializer)


class AcademicPlanDestroyView(generics.DestroyAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class AcademicPlanUpdateView(generics.UpdateAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly, IsAcademicPlanDeveloper]


class AcademicPlanDetailsView(generics.RetrieveAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanForAPSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]
    #@print_sql_decorator(count_only=False)
    def get(self, request, **kwargs):

        queryset = AcademicPlan.objects.filter(pk=self.kwargs["pk"]).prefetch_related(
            "discipline_blocks_in_academic_plan", "discipline_blocks_in_academic_plan__modules_in_discipline_block",
            "academic_plan_in_field_of_study", "academic_plan_in_field_of_study__field_of_study",
            "academic_plan_in_field_of_study__field_of_study").select_related("author")
        serializer = AcademicPlanForAPSerializer(queryset, many=True, context={"request": request})
        if len(serializer.data) == 0:
            return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)
        newdata = dict(serializer.data[0])
        try:
            newdata.update(
                {
                    "rating": AcademicPlanInFolder.objects.get(
                        academic_plan=self.kwargs["pk"], folder__owner=self.request.user
                    ).academic_plan_rating
                }
            )
            newdata.update(
                {
                    "id_rating": AcademicPlanInFolder.objects.get(
                        academic_plan=self.kwargs["pk"], folder__owner=self.request.user
                    ).id
                }
            )
        except:
            newdata.update({"rating": False})
        newdata = OrderedDict(newdata)
        return Response(newdata, status=status.HTTP_200_OK)


class ImplementationAcademicPlanAPIView(generics.CreateAPIView):

    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ImplementationAcademicPlanListAPIView(generics.ListAPIView):
    """Эндпоинт для вывода информации о списке ОП."""

    serializer_class = ImplementationAcademicPlanSerializer
    queryset = ImplementationAcademicPlan.objects.all()
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    )
    search_fields = [
        "title",
        "academic_plan__educational_profile",
        "field_of_study__title",
        "field_of_study__number",
        "field_of_study__qualification",
        "year",
    ]
    filterset_fields = [
        "title",
        "field_of_study__title",
        "field_of_study__number",
        "field_of_study__qualification",
        "year",
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
    permission_classes = [IsRpdDeveloperOrReadOnly, IsAcademicPlanDeveloper]


class WorkProgramChangeInDisciplineBlockModuleListAPIView(generics.ListAPIView):
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["educational_profile"]
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


class WorkProgramInFieldOfStudyListView(generics.ListAPIView):
    """Отображение списка ОП(направлений), создание образовательной программы (направления)."""

    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramInFieldOfStudySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["approval_date", "authors", "discipline_code", "qualification"]
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


@extend_schema(request=None, responses=None)
@api_view(["POST"])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def CloneWorkProgramm(request):
    """
    Апи для клонирования рабочей программы
    Запрашивает id программы для клоинрования в поле program_id для тела запроса типа form-data
    В ответе передается число - айди созданной копии.
    """
    prog_id = request.data.get("program_id")
    clone_program = WorkProgram.clone_programm(prog_id)
    clone_program.editors.add(request.user)
    clone_program.owner = request.user
    clone_program.discipline_code = None
    clone_program.save()

    serializer = WorkProgramSerializer(clone_program)
    return Response(status=200, data=serializer.data)


@extend_schema(request=None, responses=None)
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def UserGroups(request):
    groups_names = []
    for group in request.user.groups.all():
        groups_names.append(group.name)
    if UserExpertise.objects.filter(
        expert=request.user
    ) or UserStructuralUnit.objects.filter(
        user=request.user, status__in=["leader", "deputy"]
    ):
        groups_names.append("expertise_member")
    notification_nums = UserNotification.objects.filter(
        user=request.user, status="unread"
    ).count()
    return Response({"groups": groups_names, "notification_nums": notification_nums})


@extend_schema(request=None, responses=None)
@api_view(["POST"])
def DisciplinesByNumber(request):
    try:
        numbers_array = request.data.get("numbers_array")
        wp_array = []
        queryset = WorkProgram.objects.filter(discipline_code__in=numbers_array)

        for wp in queryset:
            wp_array.append(
                {"id": wp.id, "discipline_code": wp.discipline_code, "title": wp.title}
            )
        return Response(wp_array)

    except:
        return Response(status=400)


@extend_schema(request=None, responses=None)
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def TimeoutTest(request):

    timer = 0
    while True:
        print("It took {} sec".format(timer))
        time.sleep(30)
        if timer < 7200:
            timer += 30
        else:
            break
    return Response(status=200)


class WorkProgramArchiveUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramArchiveUpdateSerializer
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        try:
            exp = Expertise.objects.get(work_program=instance)
            exp.expertise_status = "AR"
            exp.save()
        except Expertise.DoesNotExist:
            pass
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(WorkProgramSerializer(instance).data)


class BugsLogView(generics.CreateAPIView):
    name = "Загрузка файла ТЗ заказа"
    permission_classes = [IsAuthenticated]
    serializer_class = BugsLogSerializer
    queryset = BugsLog.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
