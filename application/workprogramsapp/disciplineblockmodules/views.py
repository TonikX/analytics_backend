# РПД
from collections import OrderedDict

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from workprogramsapp.disciplineblockmodules.serializers import DisciplineBlockModuleCreateSerializer, \
    DisciplineBlockModuleSerializer, DisciplineBlockModuleForModuleListDetailSerializer, \
    DisciplineBlockModuleDetailSerializer
from workprogramsapp.folders_ans_statistic.models import DisciplineBlockModuleInFolder
from workprogramsapp.models import DisciplineBlockModule, DisciplineBlock
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly, IsDisciplineBlockModuleEditor


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
