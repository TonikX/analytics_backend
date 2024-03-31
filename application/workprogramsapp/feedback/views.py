from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import viewsets

from .models import FeedbackRecord
from .serializers import FeedbackRecordSerializer


class FeedbackRecordSet(viewsets.ModelViewSet):
    queryset = FeedbackRecord.objects.all()
    serializer_class = FeedbackRecordSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    )
    # filterset_fields = ['implementation_of_academic_plan__academic_plan__educational_profile',
    #                     'implementation_of_academic_plan__field_of_study__title',
    #                     'implementation_of_academic_plan__field_of_study__number',
    #                     'implementation_of_academic_plan__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__prerequisites__name',
    #                     'implementation_of_academic_plan__academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__work_program__outcomes__name',
    #                     ]
    # http_method_names = ['get', 'post']

    # def get_serializer_class(self):
    #     if self.action == 'list':
    #         return ShortIndividualImplementationAcademicPlanSerializer
    #     if self.action == 'create':
    #         return CreateIndividualImplementationAcademicPlanSerializer
    #     if self.action == 'update':
    #         return CreateIndividualImplementationAcademicPlanSerializer
    #     return IndividualImplementationAcademicPlanSerializer
