from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets, filters, status, mixins, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from gia_practice_app.Practice.models import (
    OutcomesOfPractice,
    Practice,
    PracticeTemplate,
    PrerequisitesOfPractice,
    ZunPractice,
)
from gia_practice_app.Practice.serializers import (
    ItemInPracticeCreateSerializer,
    OutcomesInPracticeCreateSerializer,
    PracticeInFieldOfStudyCreateSerializer,
    PracticeInFieldOfStudyForCompeteceListSerializer,
    PracticePrimitiveSerializer,
    PracticeSerializer,
    PracticeTemplateSerializer,
    ZunPracticeForManyCreateSerializer,
)
from workprogramsapp.models import PracticeInFieldOfStudy, AcademicPlan
from workprogramsapp.permissions import (
    IsRpdDeveloperOrReadOnly,
    IsOwnerOrDodWorkerOrReadOnly,
)


class PracticeSet(viewsets.ModelViewSet):
    my_tags = ["Gia and Practice"]
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = [
        "discipline_code",
        "title",
        "id",
        "editors__first_name",
        "editors__last_name",
    ]
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]

    def get_serializer_class(self):
        if self.action == "list":
            return PracticePrimitiveSerializer
        return PracticeSerializer


class PracticeTemplateSet(viewsets.ModelViewSet):
    my_tags = ["Gia and Practice"]
    queryset = PracticeTemplate.objects.all()
    serializer_class = PracticeTemplateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsAdminUser]


class PrerequisitesPracticeSet(
    mixins.CreateModelMixin,
    # mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    # mixins.ListModelMixin,
    GenericViewSet,
):
    my_tags = ["Gia and Practice"]
    queryset = PrerequisitesOfPractice.objects.all()
    serializer_class = ItemInPracticeCreateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]


class OutcomesPracticeSet(
    mixins.CreateModelMixin,
    # mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    # mixins.ListModelMixin,
    GenericViewSet,
):
    my_tags = ["Gia and Practice"]
    queryset = OutcomesOfPractice.objects.all()
    serializer_class = OutcomesInPracticeCreateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]


class PracticeInFieldOfStudySet(  # mixins.CreateModelMixin,
    # mixins.RetrieveModelMixin,
    # mixins.UpdateModelMixin,
    # mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    GenericViewSet,
):
    my_tags = ["Gia and Practice"]
    queryset = PracticeInFieldOfStudy.objects.all()
    serializer_class = PracticeInFieldOfStudyCreateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]


class ZunPracticeManyViewSet(
    mixins.CreateModelMixin,
    # mixins.RetrieveModelMixin,
    # mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    # mixins.ListModelMixin,
    GenericViewSet,
):
    my_tags = ["Gia and Practice"]
    model = ZunPractice
    queryset = ZunPractice.objects.all()
    serializer_class = ZunPracticeForManyCreateSerializer
    http_method_names = ["post", "delete", "patch"]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request, *args, **kwargs):
        """
        Вместо gh_id (id ОХ) можно передать iap_id - id ImplementationAcademicPlan
        Example:
            {
            "practice_id": 1 - ссылка на Практику
            "gh_id": 1 новое - ссылка на ОХ
            "zun": {
              "indicator_in_zun": 85,
              "items": []
                }
            }
             OR
            {
            "practice_id": 1 - ссылка на Практику
            "gh_id": 1 новое - ссылка на ОХ
            "zun": [
            {
              "indicator_in_zun": 85,
              "items": []
            },
            {
              "indicator_in_zun": 85,
              "items": []
            }
                ]
            }
        """
        if request.data.get("gh_id"):
            aps = AcademicPlan.objects.filter(
                academic_plan_in_field_of_study__general_characteristics_in_educational_program__id=int(
                    request.data.get("gh_id")
                )
            )
        if request.data.get("iap_id"):
            aps = AcademicPlan.objects.filter(
                # ToDo: id=int(request.data.get('iap_id')))
                academic_plan_in_field_of_study=int(request.data.get("iap_id"))
            )
        wp_in_fss = PracticeInFieldOfStudy.objects.filter(
            Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
            | Q(
                practice__id=int(request.data.get("practice_id")),
                work_program_change_in_discipline_block_module__discipline_block_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__father_module__descipline_block__academic_plan__in=aps,
            )
        ).distinct()

        for wp_in_fs in wp_in_fss:
            zun_obj = request.data["zun"]
            if isinstance(zun_obj, list):
                for zun in zun_obj:
                    serializer = self.get_serializer(data=zun)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(practice_in_fs=wp_in_fs)
            else:
                serializer = self.get_serializer(data=request.data["zun"])
                serializer.is_valid(raise_exception=True)
                serializer.save(practice_in_fs=wp_in_fs)
        return Response(status=status.HTTP_201_CREATED)


class ZunPracticeViewSet(viewsets.ModelViewSet):
    my_tags = ["Gia and Practice"]
    queryset = ZunPractice.objects.all()
    serializer_class = ZunPracticeForManyCreateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]


class PracticeInFieldOfStudyForWorkProgramList(generics.ListAPIView):
    my_tags = ["Gia and Practice"]
    serializer_class = PracticeInFieldOfStudyForCompeteceListSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if getattr(self, "swagger_fake_view", False):
            return PracticeInFieldOfStudy.objects.none()

    def list(self, request, **kwargs):
        """Вывод учебных планов для одной рабочей программы по id."""
        queryset = PracticeInFieldOfStudy.objects.filter(
            practice__id=self.kwargs["practice_id"],
        ).distinct()
        serializer = PracticeInFieldOfStudyForCompeteceListSerializer(
            queryset, many=True
        )
        return Response(serializer.data)


class ZunPracticeManyForAllGhViewSet(
    mixins.CreateModelMixin,
    # mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    # mixins.ListModelMixin,
    GenericViewSet,
):
    my_tags = ["Gia and Practice"]
    model = ZunPractice
    queryset = ZunPractice.objects.all()
    serializer_class = ZunPracticeForManyCreateSerializer
    http_method_names = ["post", "delete", "patch"]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request, *args, **kwargs):
        """
        Example:
            {
            "practice_id": 1 - ссылка на ПРАКТИКУ
            "zun": {
              "indicator_in_zun": 85,
              "items": []
                }
            }
        """
        wp_in_fss = PracticeInFieldOfStudy.objects.filter(
            practice__id=int(request.data.get("practice_id"))
        ).distinct()
        for wp_in_fs in wp_in_fss:
            serializer = self.get_serializer(data=request.data["zun"])
            serializer.is_valid(raise_exception=True)
            serializer.save(practice_in_fs=wp_in_fs)
        return Response(status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        for_all = request.data.get("for_all")
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if for_all:
            prac = Practice.objects.get(zuns_for_pr=instance.practice_in_fs)
            ZunPractice.objects.filter(
                practice_in_fs__practice=prac,
                skills=instance.skills,
                attainments=instance.attainments,
                knowledge=instance.knowledge,
                indicator_in_zun__id=instance.indicator_in_zun.id,
            ).update(
                skills=request.data["skills"],
                attainments=request.data["attainments"],
                knowledge=request.data["knowledge"],
            )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        else:
            return Response({"message": "failed", "details": serializer.errors})


@extend_schema(request=None, responses=None)
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def zun_many_remove(request):
    """
    EXAMPLE:
    {
        "zuns_to_delete": [1, 2, 3]
    }
    """
    zuns_to_delete = request.data.get("zuns_to_delete")

    for zun in zuns_to_delete:
        ZunPractice.objects.get(id=zun).delete()

    return Response({"message": "Зуны удалены"}, status=201)
