from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response

from workprogramsapp.bars_merge.bars_api_getter import get_educational_program_main, get_disciplines, \
    get_one_educational_program, get_list_of_regular_checkpoints, get_list_of_final_checkpoints, post_checkpoint_plan
from workprogramsapp.bars_merge.checkpoint_template import generate_checkpoint, get_checkpoints_type, \
    generate_discipline, generate_checkpoint_plan, generate_fos
from workprogramsapp.bars_merge.models import BarsEPAssociate, BarsWorkProgramsAssociate
from workprogramsapp.bars_merge.serializers import BarsEPAssociateSerializer, BarsWorkProgramsAssociateSerializer
from workprogramsapp.models import WorkProgram, FieldOfStudy, ImplementationAcademicPlan, EvaluationTool, \
    DisciplineSection, WorkProgramChangeInDisciplineBlockModule, WorkProgramInFieldOfStudy, СertificationEvaluationTool, \
    AcademicPlan


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def FindSimilarEP(request):
    # Достаем из АПИ БАРС 2.0 Все ОП
    ep = get_educational_program_main()
    list_of_new_bars_ep = []

    # Проходимся по полученным ОП
    for program in ep:
        # Если такой ОП нету в нашем сервисе, создаем новую
        if not BarsEPAssociate.objects.filter(bars_id=program["id"]):
            try:
                field_of_study = list(ImplementationAcademicPlan.objects.filter(
                    field_of_study__number=program["code"][:program["code"].rfind(".")]))
                new_bars_ep = BarsEPAssociate(bars_id=program["id"])
                new_bars_ep.save()
                new_bars_ep.base_field_of_study.add(*field_of_study)
                list_of_new_bars_ep.append(new_bars_ep)
            except FieldOfStudy.DoesNotExist:
                pass
    serializer = BarsEPAssociateSerializer(list_of_new_bars_ep, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def FindSimilarWP(request):
    # Достаем из АПИ БАРС 2.0 Все РПД
    wp = get_disciplines()
    wp_db = []
    for program in wp:
        if not BarsWorkProgramsAssociate.objects.filter(bars_id=program["id"]):
            wp_to_append = list(WorkProgram.objects.filter(title=program["name"]))
            if wp_to_append:
                wp_object = BarsWorkProgramsAssociate(bars_id=program["id"], term=program["term"])
                wp_object.save()
                wp_object.base_work_programs.add(*wp_to_append)
                wp_db.append(wp_object)
    serializer = BarsWorkProgramsAssociateSerializer(wp_db, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def CreateCheckPoint(request):
    # TODO: УБРАТЬ ХАРДКОДИНГ
    work_program_id = request.data.get('work_program_id')
    field_of_study_id = request.data.get('field_of_study_id')
    term = request.data.get('term')

    # Переменные для формирования запроса к БАРС
    point_distribution = 0
    bars_id = WorkProgram.objects.get(
        id=work_program_id).wp_isu_id
    types_checkpoints = get_list_of_regular_checkpoints()  # Список оценочных средств в БАРСе
    list_regular = []
    has_course_project = False
    course_project = None
    final_checkpoint = None
    discipline = None
    extra_points = True if WorkProgram.objects.get(id=work_program_id).extra_points else False
    field_of_study = FieldOfStudy.objects.get(id=field_of_study_id)

    # Получение дисцплины из направления
    wp_in_change = WorkProgramChangeInDisciplineBlockModule.objects.filter(work_program=work_program_id,
                    discipline_block_module__descipline_block__academic_plan__field_of_study=field_of_study).distinct()
    wp_in_change = wp_in_change[0]

    """
    Пока названия имен в Конструкторе РПД не совпадают с именами в БАРСе этот код не имеет смысла, 
    заменяется тем что ниже
    
    educational_bars_id = WorkProgramInFieldOfStudy.objects.filter(
        work_program_change_in_discipline_block_module=wp_in_change)[0].id_str_up
    """

    # Поиск информции об образовательной программе в барсе, получение ее таблицы
    programs = []
    bars_education = get_one_educational_program(bars_id, term)
    for educ in bars_education:
        if educ["code"] == field_of_study.number + ".":
            programs = educ

    # Поиск относительного семестра из переданного абсолютного
    semesters = str(wp_in_change.credit_units).split(",")
    needed_semester = -1
    count = 1
    for i, el in enumerate(semesters):
        if int(el) > 0:
            if i + 1 == term:
                needed_semester = count
                break
            count += 1

    # Поиск оценочных средства для семетра, а также нахождение БАРСовских типов оценочных срелств
    evaluation_tools = EvaluationTool.objects.filter(evaluation_tools__in=DisciplineSection.objects.filter(
        work_program__id=work_program_id)).distinct().filter(semester=needed_semester)
    for eva in evaluation_tools:
        for el in types_checkpoints:
            if el["name"] == eva.type:
                id = el["id"]
        list_regular.append(
            generate_checkpoint(name=eva.name, min=eva.min, max=eva.max, week=int(eva.deadline), type_id=id,
                                key=eva.check_point))
    certificate = СertificationEvaluationTool.objects.filter(work_program=work_program_id, semester=needed_semester)
    for cerf in certificate:
        if int(cerf.type) == 4:
            has_course_project = True
            course_project = generate_checkpoint(name=cerf.name, min=cerf.min, max=cerf.max, week=None, type_id=id,
                                                 key=True)
        else:
            point_distribution = 100 - cerf.max
            final_checkpoint = generate_checkpoint(name=cerf.name, min=cerf.min, max=cerf.max, week=None,
                                                   type_id=get_checkpoints_type(int(cerf.type)), key=True)

    discipline = generate_discipline(bars_id=bars_id, name=WorkProgram.objects.get(id=work_program_id).title, term=term,
                                     course_project=has_course_project)
    print(programs)
    checkpoint_plan = generate_checkpoint_plan(regular_checkpoint=list_regular, programs=programs,
                                               discipline=discipline,
                                               final_checkpoint=final_checkpoint,
                                               course_project_checkpoint=course_project,
                                               term=term, point_distribution=point_distribution,
                                               additional_points=extra_points,
                                               alternate_methods=False, has_course_project=has_course_project)
    print(post_checkpoint_plan(checkpoint_plan))
    return Response(checkpoint_plan)
