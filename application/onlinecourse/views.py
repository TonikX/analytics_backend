from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from onlinecourse.data_onlinecourse import get_data
from onlinecourse.models import Institution, Platform, OnlineCourse
from onlinecourse.serializers import (
    InstitutionSerializer,
    PlatformSerializer,
    OnlineCourseSerializer,
    CourseCreditSerializer,
    CourseFieldOfStudySerializer,
)
from workprogramsapp.models import FieldOfStudy, CourseCredit, CourseFieldOfStudy


class InstitutionViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Правообладатель"""

    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title"]


class PlatformViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Платформа"""

    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title"]


class OnlineCourseViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Онлайн курс"""

    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    search_fields = [
        "title",
        "platform__title",
        "institution__title",
        "course_field_of_study__field_of_study__number",
        "course_field_of_study__field_of_study__title",
    ]
    ordering_fields = [
        "title",
        "platform__title",
        "institution__title",
        "language",
        "started_at",
        "rating",
    ]
    filterset_fields = [
        "platform__title",
        "institution__title",
        "language",
        "course_field_of_study__field_of_study__number",
        "course_field_of_study__field_of_study__title",
    ]


class CourseCreditViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Перезачет"""

    queryset = CourseCredit.objects.all()
    serializer_class = CourseCreditSerializer


class CourseFieldOfStudyViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Требования для онлайн курса"""

    queryset = CourseFieldOfStudy.objects.all()
    serializer_class = CourseFieldOfStudySerializer


class CourseDataAPIView(APIView):
    """
    Контроллер для загрузки данных из реестра онлайн курсов
    """

    def post(self, request):
        print("Data parsing started")
        (
            data_Platform,
            data_Rigthholder,
            data_OnlineCourse,
            data_CourseFieldOfStudy,
            data_CourseCredit,
        ) = get_data()
        print("Data parsing ended")

        """
        Adding data to Platform
        """
        for i in range(len(data_Platform)):
            if Platform.objects.filter(id=data_Platform.index[i]).exists():
                continue
            else:
                platform = Platform.objects.create(
                    id=data_Platform.index[i],
                    id_from_roo=data_Platform.platform_id[i],
                    title=data_Platform.title[i],
                )
                platform.save()

        """
        Adding data to Institution
        """
        for i in range(len(data_Rigthholder)):
            if Institution.objects.filter(id=data_Rigthholder.index[i]).exists():
                continue
            else:
                institution = Institution.objects.create(
                    id=data_Rigthholder.index[i],
                    id_from_roo=data_Rigthholder.institution_id[i],
                    title=data_Rigthholder.title[i],
                )
                institution.save()

        """
        Adding data to OnlineCourse
        """
        for i in range(len(data_OnlineCourse)):
            if OnlineCourse.objects.filter(id=data_OnlineCourse.index[i]).exists():
                continue
            else:
                onlinecourse = OnlineCourse.objects.create(
                    id=data_OnlineCourse.index[i],
                    id_from_roo=data_OnlineCourse.index[i],
                    title=data_OnlineCourse.title_x[i],
                    description=data_OnlineCourse.description[i],
                    institution=Institution.objects.get(
                        id=data_OnlineCourse.id_institution[i]
                    ),
                    platform=Platform.objects.get(id=data_OnlineCourse.id_platform[i]),
                    language=data_OnlineCourse.language[i],
                )
                onlinecourse.save()
            if data_OnlineCourse.started_at[i] != "null":
                onlinecourse.started_at = data_OnlineCourse.started_at[i]
                onlinecourse.save()
            if data_OnlineCourse.created_at[i] != "null":
                onlinecourse.created_at = data_OnlineCourse.created_at[i]
                onlinecourse.save()
            if data_OnlineCourse.record_end_at[i] != "null":
                onlinecourse.record_end_at = data_OnlineCourse.record_end_at[i]
                onlinecourse.save()
            if data_OnlineCourse.finished_at[i] != "null":
                onlinecourse.finished_at = data_OnlineCourse.finished_at[i]
                onlinecourse.save()
            if data_OnlineCourse.rating[i] != "null":
                onlinecourse.rating = data_OnlineCourse.rating[i]
                onlinecourse.save()
            if data_OnlineCourse.experts_rating[i] != "null":
                try:
                    onlinecourse.experts_rating = float(
                        data_OnlineCourse.experts_rating[i]
                    )
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.visitors_number[i] != "null":
                try:
                    onlinecourse.visitors_number = int(
                        data_OnlineCourse.visitors_number[i]
                    )
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.total_visitors_number[i] != "null":
                try:
                    onlinecourse.total_visitors_number = int(
                        data_OnlineCourse.total_visitors_number[i]
                    )
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.duration[i] != "null":
                try:
                    onlinecourse.duration = int(data_OnlineCourse.duration[i])
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.volume[i] != "null":
                try:
                    onlinecourse.volume = int(data_OnlineCourse.volume[i])
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.intensity_per_week[i] != "null":
                try:
                    onlinecourse.intensity_per_week = int(
                        data_OnlineCourse.intensity_per_week[i]
                    )
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.content[i] != "null":
                try:
                    onlinecourse.content = str(data_OnlineCourse.content[i])
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.lectures_number[i] != "null":
                try:
                    onlinecourse.lectures_number = int(
                        data_OnlineCourse.lectures_number[i]
                    )
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.external_url[i] != "null":
                try:
                    onlinecourse.external_url = str(data_OnlineCourse.external_url[i])
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.has_certificate[i] != "null":
                try:
                    onlinecourse.has_certificate = bool(
                        data_OnlineCourse.has_certificate[i]
                    )
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.credits[i] != "null":
                try:
                    onlinecourse.credits = float(data_OnlineCourse.credits[i])
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.requirements[i] != "null":
                try:
                    onlinecourse.requirements = data_OnlineCourse.requirements[i]
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.competences[i] != "null":
                try:
                    onlinecourse.competences = data_OnlineCourse.competences[i]
                    onlinecourse.save()
                except:
                    continue
            if data_OnlineCourse.learning_outcomes[i] != "null":
                try:
                    onlinecourse.learning_outcomes = (
                        data_OnlineCourse.learning_outcomes[i]
                    )
                    onlinecourse.save()
                except:
                    continue
        """
        Adding data to CourseFieldOfStudy
        """
        for i in range(len(data_CourseFieldOfStudy)):
            if CourseFieldOfStudy.objects.filter(
                id=data_CourseFieldOfStudy.index[i]
            ).exists():
                continue
            else:
                if FieldOfStudy.objects.filter(
                    number=data_CourseFieldOfStudy.field_of_study[i]
                ).exists():
                    onlinecourse_field_of_study = CourseFieldOfStudy.objects.create(
                        id=data_CourseFieldOfStudy.index[i],
                        course=OnlineCourse.objects.get(
                            id=data_CourseFieldOfStudy.id_course[i]
                        ),
                        field_of_study=FieldOfStudy.objects.get(
                            number=data_CourseFieldOfStudy.field_of_study[i]
                        ),
                    )
                    onlinecourse_field_of_study.save()

        """
        Adding data to CourseCredit
        """

        for i in range(len(data_CourseCredit)):
            if CourseCredit.objects.filter(id=data_CourseCredit.index[i]).exists():
                continue
            else:
                if FieldOfStudy.objects.filter(
                    number=data_CourseCredit.field_of_study[i]
                ).exists():
                    onlinecourse_credit = CourseCredit.objects.create(
                        id=data_CourseCredit.index[i],
                        course=OnlineCourse.objects.get(
                            id=data_CourseCredit.id_course[i]
                        ),
                        institution=Institution.objects.get(
                            id=data_CourseCredit.id_institution[i]
                        ),
                        field_of_study=FieldOfStudy.objects.get(
                            number=data_CourseCredit.field_of_study[i]
                        ),
                    )
                    onlinecourse_credit.save()

        return Response(status=200)
