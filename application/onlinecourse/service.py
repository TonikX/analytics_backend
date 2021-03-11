from django_filters import rest_framework as filters
from django.db.models import Prefetch
from .models import OnlineCourse


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class OnlineCourseFilter(filters.FilterSet):
    """
    Фильтр Онлайн курсов
    """
    institution = CharFilterInFilter(field_name='institution', lookup_expr='in')
    platform = CharFilterInFilter(field_name='platform', lookup_expr='in')
    language = CharFilterInFilter(field_name='language', lookup_expr='in')

    class Meta:
        model = OnlineCourse
        fields = ['institution', 'platform', 'language']
