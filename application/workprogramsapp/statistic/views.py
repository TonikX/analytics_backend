from django.db.models.aggregates import Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from dataprocessing.models import User
from workprogramsapp.expertise.models import Expertise
from workprogramsapp.models import WorkProgram, WorkProgramInFieldOfStudy, AcademicPlan, DisciplineBlock, \
    DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, ImplementationAcademicPlan, FieldOfStudy, \
    СertificationEvaluationTool
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


@api_view(['GET'])
@permission_classes((AllowAny,))
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
    all_imp = all_imp[from_len:end_len]
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
                                {
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
        # print(serializer.data)
    print(len(implementation_list))
    print(ImplementationAcademicPlan.objects.all().count())
    return Response(implementation_list)
