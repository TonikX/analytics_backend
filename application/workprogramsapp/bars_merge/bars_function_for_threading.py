from datetime import datetime

from workprogramsapp.bars_merge.bars_api_getter import get_tests, post_tests, post_checkpoint_plan
from workprogramsapp.bars_merge.checkpoint_template import generate_checkpoint, get_checkpoints_type, \
    generate_discipline, generate_checkpoint_plan, generate_test, generate_fos
from workprogramsapp.bars_merge.checkpoints_dict import checkpoint_correspondence
from workprogramsapp.bars_merge.models import HistoryOfSendingToBars
from workprogramsapp.models import EvaluationTool, DisciplineSection, СertificationEvaluationTool, FieldOfStudy, \
    WorkProgramIdStrUpForIsu, ImplementationAcademicPlan


def generate_single_checkpoint(work_program, absolute_semester, relative_semester, programs, setup, wp_isu_id,
                               types_checkpoints):
    # Переменные для формирования запроса к БАРС
    list_regular = []  # Список контрольных точек
    extra_points = False if work_program.extra_points == "0" or not work_program.extra_points else True  # 3 доп. балла
    work_program_id = work_program.id  # id РПД в явном виде
    has_course_project = False  # Переменная, отвечающая за наличие курсового проекта
    course_project = None  # Объект курсового проекта
    final_checkpoint = None  # объект ОС ПА
    point_distribution = 0  # Сколько баллов уходит на оценочные средства

    # Получаем обычные оценочные средства
    evaluation_tools = EvaluationTool.objects.filter(evaluation_tools__in=DisciplineSection.objects.filter(
        work_program__id=work_program_id)).distinct().filter(semester=relative_semester)

    for eva in evaluation_tools:
        # Приводим старые типы чекпоинтов к новому виду (см. checkpoint_dict.py)
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

        # В фуккцию был передан список типов чекпоинтов из БАРСА (types_checkpoints), мы пытаемся теперь достать его id
        for el in types_checkpoints:
            if el["name"] == checkpoint_name:
                id = el["id"]

                # Отдельно рассматриваем кейс электронного тестирования в ЦДО - нам нужно прикрепить тест к чекпионту
                if el["name"] == "Электронное тестирование в ЦДО":
                    # Получаем тесты за  текущий год+семестр
                    test_list = get_tests(setup)

                    for test in test_list:
                        # Пытаемся найти существующий тест, соответсвующий семестру
                        if (test['name'] == eva.name) and (test["term"] == absolute_semester):
                            test_id = test['id']
                            break
                    # Если не нашли, то создаем сами
                    if test_id == -1:
                        body = generate_test(term=absolute_semester, year=setup[0], name=eva.name)
                        test_id = post_tests(setup=setup, body=body)["id"]
        # После всех процедур, добавляем в список регулярный ОС новую сгенерированную ОС из полученных параметров
        list_regular.append(
            generate_checkpoint(name=eva.name, min=eva.min, max=eva.max, week=int(eva.deadline), type_id=id,
                                key=eva.check_point, test_id=test_id))
    # Получаем все ОС ПА
    certificate = СertificationEvaluationTool.objects.filter(work_program=work_program_id, semester=relative_semester)
    for cerf in certificate:
        # Отдельно обрабатываем случай наличия курсовика
        if int(cerf.type) == 4:
            has_course_project = True
            course_project = generate_checkpoint(name=cerf.name, min=cerf.min, max=cerf.max, week=None, type_id=id,
                                                 key=False)
        else:
            point_distribution = 100 - cerf.max
            final_checkpoint = generate_checkpoint(name=cerf.name, min=cerf.min, max=cerf.max, week=None,
                                                   type_id=get_checkpoints_type(int(cerf.type)), key=False)
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


def bars_optimizer(now_semester, count_relative, imp_list, work_program, setup_bars, isu_wp_id, types_checkpoints):
    request_text = generate_single_checkpoint(absolute_semester=now_semester + 1,
                                              relative_semester=count_relative,
                                              programs=imp_list,
                                              work_program=work_program, setup=setup_bars,
                                              wp_isu_id=isu_wp_id, types_checkpoints=types_checkpoints)
    request_response, request_status_code = post_checkpoint_plan(request_text, setup_bars)
    print(request_status_code, request_response, work_program, work_program.id, now_semester)
    """if request_status_code != 200:
        #  если почему-то не отправилось продублируем респонс в терминал
        print(request_text, request_response)"""
    # Пишем логи
    HistoryOfSendingToBars.objects.create(work_program=work_program, request_text=request_text,
                                          request_response=request_response,
                                          request_status=request_status_code)


"""def bars_threading_optimize(work_program, send_semester, setup_bars, types_checkpoints):
    relative_bool = True  # Длится ли дисциплина дольше чем один семестр
    count_relative = 1  # Счетчик относительных семестров

    # Проверка для булевой переменной, идет ли дисциплина в нескольких семестрах
    evaluation_tools = EvaluationTool.objects.filter(evaluation_tools__in=DisciplineSection.objects.filter(
        work_program__id=work_program.id))
    min_sem = 12
    max_sem = 1
    for eva in evaluation_tools:
        if eva.semester == None:
            break
        if eva.semester < min_sem:
            min_sem = eva.semester
        if eva.semester > max_sem:
            max_sem = eva.semester
    if max_sem != min_sem:
        relative_bool = False

    # Блок отвечающий за поиск оценочных средств в семестре
    for now_semester in range(0, 12):  # Цикл по семестрам
        imp_list = []  # Список всех учебных планов для этого семестра
        # Создание реуглярного выражения для того чтобы отфильтровать УП и инфу о РПД за этот семестр в цикле
        cred_regex = r""
        for i in range(12):
            if i == now_semester:
                cred_regex += "[^0]\.[0-9],\s"
            else:
                cred_regex += "(([0-9]\.[0-9])|[0]),\s"
        cred_regex = cred_regex[:-3]

        # Получаем все УП для данного семестра РПД (нужно для каунтера отнсительного семестра)
        implementation_of_academic_plan_all = ImplementationAcademicPlan.objects.filter(
            academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program=work_program,
            academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__zuns_for_cb__zuns_for_wp__ze_v_sem__iregex=cred_regex).distinct()
        # Список УП с учетом актуального семестра отправки в БАРС
        implementation_of_academic_plan = implementation_of_academic_plan_all.filter(
            year=datetime.now().year - now_semester // 2)
        isu_wp_id = None
        for imp in implementation_of_academic_plan:
            # создаем список направлений + уп с айдишниками ИСУ для БАРСа
            field_of_studies = FieldOfStudy.objects.get(
                implementation_academic_plan_in_field_of_study=imp)
            imp_list.append(generate_fos(imp.ns_id, field_of_studies.number, imp.title))
            isu_wp = \
                list(WorkProgramIdStrUpForIsu.objects.filter(
                    work_program_in_field_of_study__work_program=work_program,
                    work_program_in_field_of_study__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study=imp))[
                    0]
            isu_wp_id = isu_wp.dis_id

        imp_list = list({v['id']: v for v in imp_list}.values())  # Оставляем уникальные значения по айдишникам

        if imp_list and now_semester % 2 == send_semester:  # Если такой существует и соотвествует весне/осени (
            # Генерируем чекпоинт со всеми УП, прямыми и относиетльным семестром

            request_text = generate_single_checkpoint(absolute_semester=now_semester + 1,
                                                      relative_semester=count_relative,
                                                      programs=imp_list,
                                                      work_program=work_program, setup=setup_bars,
                                                      wp_isu_id=isu_wp_id, types_checkpoints=types_checkpoints)
            isu_wp = None
            isu_wp_id = None
            # Получаем вернувшуюся информацию
            # print(request_text)
            request_response, request_status_code = post_checkpoint_plan(request_text, setup_bars)
            print(request_status_code, request_response, work_program, work_program.id, now_semester)
            if request_status_code != 200:
                pass
                #  если почему-то не отправилось продублируем респонс в терминал
                #print(request_text, request_response)
            # Пишем логи
            HistoryOfSendingToBars.objects.create(work_program=work_program, request_text=request_text,
                                                  request_response=request_response,
                                                  request_status=request_status_code)
        # Если дисциплина длинной несколько семестров, то добавляем плюсик к счетчику относительного семестра
        if implementation_of_academic_plan_all and not relative_bool:
            count_relative += 1
"""
