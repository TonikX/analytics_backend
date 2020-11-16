from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from workprogramsapp.folders_ans_statistic.models import Folder, WorkProgramInFolder
from workprogramsapp.folders_ans_statistic.serializers import FolderSerializer, WorkProgramInFolderSerializer
from workprogramsapp.permissions import IsOwnerOfFolder, IsOwnerOfFolderWithWorkProgramm


class FoldersListView(generics.ListAPIView):
    """
    Выдает все папки для запрашивающего пользователя с рпд внутри
    """
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

    def get_queryset(self, *args, **kwargs):
        return Folder.objects.filter(owner=self.request.user)


class WorkProgramInFolderView(generics.ListAPIView):
    """
    Выдает все РПД для запрашивающего пользователя с рейтингом в указанной папке
    В url-е нужно указать айди папки
    """
    queryset = WorkProgramInFolder.objects.all()
    serializer_class = WorkProgramInFolderSerializer

    def get_queryset(self, *args, **kwargs):
        try:
            return WorkProgramInFolder.objects.filter(folder=self.kwargs['pk'], folder__owner=self.request.user)
        except KeyError:
            raise NotFound()


class CreateFolderView(generics.CreateAPIView):
    """
    Создание папки
    """
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer


class DeleteFolderView(generics.DestroyAPIView):
    """
    Удаление папки
    """
    permission_classes = [IsOwnerOfFolder]
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer


class EditFolderView(generics.UpdateAPIView):
    """
      Изменение данных в папке
    """
    # TODO: block to change folder owner
    permission_classes = [IsOwnerOfFolder]
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer


class AddToFolderView(generics.CreateAPIView):
    """
      Добавление РПД в папку
    """
    permission_classes = [IsOwnerOfFolderWithWorkProgramm]
    queryset = WorkProgramInFolder.objects.all()
    serializer_class = WorkProgramInFolderSerializer


class RemoveFromFolderView(generics.DestroyAPIView):
    """
    Удаление РПД из папки
    """
    permission_classes = [IsOwnerOfFolderWithWorkProgramm]
    queryset = WorkProgramInFolder.objects.all()
    serializer_class = WorkProgramInFolderSerializer


@api_view(['GET'])
def WorkProgramStatistic(request, pk):
    marks = [0, 0, 0, 0, 0, 0]
    work_programs = WorkProgramInFolder.objects.filter(work_program=pk)
    for program in work_programs:
        marks[program.work_program_rating] += 1
    return Response({"Important Score": {"5": marks[5], "4": marks[4], "3": marks[3], "2": marks[2], "1": marks[1],
                                         "Not important": marks[0]}})
