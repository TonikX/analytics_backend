from rest_framework.views import APIView
import os
import pandas
from rest_framework.response import Response
from workprogramsapp.models import WorkProgramIdStrUpForIsu, FieldOfStudy, WorkProgram, AcademicPlan,\
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule,\
    WorkProgramInFieldOfStudy
import json
from django.db import transaction


class FileUploadAPIView(APIView):
    """
    API-endpoint для загрузки файла sub_2019_2020_new
    """
    @transaction.atomic
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
                    #
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

                if ImplementationAcademicPlan.objects.filter(title=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i],
                                                             year=data['ГОД_НАБОРА'][i], language = op_language, qualification=qualification).exists():
                    iap_obj=ImplementationAcademicPlan.objects.get(title=fs_obj,
                                                                   year=data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i], language = op_language, qualification=qualification)
                    iap_obj.op_isu_id=int(data['ОП_ИД'][i]) #todo: вернуть нс-ид (+) + записать название ОП сюда "ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА" + язык + вуз партнер
                    iap_obj.ap_isu_id=int(data['ИД_УП'][i])
                    iap_obj.ns_id = int(data['НС_ИД'][i])
                    iap_obj.title = int(data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i])
                    iap_obj.save()
                else:
                    iap_obj = ImplementationAcademicPlan(academic_plan=ap_obj, field_of_study=fs_obj,
                                                         year=data['ГОД_НАБОРА'][i], op_isu_id=int(data['ОП_ИД'][i]), language = op_language, qualification=qualification)
                    iap_obj.op_isu_id=int(data['ОП_ИД'][i])
                    iap_obj.ap_isu_id=int(data['ИД_УП'][i])
                    iap_obj.ns_id = int(data['НС_ИД'][i])
                    iap_obj.title = int(data['ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА'][i])
                    iap_obj.save()
                print('Связь учебного плана и направления: done')

                print('-- Работа с учебным планом')

                if AcademicPlan.objects.filter(academic_plan_in_field_of_study = iap_obj, ap_isu_id = int(data['ИД_УП'][i])).exists():
                    ap_obj = AcademicPlan.objects.get(academic_plan_in_field_of_study = iap_obj, ap_isu_id = int(data['ИД_УП'][i]))
                    ap_obj.ap_isu_id=int(data['ИД_УП'][i]) #todo: НЕ переносим в ImplementationAcademicPlan +
                    ap_obj.save()
                else:
                    ap_obj = AcademicPlan(academic_plan_in_field_of_study = iap_obj)
                    #ap_obj.typelearning = 'internal'
                    ap_obj.ap_isu_id=int(data['ИД_УП'][i])
                    ap_obj.save()
                    ap_count += 1
                print('Учебный план: ', ap_obj)

                print('-- Работа с блоком')
                if DisciplineBlock.objects.filter(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan=ap_obj).exists():
                    db = DisciplineBlock.objects.get(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan=ap_obj)
                else:
                    db = DisciplineBlock(name=data['НАИМЕНОВАНИЕ_БЛОКА'][i].strip(), academic_plan_id=ap_obj.id, )
                    db.save()
                print('Блок: ', db)
                # Тут Денис Терещенко напишет обработчик модулей
                print('-- Работа с модулями')
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
                print('-- Работа с блок-модулем')
                if (data['ВЫБОР'][i] == '1' and WorkProgramChangeInDisciplineBlockModule.objects.filter(
                        discipline_block_module=mdb, change_type=data['ВЫБОР'][i], subject_code = data['НОМЕР'][i]).exists()):
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module=mdb,
                                                                                       change_type=data['ВЫБОР'][i], subject_code = data['НОМЕР'][i]
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
                                                                             change_type=data['ВЫБОР'][i],
                                                                             work_program=wp_obj
                                                                             ).exists():
                    print('exist', wp_obj)
                    wpinfs = WorkProgramInFieldOfStudy.objects.get(
                        work_program_change_in_discipline_block_module=WorkProgramChangeInDisciplineBlockModule.objects.get(discipline_block_module=mdb,
                                                                                                                            change_type=data['ВЫБОР'][i],
                                                                                                                            work_program=wp_obj
                                                                                                                            ), work_program=wp_obj)
                    #wpinfs.id_str_up = int(data['ИД_СТР_УП'][i])
                    wpinfs.save()
                else:
                    wpchangemdb = WorkProgramChangeInDisciplineBlockModule()
                    wpchangemdb.credit_units = data['ЗЕ_В_СЕМЕСТРАХ'][i].strip("()")
                    print('wpchangemdb.credit_units', wpchangemdb.credit_units)
                    wpchangemdb.change_type = data['ВЫБОР'][i]
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
                    wpinfs_id_str_up.ze_v_sem = data['ЗЕ_В_СЕМЕСТРАХ'][i]
                    wpinfs_id_str_up.lec_v_sem = data['ЛЕК_В_СЕМЕСТРАХ'][i]
                    wpinfs_id_str_up.prak_v_sem = data['ПРАК_В_СЕМЕСТРАХ'][i]
                    wpinfs_id_str_up.lab_v_sem = data['ЛАБ_В_СЕМЕСТРАХ'][i]
                    wpinfs_id_str_up.ekz_v_sem = data['ЭКЗ_ПО_СЕМЕСТРАМ'][i]
                    wpinfs_id_str_up.zach_v_sem = data['ЗАЧЕТ_ПО_СЕМЕСТРАМ'][i]
                    wpinfs_id_str_up.dif_zach_v_sem = data['ДИФ_ЗАЧЕТ_ПО_СЕМЕСТРАМ'][i]
                    wpinfs_id_str_up.kp_v_sem = data['КП_ПО_СЕМЕСТРАМ'][i]
                    wpinfs_id_str_up.save()
                except:
                    print('---- Ошибка с количеством WorkProgramIdStrUpForIsu.id_str_up')
                print('Рабочая программа дисциплины записана в модуль: done')
            except  Exception as e:
                print(e)
                print('Строка ', i, 'не записалась, проверьте на опечатки или пустые значения')
                continue;
        print(f'Записано: Учебные планы:{ap_count}, РПД:{wp_count}, Направления:{fs_count}')
        return Response(status=200)
