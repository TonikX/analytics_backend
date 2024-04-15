from drf_spectacular.utils import extend_schema
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from workprogramsapp.folders_ans_statistic.models import (
    AcademicPlanInFolder,
    DisciplineBlockModuleInFolder,
    Folder,
    IndividualImplementationAcademicPlanInFolder,
    WorkProgramInFolder,
)
from workprogramsapp.folders_ans_statistic.serializers import (
    AcademicPlanInFolderSerializer,
    FolderCreateSerializer,
    FolderSerializer,
    IndividualImplementationAcademicPlanInFolderSerializer,
    ModuleInFolderSerializer,
    WorkProgramInFolderSerializer,
)
from workprogramsapp.permissions import (
    IsOwnerOfFolder,
    IsOwnerOfFolderWithAcademicPlan,
    IsOwnerOfFolderWithDisciplineBlockModule,
    IsOwnerOfFolderWithIndividualImplementationAcademicPlan,
    IsOwnerOfFolderWithWorkProgramm,
)


class FoldersListView(generics.ListAPIView):
    """Выдает все папки для запрашивающего пользователя с РПД внутри."""

    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):

        if getattr(self, "swagger_fake_view", False):
            return Folder.objects.none()

        return Folder.objects.filter(owner=self.request.user)


class WorkProgramInFolderView(generics.ListAPIView):
    """
    Выдает все РПД для запрашивающего пользователя с рейтингом в указанной папке.
    В url нужно указать id папки.
    """

    queryset = WorkProgramInFolder.objects.all()
    serializer_class = WorkProgramInFolderSerializer
    permission_classes = [IsOwnerOfFolder]

    def get_queryset(self, *args, **kwargs):

        if getattr(self, "swagger_fake_view", False):
            return WorkProgramInFolder.objects.none()

        try:
            return WorkProgramInFolder.objects.filter(
                folder=self.kwargs["pk"], folder__owner=self.request.user
            )
        except KeyError:
            raise NotFound()


class CreateFolderView(generics.CreateAPIView):

    queryset = Folder.objects.all()
    serializer_class = FolderCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class DeleteFolderView(generics.DestroyAPIView):

    permission_classes = [IsOwnerOfFolder]
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer


class EditFolderView(generics.UpdateAPIView):

    # TODO: block to change folder owner
    permission_classes = [IsOwnerOfFolder]
    queryset = Folder.objects.all()
    serializer_class = FolderCreateSerializer


class AddToFolderView(generics.CreateAPIView):
    """Добавление РПД в папку."""

    permission_classes = [IsOwnerOfFolderWithWorkProgramm]
    # permission_classes = [IsAuthenticated]
    queryset = WorkProgramInFolder.objects.all()
    serializer_class = WorkProgramInFolderSerializer


class RemoveFromFolderView(generics.DestroyAPIView):
    """Удаление РПД из папки."""

    permission_classes = [IsOwnerOfFolderWithWorkProgramm]
    # permission_classes = [IsAuthenticated]
    queryset = WorkProgramInFolder.objects.all()
    serializer_class = WorkProgramInFolderSerializer


class AcademicPlanInFolderView(generics.ListAPIView):
    """
    Выдает все учебные планы для запрашивающего пользователя с рейтингом в указанной папке.
    В url нужно указать id папки.
    """

    queryset = AcademicPlanInFolder.objects.all()
    serializer_class = AcademicPlanInFolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):

        if getattr(self, "swagger_fake_view", False):
            return AcademicPlanInFolder.objects.none()

        try:
            return AcademicPlanInFolder.objects.filter(
                folder=self.kwargs["pk"], folder__owner=self.request.user
            )
        except KeyError:
            raise NotFound()


class AddToFolderAcademicPlanView(generics.CreateAPIView):
    """Добавление учебного плана в папку."""

    permission_classes = [IsOwnerOfFolderWithAcademicPlan]
    queryset = AcademicPlanInFolder.objects.all()
    serializer_class = AcademicPlanInFolderSerializer


class RemoveFromFolderAcademicPlanView(generics.DestroyAPIView):
    """Удаление учебного план из папки."""

    permission_classes = [IsOwnerOfFolderWithAcademicPlan]
    queryset = AcademicPlanInFolder.objects.all()
    serializer_class = AcademicPlanInFolderSerializer


class ModuleInFolderView(generics.ListAPIView):
    """
    Выдает все модули для запрашивающего пользователя с рейтингом в указанной папке.
    В url нужно указать id папки.
    """

    queryset = DisciplineBlockModuleInFolder.objects.all()
    serializer_class = ModuleInFolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):

        if getattr(self, "swagger_fake_view", False):
            return DisciplineBlockModuleInFolder.objects.none()

        try:
            return DisciplineBlockModuleInFolder.objects.filter(
                folder=self.kwargs["pk"], folder__owner=self.request.user
            )
        except KeyError:
            raise NotFound()


class AddToFolderModuleView(generics.CreateAPIView):
    """Добавление модуля в папку."""

    permission_classes = [IsOwnerOfFolderWithDisciplineBlockModule]
    queryset = DisciplineBlockModuleInFolder.objects.all()
    serializer_class = ModuleInFolderSerializer


class RemoveFromFolderModuleView(generics.DestroyAPIView):
    """Удаление модуля из папки."""

    permission_classes = [IsOwnerOfFolderWithDisciplineBlockModule]
    queryset = DisciplineBlockModuleInFolder.objects.all()
    serializer_class = ModuleInFolderSerializer


class IndividualImplementationAcademicPlanInFolderView(generics.ListAPIView):
    """
    Выдает все модули для запрашивающего пользователя с рейтингом в указанной папке.
    В url нужно указать id папки.
    """

    queryset = IndividualImplementationAcademicPlanInFolder.objects.all()
    serializer_class = IndividualImplementationAcademicPlanInFolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):

        if getattr(self, "swagger_fake_view", False):
            return IndividualImplementationAcademicPlanInFolder.objects.none()

        try:
            return IndividualImplementationAcademicPlanInFolder.objects.filter(
                folder=self.kwargs["pk"], folder__owner=self.request.user
            )
        except KeyError:
            raise NotFound()


class AddToFolderndividualImplementationAcademicPlanView(generics.CreateAPIView):
    """Добавление модуля в папку."""

    permission_classes = [IsOwnerOfFolderWithIndividualImplementationAcademicPlan]
    queryset = IndividualImplementationAcademicPlanInFolder.objects.all()
    serializer_class = IndividualImplementationAcademicPlanInFolderSerializer


class RemoveFromFolderImplementationAcademicPlanView(generics.DestroyAPIView):
    """Удаление модуля из папки."""

    permission_classes = [IsOwnerOfFolderWithIndividualImplementationAcademicPlan]
    queryset = IndividualImplementationAcademicPlanInFolder.objects.all()
    serializer_class = IndividualImplementationAcademicPlanInFolderSerializer


@extend_schema(request=None, responses=None)
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def WorkProgramStatistic(request, pk):
    marks = [0, 0, 0, 0, 0, 0]
    work_programs = WorkProgramInFolder.objects.filter(work_program=pk)
    for program in work_programs:
        marks[program.work_program_rating] += 1
    return Response(
        {
            "Important Score": {
                "5": marks[5],
                "4": marks[4],
                "3": marks[3],
                "2": marks[2],
                "1": marks[1],
                "Not important": marks[0],
            }
        }
    )
