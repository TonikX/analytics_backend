from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.views import View
from .models import WorkProgram, FieldOfStudy, FieldOfStudyWorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, EvaluationTool, DisciplineSection, Topic, BibliographicReference
from .forms import WorkProgramOutcomesPrerequisites, PrerequisitesOfWorkProgramForm, EvaluationToolForm, DisciplineSectionForm, TopicForm, OutcomesOfWorkProgramForm, PrerequisitesOfWorkProgramForm, UploadFileForm
from .models import WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, EvaluationTool, DisciplineSection, Topic, Indicator, Competence, OnlineCourse
from .forms import WorkProgramOutcomesPrerequisites, PrerequisitesOfWorkProgramForm, EvaluationToolForm
from .serializers import IndicatorSerializer, CompetenceSerializer, OutcomesOfWorkProgramSerializer, WorkProgramCreateSerializer, PrerequisitesOfWorkProgramSerializer
from .serializers import EvaluationToolSerializer, TopicSerializer, SectionSerializer, FieldOfStudySerializer
from .serializers import EvaluationToolSerializer, TopicSerializer, SectionSerializer, TopicCreateSerializer
from .serializers import OutcomesOfWorkProgramCreateSerializer
from .serializers import OnlineCourseSerializer, BibliographicReferenceSerializer, WorkProgramBibliographicReferenceUpdateSerializer, \
    PrerequisitesOfWorkProgramCreateSerializer, EvaluationToolForWorkProgramSerializer, EvaluationToolCreateSerializer, IndicatorListSerializer
from .serializers import AcademicPlanSerializer, ImplementationAcademicPlanSerializer, ImplementationAcademicPlanCreateSerializer, AcademicPlanCreateSerializer, \
    WorkProgramChangeInDisciplineBlockModuleSerializer, DisciplineBlockModuleSerializer, DisciplineBlockModuleCreateSerializer, WorkProgramInFieldOfStudySerializer
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .serializers import WorkProgramSerializer
from dataprocessing.models import Items
import itertools, pandas, os
from django.core.paginator import Paginator
from django_tables2.paginators import LazyPaginator
from django_tables2 import SingleTableView, RequestConfig
from .tables import FieldOfStudyWPTable
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import mixins
from .models import AcademicPlan, ImplementationAcademicPlan, WorkProgramChangeInDisciplineBlockModule, DisciplineBlockModule, DisciplineBlock
import json

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



# class IndicatorListView(APIView):new_
#     """
#        Список индикаторов.
#     """
#     def get(self, request):
#         indicators = Indicator.objects.all()
#         serializer = IndicatorSerializer(indicators, many=True)
#         return Response(serializer.data)
#
# class IndicatorUpdateView(APIView):
#     """
#         Редактирование (обновление) индикатора
#     """
#     def get(self, request, pk):
#         indicator = get_object_or_404(Indicator, pk=pk)
#         serializer = IndicatorSerializer(indicator)
#         return Response(serializer.data)
#
#     def put(self, request, pk):
#         indicator = get_object_or_404(Indicator, pk=pk)
#         serializer = IndicatorSerializer(indicator, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IndicatorListAPIView(generics.ListAPIView):
    serializer_class = IndicatorListSerializer
    queryset = Indicator.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['number', 'name', 'competence']


class IndicatorCreateAPIView(generics.CreateAPIView):
    serializer_class = IndicatorSerializer
    queryset = Indicator.objects.all()


class IndicatorDestroyView(generics.DestroyAPIView):
    queryset = Indicator.objects.all()
    serializer_class = IndicatorSerializer


class IndicatorUpdateView(generics.UpdateAPIView):
    queryset = Indicator.objects.all()
    serializer_class = IndicatorSerializer


class IndicatorDetailsView(generics.RetrieveAPIView):
    queryset = Indicator.objects.all()
    serializer_class = IndicatorListSerializer



class CompetenceCreateView(generics.CreateAPIView):
    serializer_class = CompetenceSerializer
    queryset = Competence.objects.all()


class CompetencesListView(generics.ListAPIView):
    serializer_class = CompetenceSerializer
    queryset = Competence.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name','number']


class CompetenceListView(APIView):
    """
       Список компетеций.
    """
    def get(self, request):
        competences = Competence.objects.all()
        serializer = CompetenceSerializer(competences, many=True)
        return Response(serializer.data)

class CompetenceUpdateView(APIView):
    """
        Редактирование (обновление) компетенции
    """
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
    def get(self, request, pk):
        indicators = Indicator.objects.filter(competence=pk)
        serializer = IndicatorSerializer(indicators, many=True)
        return Response(serializer.data)
class DeleteIndicatorFromCompetenceView(APIView):
    """
        Удаление индикатора из компетенции
    """
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


class OutcomesOfWorkProgramDestroyView(generics.DestroyAPIView):
    queryset = OutcomesOfWorkProgram.objects.all()
    serializer_class = OutcomesOfWorkProgramCreateSerializer


class OutcomesOfWorkProgramUpdateView(generics.UpdateAPIView):
    queryset = OutcomesOfWorkProgram.objects.all()
    serializer_class = OutcomesOfWorkProgramCreateSerializer


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


class PrerequisitesOfWorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer
    queryset = PrerequisitesOfWorkProgram.objects.all()


class PrerequisitesOfWorkProgramDestroyView(generics.DestroyAPIView):
    queryset = PrerequisitesOfWorkProgram.objects.all()
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer


class PrerequisitesOfWorkProgramUpdateView(generics.UpdateAPIView):
    queryset = PrerequisitesOfWorkProgram.objects.all()
    serializer_class = PrerequisitesOfWorkProgramCreateSerializer

#Блок эндпоинтов рабочей программы

class WorkProgramCreateAPIView(generics.CreateAPIView):
    serializer_class = WorkProgramCreateSerializer
    queryset = WorkProgram.objects.all()


class WorkProgramDestroyView(generics.DestroyAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializer


class WorkProgramUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramCreateSerializer


class WorkProgramDetailsView(generics.RetrieveAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializer

#Конец блока ендпоинтов рабочей программы


class TopicsListAPI(generics.ListAPIView):
    """
    API endpoint that represents a list of Topics.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class TopicCreateAPI(generics.CreateAPIView):
    """
    API endpoint that represents a list of Topics.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicCreateSerializer

    def perform_create(self, serializer):
        # print (Topic.objects.filter(discipline_section = serializer.validated_data['discipline_section']).count()+1)
        serializer.save(number = Topic.objects.filter(discipline_section = serializer.validated_data['discipline_section']).count()+1)


class TopicDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Topic.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicCreateSerializer


class EvaluationToolListAPI(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of Evaluation Tools.
    """
    queryset = EvaluationTool.objects.all()
    serializer_class = EvaluationToolCreateSerializer


class EvaluationToolDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Evaluation Tool.
    """
    queryset = EvaluationTool.objects.all()
    serializer_class = EvaluationToolCreateSerializer


class DisciplineSectionListAPI(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of Discipline Sections.
    """
    queryset = DisciplineSection.objects.all()
    serializer_class = SectionSerializer


class DisciplineSectionDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Discipline Section.
    """
    queryset = DisciplineSection.objects.all()
    serializer_class = SectionSerializer

class FieldOfStudyDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """
        Удаление, редактирование, просмотр образовательной программы (направления) по id
    """
    queryset = FieldOfStudy.objects.all()
    serializer_class = FieldOfStudySerializer


class FieldOfStudyListCreateView(generics.ListCreateAPIView):
    """
        Отображение списка ОП(направлений), создание образовательной программы (напрвления)
    """
    queryset = FieldOfStudy.objects.all()
    serializer_class = FieldOfStudySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title','number', 'faculty', 'educational_profile']


# class NewOrdinalNumbersForDesciplineSectionAPI(APIView):
#
#
#     def get_object(self, pk, request):
#
#         print (request)
#         return DisciplineSection.objects.filter(id = 1)
#
#
#     def post(self, request, *args, **kwargs):
#         descipline_section = self.get_object(request.data.get('descipline_section'))
#         #old_ordinal_number = self.get_object(request.data.get('old_ordinal_number'))
#         new_ordinal_number = self.get_object(request.data.get('new_ordinal_number'))
#
#         DisciplineSection.new_ordinal_number(self, descipline_section, new_ordinal_number)
#
#         return Response('ok')


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


#Блок эндпоинтов рабочей программы

class OnlineCourseListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = OnlineCourseSerializer
    queryset = OnlineCourse.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title','platform']


class OnlineCourseDestroyView(generics.DestroyAPIView):
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer


class OnlineCourseUpdateView(generics.UpdateAPIView):
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer


class OnlineCourseDetailsView(generics.RetrieveAPIView):
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer


class BibliographicReferenceListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BibliographicReferenceSerializer
    queryset = BibliographicReference.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['description']


class BibliographicReferenceDestroyView(generics.DestroyAPIView):
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceSerializer


class BibliographicReferenceUpdateView(generics.UpdateAPIView):
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceSerializer


class BibliographicReferenceDetailsView(generics.RetrieveAPIView):
    queryset = BibliographicReference.objects.all()
    serializer_class = BibliographicReferenceSerializer


class WorkProgramBibliographicReferenceUpdateView(generics.UpdateAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramBibliographicReferenceUpdateSerializer

#
# class WorkProgramBibliographicReferenceUpdateView(mixins.CreateModelMixin, generics.GenericAPIView):
#     def post(self, request, format=None):
#         is_many = isinstance(request.data, list)
#
#         if is_many:
#             serializer = WorkProgramBibliographicReferenceUpdateSerializer(data=request.data, many=True)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#         else:
#             serializer = WorkProgramBibliographicReferenceUpdateSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BibliographicReferenceInWorkProgramList(generics.ListAPIView):
    serializer_class = BibliographicReferenceSerializer

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

    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        # Note the use of `get_queryset()` instead of `self.queryset`
        #queryset = BibliographicReference.objects.filter(workprogram__id=self.kwargs['workprogram_id'])
        # print (self.kwargs['workprogram_id'])
        # print (DisciplineSection.objects.get(work_program__id=self.kwargs['workprogram_id']))
        # print (DisciplineSection.objects.get(work_program__id=self.kwargs['workprogram_id']).evaluation_tools.all())
        # queryset = DisciplineSection.objects.get(work_program__id=self.kwargs['workprogram_id']).evaluation_tools.all()
        # print (queryset)
        # alltools =[]
        # print (DisciplineSection.objects.filter(work_program__id=self.kwargs['workprogram_id']))
        # for tools in DisciplineSection.objects.filter(work_program__id=self.kwargs['workprogram_id']):
        #     print (tools.evaluation_tools.all())
        #     if tools.evaluation_tools.all():
        #         alltools.append(tools.evaluation_tools.all())
        # print (alltools)
        # #queryset = EvaluationTool.objects.all()

        try:
            queryset = EvaluationTool.objects.filter(evaluation_tools__in=DisciplineSection.objects.filter(work_program__id=self.kwargs['workprogram_id'])).distinct()
            serializer = EvaluationToolForWorkProgramSerializer(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response(status=400)

#Блок эндпоинтов для обрабоки файлов

from dataprocessing.serializers import FileUploadSerializer

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
    
    df = pandas.read_excel(path)
    #df.dropna(subset=['COMPONENT'], inplace = True)
    print(df.head())
    return df

class FileUploadAPIView(APIView):
    """
    API-endpoint для загрузки файла sub_2019_2020_new
    """

    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = handle_uploaded_csv(request.FILES['file'], str(request.FILES['file']))
        print(len(data))
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
                print('============Begin============')
                

                if data['DEGREE'][i].strip() == 'Академический бакалавр':
                    qualification = 'bachelor'
                else:
                    qualification = 'master'
                
                # проверяем если ОП уже существует в БД
                if FieldOfStudy.objects.filter(number = data['SUBFIELDCODE'][i], title = data['MAJOR_NAME'][i].strip()).exists():
                    fs_obj = FieldOfStudy.objects.get(number = data['SUBFIELDCODE'][i], title = data['MAJOR_NAME'][i].strip())
                else:
                    # Записываем в БД новую ОП
                    #
                    fs_obj = FieldOfStudy(number = data['SUBFIELDCODE'][i], title = data['MAJOR_NAME'][i].strip(), 
                        qualification=qualification)
                    fs_obj.save()
                    fs_count+=1
                
                print('===========Field of study done', fs_obj)
                # Проверяем если Дисцпилина уже есть в БД
                #
                if WorkProgram.objects.filter(title = data['SUBJECT'][i].strip(), discipline_code = data['SUBJECT_CODE'][i], qualification = qualification).exists():
                    # если да, то записываем в FieldOfStudyWorkProgram
                    #
                    wp_obj = WorkProgram.objects.get(title = data['SUBJECT'][i].strip(), discipline_code = data['SUBJECT_CODE'][i], qualification = qualification)

                else:
                    # если нет, то записываем в БД
                    wp_obj = WorkProgram(title = data['SUBJECT'][i].strip(), discipline_code = data['SUBJECT_CODE'][i], qualification = qualification)
                    wp_obj.save()
                    wp_count+=1
                

                if FieldOfStudyWorkProgram.objects.filter(field_of_study = fs_obj, work_program = wp_obj).exists():
                    print('FieldOfStudyWorkProgram exist')
                else:
                    # Теперь записываем в FieldOfStudyWorkProgram
                    fswp_obj = FieldOfStudyWorkProgram(field_of_study = fs_obj, work_program = wp_obj)
                    fswp_obj.save()
                
                print('===========Work program and FieldOfStudyWorkProgram done')
                
                if AcademicPlan.objects.filter(qualification = qualification, educational_profile = data['SUBFIELDNAME'][i].strip()).exists():
                    ap_obj = AcademicPlan.objects.get(qualification = qualification, educational_profile = data['SUBFIELDNAME'][i].strip())

                else:
                    ap_obj = AcademicPlan(qualification = qualification, educational_profile = data['SUBFIELDNAME'][i].strip())
                    ap_obj.save()
                    ap_count+=1

                print('===========Academic plan done', ap_obj)
                
                if ImplementationAcademicPlan.objects.filter(academic_plan = ap_obj, field_of_study = fs_obj, year = data['YEAR'][i]).exists():
                    print('ImplementationAcademicPlan exist')
                else:
                    iap_obj = ImplementationAcademicPlan(academic_plan = ap_obj, field_of_study = fs_obj, year = data['YEAR'][i])
                    iap_obj.save()
                print('===========Implementation Academic plan done')
        
                if DisciplineBlock.objects.filter(name = data['CYCLE'][i].strip(), academic_plan = ap_obj).exists():
                    db = DisciplineBlock.objects.get(name = data['CYCLE'][i].strip(), academic_plan = ap_obj)
                else:
                    db = DisciplineBlock(name = data['CYCLE'][i].strip(), academic_plan_id = ap_obj.id, )
                    db.save()

                print('===========Block done', db)

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
                
                print('===========Block Module done', mdb)
            
                #credit_units = [0 for i in range(0,10)]
                #for semester in semesters:
                #    credit_units[int(semester)-1] = 

                credit_units = [0 for i in range(0,10)]
                semesters = data[(data['SUBFIELDNAME']==data['SUBFIELDNAME'][i])&(data['CYCLE']==data['CYCLE'][i])&(data['COMPONENT']==data['COMPONENT'][i])&(data['SUBJECT']==data['SUBJECT'][i])].drop_duplicates()
                try:
                    for s in semesters.index.values:
                        credit_units[int(semesters['SEMESTER'][s])-1] = int(semesters['CREDITS'][s])
                except:
                    print('CREDIT == Nan')
                #credit_units = [0 for i in range(0,10)]
                #    print(data['SEMESTER'][i])
                #wp_obj = WorkProgram.objects.get(title = data['SUBJECT'][i])


                if (data['ISOPTION'][i] == 'Optionally' and WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module = mdb, change_type = data['ISOPTION'][i]).exists()):
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module = mdb, change_type = data['ISOPTION'][i])
                    wpchangemdb.work_program.add(wp_obj)
                elif WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module = mdb, change_type = data['ISOPTION'][i], work_program = wp_obj).exists():
                    print('exist', wp_obj)

                else:
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule()
                    wpchangemdb.credit_units = ','.join(str(i) for i in credit_units)
                    wpchangemdb.change_type = data['ISOPTION'][i]
                    wpchangemdb.discipline_block_module = mdb
                    wpchangemdb.save()
                    wpchangemdb.work_program.add(wp_obj)
                    
                print('===========wpchangemdb done')
            except:
                continue;    
        print(f'Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}')

        return Response(status=200)



class AcademicPlanListAPIView(generics.ListAPIView):
    serializer_class = AcademicPlanSerializer
    queryset = AcademicPlan.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['educational_profile']


class AcademicPlanCreateAPIView(generics.CreateAPIView):
    serializer_class = AcademicPlanCreateSerializer
    queryset = AcademicPlan.objects.all()


    def perform_create(self, serializer):
        serializer.save()
        # AcademicPlan.new_descipline_blocks(self, serializer)
        AcademicPlan.clone_descipline_blocks(self, serializer)


class AcademicPlanDestroyView(generics.DestroyAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanSerializer


class AcademicPlanUpdateView(generics.UpdateAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanSerializer


class AcademicPlanDetailsView(generics.RetrieveAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanSerializer


class ImplementationAcademicPlanAPIView(generics.CreateAPIView):
    """
    API endpoint that represents a list of Topics.
    """
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanCreateSerializer


class ImplementationAcademicPlanListAPIView(generics.ListAPIView):
    serializer_class = ImplementationAcademicPlanSerializer
    queryset = ImplementationAcademicPlan.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['academic_plan__number', 'academic_plan__educational_profile', 'year']


class ImplementationAcademicPlanDestroyView(generics.DestroyAPIView):
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanSerializer


class ImplementationAcademicPlanUpdateView(generics.UpdateAPIView):
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanCreateSerializer


class ImplementationAcademicPlanDetailsView(generics.RetrieveAPIView):
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanSerializer


class WorkProgramChangeInDisciplineBlockModuleListAPIView(generics.ListAPIView):
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['educational_profile']


class WorkProgramChangeInDisciplineBlockModuleCreateAPIView(generics.CreateAPIView):
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()


class WorkProgramChangeInDisciplineBlockModuleDestroyView(generics.DestroyAPIView):
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer


class WorkProgramChangeInDisciplineBlockModuleDetailsView(generics.RetrieveAPIView):
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer


class WorkProgramChangeInDisciplineBlockModuleUpdateView(generics.UpdateAPIView):
    queryset = WorkProgramChangeInDisciplineBlockModule.objects.all()
    serializer_class = WorkProgramChangeInDisciplineBlockModuleSerializer


class DisciplineBlockModuleCreateAPIView(generics.CreateAPIView):
    serializer_class = DisciplineBlockModuleCreateSerializer
    queryset = DisciplineBlockModule.objects.all()


class DisciplineBlockModuleDestroyView(generics.DestroyAPIView):
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleSerializer


class DisciplineBlockModuleUpdateView(generics.UpdateAPIView):
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleCreateSerializer


class WorkProgramInFieldOfStudyListView(generics.ListAPIView):
    """
        Отображение списка ОП(направлений), создание образовательной программы (напрвления)
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramInFieldOfStudySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['approval_date', 'authors', 'discipline_code', 'qualification']

    
#Конец блока ендпоинтов рабочей программы
#Скачивание рпд в формате docx/pdf
#

from docxtpl import DocxTemplate, RichText
def render_docx(*args, **kwargs):
    """Экспорт файла в док"""
    tpl = DocxTemplate('/application/export/RPD_shablon_2020.docx')
    
    #
    # Получаем данные рабочей программы дисциплины
    #
    wp_obj = WorkProgram.objects.get(pk = kwargs['pk'])
    bibliography = [bib.description for bib in wp_obj.bibliographic_reference.all()]
    
    if wp_obj.qualification == 'bachelor':
        qualification = 'БАКАЛАВР'
    elif wp_obj.qualification == 'master':
        qualification = 'МАГИСТР'
    else:
        qualification = 'ИНЖЕНЕР'
    #
    # Получаем данные для таблицы с компетенциями
    #
    #
    #i_obj = Indicator.objects.filter(work_program = wp_obj)
    #for i in i_obj:
    #    iwp_obj = IndicatorWorkProgram.objects.filter(work_program = wp_obj, indicator = i)
    #competence = [{'competence': competence, 'indicator': indicator},]
    #indicator = [{'indicator': indicator, 'knowledge':knowledge, 'skills':skills, 'proficiency':proficiency} for i in i_obj]
    
    #
    # Получаем данные для таблицы с разделами
    #
    contact_work, lecture_classes, laboratory, practical_lessons, SRO, total_hours = 0,0,0,0,0,0
    sec_obj = DisciplineSection.objects.filter(work_program = wp_obj)
    sections_online, sections_tbl, online, topics_online = [],[],[],{}
    for i in sec_obj:

        if i.contact_work is None:
            contact_work_str = ''
        else:
            contact_work += i.contact_work
            contact_work_str = i.contact_work
        if i.lecture_classes is None:
            lecture_classes_str = ''
        else:
            lecture_classes += i.lecture_classes
            lecture_classes_str = i.lecture_classes
        if i.laboratory is None:
            laboratory_str = ''
        else:
            laboratory += i.laboratory
            laboratory_str = i.laboratory

        if i.practical_lessons is None:
           practical_lessons_str = ''
        else:
            practical_lessons += i.practical_lessons
            practical_lessons_str = practical_lessons
        if i.SRO is None:
            SRO_str = ''
        else:
            SRO += i.SRO
            SRO_str = i.SRO

        total_hours += i.total_hours
        total_hours_str = i.total_hours
        sections_tbl.append({'section':i.ordinal_number , 'name': i.name, 
            'hours':[contact_work_str,lecture_classes_str,laboratory_str,practical_lessons_str,SRO_str, total_hours_str]})
        topics = Topic.objects.filter(discipline_section = i)
        s = []
        for j in topics:
            if j.url_online_course is None:
                pass
            else:
                s.append(j.url_online_course.title)
                sections_online.append(i.ordinal_number)
                online.append(str(j.url_online_course.title +'— Открытое образование. '+'— Режим доступа: '+j.url_online_course.course_url))
        topics_online.update({i:', '.join(str(q) for q in s)})
    
    section_content = [{'ordinal': i.ordinal_number, 'name': i.name, 
    'content':', '.join('' if j is str(j.description) else str(j.description) for j in Topic.objects.filter(discipline_section = i)),
    'online':topics_online[i]} for i in sec_obj]
    
    flag = False
    if sections_online == []:
        flag = True

    context = {
        'title': wp_obj.title,
        'field_of_study_code': kwargs['field_of_study_code'],
        'field_of_study': kwargs['field_of_study'],
        'QUALIFICATION': qualification,
        'academic_plan': kwargs['academic_plan'],
        'year': kwargs['year'],
        'tbl_competence': '',
        'tbl_sections': sections_tbl,
        'total_hours':[contact_work, lecture_classes, laboratory, practical_lessons, SRO, total_hours], 
        'is_no_online':flag,
        'X': 'X',
        'sections': ', '.join(str(i) for i in set(sections_online)),
        'sections_rep': '',
        'tbl_section_content': section_content,
        'bibliography': bibliography,
        'online': online,
        }
    
    filename = str(kwargs['field_of_study_code'])+str(wp_obj.title)+'_'+str(wp_obj.qualification)+'_'+str(kwargs['year'])+'.docx'
    
    tpl.render(context)
    tpl.save('/application/export/'+filename)
    return tpl, filename
                        

from rest_framework import viewsets, renderers
from rest_framework.decorators import action
from django.http import HttpResponse

class PassthroughRenderer(renderers.BaseRenderer):
    """
        Return data as-is. View should supply a Response.
    """
    media_type = ''
    format = ''
    def render(self, data, accepted_media_type=None, renderer_context=None):
        return data

class DocxFileExportViewSet(viewsets.ReadOnlyModelViewSet):
    """Вовзращает response"""
    @action(methods=['get'], detail=True, renderer_classes=(PassthroughRenderer,))
    def download(self, request):
        pk = request.data.get('id')
        field_of_study_code = request.data.get('field_of_study_code') #код
        field_of_study = request.data.get('field_of_study') #направление
        academic_plan = request.data.get('academic_plan') #учебный план
        year = request.data.get('year')
        
        tpl,filename = render_docx(pk = pk, field_of_study_code = field_of_study_code, field_of_study = field_of_study, academic_plan = academic_plan, year = year)
        print(filename)
        # send file
        response = HttpResponse(content_type='application/vnd.ms-word', status=status.HTTP_200_OK)
        response['Content-Disposition'] = 'attachment; filename="%s"' % filename

        tpl.save(response)
    
        return response
