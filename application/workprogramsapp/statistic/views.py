import json

from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from dataprocessing.models import User
from workprogramsapp.expertise.models import Expertise
from workprogramsapp.models import WorkProgram, WorkProgramInFieldOfStudy, AcademicPlan, DisciplineBlock, \
    DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, ImplementationAcademicPlan, FieldOfStudy, \
    СertificationEvaluationTool
from workprogramsapp.statistic.serializers import WorkProgramInFieldOfStudySerializerForStatistic, \
    WorkProgramSerializerForStatistic, SuperShortWorkProgramSerializer, WorkProgramSerializerForStatisticExtended, \
    AcademicPlansDescriptionWpSerializer, WorkProgramPrerequisitesAndOutcomesSerializer
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
@permission_classes((AllowAny,))
def AllWpShort(request):
    wp = WorkProgram.objects.all()
    serializer = SuperShortWorkProgramSerializer(wp, many=True)
    return Response(serializer.data)


class WorkProgramDetailsWithApAndSemesters(generics.ListAPIView):
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

    def get_queryset(self):
        print(self.request.query_params)
        status_filter = self.request.query_params["status"] if "status" in self.request.query_params else ""
        structural_unit_id = self.request.query_params.getlist(
            "structural_unit_id") if "structural_unit_id" in self.request.query_params else []
        year = self.request.query_params.getlist("year") if "year" in self.request.query_params \
            else [x for x in range(2000, 2050)]
        semester = self.request.query_params.getlist("semester") if "semester" in self.request.query_params else [-1]
        cred_regex = r""
        structural_unit_id = [int(x) for x in structural_unit_id]
        print(structural_unit_id)
        for i in range(12):
            if str(i + 1) in semester:
                cred_regex += "[^0]\.[0-9],\s"
            else:
                cred_regex += "(([0-9]\.[0-9])|[0]),\s"
        cred_regex = cred_regex[:-3]
        print(cred_regex)
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
        return needed_wp


class OneAcademicPlanWithDescriptionWp(generics.RetrieveAPIView):
    """
    Получение конкретного учебного плана по его id со всеми описаниями РПД
    """
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlansDescriptionWpSerializer
    permission_classes = [AllowAny]


class AllAcademicPlanWithDescriptionWp(generics.ListAPIView):
    """
    Получение всех учебных планов со всеми описаниями РПД
    """
    queryset = AcademicPlan.objects.all()
    serializer_class = AcademicPlansDescriptionWpSerializer
    permission_classes = [AllowAny]


class GetPrerequisitesAndOutcomesOfWpByStrUP(generics.RetrieveAPIView):
    """
    Получение пререквизитов и результатов РПД по СТР_УП_ИД
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramPrerequisitesAndOutcomesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk=self.kwargs['pk']
        return WorkProgram.objects.filter(zuns_for_wp__zuns_for_wp__id_str_up=pk)
    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset)
        self.check_object_permissions(self.request, obj)
        return obj
