import pandas as pd
import json
import re
import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response

from workprogramsapp.models import WorkProgramIdStrUpForIsu, FieldOfStudy, WorkProgram, AcademicPlan, \
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, \
    WorkProgramInFieldOfStudy, Zun

import time

class FileUploadAPIView_v2(APIView):
    """
    API-endpoint для загрузки файла sub_2019_2020_new
    """
    #@transaction.atomic
    def post(self, request):
        print('началось')

        # получаем список имеющихся id учебных планов
       # output_xl = pd.read_excel('output26_add.xlsx', index_col=0)
        #ids = output_xl['ИД_УП'].unique()
        if not os.path.exists('upload/isu_merge/'):
            os.mkdir('upload/isu_merge/')
        # path = 'upload/' + str(request.FILES['file'])
        #
        # with open(path, 'wb+') as destination:
        #     for chunk in request.FILES['file'].chunks():
        #         destination.write(chunk)


        #ids = ['10572', '13347'] #Cпециалисты
        ids = ImplementationAcademicPlan.objects.filter(ap_isu_id = 10572).values_list('ap_isu_id', flat=True)
        print('ids', ids)

        ''' up = pd.DataFrame(columns=['id', 'ns_id', 'direction_code', 'direction_name', 'edu_program_id', 'edu_program_name', 
            'faculty_id', 'faculty_name', 'lang', 'total_intensity', 'ognp_id', 'ognp_name', 'selection_year', 
            'disciplines_blocks', 'module_id', 'module_name', 'str_up_id', 'is_optional', 'dis_id', 'plan_order', 'disc_id',
            'discipline_name', 'discipline_doer_id', 'discipline_doer', 'discipline_lang', 'exam', 'credit', 'diff_credit', 'ze', 
            'lesson', 'lab', 'practice'])'''

        up = pd.DataFrame (columns = ['ИД_УП', 'НС_ИД', 'ШИФР_НАПРАВЛЕНИЯ', 'НАПРАВЛЕНИЕ_ПОДГОТОВКИ', 'ОП_ИД',
                                      'ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА', 'ФАК_ИД', 'ФАКУЛЬТЕТ', 'ЯЗЫК_ОБУЧЕНИЯ', 'ОБЩАЯ_ТРУДОЕМКОСТЬ', 'СРОК_ОБУЧЕНИЯ', 'УРОВЕНЬ_ОБРАЗОВАНИЯ',
                                      'ОГНП_ИД', 'ОГНП', 'ГОД_НАБОРА', 'НАИМЕНОВАНИЕ_БЛОКА', 'МОДУЛЬ_ИД', 'НАИМЕНОВАНИЕ_МОДУЛЯ', 'ИД_СТР_УП', 'ВЫБОР', 'НОМЕР_ПО_ПЛАНУ',
                                      'DISC_DISC_ID', 'ДИС_ИД', 'ДИСЦИПЛИНА',	'ИД_ИСПОЛНИТЕЛЯ_ДИС', 'ИСПОЛНИТЕЛЬ_ДИС', 'ЯЗЫК', 'ЭКЗ', 'ДИФ_ЗАЧЕТ', 'ЗАЧЕТ', 'КП',
                                      'ЗЕ_В_СЕМЕСТРАХ', 'ЛЕК_В_СЕМЕСТРАХ', 'ПРАК_В_СЕМЕСТРАХ', 'ЛАБ_В_СЕМЕСТРАХ'])

        # словарь для удаления
        to_del_dict = dict()

        def get_up(up_id):
            up_id = str(up_id)
            # получаем новые json
            url = 'https://dev.disc.itmo.su/api/v1/academic_plan?id=' + up_id
            page = requests.get(url)
            res = page.json()['result']
            print (up.shape)

            # берём id в новых планах
            res_new = pd.DataFrame(res['disciplines_blocks'])
            res_ids = []
            for row_index,row in res_new.iterrows ():
                for modules in row[2]:
                    for disc in modules['disciplines']:
                        res_ids.append(disc['disc_id'])

            # берём старые json (должны быть названия по шаблону)
            orig = ImplementationAcademicPlan.objects.get(ap_isu_id  = up_id).old_json
            print(orig)

            jsonpath = orig
            old_res = orig
            print('1111', old_res)
            #old_res = pd.DataFrame(old_res['disciplines_blocks'])
            #print(old_res)
            old_res_ids = []
            for blocks in old_res['disciplines_blocks']:
                for modules in blocks['discipline_modules']:
                    for disc in modules['disciplines']:
                        old_res_ids.append(disc['disc_id'])

            # ищем привязки для удаления и для добавления
            # код будет иногда некорректно обрабатывать, если в уп DISC_ID присутствует несколько раз
            to_del = set(old_res_ids) - set(res_ids)
            to_add = list(set(res_ids) - set(old_res_ids))
            to_del_dict[up_id]=list(to_del)
            #print (to_add)


            line = [res['id']]
            line.append(res['ns_id'])
            line.append(res['direction_code'])
            line.append(res['direction_name'])
            line.append(res['edu_program_id'])
            line.append(res['edu_program_name'])
            line.append(res['faculty_id'])
            line.append(res['faculty_name'])
            line.append(res['lang'])
            line.append(res['total_intensity'])
            training_period = int(float(res['training_period'])) # внезапно training_period стал приходить как строка, до этого был числом
            line.append(training_period)
            #print (type(res['training_period']))
            if training_period == 4:
                line.append("Академический бакалавр")
            elif training_period == 2:
                line.append("Магистр")
            else: line.append("Специалист")
            line.append(res['ognp_id'])
            line.append(res['ognp_name'])
            line.append(res['selection_year'])

            res = pd.DataFrame(res['disciplines_blocks'])

            for row_index,row in res.iterrows ():
                lineup = line.copy()
                lineup.append(row[1])
                for modules in row[2]:
                    linemodule = lineup.copy()
                    linemodule.append(modules['module_id '])
                    linemodule.append(modules['module_name']) # дальше буду  менять
                    for disc in modules['disciplines']:
                        linedisc = linemodule.copy()
                        linedisc.append(disc['str_up_id'])
                        if disc['is_optional']:
                            linedisc.append(1)
                        else: linedisc.append(0)
                        #linedisc.append(disc['is_optional'])

                        linedisc.append(disc['plan_order']) # надо менять
                        linedisc.append(disc['disc_id'])
                        linedisc.append(disc['dis_id'])
                        linedisc.append(disc['discipline_name'])
                        linedisc.append(disc['discipline_doer_id'])
                        linedisc.append(disc['discipline_doer'])
                        linedisc.append(disc['discipline_lang'])
                        linedisc.append(disc['exam']) # надо добавить список
                        linedisc.append(disc['diff_credit']) # надо добавить список
                        linedisc.append(disc['credit']) # надо добавить список
                        linedisc.append(disc['course_project']) # надо добавить список

                        ze = []
                        for sem in disc['ze']:
                            if sem['points'] == None:
                                ze.append(0)
                            else:
                                ze.append(sem['points'])
                        linedisc.append(tuple(ze))
                        lec = []
                        lab = []
                        practice = []
                        for s in disc['class_points']:
                            if s['lesson'] == None:
                                lec.append(0)
                            else:
                                lec.append(s['lesson'])
                        linedisc.append(tuple(lec))

                        for s in disc['class_points']:
                            if s['practice'] == None:
                                practice.append(0)
                            else:
                                practice.append(s['practice'])
                        linedisc.append(tuple(practice))

                        for s in disc['class_points']:
                            if s['lab'] == None:
                                lab.append(0)
                            else:
                                lab.append(s['lab'])
                        linedisc.append(tuple(lab))

                        # up.loc[disc['str_up_id']] = linedisc

                        ### начало вставки
                        # добавил условие
                        if disc['disc_id'] in to_add:
                            up.loc[disc['str_up_id']] = linedisc

            # скачиваем и сохраняем json заменяем старые

            #jsonfile = 'data/' + up_id + '_old.json'
            #with open(jsonfile, 'w', encoding='utf-8') as f:
            #    json.dump(res, f, ensure_ascii=False)
            #f.close

            ### конец вставки


        for i in ids:
            get_up(i)

        # Чистим названия дисциплин от лишних пробелов
        def clean_text(text):
            cleaned = re.sub('\s+', ' ', text)
            return cleaned.strip()
        up["ДИСЦИПЛИНА"] = up["ДИСЦИПЛИНА"].apply(clean_text)

        # Разбираемся с отсутствующими названиями модулей
        def set_module(module, block, number):
            block = clean_text(block)
            if re.search("блок 2", block, flags=re.IGNORECASE):
                module = "Практика"
            elif re.search("блок 3", block, flags=re.IGNORECASE):
                module = "ГИА"
            elif re.search("блок 4", block, flags=re.IGNORECASE):
                module = "Факультативные дисциплины"
            if not module:
                if number == "ЭД":
                    module = "Физическая культура (элективная дисциплина)"
                else:
                    module = "Неизвестный модуль"
            return module
        up["МОДУЛЬ"] = up.apply(lambda row: set_module(row["НАИМЕНОВАНИЕ_МОДУЛЯ"],
                                                       row["НАИМЕНОВАНИЕ_БЛОКА"],
                                                       row["НОМЕР_ПО_ПЛАНУ"]), axis=1)


        # Преобразуем номер дисциплины в число, если это не так
        def num_to_int(code, subj):
            if not code:
                if re.match('Подготовка к защите и защита ВКР', subj, flags=re.IGNORECASE):
                    code = "ГИА"
                elif re.match('Производственная, научно-исследовательская работа', subj, flags=re.IGNORECASE):
                    code = "П"
                elif re.match('Производственная, технологическая', subj, flags=re.IGNORECASE):
                    code = "П"
                elif re.match('Производственная, преддипломная', subj, flags=re.IGNORECASE):
                    code = "ПП"
                elif re.match('Иностранный язык', subj, flags=re.IGNORECASE):
                    code = "1000"
            if not str(code).isdigit() and not str(code).isalpha():
                return str(code).replace(".", "")
            elif not str(code).isdigit():
                return "".join([str(ord(chr)) for chr in str(code)])
            else:
                return str(code)
        up["НОМЕР"] = up.apply(lambda row: num_to_int(row["НОМЕР_ПО_ПЛАНУ"], row["ДИСЦИПЛИНА"]), axis=1)

        # преобразуем форму контроля
        def get_semester_list(years):
            if int(years) == 2:
                return ("1", "2", "3", "4"), "4"
            elif int(years) == 4:
                return ("1", "2", "3", "4", "5", "6", "7", "8"), "8"
            else:
                return ("11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"), "11"

        def set_control(tool, years):
            terms = [0 for _ in range(12)]
            if tool:
                tool = str(tool)
                term_list = []
                possible_terms, last_term = get_semester_list(years)
                for term in possible_terms:
                    if term in tool:
                        term_list.append(term)
                        tool = tool.replace(term, "")
                for term in term_list:
                    terms[int(term) - 1] = 1
            return tuple(terms)

        up["ЭКЗ_ПО_СЕМЕСТРАМ"] = up.apply(lambda row: set_control(row["ЭКЗ"], row["СРОК_ОБУЧЕНИЯ"]), axis=1)
        up["ЗАЧЕТ_ПО_СЕМЕСТРАМ"] = up.apply(lambda row: set_control(row["ЗАЧЕТ"], row["СРОК_ОБУЧЕНИЯ"]), axis=1)
        up["ДИФ_ЗАЧЕТ_ПО_СЕМЕСТРАМ"] = up.apply(lambda row: set_control(row["ДИФ_ЗАЧЕТ"], row["СРОК_ОБУЧЕНИЯ"]), axis=1)
        up["КП_ПО_СЕМЕСТРАМ"] = up.apply(lambda row: set_control(row["КП"], row["СРОК_ОБУЧЕНИЯ"]), axis=1)

        # считаем СРС
        def hours_status(creds, lec, prac, lab):
            status = ["0" for _ in range(12)]
            if any(creds):
                if any(lec) or any(prac) or any(lab):
                    for i in range(len(creds)):
                        if creds[i] != 0:
                            if creds[i] * 36 == lec[i] + prac[i] + lab[i]:
                                status[i] = "ЗЕ равно сумме часов без СРС"
                            elif creds[i] * 36 < lec[i] + prac[i] + lab[i]:
                                status[i] = "ЗЕ меньше, чем часов"
                            else:
                                status[i] = "ОК"
                else:
                    return "ЗЕ есть, часов нет"
            else:
                if any(lec) or any(prac) or any(lab):
                    return "Нет ЗЕ, но есть часы"
                else:
                    return "Нет ничего"
            status = set(status)
            status.remove("0")
            return "".join(sorted(status, reverse=True))

        def set_srs(status, creds, lec, prac, lab, module):
            srs = [0 for _ in range(12)]
            if status == "ОК" or (status == "ЗЕ есть, часов нет" and (module == "Практика" or module == "ГИА")):
                for i in range(len(creds)):
                    if creds[i] != 0:
                        srs[i] = round(creds[i] * 36 - 1.1 * (lec[i] + prac[i] + lab[i]), 1)
            return tuple(srs)

        up["СРС_СТАТУС"] = up.apply(lambda row: hours_status(row["ЗЕ_В_СЕМЕСТРАХ"], row["ЛЕК_В_СЕМЕСТРАХ"],
                                                             row["ПРАК_В_СЕМЕСТРАХ"], row["ЛАБ_В_СЕМЕСТРАХ"]), axis=1)

        up["СРС"] = up.apply(lambda row: set_srs(row["СРС_СТАТУС"], row["ЗЕ_В_СЕМЕСТРАХ"], row["ЛЕК_В_СЕМЕСТРАХ"],
                                                 row["ПРАК_В_СЕМЕСТРАХ"], row["ЛАБ_В_СЕМЕСТРАХ"], row["МОДУЛЬ"]), axis=1)


        #удаляем лишние столбцы
        up = up.drop(["НОМЕР_ПО_ПЛАНУ", "СРОК_ОБУЧЕНИЯ"], axis=1)

        #up.to_excel('input1.xlsx')

        # ввыод словаря со строками на удаление
        print (to_del_dict)

        # сохранение датафрейма на добавление

        date_time = time.strftime("%Y%m%d-%H%M%S")
        up.to_excel('upload/isu_merge/input_add'+date_time+'.xlsx')
        file = 'input_add'+date_time+'.xlsx'


        # не обрабатываются изменения следующего типа:
        # 1) дисциплина переехала в другой модуль (ну и ладно)
        # 2) у дисциплины изменилось
        # форма контроля, аудиторная нагрузка, язык реализации - можно узнать по эндпойнту к банку дисциплин?
        # https://dev.disc.itmo.su/api/v1/discipline_volumes?id=1
        # 3) изменился семестр реализации (не понятно, что делать)
        # 4) изменился реализатор
        # 5) нет проверок реквизитов учебного плана

        # нет гарантии, что на сайте то же самое, что и в input файле и в json
        # сейчас есть коллизии: для одного НАШ_ИД - несколько DISC_ID. Надо будет разделить на нашей стороне. Клонируем и связываем с DISC_ID
        # для одного DISC_ID есть несколько НАШ_ИД - это печаль, с эти ничего пока не сделать
        #удаляем лишние столбцы



        # #output = pd.read_excel('input1_up.xlsx', index_col=0) # файл, по которому сделана загрузка в конструктор
        # up = pd.read_excel('upload/isu_merge/input1.xlsx', index_col=0) # новая выгрузка из ИСУ
        # str_ids = up ["ИД_СТР_УП"].unique()
        #
        #
        #
        # #output = pd.read_excel('input1_up.xlsx', index_col=0) # файл, по которому сделана загрузка в конструктор
        # up = pd.read_excel('upload/isu_merge/input1.xlsx', index_col=0) # новая выгрузка из ИСУ
        # str_ids = up ["ИД_СТР_УП"].unique()
        #
        #
        # # output_ids = output[output['ИД_СТР_УП'].isin(str_ids)]
        #
        # # output_short = output_ids[['ИД_СТР_УП','ИД_НАШ']]
        # # isu_merge = up.copy()
        # # merged = isu_merge.merge(output_short, how='left')
        #
        # # new_version = 'input2_up.xlsx'
        # # merged.to_excel(new_version)
        #
        # data = pd.read_excel('upload/isu_merge/input1.xlsx', index_col=0) # новая выгрузка из ИСУ
        #
        try:
            for ap in to_del_dict:
                print(ap)
                for wp in to_del_dict[ap]:
                    print(wp)
                    WorkProgramChangeInDisciplineBlockModule.\
                        objects.filter(work_program = WorkProgram.objects.get(discipline_code = int(wp)),
                                                                            discipline_block_module__descipline_block__academic_plan__ap_isu_id = int(ap))
                    #WorkProgramChangeInDisciplineBlockModule.delete()
                    print(WorkProgramChangeInDisciplineBlockModule)
        except:
            pass
        # WorkProgramChangeInDisciplineBlockModule.
        #
        # for i in list(data.index.values):
        #     if WorkProgramIdStrUpForIsu.objects.filter(id_str_up = int(data['ДИС_ИД'][i])):
        #         print('сработало')
        #         data['ДИС_ИД'][i] = WorkProgram.objects.get(zuns_for_wp__work_program =
        #                                                     WorkProgramIdStrUpForIsu.objects.filter(id_str_up = int(data['ДИС_ИД'][i]).id)).id
        self.csv_handler(file)

        # change_2 = change
        # change = orig
        # orig = change_2
        return Response(status=200)

    def csv_handler(self, file):
        print('- Импортируем csv файл')
        if not os.path.exists('upload/'):
            os.mkdir('upload/')
        path = 'upload/isu_merge/' + file
        # with open(path, 'wb+') as destination:
        #     for chunk in request.FILES['file'].chunks():
        #         destination.write(chunk)
        data = pd.read_excel(path)
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
                print('-- Новая СТРОКА')
                if data['УРОВЕНЬ_ОБРАЗОВАНИЯ'][i].strip() == 'Академический бакалавр':
                    qualification = 'bachelor'
                elif data['УРОВЕНЬ_ОБРАЗОВАНИЯ'][i].strip() == 'Магистр':
                    qualification = 'master'
                else:
                    qualification = 'specialist'
                print('-- Уровень образования', qualification)
                print('--- проверяем если ОП уже существует в БД')
                if FieldOfStudy.objects.filter(number=data['ШИФР_НАПРАВЛЕНИЯ'][i], qualification=qualification).exists():
                    fs_obj = FieldOfStudy.objects.get(number=data['ШИФР_НАПРАВЛЕНИЯ'][i], qualification=qualification) #todo добавить ОБЩАЯ_ТРУДОЕМКОСТЬ
                else:
                    # Записываем в БД новую ОП
                    fs_obj = FieldOfStudy(number=data['ШИФР_НАПРАВЛЕНИЯ'][i], title=data['НАПРАВЛЕНИЕ_ПОДГОТОВКИ'][i].strip(),
                                          qualification=qualification)
                    fs_obj.save()
                    fs_count += 1
                try:
                    wp = WorkProgram.objects.get(id = int(data['ИД_НАШ'][i]))
                    wp_obj = wp
                    print('--- РПД найдена')
                except:
                    print('--- РПД не найдена')
                    wp_obj = WorkProgram(title=data['ДИСЦИПЛИНА'][i].strip(),
                                         subject_code=data['НОМЕР'][i], qualification=qualification,
                                         #credit_units=",".join(map(str, data['ЗЕ_В_СЕМЕСТРАХ'][i]))
                                         )
                    print("--- РПД создана")
                    wp_obj.save()
                    # print(wp_obj.id)
                    wp_count += 1

                def watchmaker(hours, ze):
                    print('функция вызвана')
                    ze = ze
                    sem = 0
                    all_ze_indexes_in_rpd = 0
                    lecture_hours_v2 = [0, 0, 0, 0]
                    for i in hours:
                        #print('ze', ze)
                        if ze[all_ze_indexes_in_rpd]>=1.0:
                            print('условие сработало')
                            lecture_hours_v2[sem] = i
                            sem +=1
                        all_ze_indexes_in_rpd +=1

                    #print('lecture_hours_v2', lecture_hours_v2)
                    return str(lecture_hours_v2).strip("[]")

                def semesters(ze):
                    ze = ze
                    sem = 0
                    for i in ze:
                        if i > 0:
                            sem +=1
                    return sem

                wp_obj.number_of_semesters = int(semesters([float(x) for x in (data['ЗЕ_В_СЕМЕСТРАХ'][i]).strip("()").split(",")]))
                wp_obj.lecture_hours_v2 = watchmaker([float(x) for x in (data['ЛЕК_В_СЕМЕСТРАХ'][i]).strip("()").split(",")], [float(x) for x in (data['ЗЕ_В_СЕМЕСТРАХ'][i]).strip("()").split(",")])
                print('Записаны часы лекций:', wp_obj.lecture_hours_v2)
                wp_obj.practice_hours_v2 = watchmaker([float(x) for x in (data['ПРАК_В_СЕМЕСТРАХ'][i]).strip("()").split(",")], [float(x) for x in (data['ЗЕ_В_СЕМЕСТРАХ'][i]).strip("()").split(",")])
                print('Записаны часы практик:', wp_obj.practice_hours_v2)
                wp_obj.lab_hours_v2 = watchmaker([float(x) for x in (data['ЛАБ_В_СЕМЕСТРАХ'][i]).strip("()").split(",")], [float(x) for x in (data['ЗЕ_В_СЕМЕСТРАХ'][i]).strip("()").split(",")])
                print('Записаны часы лаб:', wp_obj.lab_hours_v2)
                wp_obj.srs_hours_v2 = watchmaker([float(x) for x in (data['СРС'][i]).strip("()").split(",")], [float(x) for x in (data['ЗЕ_В_СЕМЕСТРАХ'][i]).strip("()").split(",")])
                print('Записаны часы срс:', wp_obj.srs_hours_v2)
                wp_obj.discipline_code = data['DISC_DISC_ID'][i]
                wp_obj.save()
                print('-- Работа с образовательной программой')
                if data['ЯЗЫК_ОБУЧЕНИЯ'][i].strip().find("Русский") != -1 and data['ЯЗЫК_ОБУЧЕНИЯ'][i].strip().find(
                        "Английский") != -1:
                    op_language = "ru/en"
                elif data['ЯЗЫК_ОБУЧЕНИЯ'][i].strip() == "Русский":
                    op_language = "ru"
                elif data['ЯЗЫК_ОБУЧЕНИЯ'][i].strip() == "Английский":
                    op_language = "en"
                elif data['ЯЗЫК_ОБУЧЕНИЯ'][i].strip() == "Казахский":
                    op_language = "kz"
                elif data['ЯЗЫК_ОБУЧЕНИЯ'][i].strip() == "Немецкий":
                    op_language = "de"
                if ImplementationAcademicPlan.objects.filter(title=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i], ap_isu_id=int(data['ИД_УП'][i]),
                                                             year=data['ГОД_НАБОРА'][i], language = op_language, qualification=qualification).exists():
                    iap_obj=ImplementationAcademicPlan.objects.get(title=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i], ap_isu_id=int(data['ИД_УП'][i]),
                                                                   year=data['ГОД_НАБОРА'][i], language = op_language, qualification=qualification)
                    iap_obj.op_isu_id=int(data['ОП_ИД'][i]) #todo: вернуть нс-ид (+) + записать название ОП сюда "ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА" + язык + вуз партнер
                    iap_obj.ap_isu_id=int(data['ИД_УП'][i])
                    iap_obj.ns_id = int(data['НС_ИД'][i])
                    iap_obj.title = data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i]
                    iap_obj.field_of_study.add(fs_obj)
                    iap_obj.save()
                else:
                    iap_obj = ImplementationAcademicPlan(title=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i],
                                                         year=data['ГОД_НАБОРА'][i], language = op_language, qualification=qualification)
                    iap_obj.op_isu_id=int(data['ОП_ИД'][i])
                    iap_obj.ap_isu_id=int(data['ИД_УП'][i])
                    iap_obj.ns_id = int(data['НС_ИД'][i])
                    iap_obj.title = data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i]
                    iap_obj.save()
                    iap_obj.field_of_study.add(fs_obj)
                    iap_obj.save()
                #print('Связь учебного плана и направления: done')
                print('-- Работа с учебным планом')
                if AcademicPlan.objects.filter(ap_isu_id = int(data['ИД_УП'][i])).exists():
                    ap_obj = AcademicPlan.objects.get(ap_isu_id = int(data['ИД_УП'][i]))
                    iap_obj.academic_plan = ap_obj
                    iap_obj.save()
                    print('id учебного плана',ap_obj.ap_isu_id)
                else:
                    ap_obj = AcademicPlan()
                    #ap_obj.academic_plan_in_field_of_study.set(iap_obj)
                    #iap_obj.academic_plan = ap_obj
                    #ap_obj.typelearning = 'internal'
                    ap_obj.ap_isu_id=int(data['ИД_УП'][i])
                    ap_obj.save()
                    print('------')
                    iap_obj.academic_plan = ap_obj
                    iap_obj.save()
                    ap_count += 1
                #print('Учебный план: ', ap_obj)
                print('-- Работа с блоком')
                if DisciplineBlock.objects.filter(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan=ap_obj).exists():
                    db = DisciplineBlock.objects.get(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan=ap_obj)
                else:
                    db = DisciplineBlock(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan_id=ap_obj.id, )
                    db.save()
                #print('Блок: ', db)
                # Тут Денис Терещенко напишет обработчик модулей
                print('-- Работа с модулями')

                try:
                    o = order[(data['МОДУЛЬ'][i].strip())]
                except:
                    order.update({(data['МОДУЛЬ'][i].strip()): len(order)})
                    o = order[(data['МОДУЛЬ'][i].strip())]
                if DisciplineBlockModule.objects.filter(name=(data['МОДУЛЬ'][i].strip()),
                                                        descipline_block=db).exists():
                    print('1')
                    mdb = DisciplineBlockModule.objects.get(name=(data['МОДУЛЬ'][i].strip()), descipline_block=db)

                else:
                    print('2')
                    mdb = DisciplineBlockModule(name=(data['МОДУЛЬ'][i].strip()), order=o)
                    mdb.save()
                    mdb.descipline_block.add(db)

                #print('Модуль в блоке: ', mdb)
                print('-- Работа с блок-модулем')
                if data['ВЫБОР'][i] == 0:
                    option = 'Required'
                elif data['ВЫБОР'][i] == 1:
                    option = 'Optionally'
                print("Выборность", option)

                if (option == 'Optionally' and WorkProgramChangeInDisciplineBlockModule.objects.filter(
                        discipline_block_module=mdb, change_type=option, subject_code = data['НОМЕР'][i]).exists()):
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module=mdb,
                                                                                       change_type=option, subject_code = data['НОМЕР'][i]
                                                                                       )
                    if WorkProgramInFieldOfStudy.objects.filter(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj)
                        #wpinfs.id_str_up = int(data['ИД_СТР_УП'][i])
                        wpinfs.save()
                    else:
                        wpinfs = WorkProgramInFieldOfStudy(work_program_change_in_discipline_block_module=wpchangemdb,
                                                           work_program=wp_obj)
                        #wpinfs.id_str_up = int(data['ИД_СТР_УП'][i])
                        wpinfs.save()
                elif WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=mdb,
                                                                             change_type=option,
                                                                             work_program=wp_obj
                                                                             ).exists():
                    print('exist', wp_obj)
                    wpinfs = WorkProgramInFieldOfStudy.objects.get(
                        work_program_change_in_discipline_block_module=WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module=mdb,
                                                                                                                            change_type=option,
                                                                                                                            work_program=wp_obj
                                                                                                                            ), work_program=wp_obj)
                    #wpinfs.id_str_up = int(data['ИД_СТР_УП'][i])
                    wpinfs.save()
                else:
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule()
                    wpchangemdb.credit_units = data['ЗЕ_В_СЕМЕСТРАХ'][i].strip("()")
                    print('wpchangemdb.credit_units', wpchangemdb.credit_units)
                    wpchangemdb.change_type = option
                    wpchangemdb.discipline_block_module = mdb
                    wpchangemdb.subject_code = data['НОМЕР'][i]
                    wpchangemdb.save()
                    if WorkProgramInFieldOfStudy.objects.filter(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj).exists():
                        wpinfs = WorkProgramInFieldOfStudy.objects.get(
                            work_program_change_in_discipline_block_module=wpchangemdb, work_program=wp_obj)
                        #wpinfs.id_str_up = int(data['ИД_СТР_УП'][i])
                        wpinfs.save()
                        print("Нашли рпд в направлении", wpinfs)
                    else:
                        wpinfs = WorkProgramInFieldOfStudy(work_program_change_in_discipline_block_module=wpchangemdb,
                                                           work_program=wp_obj)
                        wpinfs.save()
                        print("Сохранили рпд в направлении", wpinfs)
                try:
                    WorkProgramIdStrUpForIsu.objects.get(id_str_up = int(data['ИД_СТР_УП'][i]), ns_id = int(data['НС_ИД'][i]), work_program_in_field_of_study = wpinfs)
                    print('ddddddddddddddddd', WorkProgramIdStrUpForIsu.objects.get(id_str_up = int(data['ИД_СТР_УП'][i]), ns_id = int(data['НС_ИД'][i]), work_program_in_field_of_study = wpinfs))
                except WorkProgramIdStrUpForIsu.DoesNotExist:
                    wpinfs_id_str_up = WorkProgramIdStrUpForIsu(id_str_up = int(data['ИД_СТР_УП'][i]), ns_id = int(data['НС_ИД'][i]), work_program_in_field_of_study = wpinfs)
                    wpinfs_id_str_up.number = data['НОМЕР'][i]
                    wpinfs_id_str_up.dis_id = data['ДИС_ИД'][i]
                    wpinfs_id_str_up.ze_v_sem = data['ЗЕ_В_СЕМЕСТРАХ'][i].strip("()")
                    wpinfs_id_str_up.lec_v_sem = data['ЛЕК_В_СЕМЕСТРАХ'][i].strip("()")
                    wpinfs_id_str_up.prak_v_sem = data['ПРАК_В_СЕМЕСТРАХ'][i].strip("()")
                    wpinfs_id_str_up.lab_v_sem = data['ЛАБ_В_СЕМЕСТРАХ'][i].strip("()")
                    wpinfs_id_str_up.ekz_v_sem = data['ЭКЗ_ПО_СЕМЕСТРАМ'][i].strip("()")
                    wpinfs_id_str_up.zach_v_sem = data['ЗАЧЕТ_ПО_СЕМЕСТРАМ'][i].strip("()")
                    wpinfs_id_str_up.dif_zach_v_sem = data['ДИФ_ЗАЧЕТ_ПО_СЕМЕСТРАМ'][i].strip("()")
                    wpinfs_id_str_up.kp_v_sem = data['КП_ПО_СЕМЕСТРАМ'][i].strip("()")
                    wpinfs_id_str_up.save()
                except:
                    print('---- Ошибка с количеством WorkProgramIdStrUpForIsu.id_str_up')
                for zun in Zun.objects.filter(wp_in_fs_saved_fk_id_str_up = int(data['ИД_СТР_УП'][i])):
                    zun.wp_in_fs =  wpinfs
                    zun.save()
                print('Рабочая программа дисциплины записана в модуль: done')
            except Exception as e:
                print(e)
                print('Строка ', i, 'не записалась, проверьте на опечатки или пустые значения')
                continue
        print(f'Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}')