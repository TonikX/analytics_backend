import datetime
from collections import OrderedDict

from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    inline_serializer,
    OpenApiResponse,
)
from rest_framework import generics, filters, status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from gia_practice_app.Practice.models import ZunPractice
from workprogramsapp.disciplineblockmodules.search_filters import (
    DisciplineBlockModuleFilter,
)
from workprogramsapp.disciplineblockmodules.serializers import (
    BodyParamsForDisciplineBlockModuleUpdateForBlockRelationSerializer,
    DisciplineBlockModuleCreateSerializer,
    DisciplineBlockModuleDetailSerializer,
    DisciplineBlockModuleForModuleListDetailSerializer,
    DisciplineBlockModuleSerializer,
    ImplementationAcademicPlanForModuleSerializer,
    ShortDisciplineBlockModuleForModuleListSerializer,
)
from workprogramsapp.folders_and_statistics.models import DisciplineBlockModuleInFolder
from workprogramsapp.models import (
    AcademicPlan,
    DisciplineBlock,
    DisciplineBlockModule,
    ImplementationAcademicPlan,
    PracticeInFieldOfStudy,
    WorkProgramChangeInDisciplineBlockModule,
    WorkProgramInFieldOfStudy,
)
from workprogramsapp.permissions import (
    IsAcademicPlanDeveloper,
    IsBlockModuleEditor,
    IsDisciplineBlockModuleEditor,
    IsUniversalModule,
)


class DisciplineBlockModuleCreateAPIView(generics.CreateAPIView):
    """API для создания блок-модулей."""

    serializer_class = DisciplineBlockModuleCreateSerializer
    queryset = DisciplineBlockModule.objects.all()
    permission_classes = [IsBlockModuleEditor]
    my_tags = ["Discipline Blocks"]

    def perform_create(self, serializer):
        serializer.save(editor=self.request.user)


class DisciplineBlockModuleDestroyView(generics.DestroyAPIView):
    """API для удаления блок-модулей."""

    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleSerializer
    permission_classes = [IsBlockModuleEditor, IsUniversalModule]
    my_tags = ["Discipline Blocks"]


class DisciplineBlockModuleUpdateView(generics.UpdateAPIView):
    """API для изменения блок-модулей."""

    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleCreateSerializer
    permission_classes = [IsBlockModuleEditor, IsUniversalModule]
    my_tags = ["Discipline Blocks"]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        self.serializer_class.context = {"request": request}
        data = request.data
        blocks = data.get("descipline_block")
        if blocks:
            blocks_current = [block.id for block in instance.descipline_block.all()]
            for block in blocks:
                if not (block in blocks_current):
                    imp = ImplementationAcademicPlan.objects.get(
                        academic_plan__discipline_blocks_in_academic_plan__id=block
                    )
                    if not (
                        imp.id
                        in [
                            accept_imp.id
                            for accept_imp in instance.educational_programs_to_access.all()
                        ]
                    ):
                        return Response(
                            data={
                                "error": "Данный учебный план не разрешен для добавления"
                            },
                            status=HTTP_400_BAD_REQUEST,
                        )
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
                        new_child_struct = DisciplineBlockModule.objects.get(
                            id=child
                        ).get_structural_units()
                        if not new_child_struct:
                            return Response(
                                data={
                                    "error": "Данный модуль не входит в разрешенные структурные подразделения"
                                },
                                status=HTTP_400_BAD_REQUEST,
                            )
                        for new_child in new_child_struct:
                            if not (new_child in instance_structural_set):
                                return Response(
                                    data={
                                        "error": "Данный модуль не входит в разрешенные структурные подразделения"
                                    },
                                    status=HTTP_400_BAD_REQUEST,
                                )

        return self.partial_update(request, *args, **kwargs)


class DisciplineBlockModuleShortListView(generics.ListAPIView):
    """Получение списка модулей с краткой информацией.

    Можно осуществлять поиск по имени, имени блока, типу образования.
    """

    queryset = DisciplineBlockModule.objects.all().prefetch_related("editors")

    serializer_class = ShortDisciplineBlockModuleForModuleListSerializer
    filterset_class = DisciplineBlockModuleFilter
    search_fields = ["id", "module_isu_id", "name", "descipline_block__name"]
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    permission_classes = [IsBlockModuleEditor]

    @extend_schema(
        methods=["GET"],
        tags=["Discipline Blocks"],
        parameters=[
            OpenApiParameter(
                name="id_module_for_filter_struct",
                location=OpenApiParameter.QUERY,
                description="""Находит модули с подходящими структурными подразделениями
                            переданного id модуля""",
                type=OpenApiTypes.INT,
            ),
            OpenApiParameter(
                name="filter_non_struct",
                location=OpenApiParameter.QUERY,
                description="""Если true, то находит модули, которые разрешено добавлять любым
                подразделениям (если применять вместе с id_module_for_filter_struct,
                результаты запросов объединятся)""",
                type=OpenApiTypes.BOOL,
            ),
            OpenApiParameter(
                name="for_user",
                location=OpenApiParameter.QUERY,
                description="Если true находит все модули, принадлежащие запрашивающему юзеру",
                type=OpenApiTypes.BOOL,
            ),
            OpenApiParameter(
                name="without_me",
                location=OpenApiParameter.QUERY,
                description="исключить модуль из вывода в списке по id",
                type=OpenApiTypes.INT,
            ),
            OpenApiParameter(
                name="allowed_to_add_ap_id",
                location=OpenApiParameter.QUERY,
                description="id ImplementationAcademicPlan для поиска всех доступных "
                "для него модулей",
                type=OpenApiTypes.INT,
            ),
        ],
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        id_module_for_filter_struct = self.request.GET.get(
            "id_module_for_filter_struct"
        )
        filter_non_struct = self.request.GET.get("filter_non_struct")
        user_filtering = self.request.GET.get("for_user")
        without_me = self.request.GET.get("without_me")
        allowed_id = self.request.GET.get("allowed_to_add_ap_id")

        if id_module_for_filter_struct:
            module_for_filter = DisciplineBlockModule.objects.get(
                id=id_module_for_filter_struct
            )
            set_of_units = module_for_filter.get_structural_units()
            queryset = queryset.filter(
                editors__user_for_structural_unit__structural_unit__id__in=set_of_units,
                # only_for_struct_units=True).exclude(
                # id=module_for_filter.id
            )

        if filter_non_struct == "true":
            queryset = queryset | DisciplineBlockModule.objects.filter(
                only_for_struct_units=False
            )
        # else:
        #     queryset = queryset | DisciplineBlockModule.objects.filter(only_for_struct_units=False)

        if allowed_id:
            queryset = queryset.filter(educational_programs_to_access__id=allowed_id)

        if user_filtering == "true":
            queryset = queryset.filter(editors=self.request.user)

        if without_me:
            queryset = queryset.exclude(id=without_me)

        queryset = queryset.filter().distinct()
        queryset = self.filter_queryset(queryset.all())

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class DisciplineBlockModuleDetailView(generics.RetrieveAPIView):
    """Детальный просмотр одного модуля с полями can_edit, can_add_plans и
    rating."""

    queryset = DisciplineBlockModule.objects.all()
    serializer_class = DisciplineBlockModuleForModuleListDetailSerializer
    my_tags = ["Discipline Blocks"]
    permission_classes = [IsBlockModuleEditor]

    def get(self, request, **kwargs):
        queryset = DisciplineBlockModule.objects.filter(pk=self.kwargs["pk"])
        serializer = DisciplineBlockModuleForModuleListDetailSerializer(
            queryset, many=True
        )

        if len(serializer.data) == 0:
            return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)

        newdata = dict(serializer.data[0])
        try:
            newdata.update(
                {
                    "rating": DisciplineBlockModuleInFolder.objects.get(
                        block_module=self.kwargs["pk"], folder__owner=self.request.user
                    ).module_rating
                }
            )
            newdata.update(
                {
                    "id_rating": DisciplineBlockModuleInFolder.objects.get(
                        block_module=self.kwargs["pk"], folder__owner=self.request.user
                    ).id
                }
            )
        except:
            newdata.update({"rating": False})

        imps = ImplementationAcademicPlan.get_all_imp_by_modules(queryset)
        is_used_in_accepted_plan = bool(
            imps.exclude(academic_plan__on_check="in_work").exists()
        )

        newdata["plans_included"] = ImplementationAcademicPlanForModuleSerializer(
            imps,
            many=True,
        ).data
        newdata["status"] = "used" if is_used_in_accepted_plan else "not_used"
        newdata["can_edit"] = (
            IsDisciplineBlockModuleEditor.check_access(
                self.kwargs["pk"], self.request.user
            )
            and not is_used_in_accepted_plan
        )
        newdata["can_add_plans"] = IsDisciplineBlockModuleEditor.check_access(
            self.kwargs["pk"], self.request.user
        )
        newdata = OrderedDict(newdata)

        return Response(newdata, status=status.HTTP_200_OK)


@extend_schema(
    methods=["POST"], tags=["Discipline Blocks"], request=None, responses=None
)
@api_view(["POST"])
@permission_classes([IsBlockModuleEditor])
def InsertModule(request):
    """Апи для вставки модуля в другой блок.

    old_module_id - айди модуля блока дисциплины, который копируется для вставки в другой блок
    block_id - айди блока для вставки копии
    """
    module_id = request.data.get("old_module_id")
    block_id = request.data.get("block_id")
    cloned_module = DisciplineBlockModule.clone_module(module_id)
    cloned_module.descipline_block = DisciplineBlock.objects.get(pk=block_id)
    cloned_module.save()
    serializer = DisciplineBlockModuleDetailSerializer(cloned_module)
    return Response(status=200, data=serializer.data)


class InsertModuleInBlockAP(APIView):

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    permission_classes = [IsAdminUser]

    @extend_schema(
        methods=["POST"],
        tags=["Discipline Blocks"],
        request=inline_serializer(
            name="InsertModuleInBlockAPSerializer",
            fields={
                "modules": serializers.ListSerializer(
                    child=serializers.IntegerField(),
                ),
                "discipline_block_name": serializers.CharField(),
                "aps": serializers.ListSerializer(
                    child=serializers.IntegerField(),
                ),
                "year_for_all_ap": serializers.IntegerField(),
            },
        ),
        responses={
            201: OpenApiResponse(
                description="count of created data",
                response=inline_serializer(
                    name="InsertModuleInBlockAP201Serializer",
                    fields={
                        "count_of_added_modules": serializers.IntegerField(),
                    },
                ),
            )
        },
        description="""Метод для добавления модуля во все указанные планы
                    в определнный блок (по имени)""",
    )
    @transaction.atomic
    def post(self, request):
        request_data = request.data
        counter = 0
        if "year_for_all_ap" in request_data and request_data["year_for_all_ap"] != 0:
            ap_ids = (
                AcademicPlan.objects.filter(
                    academic_plan_in_field_of_study__year=request_data[
                        "year_for_all_ap"
                    ]
                )
                .values_list("id", flat=True)
                .distinct()
            )
        else:
            ap_ids = request_data["aps"]
        for ap in AcademicPlan.objects.filter(id__in=ap_ids):
            block = DisciplineBlock.objects.get(
                name=request_data["discipline_block_name"], academic_plan=ap.id
            )
            for module_id in request_data["modules"]:
                DisciplineBlockModule.objects.get(id=module_id).descipline_block.add(
                    block
                )
                counter += 1

        return Response(
            status=status.HTTP_201_CREATED, data={"count_of_added_modules": counter}
        )


class WorkWithBlocksApiView(APIView):

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    permission_classes = [IsAcademicPlanDeveloper, IsUniversalModule]

    @extend_schema(
        methods=["POST"],
        tags=["Discipline Blocks"],
        request=inline_serializer(
            name="WorkWithBlocksApiViewSerializer",
            fields={
                "modules": serializers.ListSerializer(child=serializers.IntegerField()),
                "descipline_block": serializers.IntegerField(),
            },
        ),
        description="Метод для обновления связей с блоками",
    )
    def post(self, request):
        """Метод для обновления связей с блоками."""

        request_data = (
            BodyParamsForDisciplineBlockModuleUpdateForBlockRelationSerializer(
                data=request.data
            )
        )
        if request_data.is_valid():
            for module in request_data.validated_data["modules_in_discipline_block"]:
                module.descipline_block.add(request_data.validated_data["id"])
                module.save()
            print(
                DisciplineBlock.objects.filter(
                    id=request_data.validated_data["id"]
                ).values_list("modules_in_discipline_block")
            )
            return Response(status=status.HTTP_201_CREATED)
        return Response(request_data.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        methods=["DELETE"],
        tags=["Discipline Blocks"],
        parameters=[
            OpenApiParameter(
                name="module", location=OpenApiParameter.QUERY, type=OpenApiTypes.INT
            ),
            OpenApiParameter(
                name="descipline_block",
                location=OpenApiParameter.QUERY,
                type=OpenApiTypes.INT,
            ),
        ],
    )
    def delete(self, request):
        """Метод для удаления связи блока и модуля."""

        object = DisciplineBlockModule.objects.get(
            id=request.query_params.get("module")
        )
        object.descipline_block.remove(
            DisciplineBlock.objects.get(id=request.query_params.get("descipline_block"))
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class CopyModulesToAnotherAPView(APIView):

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    permission_classes = [IsAdminUser]

    @extend_schema(
        methods=["POST"],
        tags=["Discipline Blocks"],
        request=inline_serializer(
            name="CopyModulesToAnotherAPIViewSerializer",
            fields={
                "ap_from": serializers.IntegerField(),
                "ap_to": serializers.IntegerField(),
            },
        ),
        responses={
            201: OpenApiResponse(
                description="created info",
            )
        },
    )
    @transaction.atomic
    def post(self, request):
        request_data = request.data
        counter = 0
        for block_to in DisciplineBlock.objects.filter(
            academic_plan__id=request_data["ap_to"]
        ):
            modules_from = DisciplineBlockModule.objects.filter(
                descipline_block__name=block_to.name,
                descipline_block__academic_plan=request_data["ap_from"],
            )
            [module.descipline_block.add(block_to) for module in modules_from]

        return Response(
            status=status.HTTP_201_CREATED,
        )


class CopyModules(APIView):

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    permission_classes = [IsBlockModuleEditor, IsUniversalModule]

    @extend_schema(
        methods=["POST"],
        tags=["Discipline Blocks"],
        request=inline_serializer(
            name="CopyModulesAPIViewSerializer",
            fields={
                "module_id": serializers.IntegerField(),
            },
        ),
        responses={
            201: OpenApiResponse(
                response=DisciplineBlockModuleSerializer, description="created info"
            )
        },
    )
    @transaction.atomic
    def post(self, request):
        module_to_copy_id = request.data["module_id"]
        old_module = DisciplineBlockModule.objects.get(id=module_to_copy_id)
        new_module = DisciplineBlockModule(
            type=old_module.type,
            name="КОПИЯ " + old_module.name,
            description=old_module.description,
            selection_rule=old_module.selection_rule,
            selection_parametr=old_module.selection_parametr,
        )
        user = request.user
        if old_module.clone_info_json:
            create_counter = old_module.clone_info_json[-1]["counter"] + 1
            json_history_to_add = {
                "counter": create_counter,
                "user_id": user.id,
                "date": str(datetime.datetime.now()),
                "from_copy_id": old_module.id,
            }
            new_clone_info = old_module.clone_info_json
            new_clone_info.append(json_history_to_add)
        else:
            new_clone_info = [
                {
                    "counter": 1,
                    "user_id": user.id,
                    "date": str(datetime.datetime.now()),
                    "from_copy_id": old_module.id,
                }
            ]
        new_module.clone_info_json = new_clone_info
        new_module.save()

        new_module.editors.add(user)
        new_module.childs.add(*old_module.childs.all())

        for changeblock in old_module.change_blocks_of_work_programs_in_modules.all():
            new_changeblock = WorkProgramChangeInDisciplineBlockModule.objects.create(
                discipline_block_module=new_module,
                change_type=changeblock.change_type,
                semester_start=changeblock.semester_start,
            )
            new_changeblock.work_program.add(*changeblock.work_program.all())
            for work_program in changeblock.work_program.all():
                zuns = WorkProgramInFieldOfStudy.objects.get(
                    work_program=work_program,
                    work_program_change_in_discipline_block_module=changeblock,
                ).zun_in_wp.all()
                new_fs = WorkProgramInFieldOfStudy.objects.get(
                    work_program=work_program,
                    work_program_change_in_discipline_block_module=new_changeblock,
                )
                for zun in zuns:
                    zun.pk = None
                    zun.wp_in_fs = new_fs
                    zun.save()

            new_changeblock.gia.add(*changeblock.gia.all())
            new_changeblock.practice.add(*changeblock.practice.all())
            for practice in changeblock.practice.all():
                pracs_in_fs = PracticeInFieldOfStudy.objects.filter(
                    practice=practice,
                    work_program_change_in_discipline_block_module=changeblock,
                )
                zuns = ZunPractice.objects.filter(practice_in_fs__in=pracs_in_fs)

                new_fs = PracticeInFieldOfStudy.objects.get(
                    practice=practice,
                    work_program_change_in_discipline_block_module=new_changeblock,
                )
                for zun in zuns:
                    zun.pk = None
                    zun.zun_in_practice = new_fs
                    zun.save()
            new_changeblock.save()

        serializer = DisciplineBlockModuleSerializer(new_module)
        return Response(serializer.data)
