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


class CharFilterInFilter(django_filters.rest_framework.CharFilter):
    pass


HIERARCHY = '1'
NOT_DEFINED = '0'
SAME_PARENT = '2'
HAVE_PREREQUISITE = '4'
SYNONYMS = '5'
NO = '7'

STATUS_CHOICES = (
    (NOT_DEFINED, 'неопределенное'),
    (HIERARCHY, 'включает в себя'),
    (SAME_PARENT, 'является частью одного раздела'),
    (HAVE_PREREQUISITE, 'имеет пререквизит'),
    (SYNONYMS, 'тождество'),
    (NO, 'отсутствует'),
)


class RelationFilter(django_filters.FilterSet):
    item1 = CharFilterInFilter(field_name="item1__name", lookup_expr='icontains')
    item2 = CharFilterInFilter(field_name="item2__name", lookup_expr='icontains')
    relation = django_filters.ChoiceFilter(choices=STATUS_CHOICES)
    #item2_filter = django_filters.CharFilter(lookup_expr='icontains')
    class Meta:
        model = Relation
        fields = {'item1', 'item2', 'relation'}

