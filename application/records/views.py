from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView

from dataprocessing.models import User
from dataprocessing.serializers import WorkProgramShortSerializer
from workprogramsapp.expertise.models import Expertise
from workprogramsapp.models import WorkProgram, WorkProgramInFieldOfStudy, AcademicPlan, DisciplineBlock, \
    DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, ImplementationAcademicPlan, FieldOfStudy, \
    СertificationEvaluationTool
from workprogramsapp.workprogram_additions.models import StructuralUnit
from .serializers import WorkProgramInFieldOfStudySerializerForStatistic, \
    WorkProgramSerializerForStatistic, SuperShortWorkProgramSerializer, WorkProgramSerializerForStatisticExtended, \
    AcademicPlansDescriptionWpSerializer, WorkProgramPrerequisitesAndOutcomesSerializer, \
    WorkProgramDescriptionOnlySerializer, \
    ImplementationAcademicPlanWpStatisticSerializer, WorkProgramDuplicatesSerializer, \
    WorkProgramEvaluationToolsStatSerializer, AcademicPlanRealisedInYearSerializer, ModulesWithoutRulesSerializer


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
    #'+'
    """
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlansDescriptionWpSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def report_of_number_of_workprograms_by_qualification(request, qualification):
    """
    Отчет о количестве РПД по квалификации
    '+'
    """
    queryset = WorkProgram.objects.all()
    if qualification != 'all_q':
        queryset = queryset.filter(qualification=qualification)
    return Response({"quantity": len(queryset)})


class RecordOfWorkProgramQuality(APIView):
    """
    Сколько РПД имеют редакторов, в скольких РПД заполнены разделы, сколько РПД без пререквизитов.
    Сколько РПД не привязаны к учебному плану, не указан язык реализации, структурное подразделение
    """
    permission_classes = [AllowAny]

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


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def number_of_academplans_by_qualification_and_year(request, qualification, year):
    """
    Количество учебных планов по квалификации и году
    '+'
    """
    return Response({"quantity": AcademicPlan.objects.filter(
        academic_plan_in_field_of_study__qualification=qualification,
        academic_plan_in_field_of_study__year=year).count()})


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def EmptyStringWp(request):
    """
    API-запрос на просмотр РПД, без id строки
    """
    empty_wp = (WorkProgramInFieldOfStudy.objects.filter(work_program__editors__isnull=False,
                                                         id_str_up__isnull=True)).distinct()
    serializer = WorkProgramInFieldOfStudySerializerForStatistic(empty_wp, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def WpWithoutAP(request):
    """
    API-запрос на просмотр РПД, которых нету в УП
    """
    empty_wp = (WorkProgram.objects.filter(zuns_for_wp=None,
                                           editors__isnull=False)).distinct()
    serializer = WorkProgramSerializerForStatistic(empty_wp, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
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
@permission_classes((IsAuthenticated,))
def WpWithSimilarCodeGrouped(request):
    """
    API-запрос на просмотр РПД с одинаковым дисциплин кодом
    """
    wp_counter_code = WorkProgram.objects.all().values('discipline_code').annotate(
        total=Count('discipline_code')).filter(total__gt=1)
    similar_codes = {}
    for wp in wp_counter_code:

        similar_wp = WorkProgram.objects.filter(discipline_code=wp['discipline_code']).order_by("discipline_code")
        serializer = WorkProgramShortSerializer(similar_wp, many=True)
        similar_codes[wp['discipline_code']]=serializer.data
    """similar_wp = WorkProgram.objects.filter(discipline_code__in=similar_codes).order_by("discipline_code")
    serializer = WorkProgramSerializerForStatistic(similar_wp, many=True)"""
    return Response(similar_codes)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def SimpleStatistic(request):
    """
    API-запрос на просмотр различной статистики по РПД и пользователям
    '+'
    """
    registered_users = User.objects.count()
    rpd_users = User.objects.filter(editors__isnull=False, editors__work_status="w").distinct().count()
    on_expertise = Expertise.objects.filter(expertise_status="EX").count()
    approved = Expertise.objects.filter(expertise_status="AC").count()
    in_work = Expertise.objects.filter(expertise_status="RE").count()
    archived_rpd = WorkProgram.objects.filter(work_status="a").count()
    editors_rpd = WorkProgram.objects.filter(editors__isnull=False, work_status="w").distinct().count()
    total_rpd = WorkProgram.objects.all().count()
    return Response(
        {
            "total_rpd": total_rpd,
            "registered_users": registered_users,
            "users_in_rpd": rpd_users,
            "rpd_with_editors": editors_rpd,
            "rpd_on_expertise": on_expertise,
            "rpd_approved": approved,
            "archived_rpd": archived_rpd,
            "rpd_in_work": in_work
        }
    )


@api_view(['GET'])
@permission_classes((AllowAny,))
def WpWithoutStructuralUnit(request):
    """
    API-запрос на на просмотр РПД без структурного подразделения
    '+'
    """
    wp_without_unit = WorkProgram.objects.filter(structural_unit__isnull=True)
    serializer = WorkProgramSerializerForStatistic(wp_without_unit, many=True)
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
    '+'
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
            needed_wp = (WorkProgram.objects.select_related('structural_unit').filter(expertise_with_rpd__isnull=True,
                                                                                      structural_unit=unit) | WorkProgram.objects.filter(
                expertise_with_rpd__expertise_status__contains=status_filter,
                structural_unit=unit)).distinct()
        elif status_filter == "":
            needed_wp = WorkProgram.objects.select_related('structural_unit').filter(structural_unit=unit).distinct()
        else:
            needed_wp = WorkProgram.objects.select_related('structural_unit').filter(
                expertise_with_rpd__expertise_status__contains=status_filter,
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
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
@permission_classes((AllowAny,))
def WorkProgramDetailsWithApAndSemesters_old(request):
    """
    Отчет о заполнении РПД по структурному подразделению, году, семестру
    #'+'
    """
    status_filter = request.query_params["status"] if "status" in request.query_params else ""
    structural_unit_id = request.query_params.getlist(
        "structural_unit_id") if "structural_unit_id" in request.query_params else []
    year = request.query_params.getlist("year") if "year" in request.query_params \
        else [x for x in range(2000, 2050)]
    semester = request.query_params.getlist("semester") if "semester" in request.query_params else [-1]
    cred_regex = r""
    structural_unit_id = [int(x) for x in structural_unit_id]
    for i in range(12):
        if str(i + 1) in semester:
            cred_regex += "[^0]\.[0-9],\s"
        else:
            cred_regex += "(([0-9]\.[0-9])|[0]),\s"
    cred_regex = cred_regex[:-3]
    if status_filter == "WK":
        needed_wp = (WorkProgram.objects.filter(expertise_with_rpd__isnull=True,
                                                zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__year__in=year,
                                                structural_unit__in=structural_unit_id,
                                                zuns_for_wp__zuns_for_wp__ze_v_sem__iregex=cred_regex) |
                     WorkProgram.objects.filter(
                         expertise_with_rpd__expertise_status__contains=status_filter,
                         zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__year__in=year,
                         structural_unit__in=structural_unit_id,
                         zuns_for_wp__zuns_for_wp__ze_v_sem__iregex=cred_regex)).distinct()
    elif status_filter == "":
        needed_wp = WorkProgram.objects.filter(structural_unit__in=structural_unit_id,
                                               zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__year__in=year,
                                               zuns_for_wp__zuns_for_wp__ze_v_sem__iregex=cred_regex).distinct()
    else:
        needed_wp = WorkProgram.objects.filter(expertise_with_rpd__expertise_status__contains=status_filter,
                                               zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__year__in=year,
                                               structural_unit__in=structural_unit_id,
                                               zuns_for_wp__zuns_for_wp__ze_v_sem__iregex=cred_regex).distinct()
    serializer = WorkProgramSerializerForStatisticExtended(needed_wp, many=True)
    return Response(serializer.data)


class WorkProgramDetailsWithApAndSemesters(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializerForStatisticExtended
    permission_classes = [AllowAny]

    def get_queryset(self):
        request = self.request
        status_filter = request.query_params.get("status")
        structural_units = request.query_params.getlist("structural_unit_id")
        year = request.query_params.getlist("year")
        editors = request.query_params.getlist("editor_id")
        print(status_filter, structural_units, year, editors)

        queryset = WorkProgram.objects.all()

        filter_dict = {}
        if status_filter:
            if status_filter != "WK":
                filter_dict["expertise_with_rpd__expertise_status__contains"] = status_filter
        if structural_units:
            structural_units = [int(unit) for unit in structural_units]
            filter_dict["structural_unit__in"] = structural_units

        if editors:
            editors = [int(e) for e in editors]
            filter_dict["editors__in"] = editors
        queryset = queryset.filter(**filter_dict)
        result = WorkProgram.objects.none()
        if year:
            year = [int(y.split("-")[0]) for y in year]
            temp_year = year
            for y in temp_year:
                for i in range(1, 13, 2):
                    print(i)
                    cred_regex = r""
                    for j in range(1, 13, 2):
                        if j == i:
                            cred_regex += "((([^0]\.[0-9])|([^0])),\s(([0-9]\.[0-9])|[0-9])|(([0-9]\.[0-9])|[0-9]),\s(([^0]\.[0-9])|([^0]))),\s"
                        else:
                            cred_regex += "(([0-9]\.[0-9])|[0-9]),\s(([0-9]\.[0-9])|[0-9]),\s"
                    cred_regex = cred_regex[:-3]
                    y -= 1
                    result = result | queryset.filter(zuns_for_wp__zuns_for_wp__ze_v_sem__iregex=cred_regex,
                                                      zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__year=y)
        else:
            result = queryset
        return result


@api_view(["GET"])
@permission_classes((AllowAny,))
def GetDuplicates(request):
    duplicates = WorkProgram.objects.values('title').annotate(name_count=Count('title')).exclude(name_count=1)
    duplicates_list = []

    for wp in duplicates:
        duplicates = WorkProgram.objects.filter(title=wp["title"])
        serializer = WorkProgramSerializerForStatistic(duplicates, many=True)
        duplicates_list.append({"name": wp["title"], "count": wp["name_count"], "work_programs": serializer.data})
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
    paginator = pagination_class()
    page = paginator.paginate_queryset(duplicates_list, request)

    serializer = WorkProgramDuplicatesSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)
    # return Response(duplicates_list)


class GetPrerequisitesAndOutcomesOfWpByStrUP(generics.RetrieveAPIView):
    """
    Получение пререквизитов и результатов РПД по СТР_УП_ИД
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramPrerequisitesAndOutcomesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk = self.kwargs['pk']
        return WorkProgram.objects.filter(zuns_for_wp__zuns_for_wp__id_str_up=pk)

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset)
        self.check_object_permissions(self.request, obj)
        return obj


@api_view(['GET'])
@permission_classes((IsAdminUser,))
def FieldOfStudyPlanToISU(request, pk):
    """
    Перевод наших данных в ISU-лайк данные
    """
    """code = request.data.get('field_of_study_code')
    year = request.data.get('year')
    academic_plan_id = request.data.get('academic_plan_id')"""
    implementation_list = []
    all_imp = ImplementationAcademicPlan.objects.all()
    imp_len = all_imp.count()
    from_len = pk * 20
    end_len = from_len + 20 if from_len + 20 < imp_len else imp_len
    # all_imp = all_imp[from_len:end_len]
    for implementation in all_imp:
        academic_plan = AcademicPlan.objects.get(pk=implementation.academic_plan.id)
        field_of_study = FieldOfStudy.objects.get(pk=implementation.field_of_study.id)
        wp_isu_list = []
        for block in DisciplineBlock.objects.filter(academic_plan=academic_plan):
            for module in DisciplineBlockModule.objects.filter(descipline_block=block):
                for change in WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module):
                    for wp_field in WorkProgramInFieldOfStudy.objects.filter(
                            work_program_change_in_discipline_block_module=change):
                        for wp in WorkProgram.objects.filter(zuns_for_wp=wp_field):
                            try:
                                struct_unit = StructuralUnit.objects.get(pk=wp.structural_unit.id)
                            except AttributeError:
                                struct_unit = None
                                isu_id = None
                                struct_title = None
                            if wp.language == "ru":
                                language = "Русский"
                            elif wp.language == "en":
                                language = "Английский"
                            elif wp.language == "kz":
                                language = "Казахский"
                            elif wp.language == "de":
                                language = "Немецкий"
                            else:
                                language = "Русский/Английский"

                            wp_isu_list.append(
                                {"УНИКАЛЬНЫЙ_КОД": wp.discipline_code,
                                 "ИД_ИМПЛЕМЕНТАЦИЯ_АНАЛИТИКА": implementation.id,
                                 "ИД_УП_АНАЛИТИКА": academic_plan.id,
                                 "ИД_РПД_АНАЛИТИКА": wp.id,
                                 "ИД_УП": academic_plan.ap_isu_id,
                                 # ТИП ПЛАНА
                                 # "НАПР_ИД": ,
                                 "НС_ИД": implementation.ns_id,
                                 "ШИФР_НАПРАВЛЕНИЯ": field_of_study.number,
                                 "НАПРАВЛЕНИЕ_ПОДГОТОВКИ": field_of_study.title,
                                 "ОП_ИД": implementation.op_isu_id,
                                 "ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА": academic_plan.educational_profile,
                                 # "ФАК_ИД": 768
                                 "ФАКУЛЬТЕТ": field_of_study.faculty,
                                 "СРОК_ОБУЧЕНИЯ": 4.0,
                                 # "ВУЗ_ПАРТНЕР": null,
                                 # "СТРАНА_ВУЗА_ПАРТНЕРА": null,
                                 # "ЯЗЫК_ОБУЧЕНИЯ": language,
                                 # "ВОЕННАЯ_КАФЕДРА": 1,
                                 # "ОБЩАЯ_ТРУДОЕМКОСТЬ": "240 з.е.",
                                 # "ОГНП_ИД": int(wp.subject_code.split(".")[1]),
                                 # "ОГНП": "Фотоника"
                                 "ГОД_НАБОРА": implementation.year,
                                 # "БЛОК_ИД": 1
                                 "НАИМЕНОВАНИЕ_БЛОКА": block.name,
                                 # "МОДУЛЬ_ИД": 2
                                 "НАИМЕНОВАНИЕ_МОДУЛЯ": module.name,
                                 "ИД_СТР_УП": wp_field.id_str_up,
                                 # "ВЫБОР": 0,
                                 # "НОМЕР_ПО_ПЛАНУ": "1",
                                 "ДИС_ИД": wp.wp_isu_id,
                                 "ЗЕ": [token for token in
                                        change.credit_units.split(',')] if change.credit_units else None,
                                 "ЭКЗ": [cerf.semester for cerf in
                                         СertificationEvaluationTool.objects.filter(work_program=wp, type=1)],
                                 "ДИФ_ЗАЧЕТ": [cerf.semester for cerf in
                                               СertificationEvaluationTool.objects.filter(work_program=wp, type=2)],
                                 "ЗАЧЕТ": [cerf.semester for cerf in
                                           СertificationEvaluationTool.objects.filter(work_program=wp, type=3)],
                                 "КП": [cerf.semester for cerf in
                                        СertificationEvaluationTool.objects.filter(work_program=wp, type=4)],
                                 "ЛЕК": [float(token) for token in
                                         wp.lecture_hours.split(",")] if wp.lecture_hours else [],
                                 "ЛАБ": [float(token) for token in
                                         wp.lab_hours.split(",")] if wp.lecture_hours else [],
                                 "ПРАКТ": [float(token) for token in
                                           wp.practice_hours.split(",")] if wp.lecture_hours else [],
                                 "ДИСЦИПЛИНА": wp.title,
                                 "ИД_ИСПОЛНИТЕЛЯ_ДИС": struct_unit.isu_id if struct_unit else None,
                                 "ИСПОЛНИТЕЛЬ_ДИС": struct_unit.title if struct_unit else None,
                                 "ЯЗЫК_ДИСЦИПЛИНЫ": language

                                 }
                            )
        implementation_list.append(wp_isu_list)
        print("step complete")
        # print(serializer.data)
    print(len(implementation_list))
    print(ImplementationAcademicPlan.objects.all().count())
    with open('ap_all.json', 'w', encoding="utf-8") as file:
        file.write(json.dumps(implementation_list, ensure_ascii=False, indent=4))  # use `json.loads` to do the reverse
        file.close()
    return Response("я очинь люблю чоколадние орещки")


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def AllWpShort(request):
    wp = WorkProgram.objects.all()
    serializer = SuperShortWorkProgramSerializer(wp, many=True)
    return Response(serializer.data)


class AllAcademicPlanWithDescriptionWp(generics.ListAPIView):
    """
    Получение всех учебных планов со всеми описаниями РПД
    """
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlansDescriptionWpSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def EditorsByWPStatuses(request):
    """
    Редакторы с информацией о статусах их РПД (AC: принято, EX: на экспертизе:, WK: на доработке,
    NO_EXP: не отправлялось на экспертизу)
    """
    editors_status_list = []
    editors = User.objects.filter(editors__isnull=False).distinct()
    for editor in editors:
        expertise_of_editor = list(Expertise.objects.filter(work_program__editors=editor).distinct().values(
            "expertise_status").annotate(total=Count("expertise_status")))

        no_exp = {'expertise_status': 'NO_EXP', 'total': int(
            WorkProgram.objects.filter(expertise_with_rpd__isnull=True, editors=editor).distinct().count())}
        if no_exp['total'] == 0:
            no_exp = []
        expertise_of_editor.append(no_exp)

        editors_status_list.append(
            {
                "editor": {"id": editor.id, "name": editor.first_name + " " + editor.last_name, },
                "statuses_count": expertise_of_editor
            }
        )
    return Response(editors_status_list)


class GetAllWPsByEditor(generics.ListAPIView):
    """
    По id редактора показывает все его РПД
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramDescriptionOnlySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs['pk']
        return WorkProgram.objects.filter(editors__pk=pk)


class GetAllWPsWithEmptyField(generics.ListAPIView):
    """
    Получить список всех РПД с опредленным пустым полем
    чтобы указать по какому пустому полю производить фильтрацию надо задать параметр field в запрос
    На данный момент можно отфильтровать по следующим полям:
    ED - редакторы
    LANG - язык
    --------------------------------------------------------
    Пример: Получить список всех РПД без редакторов:
    /api/statistic/workprogram/empty_field_wp?field=ED
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramDescriptionOnlySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        field = self.request.query_params["field"]
        if field == "ED":
            return WorkProgram.objects.filter(editors__isnull=True)
        if field == "LANG":
            return WorkProgram.objects.filter(language__isnull=True)


class AllAcademicPlansWpExpertiseStatisticView(generics.ListAPIView):
    queryset = ImplementationAcademicPlan.objects.all()
    serializer_class = ImplementationAcademicPlanWpStatisticSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def GetCoursesWithWP(request):
    """
    Редакторы с информацией о статусах их РПД (AC: принято, EX: на экспертизе:, WK: на доработке,
    NO_EXP: не отправлялось на экспертизу)
    """
    editors_status_list = []
    editors = User.objects.filter(editors__isnull=False).distinct()
    for editor in editors:
        expertise_of_editor = list(Expertise.objects.filter(work_program__editors=editor).distinct().values(
            "expertise_status").annotate(total=Count("expertise_status")))

        no_exp = {'expertise_status': 'NO_EXP', 'total': int(
            WorkProgram.objects.filter(expertise_with_rpd__isnull=True, editors=editor).distinct().count())}
        if no_exp['total'] == 0:
            no_exp = []
        expertise_of_editor.append(no_exp)

        editors_status_list.append(
            {
                "editor": {"id": editor.id, "name": editor.first_name + " " + editor.last_name, },
                "statuses_count": expertise_of_editor
            }
        )
    return Response(editors_status_list)


class WorkProgramEvaluationToolsCounter(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramEvaluationToolsStatSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    search_fields = ['discipline_code', 'title']
    filterset_fields = ['expertise_with_rpd__expertise_status']
    permission_classes = [IsAuthenticated]


class WorkProgramRealisedInYear(generics.ListAPIView):
    """
    Получение всех РПД, реализующихся в опредленном учебном году
    Для указания учебного года нужно передать get-параметр year вида "YYYY/YYYY"
    """
    queryset = WorkProgram.objects.all()
    serializer_class = SuperShortWorkProgramSerializer
    permission_classes = [AllowAny]
    lookup_url_kwarg = "year"

    def get_queryset(self):
        year_of_sending = self.request.query_params.get(self.lookup_url_kwarg).split("/")[0]
        object_list = None

        for now_semester in range(12):

            many_term_regex = r""
            for i in range(12):
                if i == now_semester:
                    many_term_regex += "(([^0]\.[0-9])|([^0])),\s"
                else:
                    many_term_regex += "(([0-9]\.[0-9])|[0-9]),\s"
            many_term_regex = many_term_regex[:-3]
            wp_for_year = WorkProgram.objects.filter(
                work_program_in_change_block__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__year=int(
                    year_of_sending) - now_semester // 2,
                zuns_for_wp__zuns_for_wp__ze_v_sem__iregex=many_term_regex)
            if object_list:
                object_list = object_list | wp_for_year
            else:
                object_list = wp_for_year
        object_list = object_list.distinct()
        return object_list


class AcademicPlanRealisedInYear(generics.RetrieveAPIView):
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlanRealisedInYearSerializer
    permission_classes = [AllowAny]
    #lookup_url_kwarg = "year"


class ModulesWithoutSelectionRules(generics.ListAPIView):
    queryset = DisciplineBlockModule.objects.all()
    serializer_class = ModulesWithoutRulesSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DisciplineBlockModule.objects.filter(editors__isnull=False, selection_rule__isnull=True)
