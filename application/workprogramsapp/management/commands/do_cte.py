


from django.core.management.base import BaseCommand, CommandError
from django.db import models
from django.db.models.functions import Concat
from django_cte import With
from django_print_sql import print_sql_decorator, print_sql

from workprogramsapp.models import DisciplineBlockModule, DisciplineBlockModuleInIsu


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        def make_modules_cte(cte):
            # non-recursive: get root nodes
            return DisciplineBlockModule.cte_objects.values(
                "id", "name",
                p=models.F("childs__id"),
                recursive_id= models.F("id"),
                #db = models.F("descipline_block__id"),
                #full_name=models.F('name'),
                depth=models.Value(1, output_field=models.IntegerField()),
            ).union(
                # recursive union: get descendants
                cte.join(DisciplineBlockModule.cte_objects.all(), childs=cte.col.id).values(
                    "id", "name",
                    p=cte.col.p,
                    recursive_id = cte.col.recursive_id,
                    #db= cte.col.db,
                    depth=cte.col.depth + models.Value(1, output_field=models.IntegerField()),
                ),
                all=True,
            )

        cte = With.recursive(make_modules_cte)
        with print_sql(count_only=False):
            modules = (
                cte.join(DisciplineBlockModule.cte_objects.all(), id=cte.col.id).annotate(recursive_id = cte.col.recursive_id,depth=cte.col.depth, p=cte.col.p).filter(descipline_block__academic_plan__id=7304).with_cte(cte)
            )
            print(modules)
        """for module in modules.filter():
            print(module.p, module.name, module.recursive_id, module.depth)"""

