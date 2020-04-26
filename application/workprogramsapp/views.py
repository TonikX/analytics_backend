from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.views import View
from .models import WorkProgram, FieldOfStudy, FieldOfStudyWorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, EvaluationTool, DisciplineSection, Topic
from .forms import WorkProgramOutcomesPrerequisites, PrerequisitesOfWorkProgramForm, EvaluationToolForm, DisciplineSectionForm, TopicForm, OutcomesOfWorkProgramForm, PrerequisitesOfWorkProgramForm, UploadFileForm
from .models import WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, EvaluationTool, DisciplineSection, Topic, Indicator, Competence, CompetenceIndicator
from .forms import WorkProgramOutcomesPrerequisites, PrerequisitesOfWorkProgramForm, EvaluationToolForm
from .serializers import IndicatorSerializer, CompetenceSerializer, CompetenceIndicatorSerializer
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import WorkProgramSerializer
from dataprocessing.models import Items

from dataprocessing.models import Items
import itertools, pandas, os
from django.core.paginator import Paginator
from django_tables2.paginators import LazyPaginator
from django_tables2 import SingleTableView, RequestConfig
from .tables import FieldOfStudyWPTable
# Create your views here.
def upload_file(request):
    try:
        if request.method == 'POST':
            data = handle_uploaded_file(request.FILES['file'], str(request.FILES['file']))
            print(data.head())
            print(data.shape)
            for i in range(len(data)):
                try:
                    # проверяем если ОП уже существует в БД
                    if FieldOfStudy.objects.filter(number = data['SUBFIELDCODE'][i]+'-'+data['SUBFIELDNAME'][i]).exists():
                        fs_obj = FieldOfStudy.objects.get(number = data['SUBFIELDCODE'][i]+'-'+data['SUBFIELDNAME'][i]).id
                        # Проверяем если Дисцпилина уже есть в БД
                        #
                        if WorkProgram.objects.filter(title = data['SUBJECT'][i]).exists():
                            # если да, то записываем в FieldOfStudyWorkProgram
                            wp_obj = WorkProgram.objects.get(title = data['SUBJECT'][i]).id
                            fswp_obj = FieldOfStudyWorkProgram(field_of_study = FieldOfStudy.objects.get(id = fs_obj), work_program = WorkProgram.objects.get(id = wp_obj))
                            fswp_obj.save()
                        else:
                            # если нет, то записываем в БД
                            wp_obj = WorkProgram(title = data['SUBJECT'][i])
                            wp_obj.save()
                            wp_obj = WorkProgram.objects.get(title = data['SUBJECT'][i]).id
                            # Теперь записываем в FieldOfStudyWorkProgram
                            fswp_obj = FieldOfStudyWorkProgram(field_of_study = FieldOfStudy.objects.get(id = fs_obj), work_program = WorkProgram.objects.get(id = wp_obj))
                            fswp_obj.save()
                    else:
                        # Записываем в БД новую ОП
                        #
                        fs_obj = FieldOfStudy(number = data['SUBFIELDCODE'][i]+'-'+data['SUBFIELDNAME'][i],
                                              qualification = data['DEGREE'][i],)
                        fs_obj.save()
                        fs_obj = FieldOfStudy.objects.get(number = data['SUBFIELDCODE'][i]+'-'+data['SUBFIELDNAME'][i]).id
                        # Проверяем если Дисцпилина уже есть в БД
                        #
                        if WorkProgram.objects.filter(title = data['SUBJECT'][i]).exists():
                            # если да, то записываем в FieldOfStudyWorkProgram
                            #
                            workprogram = WorkProgram.objects.get(title = data['SUBJECT'][i]).id
                            fswp_obj = FieldOfStudyWorkProgram(field_of_study = FieldOfStudy.objects.get(id = fs_obj), work_program = WorkProgram.objects.get(id = wp_obj))
                            fswp_obj.save()

                        else:
                            # если нет, то записываем в БД
                            wp_obj = WorkProgram(title = data['SUBJECT'][i])
                            wp_obj.save()

                            wp_obj = WorkProgram.objects.get(title = data['SUBJECT'][i]).id
                            # Теперь записываем в FieldOfStudyWorkProgram
                            fswp_obj = FieldOfStudyWorkProgram(field_of_study = FieldOfStudy.objects.get(id = fs_obj), work_program = WorkProgram.objects.get(id = wp_obj))
                            fswp_obj.save()
                except:
                    pass
        return redirect('/fswp/')
    except:
        print("Что-то не так")
    return redirect('/workprogramslist/')

def handle_uploaded_file(file, filename):
    if not os.path.exists('upload/'):
        os.mkdir('upload/')
    path = 'upload/' + filename
    with open(path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    df = pandas.read_csv(path, sep=';', encoding = 'windows-1251')
    df = df.drop(df.columns[[0]], axis=1)
    return df

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


class WorkProgramsListApi(APIView):
    """
    Список рабочих программ для апи.
    """
    def get(self, request, format=None):
        WorkPrograms = WorkProgram.objects.all()
        serializer = WorkProgramSerializer(WorkPrograms, many=True)
        return Response(serializer.data)


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

class IndicatorListView(APIView):
    """
       Список индикаторов.
    """
    def get(self, request):
        indicators = Indicator.objects.all()
        serializer = IndicatorSerializer(indicators, many=True)
        return Response(serializer.data)
    # def put(self, request, pl=None):
class IndicatorUpdateView(APIView):
    """
        Редактирование (обновление) индикатора
    """
    def get(self, request, number):
        indicator = get_object_or_404(Indicator, number=number)
        serializer = IndicatorSerializer(indicator)
        return Response(serializer.data)

    def put(self, request, number):
        indicator = get_object_or_404(Indicator, number=number)
        serializer = IndicatorSerializer(indicator, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    def get(self, request, number):
        competence = get_object_or_404(Competence, number=number)
        serializer = CompetenceSerializer(competence)
        return Response(serializer.data)

    def put(self, request, number):
        competence = get_object_or_404(Competence, number=number)
        serializer = CompetenceSerializer(competence, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompetenceIndListView(APIView):
    """
       Компетенция и ее классы.
    """
    def get(self, request, number):
        comptences = get_object_or_404(Competence, number=number)
        serializer = CompetenceIndicatorSerializer(comptences)
        return Response(serializer.data)


class DeleteIndicatorFromCompetenceView(APIView):
    """
        Удаление индикатора из компетенции
    """
    def post(self, request):
        competence_number = request.data.get("competence_number")
        indicator_number = request.data.get("indicator_number")
        try:
            competenceIndicator = CompetenceIndicator.objects.get(competence__number=competence_number, indicator__number=indicator_number)
            competenceIndicator.delete()
            return Response(status=200)
        except:
            return Response(status=400)

class AddIndicatorToCompetenceView(APIView):
    """
        Добавление индикатора из компетенции
    """
    def post(self, request):
        competence_number = request.data.get("competence_number")
        indicator_number = request.data.get("indicator_number")
        field_of_study_number = request.data.get("field_of_study_number")
        try:
            competence = Competence.objects.get(number=competence_number)
            indicator = Indicator.objects.get(number=indicator_number)
            field_of_study = FieldOfStudy.objects.get(number=field_of_study_number)
            competenceIndicator = CompetenceIndicator.objects.create(competence=competence,
                                                                     indicator=indicator,
                                                                    field_of_study=field_of_study)
            competenceIndicator.save()
            return Response(status=200)
        except:
            return Response(status=400)
