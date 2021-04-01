from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response


from .models import Institution, Platform, OnlineCourse, CourseCredit, CourseRequirement, CourseFieldOfStudy, \
    CourseLearningOutcome, CourseWorkProgram
from .serializers import InstitutionSerializer, PlatformSerializer, OnlineCourseSerializer, \
    CourseCreditSerializer, CourseRequirementSerializer, CourseFieldOfStudySerializer, CourseLearningOutcomeSerializer, \
    CourseWorkProgramSerializer

from .data_onlinecourse import data_platform, data_rigthholder, data_online_course_platform_inst


class InstitutionViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Правообладатель"""
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']


class PlatformViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Платформа"""
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']


class OnlineCourseViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Онлайн курс"""
    queryset = OnlineCourse.objects.all()
    serializer_class = OnlineCourseSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['title', 'platform__title', 'institution__title']
    ordering_fields = ['title', 'platform__title', 'institution__title', 'language', 'started_at', 'rating']
    filterset_fields = ['platform__title', 'institution__title', 'language']


class CourseCreditViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Перезачет"""
    queryset = CourseCredit.objects.all()
    serializer_class = CourseCreditSerializer


class CourseRequirementViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Требования для онлайн курса"""
    queryset = CourseRequirement.objects.all()
    serializer_class = CourseRequirementSerializer


class CourseFieldOfStudyViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Требования для онлайн курса"""
    queryset = CourseFieldOfStudy.objects.all()
    serializer_class = CourseFieldOfStudySerializer


class CourseLearningOutcomeViewSet(viewsets.ModelViewSet):
    """Контроллер для модели Требования для онлайн курса"""
    queryset = CourseLearningOutcome.objects.all()
    serializer_class = CourseLearningOutcomeSerializer


class CourseWorkProgramViewSet(viewsets.ModelViewSet):
    """Контроллер для модели РПД и онлайн курс"""
    queryset = CourseWorkProgram.objects.all()
    serializer_class = CourseWorkProgramSerializer


""" Контроллеры для загрузки данных из реестра онлайн курсов """


class CourseDataAPIView(APIView):
    """

    """
    def post(self, request):
        for i in range(len(data_platform)):
            if Platform.objects.filter(id=data_platform.index[i]).exists():
                continue
            else:
                platform = Platform.objects.create(id=data_platform.index[i],
                                                   title=data_platform.title[i],)
                platform.save()
        for i in range(len(data_rigthholder)):
            if Institution.objects.filter(id=data_rigthholder.index[i]).exists():
                continue
            else:
                institution = Institution.objects.create(id=data_rigthholder.index[i],
                                                         title=data_rigthholder.title[i],)
                institution.save()
        for i in range(len(data_online_course_platform_inst)):
            if OnlineCourse.objects.filter(id=data_online_course_platform_inst.index[i]).exists():
                continue
            else:
                onlinecourse = OnlineCourse.objects.create(id=data_online_course_platform_inst.index[i],
                                                           title=data_online_course_platform_inst.title_x[i],
                                                           description=data_online_course_platform_inst.description[i],
                                                           institution=Institution.objects.get(id=data_online_course_platform_inst.id_rightholder[i]),
                                                           platform=Platform.objects.get(id=data_online_course_platform_inst.id_platform[i]),
                                                           language=data_online_course_platform_inst.language[i],
                                                           started_at=data_online_course_platform_inst.started_at[i],
                                                           created_at=data_online_course_platform_inst.created_at[i],
                                                           record_end_at=data_online_course_platform_inst.record_end_at[i],
                                                           finished_at=data_online_course_platform_inst.finished_at[i],
                                                           rating=data_online_course_platform_inst.rating[i],
                                                           experts_rating=data_online_course_platform_inst.experts_rating[i],
                                                           visitors_number=data_online_course_platform_inst.visitors_number[i],
                                                           total_visitors_number=data_online_course_platform_inst.total_visitors_number[i],
                                                           duration=data_online_course_platform_inst.duration[i],
                                                           volume=data_online_course_platform_inst.volume[i],
                                                           intensity_per_week=data_online_course_platform_inst.intensity_per_week[i],
                                                           content=data_online_course_platform_inst.content[i],
                                                           lectures_number=data_online_course_platform_inst.lectures_number[i],
                                                           external_url=data_online_course_platform_inst.external_url[i],
                                                           has_certificate=data_online_course_platform_inst.has_certificate[i],
                                                           credits=data_online_course_platform_inst.credits[i],
                                                           )
                onlinecourse.save()
        return Response(status=200)

