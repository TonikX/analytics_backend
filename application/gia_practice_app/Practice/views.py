from rest_framework import viewsets, filters, status, mixins
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from gia_practice_app.Practice.models import Practice, PracticeTemplate, PrerequisitesOfPractice, OutcomesOfPractice, \
    ZunPractice
from gia_practice_app.Practice.serializers import PracticeSerializer, PracticeTemplateSerializer, \
    PracticePrimitiveSerializer, ItemInPracticeCreateSerializer, OutcomesInPracticeCreateSerializer, \
    PracticeInFieldOfStudyCreateSerializer, ZunPracticeForManyCreateSerializer
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly, IsOwnerOrDodWorkerOrReadOnly
from workprogramsapp.models import PracticeInFieldOfStudy


class PracticeSet(viewsets.ModelViewSet):
    my_tags = ["Gia and Practice"]
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
    my_tags = ["Gia and Practice"]
    queryset = PracticeTemplate.objects.all()
    serializer_class = PracticeTemplateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsAdminUser]


class PrerequisitesPracticeSet(mixins.CreateModelMixin,
                   #mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   #mixins.ListModelMixin,
                   GenericViewSet):
    my_tags = ["Gia and Practice"]
    queryset = PrerequisitesOfPractice.objects.all()
    serializer_class = ItemInPracticeCreateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]


class OutcomesPracticeSet(mixins.CreateModelMixin,
                   #mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   #mixins.ListModelMixin,
                   GenericViewSet):
    my_tags = ["Gia and Practice"]
    queryset = OutcomesOfPractice.objects.all()
    serializer_class = OutcomesInPracticeCreateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]


class PracticeInFieldOfStudySet(#mixins.CreateModelMixin,
                   #mixins.RetrieveModelMixin,
                   #mixins.UpdateModelMixin,
                   #mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    my_tags = ["Gia and Practice"]
    queryset = PracticeInFieldOfStudy.objects.all()
    serializer_class = PracticeInFieldOfStudyCreateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]


class ZunPracticeManyViewSet(mixins.CreateModelMixin,
                   #mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   #mixins.ListModelMixin,
                   GenericViewSet):
    my_tags = ["Gia and Practice"]
    model = ZunPractice
    queryset = ZunPractice.objects.all()
    serializer_class = ZunPracticeForManyCreateSerializer
    http_method_names = ['post', 'delete', 'patch']

    def create(self, request, *args, **kwargs):
        """
        Example:
            {"pra_in_fss": [74089, 74090, 74091],
            "zun": {
              "indicator_in_zun": 16,
              "items": []
                }
            }
        """

        for pr_in_fs in request.data['pra_in_fss']:
            serializer = self.get_serializer(data=request.data['zun'])
            serializer.is_valid(raise_exception=True)
            serializer.save(practice_in_fs=PracticeInFieldOfStudy.objects.get(id=pr_in_fs))
        return Response(status=status.HTTP_201_CREATED)


class ZunPracticeViewSet(viewsets.ModelViewSet):
    my_tags = ["Gia and Practice"]
    queryset = ZunPractice.objects.all()
    serializer_class = ZunPracticeForManyCreateSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsOwnerOrDodWorkerOrReadOnly]
