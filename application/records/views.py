from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import filters, viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .serializers import RecordWorkProgramSerializer, RecordAcademicPlanSerializer, WorkProgramSerializerForStatistic, \
    WorkProgramInFieldOfStudySerializerForStatistic, StructuralUnitWithWpSerializer

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models.aggregates import Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from dataprocessing.models import User
from workprogramsapp.expertise.models import Expertise
from workprogramsapp.models import WorkProgram, EducationalProgram, WorkProgramInFieldOfStudy, AcademicPlan, \
    DisciplineBlock, \
    DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, ImplementationAcademicPlan, FieldOfStudy, \
    СertificationEvaluationTool
from .serializers import WorkProgramInFieldOfStudySerializerForStatistic, \
    WorkProgramSerializerForStatistic, SuperShortWorkProgramSerializer, WorkProgramSerializerForStatisticExtended, \
    ShortStructuralUnitSerializer, ShortAcademicPlan, AcademicPlansDescriptionWpSerializer
from workprogramsapp.workprogram_additions.models import StructuralUnit


@api_view(['GET'])
@permission_classes((AllowAny,))
def StructuralUnits(request):
    """
    API-запрос на просмотр структурных подразделений
    """
    su = StructuralUnit.objects.all()

    results = []
    for i in su:
        results.append({'value': i.id, 'label': i.title})

    return Response(results)


@api_view(['GET'])
@permission_classes((AllowAny,))
def AcademicPlans(request):
    """
    API-запрос на просмотр УП
    """

    ap = AcademicPlan.objects.all()

    results = []
    for i in ap:
        results.append({'value': i.id, 'label': i.educational_profile + " " + i.year})

    return Response(results)


class OneAcademicPlanWithDescriptionWp(generics.RetrieveAPIView):
    """
    Получение конкретного учебного плана по его id со всеми описаниями РПД
    """
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlansDescriptionWpSerializer
    permission_classes = [AllowAny]


class RecordOfWorkProgram(APIView):
    # Количество рабочих программ по квалификации
    permission_classes = [IsAuthenticated]

    def get(self, request, qualification):
        queryset = WorkProgram.objects.all()
        if qualification != 'all_q':
            queryset = queryset.filter(qualification=qualification)
        return Response({"quantity": len(queryset)})


class RecordOfWorkProgramQuality(APIView):
    """
    Сколько РПД имеют редакторов, в скольких РПД заполнены разделы, сколько РПД без пререквизитов.
    Сколько РПД не привязаны к учебному плану, не указан язык реализации, структурное подразделение
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = WorkProgram.objects.all()
        without_language = queryset.filter(language=None)
        without_editors = queryset.filter(editors=None)
        without_structural_unit = queryset.filter(structural_unit=None)
        without_prerequisites = queryset.filter(prerequisites=None)
        without_discipline_sections = queryset.filter(discipline_sections=None)
        without_academic_plan = queryset.filter(work_program_in_change_block=None)
        without_outcomes = queryset.filter(outcomes=None)
        # serializer = RecordWorkProgramSerializer(queryset, many=True)

        return Response({"all": len(queryset),
                         "without_language": len(without_language),
                         "without_editors": len(without_editors),
                         "without_structural_unit": len(without_structural_unit),
                         "without_prerequisites": len(without_prerequisites),
                         "without_discipline_sections": len(without_discipline_sections),
                         "without_academic_plan": len(without_academic_plan),
                         "without_outcomes": len(without_outcomes)})


class RecordOfAcademicPlan(APIView):
    # Количество учебных планов по квалификации и году
    permission_classes = [IsAuthenticated]

    def get(self, request, qualification, year):
        queryset = AcademicPlan.objects.all()
        if qualification != 'all_q':
            queryset = queryset.filter(qualification=qualification)
        if year != 'all_years':
            queryset = queryset.filter(year=year)
        return Response({"quantity": len(queryset)})


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
    print(status_filter)
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


class WorkProgramDetailsWithApAndSemesters1(generics.ListAPIView):
    """
    Запрос с филтрами для рпд в структурных подразделениях
    -----------------------------------------------------
    Обязательные параметры:
    structural_unit_id - id структрных подразделений, для которых надо получить РПД, может быть несколько
    Необязательные параметры:
    year - Год учбеного плана в котором реализуется РПД, может быть несколько
    semester - Семетр в котором реализуется РПД
    status - Тип статуса РПД (EX - на экспертизе, AC - одобрена, WK - в работе), только в одном экземпляре
    Пример запроса:
    http://127.0.0.1:8000/api/statistic/structural/workprogram_extend?structural_unit_id=5&semester=5&year=2020&year=2019
    Все РПД из структурного подразделения с ID 5, реализующиеся в 5 семестре, для УП 2020 и 2019 года
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializerForStatisticExtended
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes((AllowAny,))
def WorkProgramDetailsWithApAndSemesters(request):
    print(request.query_params)
    status_filter = request.query_params["status"] if "status" in request.query_params else ""
    structural_unit_id = request.query_params.getlist(
        "structural_unit_id") if "structural_unit_id" in request.query_params else []
    year = request.query_params.getlist("year") if "year" in request.query_params \
        else [x for x in range(2000, 2050)]
    semester = request.query_params.getlist("semester") if "semester" in request.query_params else [-1]
    cred_regex = r""
    structural_unit_id = [int(x) for x in structural_unit_id]
    print(structural_unit_id)
    for i in range(12):
        if str(i + 1) in semester:
            cred_regex += "[^0],"
        else:
            cred_regex += "[0-9\-],"
    cred_regex = cred_regex[:-1]
    print(cred_regex)
    if status_filter == "WK":
        needed_wp = (WorkProgram.objects.filter(expertise_with_rpd__isnull=True,
                                                zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__year__in=year,
                                                structural_unit__in=structural_unit_id,
                                                zuns_for_wp__work_program_change_in_discipline_block_module__credit_units__iregex=cred_regex) |
                     WorkProgram.objects.filter(
                         expertise_with_rpd__expertise_status__contains=status_filter,
                         zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__year__in=year,
                         structural_unit__in=structural_unit_id,
                         zuns_for_wp__work_program_change_in_discipline_block_module__credit_units__iregex=cred_regex)).distinct()
    elif status_filter == "":
        needed_wp = WorkProgram.objects.filter(structural_unit__in=structural_unit_id,
                                               zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__year__in=year,
                                               zuns_for_wp__work_program_change_in_discipline_block_module__credit_units__iregex=cred_regex).distinct()
    else:
        needed_wp = WorkProgram.objects.filter(expertise_with_rpd__expertise_status__contains=status_filter,
                                               zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__year__in=year,
                                               structural_unit__in=structural_unit_id,
                                               zuns_for_wp__work_program_change_in_discipline_block_module__credit_units__iregex=cred_regex).distinct()
    print(len(WorkProgram.objects.filter(structural_unit=6)))
    serializer = WorkProgramSerializerForStatisticExtended(needed_wp, many=True)
    return Response(serializer.data)
