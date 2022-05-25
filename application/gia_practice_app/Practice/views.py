from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser

from gia_practice_app.Practice.models import Practice, PracticeTemplate
from gia_practice_app.Practice.serializers import PracticeSerializer, PracticeTemplateSerializer, \
    PracticePrimitiveSerializer
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly, IsOwnerOrDodWorkerOrReadOnly


class PracticeSet(viewsets.ModelViewSet):
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ["discipline_code", "title"]
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return PracticePrimitiveSerializer
        return PracticeSerializer


class PracticeTemplateSet(viewsets.ModelViewSet):
    queryset = PracticeTemplate.objects.all()
    serializer_class = PracticeTemplateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsAdminUser]
