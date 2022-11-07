# РПД
from collections import OrderedDict

from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg2.utils import swagger_auto_schema

from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from workprogramsapp.disciplineblockmodules.search_filters import DisciplineBlockModuleFilter
from workprogramsapp.disciplineblockmodules.serializers import DisciplineBlockModuleCreateSerializer, \
    DisciplineBlockModuleSerializer, DisciplineBlockModuleForModuleListDetailSerializer, \
    DisciplineBlockModuleDetailSerializer
from workprogramsapp.folders_ans_statistic.models import DisciplineBlockModuleInFolder
from workprogramsapp.models import DisciplineBlockModule, DisciplineBlock, ImplementationAcademicPlan
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

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        blocks = data.get("descipline_block")
        if blocks:
            blocks_current = [block.id for block in instance.descipline_block.all()]
            for block in blocks:
                if not (block in blocks_current):
                    imp = ImplementationAcademicPlan.objects.get(
                        academic_plan__discipline_blocks_in_academic_plan__id=block)
                    if not (imp.id in [accept_imp.id for accept_imp in instance.educational_programs_to_access.all()]):
                        return Response(data={"error": "Данный учебный план не разрешен для добавления"},
                                        status=HTTP_400_BAD_REQUEST)
        childs = data.get("childs")
        if childs:
            childs_current = [child.id for child in instance.childs.all()]
            if instance.only_for_struct_units:
                instance_structural_set = instance.get_structural_units()
            for child in childs:
                if not (child in childs_current):
                    if not instance.is_included_in_plan():
                        return Response(
                            data={"error": "Данный модуль/его родители не включен(-ы) ни в один учебный план"},
                            status=HTTP_400_BAD_REQUEST)

                    if instance.only_for_struct_units:
                        new_child_struct = DisciplineBlockModule.objects.get(id=child).get_structural_units()
                        if not new_child_struct:
                            return Response(
                                data={"error": "Данный модуль не входит в разрешенные структурные подразделения"},
                                status=HTTP_400_BAD_REQUEST)
                        for new_child in new_child_struct:
                            if not (new_child in instance_structural_set):
                                return Response(
                                    data={"error": "Данный модуль не входит в разрешенные структурные подразделения"},
                                    status=HTTP_400_BAD_REQUEST)

        return self.partial_update(request, *args, **kwargs)


class DisciplineBlockModuleShortListView(generics.ListAPIView):
    """
        Получение списка модулей с краткой информацией
        Можно осуществлять поиск по имени, имени блока, типу образования

        Если нужно найти подходящие модули для добавление в другой модуль
        необходимо указывать в GET-параметр id_module_for_filter айди исходного
        модуля.
    """
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleCreateSerializer
    filterset_class = DisciplineBlockModuleFilter
    search_fields = ['id', 'module_isu_id', 'name', 'descipline_block__name']
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    # filterset_fields = ['id', 'module_isu_id', 'name', 'descipline_block__name',]
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]

    def get_queryset(self):
        id_module_for_filter = self.request.GET.get('id_module_for_filter')
        if id_module_for_filter:
            module_for_filter = DisciplineBlockModule.objects.get(id=id_module_for_filter)
            if module_for_filter.only_for_struct_units:
                set_of_units = module_for_filter.get_structural_units()
                queryset = DisciplineBlockModule.objects.filter(
                    editors__user_for_structural_unit__structural_unit__id__in=set_of_units).exclude(
                    id=module_for_filter.id).exclude()
                return queryset
            else:
                return DisciplineBlockModule.objects.all()
        else:
            return DisciplineBlockModule.objects.all()


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
