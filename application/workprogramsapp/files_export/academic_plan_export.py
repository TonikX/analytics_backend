import openpyxl
from openpyxl.styles import Alignment, PatternFill, Side, Border, Font

from workprogramsapp.disciplineblockmodules.ze_module_logic import recursion_module, generate_full_ze_list, \
    recursion_module_per_ze
from workprogramsapp.models import DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, \
    СertificationEvaluationTool, ImplementationAcademicPlan
from workprogramsapp.serializers import AcademicPlanSerializer

color_list = ["8EA9DB", "B4C6E7", "D9E1F2", "E2E9EA"]

columns_dict = {
    "wp_id": {"column": 1},
    "choosing_rule": {"column": 2},
    "choosing_param": {"column": 3},
    "choosing_term": {"column": 4},
    "choosing_format": {"column": 5},
    "replaceable": {"column": 6},
    "name": {"column": 7},
    "ze_all": {"column": 8},
    "hours_all": {"column": 9},
    "ze_by_term": {"column_start": 10,
                   "column_finish": 17},
    "exam": {"column": 18},
    "diff": {"column": 19},
    "credit": {"column": 20},
    "course_project": {"column": 21},
    "course_work": {"column": 22},
    "contact_work": {"column": 23},
    "seminary_sum": {"column": 24},
    "lecture": {"column": 25},
    "labs": {"column": 26},
    "practice": {"column": 27},
    "consultations": {"column": 28},
    "srs": {"column": 29},
    "hours_by_term": {"column": 30},
    "realizer": {"column": 62},
    "percent_seminary": {"column": 63},
    "realisation_language": {"column": 64},

}


def fill_row(ws, level, color, bold=False):
    for i in range(1, 65):
        cell = ws.cell(row=level, column=i)
        cell.fill = PatternFill(start_color=color, fill_type="solid")
        side = Side(border_style='thin', color='000000')
        cell.border = Border(top=side, bottom=side, left=side, right=side)
        font = Font(name='Times New Roman', size=12, bold=bold, color='000000')
        cell.font = font


def insert_cell_data(ws, level, column_name, data, do_line_merge=False, style="thin"):
    cell = ws.cell(row=level, column=columns_dict[column_name]["column"])
    cell.value = data
    cell.alignment = Alignment(wrap_text=True, horizontal='center', vertical='center')

    if do_line_merge:
        ws.merge_cells(start_row=level, start_column=columns_dict[column_name]["column"], end_row=level + 1,
                       end_column=columns_dict[column_name]["column"])


def insert_cell_data_range(ws, level, column_name, data_list):
    i = 0
    for col in range(columns_dict[column_name]["column_start"],
                     columns_dict[column_name]["column_finish"] + 1):
        cell = ws.cell(row=level, column=col)
        cell.value = data_list[i]
        cell.alignment = Alignment(wrap_text=True, horizontal='center', vertical='center')
        i += 1


def process_evaluation_tools(ws, level, wp=None, module=None):
    if wp:
        tools = СertificationEvaluationTool.objects.filter(work_program=wp)
    elif module:
        tools = СertificationEvaluationTool.objects.none()
    else:
        tools = СertificationEvaluationTool.objects.none()
    exam_tools = ''.join(map(str, [tool.semester for tool in tools.filter(type="1")]))
    diff_tools = ''.join(map(str, [tool.semester for tool in tools.filter(type="2")]))
    credit_tools = ''.join(map(str, [tool.semester for tool in tools.filter(type="3")]))
    course_work_tools = ''.join(map(str, [tool.semester for tool in tools.filter(type="4")]))
    course_project_tools = ''.join(map(str, [tool.semester for tool in tools.filter(type="5")]))

    insert_cell_data(ws, level, "exam", exam_tools)
    insert_cell_data(ws, level, "diff", diff_tools)
    insert_cell_data(ws, level, "credit", credit_tools)
    insert_cell_data(ws, level, "course_project", course_project_tools)
    insert_cell_data(ws, level, "course_work", course_work_tools)


def process_hours_by_terms(ws, level, hours_list, offset=0):
    start_hours = columns_dict["hours_by_term"]["column"] + offset
    for i, hour in enumerate(hours_list):
        if hour != 0:
            cell = ws.cell(row=level, column=start_hours + i * 4)
            cell.value = hours_list[i]
            cell.alignment = Alignment(wrap_text=True, horizontal='center', vertical='center')


def process_wp(changeblocks, level, ws):
    for changeblock in changeblocks:
        for wp in changeblock.work_program.all():
            fill_row(ws, level, "FFFFFF")

            insert_cell_data(ws=ws, level=level, column_name="wp_id", data=wp.discipline_code)
            insert_cell_data(ws=ws, level=level, column_name="choosing_term",
                             data=', '.join(map(str, changeblock.semester_start)))
            if wp.implementation_format == "offline":
                choosing_format = "оф"
            elif wp.implementation_format == "online":
                choosing_format = "он"
            elif wp.implementation_format == "mixed":
                choosing_format = "микс"
            else:
                choosing_format = "оф"
            insert_cell_data(ws=ws, level=level, column_name="choosing_format", data=choosing_format)
            replaceable = "+" if changeblock.change_type == "Optionally" else "-"
            insert_cell_data(ws=ws, level=level, column_name="replaceable", data=replaceable)
            insert_cell_data(ws=ws, level=level, column_name="name", data=wp.title)

            ze = [int(unit) for unit in wp.ze_v_sem.split(", ")]
            sum_ze = sum(ze)
            insert_cell_data(ws=ws, level=level, column_name="ze_all", data=sum_ze)
            insert_cell_data(ws=ws, level=level, column_name="hours_all", data=sum_ze * 36)

            wp_ze_by_term = generate_full_ze_list(ze, changeblock.semester_start)[0]
            insert_cell_data_range(ws, level, "ze_by_term", wp_ze_by_term)
            process_evaluation_tools(ws, level, wp)

            extend_list = [0 for _ in range(10)]
            lecture_list = [float(hour) for hour in wp.lecture_hours_v2.split(", ")]
            practice_list = [float(hour) for hour in wp.practice_hours_v2.split(", ")]
            sro_list = [float(hour) for hour in wp.srs_hours_v2.split(", ")]
            lab_list = [float(hour) for hour in wp.lab_hours_v2.split(", ")]
            # cons_list = [float(hour) for hour in wp.consultation_v2.split(", ")]

            contact_hours = round((sum(lecture_list) + sum(practice_list) + sum(lab_list)) * 1.1, 2)
            insert_cell_data(ws=ws, level=level, column_name="contact_work", data=contact_hours)

            seminary_hours = sum(lecture_list) + + sum(practice_list) + sum(lab_list) + 0  # sum(cons_list)
            insert_cell_data(ws=ws, level=level, column_name="seminary_sum", data=seminary_hours)

            insert_cell_data(ws=ws, level=level, column_name="lecture", data=sum(lecture_list))
            insert_cell_data(ws=ws, level=level, column_name="labs", data=sum(lab_list))
            insert_cell_data(ws=ws, level=level, column_name="practice", data=sum(practice_list))
            insert_cell_data(ws=ws, level=level, column_name="consultations", data=0)
            insert_cell_data(ws=ws, level=level, column_name="srs", data=sum(sro_list))

            process_hours_by_terms(ws, level, lecture_list, offset=0)
            process_hours_by_terms(ws, level, lab_list, offset=1)
            process_hours_by_terms(ws, level, practice_list, offset=2)

            insert_cell_data(ws=ws, level=level, column_name="realizer", data=wp.structural_unit.short_name)
            insert_cell_data(ws=ws, level=level, column_name="percent_seminary",
                             data=round(float((seminary_hours) / (sum_ze * 36))*100, 2))
            insert_cell_data(ws=ws, level=level, column_name="realisation_language", data=wp.language.upper())
            level += 1
    return level


def module_inside_recursion(modules, level, ws, depth=0):
    for module in modules:

        fill_row(ws, level, color_list[depth])
        insert_cell_data(ws=ws, level=level, column_name="name", data=module.name, do_line_merge=False)

        if module.selection_rule == "choose_n_from_m":
            choosing_rule = "n из m"
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
        # insert_cell_data_range(ws, level + 1, "ze_by_term", min_ze)

        level += 1
        if module.childs.all().exists():
            depth += 1
            level = module_inside_recursion(module.childs.all(), level, ws, depth)
        else:
            level = process_wp(WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module),
                               level, ws)

    return level


def process_excel(academic_plan):
    wb_obj = openpyxl.load_workbook(
        "C:\\Users\\123\\Desktop\\analitycs\\analytics_backend\\application\\workprogramsapp\\files_export\\plan.xlsx")
    ws = wb_obj["УП"]
    start_list = 7
    for block in DisciplineBlock.objects.filter(academic_plan=academic_plan):
        insert_cell_data(ws=ws, level=start_list, column_name="name", data=block.name)
        fill_row(ws, start_list, "5F84D4")
        start_list += 1

        start_list = module_inside_recursion(DisciplineBlockModule.objects.filter(descipline_block=block), start_list,
                                             ws)
    imp=ImplementationAcademicPlan.objects.get(academic_plan=academic_plan)

    return wb_obj

