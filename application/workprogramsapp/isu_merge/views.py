import json
import os
from typing import Dict

import pandas
from django.conf import settings
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from gia_practice_app.GIA.models import GIA
from gia_practice_app.Practice.models import Practice
from workprogramsapp.isu_merge.academic_plan_headers import process_headers
from workprogramsapp.isu_merge.academic_plan_update_2023.academic_plan_excel_creator import AcademicPlanExcelCreator
from workprogramsapp.isu_merge.academic_plan_update_2023.academic_plan_modules_updater import process_modules
from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_processor import AcademicPlanUpdateProcessor
from workprogramsapp.isu_merge.academic_plan_update_2023.isu_service import IsuService, IsuUser
from workprogramsapp.isu_merge.filterset import HistoryFilter
from workprogramsapp.isu_merge.post_to_isu.ap_to_isu import ap_isu_generate_dict
from workprogramsapp.isu_merge.post_to_isu.updaters_isu_logic import post_wp_to_isu, post_practice_to_isu, \
    post_gia_to_isu
from workprogramsapp.isu_merge.serializers import IsuHistoryListViewSerializer
from workprogramsapp.models import WorkProgramIdStrUpForIsu, FieldOfStudy, WorkProgram, AcademicPlan, \
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, \
    WorkProgramInFieldOfStudy, Zun, AcademicPlanUpdateLog, AcademicPlanUpdateSchedulerConfiguration, \
    AcademicPlanUpdateConfiguration, IsuObjectsSendLogger, DisciplineBlockModuleInIsu
from workprogramsapp.permissions import IsExpertiseMasterStrict
from workprogramsapp.serializers import AcademicPlanUpdateLogSerializer, AcademicPlanUpdateConfigurationSerializer, \
    AcademicPlanUpdateSchedulerConfigurationSerializer
from workprogramsapp.workprogram_additions.models import StructuralUnit

from workprogramsapp.isu_merge.academic_plan_update_2023.academic_plan_update_processor \
    import AcademicPlanUpdateProcessor as AcademicPlanUpdateProcessor_2023

class UpdateAcademicPlansView(APIView):

    def post(self, request):
        updater = AcademicPlanUpdateProcessor()
        updater.update_academic_plans()
        return Response(status=200)

class UpdateAcademicPlans2023View(APIView):

    def post(self, request):
        updater = AcademicPlanUpdateProcessor_2023()
        updater.update_academic_plans()
        return Response(status=200)


class AcademicPlanUpdateLogsView(ListAPIView):
    serializer_class = AcademicPlanUpdateLogSerializer
    queryset = AcademicPlanUpdateLog.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['new_value',
                     'old_value',
                     'object_type',
                     'field_name',
                     'academic_plan_id',
                     'updated_date_time']
    ordering_fields = ['new_value',
                       'old_value',
                       'object_type',
                       'field_name',
                       'academic_plan_id',
                       'updated_date_time']
    permission_classes = [permissions.IsAuthenticated]


class AcademicPlanUpdateConfigurationView(ListAPIView):
    serializer_class = AcademicPlanUpdateConfigurationSerializer
    queryset = AcademicPlanUpdateConfiguration.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['academic_plan_id',
                     'academic_plan_title',
                     'updated_date_time']
    ordering_fields = ['academic_plan_id',
                       'academic_plan_title',
                       'updated_date_time']
    permission_classes = [permissions.IsAuthenticated]


class AcademicPlanUpdateConfigurationCreateAPIView(CreateAPIView):
    serializer_class = AcademicPlanUpdateConfigurationSerializer
    queryset = AcademicPlanUpdateConfiguration.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class AcademicPlanUpdateConfigurationUpdateView(UpdateAPIView):
    serializer_class = AcademicPlanUpdateConfigurationSerializer
    queryset = AcademicPlanUpdateConfiguration.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class AcademicPlanUpdateSchedulerConfigurationView(RetrieveAPIView):
    queryset = AcademicPlanUpdateSchedulerConfiguration.objects.all()
    serializer_class = AcademicPlanUpdateSchedulerConfigurationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, **kwargs):
        queryset = AcademicPlanUpdateSchedulerConfiguration.objects.all()
        serializer = AcademicPlanUpdateSchedulerConfigurationSerializer(queryset, many=True,
                                                                        context={'request': request})
        if len(serializer.data) == 0:
            return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)
        return Response(serializer.data[0], status=status.HTTP_200_OK)


class AcademicPlanUpdateSchedulerConfigurationUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, **kwargs):
        queryset = AcademicPlanUpdateSchedulerConfiguration.objects.all()

        if len(queryset) == 0:
            obj = AcademicPlanUpdateSchedulerConfiguration()
            obj.days_interval = request.data.get("days_interval")
            obj.execution_hours = request.data.get("execution_hours")
            obj.save()
            return Response(status=status.HTTP_200_OK)

        obj = queryset[0]
        obj.days_interval = request.data.get("days_interval")
        obj.execution_hours = request.data.get("execution_hours")
        obj.save()
        return Response(status=status.HTTP_200_OK)


class AcademicPlanUpdateExcelCreatorView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        creator = AcademicPlanExcelCreator()
        filename, mime_type = creator.create_excel_file()

        path = open(filename, 'r')
        response = Response(path, content_type=mime_type)
        response['Content-Disposition'] = "attachment; filename=%s" % filename

        return response


class FileUploadAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
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

                # print('лекционные часы:', float(str(data['ЛЕК_В_СЕМЕСТРАХ'][i]).replace(",", ".")))
                # lecture_array = []
                # lecture_array[int(data['SEMESTER'][i]) - 1] = float(str(data['LECTURE'][i]).replace(",", "."))
                print('data[ЛЕК_В_СЕМЕСТРАХ]', data['ЛЕК_В_СЕМЕСТРАХ'])
                for i in float(str(data['ЛЕК_В_СЕМЕСТРАХ'][i]).replace(",", ".")):
                    print('ffff', i)

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
                discipline_block_module = DisciplineBlockModule(name=educational_module_name, order=module_order)

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


class FileUploadOldVersionAPIView(APIView):
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
                    try:
                        wp = WorkProgram.objects.get(id = int(data['ИД_НАШ'][i]))
                        wp_obj = wp
                    except:
                        wp = WorkProgram.objects.get(discipline_code = int(data['DISC_DISC_ID'][i]))
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
                if StructuralUnit.objects.filter(title=str(data['ИСПОЛНИТЕЛЬ_ДИС'][i].strip())):
                    st_unit = StructuralUnit.objects.filter(title=data['ИСПОЛНИТЕЛЬ_ДИС'][i].strip())[0]
                    st_unit.isu_id = int(data['ИД_ИСПОЛНИТЕЛЯ_ДИС'][i])
                    print('Структурное подразделение записалось')
                    st_unit.save()
                else:
                    StructuralUnit.objects.create(title=data['ИСПОЛНИТЕЛЬ_ДИС'][i].strip(), isu_id=int(data['ИД_ИСПОЛНИТЕЛЯ_ДИС'][i]))
                    st_unit = StructuralUnit.objects.get(title=data['ИСПОЛНИТЕЛЬ_ДИС'][i].strip(), isu_id=int(data['ИД_ИСПОЛНИТЕЛЯ_ДИС'][i]))
                    print('Структурное подразделение выбралось')
                wp_obj.structural_unit = st_unit
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
                print('-- 11')
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
                    ap_obj.ap_isu_id=int(data['ИД_УП'][i])
                    ap_obj.save()
                    print('------')
                    iap_obj.academic_plan = ap_obj
                    iap_obj.save()
                    ap_count += 1
                print('-- Работа с блоком')
                if DisciplineBlock.objects.filter(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan=ap_obj).exists():
                    db = DisciplineBlock.objects.get(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan=ap_obj)
                else:
                    db = DisciplineBlock(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan_id=ap_obj.id, )
                    db.save()
                print('-- Работа с модулями')

                try:
                    o = order[(data['МОДУЛЬ'][i].strip())]
                except:
                    order.update({(data['МОДУЛЬ'][i].strip()): len(order)})
                    o = order[(data['МОДУЛЬ'][i].strip())]
                if DisciplineBlockModule.objects.filter(name=(data['МОДУЛЬ'][i].strip()),
                                                        descipline_block=db).exists():
                    mdb = DisciplineBlockModule.objects.get(name=(data['МОДУЛЬ'][i].strip()), descipline_block=db)

                else:
                    mdb = DisciplineBlockModule(name=(data['МОДУЛЬ'][i].strip()), order=o)
                    mdb.save()
                    mdb.descipline_block.add(db)

                print('-- Работа с блок-модулем')
                if data['ВЫБОР'][i] == 0:
                    option = 'Required'
                elif data['ВЫБОР'][i] == 1:
                    option = 'Optionally'

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
                    print('ddd')
                    WorkProgramIdStrUpForIsu.objects.get(id_str_up = int(data['ИД_СТР_УП'][i]), ns_id = int(data['НС_ИД'][i]), work_program_in_field_of_study = wpinfs)
                except WorkProgramIdStrUpForIsu.DoesNotExist:
                    wpinfs_id_str_up = WorkProgramIdStrUpForIsu(id_str_up = int(data['ИД_СТР_УП'][i]), ns_id = int(data['НС_ИД'][i]), work_program_in_field_of_study = wpinfs)
                    wpinfs_id_str_up.number = data['НОМЕР'][i]
                    wpinfs_id_str_up.dis_id = int(data['ДИС_ИД'][i])
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
                print('Строка ', i, 'не записалась, проверьте на опечатки или пустые значения')
                continue
        print(f'Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}')
        return Response(status=200)


class UpdateAcademicPlansHeadersView(APIView):

    def post(self, request):
        isu_service = IsuService(
            IsuUser(
                settings.ISU["ISU_CLIENT_ID"],
                settings.ISU["ISU_CLIENT_SECRET"]
            )
        )
        headers = isu_service.get_academic_plan_headers()
        plans_created = process_headers(headers)

        return Response(data={"plans_created": plans_created}, status=200)


class SendAcademicPlansLinesToIsu(APIView):
    """
        {
        "ap_id": INT
        }
        """
    permission_classes = [IsExpertiseMasterStrict]

    def post(self, request):
        request_data = request.data
        ap = AcademicPlan.objects.get(id=request_data["ap_id"])
        code, plans_created = ap_isu_generate_dict(ap)
        if code == 0:
            status_response = 200
        else:
            status_response = 500

        return Response(data={"plans_created": plans_created}, status=status_response)


class IsuHistoryListView(ListAPIView):
    queryset = IsuObjectsSendLogger.objects.all()
    serializer_class = IsuHistoryListViewSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    #filterset_fields = ["error_status",'date_of_sending', 'obj_id', "obj_type", "date_of_sending"]
    filterset_class =HistoryFilter
    search_fields = ["error_status", "obj_id", "obj_type", "date_of_sending"]
    permission_classes = [IsAdminUser]


class SendWorkProgramToISU(APIView):
    """
        {
        "wp_id": INT
        }
        """
    permission_classes = [IsExpertiseMasterStrict]

    def post(self, request):
        wp_id = request.data.get("wp_id")
        try:
            wp = WorkProgram.objects.get(id=wp_id)
        except WorkProgram.DoesNotExist:
            return Response(data={"error": "Такой РПД не существует"}, status=404)
        if wp.discipline_code:
            return Response(data={"error": "У РПД уже есть свой ID"}, status=500)
        if not wp.structural_unit:
            return Response(data={"error": "У РПД нету структурного подразделения"}, status=500)
        isu_logger = IsuService(
            IsuUser(
                settings.ISU["ISU_CLIENT_ID"],
                settings.ISU["ISU_CLIENT_SECRET"]
            )
        )
        isu_logger.get_access_token(add_headers={"scope": "service.edu-complex-isu"})
        token = isu_logger.token
        created_id = post_wp_to_isu(token, wp, -1)
        if created_id:
            status_response = 200
            wp.discipline_code = str(created_id)
            wp.save()
            return Response(data={"wp_created_id": created_id}, status=status_response)
        else:
            status_response = 500
            return Response(data={"error": "error when creating wp"}, status=status_response)


class SendPracticeToISU(APIView):
    """
        {
        "practice_id": INT
        }
        """
    permission_classes = [IsExpertiseMasterStrict]

    def post(self, request):
        practice_id = request.data.get("practice_id")
        try:
            practice = Practice.objects.get(id=practice_id)
        except Practice.DoesNotExist:
            return Response(data={"error": "Такой практики не существует"}, status=404)
        if practice.discipline_code:
            return Response(data={"error": "У Практики уже есть свой ID"}, status=500)
        if not practice.structural_unit:
            return Response(data={"error": "У практики нету структурного подразделения"}, status=500)
        isu_logger = IsuService(
            IsuUser(
                settings.ISU["ISU_CLIENT_ID"],
                settings.ISU["ISU_CLIENT_SECRET"]
            )
        )
        isu_logger.get_access_token(add_headers={"scope": "service.edu-complex-isu"})
        token = isu_logger.token
        created_id = post_practice_to_isu(token, practice, -1)
        if created_id:
            status_response = 200
            practice.discipline_code = created_id
            practice.save()
            return Response(data={"practice_created_id": created_id}, status=status_response)
        else:
            status_response = 500
            return Response(data={"error": "error when creating practice"}, status=status_response)


class SendGIAToISU(APIView):
    """
        {
        "gia_id": INT
        }
        """
    permission_classes = [IsExpertiseMasterStrict]

    def post(self, request):
        gia_id = request.data.get("gia_id")
        try:
            gia = GIA.objects.get(id=gia_id)
        except GIA.DoesNotExist:
            return Response(data={"error": "Такой ГИА не существует"}, status=404)
        if gia.discipline_code:
            return Response(data={"error": "У ГИА уже есть свой ID"}, status=500)
        if not gia.structural_unit:
            return Response(data={"error": "У ГИА нету структурного подразделения"}, status=500)
        isu_logger = IsuService(
            IsuUser(
                settings.ISU["ISU_CLIENT_ID"],
                settings.ISU["ISU_CLIENT_SECRET"]
            )
        )
        isu_logger.get_access_token(add_headers={"scope": "service.edu-complex-isu"})
        token = isu_logger.token
        created_id = post_gia_to_isu(token, gia, -1)
        if created_id:
            status_response = 200
            gia.discipline_code = created_id
            gia.save()
            return Response(data={"gia_created_id": created_id}, status=status_response)
        else:
            status_response = 500
            return Response(data={"error": "error when creating gia"}, status=status_response)


class UpdateModulesRelationships(APIView):

    def get(self, request):
        isu_service = IsuService(
            IsuUser(
                settings.ISU["ISU_CLIENT_ID"],
                settings.ISU["ISU_CLIENT_SECRET"]
            )
        )
        modules = isu_service.get_modules()
        modules_updated = process_modules(modules)

        return Response(data={"plans_created"}, status=200)


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def IsuModulesDuplicates(request):
    isu_modules = DisciplineBlockModuleInIsu.objects.values('isu_id').annotate(Count('id')).order_by().filter(
        id__count__gt=1)
    modules_to_append = {}
    for isu_module in isu_modules:
        duplicate = DisciplineBlockModuleInIsu.objects.filter(isu_id=isu_module["isu_id"])
        duplicate_module = duplicate.first().module
        if duplicate.count() == duplicate.filter(module=duplicate_module).count():
            print(duplicate)
        else:
            module_id = duplicate.first().isu_id
            modules_to_append[module_id] = []
            duplicate_list = []
            for d in duplicate:
                imp = ImplementationAcademicPlan.objects.get(academic_plan=d.academic_plan)
                duplicate_list.append(
                    {
                        "isu_id": d.isu_id,
                        "our_id": d.module.id,
                        "ap_id": imp.ap_isu_id
                    }
                )
            modules_to_append[module_id] = duplicate_list
    return Response(data=modules_to_append,status=200)
