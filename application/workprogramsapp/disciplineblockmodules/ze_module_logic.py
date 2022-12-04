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

    count_for_parameter += 1

    for changeblock in changeblocks:

        min_ze_by_term = [10 for _ in range(10)]
        max_ze_by_term = [0 for _ in range(10)]
        if changeblock.credit_units:
            array_ze = np.array([[int(unit) for unit in changeblock.credit_units.split(", ")]])
        else:

            work_program = changeblock.work_program.all()[0]
            semesters = changeblock.semester_start
            ze_wp = [int(unit) for unit in work_program.ze_v_sem.split(", ")]
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


def recursion_module(obj, ze_or_ze_sem=True):
    childs = obj.childs.all()
    unit_final_sum = 0
    min_ze_total = [0 for _ in range(10)]
    max_ze_total = [0 for _ in range(10)]

    try:
        if obj.selection_rule == "choose_n_from_m":
            if childs.exists():
                for i in range(int(obj.selection_parametr)):
                    if ze_or_ze_sem:
                        unit_final_sum += recursion_module(childs[i])

                    else:
                        min_res, max_res = recursion_module(childs[i], ze_or_ze_sem)
                        min_ze_total = sum_lists(min_ze_total, min_res)
                        max_ze_total = sum_lists(max_ze_total, max_res)

            else:
                if ze_or_ze_sem:
                    work_programs = WorkProgram.objects.filter(
                        work_program_in_change_block__discipline_block_module=obj)
                    for i in range(int(obj.selection_parametr)):
                        unit_final_sum += sum([int(unit) for unit in work_programs[i].ze_v_sem.split(", ")])
                else:
                    min_res, max_res = find_min_max_ze_by_term(obj, int(obj.selection_parametr))
                    min_ze_total = sum_lists(min_ze_total, min_res)
                    max_ze_total = sum_lists(max_ze_total, max_res)

        elif obj.selection_rule == "all" or obj.selection_rule == "any_quantity" or \
                (obj.selection_rule == "by_credit_units" and not ze_or_ze_sem):
            if childs.exists():
                for child in childs:
                    if ze_or_ze_sem:
                        unit_final_sum += recursion_module(child)
                    else:
                        min_res, max_res = recursion_module(child, ze_or_ze_sem)
                        min_ze_total = sum_lists(min_ze_total, min_res)
                        max_ze_total = sum_lists(max_ze_total, max_res)
            else:
                if ze_or_ze_sem:
                    work_programs = WorkProgram.objects.filter(
                        work_program_in_change_block__discipline_block_module=obj)
                    for wp in work_programs:
                        unit_final_sum += sum([int(unit) for unit in wp.ze_v_sem.split(", ")])
                else:
                    min_res, max_res = find_min_max_ze_by_term(obj)
                    min_ze_total = sum_lists(min_ze_total, min_res)
                    max_ze_total = sum_lists(max_ze_total, max_res)

        elif obj.selection_rule == "by_credit_units":
            unit_final_sum = int(obj.selection_parametr)

        if (unit_final_sum == 0 and ze_or_ze_sem) or (sum(max_ze_total) == 0 and not ze_or_ze_sem):
            if ze_or_ze_sem:
                for changeblock in WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=obj):
                    unit_final_sum += sum([int(unit) for unit in changeblock.credit_units.split(", ")])
            else:
                min_res, max_res = find_min_max_ze_by_term(obj)
                min_ze_total = sum_lists(min_ze_total, min_res)
                max_ze_total = sum_lists(max_ze_total, max_res)
    except AttributeError:
        print("a")
    except IndexError:
        print("i")
    if ze_or_ze_sem:
        return unit_final_sum
    else:
        return min_ze_total, max_ze_total
