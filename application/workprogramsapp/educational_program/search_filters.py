import django_filters

from workprogramsapp.models import Competence


class CompetenceFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name="number", lookup_expr="istartswith")
    number = django_filters.CharFilter()

    class Meta:
        model = Competence
        fields = {"name", "number"}
