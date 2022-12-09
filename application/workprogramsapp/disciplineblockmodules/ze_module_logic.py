from gia_practice_app.GIA.models import GIA
from gia_practice_app.Practice.models import Practice
from workprogramsapp.models import WorkProgram, WorkProgramChangeInDisciplineBlockModule
import numpy as np


def sum_lists(l1, l2):
    return list(map(lambda x, y: x + y, l1, l2))


def generate_full_ze_list(ze_wp, semesters):
    possible_terms = []
    for sem in semesters:
        list_of_ze = [0 for _ in range(10)]
        terms_counter = 0
        for i in range(10):
            if sem <= i + 1 < sem + len(ze_wp):
                list_of_ze[i] = ze_wp[terms_counter]
                terms_counter += 1
        possible_terms.append(list_of_ze)
    return possible_terms


def find_min_max_ze_by_term(lower_module, selection_parameter=0):
    changeblocks = WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=lower_module)
    count_for_parameter = 0
    total_min_ze_by_term = [0 for _ in range(10)]
    total_max_ze_by_term = [0 for _ in range(10)]

    for changeblock in changeblocks:
        count_for_parameter += 1
        min_ze_by_term = [10 for _ in range(10)]
        max_ze_by_term = [0 for _ in range(10)]
        if changeblock.credit_units:
            array_ze = np.array([[int(unit) for unit in changeblock.credit_units.split(", ")]])
        else:
            objs = changeblock.work_program.all()
            if not objs.exists():
                objs = changeblock.practice.all()
            if not objs.exists():
                objs = changeblock.gia.all()
            obj = objs[0]
            semesters = changeblock.semester_start
            ze_wp = [int(unit) for unit in obj.ze_v_sem.split(", ")]
            possible_terms_ze = generate_full_ze_list(ze_wp, semesters)
            array_ze = np.array(possible_terms_ze)
        for i in range(10):
            max_ze = array_ze[:, i].max()
            min_ze = array_ze[:, i].min()
            if max_ze > max_ze_by_term[i]:
                max_ze_by_term[i] = max_ze
            if min_ze < min_ze_by_term[i]:
                min_ze_by_term[i] = min_ze
        min_ze_by_term = [0 if el == 10 else el for el in min_ze_by_term]

        total_max_ze_by_term = sum_lists(total_max_ze_by_term, max_ze_by_term)
        total_min_ze_by_term = sum_lists(total_min_ze_by_term, min_ze_by_term)

        if count_for_parameter == selection_parameter:
            break

    return total_min_ze_by_term, total_max_ze_by_term


def recursion_module(obj):
    childs = obj.childs.all()
    unit_final_sum = 0
    try:
        if obj.selection_rule == "choose_n_from_m":
            if childs.exists():
                for i in range(int(obj.selection_parametr)):
                    unit_final_sum += recursion_module(childs[i])
            else:
                work_programs = WorkProgram.objects.filter(
                    work_program_in_change_block__discipline_block_module=obj)
                if work_programs.exists():
                    for i in range(int(obj.selection_parametr)):
                        unit_final_sum += sum([int(unit) for unit in work_programs[i].ze_v_sem.split(", ")])

                gias = GIA.objects.filter(gia_in_change_block__discipline_block_module=obj)
                if gias.exists():
                    for i in range(int(obj.selection_parametr)):
                        unit_final_sum += sum([int(unit) for unit in gias[i].ze_v_sem.split(", ")])

                practices = Practice.objects.filter(practice_in_change_block__discipline_block_module=obj)
                if practices.exists():
                    for i in range(int(obj.selection_parametr)):
                        unit_final_sum += sum([int(unit) for unit in practices[i].ze_v_sem.split(", ")])



        elif obj.selection_rule == "all" or obj.selection_rule == "any_quantity":
            if childs.exists():
                for child in childs:
                    unit_final_sum += recursion_module(child)
            else:
                work_programs = WorkProgram.objects.filter(
                    work_program_in_change_block__discipline_block_module=obj)
                for wp in work_programs:
                    unit_final_sum += sum([int(unit) for unit in wp.ze_v_sem.split(", ")])

                gias = GIA.objects.filter(gia_in_change_block__discipline_block_module=obj)
                if gias.exists():
                    for gia in gias:
                        unit_final_sum += sum([int(unit) for unit in gia.ze_v_sem.split(", ")])

                practices = Practice.objects.filter(practice_in_change_block__discipline_block_module=obj)
                if practices.exists():
                    for practice in practices:
                        unit_final_sum += sum([int(unit) for unit in practice.ze_v_sem.split(", ")])

        elif obj.selection_rule == "by_credit_units":
            unit_final_sum = int(obj.selection_parametr)

        if unit_final_sum == 0:
            for changeblock in WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=obj):
                unit_final_sum += sum([int(unit) for unit in changeblock.credit_units.split(", ")])

    except AttributeError:
        print("a")
    except IndexError:
        print("a")
    except ValueError:
        print("v")
    return unit_final_sum


def calculate_wp_term(module, select_param=0, type_control="wp"):
    matrix = []
    change_blocks = WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module)
    for change_block in change_blocks:

        objs = change_block.work_program.all()
        if not objs.exists():
            objs = change_block.practice.all()
        if not objs.exists():
            objs = change_block.gia.all()
        obj = objs[0]
        semesters = change_block.semester_start
        ze_wp = [int(unit) for unit in obj.ze_v_sem.split(", ")]
        matrix.extend(generate_full_ze_list(ze_wp, semesters))
    return calculate_ze_term(matrix, select_param)


def calculate_ze_term(matrix, select_param=0):
    max_ze_by_term = [0 for _ in range(10)]
    matrix = np.array(matrix)
    for i in range(10):
        column = np.flip(np.sort(matrix[:, i]))
        for max_index in range(select_param):
            max_ze_by_term[i] += column[max_index]
    return max_ze_by_term


def recursion_module_per_ze(obj):
    childs = obj.childs.all()
    max_ze_total = [0 for _ in range(10)]
    module_matrix = []

    try:
        if obj.selection_rule == "choose_n_from_m":
            if childs.exists():
                for child in childs:
                    max_term = recursion_module_per_ze(child)
                    module_matrix.append(max_term)
                max_ze_total = calculate_ze_term(module_matrix, int(obj.selection_parametr))

            else:
                max_ze_total = calculate_wp_term(obj, int(obj.selection_parametr))

        elif obj.selection_rule == "all" or obj.selection_rule == "any_quantity" or obj.selection_rule == "by_credit_units":
            if childs.exists():
                for child in childs:
                    max_res = recursion_module_per_ze(child)
                    max_ze_total = sum_lists(max_ze_total, max_res)
            else:
                _, max_res = find_min_max_ze_by_term(obj)
                max_ze_total = sum_lists(max_ze_total, max_res)

        """elif obj.selection_rule == "by_credit_units":
            unit_final_sum = int(obj.selection_parametr)"""

        if sum(max_ze_total) == 0:
            _, max_res = find_min_max_ze_by_term(obj)
            max_ze_total = sum_lists(max_ze_total, max_res)


    except ValueError:
        print("v")
    return max_ze_total
