from collections import OrderedDict

from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import filters
from rest_framework import generics, viewsets
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from workprogramsapp.folders_ans_statistic.models import (
    IndividualImplementationAcademicPlanInFolder,
)
from workprogramsapp.individualization.models import (
    DisciplineBlockModuleInDisciplineBlock,
    ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule,
    IndividualImplementationAcademicPlan,
    WorkProgramInWorkProgramChangeInDisciplineBlockModule,
)
from workprogramsapp.individualization.serializers import (
    CreateIndividualImplementationAcademicPlanSerializer,
    DisciplineBlockModuleInDisciplineBlockSerializer,
    ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer,
    IndividualImplementationAcademicPlanSerializer,
    ShortIndividualImplementationAcademicPlanSerializer,
    WorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer,
)


class IndividualImplementationAcademicPlansSet(viewsets.ModelViewSet):
    queryset = IndividualImplementationAcademicPlan.objects.all()
    serializer_class = IndividualImplementationAcademicPlanSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    )
    filterset_fields = [
        "implementation_of_academic_plan__academic_plan__educational_profile",
        "implementation_of_academic_plan__field_of_study__title",
        "implementation_of_academic_plan__field_of_study__number",
        "implementation_of_academic_plan__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__prerequisites__name",
        "implementation_of_academic_plan__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__outcomes__name",
    ]
    http_method_names = ["get", "post"]

    def get_serializer_class(self):
        if self.action == "list":
            return ShortIndividualImplementationAcademicPlanSerializer
        if self.action == "create":
            return CreateIndividualImplementationAcademicPlanSerializer
        if self.action == "update":
            return CreateIndividualImplementationAcademicPlanSerializer
        return IndividualImplementationAcademicPlanSerializer

    def retrieve(self, request, *args, **kwargs):
        # do your customization here
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        newdata = dict(serializer.data)
        for discipline_block in newdata["implementation_of_academic_plan"][
            "academic_plan"
        ]["discipline_blocks_in_academic_plan"]:
            print(discipline_block["id"])
            delete_module = []
            k = 0
            for module in discipline_block["modules_in_discipline_block"]:
                print(module["id"])

                for change_block in module["change_blocks_of_work_programs_in_modules"]:
                    if change_block["change_type"] == "Optionally":
                        i = 0
                        delete = []
                        for work_program in change_block["work_program"]:
                            try:
                                if (
                                    work_program["id"]
                                    != WorkProgramInWorkProgramChangeInDisciplineBlockModule.objects.get(
                                        individual_implementation_of_academic_plan=newdata[
                                            "id"
                                        ],
                                        work_program_change_in_discipline_block_module=change_block[
                                            "id"
                                        ],
                                    ).work_program.id
                                ):
                                    delete.append(i)

                            except:
                                pass
                            i += 1
                        a = 0
                        for i in delete:
                            print(i)
                            del change_block["work_program"][i - a]
                            a += 1

                    if change_block["change_type"] == "Facultativ":
                        try:
                            if (
                                change_block["id"]
                                == ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule.objects.get(
                                    individual_implementation_of_academic_plan=newdata[
                                        "id"
                                    ],
                                    work_program_change_in_discipline_block_module=change_block[
                                        "id"
                                    ],
                                ).work_program_change_in_discipline_block_module.id
                            ):
                                # delete.append(i)
                                change_block.update({"changed": True})
                        except:
                            change_block.update({"changed": False})

                if module["type"] == "specialization_module":

                    try:
                        if (
                            module["id"]
                            != DisciplineBlockModuleInDisciplineBlock.objects.get(
                                individual_implementation_of_academic_plan=newdata[
                                    "id"
                                ],
                                discipline_block=discipline_block["id"],
                            ).discipline_block_module.id
                        ):
                            # change_block['work_program'].pop(i)
                            # del change_block['work_program'][i]
                            delete_module.append(k)
                            print("dd", k)
                            # del change_block[work_program]

                            # change_block.remove(work_program['id'])

                    except:
                        pass
                k += 1
            a = 0

            for i in delete_module:
                print("dddddd", k)
                del discipline_block["modules_in_discipline_block"][i]
                a += 1
        # TODO: Посмотреть как можно поменять костыль
        data_order = OrderedDict(newdata)
        newdata = dict(data_order)
        try:
            newdata.update(
                {
                    "rating": IndividualImplementationAcademicPlanInFolder.objects.get(
                        individual_implementation_of_academic_plan__pk=self.kwargs[
                            "pk"
                        ],
                        folder__owner=self.request.user,
                    ).route_rating
                }
            )
            newdata.update(
                {
                    "id_rating": IndividualImplementationAcademicPlanInFolder.objects.get(
                        individual_implementation_of_academic_plan__pk=self.kwargs[
                            "pk"
                        ],
                        folder__owner=self.request.user,
                    ).id
                }
            )
        except:
            newdata.update({"rating": False})
        return Response(OrderedDict(newdata), status=status.HTTP_200_OK)


class IndividualImplementationAcademicPlanForUser(generics.ListAPIView):
    serializer_class = ShortIndividualImplementationAcademicPlanSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self, *args, **kwargs):

        if getattr(self, "swagger_fake_view", False):
            return IndividualImplementationAcademicPlan.objects.none()

    def list(self, request, **kwargs):
        """
        Вывод всех результатов для одной рабочей программы по id
        """
        queryset = IndividualImplementationAcademicPlan.objects.filter(
            user=self.request.user
        )
        page = self.paginate_queryset(queryset)
        serializer = ShortIndividualImplementationAcademicPlanSerializer(
            queryset, many=True
        )
        return self.get_paginated_response(serializer.data)


@extend_schema(request=None, responses=None)
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def SaveImplementationAcademicPlans(request):
    implementations = request.data.get("implementation_set")
    for imp in implementations:
        IndividualImplementationAcademicPlan.objects.filter(pk=imp).update(
            user=request.user
        )
    return Response("null", status=status.HTTP_200_OK)


class WorkProgramInWorkProgramChangeInDisciplineBlockModuleSet(viewsets.ModelViewSet):
    queryset = WorkProgramInWorkProgramChangeInDisciplineBlockModule.objects.all()
    serializer_class = WorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)


class DisciplineBlockModuleInDisciplineBlockSet(viewsets.ModelViewSet):
    queryset = DisciplineBlockModuleInDisciplineBlock.objects.all()
    serializer_class = DisciplineBlockModuleInDisciplineBlockSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)


class ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSet(
    viewsets.ModelViewSet
):
    queryset = (
        ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule.objects.all()
    )
    serializer_class = (
        ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer
    )
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)


class ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleCreateAPIView(
    generics.CreateAPIView
):
    serializer_class = (
        ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer
    )
    queryset = (
        ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule.objects.all()
    )
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["description"]
    # permission_classes = [IsRpdDeveloperOrReadOnly]

    def post(self, request):
        for data in request.data["electives"]:
            serializer = (
                ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSerializer(
                    data=data
                )
            )
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
