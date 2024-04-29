from django.core.management.base import BaseCommand

from gia_practice_app.GIA.models import GIA
from gia_practice_app.Practice.models import Practice
from workprogramsapp.models import (
    DisciplineBlockModule,
    WorkProgram,
)


class Command(BaseCommand):
    help = "Closes the specified poll for voting"

    def handle(self, *args, **options):
        def recursion_module(obj: DisciplineBlockModule):
            childs = obj.childs.all()
            unit_final_sum = 0
            """if obj.laboriousness:
                return obj.laboriousness"""
            try:
                if obj.selection_rule == "choose_n_from_m":
                    if childs.exists():
                        for child in childs:
                            recursion_module(child)
                        for i in range(int(obj.selection_parametr)):
                            unit_final_sum += recursion_module(childs[i])
                    else:
                        work_programs = WorkProgram.objects.filter(
                            work_program_in_change_block__discipline_block_module=obj
                        )
                        if work_programs.exists():
                            for i in range(int(obj.selection_parametr)):
                                unit_final_sum += sum(
                                    [
                                        int(unit)
                                        for unit in work_programs[i].ze_v_sem.split(
                                            ", "
                                        )
                                    ]
                                )

                        gias = GIA.objects.filter(
                            gia_in_change_block__discipline_block_module=obj
                        )
                        if gias.exists():
                            for i in range(int(obj.selection_parametr)):
                                unit_final_sum += sum(
                                    [int(unit) for unit in gias[i].ze_v_sem.split(", ")]
                                )

                        practices = Practice.objects.filter(
                            practice_in_change_block__discipline_block_module=obj
                        )
                        if practices.exists():
                            for i in range(int(obj.selection_parametr)):
                                unit_final_sum += sum(
                                    [
                                        int(unit)
                                        for unit in practices[i].ze_v_sem.split(", ")
                                    ]
                                )

                elif (
                    obj.selection_rule == "all" or obj.selection_rule == "any_quantity"
                ):
                    if childs.exists():
                        for child in childs:
                            unit_final_sum += recursion_module(child)
                    else:
                        work_programs = WorkProgram.objects.filter(
                            work_program_in_change_block__discipline_block_module=obj
                        )
                        for wp in work_programs:
                            unit_final_sum += sum(
                                [int(unit) for unit in wp.ze_v_sem.split(", ")]
                            )

                        gias = GIA.objects.filter(
                            gia_in_change_block__discipline_block_module=obj
                        )
                        if gias.exists():
                            for gia in gias:
                                unit_final_sum += sum(
                                    [int(unit) for unit in gia.ze_v_sem.split(", ")]
                                )

                        practices = Practice.objects.filter(
                            practice_in_change_block__discipline_block_module=obj
                        )
                        if practices.exists():
                            for practice in practices:
                                unit_final_sum += sum(
                                    [
                                        int(unit)
                                        for unit in practice.ze_v_sem.split(", ")
                                    ]
                                )

                elif obj.selection_rule in [
                    "by_credit_units",
                    "no_more_than_n_credits",
                ]:
                    if childs.exists():
                        for child in childs:
                            recursion_module(child)
                    unit_final_sum = int(obj.selection_parametr)
            except ValueError:
                unit_final_sum = 0
            except AttributeError:
                unit_final_sum = 0
            except TypeError:
                unit_final_sum = 0
            obj.laboriousness = unit_final_sum
            obj.save()
            return unit_final_sum

        modules_for_count = DisciplineBlockModule.objects.filter(
            descipline_block__academic_plan__academic_plan_in_field_of_study__year__gte=2023
        ).distinct()

        for module in modules_for_count:
            print(module.name, module.id)
            module.laboriousness = recursion_module(module)
            print(module.laboriousness)
            module.save()
        print("done")
