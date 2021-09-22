import datetime
from rest_framework import generics, viewsets
from docxtpl import DocxTemplate, RichText
from django.http import HttpResponse
from collections import OrderedDict
from rest_framework.permissions import IsAuthenticated, AllowAny
import html2text
from ..models import AcademicPlan, Zun, WorkProgramInFieldOfStudy, FieldOfStudy, WorkProgram, \
    ImplementationAcademicPlan, WorkProgramChangeInDisciplineBlockModule
from ..serializers import WorkProgramSerializer
from rest_framework import generics
# from GrabzIt import GrabzItDOCXOptions
# from GrabzIt import GrabzItClient
# import pypandoc
# import os
# import pdfkit
# import codecs
# import os
# from pdf2docx import parse
# from pdf2docx import Converter
# from docx import Document
#
# import PyPDF2
# import os
# import docx
# import lxml.html
# import lxml.html.clean
from docx import Document
"""Скачивание рпд в формате docx/pdf"""


def render_context(context, **kwargs):
    """ Функция, которая возвращает context с параметрами для шаблона """
    fs_obj = FieldOfStudy.objects.get(pk=kwargs['field_of_study_id'])
    ap_obj = AcademicPlan.objects.get(pk=kwargs['academic_plan_id'])
    print(context['work_program_in_change_block'])
    #try:
    for wpcb in context['work_program_in_change_block']:
        print(wpcb['credit_units'])
        # print(wpcb['discipline_block_module']['descipline_block'][0]['academic_plan']['id'])
        # print(wpcb['discipline_block_module']['descipline_block']['academic_plan'])
        # print(WorkProgramChangeInDisciplineBlockModule.objects.filter(id = wpcb['id']))
        #if wpcb['discipline_block_module']['descipline_block']['academic_plan']['id'] == ap_obj.id:
        credit_units_list = []
        semester = []
        if wpcb['discipline_block_module']['descipline_block'][0]['academic_plan']['id'] == ap_obj.id:
            wpcb_pk = wpcb['id']
            print('credit units', wpcb['credit_units'])
            # semester = [{'s': i, 'c': wpcb['credit_units'][i]} for i in range(len(wpcb['credit_units'])) if
            #             wpcb['credit_units'] if wpcb['credit_units'][i] != 0]
            wpcb['credit_units'] = wpcb['credit_units'].replace(' ', '').replace('.0', '')
            print(wpcb['credit_units'])
            for cu in range (0, 16, 2):
                if list(wpcb['credit_units'][cu]) != 0:
                    credit_units_list.append(wpcb['credit_units'][cu])
            print('credit_units_list', credit_units_list)
            for cu in credit_units_list:
                print('cu', cu)
                try:
                    if int(float(cu)) != 0:
                        print('cicle cu', cu)
                        print('nomer semestra', credit_units_list.index(cu)+1)
                        semester.append({'s': credit_units_list.index(cu)+1, 'c': cu, 'h': int(cu) * 36})
                    credit_units_list[credit_units_list.index(cu)] = 0
                except:
                    pass
            print(semester)
            # try:
            #     for cu in credit_units_list:
            #         print(cu)
            #         if int(float(cu)) != 0:
            #             semester.append({'s': credit_units_list.index(cu)+1, 'c': cu})
            # except:
            #     pass
    # except:
    #     semester = [{'s': '-', 'c': '-', 'h': '-', 'e': '-'}]
    #     wpcb_pk = context['work_program_in_change_block'][0]['id']
    wp_in_fs = WorkProgramInFieldOfStudy.objects.get(work_program_change_in_discipline_block_module__id=wpcb_pk,
                                                     work_program__id=context['id'])
    zun_obj = Zun.objects.filter(wp_in_fs=wp_in_fs)
    tbl_competence = []
    for z in zun_obj:
        outcomes = [o.item.name for o in z.items.all()]
        tbl_competence.append(
            {'competence': str(z.indicator_in_zun.competence.number) + ' ' + str(z.indicator_in_zun.competence.name),
             'indicator': str(z.indicator_in_zun.number) + ' ' + str(z.indicator_in_zun.name),
             'outcomes': ', '.join(map(str, set(outcomes)))})
    contact_work, lecture_classes, laboratory, practical_lessons, SRO, total_hours = 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
    online_sections, url_online_course, evaluation_tools = [], [], []
    online_list_number = 0

    for i in context['discipline_sections']:
        online_names, topics_list = [], []
        if i['contact_work'] is None:
            i['contact_work'] = ''
        else:
            contact_work += float(i['contact_work'])/context['number_of_semesters']
        if i['lecture_classes'] is None:
            i['lecture_classes'] = ''
        else:
            lecture_classes += float(i['lecture_classes'])/context['number_of_semesters']
        if i['laboratory'] is None:
            i['laboratory'] = ''
        else:
            laboratory += float(i['laboratory'])/context['number_of_semesters']
        if i['practical_lessons'] is None:
            i['practical_lessons'] = ''
        else:
            practical_lessons += float(i['practical_lessons'])/context['number_of_semesters']
        if i['SRO'] is None:
            i['SRO'] = ''
        else:
            SRO += float(i['SRO'])/context['number_of_semesters']
        total_hours += 0.0 if i['total_hours'] is None else float(i['total_hours'])/context['number_of_semesters']
        # if i['evaluation_tools'] not in evaluation_tools:
        #     i['evaluation_tools']['description'] = ''
        #     evaluation_tools.extend(i['evaluation_tools'])
        for ev_tool in i['evaluation_tools']:
            if ev_tool not in evaluation_tools:
                #ev_tool['description'] = ''
                evaluation_tools.append(ev_tool)
        #('evaluation_tools', evaluation_tools)

        for j in i['topics']:
            topics_list.append(j['description'])
            if j['url_online_course'] is None:
                pass
            else:
                online_sections.append(i['ordinal_number'])
                print('online_sections', online_sections)
                online_list_number +=1
                online_names.append('{} (url: {})'.format(j['url_online_course']['title'], j['url_online_course']['external_url']))
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

    #template_context['academic_plan'] = ap_obj.academic_plan_in_field_of_study
    template_context['academic_plan'] = str(ImplementationAcademicPlan.objects.get(academic_plan__id = ap_obj.id).title) + ' (' + \
                                        str(FieldOfStudy.objects.get(implementation_academic_plan_in_field_of_study__academic_plan__id = ap_obj.id).number) + ')'
    template_context['semester'] = semester
    template_context['total_hours_1'] = [contact_work, lecture_classes, laboratory, practical_lessons, SRO]
    print(template_context['total_hours_1'])
    template_context['year'] = kwargs['year']
    if context['authors'] is None:
        template_context['author'] = ''
        template_context['authors'] = ''
    else:
        template_context['author'] = context['authors']
        template_context['authors'] = context['authors'].split(', ')
    template_context['tbl_competence'] = tbl_competence
    template_context['total_hours'] = [contact_work, lecture_classes, laboratory, practical_lessons, SRO, total_hours]
    template_context['is_no_online'] = True if online_sections == 0 else False
    template_context['is_online'] = False if online_sections == 0 else True
    template_context['X'] = 'X'
    template_context['sections_online'] = ', '.join(map(str, set(online_sections)))
    template_context['sections_replaced_onl'] = ''
    online_list_number_list = ''
    for i in range(1, online_list_number+1):
        online_list_number_list = online_list_number_list + '{}'.format(str(i))
        if int(i) != int(online_list_number):
            online_list_number_list = online_list_number_list + ', '
    print('online_list_number_list', online_list_number, online_list_number_list)
    template_context['online_list_number_list'] = online_list_number_list
    template_context['bibliographic_reference'] = context['bibliographic_reference']
    template_context['online_course'] = url_online_course
    template_context['evaluation_tools'] = evaluation_tools
    filename = str(fs_obj.number) + '_' + str(context['discipline_code']) + '_' + str(
        context['qualification']) + '_' + str(kwargs['year']) + '_' + datetime.datetime.today().strftime(
        "%Y-%m-%d-%H.%M.%S") + '.docx'
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
    k=0
    evaluation_tools_pdf_docs = []
    #print('tooools', template_context['evaluation_tools'])
    for i in template_context['evaluation_tools']:
        i['description'] = ''
        i['url']= 'https://op.itmo.ru/work-program/{}/evaluation-tools/{}'.format(context['id'], i['id'])
        tpl
        rt = RichText()
        rt.add('Ссылка на описание оценочного средства', url_id=tpl.build_url_id('https://op.itmo.ru/work-program/{}/evaluation-tools/{}'.format(context['id'], i['id'])))
        i['url'] = rt
        print('name', i['name'])
        if i['semester'] == 1:
            evaluation_tool_semester_1.append(i)
            if i['max'] is not None:
                items_max_semester_1.append(i['max'])
            if i['min'] is not None:
                items_min_semester_1.append(i['min'])
        if i['semester'] == 2:
            evaluation_tool_semester_2.append(i)
            if i['max'] is not None:
                items_max_semester_2.append(i['max'])
            if i['min'] is not None:
                items_min_semester_2.append(i['min'])
        if i['semester'] == 3:
            evaluation_tool_semester_3.append(i)
            if i['max'] is not None:
                items_max_semester_3.append(i['max'])
            if i['min'] is not None:
                items_min_semester_3.append(i['min'])
        if i['semester'] == 2:
            evaluation_tool_semester_4.append(i)
            if i['max'] is not None:
                items_max_semester_4.append(i['max'])
            if i['min'] is not None:
                items_min_semester_4.append(i['min'])
        else:
            pass
    #print('semesters', evaluation_tool_semester_1)
    #print('semesters___2', evaluation_tool_semester_2)
    template_context['evaluation_tool_semester_1'] = evaluation_tool_semester_1
    template_context['evaluation_tool_semester_2'] = evaluation_tool_semester_2
    template_context['evaluation_tool_semester_3'] = evaluation_tool_semester_1
    template_context['evaluation_tool_semester_4'] = evaluation_tool_semester_2
    template_context['outcomes_evaluation_tool'] = outcomes_evaluation_tool
    template_context['current_evaluation_tool'] = current_evaluation_tool
    certification_evaluation_tools_semestr_1 = []
    certification_evaluation_tools_semestr_2 = []
    certification_evaluation_tools_semestr_3 = []
    certification_evaluation_tools_semestr_4 = []
    #print('certification_evaluation_tools_semestr_1', certification_evaluation_tools_semestr_1)
    #print('certification_evaluation_tools_semestr_2', certification_evaluation_tools_semestr_2)
    for item in context['certification_evaluation_tools']:
        print('dfdfdfd', item['name'])
        try:
            item['url']= 'http://localhost:3002/work-program/{}/intermediate-certification/{}'.format(context['id'], item['id'])
            tpl
            rt = RichText()
            rt.add('Ссылка на описание оценочного средства', url_id=tpl.build_url_id('http://localhost:3002/work-program/{}/intermediate-certification/{}'.format(context['id'], item['id'])))
            item['url'] = rt
            item['description'] = html2text.html2text(item['description'])
            if item['type'] == '1':
                item['type'] = 'Экзамен'
            elif item['type'] == '2':
                item['type'] = 'Дифференцированный зачет'
            elif item['type'] == '3':
                item['type'] = 'Зачет'
            elif item['type'] == '4':
                item['type'] = 'Курсовая работа'
            item ['description'] = ''
            if item ['semester'] == 1:
                if item['max'] is not None:
                    items_max_semester_1.append(item['max'])
                if item['min'] is not None:
                    items_min_semester_1.append(item['min'])
                certification_evaluation_tools_semestr_1.append(item)
            if item ['semester'] == 2:
                print('maxxxxx', item['max'])
                if item['max'] is not None:
                    items_max_semester_2.append(item['max'])
                if item['min'] is not None:
                    items_min_semester_2.append(item['min'])
                certification_evaluation_tools_semestr_2.append(item)
            if item ['semester'] == 3:
                print('maxxxxx', item['max'])
                if item['max'] is not None:
                    items_max_semester_3.append(item['max'])
                if item['min'] is not None:
                    items_min_semester_3.append(item['min'])
                certification_evaluation_tools_semestr_3.append(item)
            if item ['semester'] == 4:
                print('maxxxxx', item['max'])
                if item['max'] is not None:
                    items_max_semester_4.append(item['max'])
                if item['min'] is not None:
                    items_min_semester_4.append(item['min'])
                certification_evaluation_tools_semestr_4.append(item)
            else:
                pass
        except:
            continue

    # print('certification_evaluation_tools_semestr_1', certification_evaluation_tools_semestr_1)
    # print('certification_evaluation_tools_semestr_2', certification_evaluation_tools_semestr_2)
    template_context['certification_evaluation_tools_semestr_1'] = certification_evaluation_tools_semestr_1
    template_context['certification_evaluation_tools_semestr_2'] = certification_evaluation_tools_semestr_2
    template_context['certification_evaluation_tools_semestr_3'] = certification_evaluation_tools_semestr_3
    template_context['certification_evaluation_tools_semestr_4'] = certification_evaluation_tools_semestr_4
    try:
        template_context['outcomes_max_all_semester_1'] = sum(items_max_semester_1) + int(context['extra_points'])
        template_context['outcomes_max_all_semester_2'] = sum(items_max_semester_2) + int(context['extra_points'])
        template_context['outcomes_max_all_semester_3'] = sum(items_max_semester_3) + int(context['extra_points'])
        template_context['outcomes_max_all_semester_4'] = sum(items_max_semester_4) + int(context['extra_points'])
    except:
        pass
    template_context['outcomes_min_all_semester_1'] = sum(items_min_semester_1)
    template_context['outcomes_min_all_semester_2'] = sum(items_min_semester_2)
    template_context['outcomes_min_all_semester_3'] = sum(items_min_semester_3)
    template_context['outcomes_min_all_semester_4'] = sum(items_min_semester_4)
    template_context['extra_points'] = context['extra_points']
    #print('outcomes_evaluation_tool', template_context['outcomes_min_all_semester_2'])
    #print(template_context['evaluation_tool_semester_2'])
    # for item in context['discipline_sections']:
    #     for i in item['evaluation_tools']:

    template_context['discipline_section'] = context['discipline_sections']
    return template_context, filename
        #, evaluation_tools_pdf_docs


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
            if index < len(files)-1:
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

        # context, filename, evaluation_tools_pdf_docs = render_context(data, field_of_study_id=kwargs['fs_id'],
        #                                    academic_plan_id=kwargs['ap_id'], year=kwargs['year'])

        context, filename = render_context(data, field_of_study_id=kwargs['fs_id'],
                                           academic_plan_id=kwargs['ap_id'], year=kwargs['year'])

        tpl.render(context)
        tpl.save('upload/'+str(filename)) #-- сохранение в папку локально (нужно указать актуальный путь!)
        # target_document = Document('upload/'+str(filename))
        #
        # input = Document('upload/exp_v2_6.docx')
        #
        # paragraphs = []
        # for para in input.paragraphs:
        #     p = para.text
        #     target_document.add_paragraph(p)
        # target_document.save('upload/exp_v2_6.docx')

        #i['description'] = paragraphs
        #evaluation_tools_pdf_docs.append(filename)

        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'inline; filename="%s"' % filename

        tpl.save(response)
        #filename = 'upload/' + filename
        #self.combine_word_documents(filename, evaluation_tools_pdf_docs)
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
    template_context['bibliographic_reference'] = context['bibliographic_reference']
    filename = 'Syllabus_' + str(context['title']) + str(kwargs['year']) + '.docx'

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
        # tpl.save('/application/upload/'+filename) #-- сохранение в папку локально (нужно указать актуальный путь!)

        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'inline; filename="%s"' % str(filename)

        tpl.save(response)

        return response


# for item in context['discipline_sections']:
#     for i in item['evaluation_tools']:
#         #print('ev tool', i)
#         i['description'] = html2text.html2text(i['description'])
#         if i not in current_evaluation_tool:
#             current_evaluation_tool.append(i)
#             #print(i['description'])
#             k=k+1
#             print('папка', k)
#             #print(i['description'])
#             options = {
#                 #'quiet': ''
#             }
#             html_content = """
# <!DOCTYPE html>
# <html>
# <head>
# <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
# </head>
# <body>
# {body}
# </body>
# </html>
# """.format(body =  i['description'].replace(' ', '&ensp;').replace('  ', '&ensp;').replace('&nbsp$', '&ensp;'))
#             print('ворд!!!!!!!!!!!!!!!!!!', html_content)
#html_content = str(html_content, "UTF-8")
#i['description'] = html2text.html2text(i['description'])
#i['description'] = pypandoc.convert_text(i['description'], format='html', to='docx', outputfile='/exp1.docx')
#i['description'] = pypandoc.convert_text(i['description'].replace('<tbody>', '').replace('</tbody>', '').replace('<figure>', '').replace('</figure>', ''), format='html', to='docx', outputfile=('upload/exp{i}.docx'.format(i=k)))
#i['description'] = pdfkit.from_string((i['description'].encode().decode('utf-8')), 'upload/exp{i}.pdf'.format(i=k))
# i['description'] = pdfkit.from_string(html_content, 'upload/exp{i}.pdf'.format(i=k), options=options)
#i['description'] = pdfkit.from_file('upload/new_11.html', 'upload/exp{i}.pdf'.format(i=k), options=options)

# import sys
# from PyQt4.QtCore import *
# from PyQt4.QtGui import *
# from PyQt4.QtWebKit import *
#
# app = QApplication(sys.argv)
# w = QWebView()
# w.load(html_content)
# p = Qp()
# p.setPageSize(Qp.A4)
# p.setOutputFormat(Qp.PdfFormat)
# p.setOutputFileName("sample.pdf")
#
# def convertIt():
#     w.print_(p)
#     QApplication.exit()
#
# QObject.connect(w, SIGNAL("loadFinished(bool)"), convertIt)
# sys.exit(app.exec_())

# print(i['description'])
# word = win32com.client.Dispatch("Word.Application")
# word.visible = 0
# # GET FILE NAME AND NORMALIZED PATH
# filename = 'upload/exp{i}.pdf'.format(i=k)
# in_file = os.path.abspath('upload/exp{i}.pdf'.format(i=k))
#
# # CONVERT PDF TO DOCX AND SAVE IT ON THE OUTPUT PATH WITH THE SAME INPUT FILE NAME
# wb = word.Documents.Open(in_file)
# out_file = os.path.abspath('upload/exp_v2{i}.docx'.format(i=k))
# wb.SaveAs2(out_file, FileFormat=16)
# wb.Close()
# # word.Quit()
# parse('upload/exp{i}.pdf'.format(i=k), 'upload/exp_v2_{i}.docx'.format(i=k), start=0, end=None)
# evaluation_tools_pdf_docs.append('upload/exp_v2_{i}.docx'.format(i=k))
# input = Document('upload/exp_v2_{i}.docx'.format(i=k))
#
# paragraphs = []
# for para in input.paragraphs:
#     p = para.text
#     paragraphs.append(p)
#
# i['description'] = paragraphs

# output = Document()
# for item in paragraphs:
#     output.add_paragraph(item)
# output.save('OutputDoc.docx')
# cv = Converter('upload/exp{i}.pdf'.format(i=k))
# cv.convert('upload/exp_v2_{i}.docx'.format(i=k), start=0, end=None)
# cv.close()
# mydoc = docx.Document() # document type
# pdfFileObj = open('upload/exp{i}.pdf'.format(i=k), 'rb') # pdffile loction
# pdfReader = PyPDF2.PdfFileReader(pdfFileObj) # define pdf reader object
#
#
# # Loop through all the pages
#
# for pageNum in range(1, pdfReader.numPages):
#     pageObj = pdfReader.getPage(pageNum)
#     pdfContent = pageObj.extractText()  #extracts the content from the page.
#     print ('pdfContent         ', pdfContent)
#     print(pdfContent) # print statement to test output in the terminal. codeline optional.
#     mydoc.add_paragraph(pdfContent) # this adds the content to the word document
#
# mydoc.save('upload/exp_v2{i}.docx'.format(i=k)) # Give a name to your output file.
# import os
# import subprocess
# filename = 'upload/exp{i}.pdf'.format(i=k)
# flipfilename = filename[::-1]
# ext,trash = flipfilename.split('.',1)
# if ext = 'pdf':
#     abspath = os.path.join(path, filename)
#     subprocess.call('lowriter --invisible --convert-to doc "{}"'
#                     .format(abspath), shell=True)
#print('evaluation_tools_pdf_docs', evaluation_tools_pdf_docs)
# else:
#     pass
# template_context['discipline_section'] = context['discipline_sections']
# for item in context['outcomes']:
#     try:
#         for i in item['evaluation_tool']:
#             i['description'] = html2text.html2text(i['description'])
#             #current_evaluation_tool.append(i)
#             if i['check_point']:
#                 #outcomes_evaluation_tool.append(i)
#                 items_max.append(i['max'])
#                 items_min.append(i['min'])
#     except:
#         continue