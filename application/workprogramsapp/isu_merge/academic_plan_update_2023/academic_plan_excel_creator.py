import mimetypes
import time

import pandas as pd
from django.conf import settings
from workprogramsapp.isu_merge.academic_plan_update_2023.academic_plan_update_utils import AcademicPlanUpdateUtils
from workprogramsapp.isu_merge.academic_plan_update_2023.isu_service import IsuService, IsuUser


class AcademicPlanExcelCreator:
    def __init__(self):
        self.isu_service = IsuService(
                    IsuUser(
                        settings.ISU["ISU_CLIENT_ID"],
                        settings.ISU["ISU_CLIENT_SECRET"]
                    )
                )
        self.excel_file_path = '../application/upload/isu_merge/input_add'

    def create_excel_file(self):

        ids = [10572]
        # AcademicPlanUpdateConfiguration.objects.get().values_list('academic_plan_ids', flat=True)

        academic_plan_df = pd.DataFrame(
            columns=['ИД_УП', 'НС_ИД', 'ШИФР_НАПРАВЛЕНИЯ', 'НАПРАВЛЕНИЕ_ПОДГОТОВКИ', 'ОП_ИД',
                     'ОБРАЗОВАТЕЛЬНАЯ_ПРОГРАММА', 'ФАК_ИД', 'ФАКУЛЬТЕТ', 'ЯЗЫК_ОБУЧЕНИЯ',
                     'ОБЩАЯ_ТРУДОЕМКОСТЬ', 'СРОК_ОБУЧЕНИЯ', 'УРОВЕНЬ_ОБРАЗОВАНИЯ',
                     'ОГНП_ИД', 'ОГНП', 'ГОД_НАБОРА', 'НАИМЕНОВАНИЕ_БЛОКА', 'МОДУЛЬ_ИД',
                     'НАИМЕНОВАНИЕ_МОДУЛЯ', 'ИД_СТР_УП', 'ВЫБОР', 'НОМЕР_ПО_ПЛАНУ',
                     'DISC_DISC_ID', 'ДИС_ИД', 'ДИСЦИПЛИНА', 'ИД_ИСПОЛНИТЕЛЯ_ДИС', 'ИСПОЛНИТЕЛЬ_ДИС',
                     'ЯЗЫК', 'ЭКЗ', 'ДИФ_ЗАЧЕТ', 'ЗАЧЕТ', 'КП',
                     'ЗЕ_В_СЕМЕСТРАХ', 'ЛЕК_В_СЕМЕСТРАХ', 'ПРАК_В_СЕМЕСТРАХ', 'ЛАБ_В_СЕМЕСТРАХ'])

        for academic_plan_id in ids:
            academic_plan_id = str(academic_plan_id)
            academic_plan_json = self.isu_service.get_academic_plan(academic_plan_id)

            line = [
                academic_plan_json['id'],
                academic_plan_json['ns_id'],
                academic_plan_json['direction_code'],
                academic_plan_json['direction_name'],
                academic_plan_json['edu_program_id'],
                academic_plan_json['edu_program_name'],
                academic_plan_json['faculty_id'],
                academic_plan_json['faculty_name'],
                academic_plan_json['lang'],
                academic_plan_json['total_intensity']
            ]
            training_period = int(
                float(
                    academic_plan_json['training_period']
                )
            )
            line.append(training_period)
            if training_period == 4:
                line.append("Академический бакалавр")
            elif training_period == 2:
                line.append("Магистр")
            else:
                line.append("Специалист")
            line.append(academic_plan_json['ognp_id'])
            line.append(academic_plan_json['ognp_name'])
            line.append(academic_plan_json['selection_year'])

            academic_plan_json = pd.DataFrame(academic_plan_json['disciplines_blocks'])

            for row_index, row in academic_plan_json.iterrows():
                lineup = line.copy()
                lineup.append(row[1])
                for modules in row[2]:
                    linemodule = lineup.copy()
                    linemodule.append(modules['module_id '])
                    linemodule.append(modules['module_name'])  # дальше буду  менять
                    for disc in modules['disciplines']:
                        linedisc = linemodule.copy()
                        linedisc.append(disc['str_up_id'])
                        if disc['is_optional']:
                            linedisc.append(1)
                        else:
                            linedisc.append(0)

                        linedisc.append(disc['plan_order'])
                        linedisc.append(disc['disc_id'])
                        linedisc.append(disc['dis_id'])
                        linedisc.append(disc['discipline_name'])
                        linedisc.append(disc['discipline_doer_id'])
                        linedisc.append(disc['discipline_doer'])
                        linedisc.append(disc['discipline_lang'])
                        linedisc.append(disc['exam'])
                        linedisc.append(disc['diff_credit'])
                        linedisc.append(disc['credit'])
                        linedisc.append(disc['course_project'])

                        ze = []
                        for sem in disc['ze']:
                            if sem['points'] is None:
                                ze.append(0)
                            else:
                                ze.append(sem['points'])
                        linedisc.append(tuple(ze))
                        lec = []
                        lab = []
                        practice = []
                        for s in disc['class_points']:
                            if s['lesson'] is None:
                                lec.append(0)
                            else:
                                lec.append(s['lesson'])
                        linedisc.append(tuple(lec))

                        for s in disc['class_points']:
                            if s['practice'] is None:
                                practice.append(0)
                            else:
                                practice.append(s['practice'])
                        linedisc.append(tuple(practice))

                        for s in disc['class_points']:
                            if s['lab'] is None:
                                lab.append(0)
                            else:
                                lab.append(s['lab'])
                        linedisc.append(tuple(lab))
                        academic_plan_df.loc[disc['str_up_id']] = linedisc

        academic_plan_df["ДИСЦИПЛИНА"] = academic_plan_df["ДИСЦИПЛИНА"].apply(AcademicPlanUpdateUtils.clean_text)

        academic_plan_df["МОДУЛЬ"] = academic_plan_df.apply(lambda row: AcademicPlanUpdateUtils().set_module(
            row["НАИМЕНОВАНИЕ_МОДУЛЯ"],
            row["НАИМЕНОВАНИЕ_БЛОКА"],
            row["НОМЕР_ПО_ПЛАНУ"]
        ), axis=1
                                                            )

        academic_plan_df["НОМЕР"] = academic_plan_df.apply(lambda row: AcademicPlanUpdateUtils.num_to_int(
            row["НОМЕР_ПО_ПЛАНУ"], row["ДИСЦИПЛИНА"]
        ), axis=1
                                                           )

        academic_plan_df["ЭКЗ_ПО_СЕМЕСТРАМ"] = academic_plan_df.apply(lambda row: AcademicPlanUpdateUtils.set_control(
            row["ЭКЗ"],
            row["СРОК_ОБУЧЕНИЯ"]
        ), axis=1
                                                                      )

        academic_plan_df["ЗАЧЕТ_ПО_СЕМЕСТРАМ"] = academic_plan_df.apply(lambda row: AcademicPlanUpdateUtils.set_control(
            row["ЗАЧЕТ"], row["СРОК_ОБУЧЕНИЯ"]
        ), axis=1
                                                                        )

        academic_plan_df["ДИФ_ЗАЧЕТ_ПО_СЕМЕСТРАМ"] = academic_plan_df.apply(
            lambda row: AcademicPlanUpdateUtils.set_control(
                row["ДИФ_ЗАЧЕТ"],
                row["СРОК_ОБУЧЕНИЯ"]
            ), axis=1
        )

        academic_plan_df["КП_ПО_СЕМЕСТРАМ"] = academic_plan_df.apply(lambda row: AcademicPlanUpdateUtils.set_control(
            row["КП"],
            row["СРОК_ОБУЧЕНИЯ"]
        ), axis=1
                                                                     )

        academic_plan_df["СРС_СТАТУС"] = academic_plan_df.apply(lambda row: AcademicPlanUpdateUtils.hours_status(
            row["ЗЕ_В_СЕМЕСТРАХ"],
            row["ЛЕК_В_СЕМЕСТРАХ"],
            row["ПРАК_В_СЕМЕСТРАХ"],
            row["ЛАБ_В_СЕМЕСТРАХ"]), axis=1
                                                                )

        academic_plan_df["СРС"] = academic_plan_df.apply(lambda row: AcademicPlanUpdateUtils.set_srs(
            row["СРС_СТАТУС"],
            row["ЗЕ_В_СЕМЕСТРАХ"],
            row["ЛЕК_В_СЕМЕСТРАХ"],
            row["ПРАК_В_СЕМЕСТРАХ"],
            row["ЛАБ_В_СЕМЕСТРАХ"],
            row["МОДУЛЬ"]
        ),
                                                         axis=1
                                                         )

        academic_plan_df = academic_plan_df.drop(["НОМЕР_ПО_ПЛАНУ", "СРОК_ОБУЧЕНИЯ"], axis=1)

        date_time = time.strftime("%Y%m%d-%H%M%S")
        academic_plan_df.to_excel(self.excel_file_path + date_time + '.xlsx')

        mime_type, _ = mimetypes.guess_type(self.excel_file_path)

        return self.excel_file_path + date_time + '.xlsx', mime_type
