from requests import Response
from rest_framework import generics

from selection_of_keywords_for_rpd.models import RecommendationOfPrerequisitesFoUser
from selection_of_keywords_for_rpd.serializers import RecommendationOfPrerequisitesFoUserSerializer
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly


class RecommendationOfPrerequisitesFoUserList(generics.ListAPIView):
    queryset = RecommendationOfPrerequisitesFoUser.objects.all()
    serializer_class = RecommendationOfPrerequisitesFoUserSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(user=self.kwargs['user_id']))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
