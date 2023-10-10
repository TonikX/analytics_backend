import django_filters

from workprogramsapp.models import DisciplineBlockModule


class DisciplineBlockModuleFilter(django_filters.FilterSet):
    class Meta:
        model = DisciplineBlockModule
        fields = {
            'id': ['exact'],
            'module_isu_id': ['exact', 'icontains'],
            'name': ['exact', 'icontains'],
            'descipline_block__name':['exact', 'icontains']
        }