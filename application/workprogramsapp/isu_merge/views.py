from rest_framework.views import APIView
import os
import pandas
from rest_framework.response import Response
from rest_framework import permissions
from typing import Dict

from workprogramsapp.models import WorkProgramIdStrUpForIsu, FieldOfStudy, WorkProgram, AcademicPlan,\
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule,\
    WorkProgramInFieldOfStudy
import json
import re
from django.db import transaction


class FileUploadAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    """
    API-endpoint для загрузки файла sub_2019_2020_new
    """
    # @transaction.atomic
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

        self.initialize_educational_module_types()
        self.process_educational_modules(data, order)

        print('- Создаем рпд и направления')

        # создаем рпд и направления
        fs_count, wp_count, ap_count = 0, 0, 0
        for i in list(data.index.values):
            try:
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
                    fs_obj = FieldOfStudy(number=data['ШИФР_НАПРАВЛЕНИЯ'][i],
                                          title=data['НАПРАВЛЕНИЕ_ПОДГОТОВКИ'][i].strip(),
                                          qualification=qualification)
                    fs_obj.save()
                    fs_count += 1

                try:
                    wp = WorkProgram.objects.get(id=int(data['ИД_НАШ'][i]))
                    wp_obj = wp
                    print('--- РПД найдена')
                except:
                    print('--- РПД не найдена')

                    wp_obj = WorkProgram(title=data['ДИСЦИПЛИНА'][i].strip(),
                                         subject_code=data['НОМЕР'][i],
                                         qualification=qualification,
                                         #credit_units=",".join(map(str, data['ЗЕ_В_СЕМЕСТРАХ'][i]))
                                         )
                    print("--- РПД создана")
                    wp_obj.save()
                    # print(wp_obj.id)
                    wp_count += 1

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
                    iap_obj = ImplementationAcademicPlan.objects.get(title=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i], ap_isu_id=int(data['ИД_УП'][i]),
                                                                   year=data['ГОД_НАБОРА'][i], language = op_language, qualification=qualification)
                    iap_obj.op_isu_id = int(data['ОП_ИД'][i]) #todo: вернуть нс-ид (+) + записать название ОП сюда "ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА" + язык + вуз партнер
                    iap_obj.ap_isu_id = int(data['ИД_УП'][i])
                    iap_obj.ns_id = int(data['НС_ИД'][i])
                    iap_obj.title = data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i]
                    iap_obj.field_of_study.add(fs_obj)
                    iap_obj.save()
                else:
                    iap_obj = ImplementationAcademicPlan(title=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i],
                                                         year=data['ГОД_НАБОРА'][i], language=op_language, qualification=qualification)
                    iap_obj.op_isu_id = int(data['ОП_ИД'][i])
                    iap_obj.ap_isu_id = int(data['ИД_УП'][i])
                    iap_obj.ns_id = int(data['НС_ИД'][i])
                    iap_obj.title = data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i]
                    iap_obj.save()
                    iap_obj.field_of_study.add(fs_obj)
                    iap_obj.save()
                #print('Связь учебного плана и направления: done')

                print('-- Работа с учебным планом')
                print('dsssss', AcademicPlan.objects.filter(ap_isu_id = int(data['ИД_УП'][i])))

                if AcademicPlan.objects.filter(ap_isu_id = int(data['ИД_УП'][i])).exists():
                    ap_obj = AcademicPlan.objects.get(ap_isu_id = int(data['ИД_УП'][i]))
                    # ap_obj.ap_isu_id=int(data['ИД_УП'][i]) #todo: НЕ переносим в ImplementationAcademicPlan +
                    # ap_obj.save()
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
                print('-- Работа с модулями')
                print('из данных', str(data['МОДУЛЬ'][i]))

                mdb_id = self.educational_module_by_row_id[i]
                mdb = DisciplineBlockModule.objects.get(pk=mdb_id)
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
                except WorkProgramIdStrUpForIsu.DoesNotExist:
                    wpinfs_id_str_up = WorkProgramIdStrUpForIsu(id_str_up = int(data['ИД_СТР_УП'][i]), ns_id = int(data['НС_ИД'][i]), work_program_in_field_of_study = wpinfs)
                    wpinfs_id_str_up.number = data['НОМЕР'][i]
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
                print('Рабочая программа дисциплины записана в модуль: done')
            except Exception as e:
                print(e)
                print('Строка ', i, 'не записалась, проверьте на опечатки или пустые значения')
                continue

        print(f'Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}')

        return Response(status=200)

    educational_module_types = {}
    educational_module_by_row_id = {}

    @classmethod
    def process_educational_modules(cls, df: pandas.DataFrame, module_order_by_name: Dict[str, int]):
        df_block1 = df[df['НАИМЕНОВАНИЕ_БЛОКА'].str.contains('Блок 1')]
        df_block2 = df[df['НАИМЕНОВАНИЕ_БЛОКА'].str.contains('Блок 2')]
        df_block3 = df[df['НАИМЕНОВАНИЕ_БЛОКА'].str.contains('Блок 3')]
        df_block4 = df[df['НАИМЕНОВАНИЕ_БЛОКА'].str.contains('Блок 4')]

        cls.process_disciplines_block(df_block1, module_order_by_name)
        cls.process_disciplines_block(df_block2, module_order_by_name, 'НС_ИД')
        cls.process_disciplines_block(df_block3, module_order_by_name, 'НС_ИД')
        cls.process_disciplines_block(df_block4, module_order_by_name)

    @classmethod
    def process_disciplines_block(cls, disciplines_block: pandas.DataFrame, module_order_by_name: Dict[str, int],
                                  field_to_iterate_over='МОДУЛЬ'):
        educational_modules = disciplines_block[field_to_iterate_over].unique()

        for educational_module in educational_modules:
            current_module = disciplines_block[disciplines_block[field_to_iterate_over] == educational_module]
            groupby_result = current_module[['ИД_УП', 'ДИС_ИД']].groupby(['ИД_УП'])

            print(educational_module)

            # Массив словарей. Ключи в каждом из словарей - это ИД_УП в исходном датасете,
            # а значения - массивы идентификаторов строк из исходного датасета
            educational_module_versions = []

            for academic_plan_id, row_ids in groupby_result.groups.items():
                was_similar_found = False

                for version in educational_module_versions:
                    _, module_to_compare_over = list(version.items())[0]

                    module1 = current_module.loc[module_to_compare_over]
                    module2 = current_module.loc[row_ids]
                    if FileUploadAPIView.check_if_modules_are_the_same(module1, module2):
                        was_similar_found = True
                        version[academic_plan_id] = list(row_ids)
                        break

                if not was_similar_found:
                    educational_module_versions.append({
                        academic_plan_id: list(row_ids)
                    })

            if educational_module not in module_order_by_name:
                module_order_by_name[educational_module] = len(module_order_by_name)

            module_order = module_order_by_name[educational_module]

            # Предполагается, что в рамках current_module у всех записей одно и то же поле "МОДУЛЬ"
            educational_module_name = str(current_module.iloc[0]['МОДУЛЬ']).strip()
            educational_module_type = cls.get_module_type(educational_module_name)
            print('Полученный тип модуля:', educational_module_type)

            # пробегаемся по каждой из выделенный версий и сохраняем ее в БД
            for module_version in educational_module_versions:
                discipline_block_module = DisciplineBlockModule(name=educational_module, order=module_order)

                if educational_module_type != '':
                    discipline_block_module.type = educational_module_type

                discipline_block_module.save()

                for academic_plan_id, row_ids in module_version.items():
                    for row_id in row_ids:
                        cls.educational_module_by_row_id[row_id] = discipline_block_module.pk

    @staticmethod
    def check_if_modules_are_the_same(module1: pandas.DataFrame, module2: pandas.DataFrame) -> bool:
        # Разное ли количество дисциплин в модулях
        if module1.shape[0] != module2.shape[0]:
            return False

        sorted_module1 = module1.sort_values('ДИС_ИД')
        sorted_module2 = module2.sort_values('ДИС_ИД')

        for i in range(sorted_module1.shape[0]):
            discipline1 = sorted_module1.iloc[i]
            discipline2 = sorted_module2.iloc[i]

            if not FileUploadAPIView.check_if_disciplines_are_the_same(discipline1, discipline2):
                return False

        return True

    @staticmethod
    def check_if_disciplines_are_the_same(discipline1: pandas.core.series.Series,
                                          discipline2: pandas.core.series.Series) -> bool:
        # Разные идентификаторы дисциплин
        if discipline1['ДИС_ИД'] != discipline2['ДИС_ИД']:
            return False

        # Разный язык реализации дисциплины
        if discipline1['ЯЗЫК'] != discipline2['ЯЗЫК']:
            return False

        # Отличается ли признак выборности
        if discipline1['ВЫБОР'] != discipline2['ВЫБОР']:
            return False

        # Отличается исполнитель дисциплины
        if discipline1['ИД_ИСПОЛНИТЕЛЯ_ДИС'] != discipline2['ИД_ИСПОЛНИТЕЛЯ_ДИС']:
            return False

        # Отличается количество зачетных единиц
        if discipline1['ЗЕ_В_СЕМЕСТРАХ'] != discipline2['ЗЕ_В_СЕМЕСТРАХ']:
            return False

        # Отличается аудиторная нагрузка
        if discipline1['ЛЕК_В_СЕМЕСТРАХ'] != discipline2['ЛЕК_В_СЕМЕСТРАХ'] or \
                discipline1['ЛАБ_В_СЕМЕСТРАХ'] != discipline2['ЛАБ_В_СЕМЕСТРАХ'] or \
                discipline1['ПРАК_В_СЕМЕСТРАХ'] != discipline2['ПРАК_В_СЕМЕСТРАХ']:
            return False

        return True

    @classmethod
    def initialize_educational_module_types(cls):
        for key, value in DisciplineBlockModule.TYPES:
            cls.educational_module_types[key] = value

    @classmethod
    def get_module_type(cls, educational_module_name: str) -> str:
        module_type = ''

        if 'ОГНП ' in educational_module_name:
            module_type = 'ognp'
        elif 'Специализация' in educational_module_name:
            module_type = 'specialization_module'
        elif educational_module_name in cls.educational_module_types.values():
            for k, v in cls.educational_module_types.items():
                print(k, v)
                if educational_module_name == v:
                    module_type = k

        return module_type
