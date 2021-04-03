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

from .data_onlinecourse import get_data


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
        data_platform, data_rigthholder, data_online_course = get_data()
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
        for i in range(len(data_online_course)):
            if OnlineCourse.objects.filter(id=data_online_course.index[i]).exists():
                continue
            else:
                onlinecourse = OnlineCourse.objects.create(id=data_online_course.index[i],
                                                           title=data_online_course.title_x[i],
                                                           description=data_online_course.description[i],
                                                           institution=Institution.objects.get(id=data_online_course.id_rightholder[i]),
                                                           platform=Platform.objects.get(id=data_online_course.id_platform[i]),
                                                           language=data_online_course.language[i],
                                                           )
                onlinecourse.save()
            if data_online_course.started_at[i] != 'None':
                onlinecourse.started_at = data_online_course.started_at[i]
                onlinecourse.save()
            if data_online_course.created_at[i] != 'None':
                onlinecourse.created_at = data_online_course.created_at[i]
                onlinecourse.save()
            if data_online_course.record_end_at[i] != 'None':
                onlinecourse.record_end_at = data_online_course.record_end_at[i]
                onlinecourse.save()
            if data_online_course.finished_at[i] != 'None':
                onlinecourse.finished_at = data_online_course.finished_at[i]
                onlinecourse.save()
            if data_online_course.rating[i] != 'None':
                onlinecourse.rating = data_online_course.rating[i]
                onlinecourse.save()
            if data_online_course.experts_rating[i] != 'None':
                onlinecourse.experts_rating = float(data_online_course.experts_rating[i])
                onlinecourse.save()
            if data_online_course.visitors_number[i] != 'None':
                onlinecourse.visitors_number = int(data_online_course.visitors_number[i])
                onlinecourse.save()
            if data_online_course.total_visitors_number[i] != 'None':
                onlinecourse.total_visitors_number = int(data_online_course.total_visitors_number[i])
                onlinecourse.save()
            if data_online_course.duration[i] != 'None':
                onlinecourse.duration = int(data_online_course.duration[i])
                onlinecourse.save()
            if data_online_course.volume[i] != 'None':
                onlinecourse.volume = int(data_online_course.volume[i])
                onlinecourse.save()
            if data_online_course.intensity_per_week[i] != 'None':
                onlinecourse.intensity_per_week = int(data_online_course.intensity_per_week[i])
                onlinecourse.save()
            if data_online_course.content[i] != 'None':
                onlinecourse.content = str(data_online_course.content[i])
                onlinecourse.save()
            if data_online_course.lectures_number[i] != 'None':
                onlinecourse.lectures_number = int(data_online_course.lectures_number[i])
                onlinecourse.save()
            if data_online_course.external_url[i] != 'None':
                onlinecourse.external_url = str(data_online_course.external_url[i])
                onlinecourse.save()
            if data_online_course.has_certificate[i] != 'None':
                onlinecourse.has_certificate = bool(data_online_course.has_certificate[i])
                onlinecourse.save()
            if data_online_course.credits[i] != 'None':
                onlinecourse.credits = float(data_online_course.credits[i])
                onlinecourse.save()
        return Response(status=200)
