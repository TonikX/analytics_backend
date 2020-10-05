from rest_framework import generics

from workprogramsapp.expertise.models import UserExpertise, ExpertiseComments, Expertise
from workprogramsapp.expertise.serializers import UserExpertiseSerializer, CommentSerializer, ExpertiseSerializer
from workprogramsapp.permissions import IsMemberOfExpertise, IsRpdDeveloperOrReadOnly


class UserExpertiseView(generics.ListCreateAPIView):
    """
    Вывод всей информации об экспертизе для эксперта (автоматически по токену пользователя выдает экспертизы, в которых он учавствует):
    Если нужна опредленная экспертиза пользователя, то надо указать ее id

    """
    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsMemberOfExpertise, IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if ('pk' in dict(self.kwargs)):
            return ExpertiseComments.objects.filter(expertise=self.kwargs['pk'], expert=self.request.user)
        else:
            return UserExpertise.objects.filter(expert=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class ExpertiseCommentsView(generics.ListCreateAPIView):
    """
    View для получения и отправки комментариев
    Чтобы отправить комментарий указывать UserExpertise НЕ надо (см сериализатор), достаточно указать айди экспертизы в адресе
    Комментарии можно получить или отправить, указав в адресе id экспертизы,
    При желании можно в параметрах указать блок комментариев для GET-запроса
    """
    queryset = ExpertiseComments.objects.all()
    serializer_class = CommentSerializer

    permission_classes = [IsMemberOfExpertise, IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        print(dict(self.kwargs))
        if ('pk' in dict(self.kwargs)):
            if self.request.query_params.get('block') != None:
                return ExpertiseComments.objects.filter(user_expertise__expertise=self.kwargs['pk'],
                                                        comment_block=self.request.query_params.get('block'))
            else:
                return ExpertiseComments.objects.filter(user_expertise__expertise=self.kwargs['pk'])
        else:
            return ExpertiseComments.objects.all()

    def perform_create(self, serializer):
        serializer.save()


class ExpertiseView(generics.ListCreateAPIView):
    """
    Создание и получение экспертизы
    Автоматически добавляет пользователя-создателя как лидера экспертизы
    При указании id в ссылке выдает все экспертизы связанные с id рабочей программы
    (Подробней о создании экспертизы см. сериализатор)
    """
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        if ('pk' in dict(self.kwargs)):
            return Expertise.objects.filter(id=self.kwargs['pk'])

    def perform_create(self, serializer):
        serializer.save()


class ChangeExpertiseView(generics.RetrieveUpdateAPIView):
    """
    Редактирование экспертизы
    """
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    #permission_classes = [IsMemberOfExpertise, IsRpdDeveloperOrReadOnly]

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()


class ChangeUserExpertiseView(generics.RetrieveUpdateAPIView):
    """
    Редактирование экспертизы отдельного пользователя
    """
    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    #permission_classes = [IsMemberOfExpertise, IsRpdDeveloperOrReadOnly]

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
