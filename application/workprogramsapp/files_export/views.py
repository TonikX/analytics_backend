import datetime
from rest_framework import generics, viewsets
from docxtpl import DocxTemplate
from django.http import HttpResponse
from collections import OrderedDict
from rest_framework.permissions import IsAuthenticated, AllowAny
import html2text
from ..models import AcademicPlan, Zun, WorkProgramInFieldOfStudy, FieldOfStudy, WorkProgram
from ..serializers import WorkProgramSerializer


"""Скачивание рпд в формате docx/pdf"""


def render_context(context, **kwargs):
    """ Функция, которая возвращает context с параметрами для шаблона """
    fs_obj = FieldOfStudy.objects.get(pk=kwargs['field_of_study_id'])
    ap_obj = AcademicPlan.objects.get(pk=kwargs['academic_plan_id'])
    try:
        for wpcb in context['work_program_in_change_block']:
            if wpcb['discipline_block_module']['descipline_block']['academic_plan']['educational_profile'] == ap_obj.educational_profile:
                wpcb_pk = wpcb['id']
                semester = [{'s': i, 'c': wpcb['credit_units'][i]} for i in range(len(wpcb['credit_units'])) if
                            wpcb['credit_units'] if wpcb['credit_units'][i] != 0]
    except:
        semester = [{'s': '-', 'c': '-', 'h': '-', 'e': '-'}]
        wpcb_pk = context['work_program_in_change_block'][0]['id']
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

    for i in context['discipline_sections']:
        online_names, topics_list = [], []
        if i['contact_work'] is None:
            i['contact_work'] = ''
        else:
            contact_work += float(i['contact_work'])
        if i['lecture_classes'] is None:
            i['lecture_classes'] = ''
        else:
            lecture_classes += float(i['lecture_classes'])
        if i['laboratory'] is None:
            i['laboratory'] = ''
        else:
            laboratory += float(i['laboratory'])
        if i['practical_lessons'] is None:
            i['practical_lessons'] = ''
        else:
            practical_lessons += float(i['practical_lessons'])
        if i['SRO'] is None:
            i['SRO'] = ''
        else:
            SRO += float(i['SRO'])
        total_hours += 0.0 if i['total_hours'] is None else float(i['total_hours'])
        evaluation_tools.extend(i['evaluation_tools'])
        for j in i['topics']:
            topics_list.append(j['description'])
            if j['url_online_course'] is None:
                pass
            else:
                online_sections.append(i['ordinal_number'])
                online_names.append(j['url_online_course']['title'])
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

    template_context['academic_plan'] = ap_obj.educational_profile
    template_context['semester'] = semester
    template_context['total_hours_1'] = [contact_work, lecture_classes, laboratory, practical_lessons, SRO]
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
    template_context['bibliographic_reference'] = context['bibliographic_reference']
    template_context['online_course'] = url_online_course
    template_context['evaluation_tools'] = evaluation_tools
    filename = str(fs_obj.number) + '_' + str(context['discipline_code']) + '_' + str(
        context['qualification']) + '_' + str(kwargs['year']) + '_' + datetime.datetime.today().strftime(
        "%Y-%m-%d-%H.%M.%S") + '.docx'
    """Данные для таблицы планирования результатов обучения по дисциплине (БаРС)"""
    outcomes_evaluation_tool = []
    current_evaluation_tool = []
    items_max = []
    items_min = []
    for item in context['discipline_sections']:
        for i in item['evaluation_tools']:
            i['description'] = html2text.html2text(i['description'])
    template_context['discipline_section'] = context['discipline_sections']
    for item in context['outcomes']:
        try:
            for i in item['evaluation_tool']:
                i['description'] = html2text.html2text(i['description'])
                current_evaluation_tool.append(i)
                if i['check_point']:
                    outcomes_evaluation_tool.append(i)
                    items_max.append(i['max'])
                    items_min.append(i['min'])
        except:
            continue
    template_context['outcomes_evaluation_tool'] = outcomes_evaluation_tool
    template_context['current_evaluation_tool'] = current_evaluation_tool
    certification_evaluation_tools = []
    for item in context['certification_evaluation_tools']:
        try:
            if item['max'] is not None:
                items_max.append(item['max'])
            if item['min'] is not None:
                items_min.append(item['min'])
            item['description'] = html2text.html2text(item['description'])
            if item['type'] == '1':
                item['type'] = 'Exam'
            elif item['type'] == '2':
                item['type'] = 'Differentiated credit'
            elif item['type'] == '3':
                item['type'] = 'Offset'
            elif item['type'] == '4':
                item['type'] = 'Coursework'
            certification_evaluation_tools.append(item)
        except:
            continue
        items_max.append(item['max'])
        items_min.append(item['min'])
        item['description'] = html2text.html2text(item['description'])
        if item['type'] == '1':
            item['type'] = 'Exam'
        elif item['type'] == '2':
            item['type'] = 'Differentiated credit'
        elif item['type'] == '3':
            item['type'] = 'Offset'
        elif item['type'] == '4':
            item['type'] = 'Coursework'
        certification_evaluation_tools.append(item)
    template_context['certification_evaluation_tools'] = certification_evaluation_tools
    template_context['outcomes_max_all'] = sum(items_max) + int(context['extra_points'])
    template_context['outcomes_min_all'] = sum(items_min)
    template_context['extra_points'] = context['extra_points']
    return template_context, filename


"""Контроллер для выгрузки docx-файла РПД"""


class DocxFileExportView(generics.ListAPIView):
    """
    Возвращает РПД в формате docx в браузере
    """
    queryset = WorkProgram.objects.all()
    serializer = WorkProgramSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        tpl = DocxTemplate('/application/static-backend/export_template/RPD_shablon_2020_new.docx')
        queryset = WorkProgram.objects.get(pk=kwargs['pk'])
        serializer = WorkProgramSerializer(queryset)
        data = dict(serializer.data)

        context, filename = render_context(data, field_of_study_id=kwargs['fs_id'],
                                           academic_plan_id=kwargs['ap_id'], year=kwargs['year'])
        tpl.render(context)
        # tpl.save('/application/'+str(filename)) #-- сохранение в папку локально (нужно указать актуальный путь!)

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