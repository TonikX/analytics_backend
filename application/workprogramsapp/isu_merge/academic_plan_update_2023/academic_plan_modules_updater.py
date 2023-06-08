from django.db import transaction

from workprogramsapp.models import DisciplineBlockModuleInIsu, DisciplineBlockModule


def discipline_block_module_object_relations_updater(discipline_block_module_object):
    print('try to start in module updater')

    for module in DisciplineBlockModuleInIsu.objects.filter(module=discipline_block_module_object):
        print('_____________________________-')
        print(module)


@transaction.atomic()
def process_modules(modules: list):
    for isu_module in modules:
        module = DisciplineBlockModuleInIsu.objects.filter(isu_id=int(isu_module['id'])).first()
        print('- Module selected', module)
        print('-- Isu Module ID', isu_module["id"])
        if DisciplineBlockModuleInIsu.objects.filter(isu_id=isu_module['id'],
                                                     isu_father_id=isu_module['parent_id']).exists():
            print('--- Link information available')
        else:
            isu_module_in_db = DisciplineBlockModuleInIsu.objects.create(
                isu_id=isu_module['id'],
                isu_father_id=isu_module['parent_id'],
                )
            new_module = DisciplineBlockModule.create(name=isu_module['name'])
            print(DisciplineBlockModuleInIsu.objects.filter(isu_id=isu_module['parent_id']).first())
            if DisciplineBlockModuleInIsu.objects.filter(isu_id=isu_module['parent_id']).exists():
                father_module = DisciplineBlockModuleInIsu.objects.filter(isu_id=isu_module['parent_id']).\
                    first()
                father_module.childs.add(new_module)
                print('--- Trying to USE a child')
            else:
                father_module = DisciplineBlockModuleInIsu.objects.create(isu_id=isu_module['parent_id'])
                father_module.childs.add(new_module)
                print('--- Trying to create a child')
