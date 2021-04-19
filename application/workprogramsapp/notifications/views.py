from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from workprogramsapp.folders_ans_statistic.models import Folder, WorkProgramInFolder, \
    AcademicPlanInFolder, DisciplineBlockModuleInFolder, IndividualImplementationAcademicPlanInFolder
from workprogramsapp.folders_ans_statistic.serializers import FolderSerializer, WorkProgramInFolderSerializer, \
    FolderCreateSerializer, AcademicPlanInFolderSerializer, \
    ModuleInFolderSerializer, IndividualImplementationAcademicPlanInFolderSerializer
from workprogramsapp.notifications.models import UserNotification
from workprogramsapp.notifications.serializers import NotificationSerializer
from workprogramsapp.permissions import IsOwnerOfFolder, IsOwnerOfFolderWithWorkProgramm, \
    IsOwnerOfFolderWithAcademicPlan, IsOwnerOfFolderWithDisciplineBlockModule, \
    IsOwnerOfFolderWithIndividualImplementationAcademicPlan
from rest_framework.permissions import IsAuthenticated


# РПД
class NotificationListView(generics.ListAPIView):
    queryset = UserNotification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, **kwargs):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = UserNotification.objects.filter(user=request.user)
        print(queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
