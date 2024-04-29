import datetime

from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import generics, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from workprogramsapp.expertise.models import (
    Expertise,
    ExpertiseChangeLog,
    ExpertiseComments,
    UserExpertise,
)
from workprogramsapp.expertise.serializers import (
    CommentSerializer,
    ExpertiseChangeLogSerializer,
    ExpertiseSerializer,
    UserExpertiseSerializer,
)
from workprogramsapp.models import WorkProgram
from workprogramsapp.notifications.models import ExpertiseNotification
from workprogramsapp.permissions import (
    IsExpertiseMaster,
    IsExpertiseMasterStrict,
    IsMemberOfExpertise,
    IsMemberOfUserExpertise,
    IsRpdDeveloperOrReadOnly,
    IsWorkProgramMemberOfExpertise,
)
from workprogramsapp.workprogram_additions.models import UserStructuralUnit


class UserExpertiseListView(generics.ListAPIView):
    """Вывод всей информации об экспертизе для эксперта.

    Автоматически по токену пользователя выдает экспертизы, в которых он
    участвует. Если нужна определенная экспертиза от пользователя, то
    надо указать ее id.
    """

    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsMemberOfExpertise]

    def get_queryset(self, *args, **kwargs):

        # Обработка для drf-yasg (https://github.com/axnsan12/drf-yasg/issues/333)
        if getattr(self, "swagger_fake_view", False):
            return UserExpertise.objects.none()

        if "pk" in dict(self.kwargs):
            return UserExpertise.objects.filter(
                expertise=self.kwargs["pk"], expert=self.request.user
            )
        else:
            return UserExpertise.objects.filter(expert=self.request.user)


class UserExpertiseCreateView(generics.CreateAPIView):
    """Представление для создания экспертизы."""

    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsMemberOfExpertise]


class ExpertiseCommentsView(generics.ListAPIView):
    """Представление для получения и отправки комментариев.

    Комментарии можно получить или отправить, указав в адресе id
    экспертизы, При желании можно в параметрах указать блок комментариев
    для GET-запроса.
    """

    queryset = ExpertiseComments.objects.all()
    serializer_class = CommentSerializer

    permission_classes = [IsMemberOfExpertise]

    def get_queryset(self, *args, **kwargs):
        if "pk" in dict(self.kwargs):
            if self.request.query_params.get("block") is not None:
                return ExpertiseComments.objects.filter(
                    user_expertise__expertise=self.kwargs["pk"],
                    comment_block=self.request.query_params.get("block"),
                )
            else:
                return ExpertiseComments.objects.filter(
                    user_expertise__expertise=self.kwargs["pk"]
                )
        else:
            return ExpertiseComments.objects.all()


class ExpertiseCommentCreateView(generics.CreateAPIView):
    """Представление для создания комментария к экспертизе."""

    queryset = ExpertiseComments.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsMemberOfExpertise]


class ExpertiseWorkProgramView(generics.RetrieveAPIView):
    # TODO: Зачем вообще эта вьюха нужна?
    """Представление выдает все экспертизы связанные с id рабочей программы."""
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsWorkProgramMemberOfExpertise, IsRpdDeveloperOrReadOnly]

    def get_object(self):
        try:
            return Expertise.objects.get(work_program__id=self.kwargs["pk"])
        except Expertise.DoesNotExist:
            raise NotFound()


class ExpertiseListView(generics.ListAPIView):
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsMemberOfUserExpertise]
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        "date_of_last_change",
        "expertise_status",
        "work_program__title",
        "work_program__qualification",
        "work_program__discipline_code",
        "work_program__editors__first_name",
        "expertse_users_in_rpd__expert__first_name",
        "work_program__editors__last_name",
        "expertse_users_in_rpd__expert__last_name",
        "expertise_type",
    ]
    search_fields = [
        "work_program__title",
        "work_program__qualification",
        "work_program__discipline_code",
        "work_program__editors__first_name",
        "expertse_users_in_rpd__expert__first_name",
        "work_program__editors__last_name",
        "expertse_users_in_rpd__expert__last_name",
        "expertise_type",
    ]

    def get_queryset(self):

        if getattr(self, "swagger_fake_view", False):
            return Expertise.objects.none()

        request = self.request
        if request.user.groups.filter(name="expertise_master"):
            queryset = Expertise.objects.all()
        elif UserStructuralUnit.objects.filter(
            user=request.user, status__in=["leader", "deputy"]
        ):
            queryset = (
                Expertise.objects.filter(
                    work_program__structural_unit__user_in_structural_unit__user=request.user,
                    work_program__structural_unit__user_in_structural_unit__status__in=[
                        "leader",
                        "deputy",
                    ],
                ).distinct()
                | Expertise.objects.filter(
                    expertse_users_in_rpd__expert=request.user
                ).distinct()
            )
        else:
            queryset = Expertise.objects.filter(
                expertse_users_in_rpd__expert=request.user
            )
        return queryset


class ExpertiseViewById(generics.RetrieveAPIView):
    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsMemberOfExpertise]


class ExpertiseCreateView(generics.CreateAPIView):
    """Создание экспертизы.

    Автоматически добавляет пользователя-создателя как лидера экспертизы.
    P.S. Подробнее о создании экспертизы - см. сериализатор.
    """

    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ChangeExpertiseView(generics.UpdateAPIView):
    """Представление для редактирования экспертизы."""

    queryset = Expertise.objects.all()
    serializer_class = ExpertiseSerializer
    permission_classes = [IsExpertiseMasterStrict]

    def perform_update(self, serializer):
        instance = self.get_object()
        exp_status = self.request.data.get("expertise_status")
        user = self.request.user
        if exp_status == "AC":
            ExpertiseChangeLog.objects.create(
                expertise=instance,
                user=user,
                date_change=datetime.datetime.now(),
                action="AC",
            )
        elif exp_status == "RE":
            ExpertiseChangeLog.objects.create(
                expertise=instance,
                user=user,
                date_change=datetime.datetime.now(),
                action="RE",
            )
        serializer.save()


class ChangeUserExpertiseView(generics.UpdateAPIView):
    """Редактирование экспертизы отдельного пользователя."""

    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsMemberOfUserExpertise]


class DeleteUserExpertise(generics.DestroyAPIView):
    """Удаление экспертизы отдельного пользователя."""

    queryset = UserExpertise.objects.all()
    serializer_class = UserExpertiseSerializer
    permission_classes = [IsExpertiseMaster]


@extend_schema(request=None, responses=None)
@api_view(["POST"])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def UpdateCommentStatus(request):
    try:
        wp = WorkProgram.objects.get(id=request.data.get("wp"))
        block = request.data.get("block")
        read_notifications_array = [
            True if str(x) == "True" else False
            for x in wp.read_notifications.split(", ")
        ]
        if block == "MA":
            read_notifications_array[0] = False
        elif block == "PR":
            read_notifications_array[1] = False
        elif block == "SE":
            read_notifications_array[2] = False
        elif block == "TH":
            read_notifications_array[3] = False
        elif block == "SO":
            read_notifications_array[4] = False
        elif block == "EV":
            read_notifications_array[5] = False
        elif block == "RE":
            read_notifications_array[7] = False
        elif block == "CO":
            read_notifications_array[8] = False
        wp.read_notifications = (
            str(read_notifications_array).replace("[", "").replace("]", "")
        )
        wp.save()
        return Response(status=201)
    except Exception:
        return Response(status=400)


@extend_schema(request=None, responses=None)
@api_view(["GET"])
@permission_classes((IsRpdDeveloperOrReadOnly,))
def ExpertiseHistory(request, pk=None):
    """Получение полной истории экспертизы по ее id."""
    if not pk:
        return Response(status=400)

    queryset = ExpertiseNotification.objects.filter(expertise=pk).order_by(
        "notification_date"
    )
    history_response = []
    previous_date = (None,)
    for history_el in queryset:
        print(history_el.notification_date, history_el.message)
        date_formatted_str = str(
            history_el.notification_date.strftime("%Y-%m-%d %H:%M:%S")
        )
        if previous_date != date_formatted_str:
            history_response.append(
                {
                    "message": history_el.message.replace(
                        "Вы добавлены",
                        f"Пользователь {str(history_el.user)} добавлен",
                        1,
                    ),
                    "date": date_formatted_str,
                }
            )
            previous_date = date_formatted_str

    return Response(history_response, status=200)


@extend_schema(request=None, responses=None)
@api_view(["POST"])
@permission_classes((IsAdminUser,))
def ChangeStatusesOfExpertiseWP(request):
    try:
        wk_status = Expertise.objects.filter(expertise_status="WK")
        wk_status.update(expertise_status="RE")
        return Response("Господи, пусть оно ничего не сломает", status=200)

    except Exception:
        return Response(status=400)


class ExpertiseChangeLogListView(generics.ListAPIView):
    """История принятия экспертизы."""

    queryset = ExpertiseChangeLog.objects.all()
    serializer_class = ExpertiseChangeLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        if "pk" in dict(self.kwargs):
            return ExpertiseChangeLog.objects.filter(
                expertise=self.kwargs["pk"]
            ).order_by("date_change")
        if self.request.GET.get("wp_id"):
            return ExpertiseChangeLog.objects.filter(
                expertise__work_program__id=self.request.GET.get("wp_id")
            ).order_by("date_change")
