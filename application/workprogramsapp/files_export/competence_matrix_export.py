import openpyxl
from openpyxl.styles import Alignment, PatternFill, Side, Border, Font
from sentry_sdk import capture_exception

from analytics_project.settings import AP_FILE_ROUTE
from gia_practice_app.GIA.models import GIA
from gia_practice_app.GIA.serializers import GIASmallSerializer
from gia_practice_app.Practice.models import Practice
from gia_practice_app.Practice.serializers import PracticeCompetenceSerializer
from workprogramsapp.disciplineblockmodules.ze_module_logic import recursion_module, generate_full_ze_list, \
    recursion_module_per_ze, sum_lists
from workprogramsapp.educational_program.general_prof_competencies.models import \
    GeneralProfCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.general_prof_competencies.serializers import \
    GeneralProfCompetencesInGroupOfGeneralCharacteristicSerializer
from workprogramsapp.educational_program.key_competences.models import KeyCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.key_competences.serializers import \
    KeyCompetencesInGroupOfGeneralCharacteristicSerializer
from workprogramsapp.educational_program.over_professional_competencies.models import \
    OverProfCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.over_professional_competencies.serializers import \
    OverProfCompetencesInGroupOfGeneralCharacteristicSerializer
from workprogramsapp.educational_program.pk_comptencies.models import PkCompetencesInGroupOfGeneralCharacteristic
from workprogramsapp.educational_program.pk_comptencies.serializers import \
    PkCompetencesInGroupOfGeneralCharacteristicSerializer
from workprogramsapp.educational_program.serializers import WorkProgramCompetenceIndicatorSerializer
from workprogramsapp.educational_program.views import GetCompetenceMatrix
from workprogramsapp.models import DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, \
    СertificationEvaluationTool, ImplementationAcademicPlan, FieldOfStudy, GeneralCharacteristics, WorkProgram
from workprogramsapp.serializers import AcademicPlanSerializer

color_list = ["4c69a9", "5f84d4", "6f90d8", "8fa8e0", "afc1e9", "cfdaf2", "dfe6f6", "eff2fa", "eff2fa", "eff2fa",
              "eff2fa"]


def fill_row(ws, level, color, bold=False):
    for i in range(1, 65):
        cell = ws.cell(row=level, column=i)
        cell.fill = PatternFill(start_color=color, fill_type="solid")
        side = Side(border_style='thin', color='000000')
        cell.border = Border(top=side, bottom=side, left=side, right=side)
        font = Font(name='Times New Roman', size=12, bold=bold, color='000000')
        cell.font = font


def insert_cell_data(ws, level, column, data, horizontal='center'):
    cell = ws.cell(row=level, column=column)
    cell.value = data
    cell.alignment = Alignment(wrap_text=True, horizontal=horizontal, vertical='center')


def insert_cell_data_range(ws, level, start, finish, data_list):
    i = 0
    for col in range(start, finish + 1):
        cell = ws.cell(row=level, column=col)
        try:
            cell.value = data_list[i]
            cell.alignment = Alignment(wrap_text=True, horizontal='center', vertical='center')
            i += 1
        except IndexError:
            pass


def process_evaluation_tools(ws, level, wp=None, module=None, start_sem=0):
    if wp:
        tools = СertificationEvaluationTool.objects.filter(work_program=wp)
    elif module:
        tools = СertificationEvaluationTool.objects.filter(discipline_block_module=module)
    else:
        tools = СertificationEvaluationTool.objects.none()
    try:
        exam_tools = ''.join(map(str, [tool.semester + start_sem for tool in tools.filter(type="1")]))
        diff_tools = ''.join(map(str, [tool.semester + start_sem for tool in tools.filter(type="2")]))
        credit_tools = ''.join(map(str, [tool.semester + start_sem for tool in tools.filter(type="3")]))
        course_work_tools = ''.join(map(str, [tool.semester + start_sem for tool in tools.filter(type="4")]))
        course_project_tools = ''.join(map(str, [tool.semester + start_sem for tool in tools.filter(type="5")]))
        insert_cell_data(ws, level, "exam", exam_tools)
        insert_cell_data(ws, level, "diff", diff_tools)
        insert_cell_data(ws, level, "credit", credit_tools)
        insert_cell_data(ws, level, "course_project", course_project_tools)
        insert_cell_data(ws, level, "course_work", course_work_tools)

    except Exception as e:
        capture_exception(e)


def process_hours_by_terms(ws, level, hours_list, offset=0):
    start_hours = columns_dict["hours_by_term"]["column"] + offset
    for i, hour in enumerate(hours_list):
        if hour != 0:
            cell = ws.cell(row=level, column=start_hours + i * 4)
            cell.value = hours_list[i]
            cell.alignment = Alignment(wrap_text=True, horizontal='center', vertical='center')


def process_gia(changeblock, level, ws):
    for gia in changeblock.gia.all():
        fill_row(ws, level, "FFFFFF")
        insert_cell_data(ws=ws, level=level, column_name="wp_id", data=gia.discipline_code)
        try:
            insert_cell_data(ws=ws, level=level, column_name="choosing_term",
                             data=', '.join(map(str, changeblock.semester_start)))

        except Exception as e:
            capture_exception(e)
        insert_cell_data(ws=ws, level=level, column_name="name", data=gia.title, horizontal="left")

        try:
            ze = [int(unit) for unit in gia.ze_v_sem.split(", ")]
            sum_ze = sum(ze)
            insert_cell_data(ws=ws, level=level, column_name="ze_all", data=sum_ze)
            insert_cell_data(ws=ws, level=level, column_name="hours_all", data=sum_ze * 36)
            wp_ze_by_term = generate_full_ze_list(ze, changeblock.semester_start)[0]
            insert_cell_data_range(ws, level, "ze_by_term", wp_ze_by_term)
        except Exception as e:
            capture_exception(e)

        insert_cell_data(ws, level, "exam", changeblock.semester_start[0])
        insert_cell_data(ws=ws, level=level, column_name="realizer", data=gia.structural_unit.short_name)
        level += 1
        return level


def process_practice(changeblock, level, ws):
    for practice in changeblock.practice.all():
        tool_types = {
            1: '',
            2: '',
            3: '',
            4: '',
            5: ''
        }
        fill_row(ws, level, "FFFFFF")
        insert_cell_data(ws=ws, level=level, column_name="wp_id", data=practice.discipline_code)
        try:
            insert_cell_data(ws=ws, level=level, column_name="choosing_term",
                             data=', '.join(map(str, changeblock.semester_start)))

        except Exception as e:
            capture_exception(e)
        insert_cell_data(ws=ws, level=level, column_name="name", data=practice.title, horizontal="left")

        try:
            ze = [int(unit) for unit in practice.ze_v_sem.split(", ")]
            sum_ze = sum(ze)
            insert_cell_data(ws=ws, level=level, column_name="ze_all", data=sum_ze)
            insert_cell_data(ws=ws, level=level, column_name="hours_all", data=sum_ze * 36)
            wp_ze_by_term = generate_full_ze_list(ze, changeblock.semester_start)[0]
            insert_cell_data_range(ws, level, "ze_by_term", wp_ze_by_term)
        except Exception as e:
            capture_exception(e)
        try:
            list_of_tools = eval(practice.evaluation_tools_v_sem)

            for i, el in enumerate(list_of_tools):
                for tool_type in el:
                    tool_types[tool_type] += str(i + changeblock.semester_start[0])
            insert_cell_data(ws, level, "exam", tool_types[1])
            insert_cell_data(ws, level, "diff", tool_types[2])
            insert_cell_data(ws, level, "credit", tool_types[3])
            insert_cell_data(ws, level, "course_project", tool_types[4])
            insert_cell_data(ws, level, "course_work", tool_types[5])
        except Exception as e:
            capture_exception(e)

        insert_cell_data(ws=ws, level=level, column_name="realizer", data=practice.structural_unit.short_name)
        if practice.language:
            insert_cell_data(ws=ws, level=level, column_name="realisation_language", data=practice.language.upper())
        level += 1
        return level


def module_inside_recursion(modules, level, ws, depth=0):
    sum_data = {
        "level": level,
        "ze": 0,
        "ze_by_term": [0 for _ in range(10)],
        "contact_work": 0,
        "all_seminary": 0,
        "lecture": 0,
        "lab": 0,
        "practice": 0,
        "cons": 0,
        "srs": 0,
        "lecture_by_sem": [0 for _ in range(10)],
        "lab_by_sem": [0 for _ in range(10)],
        "practice_by_sem": [0 for _ in range(10)],
        "cons_by_sem": [0 for _ in range(10)],
    }

    for module in modules:

        fill_row(ws, level, color_list[depth])
        insert_cell_data(ws=ws, level=level, column_name="name", data=module.name, do_line_merge=False,
                         horizontal="left")

        if module.selection_rule == "choose_n_from_m":
            choosing_rule = "кол-во"
        elif module.selection_rule == "all":
            choosing_rule = "все"
        elif module.selection_rule == "any_quantity":
            choosing_rule = "все/0"
        else:
            choosing_rule = "з.е."

        insert_cell_data(ws=ws, level=level, column_name="choosing_rule", data=choosing_rule,
                         do_line_merge=False)
        insert_cell_data(ws=ws, level=level, column_name="choosing_param", data=module.selection_parametr,
                         do_line_merge=False)

        ze_module = recursion_module(module)
        insert_cell_data(ws=ws, level=level, column_name="ze_all", data=ze_module,
                         do_line_merge=False)
        insert_cell_data(ws=ws, level=level, column_name="hours_all", data=ze_module * 36,
                         do_line_merge=False)
        max_ze, max_hours_lab, max_hours_lec, max_hours_practice, max_hours_cons = recursion_module_per_ze(module)
        insert_cell_data_range(ws, level, "ze_by_term", max_ze)

        process_evaluation_tools(ws, level, module=module)

        # insert_cell_data_range(ws, level + 1, "ze_by_term", min_ze)
        process_hours_by_terms(ws, level, max_hours_lec, offset=0)
        process_hours_by_terms(ws, level, max_hours_lab, offset=1)
        process_hours_by_terms(ws, level, max_hours_practice, offset=2)

        level += 1
        if module.childs.all().exists():
            # depth += 1
            level = module_inside_recursion(module.childs.all(), level, ws, depth + 1)
        else:
            level = process_changeblock(
                WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module),
                level, ws)
        if depth == 0:
            sum_data["level"] = level
            sum_data["ze"] += ze_module
            sum_data["ze_by_term"] = sum_lists(sum_data["ze_by_term"], max_ze)
            # sum_data["contact_work"] += ze_module
            sum_data["lecture_by_sem"] = sum_lists(sum_data["lecture_by_sem"], max_hours_lec)
            sum_data["lab_by_sem"] = sum_lists(sum_data["lab_by_sem"], max_hours_lab)
            sum_data["practice_by_sem"] = sum_lists(sum_data["practice_by_sem"], max_hours_practice)
            # sum_data["cons_by_sem"] = sum_lists(sum_data["cons_by_sem"], max_hours_cons)
    if depth == 0:
        return sum_data
    else:
        return level


def find_competence_row(competence_dict, competences_in_program):
    plus_index_list = []
    for comp in competences_in_program["competences"]["competences"]:
        for key in competence_dict:
            for i, comp_in_header in enumerate(competence_dict[key]["queryset"]):
                if comp["id"] == comp_in_header.competence.id:
                    plus_index_list.append(competence_dict[key]["start"] + i)
    return plus_index_list


def process_changeblock(ws, level, block_module, unique_dict, competence_dict):
    for change_block in WorkProgramChangeInDisciplineBlockModule.objects.filter(
            discipline_block_module=block_module):
        for work_program in WorkProgram.objects.filter(work_program_in_change_block=change_block):
            if (work_program.id not in unique_dict["unique_wp"]) or (unique_dict["is_first_iter_ap"]):
                serializer = WorkProgramCompetenceIndicatorSerializer(work_program).data
                unique_dict["unique_wp"].append(work_program.id)
                fill_row(ws, level, "FFFFFF")
                insert_cell_data(ws=ws, level=level, column=1, data=work_program.title, horizontal="left")
                for plus_column in find_competence_row(competence_dict, serializer):
                    insert_cell_data(ws=ws, level=level, column=plus_column, data="+", horizontal="left")
                level += 1

            else:
                pass
                # print(work_program)
        for practice in Practice.objects.filter(practice_in_change_block=change_block):
            if (practice.id not in unique_dict["unique_practice"]) or (unique_dict["is_first_iter_ap"]):
                serializer = PracticeCompetenceSerializer(practice)
                unique_dict["unique_practice"].append(practice.id)
                fill_row(ws, level, "FFFFFF")
                insert_cell_data(ws=ws, level=level, column=1, data=practice.title, horizontal="left")
                level += 1
            else:
                pass
                # print(work_program)
        for gia in GIA.objects.filter(gia_in_change_block=change_block):
            if (gia.id not in unique_dict["unique_gia"]) or (unique_dict["is_first_iter_ap"]):
                serializer = GIASmallSerializer(gia)
                unique_dict["unique_gia"].append(gia.id)
                fill_row(ws, level, "FFFFFF")
                insert_cell_data(ws=ws, level=level, column=1, data=gia.title, horizontal="left")
                level += 1
            else:
                pass
    return level


def recursion_module_matrix(ws, level, modules, unique_dict, competence_dict, depth):
    # print(level)
    for block_module in modules:
        fill_row(ws, level, color_list[depth])
        insert_cell_data(ws=ws, level=level, column=1, data=block_module.name, horizontal="left")
        level += 1

        childs = block_module.childs.all()
        if childs.exists():
            level = recursion_module_matrix(ws, level, childs, unique_dict, competence_dict, depth + 1)
        else:
            level = process_changeblock(ws, level, block_module, unique_dict, competence_dict)

    return level


def process_excel():
    wb_obj = openpyxl.load_workbook(
        "C:\\Users\\123\\Desktop\\analitycs\\analytics_backend\\application\\workprogramsapp\\files_export\\competence_matrix_template.xlsx")
    # wb_obj = openpyxl.load_workbook(AP_FILE_ROUTE)

    unique_dict = \
        {"is_first_iter_ap": True,
         "unique_wp": [],
         "unique_practice": [],
         "unique_gia": []}

    ws = wb_obj["МК"]
    level = 3
    depth = 0

    competence_dict = competence_header(ws, 7)

    gen_characteristic = GeneralCharacteristics.objects.get(pk=7)
    academic_plans = gen_characteristic.educational_program.all()
    for ap in academic_plans:
        academic_plan = ap.academic_plan
        for block in DisciplineBlock.objects.filter(academic_plan=academic_plan).order_by("name"):
            insert_cell_data(ws=ws, level=level, column=1, data=block.name, horizontal="left")
            fill_row(ws, level, "394f7f")

            level += 1

            modules = DisciplineBlockModule.objects.filter(descipline_block=block)
            level = recursion_module_matrix(ws, level, modules, unique_dict, competence_dict, depth + 1)
        unique_dict["is_first_iter_ap"] = False

    wb_obj.save("test_template.xlsx")
    # return wb_obj


def fill_competences(ws, column_start, competence_queryset, competence_dict, name_comp, string_comp):
    level = 2

    # Формируем данные
    if not name_comp == "pk_competences":
        competences_list = [comp.competence.number for comp in competence_queryset]
    else:
        competences_list = [f"ПК-{i + 1}" for i, comp in enumerate(competence_queryset)]
    competence_dict[name_comp]["start"] = column_start
    competence_dict[name_comp]["list_num"] = competences_list
    column_end = column_start + len(competences_list) - 1
    # Заполняем строки
    insert_cell_data_range(ws, level, column_start, column_end, competences_list)
    ws.merge_cells(start_row=1, end_row=1, start_column=column_start, end_column=column_end)
    insert_cell_data(ws=ws, level=1, column=column_start, data=string_comp)
    return column_end + 1


def competence_header(ws, gen_pk):
    gen_characteristic = GeneralCharacteristics.objects.get(pk=gen_pk)
    pk_competences = PkCompetencesInGroupOfGeneralCharacteristic.objects.filter(
        group_of_pk__general_characteristic_id=gen_pk, competence__isnull=False).distinct()
    general_prof_competences = GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.filter(
        group_of_pk__educational_standard=gen_characteristic.educational_standard,
        competence__isnull=False)
    key_competences = KeyCompetencesInGroupOfGeneralCharacteristic.objects.filter(
        group_of_pk__educational_standard=gen_characteristic.educational_standard,
        competence__isnull=False).distinct()
    over_prof_competences = OverProfCompetencesInGroupOfGeneralCharacteristic.objects.filter(
        group_of_pk__educational_standard=gen_characteristic.educational_standard,
        competence__isnull=False).distinct()
    competence_dict = {
        "key_competences": {"start": 0, "list_num": [], "queryset": key_competences,
                            "label": "Ключевые компетенции"},
        "over_prof_competences": {"start": 0, "list_num": [], "queryset": over_prof_competences,
                                  "label": "Надпрофессиональные компетенции"},
        "general_prof_competences": {"start": 0, "list_num": [], "queryset": general_prof_competences,
                                     "label": "Общепрофессиональные компетенции "},
        "pk_competences": {"start": 0, "list_num": [], "queryset": pk_competences,
                           "label": "Профессиональные компетенции"}
    }
    column_start = 2
    for key in competence_dict:
        column_start = fill_competences(ws=ws, column_start=column_start,
                                        competence_queryset=competence_dict[key]["queryset"],
                                        competence_dict=competence_dict,
                                        name_comp=key,
                                        string_comp=competence_dict[key]["label"])
    return competence_dict
