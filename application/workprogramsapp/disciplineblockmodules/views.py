# РПД
from collections import OrderedDict

from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg2.utils import swagger_auto_schema

from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from workprogramsapp.disciplineblockmodules.search_filters import DisciplineBlockModuleFilter
from workprogramsapp.disciplineblockmodules.serializers import DisciplineBlockModuleCreateSerializer, \
    DisciplineBlockModuleSerializer, DisciplineBlockModuleForModuleListDetailSerializer, \
    DisciplineBlockModuleDetailSerializer
from workprogramsapp.folders_ans_statistic.models import DisciplineBlockModuleInFolder
from workprogramsapp.models import DisciplineBlockModule, DisciplineBlock
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly, IsDisciplineBlockModuleEditor, IsBlockModuleEditor


class DisciplineBlockModuleCreateAPIView(generics.CreateAPIView):
    """
    Api на создание Блокмоудлей
    """
    serializer_class = DisciplineBlockModuleCreateSerializer
    queryset = DisciplineBlockModule.objects.all()
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]

    def perform_create(self, serializer):
        serializer.save(editor=self.request.user)


class DisciplineBlockModuleDestroyView(generics.DestroyAPIView):
    """
        Api на удаление Блокмоудлей
    """
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleSerializer
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]


class DisciplineBlockModuleUpdateView(generics.UpdateAPIView):
    """
        Api на Изменение Блокмоудлей
    """
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleCreateSerializer
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]


class DisciplineBlockModuleShortListView(generics.ListAPIView):
    """
        Получение списка модулей с краткой информацией
        Можно осуществялть поиск по имени, имени блока, типу образования
    """
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleCreateSerializer
    filterset_class = DisciplineBlockModuleFilter
    search_fields = ['id', 'module_isu_id', 'name', 'descipline_block__name']
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    # filterset_fields = ['id', 'module_isu_id', 'name', 'descipline_block__name',]
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]


class DisciplineBlockModuleDetailListView(generics.ListAPIView):
    """
     Получение списка модулей с полной информацией

    """
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleForModuleListDetailSerializer
    filterset_class = DisciplineBlockModuleFilter
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['name', 'descipline_block__name']
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]


class DisciplineBlockModuleDetailListForUserView(generics.ListAPIView):
    """
         Получение списка модулей с полной информацией, где редактор запрашивающий пользователь
    """
    serializer_class = DisciplineBlockModuleForModuleListDetailSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = DisciplineBlockModuleFilter
    search_fields = ['name', 'descipline_block__name', 'descipline_block__academic_plan__educational_profile']
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]

    def get_queryset(self):
        return DisciplineBlockModule.objects.filter(editors=self.request.user)


class DisciplineBlockModuleDetailView(generics.RetrieveAPIView):
    """
    Детальный просмотр одного модуля с полями can_edit и rating
    """
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleForModuleListDetailSerializer
    my_tags = ["Discipline Blocks"]
    permission_classes = [IsBlockModuleEditor]

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


@swagger_auto_schema(tags=['Discipline Blocks'], method='post')
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
