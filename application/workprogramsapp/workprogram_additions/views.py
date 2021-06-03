import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

# Сериализаторы
from .serializers import AdditionalMaterialSerializer, CreateAdditionalMaterialSerializer, \
    StructuralUnitSerializer, CreateStructuralUnitSerializer, \
    CreateUserStructuralUnitSerializer, UserStructuralUnitSerializer

from .models import AdditionalMaterial, StructuralUnit, UserStructuralUnit

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly
from ..models import WorkProgram, DisciplineSection, PrerequisitesOfWorkProgram, OutcomesOfWorkProgram, \
    WorkProgramInFieldOfStudy, СertificationEvaluationTool, EvaluationTool, Topic
from ..serializers import WorkProgramSerializer, WorkProgramShortForExperiseSerializer


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


class StructuralUnitSet(viewsets.ModelViewSet):
    queryset = StructuralUnit.objects.all()
    serializer_class = StructuralUnitSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)

    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):

        if self.action == 'create':
            return CreateStructuralUnitSerializer
        if self.action == 'update':
            return CreateStructuralUnitSerializer
        if self.action == 'partial_update':
            return CreateStructuralUnitSerializer
        return StructuralUnitSerializer


class UserStructuralUnitSet(viewsets.ModelViewSet):
    queryset = UserStructuralUnit.objects.all()
    serializer_class = UserStructuralUnitSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateUserStructuralUnitSerializer
        if self.action == 'update':
            return CreateUserStructuralUnitSerializer
        if self.action == 'partial_update':
            return CreateUserStructuralUnitSerializer

        return UserStructuralUnitSerializer


@api_view(['POST'])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def CopyContentOfWorkProgram(request):
    """
    API-запрос на компирование содержимого из одной РПД в другую, !!!при этом старая РПД удаляется!!!
    Параметры: from_copy_id, to_copy_id
    Возвращает: объект обновленной РПД (в которую были скопированы данные)
    """
    try:
        from_copy = request.data.get('from_copy_id')
        to_copy = request.data.get('to_copy_id')
        old_wp = WorkProgram.objects.get(pk=from_copy)
        new_wp = WorkProgram.objects.get(pk=to_copy)
        new_wp.approval_date = old_wp.approval_date
        new_wp.authors = old_wp.authors

        new_items = PrerequisitesOfWorkProgram.objects.filter(workprogram=to_copy)
        new_out = OutcomesOfWorkProgram.objects.filter(workprogram=to_copy)

        for item in PrerequisitesOfWorkProgram.objects.filter(workprogram=from_copy):
            item_exists = False
            for new_item in new_items:
                if new_item.item == item.item and new_item.masterylevel == item.masterylevel:
                    print(item_exists)
                    item_exists = True
            if not item_exists:
                PrerequisitesOfWorkProgram.objects.create(item=item.item, workprogram=new_wp,
                                                          masterylevel=item.masterylevel)
        discipline = DisciplineSection.objects.filter(work_program_id=old_wp.id)
        disp_clone_list = []
        eva_clone_list = []
        for disp in discipline:
            clone_discipline = disp.make_clone(attrs={'work_program': new_wp})
            topic = Topic.objects.filter(discipline_section=disp)
            for top in topic:
                top.make_clone(attrs={'discipline_section': clone_discipline})
            clone_dict = {'id': disp.id, 'clone_id': clone_discipline.id}
            disp_clone_list.append(clone_dict)
        for eva in EvaluationTool.objects.filter():
            evaluation_disciplines = eva.evaluation_tools.all().filter(work_program_id=old_wp.id)
            if (evaluation_disciplines):
                clone_eva = eva.make_clone()
                for disp in evaluation_disciplines:
                    for elem in disp_clone_list:
                        if (disp.id == elem['id']):
                            DisciplineSection.objects.get(pk=elem['clone_id']).evaluation_tools.add(clone_eva)
                clone_dict = {'id': eva.id, 'clone_id': clone_eva.id}
                eva_clone_list.append(clone_dict)
        for out in OutcomesOfWorkProgram.objects.filter(workprogram=old_wp):
            clone_outcomes = out.make_clone(attrs={'workprogram': new_wp})
            for eva in out.evaluation_tool.all():
                for elem in eva_clone_list:
                    if (eva.id == elem['id']):
                        clone_outcomes.evaluation_tool.add(EvaluationTool.objects.get(pk=elem['clone_id']))
        for cerf in СertificationEvaluationTool.objects.filter(work_program=old_wp):
            cerf.make_clone(attrs={'work_program': new_wp})
        for cerf in СertificationEvaluationTool.objects.filter(work_program=new_wp):
            if cerf.name == "No name":
                cerf.delete()
        new_wp.editors.add(*old_wp.editors.all())
        new_wp.bibliographic_reference.add(*old_wp.bibliographic_reference.all())

        new_wp.hoursFirstSemester = old_wp.hoursFirstSemester
        new_wp.hoursSecondSemester = old_wp.hoursSecondSemester
        new_wp.description = old_wp.description
        new_wp.video = old_wp.video
        new_wp.credit_units = old_wp.credit_units
        new_wp.semester_hour = old_wp.semester_hour
        new_wp.owner = old_wp.owner
        new_wp.work_status = old_wp.work_status
        new_wp.hours = old_wp.hours
        new_wp.extra_points = old_wp.extra_points

        # old_wp.delete()
        new_wp.save()
        serializer = WorkProgramSerializer(new_wp, many=False)
        return Response(serializer.data)
    except:
        return Response(status=400)


@api_view(['POST'])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def ReconnectWorkProgram(request):
    try:
        from_copy = request.data.get('from_copy_id')
        to_copy = request.data.get('to_copy_id')
        old_wp = WorkProgram.objects.get(pk=from_copy)
        new_wp = WorkProgram.objects.get(pk=to_copy)
        serializer = WorkProgramSerializer(new_wp, many=False)
        return Response(serializer.data)
    except:
        return Response(status=400)

