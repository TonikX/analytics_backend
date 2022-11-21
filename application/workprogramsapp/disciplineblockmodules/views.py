# РПД
from collections import OrderedDict

from django.db.models import Q, QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg2 import openapi
from drf_yasg2.utils import swagger_auto_schema

from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from workprogramsapp.disciplineblockmodules.search_filters import DisciplineBlockModuleFilter
from workprogramsapp.disciplineblockmodules.serializers import DisciplineBlockModuleCreateSerializer, \
    DisciplineBlockModuleSerializer, DisciplineBlockModuleForModuleListDetailSerializer, \
    DisciplineBlockModuleDetailSerializer, ShortDisciplineBlockModuleForModuleListSerializer, \
    DisciplineBlockModuleUpdateForBlockRelationSerializer, \
    BodyParamsForDisciplineBlockModuleUpdateForBlockRelationSerializer
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
                    # if not instance.is_included_in_plan():
                    #     return Response(
                    #         data={"error": "Данный модуль/его родители не включен(-ы) ни в один учебный план"},
                    #         status=HTTP_400_BAD_REQUEST)

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
    """
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = ShortDisciplineBlockModuleForModuleListSerializer
    filterset_class = DisciplineBlockModuleFilter
    search_fields = ['id', 'module_isu_id', 'name', 'descipline_block__name']
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    # filterset_fields = ['id', 'module_isu_id', 'name', 'descipline_block__name',]
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]
    id_module_for_filter_struct = openapi.Parameter('id_module_for_filter_struct', openapi.IN_QUERY,
                                                    description="Находит модули с подходящим структурными "
                                                                "подразделениями переданного id модуля",
                                                    type=openapi.TYPE_INTEGER)
    filter_non_struct = openapi.Parameter('filter_non_struct', openapi.IN_QUERY,
                                          description="Если true, то Находит модули, которые разрешено добавлять любым "
                                                      "подразделениям (если применять вместе с "
                                                      "id_module_for_filter_struct, результаты запросов объединятся)",
                                          type=openapi.TYPE_BOOLEAN)
    for_user = openapi.Parameter('for_user', openapi.IN_QUERY,
                                 description="Если true находит все модули, принадлежащие запрашивающему юзеру",
                                 type=openapi.TYPE_BOOLEAN)

    @swagger_auto_schema(manual_parameters=[id_module_for_filter_struct, filter_non_struct, for_user])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        id_module_for_filter_struct = self.request.GET.get('id_module_for_filter_struct')
        filter_non_struct = self.request.GET.get('filter_non_struct')
        user_filtering = self.request.GET.get('for_user')

        filter_struct = DisciplineBlockModule.objects.none()
        if id_module_for_filter_struct:
            module_for_filter = DisciplineBlockModule.objects.get(id=id_module_for_filter_struct)
            set_of_units = module_for_filter.get_structural_units()
            filter_struct = queryset.filter(
                editors__user_for_structural_unit__structural_unit__id__in=set_of_units,
                only_for_struct_units=True).exclude(
                id=module_for_filter.id)

        if filter_non_struct == "true":
            queryset = queryset.filter(only_for_struct_units=False) | filter_struct
        elif id_module_for_filter_struct:
            queryset = filter_struct

        if user_filtering == "true":
            queryset = queryset.filter(editors=self.request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


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


class WorkWithBlocksApiView(APIView):
    my_tags = ["Discipline Blocks"]

    descipline_block = openapi.Parameter('descipline_block', openapi.IN_FORM,
                                         description="id блока",
                                         type=openapi.TYPE_INTEGER)
    module = openapi.Parameter('module', openapi.IN_FORM,
                               description="массив id модулей",
                               items=openapi.Items(type=openapi.TYPE_INTEGER),
                               type=openapi.TYPE_ARRAY)

    @swagger_auto_schema(request_body=openapi.Schema(
                             type=openapi.TYPE_OBJECT,
                             required=['version'],
                             properties={
                                 'modules': openapi.Schema(type=openapi.TYPE_ARRAY,
                                                           items=openapi.Items(type=openapi.TYPE_INTEGER)),
                                 'descipline_block': openapi.Schema(type=openapi.TYPE_INTEGER)
                             },
                         ),
                         operation_description='Метод для обновления связей с блоками')
    def post(self, request):
        """
        Метод для обновления связей с блоками
        """
        request_data = BodyParamsForDisciplineBlockModuleUpdateForBlockRelationSerializer(data=request.data)
        if request_data.is_valid():
            for module in request_data.validated_data['modules_in_discipline_block']:
                module.descipline_block.add(request_data.validated_data['id'])
                module.save()
            print(DisciplineBlock.objects.filter(id = request_data.validated_data['id']).values_list('modules_in_discipline_block'))
            return Response(status=status.HTTP_201_CREATED)
        return Response(request_data.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('module', openapi.IN_QUERY, type='integer'),
        openapi.Parameter('descipline_block', openapi.IN_QUERY, type='integer')
    ])
    def delete(self, request):
        """
        Метод для удаления связи блока и модуля
        """
        print(request.query_params.get('module'))
        object = DisciplineBlockModule.objects.get(id=request.query_params.get('module'))
        object.descipline_block.remove(DisciplineBlock.objects.get(id=request.query_params.get('descipline_block')))
        return Response(status=status.HTTP_204_NO_CONTENT)
