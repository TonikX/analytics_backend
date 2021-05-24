from workprogramsapp.bars_merge.bars_api_getter import get_list_of_regular_checkpoints
from workprogramsapp.bars_merge.checkpoint_template import generate_checkpoint, get_checkpoints_type, \
    generate_discipline, generate_checkpoint_plan
from workprogramsapp.models import EvaluationTool, DisciplineSection, СertificationEvaluationTool


def generate_single_checkpoint(work_program, absolute_semester, relative_semester, programs, setup):
    # Переменные для формирования запроса к БАРС
    list_regular = []
    extra_points = True if work_program.extra_points else False
    work_program_id = work_program.id
    types_checkpoints = get_list_of_regular_checkpoints(setup)
    has_course_project = False
    course_project = None
    final_checkpoint = None
    point_distribution = 0

    evaluation_tools = EvaluationTool.objects.filter(evaluation_tools__in=DisciplineSection.objects.filter(
        work_program__id=work_program_id)).distinct().filter(semester=relative_semester)
    for eva in evaluation_tools:
        for el in types_checkpoints:
            if el["name"] == eva.type:
                id = el["id"]
        list_regular.append(
            generate_checkpoint(name=eva.name, min=eva.min, max=eva.max, week=int(eva.deadline), type_id=id,
                                key=eva.check_point))
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
    discipline = generate_discipline(bars_id=work_program.wp_isu_id, name=work_program.title, term=absolute_semester,
                                     course_project=has_course_project)
    checkpoint_plan = generate_checkpoint_plan(regular_checkpoint=list_regular, programs=programs,
                                               discipline=discipline,
                                               final_checkpoint=final_checkpoint,
                                               course_project_checkpoint=course_project,
                                               term=absolute_semester, point_distribution=point_distribution,
                                               additional_points=extra_points,
                                               alternate_methods=False, has_course_project=has_course_project)
    return checkpoint_plan
