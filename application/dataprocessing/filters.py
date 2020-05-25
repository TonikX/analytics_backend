import django_filters
from .models import Domain, Items, Relation


class ItemsFilter(django_filters.FilterSet):
    class Meta:
        model = Items
        fields = {"name",}

class DomainFilter(django_filters.FilterSet):
    class Meta:
        model = Domain
        fields = {"name": ["contains"],}

class RelationFilter(django_filters.FilterSet):
    item1__name = django_filters.CharFilter(lookup_expr='icontains')
    item2__name = django_filters.CharFilter(lookup_expr='icontains')
    class Meta:
        model = Relation
        fields = {'relation', }
