from django_cte import With
from django_print_sql import print_sql, print_sql_decorator

from gia_practice_app.GIA.models import GIA
from gia_practice_app.Practice.models import Practice
from django.apps import apps


from django.db import models
DisciplineBlockModule = apps.get_model('workprogramsapp.DisciplineBlockModule')
WorkProgram = apps.get_model('workprogramsapp.WorkProgram')

def make_modules_cte_down(cte):
    # non-recursive: get root nodes
    return DisciplineBlockModule.cte_objects.values(
        "id", "name",
        p=models.F("childs__id"),
        recursive_id=models.F("id"),
        recursive_name=models.F("name"),
        # db = models.F("descipline_block__id"),
        # full_name=models.F('name'),
        depth=models.Value(1, output_field=models.IntegerField()),
    ).union(
        # recursive union: get descendants
        cte.join(DisciplineBlockModule.cte_objects.all(), childs=cte.col.id).values(
            "id", "name",
            p=cte.col.p,
            recursive_id=cte.col.recursive_id,
            recursive_name=cte.col.recursive_name,
            depth=cte.col.depth + models.Value(1, output_field=models.IntegerField()),
        ),
        all=True,
    )


def make_modules_cte_up(cte):
    # non-recursive: get root nodes
    return DisciplineBlockModule.cte_objects.values(
        "id", "name",
        p=models.F("father_module__id"),
        recursive_id=models.F("id"),
        recursive_name=models.F("name"),
        depth=models.Value(1, output_field=models.IntegerField()),
    ).union(
        # recursive union: get descendants
        cte.join(DisciplineBlockModule.cte_objects.all(), father_module=cte.col.id).values(
            "id", "name",
            p=cte.col.p,
            recursive_id=cte.col.recursive_id,
            recursive_name=cte.col.recursive_name,
            depth=cte.col.depth + models.Value(1, output_field=models.IntegerField()),
        ),
        all=True,
    )


def count_ze_module(obj: DisciplineBlockModule):
    laboriousness = 0
    childs = obj.childs.all()
    if obj.selection_rule == "choose_n_from_m":
        if childs.exists():
            for i in range(int(obj.selection_parametr)):
                laboriousness += sum([int(childs[i].laboriousness) for i in range(int(obj.selection_parametr))])
        else:
            work_programs = WorkProgram.objects.filter(
                work_program_in_change_block__discipline_block_module=obj)
            if work_programs.exists():
                for i in range(int(obj.selection_parametr)):
                    laboriousness += sum([int(unit) for unit in work_programs[i].ze_v_sem.split(", ")])

            gias = GIA.objects.filter(gia_in_change_block__discipline_block_module=obj)
            if gias.exists():
                for i in range(int(obj.selection_parametr)):
                    laboriousness += sum([int(unit) for unit in gias[i].ze_v_sem.split(", ")])

            practices = Practice.objects.filter(practice_in_change_block__discipline_block_module=obj)
            if practices.exists():
                for i in range(int(obj.selection_parametr)):
                    laboriousness += sum([int(unit) for unit in practices[i].ze_v_sem.split(", ")])

    elif obj.selection_rule == "all" or obj.selection_rule == "any_quantity":
        if childs.exists():
            laboriousness += sum([int(child.laboriousness) for child in childs])
        else:
            work_programs = WorkProgram.objects.filter(
                work_program_in_change_block__discipline_block_module=obj)
            for wp in work_programs:
                laboriousness += sum([int(unit) for unit in wp.ze_v_sem.split(", ")])

            gias = GIA.objects.filter(gia_in_change_block__discipline_block_module=obj)
            if gias.exists():
                for gia in gias:
                    laboriousness += sum([int(unit) for unit in gia.ze_v_sem.split(", ")])

            practices = Practice.objects.filter(practice_in_change_block__discipline_block_module=obj)
            if practices.exists():
                for practice in practices:
                    laboriousness += sum([int(unit) for unit in practice.ze_v_sem.split(", ")])

    elif obj.selection_rule in ["by_credit_units", "no_more_than_n_credits"]:
        try:
            laboriousness = int(obj.selection_parametr)
        except TypeError:
            laboriousness = 0
    return laboriousness


# Передавать айди модуля в цте, возвращать объект модуля, делать запрос моудля внутри ифа. Напистаь менеджмент функцию, переинчавиющую трудоемкости всех модулей
def rewrite_ze_up(module):
    parent_id = None
    try:
        module.laboriousness = count_ze_module(module)
    except IndexError:
        module.laboriousness = 0
    print(module.name)
    module.save()
    cte = With.recursive(make_modules_cte_up)
    # descipline_block__academic_plan__id = 7304
    modules = (
        cte.join(DisciplineBlockModule.cte_objects.all(), id=cte.col.id).annotate(
            recursive_name=cte.col.recursive_name,
            recursive_id=cte.col.recursive_id, depth=cte.col.depth, p=cte.col.p).filter(id=module.id).with_cte(cte)
    )
    for module_cte in modules:
        if module_cte.p:
            module_to_count = DisciplineBlockModule.objects.get(id=module_cte.p)
            try:
                lb = count_ze_module(module_to_count)
            except IndexError:
                lb = 0
            module_to_count.laboriousness = lb
            module_to_count.save()
