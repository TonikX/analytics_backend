from django.db.models.aggregates import Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from dataprocessing.models import User
from workprogramsapp.expertise.models import Expertise
from workprogramsapp.models import WorkProgram, WorkProgramInFieldOfStudy
from workprogramsapp.statistic.serializers import WorkProgramInFieldOfStudySerializerForStatistic, \
    WorkProgramSerializerForStatistic
from workprogramsapp.workprogram_additions.models import StructuralUnit


@api_view(['GET'])
@permission_classes((AllowAny,))
def EmptyStringWp(request):
    """
    API-запрос на просмотр РПД, без id строки
    """
    empty_wp = (WorkProgramInFieldOfStudy.objects.filter(work_program__editors__isnull=False,
                                                         id_str_up__isnull=True)).distinct()
    serializer = WorkProgramInFieldOfStudySerializerForStatistic(empty_wp, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def WpWithoutAP(request):
    """
    API-запрос на просмотр РПД, которых нету в УП
    """
    empty_wp = (WorkProgram.objects.filter(zuns_for_wp=None,
                                           editors__isnull=False)).distinct()
    serializer = WorkProgramSerializerForStatistic(empty_wp, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def WpWithSimilarCode(request):
    """
    API-запрос на просмотр РПД с одинаковым дисциплин кодом
    """
    wp_counter_code = WorkProgram.objects.all().values('discipline_code').annotate(
        total=Count('discipline_code')).filter(total__gt=1)
    print(wp_counter_code)
    similar_codes = []
    for wp in wp_counter_code:
        similar_codes.append(wp['discipline_code'])
    similar_wp = WorkProgram.objects.filter(discipline_code__in=similar_codes).order_by("discipline_code")
    serializer = WorkProgramSerializerForStatistic(similar_wp, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def SimpleStatistic(request):
    """
    API-запрос на просмотр различной статистики по РПД и пользователям
    """
    registered_users = User.objects.count()
    rpd_users = User.objects.filter(editors__isnull=False).distinct().count()
    on_expertise = Expertise.objects.filter(expertise_status="EX").count()
    approved = Expertise.objects.filter(expertise_status="AC").count()
    in_work = Expertise.objects.filter(expertise_status="WK").count() + WorkProgram.objects.filter(
        expertise_with_rpd__isnull=True).distinct().count()
    editors_rpd = WorkProgram.objects.filter(editors__isnull=False).count()
    return Response(
        {
            "registered_users": registered_users,
            "users_in_rpd": rpd_users,
            "rpd_with_editors": editors_rpd,
            "rpd_on_expertise": on_expertise,
            "rpd_approved": approved,
            "rpd_in_work": in_work
        }
    )


@api_view(['GET'])
@permission_classes((AllowAny,))
def WpWithoutStructuralUnit(request):
    """
    API-запрос на на просмотр РПД без структурного подразделения
    """
    wp_without_unit = WorkProgram.objects.filter(structural_unit__isnull=True)
    serializer = WorkProgramSerializerForStatistic(wp_without_unit, many=True)
    # print(serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def StructuralUnitWp(request):
    """

    API-запрос на просмотр РПД в структурныхх подразделениях; Можно фильтровать посредством параметров в адресной строке
    Поле филтрации: status - статус РПД
    Параметры: EX - на экспертизе, AC - одобрена, WK - в работе

    Пример запроса:
    https://op.itmo.ru/api/statistic/structural/workprogram?status=EX - Все РПД из структруных подразделений на экспертизе
    """
    try:
        status_filter = request.query_params["status"]
    except KeyError:
        status_filter = ""
    units = StructuralUnit.objects.all()
    result = []
    for unit in units:
        if status_filter == "WK":
            needed_wp = (WorkProgram.objects.filter(expertise_with_rpd__isnull=True,
                                                    structural_unit=unit) | WorkProgram.objects.filter(
                expertise_with_rpd__expertise_status__contains=status_filter,
                structural_unit=unit)).distinct()
        elif status_filter == "":
            needed_wp = WorkProgram.objects.filter(structural_unit=unit).distinct()
        else:
            needed_wp = WorkProgram.objects.filter(expertise_with_rpd__expertise_status__contains=status_filter,
                                                   structural_unit=unit).distinct()
        serializer = WorkProgramSerializerForStatistic(needed_wp, many=True)
        result.append({"id": unit.id,
                       "title": unit.title,
                       "work_programs": serializer.data})
    return Response(result)
