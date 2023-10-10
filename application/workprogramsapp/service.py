from django_filters import rest_framework as filters
from .models import OnlineCourse


# class OnlineCourseFilter(filters.FilterSet):
#     title = CharFilterInFilter(field_name='title', lookup_expr='in')
#
#     class Meta:
#         model = OnlineCourse
#         fields = ['title']