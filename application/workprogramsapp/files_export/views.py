import datetime
import json
import os
from pathlib import Path

from drf_yasg2 import openapi
from drf_yasg2.utils import swagger_auto_schema
from openpyxl.writer.excel import save_virtual_workbook
from rest_framework import generics, viewsets
from docxtpl import DocxTemplate, RichText
from django.http import HttpResponse
from collections import OrderedDict

from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
import html2text
from rest_framework.response import Response
from rest_framework.views import APIView

from dataprocessing.serializers import FileUploadSerializer
from .academic_plan_export import process_excel
from .competence_matrix_export import process_excel_competence_matrix
from .general_characteristic_export import generate_context
from .plan_logic import plans_processor
from ..models import AcademicPlan, Zun, WorkProgramInFieldOfStudy, FieldOfStudy, WorkProgram, \
    ImplementationAcademicPlan, WorkProgramChangeInDisciplineBlockModule, GeneralCharacteristics
from ..serializers import WorkProgramSerializer
from rest_framework import generics
import re
from docx import Document

"""Скачивание рпд в формате docx/pdf"""


def get_hours(hour_str: str):
    hours_list = hour_str.split(",")
    return [round(float(el), 2) for el in hours_list]


def hours_v2_generator(lec_v2, prac_v2, sro_v2, lab_v2):
    hours_lec_v2 = get_hours(lec_v2)
    hours_prac_v2 = get_hours(prac_v2)
    hours_sro_v2 = get_hours(sro_v2)
    hours_lab_v2 = get_hours(lab_v2)

    for i in range(0, 12):
        yield [hours_lec_v2[i], hours_prac_v2[i], hours_sro_v2[i], hours_lab_v2[i]]


def render_context(context, **kwargs):
    """ Функция, которая возвращает context с параметрами для шаблона """
    fs_obj = FieldOfStudy.objects.get(pk=kwargs['field_of_study_id'])
    ap_obj = AcademicPlan.objects.get(pk=kwargs['academic_plan_id'])
    semester = []
    for wpcb in context['work_program_in_change_block']:
        credit_units_list = []
        if wpcb['discipline_block_module']['descipline_block'] is not None:
            try:
                is_included = False
                for ap_blocks in wpcb['discipline_block_module']['descipline_block']:
                    if ap_blocks['academic_plan']['id'] == ap_obj.id:
                        is_included = True
                        break
                if is_included:
                    wpcb_pk = wpcb['id']
                    if wpcb['credit_units'] != None:
                        wpcb['credit_units'] = wpcb['credit_units'].replace(' ', '').replace('.0', '')
                        for cu in range(0, 16, 2):
                            if list(wpcb['credit_units'][cu]) != 0:
                                credit_units_list.append(wpcb['credit_units'][cu])
                        hours_getter = hours_v2_generator(context["lecture_hours_v2"], context["practice_hours_v2"],
                                                          context["srs_hours_v2"], context["lab_hours_v2"])
                        for cu in credit_units_list:
                            try:
                                if int(float(cu)) != 0:
                                    hours_list = next(hours_getter)
                                    contact_hours = round((hours_list[0] + hours_list[1] + hours_list[3]) * 1.1, 2)
                                    semester.append({'s': credit_units_list.index(cu) + 1, 'c': cu, 'h': int(cu) * 36,
                                                     "lc_h": hours_list[0], "pc_h": hours_list[1], "sr_h": hours_list[2],
                                                     "lb_h": hours_list[3], "cnt_h": contact_hours})
                                credit_units_list[credit_units_list.index(cu)] = 0
                            except:
                                pass
                    else:
                        term_to_append = wpcb["semester_start"][0]
                        hours_getter = hours_v2_generator(context["lecture_hours_v2"], context["practice_hours_v2"],
                                                          context["srs_hours_v2"], context["lab_hours_v2"])
                        credit_units_list = get_hours(context["ze_v_sem"])
                        for cu in credit_units_list:
                            if int(float(cu)) != 0:
                                hours_list = next(hours_getter)
                                contact_hours = round((hours_list[0] + hours_list[1] + hours_list[3]) * 1.1, 2)
                                semester.append({'s': credit_units_list.index(cu) + term_to_append, 'c': cu, 'h': int(cu) * 36,
                                                 "lc_h": hours_list[0], "pc_h": hours_list[1], "sr_h": hours_list[2],
                                                 "lb_h": hours_list[3], "cnt_h": contact_hours})
                            credit_units_list[credit_units_list.index(cu)] = 0

            except:
                pass

    try:
        semester = semester[:context["number_of_semesters"]]
    except KeyError:
        # По идее надо что-то сделать с циклом по блокмодулям
        # Но я не знаю какая логика задумывалась изначально в цикле выше с ними, поэтому будет так
        pass

    wp_in_fs = WorkProgramInFieldOfStudy.objects.get(work_program_change_in_discipline_block_module__id=wpcb_pk,
                                                     work_program__id=context['id'])
    zun_obj = Zun.objects.filter(wp_in_fs=wp_in_fs)
    tbl_competence = []
    for z in zun_obj:
        if z.indicator_in_zun:
            tbl_competence.append(
                {'competence': str(z.indicator_in_zun.competence.number) + ' ' + str(
                    z.indicator_in_zun.competence.name),
                 'indicator': str(z.indicator_in_zun.number) + ' ' + str(z.indicator_in_zun.name),
                 'knowledge': z.knowledge, "skills": z.skills, "attainments": z.attainments})
    contact_work, lecture_classes, laboratory, practical_lessons, SRO, total_hours = 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
    all_contact_work, all_lecture_classes, all_laboratory, all_practical_lessons, all_SRO, all_total_hours = 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
    online_sections, url_online_course, evaluation_tools = [], [], []
    online_list_number = 0

    if context['number_of_semesters'] == 0:
        context['number_of_semesters'] = 1
    for i in context['discipline_sections']:
        print(context['discipline_sections'])
        online_names, topics_list = [], []
        if i['contact_work'] is None:
            i['contact_work'] = ''
        else:
            contact_work += float(i['contact_work']) / context['number_of_semesters']
            all_contact_work += float(i['contact_work'])
        if i['lecture_classes'] is None:
            i['lecture_classes'] = ''
        else:
            lecture_classes += float(i['lecture_classes']) / context['number_of_semesters']
            all_lecture_classes += float(i['lecture_classes'])
        if i['laboratory'] is None:
            i['laboratory'] = ''
        else:
            laboratory += float(i['laboratory']) / context['number_of_semesters']
            all_laboratory += float(i['laboratory'])
        if i['practical_lessons'] is None:
            i['practical_lessons'] = ''
        else:
            practical_lessons += float(i['practical_lessons']) / context['number_of_semesters']
            all_practical_lessons += float(i['practical_lessons'])
        if i['SRO'] is None:
            i['SRO'] = ''
        else:
            SRO += float(i['SRO']) / context['number_of_semesters']
            all_SRO += float(i['SRO']) / context['number_of_semesters']
        total_hours += 0.0 if i['total_hours'] is None else float(i['total_hours']) / context['number_of_semesters']
        all_total_hours += 0.0 if i['total_hours'] is None else float(i['total_hours'])
        for ev_tool in i['evaluation_tools']:
            if ev_tool not in evaluation_tools:
                evaluation_tools.append(ev_tool)
        for j in i['topics']:
            topics_list.append(j['description'])
            if j['url_online_course'] is None:
                pass
            else:
                online_sections.append(i['ordinal_number'])
                print('online_sections', online_sections)
                online_list_number += 1
                online_names.append(
                    '{} (url: {})'.format(j['url_online_course']['title'], j['url_online_course']['external_url']))
                if j['url_online_course'] not in url_online_course:
                    url_online_course.append(j['url_online_course'])
        i['online_list'] = ', '.join(map(str, set(online_names)))
        i['topics_list'] = ', '.join(map(str, set(topics_list)))
    template_context = OrderedDict()
    template_context['title'] = context['title']
    template_context['field_of_study_code'] = fs_obj.number
    template_context['field_of_study'] = fs_obj.title
    if context['qualification'] == 'bachelor':
        template_context['QUALIFICATION'] = 'БАКАЛАВР'
    elif context['qualification'] == 'master':
        template_context['QUALIFICATION'] = 'МАГИСТР'
    else:
        template_context['QUALIFICATION'] = 'ИНЖЕНЕР'
    template_context['academic_plan'] = str(
        ImplementationAcademicPlan.objects.filter(academic_plan__id=ap_obj.id)[0].title) + ' (' + \
                                        str(FieldOfStudy.objects.filter(
                                            implementation_academic_plan_in_field_of_study__academic_plan__id=ap_obj.id)[0].number) + ')'
    template_context['semester'] = semester
    template_context['total_hours_1'] = [round(contact_work, 2), round(lecture_classes, 2), round(laboratory, 2),
                                         round(practical_lessons, 2), round(SRO, 2)]
    template_context['year'] = kwargs['year']
    if context['authors'] is None:
        template_context['author'] = ''
        template_context['authors'] = ''
    else:
        template_context['author'] = context['authors']
        template_context['authors'] = context['authors'].split(', ')
    template_context['tbl_competence'] = tbl_competence
    template_context['total_hours'] = [contact_work, lecture_classes, laboratory, practical_lessons, SRO, total_hours]
    print('ff', all_laboratory)
    template_context['all_total_hours'] = [round(el, 2) for el in
                                           [all_contact_work, all_lecture_classes, all_laboratory,
                                            all_practical_lessons, all_SRO, all_total_hours]]
    template_context['is_no_online'] = True if online_sections == 0 else False
    template_context['is_online'] = True if online_sections else False
    template_context['X'] = 'X'
    template_context['sections_online'] = ', '.join(map(str, set(online_sections)))
    template_context['sections_replaced_onl'] = ''
    online_list_number_list = ''
    for i in range(1, online_list_number + 1):
        online_list_number_list = online_list_number_list + '{}'.format(str(i))
        if int(i) != int(online_list_number):
            online_list_number_list = online_list_number_list + ', '
    template_context['online_list_number_list'] = online_list_number_list
    template_context['bibliographic_reference'] = context['bibliographic_reference']
    for bib in template_context['bibliographic_reference']:
        if bib['description']:
            bib['description'] = re.sub('<[^>]*>', '', str(bib['description']).replace("<", ""))
        else:
            bib['description'] = re.sub('<[^>]*>', '', str(bib['bib_reference']).replace("<", ""))
    template_context['online_course'] = url_online_course
    template_context['evaluation_tools'] = evaluation_tools
    filename = str(fs_obj.number) + '_' + str(context['discipline_code']) + '_' + str(
        context['qualification']) + '_' + str(kwargs['year']) + '_' + datetime.datetime.today().strftime(
        "%Y-%m-%d-%H.%M.%S") + '.docx'
    # filename = "РПД «" + context["title"] + "» " + context["discipline_code"]
    """Данные для таблицы планирования результатов обучения по дисциплине (БаРС)"""
    outcomes_evaluation_tool = []
    current_evaluation_tool = []
    evaluation_tool_semester_1 = []
    evaluation_tool_semester_2 = []
    evaluation_tool_semester_3 = []
    evaluation_tool_semester_4 = []
    items_max_semester_1 = []
    items_min_semester_1 = []
    items_max_semester_2 = []
    items_min_semester_2 = []
    items_max_semester_3 = []
    items_min_semester_3 = []
    items_max_semester_4 = []
    items_min_semester_4 = []
    k = 0
    for i in template_context['evaluation_tools']:
        i['description'] = ''
        i['url'] = 'https://op.itmo.ru/work-program/{}/evaluation-tools/{}'.format(context['id'], i['id'])
        tpl
        rt = RichText()
        rt.add('Ссылка на описание оценочного средства', url_id=tpl.build_url_id(
            'https://op.itmo.ru/work-program/{}/evaluation-tools/{}'.format(context['id'], i['id'])))
        i['url'] = rt
        if i['semester'] == 1:
            evaluation_tool_semester_1.append(i)
            if i['max'] is not None:
                items_max_semester_1.append(i['max'])
            if i['min'] is not None:
                items_min_semester_1.append(i['min'])
        elif i['semester'] == 2:
            evaluation_tool_semester_2.append(i)
            if i['max'] is not None:
                items_max_semester_2.append(i['max'])
            if i['min'] is not None:
                items_min_semester_2.append(i['min'])
        elif i['semester'] == 3:
            evaluation_tool_semester_3.append(i)
            if i['max'] is not None:
                items_max_semester_3.append(i['max'])
            if i['min'] is not None:
                items_min_semester_3.append(i['min'])
        elif i['semester'] == 4:
            evaluation_tool_semester_4.append(i)
            if i['max'] is not None:
                items_max_semester_4.append(i['max'])
            if i['min'] is not None:
                items_min_semester_4.append(i['min'])
        else:
            pass
    template_context['evaluation_tool_semester_1'] = evaluation_tool_semester_1
    template_context['evaluation_tool_semester_2'] = evaluation_tool_semester_2
    template_context['evaluation_tool_semester_3'] = evaluation_tool_semester_3
    template_context['evaluation_tool_semester_4'] = evaluation_tool_semester_4
    template_context['outcomes_evaluation_tool'] = outcomes_evaluation_tool
    template_context['current_evaluation_tool'] = current_evaluation_tool
    certification_evaluation_tools_semestr_1 = []
    certification_evaluation_tools_semestr_2 = []
    certification_evaluation_tools_semestr_3 = []
    certification_evaluation_tools_semestr_4 = []
    template_context['control_types_in_semester'] = ['', '', '', '']
    for item in context['certification_evaluation_tools']:
        try:
            item['url'] = 'https://op.itmo.ru/work-program/{}/intermediate-certification/{}'.format(context['id'],
                                                                                                    item['id'])
            rt = RichText()
            rt.add('Ссылка на описание оценочного средства', url_id=tpl.build_url_id(
                'https://op.itmo.ru/work-program/{}/intermediate-certification/{}'.format(context['id'], item['id'])))
            item['url'] = rt
            try:
                item['description'] = html2text.html2text(item['description'])
            except AttributeError:
                item['description'] = None
            if item['type'] == '1':
                item['type'] = 'Экзамен'
            elif item['type'] == '2':
                item['type'] = 'Дифференцированный зачет'
            elif item['type'] == '3':
                item['type'] = 'Зачет'
            elif item['type'] == '4':
                item['type'] = 'Курсовая работа'
            elif item['type'] == '5':
                item['type'] = 'Курсовой проект'
            item['description'] = ''
            if semester[item['semester'] - 1].get('t'):
                semester[item['semester'] - 1]['t'] += ", " + item['type']
            else:
                semester[item['semester'] - 1]['t'] = item['type']

            if item['semester'] == 1:
                if item['max'] is not None:
                    items_max_semester_1.append(item['max'])
                if item['min'] is not None:
                    items_min_semester_1.append(item['min'])
                certification_evaluation_tools_semestr_1.append(item)
                #semester[0]['t'] = item['type']
            if item['semester'] == 2:
                if item['max'] is not None:
                    items_max_semester_2.append(item['max'])
                if item['min'] is not None:
                    items_min_semester_2.append(item['min'])
                certification_evaluation_tools_semestr_2.append(item)
                #semester[1]['t'] = item['type']
            if item['semester'] == 3:
                if item['max'] is not None:
                    items_max_semester_3.append(item['max'])
                if item['min'] is not None:
                    items_min_semester_3.append(item['min'])
                certification_evaluation_tools_semestr_3.append(item)
                #semester[2]['t'] = item['type']
            if item['semester'] == 4:
                if item['max'] is not None:
                    items_max_semester_4.append(item['max'])
                if item['min'] is not None:
                    items_min_semester_4.append(item['min'])
                certification_evaluation_tools_semestr_4.append(item)
                #semester[3]['t'] = item['type']
            else:
                pass
        except Exception as e:
            print(e)
    template_context['certification_evaluation_tools_semestr_1'] = certification_evaluation_tools_semestr_1
    template_context['certification_evaluation_tools_semestr_2'] = certification_evaluation_tools_semestr_2
    template_context['certification_evaluation_tools_semestr_3'] = certification_evaluation_tools_semestr_3
    template_context['certification_evaluation_tools_semestr_4'] = certification_evaluation_tools_semestr_4
    try:
        template_context['outcomes_max_all_semester_1'] = sum(items_max_semester_1) + int(context['extra_points'] or 0)
        template_context['outcomes_max_all_semester_2'] = sum(items_max_semester_2) + int(context['extra_points'] or 0)
        template_context['outcomes_max_all_semester_3'] = sum(items_max_semester_3) + int(context['extra_points'] or 0)
        template_context['outcomes_max_all_semester_4'] = sum(items_max_semester_4) + int(context['extra_points'] or 0)
    except:
        pass
    template_context['outcomes_min_all_semester_1'] = sum(items_min_semester_1)
    template_context['outcomes_min_all_semester_2'] = sum(items_min_semester_2)
    template_context['outcomes_min_all_semester_3'] = sum(items_min_semester_3)
    template_context['outcomes_min_all_semester_4'] = sum(items_min_semester_4)
    template_context['extra_points'] = context['extra_points']
    template_context['discipline_section'] = context['discipline_sections']
    template_context['bars'] = context["bars"]
    print('bib', template_context['bibliographic_reference'])
    print(semester)
    return template_context, filename
    # , evaluation_tools_pdf_docs


"""Контроллер для выгрузки docx-файла РПД"""


class DocxFileExportView(generics.ListAPIView):
    """
    Возвращает РПД в формате docx в браузере
    """
    queryset = WorkProgram.objects.all()
    serializer = WorkProgramSerializer
    permission_classes = [AllowAny]

    def combine_word_documents(self, filename, files):
        new_files_array = []
        new_files_array.append(filename)
        for file in files:
            new_files_array.append(file)

        merged_document = Document()

        for index, file in enumerate(new_files_array):
            sub_doc = Document(file)

            # Don't add a page break if you've reached the last file.
            if index < len(files) - 1:
                sub_doc.add_page_break()

            for element in sub_doc.element.body:
                merged_document.element.body.append(element)

        merged_document.save('upload/merged.docx')

    def get(self, request, *args, **kwargs):
        global tpl
        tpl = DocxTemplate('/application/static-backend/export_template/RPD_shablon_2020_new.docx')
        queryset = WorkProgram.objects.get(pk=kwargs['pk'])
        serializer = WorkProgramSerializer(queryset)
        data = dict(serializer.data)
        context, filename = render_context(data, field_of_study_id=kwargs['fs_id'],
                                           academic_plan_id=kwargs['ap_id'], year=kwargs['year'])
        tpl.render(context)
        tpl.save('upload/' + str(filename))  # -- сохранение в папку локально (нужно указать актуальный путь!)
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'inline; filename="%s"' % filename

        tpl.save(response)
        return response


def render_context_syllabus(context, **kwargs):
    """ Функция, которая возвращает context с параметрами для шаблона """
    fs_obj = FieldOfStudy.objects.get(pk=kwargs['field_of_study_id'])
    ap_obj = AcademicPlan.objects.get(pk=kwargs['academic_plan_id'])
    try:
        for wpcb in context['work_program_in_change_block']:
            if wpcb['discipline_block_module']['descipline_block']['academic_plan'][
                'educational_profile'] == ap_obj.educational_profile:
                semester = [(i, wpcb['credit_units'][i], wpcb['change_type']) for i in range(len(wpcb['credit_units']))
                            if wpcb['credit_units'] if wpcb['credit_units'][i] != 0]
    except:
        semester = [('-', '-', ' ')]

    template_context = OrderedDict()
    if context['qualification'] == 'bachelor':
        template_context['Qualification'] = 'Бакалавриат'
    elif context['qualification'] == 'master':
        template_context['Qualification'] = 'Магистратура'
    else:
        template_context['Qualification'] = 'Специалитет'

    template_context['Name'] = context['title']
    # template_context['status'] = context['work_program_in_change_block']['change_type']
    template_context['fs_code'] = str(fs_obj.number) + ' ' + str(fs_obj.title)
    template_context['academic_plan'] = ap_obj.educational_profile
    template_context['semester'] = semester[0][0]
    template_context['credit'] = semester[0][1]
    template_context['author'] = context['authors']
    template_context['description'] = context['description']
    template_context['prerequisites'] = ', '.join(map(str, [i['item']['name'] for i in context['prerequisites']]))
    template_context['outcomes'] = ', '.join(map(str, [i['item']['name'] for i in context['outcomes']]))
    template_context['concurent'] = '-'
    template_context['discipline_section'] = context['discipline_sections']
    evaluation_tools, temp = [], []
    for i in context['discipline_sections']:
        for tool in i['evaluation_tools']:
            if tool['type'] not in evaluation_tools:
                evaluation_tools.append(tool['type'])
        i['topics_list'] = '. '.join(map(str, set([j['description'] for j in i['topics']])))

    template_context['evaluation_tools'] = evaluation_tools

    template_context['bibliographic_reference'] = re.sub('<[^>]*>', '',
                                                         str(context['bibliographic_reference']))
    filename = 'Syllabus_' + str(context['title']) + str(kwargs['year']) + '.docx'
    print('bib', template_context['bibliographic_reference'])

    return template_context, filename


class SyllabusExportView(generics.ListAPIView):
    """Возвращает РПД в формате docx в браузере"""
    queryset = WorkProgram.objects.all()
    serializer = WorkProgramSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        tpl = DocxTemplate('/application/static-backend/export_template/Syllabus_shablon_2020_new.docx')
        queryset = WorkProgram.objects.get(pk=kwargs['pk'])
        serializer = WorkProgramSerializer(queryset)
        data = dict(serializer.data)

        context, filename = render_context_syllabus(data, field_of_study_id=kwargs['fs_id'],
                                                    academic_plan_id=kwargs['ap_id'], year=kwargs['year'])
        tpl.render(context)
        print(context["bibliographic_reference"])
        # tpl.save('/application/upload/'+filename) #-- сохранение в папку локально (нужно указать актуальный путь!)

        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'inline; filename="%s"' % str(filename)

        tpl.save(response)

        return response

# http://127.0.0.1:8000/api/export/academic_plan/7767
class AcademicPlanGenerateXlsx(generics.ListAPIView):
    """Возвращает РПД в формате docx в браузере"""
    queryset = WorkProgram.objects.all()
    serializer = WorkProgramSerializer
    #permission_classes = [IsAuthenticated, ]
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        academic_plan = AcademicPlan.objects.get(pk=kwargs['pk'])
        imp = ImplementationAcademicPlan.objects.filter(academic_plan=academic_plan).order_by("-id")[0]
        fos = imp.field_of_study.all()[0]
        filename = f"{fos.number} {fos.title}.xlsx"
        wb_obj, errors = process_excel(academic_plan)
        response = HttpResponse(content=save_virtual_workbook(wb_obj),
                                content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        response['Content-Disposition'] = 'inline; filename="%s"' % str(filename)
        academic_plan.excel_generation_errors = errors
        academic_plan.save()


        # wb_obj.save(response)
        return response


class GeneralCharacteristicGenerateDocx(generics.ListAPIView):
    """Возвращает ОХ в формате docx в браузере"""
    queryset = WorkProgram.objects.all()
    serializer = WorkProgramSerializer
    # permission_classes = [IsAuthenticated, ]
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        gh = GeneralCharacteristics.objects.get(id=kwargs['pk'])
        # tpl = DocxTemplate( "C:\\Users\\123\\Desktop\\analitycs\\analytics_backend\\application\\workprogramsapp\\files_export\\oh_template.docx")
        tpl = DocxTemplate("/application/static-backend/export_template/oh_template_2023.docx")
        context = generate_context(gh)
        tpl.render(context)
        filename = f"ОХ_{context['year']}_{context['op_name']}.docx"
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'inline; filename="%s"' % str(filename)

        tpl.save(response)

        return response


class CompetenceMatrixGenerateExcel(generics.ListAPIView):
    """Возвращает матрицу компетенций в формате excel в браузере"""
    queryset = WorkProgram.objects.all()
    serializer = WorkProgramSerializer
    #permission_classes = [IsAuthenticated, ]
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        gen_characteristic = GeneralCharacteristics.objects.get(pk=kwargs['pk'])
        filename = gen_characteristic.educational_program.all()[0].title + " " + str(
            gen_characteristic.educational_program.all()[0].year)
        wb_obj = process_excel_competence_matrix(gen_characteristic)
        response = HttpResponse(content=save_virtual_workbook(wb_obj),
                                content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        response['Content-Disposition'] = 'inline; filename="%s"' % str(filename)


        # wb_obj.save(response)
        return response


@api_view(['POST'])
@permission_classes((IsAdminUser,))
def UploadPlans(request):
    """
    Метод принимает xlsx-файл с планами 2023 года
    """
    file = request.FILES["plans"]
    print(file)
    return Response(plans_processor(file))


class UploadPlansAPIView(CreateAPIView):
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(operation_description='Создание ОП по xlsx-файлу  c ОП 2023 года',
                         manual_parameters=[openapi.Parameter('plans', openapi.IN_FORM, type=openapi.TYPE_FILE,
                                                              description='xlsx-файл')])
    @action(detail=False, methods=['post'])
    def post(self, request, **kwargs):
        file = request.FILES["plans"]
        print(file)
        return Response(status=201, data={"rows_passed": plans_processor(file)})
