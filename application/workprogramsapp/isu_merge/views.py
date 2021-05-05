from rest_framework.views import APIView
import os
import pandas
from rest_framework.response import Response



class FileUploadAPIView(APIView):
    """
    API-endpoint для загрузки файла sub_2019_2020_new
    """

    def post(self, request):
        print('- Импортируем csv файл')
        if not os.path.exists('upload/'):
            os.mkdir('upload/')
        path = 'upload/' + str(request.FILES['file'])
        with open(path, 'wb+') as destination:
            for chunk in request.FILES['file'].chunks():
                destination.write(chunk)
        data = pandas.read_excel(path)
        print(data['ИД_УП'])
        print('- Импортируем json с порядком модулей')
        with open('workprogramsapp/modules-order.json', 'r', encoding='utf-8') as fh:
            order = json.load(fh)

        print('- Создаем рпд и направления')
        # создаем рпд и направления
        fs_count, wp_count, ap_count = 0, 0, 0
        for i in list(data.index.values):
            try:
                #print('clone', clone)
                print('-- Новая РПД')
                if data['УРОВЕНЬ_ОБРАЗОВАНИЯ'][i].strip() == 'Академический бакалавр':
                    qualification = 'bachelor'
                elif data['УРОВЕНЬ_ОБРАЗОВАНИЯ'][i].strip() == 'Магистр':
                    qualification = 'master'
                else:
                    qualification = 'specialist'
                print('-- Уровень образования', qualification)
                # def format_НАИМЕНОВАНИЕ_МОДУЛЯ(title):
                #     sem_num = re.search('\d( ?)семестр', title)
                #     ognp_num = re.match('огнп( ?)[1-7]', title.strip(), flags=re.IGNORECASE)
                #     p1 = '[^A-Za-zА-Яа-яёЁ]'
                #     p2 = ' +'
                #     if ognp_num:
                #         return ognp_num.group() + " " + re.sub(p2, ' ', re.sub(p1, ' ', title[ognp_num.end():])).strip()
                #     if not sem_num:
                #         return re.sub(p2, ' ', re.sub(p1, ' ', title)).strip()
                #     else:
                #         result = re.sub(p1, ' ', title[:sem_num.start()]) + sem_num.group() + re.sub(p1, ' ', title[sem_num.end():])
                #         return re.sub(p2, ' ', result).strip()
                #
                # credit_units = [0 for i in range(0, 12)]
                # units = data.loc[
                #     (data['SUBFIELDNAME'] == data['SUBFIELDNAME'][i]) & (data['НАИМЕНОВАНИЕ_БЛОКА'] == data['НАИМЕНОВАНИЕ_БЛОКА'][i]) & (
                #             data['НАИМЕНОВАНИЕ_МОДУЛЯ'] == data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i]) & (data['SUBJECT'] == data['SUBJECT'][i])
                #     & (data['ГОД_НАБОРА'] == data['ГОД_НАБОРА'][i])
                #     ]
                # print(units.index.values)
                # # units = data[(data['SUBFIELDNAME']==data['SUBFIELDNAME'][i])&(data['НАИМЕНОВАНИЕ_БЛОКА']==data['НАИМЕНОВАНИЕ_БЛОКА'][i])&(data['НАИМЕНОВАНИЕ_МОДУЛЯ']==data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i])&(data['SUBJECT']==data['SUBJECT'][i])].drop_duplicates()
                # try:
                #     for u in units.index.values:
                #         if pandas.isna(units["CREDITS"][u]) or units["CREDITS"][u] == 0:
                #             credit_units[int(units["SEMESTER"][u]) - 1] = "-"
                #         elif units["SEMESTER"][u] == ".":
                #             credit_units[11] = units["CREDITS"][u]
                #         else:
                #             credit_units[int(units["SEMESTER"][u]) - 1] = int(units["CREDITS"][u])
                #     print('credit_units', credit_units)
                # except:
                #     print("mistake with units")
                #     pass
                print('--- проверяем если ОП уже существует в БД')
                if FieldOfStudy.objects.filter(number=data['ШИФР_НАПРАВЛЕНИЯ'][i], qualification=qualification).exists():
                    fs_obj = FieldOfStudy.objects.get(number=data['ШИФР_НАПРАВЛЕНИЯ'][i], qualification=qualification)
                else:
                    # Записываем в БД новую ОП
                    #
                    fs_obj = FieldOfStudy(number=data['ШИФР_НАПРАВЛЕНИЯ'][i], title=data['НАПРАВЛЕНИЕ_ПОДГОТОВКИ'][i].strip(),
                                          qualification=qualification)
                    fs_obj.save()
                    fs_count += 1

                # print('--- Направление подготовки: ', fs_obj)
                # # Проверяем если Дисцпилина уже есть в БД
                # #
                # print(data['SUBJECT'][i].strip(), data['DIS_CODE'][i])
                # regex = r'^[0-9]{2}\.' + str(data['DIS_CODE'][i])[3] + '.'
                # print(regex)
                #TODO: ОГНП НЕКОРРЕКТНО СООТНОСЯТСЯ
                try:
                    wp = WorkProgram.objects.get(id = data['ИД_НАШ'][i].strip())
                    print('--- РПД найдена')
                except:
                    print('--- РПД не найдена')
                print('Найдена РПД: ', wp_list)
                #print(WorkProgram.objects.get(discipline_code=data['DIS_CODE'][i], title=data['SUBJECT'][i].strip()))
                if wp.exists():
                    wp_obj = wp
                else:
                    # если нет, то записываем в БД

                    wp_obj = WorkProgram(title=data['SUBJECT'][i].strip(), discipline_code=data['DIS_CODE'][i],
                                         subject_code=data['НОМЕР'][i], qualification=qualification,
                                         credit_units=",".join(map(str, credit_units)))
                    print("РПД создана")
                    wp_obj.save()
                    print(wp_obj.id)
                    wp_count += 1
                certification_for_wp = СertificationEvaluationTool.objects.filter(work_program=wp_obj)
                semester = 1
                if not СertificationEvaluationTool.objects.filter(work_program=wp_obj).exists():
                    print('найдено оценочное средство')
                    semester = 1
                else:
                    print('начало цыкола обработки семестров')
                    for tool in certification_for_wp:
                        print('замена номеров оценочных средств')
                        if tool.semester >= semester:
                            semester = tool.semester + 1
                if not СertificationEvaluationTool.objects.filter(work_program=wp_obj).exists():
                    print('создаются оценочные срадства')
                    if bool(data['PASS'][i]):
                        СertificationEvaluationTool.objects.create(work_program=wp_obj, type="3", semester=semester)
                    if bool(data['DIFF'][i]):
                        СertificationEvaluationTool.objects.create(work_program=wp_obj, type="2", semester=semester)
                    if bool(data['EXAM'][i]):
                        СertificationEvaluationTool.objects.create(work_program=wp_obj, type="1", semester=semester)
                    if bool(data['CP'][i]):
                        СertificationEvaluationTool.objects.create(work_program=wp_obj, type="4", semester=semester)
                # try:
                #     lecture_array = [float(x) for x in wp_obj.lecture_hours.split(",")]
                # except:
                #     wp_obj.lecture_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.practice_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.lab_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.srs_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                # if ',' not in wp_obj.lecture_hours and '.' not in wp_obj.lecture_hours:
                #print('1', len(list(wp_obj.lecture_hours)))
                #print('2', not wp_obj.lecture_hours)
                # if not wp_obj.lecture_hours:
                #     print('попытка создать массивыдля данных о семестрах')
                #     wp_obj.lecture_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.practice_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.lab_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.srs_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     print('условие длинны лекционных часов прошло')
                # if len(list(wp_obj.lecture_hours)) < 6:
                #     print('2 попытка создать массивыдля данных о семестрах')
                #     wp_obj.lecture_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.practice_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.lab_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     wp_obj.srs_hours = str([0 for _ in range(10)])[1:-1].replace(" ", "")
                #     print('2 условие длинны лекционных часов прошло')
                # print('попытка вбить часы')
                # lecture_array = [float(x) for x in wp_obj.lecture_hours.split(",")]
                # practise_array = [float(x) for x in wp_obj.practice_hours.split(",")]
                # lab_array = [float(x) for x in wp_obj.lab_hours.split(",")]
                # srs_array = [float(x) for x in wp_obj.srs_hours.split(",")]
                # print('семестр', data['SEMESTER'][i])
                # print('лекционные часы:', float(str(data['LECTURE'][i]).replace(",", ".")))
                # print(lecture_array)
                # print(lecture_array[int(data['SEMESTER'][i]) - 1])
                # lecture_array[int(data['SEMESTER'][i]) - 1] = float(str(data['LECTURE'][i]).replace(",", "."))
                # print('практические часы:', float(str(data['PRACTICE'][i]).replace(",", ".")))
                # practise_array[int(data['SEMESTER'][i]) - 1] = float(str(data['PRACTICE'][i]).replace(",", "."))
                # print('лабораторные часы:', float(str(data['LAB'][i]).replace(",", ".")))
                # lab_array[int(data['SEMESTER'][i]) - 1] = float(str(data['LAB'][i]).replace(",", "."))
                # print('срс часы:', float(str(data['SRS'][i]).replace(",", ".")))
                # srs_array[int(data['SEMESTER'][i]) - 1] = float(str(data['SRS'][i]).replace(",", "."))
                #
                # wp_obj.lecture_hours = str(lecture_array)[1:-1].replace(" ", "")
                # wp_obj.practice_hours = str(practise_array)[1:-1].replace(" ", "")
                # wp_obj.lab_hours = str(lab_array)[1:-1].replace(" ", "")
                # wp_obj.srs_hours = str(srs_array)[1:-1].replace(" ", "")
                #
                # wp_obj.wp_isu_id = int(data['ISU_SUBJECT_ID'][i])

                if data['ЯЗЫК'][i].strip().find("Русский") != -1 and data['LANGUAGE'][i].strip().find(
                        "Английский") != -1:
                    wp_obj.language = "ru/en"
                elif data['ЯЗЫК'][i].strip() == "Русский":
                    wp_obj.language = "ru"
                elif data['ЯЗЫК'][i].strip() == "Английский":
                    wp_obj.language = "en"
                elif data['ЯЗЫК'][i].strip() == "Казахский":
                    wp_obj.language = "kz"
                elif data['ЯЗЫК'][i].strip() == "Немецкий":
                    wp_obj.language = "de"

                try:
                    struct_unit=StructuralUnit.objects.get(title=data['IMPLEMENTOR'][i].strip(), isu_id=data['IMPLEMENTOR_ID'][i])
                except:
                    struct_unit=StructuralUnit.objects.create(title=data['IMPLEMENTOR'][i].strip(), isu_id=data['IMPLEMENTOR_ID'][i])
                wp_obj.structural_unit_id=struct_unit.id
                wp_obj.save()
                print('Рабочая программа дисциплины: ', wp_obj)


                if AcademicPlan.objects.filter(qualification=qualification, year=data['ГОД_НАБОРА'][i],
                                               educational_profile=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i].strip()).exists():
                    ap_obj = AcademicPlan.objects.get(qualification=qualification, year=data['ГОД_НАБОРА'][i],
                                                      educational_profile=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i].strip())
                    # EP_ID - учебный план
                    ap_obj.ap_isu_id=int(data['ИД_УП'][i])
                    ap_obj.save()
                else:
                    typelearning = 'internal'
                    ap_obj = AcademicPlan(education_form=typelearning, qualification=qualification,
                                          year=data['ГОД_НАБОРА'][i], educational_profile=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i].strip(),
                                          ap_isu_id=int(data['ОП_ИД'][i]))
                    ap_obj.save()
                    ap_count += 1
                print('Учебный план: ', ap_obj)


                if ImplementationAcademicPlan.objects.filter(academic_plan=ap_obj, field_of_study=fs_obj,
                                                             year=data['ГОД_НАБОРА'][i]).exists():
                    iap_obj=ImplementationAcademicPlan.objects.get(academic_plan=ap_obj, field_of_study=fs_obj,
                                                                   year=data['ГОД_НАБОРА'][i])
                    iap_obj.op_isu_id=int(data['ОП_ИД'][i])
                    iap_obj.ns_id = int(data['НС_ИД'][i])
                    iap_obj.save()
                    # OP_ID - образовательная программа
                else:
                    iap_obj = ImplementationAcademicPlan(academic_plan=ap_obj, field_of_study=fs_obj,
                                                         year=data['ГОД_НАБОРА'][i], op_isu_id=int(data['ОП_ИД'][i]), ns_id = int(data['НС_ИД'][i]))
                    iap_obj.save()
                print('Связь учебного плана и направления: done')


                if DisciplineBlock.objects.filter(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan=ap_obj).exists():
                    db = DisciplineBlock.objects.get(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan=ap_obj)
                else:
                    db = DisciplineBlock(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan_id=ap_obj.id, )
                    db.save()
                print('Блок: ', db)


                # Тут Денис Терещенко напишет обработчик модулей
                try:
                    o = order[(data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i].strip())]
                except:
                    order.update({(data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i].strip()): len(order)})
                    o = order[(data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i].strip())]

                if DisciplineBlockModule.objects.filter(name=(data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i].strip()),
                                                        descipline_block=db).exists():
                    mdb = DisciplineBlockModule.objects.get(name=(data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i].strip()), descipline_block=db)
                else:
                    mdb = DisciplineBlockModule(name=(data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i].strip()), descipline_block=db,
                                                order=o)
                    mdb.save()

                print('Модуль в блоке: ', mdb)

                if (data['ВЫБОР'][i] == '1' and WorkProgramChangeInDisciplineBlockModule.objects.filter(
                        discipline_block_module=mdb, change_type=data['ВЫБОР'][i], subject_code = data['НОМЕР'][i]).exists()):
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module=mdb,
                                                                                       change_type=data['ВЫБОР'][i], subject_code = data['НОМЕР'][i]
                                                                                       )
                    if WorkProgramInFieldOfStudy.objects.filter(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj)
                        wpinfs.id_str_up = int(data['ID_STR_UP'][i])
                        wpinfs.save()
                        print('wpinfs', wpinfs.id_str_up)
                    else:
                        wpinfs = WorkProgramInFieldOfStudy(work_program_change_in_discipline_block_module=wpchangemdb,
                                                           work_program=wp_obj)
                        wpinfs.id_str_up = int(data['ID_STR_UP'][i])
                        wpinfs.save()
                        print('wpinfs', wpinfs.id_str_up)
                    # wpchangemdb.work_program.add(wp_obj)
                elif WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=mdb,
                                                                             change_type=data['ВЫБОР'][i],
                                                                             work_program=wp_obj
                                                                             ).exists():
                    print('exist', wp_obj)
                    print("ВОТ ТУТ ПРОИСХОДИТ НИЧЕГО!!")
                    wpinfs = WorkProgramInFieldOfStudy.objects.get(
                        work_program_change_in_discipline_block_module=WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module=mdb,
                                                                                                                            change_type=data['ВЫБОР'][i],
                                                                                                                            work_program=wp_obj
                                                                                                                            ), work_program=wp_obj)
                    wpinfs.id_str_up = int(data['ID_STR_UP'][i])
                    wpinfs.save()
                    print('wpinfs', wpinfs.id_str_up)

                else:
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule()
                    wpchangemdb.credit_units = ",".join(map(str, credit_units))
                    print('credit_units', credit_units)
                    print('wpchangemdb.credit_units', wpchangemdb.credit_units)
                    wpchangemdb.change_type = data['ВЫБОР'][i]
                    wpchangemdb.discipline_block_module = mdb
                    wpchangemdb.subject_code = data['НОМЕР'][i]
                    wpchangemdb.save()


                    if WorkProgramInFieldOfStudy.objects.filter(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj)
                        wpinfs.id_str_up = int(data['ID_STR_UP'][i])
                        wpinfs.save()
                        print("Нашли рпд в направлении", wpinfs)
                        print('wpinfs', wpinfs.id_str_up)
                    else:


                        wpinfs = WorkProgramInFieldOfStudy(work_program_change_in_discipline_block_module=wpchangemdb,
                                                           work_program=wp_obj, id_str_up = int(data['ID_STR_UP'][i]))
                        wpinfs.save()
                        print("Сохранили рпд в направлении", wpinfs)
                        print('wpinfs', wpinfs.id_str_up)


                try:
                    if WorkProgram.objects.filter(title=data['SUBJECT'][i].strip(),
                                                  # zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__name=
                                                  # format_НАИМЕНОВАНИЕ_МОДУЛЯ(data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i].strip()),
                                                  # zuns_for_wp__work_program_change_in_discipline_block_module__change_type=
                                                  # data['ВЫБОР'][i],
                                                  zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module= mdb,
                                                  ).count() > 1:
                        # wp_obj2 = WorkProgram.objects.filter(title=data['SUBJECT'][i].strip(),
                        #                                     zuns_for_wp__work_program_change_in_discipline_block_module__discipline_block_module__name=
                        #                                     data['НАИМЕНОВАНИЕ_МОДУЛЯ'][i].strip(),
                        #                                     zuns_for_wp__work_program_change_in_discipline_block_module__change_type=
                        #                                     data['ВЫБОР'][i],
                        #                                     zuns_for_wp__work_program_change_in_discipline_block_module = wpchangemdb,
                        #                                     )[0]
                        # print ('НАЙДЕНА ПОВТОРНАЯ РПД',  wp_obj)
                        # wpinfs.work_program = wp_obj2
                        # wpinfs.save()
                        if clone:
                            print ('УДАЛЯЕТСЯ СКЛОНИРОВАННАЯ рпд')
                            wp_obj.delete()
                            print(wpchangemdb)
                            wpchangemdb.delete()
                except:
                    pass

                print('Рабочая программа дисциплины записана в модуль: done')

                # if Zun.objects.filter(wp_in_fs = wpinfs).exists():
                #     pass
                # else:
                #     zun = Zun(wp_in_fs = wpinfs)
                #     zun.save()
                #     #wpchangemdb.work_program.add(wp_obj)

            except  Exception as e:
                print(e)
                print('Строка ', i, 'не записалась, проверьте на опечатки или пустые значения')
                continue;

        print(f'Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}')

        return Response(status=200)
