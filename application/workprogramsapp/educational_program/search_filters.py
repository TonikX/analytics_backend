import django_filters

from workprogramsapp.models import DisciplineBlockModule, Competence


class CompetenceFilter(django_filters.FilterSet):
    type = django_filters.CharFilter(field_name='number', lookup_expr='istartswith')

    class Meta:
        model = Competence
        fields = {'type'}
