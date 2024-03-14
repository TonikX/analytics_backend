from django.core.management.base import BaseCommand, CommandError
from django.db import models
from django.db.models.functions import Concat
from django_cte import With

from workprogramsapp.models import DisciplineBlockModule, DisciplineBlockModuleInIsu


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        def make_modules_cte(cte):
            # non-recursive: get root nodes
            return DisciplineBlockModule.cte_objects.values(
                "id", "name", "selection_rule", "selection_parametr",
                p=models.F("father_module__id"),
                recursive_id=models.F("id"),
                recursive_name=models.F("name"),
                # db = models.F("descipline_block__id"),
                # full_name=models.F('name'),
                depth=models.Value(1, output_field=models.IntegerField()),
            ).union(
                # recursive union: get descendants
                cte.join(DisciplineBlockModule.cte_objects.all(), father_module=cte.col.id).values(
                    "id", "name", "selection_rule", "selection_parametr",
                    p=cte.col.p,
                    recursive_id=cte.col.recursive_id,
                    recursive_name=cte.col.recursive_name,
                    # db= cte.col.db,
                    depth=cte.col.depth + models.Value(1, output_field=models.IntegerField()),
                ),
                all=True,
            )

        cte = With.recursive(make_modules_cte)
        # descipline_block__academic_plan__id = 7304
        with print_sql(count_only=False):
            modules = (
                cte.join(DisciplineBlockModule.cte_objects.all(), id=cte.col.id).annotate(
                    recursive_name=cte.col.recursive_name,
                    recursive_id=cte.col.recursive_id, depth=cte.col.depth, p=cte.col.p).filter(id=146931).with_cte(cte)
            )
            print(modules)
        for module in modules.filter():
            print(module.p, module.recursive_name, module.recursive_id, module.depth)
