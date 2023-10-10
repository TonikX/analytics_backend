from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from dataprocessing.models import User
from workprogramsapp.notifications.models import UserNotification
from workprogramsapp.notifications.serializers import NotificationSerializer, NotificationCreateSerializer


# РПД
class NotificationListView(generics.ListAPIView):
    queryset = UserNotification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, **kwargs):
        queryset = UserNotification.objects.filter(user=request.user)
        queryset.update(status="read")
        print(queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CreateCustomNotification(generics.CreateAPIView):
    queryset = UserNotification.objects.all()
    serializer_class = NotificationCreateSerializer
    permission_classes = [IsAdminUser]


