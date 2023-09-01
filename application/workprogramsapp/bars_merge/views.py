import threading
from datetime import datetime, date

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from workprogramsapp.bars_merge.bars_api_getter import get_educational_program_main, get_disciplines, \
    get_one_educational_program, get_list_of_regular_checkpoints, post_checkpoint_plan
from workprogramsapp.bars_merge.bars_function_for_threading import generate_single_checkpoint, \
    academicNTCheckpointGenerator
from workprogramsapp.bars_merge.checkpoint_template import generate_checkpoint, get_checkpoints_type, \
    generate_discipline, generate_checkpoint_plan, generate_fos, generate_checkpoint_new
from workprogramsapp.bars_merge.checkpoints_dict import checkpoint_correspondence
from workprogramsapp.bars_merge.models import BarsEPAssociate, BarsWorkProgramsAssociate, HistoryOfSendingToBars, \
    AcceptedBarsInWp
from workprogramsapp.bars_merge.serializers import BarsEPAssociateSerializer, BarsWorkProgramsAssociateSerializer, \
    HistoryOfSendingBarsSerializer
from workprogramsapp.expertise.models import Expertise
from workprogramsapp.models import WorkProgram, FieldOfStudy, ImplementationAcademicPlan, EvaluationTool, \
    DisciplineSection, WorkProgramChangeInDisciplineBlockModule, СertificationEvaluationTool, \
    WorkProgramIdStrUpForIsu
from workprogramsapp.permissions import IsExternalUser


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
    checkpoint_plan = generate_checkpoint_plan(regular_checkpoint=list_regular, programs=programs,
                                               discipline=discipline,
                                               final_checkpoint=final_checkpoint,
                                               course_project_checkpoint=course_project,
                                               term=term, point_distribution=point_distribution,
                                               additional_points=extra_points,
                                               alternate_methods=False, has_course_project=has_course_project)
    return Response(checkpoint_plan)


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def SendCheckpointsForAcceptedWP(request):
    """
    Отправка всех прошедших экспертизу РПД, в БАРС
    Параметры:
    year : Поле вида 'YYYY/YYYY', указывает учебный год в который надо отправить РПД [str]
    send_semester : 1 - семетр осенний, 0 - семестр весенний [int]
    one_wp: необязательное поле, указывается id одной РПД для отправки в БАРС
    """
    year = request.data.get('year')
    send_semester = request.data.get('send_semester')
    one_wp = request.data.get('one_wp')
    setup_bars = (year, send_semester)  # Устанавливает корректную дату и семестр в барсе (аргумент для БАРС-функций)
    year_of_sending = setup_bars[0].split("/")[0]
    # небольшой костыль из-за некоторых ньюансов (цикл семестров начинается с 0)
    types_checkpoints = get_list_of_regular_checkpoints(setup_bars)  # получаем список типов чекпоинтов из БАРС
    if send_semester == 0:
        send_semester = 1
    else:
        send_semester = 0
    # Список уже отправленных РПД
    just_accepted_wp = []
    # Отсылаем ли мы одну дисципилну или же все с пометкой "отправить в барс"
    if not one_wp:
        needed_wp = WorkProgram.objects.filter(expertise_with_rpd__expertise_status__contains='AC',
                                               bars=True).distinct()
        just_accepted_wp = WorkProgram.objects.filter(accepted_wp_in_bars__year_of_study=setup_bars[0],
                                                      accepted_wp_in_bars__semester_of_sending=setup_bars[1]).distinct()
    else:
        needed_wp = WorkProgram.objects.filter(pk=one_wp)
    all_sends = []  # Список всего того что отправили в барс, нужен для респонса

    for work_program in needed_wp:  # для каждой РПД формируем отдельный запрос в БАРС
        if work_program in just_accepted_wp:
            # Если РПД уже отправлена в этом учебном семестре, то игнорируем
            continue
        relative_bool = True  # Длится ли дисциплина дольше чем один семестр
        # count_relative = 1  # Счетчик относительных семестров

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

        wp_for_many_terms_list = [14928, 14929, 14930, 14931, 14932, 14933, 14934, 14922, 14923, 14924, 14925, 14926,
                                  14927, 14935, 14936,
                                  14937, 14938, 14939, 14940, 15720, 14941, 14942, 14943, 14946, 14947, 14948, 14949,
                                  14950, 14951,
                                  14953, 14954, 14963, 14955, 14956, 14957, 14958, 14959, 14960, 14961, 14962, 15441,
                                  15924, 15944, 15947,
                                  15937, 15941, 15926, 15939, 15917, 15925, 15932, 15921, 15922, 15940, 15943, 15933,
                                  15935, 15948, 15938, 15919,
                                  15929, 15930, 15934, 15936, 15949, 15923, 15931, 15920, 15945, 15918, 15928, 15927,
                                  15946, 15942, 15676, 15704,
                                  15950, 15951, 15952, 15106]
        isu_bank_many_term = ['14350', '21565', '21617', '14344', '9210', '21610', '29635', '21584', '21558', '29648',
                              '29636', '21606', '21562', '21614', '29639', '14359', '21579', '29624', '29631', '21592',
                              '29615', '29646', '29642', '29649', '29923', '21556', '21616', '29625', '29622', '29651',
                              '29656', '29647', '29652', '21599', '21576', '29654', '21596', '21587', '29634', '29630',
                              '29621', '29617', '21555', '21585', '29643', '29632', '21593', '29657', '29629', '14352',
                              '21589', '21597', '29616', '21603', '29637', '21613', '21564', '21608', '21611', '21553',
                              '14351', '29658', '21612', '21575', '32043', '29641', '21580', '29628', '21609', '21554',
                              '21586', '21559', '29613', '21583', '29655', '21619', '21595', '29612', '14348', '9268',
                              '21566', '21561', '29667', '29614', '29650', '29640', '29611', '29653', '21549', '29659',
                              '21618', '21578', '29626', '29618', '14357', '29620', '21600', '21560', '21557', '29633',
                              '29627', '9279', '21552', '21563', '29623', '21607', '21620', '21594', '29668', '21577',
                              '21602', '32044', '29638', '21615']

        minimal_sem_for_many_term = 0
        maximal_sem_for_many_term = 0
        isu_wp_id_for_many_term = None
        imp_list_for_many_term = []
        # Блок отвечающий за поиск оценочных средств в семестре
        for now_semester in range(0, 12):  # Цикл по семестрам\
            imp_list = []  # Список всех учебных планов для этого семестра
            # Создание реуглярного выражения для того чтобы отфильтровать УП и инфу о РПД за этот семестр в цикле
            cred_regex = r""
            end_term = now_semester + max_sem if now_semester + max_sem < 12 else 12
            for i in range(12):
                if now_semester <= i < end_term:
                    cred_regex += "(([^0]\.[0-9])|([^0])),\s"
                else:
                    cred_regex += "(([0-9]\.[0-9])|[0-9]),\s"
            cred_regex = cred_regex[:-3]

            #######################################################

            # Если РПД является общеуниверситеским факультативом
            if work_program.id in wp_for_many_terms_list or work_program.discipline_code in isu_bank_many_term:
                many_term_regex = r""
                for i in range(12):
                    if i == now_semester:
                        many_term_regex += "(([^0]\.[0-9])|([^0])),\s"
                    else:
                        many_term_regex += "(([0-9]\.[0-9])|[0-9]),\s"
                many_term_regex = many_term_regex[:-3]
                implementation_of_academic_plan_all = ImplementationAcademicPlan.objects.filter(
                    academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program=work_program,
                    academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__zuns_for_cb__zuns_for_wp__ze_v_sem__iregex=many_term_regex).distinct()
                implementation_of_academic_plan = implementation_of_academic_plan_all.filter(
                    year=int(year_of_sending) - now_semester // 2)
                # id isu
                try:
                    isu_wp_id = int(work_program.discipline_code)
                except ValueError:
                    isu_wp_id = None
                except TypeError:
                    isu_wp_id = None

                for imp in implementation_of_academic_plan:
                    # создаем список направлений + уп с айдишниками ИСУ для БАРСа
                    field_of_studies = FieldOfStudy.objects.filter(
                        implementation_academic_plan_in_field_of_study=imp)
                    for fos in field_of_studies:
                        imp_list.append(generate_fos(imp.ns_id, fos.number, imp.title))
                    """isu_wp = \
                        list(WorkProgramIdStrUpForIsu.objects.filter(
                            work_program_in_field_of_study__work_program=work_program,
                            work_program_in_field_of_study__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study=imp))[
                            0]
                    isu_wp_id = isu_wp.dis_id"""
                imp_list_for_many_term.extend(imp_list)
                imp_list_for_many_term = list({v['id']: v for v in imp_list_for_many_term}.values())
                # imp_list = list({v['id']: v for v in imp_list}.values())
                if isu_wp_id and not isu_wp_id_for_many_term:
                    isu_wp_id_for_many_term = isu_wp_id
                if imp_list and minimal_sem_for_many_term == 0:
                    minimal_sem_for_many_term = now_semester + 1
                if imp_list:
                    maximal_sem_for_many_term = now_semester + 1
                #######################################################

            # Получаем все УП для данного семестра РПД (нужно для каунтера отнсительного семестра)
            implementation_of_academic_plan_all = ImplementationAcademicPlan.objects.filter(
                academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program=work_program,
                academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__zuns_for_cb__zuns_for_wp__ze_v_sem__iregex=cred_regex).distinct()
            # Список УП с учетом актуального семестра отправки в БАРС
            for count_relative in range(0, max_sem):
                if work_program.id in wp_for_many_terms_list:
                    break

                current_term = now_semester + count_relative
                if current_term % 2 != send_semester:
                    continue

                implementation_of_academic_plan = implementation_of_academic_plan_all.filter(
                    year=int(year_of_sending) - current_term // 2)
                # id isu
                try:
                    isu_wp_id = int(work_program.discipline_code)
                except ValueError:
                    isu_wp_id = None
                except TypeError:
                    isu_wp_id = None

                for imp in implementation_of_academic_plan:
                    # создаем список направлений + уп с айдишниками ИСУ для БАРСа
                    try:
                        field_of_studies = FieldOfStudy.objects.filter(
                            implementation_academic_plan_in_field_of_study=imp)
                        for fos in field_of_studies:
                            imp_list.append(generate_fos(imp.ns_id, fos.number, imp.title))
                        """isu_wp = \
                            list(WorkProgramIdStrUpForIsu.objects.filter(
                                work_program_in_field_of_study__work_program=work_program,
                                work_program_in_field_of_study__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study=imp))[
                                0]
                        isu_wp_id = isu_wp.dis_id"""
                    except FieldOfStudy.DoesNotExist:
                        pass

                imp_list = list({v['id']: v for v in imp_list}.values())  # Оставляем уникальные значения по айдишникам
                print(current_term, imp_list)
                # Трагичные Факультативы и прочая гадость собирается в общий ком из УП и в отдельном блоке кода отправляется

                # Если существует список УП, соответствует текущему семестру и не является специальной РПД
                if imp_list and isu_wp_id and current_term % 2 == send_semester \
                        and not (
                        work_program.id in wp_for_many_terms_list or work_program.discipline_code in isu_bank_many_term):
                    # Генерируем чекпоинт со всеми УП, прямыми и относиетльным семестром

                    request_text = generate_single_checkpoint(absolute_semester=current_term + 1,
                                                              relative_semester=count_relative + 1,
                                                              programs=imp_list,
                                                              work_program=work_program, setup=setup_bars,
                                                              wp_isu_id=isu_wp_id, types_checkpoints=types_checkpoints)
                    isu_wp = None
                    isu_wp_id = None
                    # Получаем вернувшуюся информацию
                    # print(request_text)
                    request_response, request_status_code = post_checkpoint_plan(request_text, setup_bars)
                    if request_status_code != 200:
                        #  если почему-то не отправилось продублируем респонс в терминал
                        print(request_text, request_response)
                    else:
                        # Если РПД отправилась со статусом 200, то записываем ее в отправленные
                        AcceptedBarsInWp.objects.get_or_create(work_program=work_program,
                                                               year_of_study=setup_bars[0]
                                                               , semester_of_sending=setup_bars[1])
                    # Пишем логи
                    HistoryOfSendingToBars.objects.create(work_program=work_program, request_text=request_text,
                                                          request_response=request_response,
                                                          request_status=request_status_code)

                    all_sends.append(
                        {"status": request_status_code, "request": request_text, "response": request_response})

        # Выход из цикла по семестрам
        # Если РПД "особая" (реализуется в нескольких семестрах одновременно (как факультативы))
        if (
                work_program.id in wp_for_many_terms_list or work_program.discipline_code in isu_bank_many_term) and minimal_sem_for_many_term != 0:
            if not relative_bool:
                count_relative = send_semester + 1
                absolute_semester = send_semester + 1

            else:
                count_relative = 1
                absolute_semester = minimal_sem_for_many_term
            request_text = generate_single_checkpoint(absolute_semester=absolute_semester,
                                                      relative_semester=count_relative,
                                                      programs=imp_list_for_many_term,
                                                      work_program=work_program, setup=setup_bars,
                                                      wp_isu_id=isu_wp_id_for_many_term,
                                                      types_checkpoints=types_checkpoints)
            request_text["terms"] = [i for i in range(minimal_sem_for_many_term, maximal_sem_for_many_term + 1)]

            request_response, request_status_code = post_checkpoint_plan(request_text, setup_bars)
            print(request_text)
            if request_status_code != 200:
                #  если почему-то не отправилось продублируем респонс в терминал
                print(request_text, request_response)
            else:
                # Если РПД отправилась со статусом 200, то записываем ее в отправленные
                AcceptedBarsInWp.objects.get_or_create(work_program=work_program,
                                                       year_of_study=setup_bars[0]
                                                       , semester_of_sending=setup_bars[1])
            # Пишем логи
            HistoryOfSendingToBars.objects.create(work_program=work_program, request_text=request_text,
                                                  request_response=request_response,
                                                  request_status=request_status_code)

            all_sends.append(
                {"status": request_status_code, "request": request_text, "response": request_response})
    return Response(all_sends)


@api_view(['POST'])
@permission_classes((IsExternalUser,))
def postAcademicNTCheckpoints(request):
    """
        Отправка всех прошедших экспертизу РПД в ЦДО
        Параметры:
        year : Поле вида 'YYYY/YYYY', указывает учебный год в который надо отправить РПД [str]
        from_date: поле вида "DD.MM.YYYY", обознает отсчет с даты принятия на экспертизу РПД
    """
    year = request.data.get('year')
    send_semester = request.data.get('send_semester')
    from_date = request.data.get('from_date')
    setup_bars = (year, -1)
    if send_semester == 0:
        send_semester = 1
    else:
        send_semester = 0
    date_split = from_date.split(".")
    needed_wp = WorkProgram.objects.filter(expertise_with_rpd__expertise_status__contains='AC',
                                           expertise_with_rpd__date_of_last_change__gte=date(year=int(date_split[2]),
                                                                                             month=int(date_split[1]),
                                                                                             day=int(date_split[
                                                                                                         0]))).distinct()
    all_sends = []  # Список всего того что отправили в барс, нужен для респонса
    for work_program in needed_wp:  # для каждой РПД формируем отдельный запрос в БАРС
        all_sends.extend(academicNTCheckpointGenerator(work_program=work_program, send_semester=send_semester,
                                                       setup_bars=setup_bars))
    return Response({"rpd": all_sends})


class BarsHistoryListView(generics.ListAPIView):
    queryset = HistoryOfSendingToBars.objects.all()
    serializer_class = HistoryOfSendingBarsSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['date_of_sending', 'work_program', "request_status"]
    search_fields = ["date_of_sending", "work_program", "request_status"]
    permission_classes = [IsAdminUser]


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def AddAcceptedWpToTableForAcceptedWp(request):
    try:
        status_filter = request.data.get("code_for_execute")
    except KeyError:
        return Response("Введите ключевое слово, чтобы выполнить запрос")
    if status_filter == "superkick":
        for wp in WorkProgram.objects.filter(wp_in_send_history__request_status=200).distinct():
            AcceptedBarsInWp.objects.create(work_program=wp, year_of_study="2021/2022", semester_of_sending=1)
        return Response("Надеюсь, ничего не сломалось")
    else:
        return Response("Неправильное ключевое слово")


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def SetBarsPointerTrueToWP(request):
    for semester in range(0, 4):
        cred_regex = r""
        for i in range(12):
            if i == semester:
                cred_regex += "[^0]\.[0-9],\s"
            else:
                cred_regex += "(([0-9]\.[0-9])|[0]),\s"
        cred_regex = cred_regex[:-3]
        wp = WorkProgram.objects.filter(zuns_for_wp__zuns_for_wp__ze_v_sem__iregex=cred_regex,
                                        expertise_with_rpd__expertise_status__contains='AC',
                                        zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__descipline_block__academic_plan__academic_plan_in_field_of_study__qualification="bachelor").distinct()
        wp.update(bars=True)
    return Response("Надеюсь, ничего не сломалось")


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def GetWPForBARS(request, isu_wp_id):
    """
    Передача конкретной РПД по айдишнику в БАРС
    """
    wp = WorkProgram.objects.get(discipline_code=str(isu_wp_id))
    try:
        exp = Expertise.objects.get(work_program=wp)
        expertise_status_name = exp.get_expertise_status_display()
        expertise_short_name = exp.expertise_status
    except Expertise.DoesNotExist:
        expertise_status_name = "В работе"
        expertise_short_name = "WK"
    wp_dict = {"id": wp.id,
               "isu_id": int(wp.discipline_code),
               "name": wp.title,
               "additional_points": False if wp.extra_points == "0" or not wp.extra_points else True,
               "expertise_status_name": expertise_status_name,
               "expertise_short_name": expertise_short_name,
               "terms": [],
               "bars": wp.bars}
    for sem in range(wp.number_of_semesters):
        term_dict = {"relative_term": sem + 1, "regular_checkpoints": [], "final_checkpoint": None,
                     "course_project_checkpoint": None, "point_distribution": None}
        evaluation_tools = EvaluationTool.objects.filter(evaluation_tools__work_program__id=wp.id,
                                                         semester=sem + 1).distinct()

        certificate = СertificationEvaluationTool.objects.filter(work_program__id=wp.id,
                                                                 semester=sem + 1)
        print(evaluation_tools)
        for cerf in certificate:
            # Отдельно обрабатываем случай наличия курсовика
            if int(cerf.type) == 4 or int(cerf.type) == 5:
                course_project = generate_checkpoint_new(name=cerf.name, min=cerf.min, max=cerf.max, week=None,
                                                         type_name="Курсовая Работа",
                                                         key=False)
                term_dict["course_project_checkpoint"] = course_project
            else:
                try:
                    point_distribution = 100 - cerf.max
                except TypeError:
                    point_distribution = None
                final_checkpoint = generate_checkpoint_new(name=cerf.name, min=cerf.min, max=cerf.max, week=None,
                                                           type_name=get_checkpoints_type(int(cerf.type),
                                                                                          get_name=True), key=False)
                term_dict["point_distribution"] = point_distribution
                term_dict["final_checkpoint"] = final_checkpoint

        for tool in evaluation_tools:
            checkpoint_name = None
            if tool.type in checkpoint_correspondence:
                checkpoint_name = tool.type
            else:
                for key, value in checkpoint_correspondence.items():
                    if tool.type in value:
                        checkpoint_name = key
                        break

            checkpoint_dict = {"name": tool.name, "min_grade": tool.min, "max_grade": tool.max, "week": tool.deadline,
                               "key": tool.check_point, "type": checkpoint_name}
            term_dict["regular_checkpoints"].append(checkpoint_dict)
        wp_dict["terms"].append(term_dict)
    return Response(wp_dict, status=200)
