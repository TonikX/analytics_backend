from workprogramsapp.models import DisciplineBlockModuleInIsu


def discipline_block_module_object_relations_updater(discipline_block_module_object):
    print('try to start in module updater')
    for module in DisciplineBlockModuleInIsu.objects.filter(module=discipline_block_module_object):
        print('_____________________________-')
        print(module)
