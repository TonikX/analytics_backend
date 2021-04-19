import datetime

from django.db.models import Count
# Сериализаторы
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Сериализаторы
from .serializers import AdditionalMaterialSerializer, CreateAdditionalMaterialSerializer, \
    StructuralUnitSerializer, CreateStructuralUnitSerializer, \
    CreateUserStructuralUnitSerializer, UserStructuralUnitSerializer, ShortStructuralUnitSerializer


from .models import AdditionalMaterial, StructuralUnit, UserStructuralUnit

# Права доступа
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly
from ..models import WorkProgram, DisciplineSection, PrerequisitesOfWorkProgram, OutcomesOfWorkProgram
from ..serializers import WorkProgramSerializer


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
    search_fields = ['title']
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return ShortStructuralUnitSerializer
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
@permission_classes((IsAuthenticated,))
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

        for item in PrerequisitesOfWorkProgram.objects.filter(workprogram=from_copy):
            item.workprogram = new_wp
            item.save()

        for item in OutcomesOfWorkProgram.objects.filter(workprogram=from_copy):
            item.workprogram = new_wp
            item.save()

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
        for section in DisciplineSection.objects.filter(work_program__pk=from_copy):
            section.work_program = new_wp
            section.save()
        old_wp.delete()
        new_wp.save()
        serializer = WorkProgramSerializer(new_wp, many=False)
        return Response(serializer.data)
    except:
        return Response(status=400)
