from workprogramsapp.bars_merge.bars_api_getter import get_tests, post_tests
from workprogramsapp.bars_merge.checkpoint_template import generate_checkpoint, get_checkpoints_type, \
    generate_discipline, generate_checkpoint_plan, generate_test
from workprogramsapp.bars_merge.checkpoints_dict import checkpoint_correspondence
from workprogramsapp.models import EvaluationTool, DisciplineSection, СertificationEvaluationTool


def generate_single_checkpoint(work_program, absolute_semester, relative_semester, programs, setup, wp_isu_id,
                               types_checkpoints):
    # Переменные для формирования запроса к БАРС
    list_regular = []
    extra_points = False if work_program.extra_points == "0" or not work_program.extra_points else True
    work_program_id = work_program.id
    has_course_project = False
    course_project = None
    final_checkpoint = None
    point_distribution = 0

    evaluation_tools = EvaluationTool.objects.filter(evaluation_tools__in=DisciplineSection.objects.filter(
        work_program__id=work_program_id)).distinct().filter(semester=relative_semester)
    for eva in evaluation_tools:
        id = None
        test_id = -1
        checkpoint_name = None
        if eva.type in checkpoint_correspondence:
            checkpoint_name = eva.type
        else:
            for key, value in checkpoint_correspondence.items():
                if eva.type in value:
                    checkpoint_name = key
                    break
        for el in types_checkpoints:
            if el["name"] == checkpoint_name:
                id = el["id"]
                if el["name"] == "Электронное тестирование в ЦДО":
                    test_list = get_tests(setup)
                    for test in test_list:
                        if test['name'] == eva.name:
                            test_id = test['id']
                    if test_id == -1:
                        body = generate_test(term=absolute_semester, year=setup[0], name=eva.name)
                        test_id = post_tests(setup=setup, body=body)["id"]
        list_regular.append(
            generate_checkpoint(name=eva.name, min=eva.min, max=eva.max, week=int(eva.deadline), type_id=id,
                                key=eva.check_point, test_id=test_id))
    certificate = СertificationEvaluationTool.objects.filter(work_program=work_program_id, semester=relative_semester)
    for cerf in certificate:
        if int(cerf.type) == 4:
            has_course_project = True
            course_project = generate_checkpoint(name=cerf.name, min=cerf.min, max=cerf.max, week=None, type_id=id,
                                                 key=True)
        else:
            point_distribution = 100 - cerf.max
            final_checkpoint = generate_checkpoint(name=cerf.name, min=cerf.min, max=cerf.max, week=None,
                                                   type_id=get_checkpoints_type(int(cerf.type)), key=True)
    discipline = generate_discipline(bars_id=wp_isu_id, name=work_program.title, term=absolute_semester,
                                     course_project=has_course_project)
    checkpoint_plan = generate_checkpoint_plan(regular_checkpoint=list_regular, programs=programs,
                                               discipline=discipline,
                                               final_checkpoint=final_checkpoint,
                                               course_project_checkpoint=course_project,
                                               term=absolute_semester, point_distribution=point_distribution,
                                               additional_points=extra_points,
                                               alternate_methods=False, has_course_project=has_course_project)
    return checkpoint_plan
