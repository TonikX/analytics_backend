from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from workprogramsapp.expertise.models import UserExpertise, ExpertiseComments, Expertise
from workprogramsapp.expertise.serializers import UserExpertiseSerializer, CommentSerializer, ExpertiseSerializer
from workprogramsapp.permissions import IsMemberOfExpertise, IsRpdDeveloperOrReadOnly, IsMemberOfUserExpertise, \
    IsExpertiseMaster, IsWorkProgramMemberOfExpertise
from workprogramsapp.workprogram_additions.models import UserStructuralUnit


class UserExpertiseListView(generics.ListAPIView):
    """
    Вывод всей информации об экспертизе для эксперта (автоматически по токену пользователя выдает экспертизы, в которых он учавствует):
    Если нужна опредленная экспертиза от пользователя, то надо указать ее id

    """
    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsMemberOfExpertise]

    def get_queryset(self, *args, **kwargs):
        if ('pk' in dict(self.kwargs)):
            return UserExpertise.objects.filter(expertise=self.kwargs['pk'], expert=self.request.user)
        else:
            return UserExpertise.objects.filter(expert=self.request.user)


class UserExpertiseCreateView(generics.CreateAPIView):
    """
    создание экспертизы
    """
    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsMemberOfExpertise]


class ExpertiseCommentsView(generics.ListAPIView):
    """
    View для получения и отправки комментариев
    Комментарии можно получить или отправить, указав в адресе id экспертизы,
    При желании можно в параметрах указать блок комментариев для GET-запроса
    """
    queryset = ExpertiseComments.objects.all()
    serializer_class = CommentSerializer

    permission_classes = [IsMemberOfExpertise]

    def get_queryset(self, *args, **kwargs):
        if ('pk' in dict(self.kwargs)):
            if self.request.query_params.get('block') != None:
                return ExpertiseComments.objects.filter(user_expertise__expertise=self.kwargs['pk'],
                                                        comment_block=self.request.query_params.get('block'))
            else:
                return ExpertiseComments.objects.filter(user_expertise__expertise=self.kwargs['pk'])
        else:
            return ExpertiseComments.objects.all()


class ExpertiseCommentCreateView(generics.CreateAPIView):
    """
    создание коммента к экспертизе
    """
    queryset = ExpertiseComments.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsMemberOfExpertise]


class ExpertiseWorkProgramView(generics.RetrieveAPIView):
    # TODO: Зачем вообще эта вьюха нужна?
    """
     ссылка выдает все экспертизы связанные с id рабочей программы
    """
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsWorkProgramMemberOfExpertise, IsRpdDeveloperOrReadOnly]

    def get_object(self):
        try:
            return Expertise.objects.get(work_program__id=self.kwargs['pk'])
        except Expertise.DoesNotExist:
            raise NotFound()


class ExpertiseListView(generics.ListAPIView):
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsMemberOfUserExpertise]
    def list(self, request, **kwargs):
        # Note the use of `get_queryset()` instead of `self.queryset`
        if request.user.groups.filter(name="expertise_master"):
            queryset = Expertise.objects.all()
        elif UserStructuralUnit.objects.filter(user=request.user, status__in=["leader", "deputy"]):
            queryset = Expertise.objects.filter(
                work_program__structural_unit__user_in_structural_unit__user=request.user,
                work_program__structural_unit__user_in_structural_unit__status__in=["leader", "deputy"]).distinct() | \
                       Expertise.objects.filter(expertse_users_in_rpd__expert=request.user).distinct()
        else:
            queryset = Expertise.objects.filter(expertse_users_in_rpd__expert=request.user)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        newdata = dict(serializer.data[0])
        return Response("newdata")


class ExpertiseViewById(generics.RetrieveAPIView):
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsExpertiseMaster]


class ExpertiseCreateView(generics.CreateAPIView):
    """
    Создание экспертизы
    Автоматически добавляет пользователя-создателя как лидера экспертизы
    (Подробней о создании экспертизы см. сериализатор)
    """

    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]



class ChangeExpertiseView(generics.UpdateAPIView):
    """
    Редактирование экспертизы
    """
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsExpertiseMaster]


class ChangeUserExpertiseView(generics.UpdateAPIView):
    """
    Редактирование экспертизы отдельного пользователя
    """
    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsMemberOfUserExpertise]


class DeleteUserExpertise(generics.DestroyAPIView):
    """
    Редактирование экспертизы отдельного пользователя
    """
    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsExpertiseMaster]
