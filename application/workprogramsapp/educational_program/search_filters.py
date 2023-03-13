import django_filters

from workprogramsapp.models import DisciplineBlockModule, Competence


class CompetenceFilter(django_filters.FilterSet):
    type = django_filters.CharFilter(field_name='number', lookup_expr='istartswith')
    number = django_filters.CharFilter()

    class Meta:
        model = Competence
        fields = {'type' , 'number'}
