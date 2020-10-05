from rest_framework import generics

from workprogramsapp.expertise.models import Expertise, UserExpertise, ExpertiseComments
from workprogramsapp.expertise.serializers import ExpertiseSerializer, UserExpertiseSerializer, CommentSerializer


class UserExpertiseView(generics.ListCreateAPIView):
    """
    Вывод всей информации об экспертизе для эксперта (автоматически по токену пользователя выдает экспертизы, в которых он учавствует):
    Общая модель экспертизы, таблица экспертизы отдельного эксперта, Информация об эксперте, информация о РП
    """
    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer

    def get_queryset(self, *args, **kwargs):
        return UserExpertise.objects.filter(expert=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class ExpertiseCommentsView(generics.ListCreateAPIView):
    """
    View для получения и отправки комментариев, чтобы отправить комментарий указывать UserExpertise НЕ надо (см сериализатор)
    Комментарии можно получить, указав в адресе айди экспертизы
    """
    queryset = ExpertiseComments.objects.all()
    serializer_class = CommentSerializer
    ordering = ['id']
    paginate_by = 50

    def get_queryset(self, *args, **kwargs):
        if ('pk' in dict(self.kwargs)):
            return ExpertiseComments.objects.filter(user_expertise__expertise=self.kwargs['pk'])
        else:
            return ExpertiseComments.objects.all()

    def perform_create(self, serializer):
        serializer.save()


class ExpertiseView(generics.ListCreateAPIView):
    """
    Создание и получение экспертизы
    (Подробней о создании экспертизы см. сериализатор)
    """
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer

    def perform_create(self, serializer):
        serializer.save()


class ChangeExpertise(generics.RetrieveUpdateAPIView):
    """
    Редактирование экспертизы (в url пока не указано)
    """
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()


class ChangeUserExpertise(generics.RetrieveUpdateAPIView):
    """
    Редактирование экспертизы отдельного пользователя (в url пока не указано)
    """
    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
