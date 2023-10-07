from django.core.management.base import BaseCommand, CommandError

from workprogramsapp.models import DisciplineBlockModule


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('nums', nargs='+', type=int)

    def handle(self, *args, **options):
        num = options['nums'][0]
        depth = options['nums'][1]
        father_id = options['nums'][2]
        father=DisciplineBlockModule.objects.get(id=father_id)
        for d in range(depth):
            random_objects = DisciplineBlockModule.objects.order_by('?')[0:num]
            new_modules = [DisciplineBlockModule.clone_module(module.id) for module in random_objects]

            if father:
                for i, obj in enumerate(new_modules):
                    obj.father = father
                    obj.save()
            father = new_modules[0]

            self.stdout.write(self.style.SUCCESS(str(new_modules)))
