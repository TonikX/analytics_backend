import json
import os

import pandas
from django.core.paginator import Paginator
from django.shortcuts import redirect
from django.shortcuts import render, get_object_or_404
from django.views import View
from django_tables2 import RequestConfig
from django_tables2.paginators import LazyPaginator
from rest_framework import filters
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from dataprocessing.models import Items
from .expertise.models import Expertise, UserExpertise
from .forms import DisciplineSectionForm, TopicForm, OutcomesOfWorkProgramForm
from .forms import WorkProgramOutcomesPrerequisites, PrerequisitesOfWorkProgramForm, EvaluationToolForm
from .models import AcademicPlan, ImplementationAcademicPlan, WorkProgramChangeInDisciplineBlockModule, \
    DisciplineBlockModule, DisciplineBlock, Zun, WorkProgramInFieldOfStudy
from .models import FieldOfStudy, FieldOfStudyWorkProgram, BibliographicReference
from .models import WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, EvaluationTool, DisciplineSection, \
    Topic, Indicator, Competence, OnlineCourse
# Права доступа
from .permissions import IsOwnerOrReadOnly, IsRpdDeveloperOrReadOnly
from .serializers import AcademicPlanSerializer, ImplementationAcademicPlanSerializer, \
    ImplementationAcademicPlanCreateSerializer, AcademicPlanCreateSerializer, \
    WorkProgramChangeInDisciplineBlockModuleSerializer, DisciplineBlockModuleSerializer, \
    DisciplineBlockModuleCreateSerializer, \
    WorkProgramInFieldOfStudySerializer, ZunSerializer, WorkProgramInFieldOfStudyCreateSerializer, ZunCreateSerializer, \
    ZunCreateSaveSerializer, WorkProgramForIndividualRoutesSerializer, AcademicPlanShortSerializer, \
    WorkProgramChangeInDisciplineBlockModuleUpdateSerializer, \
    WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer, AcademicPlanSerializerForList
from .serializers import FieldOfStudySerializer
from .serializers import IndicatorSerializer, CompetenceSerializer, OutcomesOfWorkProgramSerializer, \
    WorkProgramCreateSerializer, PrerequisitesOfWorkProgramSerializer
from .serializers import OnlineCourseSerializer, BibliographicReferenceSerializer, \
    WorkProgramBibliographicReferenceUpdateSerializer, \
    PrerequisitesOfWorkProgramCreateSerializer, EvaluationToolForWorkProgramSerializer, EvaluationToolCreateSerializer, \
    IndicatorListSerializer
from .serializers import OutcomesOfWorkProgramCreateSerializer
from .serializers import TopicSerializer, SectionSerializer, TopicCreateSerializer
from .serializers import WorkProgramSerializer
from .tables import FieldOfStudyWPTable

from .folders_ans_statistic.models import WorkProgramInFolder


class FieldOfStudyWPListView(View):
    model = FieldOfStudyWorkProgram

    def get(self,request):
        table = FieldOfStudyWPTable(FieldOfStudyWorkProgram.objects.all(), order_by="name")
        RequestConfig(request, paginate={"paginator_class": LazyPaginator, "per_page": 30}).configure(
            table)
        return render(request, 'workprograms/fswp_list.html', {"table": table})



class WorkProgramsList(View):


    def get(self, request):

        workprograms = WorkProgram.objects.prefetch_related('outcomes', 'prerequisites')
        workprograms_outcomes = []
        workprograms_prerequisites = []

        for workprogram in workprograms:
            outcomes = [{'pk': OutcomesOfWorkProgram.objects.get(item_id = item.pk).id, 'item': item.name}  for item in workprogram.outcomes.all()]
            outcomes_levels = OutcomesOfWorkProgram.objects.values_list('masterylevel').filter(workprogram=workprogram.pk)
            outcomes_levels2 = [entry for entry in outcomes_levels]
            outcomes_levels3 = []
            for outcome in outcomes:
                outcomes_levels3.append({'pk': outcome['pk'],'item': outcome['item'], 'item_level': outcomes_levels2[outcomes.index(outcome)][0]})
            prerequisites = [{'pk': PrerequisitesOfWorkProgram.objects.get(item_id = item.pk).id, 'item': item.name} for item in workprogram.prerequisites.all()]
            prerequisites_levels2 = [entry for entry in PrerequisitesOfWorkProgram.objects.values_list('masterylevel').filter(
                workprogram=workprogram.pk)]
            prerequisites_levels3 = []
            for prerequisite in prerequisites:
                prerequisites_levels3.append({'pk': prerequisite['pk'],'item': prerequisite['item'], 'item_level': prerequisites_levels2[prerequisites.index(prerequisite)][0]})
                workprograms_prerequisites.append({'title': workprogram.title, 'outcomes_levels': outcomes_levels3, })
            workprograms_outcomes.append({'pk': workprogram.pk, 'hoursFirstSemester': workprogram.hoursFirstSemester,
                                          'hoursSecondSemester': workprogram.hoursSecondSemester, 'title': workprogram.title, 'outcomes_levels': outcomes_levels3,
                                          'prerequisites_levels': prerequisites_levels3})

        paginator = Paginator(workprograms_outcomes, 10) # Show 10 items per page
        page = request.GET.get('page')
        workprograms = paginator.get_page(page)
        return render(request, 'workprograms/workprograms.html', {'workprograms': workprograms})


class WorkProgramsPost(View):
    """
    Вторая версия редактора рабочих программ
    """
    def get(self, request):
        form = WorkProgramOutcomesPrerequisites()
        return render(request, 'workprograms/WorkProgramOutcomesPrerequisitesEdit.html', {'form': form})

    def post(self, request):
        WorkProgramOP = WorkProgramOutcomesPrerequisites(request.POST)
        if WorkProgramOP.is_valid():
            WorkProgramOP.save()
            return redirect('workprograms')
        return render(request, 'workprograms/WorkProgramOutcomesPrerequisitesEdit.html', {'form': WorkProgramOP})


class WorkProgramView(View):

    """
    Вторая версия просмотра программ
    """

    def get(self, request, pk):
        thisworkprogram_for_atributes = WorkProgram.objects.get(pk=pk)
        print ('thisworkprogram_for_atributes', thisworkprogram_for_atributes.goals)
        thisworkprogram = WorkProgram.objects.filter(pk=pk).prefetch_related('outcomes', 'prerequisites')
        workprograms_outcomes = []
        workprograms_prerequisites = []
        prerequisites_of_workprogram = WorkProgram.objects.all()[0].prerequisites.all()
        # prerequisites_levels = PrerequisitesOfWorkProgram.objects.values_list('masterylevel').filter(
        #     workprogram=pk, item=prerequisites_of_workprogram[0].pk)

        prerequisites_and_levels =[]
        print (prerequisites_of_workprogram)
        prerequisites_levels = []
        prerequisites_levels2 = [entry for entry in prerequisites_levels]
        for prerequisite in prerequisites_of_workprogram:
            #pk = PrerequisitesOfWorkProgram.objects.values_list('id').filter(
            #workprogram=pk, item=prerequisite.pk)
            #print(pk)
            prerequisites_levels = PrerequisitesOfWorkProgram.objects.values_list('masterylevel').filter(
                workprogram=pk, item=prerequisite.pk)
            #print (prerequisites_levels)
            prerequisites_and_levels.append({'item': prerequisite, 'item_level':  prerequisites_levels[0][0]})

        workprograms_outcomes.append({'pk': thisworkprogram[0].pk, 'hoursFirstSemester': thisworkprogram[0].hoursFirstSemester,
                                      'hoursSecondSemester': thisworkprogram[0].hoursSecondSemester, 'title': thisworkprogram[0].title,
                                      'prerequisites_levels': prerequisites_and_levels})
        #Работа над разделами и темами
        discipline_section_list = DisciplineSection.objects.filter(work_program_id=pk)
        discipline_topics_list =[]
        for discipline_section in discipline_section_list:
            discipline_topics = Topic.objects.select_related('discipline_section').filter(discipline_section = discipline_section.pk)
            discipline_topics_list.append(discipline_topics)



        return render(request, 'workprograms/workprogram.html', {'workprogram_atributes':thisworkprogram_for_atributes, 'workprograms': workprograms_outcomes, 'discipline_list': discipline_section_list,
                                                                 'discipline_topics_list': discipline_topics_list,})


class WorkProgramsPostUpdate(View):

    def get(self, request, pk):
        wp_obj = get_object_or_404(WorkProgram, id=pk)
        form = WorkProgramOutcomesPrerequisites(instance=wp_obj)
        return render(request, 'workprograms/WorkProgramOutcomesPrerequisitesEdit.html', {'form': form})

    def post(self, request, pk):
        wp_obj = get_object_or_404(WorkProgram, id=pk)

        if request.method == "POST":
            WorkProgramOP = WorkProgramOutcomesPrerequisites(request.POST, instance=wp_obj)
            if WorkProgramOP.is_valid():
                WorkProgramOP.save()
                return redirect('workprograms')
        else:
            WorkProgramOP = WorkProgramOutcomesPrerequisites(instance=wp_obj)
        return render(request, 'workprograms/WorkProgramOutcomesPrerequisitesEdit.html', {'form': WorkProgramOP})


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
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['discipline_code', 'title']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class PrerequisitesUpdate(View):
    def get(self, request, pk):
        p_obj = get_object_or_404(PrerequisitesOfWorkProgram, id=pk)
        form = PrerequisitesOfWorkProgramForm(instance=p_obj)
        return render(request, 'workprograms/PrerequisitesOfWorkProgramEdit.html', {'form': form})

    def post(self, request, pk):
        p_obj = get_object_or_404(PrerequisitesOfWorkProgram, id=pk)

        if request.method == "POST":
            prerequisite = PrerequisitesOfWorkProgramForm(request.POST, instance=p_obj)
            if prerequisite.is_valid():
                prerequisite.save()
                return redirect('workprograms')
        else:
            prerequisite = PrerequisitesOfWorkProgramForm(instance=p_obj)
        return render(request, 'workprograms/PrerequisitesOfWorkProgramEdit.html', {'form': prerequisite})
#
#Outcomes Update
#
class OutcomesUpdate(View):
    def get(self, request, pk):
        o_obj = get_object_or_404(OutcomesOfWorkProgram, id=pk)
        form = OutcomesOfWorkProgramForm(instance=o_obj)
        return render(request, 'workprograms/OutcomesOfWorkProgramEdit.html', {'form': form})

    def post(self, request, pk):
        o_obj = get_object_or_404(OutcomesOfWorkProgram, id=pk)

        if request.method == "POST":
            outcomes = OutcomesOfWorkProgramForm(request.POST, instance=p_obj)
            if outcomes.is_valid():
                outcomes.save()
                return redirect('workprograms')
        else:
            outcomes = OutcomesPrerequisites(instance=o_obj)
        return render(request, 'workprograms/OutcomesOfWorkProgramEdit.html', {'form': outcomes})


class EvaluationToolList(View):

    def get(self, request):
        evaluation = EvaluationTool.objects.all()
        result = []
        for e in evaluation:
            sections = DisciplineSection.objects.filter(evaluation_tools = e)
            result.append({'pk': e.pk, 'type': e.type,
                           'name': e.name, 'description': e.description, 'sections': sections})

        paginator = Paginator(result, 10) # Show 25 contacts per page
        page = request.GET.get('page')
        evaluation = paginator.get_page(page)
        return render(request, 'workprograms/evaluation_list.html', {'evaluation': evaluation})



class EvaluationToolPost(View):

    def get(self, request):
        form = EvaluationToolForm()
        return render(request, 'workprograms/EvaluationToolEdit.html', {'form': form})

    def post(self, request):
        evaluation = EvaluationToolForm(request.POST)
        if evaluation.is_valid():
            evaluation.save()
            return redirect('evaluation')
        return render(request, 'workprograms/EvaluationToolEdit.html', {'form': evaluation})

class EvaluationToolPostUpdate(View):

    def get(self, request, pk):
        et_obj = get_object_or_404(EvaluationTool, id=pk)
        form = EvaluationToolForm(instance=et_obj)
        return render(request, 'workprograms/EvaluationToolEdit.html', {'form': form})

    def post(self, request, pk):
        et_obj = get_object_or_404(EvaluationTool, id=pk)

        if request.method == "POST":
            evaluation = EvaluationToolForm(request.POST, instance=et_obj)
            if evaluation.is_valid():
                evaluation.save()
                return redirect('evaluation')
        else:
            evaluation = WorkProgramOutcomesPrerequisites(instance=et_obj)
        return render(request, 'workprograms/EvaluationToolEdit.html', {'form': evaluation})


class DisciplineSectionList(View):

    def get(self, request):
        sections = DisciplineSection.objects.all()
        section = []
        for e in sections:
            topic = Topic.objects.filter(discipline_section = e)
            section.append({'pk': e.pk, 'name': e.name, 'work_program': e.work_program,'evaluation_tools': e.evaluation_tools, 'topic': topic})

        paginator = Paginator(section, 25) # Show 25 contacts per page
        page = request.GET.get('page')
        sections = paginator.get_page(page)
        return render(request, 'workprograms/sections_list.html', {'section': sections})


class DiscplineSectionPost(View):

    def get(self, request):
        form = DisciplineSectionForm()
        return render(request, 'workprograms/DisciplineSectionEdit.html', {'form': form})

    def post(self, request):
        section = DisciplineSectionForm(request.POST)
        if section.is_valid():
            section.save()
            return redirect('section')
        return render(request, 'workprograms/DisciplineSectionEdit.html', {'form': section})

class DisciplineSectionPostUpdate(View):

    def get(self, request, pk):
        ds_obj = get_object_or_404(DisciplineSection, id=pk)
        form = DisciplineSectionForm(instance=ds_obj)
        return render(request, 'workprograms/EvaluationToolEdit.html', {'form': form})

    def post(self, request, pk):
        ds_obj = get_object_or_404(DisciplineSection, id=pk)

        if request.method == "POST":
            section = DisciplineSectionForm(request.POST, instance=ds_obj)
            if section.is_valid():
                section.save()
                return redirect('section')
        else:
            section = DisciplineSection(instance=ds_obj)
        return render(request, 'workprograms/DisciplineSectionEdit.html', {'form': section})


class TopicList(View):

    def get(self, request):
        topic = Topic.objects.all()
        paginator = Paginator(topic, 25) # Show 25 contacts per page
        page = request.GET.get('page')
        topic = paginator.get_page(page)
        return render(request, 'workprograms/topics_list.html', {'topic': topic})


class TopicPost(View):

    def get(self, request):
        form = TopicForm()
        return render(request, 'workprograms/TopicEdit.html', {'form': form})

    def post(self, request):
        topic = TopicForm(request.POST)
        if topic.is_valid():
            topic.save()
            return redirect('topic')
        return render(request, 'workprograms/TopicEdit.html', {'form': topic})

class TopicPostUpdate(View):

    def get(self, request, pk):
        t_obj = get_object_or_404(Topic, id=pk)
        form = TopicForm(instance=t_obj)
        return render(request, 'workprograms/TopicEdit.html', {'form': form})

    def post(self, request, pk):
        t_obj = get_object_or_404(Topic, id=pk)

        if request.method == "POST":
            topic = TopicForm(request.POST, instance=t_obj)
            if topic.is_valid():
                topic.save()
                return redirect('topic')
        else:
            topic = Topic(instance=t_obj)
        return render(request, 'workprograms/TopicEdit.html', {'form': topic})






"""Блок реализации API"""


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
    search_fields = ['name','number']
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


class OutcomesOfWorkProgramDestroyView(generics.DestroyAPIView):
    queryset = OutcomesOfWorkProgram.objects.all()
    serializer_class = OutcomesOfWorkProgramCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


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
        prerequisites_of_this_wp = PrerequisitesOfWorkProgram.objects.filter(workprogram__discipline_code=self.kwargs['discipline_code']).values("item__name")
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
        outcomes_of_this_wp = OutcomesOfWorkProgram.objects.filter(workprogram__discipline_code=self.kwargs['discipline_code']).values("item__name")
        print ('dd', outcomes_of_this_wp)
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
        outcomes_of_this_wp = OutcomesOfWorkProgram.objects.filter(workprogram__discipline_code=self.kwargs['discipline_code']).values("item__name")
        print ('dd', outcomes_of_this_wp)
        queryset = WorkProgram.objects.filter(outcomes__items__name__in=outcomes_of_this_wp)
        serializer = WorkProgramSerializer(queryset, many=True)
        return Response(serializer.data)


class PrerequisitesOfWorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer
    queryset = PrerequisitesOfWorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class PrerequisitesOfWorkProgramDestroyView(generics.DestroyAPIView):
    queryset = PrerequisitesOfWorkProgram.objects.all()
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class PrerequisitesOfWorkProgramUpdateView(generics.UpdateAPIView):
    queryset = PrerequisitesOfWorkProgram.objects.all()
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


#Блок эндпоинтов рабочей программы

class WorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = WorkProgramCreateSerializer
    queryset = WorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def perform_create(self, serializer):
            serializer.save(owner=self.request.user)


class WorkProgramDestroyView(generics.DestroyAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializer
    permission_classes = [IsOwnerOrReadOnly]


class WorkProgramUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramCreateSerializer
    permission_classes = [IsOwnerOrReadOnly]


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
            if Expertise.objects.get(
                    work_program__id=self.kwargs['pk']).expertise_status == "WK" and WorkProgram.objects.get(
                    pk=self.kwargs['pk']).owner == request.user:
                print(WorkProgram.objects.get(pk=self.kwargs['pk']).owner, request.user)
                newdata.update({"can_edit": True})
            else:
                newdata.update({"can_edit": False})
        except Expertise.DoesNotExist:
            if WorkProgram.objects.get(pk=self.kwargs['pk']).owner == request.user:
                newdata.update({"can_edit": True, "expertise_status": False})
            else:
                newdata.update({"can_edit": False, "expertise_status": False})
        try:
            ue = UserExpertise.objects.get(expert=request.user, expertise__work_program=self.kwargs['pk'])
            if Expertise.objects.get(work_program__id=self.kwargs['pk']).expertise_status == "EX":
                newdata.update({"can_comment": True})
                newdata.update({"user_expertise_id": ue.id})
            else:
                newdata.update({"can_comment": False})
            if ue.stuff_status == "AU" or ue.user_expertise_status == "AP" or ue.user_expertise_status == "RE":
                newdata.update({"can_approve": False})
                if ue.user_expertise_status == "AP":
                    newdata.update({"your_approve_status": "AP"})
                else:
                    newdata.update({"your_approve_status": "RE"})
            else:
                newdata.update({"can_approve": True})
        except:
            newdata.update({"can_comment": False})
            newdata.update({"can_approve": False})
        if request.user.is_expertise_master == True:
            newdata.update({"can_archive": True})
        else:
            newdata.update({"can_archive": False})
        if request.user.groups.filter(name="student"):
            newdata.update({"can_add_to_folder": True})
            newdata.update({"is_student": True})
        else:
            newdata.update({"can_add_to_folder": True})
            newdata.update({"is_student": False})
        if WorkProgramInFolder.objects.get(work_program = self.kwargs['pk'], folder__owner = self.request.user):
            newdata.update({"rating": WorkProgramInFolder.objects.get(work_program = self.kwargs['pk'], folder__owner = self.request.user).work_program_rating})
            newdata.update({"id_rating": WorkProgramInFolder.objects.get(work_program = self.kwargs['pk'], folder__owner = self.request.user).id})
        else:
            newdata.update({"rating": False})
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
        #queryset = BibliographicReference.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        try:
            print ('f', WorkProgram.objects.get(discipline_code=self.kwargs['discipline_code']).discipline_code)
            queryset = WorkProgram.objects.filter(discipline_code=self.kwargs['discipline_code'])
            print (queryset)
            serializer = WorkProgramForIndividualRoutesSerializer(queryset, many=True)
            print (serializer.data)
            return Response(serializer.data)
        except:
            return Response({"error":"work program with such a code was not found"}, status=status.HTTP_400_BAD_REQUEST)


#Конец блока ендпоинтов рабочей программы


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
        serializer.save(number = Topic.objects.filter(discipline_section = serializer.validated_data['discipline_section']).count()+1)


class TopicDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Topic.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


    def delete(self, request, *args, **kwargs):
        topic_section=kwargs['pk']
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
        serializer = ZunCreateSerializer(data=request.data, many=True)
        # wp_in_fs = serializer.validated_data['wp_in_fs']
        # print (wp_in_fs)
        print (request.data)
        #print (request.data.get('wp_changeblock'))
        for new_zun in request.data:
            #print (new_zun.get('wp_changeblock'))
            # if WorkProgramInFieldOfStudy.objects.filter(work_program_change_in_discipline_block_module__id = new_zun.get('wp_changeblock')):
            if WorkProgramInFieldOfStudy.objects.filter(work_program_change_in_discipline_block_module__id = new_zun.get('wp_changeblock'), work_program__id = new_zun.get('work_program')):
                print("new_zun", WorkProgramInFieldOfStudy.objects.filter(work_program_change_in_discipline_block_module__id = new_zun.get('wp_changeblock'), work_program__id = new_zun.get('work_program')))
                wp_in_fs = WorkProgramInFieldOfStudy.objects.filter(work_program_change_in_discipline_block_module__id = new_zun.get('wp_changeblock'), work_program__id = new_zun.get('work_program'))[0]
                print (wp_in_fs)
                print ("Замена номера прошла успешно")
            else:
                wp_in_fs = WorkProgramInFieldOfStudy()
                print (WorkProgramChangeInDisciplineBlockModule.objects.filter(id = int(new_zun.get('wp_changeblock')))[0])
                wp_in_fs.work_program_change_in_discipline_block_module = WorkProgramChangeInDisciplineBlockModule.objects.filter(id = int(new_zun.get('wp_changeblock')))[0]
                wp_in_fs.work_program = WorkProgram.objects.filter(id = int(new_zun.get('work_program')))[0]
                wp_in_fs.save()
                print (wp_in_fs)
            print (Indicator.objects.filter(id = int(new_zun.get('indicator_in_zun')))[0].id)
            #print ('wp_in_fs', wp_in_fs.values_list('pk', flat=True)[0])
            wp_for_response_serializer =[]
            print(new_zun.get('items'))
            print (WorkProgramChangeInDisciplineBlockModule.objects.filter(id = int(new_zun.get('wp_changeblock')))[0])
            wp_cb = WorkProgramChangeInDisciplineBlockModule.objects.filter(id = int(new_zun.get('wp_changeblock')))[0]
            wp_for_response_serializer.append(WorkProgramChangeInDisciplineBlockModule.objects.filter(id = int(new_zun.get('wp_changeblock')))[0])
            new_zun = {"wp_in_fs" : wp_in_fs.id, "indicator_in_zun" : Indicator.objects.filter(id = int(new_zun.get('indicator_in_zun')))[0].id, "items": new_zun.get('items')}
            # , "items": int(new_zun.get('items'))
            print(new_zun)
            serializer = ZunCreateSaveSerializer(data = new_zun)
            print (serializer)
            print

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                print ("Сохранение прошло")
                #return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # else:
            #     return Response({"error":"change_block does not exist"}, status=400)
            # wp_change_block = WorkProgramChangeInDisciplineBlockModule.objects.get(work_program__in = )
        print ('чейнж блок', wp_cb)
        print (wp_for_response_serializer)
        response_serializer = WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer(wp_cb)
        return Response(response_serializer.data)
        # if response_serializer.is_valid():
        #     #response_serializer.is_valid(raise_exception=True)
        #     # data = response_serializer.data[:]
        #     # print (data)
        #     return Response(response_serializer.data)
        # else:
        #     return Response(response_serializer.errors)

        # return HttpResponse(json.dumps(response_serializer.data, ensure_ascii=False), content_type="application/json")

        #return Response(response_serializer.data)


class ZunDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Zun.я
    """
    queryset = Zun.objects.all()
    serializer_class = ZunCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


    def update(self, request, *args, **kwargs):
        for new_zun in request.data:
            print ('wp_changeblock', new_zun.get('wp_changeblock'))
            print (Zun.objects.get(id = kwargs['pk']).items)
            wp_changeblock_id = int(new_zun.get('wp_changeblock'))
            print ('wp_changeblock_id', wp_changeblock_id)
            wp_cb = WorkProgramChangeInDisciplineBlockModule.objects.filter(id = wp_changeblock_id)
            if Zun.objects.get(id = kwargs['pk']):
                for item in new_zun.get('items'):
                    print ('item', item)
            new_zun = {"id": Zun.objects.get(id = kwargs['pk']).id, "wp_in_fs" : Zun.objects.get(id = kwargs['pk']).wp_in_fs.id, "indicator_in_zun" : Indicator.objects.filter(id = int(new_zun.get('indicator_in_zun')))[0].id, "items": new_zun.get('items')}
            print(new_zun)
            serializer = ZunCreateSaveSerializer(Zun.objects.get(id = kwargs['pk']), data = new_zun)
            #print (serializer)

            if serializer.is_valid(raise_exception=True):
                old_zun = Zun.objects.get(id = kwargs['pk']).items.clear()
                serializer.save()
                print ("Сохранение прошло")
                #return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        print ('чейнж блок', wp_cb)
        response_serializer = WorkProgramChangeInDisciplineBlockModuleForCRUDResponseSerializer(wp_cb, many=True)
        return Response(response_serializer.data)
        # return Response(serializer.data)


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
        descipline_section=kwargs['pk']
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
    serializer_class = FieldOfStudySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title','number', 'faculty', 'educational_profile']
    permission_classes = [IsRpdDeveloperOrReadOnly]


@api_view(['GET', 'POST'])
def NewOrdinalNumbersForDesciplineSectionAPI(request):
    descipline_section = request.data.get('descipline_section')
    new_ordinal_number = request.data.get('new_ordinal_number')
    try:
        DisciplineSection.new_ordinal_number(descipline_section, new_ordinal_number)
        return Response(status=200)
    except:
        return Response(status=400)


@api_view(['GET', 'POST'])
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


class FileUploadWorkProgramOutcomesAPIView(APIView):
    """
    API эндпоинт для добавления данных о РПД из csv-файла, спарсенного с online.edu.ru
    """

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            data = handle_uploaded_file_v2(request.FILES['file'], str(request.FILES['file']))
            print (data)
            data.fillna('не задано', inplace=True)
            for i in range(len(data)):
                outcomes = data['KEYWORDS'][i].split(', ')
                outcomes_items = []
                print (outcomes)

                for o in outcomes:
                    #o = o.capitalize()
                    o=str(o)
                    print (o)

                    if Items.objects.filter(name = o).exists():
                        print ('items finding', Items.objects.filter(name = o)[0])
                        outcomes_items.append(Items.objects.filter(name = o)[0])
                    else:
                        print ('попытка сохранения')
                        item = Items(name = o)
                        item.save()
                        outcomes_items.append(item)
                        print ('после сохранения', item)

                outcomes_items = Items.objects.filter(name__in = outcomes_items)
                print("Outcomes--", outcomes_items)

                if WorkProgram.objects.filter(discipline_code = data['DIS_CODE'][i]).exists():
                    # если запись уже есть то апдейтим
                    wp_obj = WorkProgram.objects.filter(discipline_code = data['DIS_CODE'][i])[0]
                    if len(outcomes_items) !=0:
                        for item in outcomes_items:
                            print ('item', item)
                            #print ('jj', OutcomesOfWorkProgram.objects.filter(item = item, workprogram = wp_obj)[0])
                            if OutcomesOfWorkProgram.objects.filter(item = item, workprogram = wp_obj).exists():
                                print ('результат существует')
                            else:
                                out_obj = OutcomesOfWorkProgram(item = item, workprogram = wp_obj, masterylevel = "2")
                                out_obj.save()
                                print ('item', item, 'was saved for')
                else:
                    print ('Рпд не найдена')
            return Response({"Message": "All data processed"}, status=status.HTTP_201_CREATED)

        except:
            return Response({"Message": "Data not loaded"}, status=status.HTTP_400_BAD_REQUEST)


#Блок эндпоинтов рабочей программы


class OnlineCourseListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = OnlineCourseSerializer
    queryset = OnlineCourse.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title','platform']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class OnlineCourseDestroyView(generics.DestroyAPIView):
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class OnlineCourseUpdateView(generics.UpdateAPIView):
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class OnlineCourseDetailsView(generics.RetrieveAPIView):
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


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
        #queryset = BibliographicReference.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        queryset = WorkProgram.objects.get(id=self.kwargs['workprogram_id']).bibliographic_reference.all()
        serializer = BibliographicReferenceSerializer(queryset, many=True)
        return Response(serializer.data)


class EvaluationToolInWorkProgramList(generics.ListAPIView):
    serializer_class = EvaluationToolForWorkProgramSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        try:
            queryset = EvaluationTool.objects.filter(evaluation_tools__in=DisciplineSection.objects.filter(work_program__id=self.kwargs['workprogram_id'])).distinct()
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
            queryset = FieldOfStudy.objects.filter(workprograms_in_fieldofstudy__id = self.kwargs['workprogram_id']).distinct()
            serializer = FieldOfStudySerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response(status=400)


#Блок эндпоинтов для обрабоки файлов

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

    df = pandas.read_csv(path, sep=';', encoding = 'utf-8')
    #df.dropna(subset=['Направления подготовки'], inplace = True)
    #df = df.drop(['Unnamed: 0'], axis=1)
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

    df = pandas.read_csv(path, sep=',', encoding = 'utf-8')
    df.dropna(subset=['Направления подготовки'], inplace = True)
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

                #получаем список всех объектов-пререквизитов для дисциплины
                prerequisite = data['Ключевые слова-пререквизиты'][i].split(', ')
                prerequisite_items = []

                for p in prerequisite:
                    p = p.capitalize()
                    if Items.objects.filter(name = p).exists():
                        prerequisite_items.append(Items.objects.get(name = p))
                    else:
                        item = Items(name = p)
                        item.save()
                        prerequisite_items.append(item)

                prerequisite_items = Items.objects.filter(name__in = prerequisite_items)
                print("Pre--",prerequisite_items)

                #получаем список всех объектов-результатов для дисциплины
                outcomes = data['Ключевые слова содержания'][i].split(', ')
                outcomes_items = []

                for o in outcomes:
                    o = o.capitalize()

                    if Items.objects.filter(name = o).exists():
                        outcomes_items.append(Items.objects.get(name = o))
                    else:
                        item = Items(name = o)
                        item.save()
                        outcomes_items.append(item)

                outcomes_items = Items.objects.filter(name__in = outcomes_items)
                print("Outcomes--", outcomes_items)

                #получаем список всех направленний для дисциплины
                field_of_study = data['Направления подготовки'][i].split('                                         ')
                field_of_study.remove(field_of_study[len(field_of_study )-1])
                fs_list = []
                for f in field_of_study:
                    number,title,empty = re.split('.([А-Я][^А-Я]*)', f)
                    if FieldOfStudy.objects.filter(number = number, title = title).exists():
                        fs_list.append(FieldOfStudy.objects.get(number = number, title = title))
                    else:
                        fs_obj = FieldOfStudy(number = number, title = title )
                        fs_obj.save()
                        fs_list.append(fs_obj)

                fs_list = FieldOfStudy.objects.filter(number__in = fs_list)
                print(fs_list)

                if WorkProgram.objects.filter(title = data['Название курса'][i]).exists():
                    # если запись уже есть то апдейтим
                    wp_obj = WorkProgram.objects.get(title = data['Название курса'][i])
                    if len(prerequisite_items) !=0:
                        for item in prerequisite_items:
                            prereq_obj = PrerequisitesOfWorkProgram(item = item, workprogram = wp_obj)
                            prereq_obj.save()
                    if len(outcomes_items) !=0:
                        for item in outcomes_items:
                            out_obj = OutcomesOfWorkProgram(item = item, workprogram = wp_obj)
                            out_obj.save()

                    for fs in fs_list:
                        fswp_obj = FieldOfStudyWorkProgram(field_of_study = fs, work_program = wp_obj)
                        fswp_obj.save()

                else:

                    # если нет, то записываем в БД и апдейтим
                    wp_obj = WorkProgram(title = data['Название курса'][i])
                    wp_obj.save()
                    if len(prerequisite_items) !=0:
                        for item in prerequisite_items:
                            prereq_obj = PrerequisitesOfWorkProgram(item = item, workprogram = wp_obj)
                            prereq_obj.save()

                    if len(outcomes_items) !=0:
                        for item in outcomes_items:
                            out_obj = OutcomesOfWorkProgram(item = item, workprogram = wp_obj)
                            out_obj.save()

                    for fs in fs_list:
                        fswp_obj = FieldOfStudyWorkProgram(field_of_study = fs, work_program = wp_obj)
                        fswp_obj.save()


            except:
                print(i)
                continue;
        return Response(status=200)

class FileUploadOnlineCoursesAPIView(APIView):
    """
    API эндпоинт для добавления данных об онлайн курсах из csv-файла, спарсенного с online.edu.ru
    """


    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = handle_uploaded_file(request.FILES['file'], str(request.FILES['file']))
        data.fillna('', inplace=True)

        for i in range(len(data)):
            try:
                #получаем список всех объектов-пререквизитов для дисциплины
                if OnlineCourse.objects.filter(title = data['Название курса'][i]).exists():
                    # если запись уже есть то апдейтим
                    oc_obj = OnlineCourse.objects.get(title = data['Название курса'][i])
                    oc_obj.platform = 'online.edu.ru'
                    oc_obj.description = data['Содержание курса'][i]
                    oc_obj.course_url = data['URL'][i]

                else:

                    # если нет, то записываем в БД и апдейтим
                    oc_obj = OnlineCourse(title = data['Название курса'][i],
                                          platform = 'online.edu.ru',
                                          description = data['Содержание курса'][i],
                                          course_url = data['URL'][i])
                    oc_obj.save()
            except:
                print(i)
                continue;
        return Response(status=200)

from discipline_code import IPv4_code


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
    sys_df = pandas.read_excel('discipline_code/discipline_bank_updated.xlsx')
    print('IPv4_code generating')
    processed_data, db = IPv4_code.generate_df_w_unique_code(in_df, sys_df)
    db.to_excel("discipline_code/discipline_bank_updated.xlsx", index=False)
    print(processed_data.head())
    return processed_data

class FileUploadAPIView(APIView):
    """
    API-endpoint для загрузки файла sub_2019_2020_new
    """


    def post(self, request):
        print('Working')

        #serializer = FileUploadSerializer(data=request.data)
        #serializer.is_valid(raise_exception=True)

        data = handle_uploaded_csv(request.FILES['file'], str(request.FILES['file']))
        print(len(data['SUBJECT'].drop_duplicates().to_list()))
        #импортируем json с порядком модулей
        with open('/application/workprogramsapp/modules-order.json', 'r', encoding='utf-8') as fh: #открываем файл на чтение
            order = json.load(fh)

        #data['CREDITS'].fillna('0', inplace=True)
        #берем только первые 3 семестра
        #data = data[(data['SEMESTER']<5)]

        print('============Создаю рпд и направления============')
        #создаем рпд и направления
        fs_count, wp_count, ap_count = 0,0,0
        for i in list(data.index.values):
            try:
                print('---Новая строка---')


                if data['DEGREE'][i].strip() == 'Академический бакалавр':
                    qualification = 'bachelor'
                elif data['DEGREE'][i].strip() == 'Магистр':
                    qualification = 'master'
                else:
                    qualification = 'specialist'
                print (qualification)

                credit_units = [0 for i in range(0,12)]
                units = data.loc[(data['SUBFIELDNAME']==data['SUBFIELDNAME'][i])&(data['CYCLE']==data['CYCLE'][i])&(data['COMPONENT']==data['COMPONENT'][i])&(data['SUBJECT']==data['SUBJECT'][i])]
                #units = data[(data['SUBFIELDNAME']==data['SUBFIELDNAME'][i])&(data['CYCLE']==data['CYCLE'][i])&(data['COMPONENT']==data['COMPONENT'][i])&(data['SUBJECT']==data['SUBJECT'][i])].drop_duplicates()
                try:
                    for u in units.index.values:
                        if pandas.isna(units["CREDITS"][u]) or units["CREDITS"][u] == 0: credit_units[int(units["SEMESTER"][u]) - 1] = "-"
                        elif units["SEMESTER"][u] == ".": credit_units[11] = units["CREDITS"][u]
                        else: credit_units[int(units["SEMESTER"][u]) - 1] = int(units["CREDITS"][u])
                except:
                    print ("mistake with units")
                    pass

                # проверяем если ОП уже существует в БД
                if FieldOfStudy.objects.filter(number = data['SUBFIELDCODE'][i], qualification=qualification).exists():
                    fs_obj = FieldOfStudy.objects.get(number = data['SUBFIELDCODE'][i], qualification=qualification )
                else:
                    # Записываем в БД новую ОП
                    #
                    fs_obj = FieldOfStudy(number = data['SUBFIELDCODE'][i], title = data['MAJOR_NAME'][i].strip(),
                        qualification=qualification)
                    fs_obj.save()
                    fs_count+=1

                print('Направление подготовки: ', fs_obj)
                # Проверяем если Дисцпилина уже есть в БД
                #
                print (data['SUBJECT'][i].strip(), data['DIS_CODE'][i])
                if WorkProgram.objects.filter(title = data['SUBJECT'][i].strip(), discipline_code = data['DIS_CODE'][i]).exists():
                    # если да, то получаем объект
                    #
                    print ('1', WorkProgram.objects.filter(title = data['SUBJECT'][i].strip(), discipline_code = data['DIS_CODE'][i]))
                    wp_obj = WorkProgram.objects.get(title = data['SUBJECT'][i].strip(), discipline_code = data['DIS_CODE'][i])
                    wp_obj.discipline_code = data['DIS_CODE'][i] #заменить в параметры
                    wp_obj.credit_units = ",".join(map(str, credit_units)) #убрать
                    print ('2', wp_obj)
                else:
                    # если нет, то записываем в БД

                    wp_obj = WorkProgram(title = data['SUBJECT'][i].strip(), discipline_code = data['DIS_CODE'][i], subject_code = data['SUBJECT_CODE'][i], qualification = qualification, credit_units = ",".join(map(str, credit_units)))
                    wp_obj.save()
                    wp_count+=1
                print('Рабочая программа дисциплины: ', wp_obj)


                if FieldOfStudyWorkProgram.objects.filter(field_of_study = fs_obj, work_program = wp_obj).exists():
                    print('FieldOfStudyWorkProgram exist')
                else:
                    # Теперь записываем в FieldOfStudyWorkProgram
                    fswp_obj = FieldOfStudyWorkProgram(field_of_study = fs_obj, work_program = wp_obj)
                    fswp_obj.save()

                print('Связь рабочей программы и дисциплины: done')

                if AcademicPlan.objects.filter(qualification = qualification, year = data['YEAR'][i], educational_profile = data['SUBFIELDNAME'][i].strip()).exists():
                    ap_obj = AcademicPlan.objects.get(qualification = qualification, year = data['YEAR'][i], educational_profile = data['SUBFIELDNAME'][i].strip())
                    print ('старый', ap_obj)

                else:
                    # if data['TYPELEARNING'][i].strip() == "традиционное":
                    #     typelearning = 'internal'
                    # else:
                    #     typelearning = 'extramural'
                    typelearning = 'internal'
                    print (typelearning)
                    ap_obj = AcademicPlan(education_form = typelearning, qualification = qualification, year = data['YEAR'][i], educational_profile = data['SUBFIELDNAME'][i].strip())
                    ap_obj.save()
                    ap_count+=1
                    print ('новый', ap_obj)

                print('Учебный план: ', ap_obj)

                if ImplementationAcademicPlan.objects.filter(academic_plan = ap_obj, field_of_study = fs_obj, year = data['YEAR'][i]).exists():
                    print('ImplementationAcademicPlan exist')
                else:
                    iap_obj = ImplementationAcademicPlan(academic_plan = ap_obj, field_of_study = fs_obj, year = data['YEAR'][i])
                    iap_obj.save()
                print('Связь учебного плана и направления: done')

                if DisciplineBlock.objects.filter(name = data['CYCLE'][i].strip(), academic_plan = ap_obj).exists():
                    db = DisciplineBlock.objects.get(name = data['CYCLE'][i].strip(), academic_plan = ap_obj)
                else:
                    db = DisciplineBlock(name = data['CYCLE'][i].strip(), academic_plan_id = ap_obj.id, )
                    db.save()

                print('Блок: ', db)

                try:
                    o = order[data['COMPONENT'][i].strip()]
                except:
                    order.update({data['COMPONENT'][i].strip():len(order)})
                    o = order[data['COMPONENT'][i].strip()]

                if DisciplineBlockModule.objects.filter(name = data['COMPONENT'][i].strip(), descipline_block = db).exists():
                    mdb = DisciplineBlockModule.objects.get(name = data['COMPONENT'][i].strip(), descipline_block = db)
                else:
                    mdb = DisciplineBlockModule(name = data['COMPONENT'][i].strip(), descipline_block = db,
                                                order = o)
                    mdb.save()

                print('Модуль в блоке: ', mdb)

                if (data['ISOPTION'][i] == 'Optionally' and WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module = mdb, change_type = data['ISOPTION'][i]).exists()):
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module = mdb, change_type = data['ISOPTION'][i])
                    if WorkProgramInFieldOfStudy.objects.filter(work_program_change_in_discipline_block_module = wpchangemdb, work_program = wp_obj).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(work_program_change_in_discipline_block_module = wpchangemdb, work_program = wp_obj)
                    else:
                        wpinfs = WorkProgramInFieldOfStudy(work_program_change_in_discipline_block_module = wpchangemdb, work_program = wp_obj)
                        wpinfs.save()
                    #wpchangemdb.work_program.add(wp_obj)
                elif WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module = mdb, change_type = data['ISOPTION'][i], work_program = wp_obj).exists():
                    print('exist', wp_obj)

                else:
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule()
                    wpchangemdb.credit_units = ",".join(map(str, credit_units))
                    wpchangemdb.change_type = data['ISOPTION'][i]
                    wpchangemdb.discipline_block_module = mdb
                    wpchangemdb.save()
                    if WorkProgramInFieldOfStudy.objects.filter(work_program_change_in_discipline_block_module = wpchangemdb, work_program = wp_obj).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(work_program_change_in_discipline_block_module = wpchangemdb, work_program = wp_obj)
                    else:
                        wpinfs = WorkProgramInFieldOfStudy(work_program_change_in_discipline_block_module = wpchangemdb, work_program = wp_obj)
                        wpinfs.save()
                print('Рабочая программа дисциплины записана в модуль: done')

                # if Zun.objects.filter(wp_in_fs = wpinfs).exists():
                #     pass
                # else:
                #     zun = Zun(wp_in_fs = wpinfs)
                #     zun.save()
                #     #wpchangemdb.work_program.add(wp_obj)

            except:
                print('Строка ',i, 'не записалась, проверьте на опечатки или пустые значения')
                continue;

        print(f'Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}')

        return Response(status=200)



class AcademicPlanListAPIView(generics.ListAPIView):

    serializer_class = AcademicPlanSerializerForList
    queryset = AcademicPlan.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['educational_profile']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class AcademicPlanListShortAPIView(generics.ListAPIView):
    serializer_class = AcademicPlanShortSerializer
    queryset = AcademicPlan.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['educational_profile']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class AcademicPlanCreateAPIView(generics.CreateAPIView):
    serializer_class = AcademicPlanCreateSerializer
    queryset = AcademicPlan.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


    def perform_create(self, serializer):
        serializer.save()
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
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['academic_plan__number', 'academic_plan__educational_profile', 'year']
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


#Конец блока ендпоинтов рабочей программы
#Скачивание рпд в формате docx/pdf
#

from docxtpl import DocxTemplate
import datetime

from collections import OrderedDict

def render_context(context, **kwargs):
    """ Функция, которая возвращает context с параметрами для шаблона """
    fs_obj = FieldOfStudy.objects.get(pk = kwargs['field_of_study_id'])
    ap_obj = AcademicPlan.objects.get(pk = kwargs['academic_plan_id'])

    template_context = OrderedDict()
    template_context['title'] = context['title']
    template_context['field_of_study_code'] = fs_obj.number
    template_context['field_of_study'] = fs_obj.title

    if context['qualification'] == 'bachelor':
        template_context['QUALIFICATION'] = 'БАКАЛАВР'
    elif context['qualification'] == 'master':
        template_context['QUALIFICATION'] = 'МАГИСТР'
    else:
        template_context['QUALIFICATION'] = 'ИНЖЕНЕР'

    template_context['academic_plan'] = ap_obj.educational_profile
    template_context['year'] = kwargs['year']
    template_context['tbl_competence'] = ''
    template_context['discipline_section'] = context['discipline_sections']

    contact_work, lecture_classes, laboratory, practical_lessons, SRO, total_hours = 0.0,0.0,0.0,0.0,0.0,0.0
    online_sections, url_online_course, evaluation_tools = [], [], []
    for i in context['discipline_sections']:
        online_names, topics_list = [], []
        if i['contact_work'] is None: i['contact_work'] = ''
        else: contact_work += float(i['contact_work'])
        if i['lecture_classes'] is None: i['lecture_classes'] = ''
        else: lecture_classes += float(i['lecture_classes'])
        if i['laboratory'] is None: i['laboratory'] = ''
        else: laboratory += float(i['laboratory'])
        if i['practical_lessons'] is None: i['practical_lessons']  = ''
        else: practical_lessons += float(i['practical_lessons'])
        if i['SRO'] is None: i['SRO'] = ''
        else: SRO += float(i['SRO'])
        total_hours += 0.0 if i['total_hours'] is None else float(i['total_hours'])

        for tool in i['evaluation_tools']:
            if tool not in evaluation_tools:
                evaluation_tools.append(tool)

        for j in i['topics']:
            topics_list.append(j['description'])
            if j['url_online_course'] is None:pass
            else:
                online_sections.append(i['ordinal_number'])
                online_names.append(j['url_online_course']['title'])
                if j['url_online_course'] not in url_online_course:
                    url_online_course.append(j['url_online_course'])
        i['online_list'] = ', '.join(map(str, set(online_names)))
        i['topics_list'] = ', '.join(map(str, set(topics_list)))

    template_context['total_hours'] = [contact_work, lecture_classes, laboratory, practical_lessons, SRO, total_hours]
    template_context['is_no_online'] = True if online_sections == 0 else False
    template_context['is_online'] = False if online_sections == 0 else True
    template_context['X'] = 'X'
    template_context['sections'] = ', '.join(map(str,set(online_sections)))
    template_context['sections_replace']: ''
    template_context['bibliographic_reference'] =  context['bibliographic_reference']
    template_context['online_course'] = url_online_course
    template_context['evaluation_tools'] = evaluation_tools
    filename = str(fs_obj.number)+'_'+str(context['discipline_code'])+'_'+str(context['qualification'])+'_'+str(kwargs['year'])+'_'+datetime.datetime.today().strftime("%Y-%m-%d-%H.%M.%S")+'.docx'

    return template_context, filename


from django.http import HttpResponse


class DocxFileExportView(generics.ListAPIView):
    """Возвращает РПД в формате docx в браузере"""
    queryset = WorkProgram.objects.all()
    serializer = WorkProgramSerializer

    def get(self, request, *args, **kwargs):
        tpl = DocxTemplate('/application/export_template/RPD_shablon_2020_new.docx')
        queryset = WorkProgram.objects.get(pk = kwargs['pk'])
        serializer = WorkProgramSerializer(queryset)
        data = dict(serializer.data)

        context, filename = render_context(data, field_of_study_id = kwargs['fs_id'],
                                           academic_plan_id = kwargs['ap_id'], year = kwargs['year'])
        tpl.render(context)
        #tpl.save('/application/export/'+filename) -- сохранение в папку локально (нужно указать актуальный путь!)

        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'inline; filename="%s"' % filename

        tpl.save(response)

        return response


@api_view(['POST'])
def CloneWorkProgramm(request):
    """
    Апи для клонирования рабочей программы
    Запрашивает id программы для клоинрования в поле program_id для тела запроса типа form-data
    В ответе передается число - айди созданной копии
    """
    prog_id = request.data.get('program_id')
    try:
        clone_program = WorkProgram.clone_programm(prog_id)
        serializer = WorkProgramSerializer(clone_program)
        return Response(status=200, data=serializer.data)
    except:
        return Response(status=400)



@api_view(['GET'])
def UserGroups(request):
    ""
    groups_names=[]
    for group in request.user.groups.all():
        groups_names.append(group.name)
    if UserExpertise.objects.filter(expert=request.user):
        groups_names.append("expertise_member")
    return Response({"groups": groups_names})