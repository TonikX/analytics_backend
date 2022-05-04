from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from dataprocessing.models import User
from workprogramsapp.notifications.emails.models import SentMail
from workprogramsapp.notifications.emails.send_mail import mail_sender
from workprogramsapp.notifications.emails.serializers import BaseEmailSerializer, EmailSerializer


@api_view(['POST'])
@permission_classes([IsAdminUser, ])
def CreateMail(request):
    """
    {
    "text": str,
    "topic": str,
    "groups": [str],
    "faculties": [int],
    "users": [int]
    }
    """
    serializer = BaseEmailSerializer(data=request.data)
    if serializer.is_valid():
        users_all = (User.objects.filter(groups__name__in=serializer.validated_data["groups"]) | User.objects.filter(
            user_for_structural_unit__structural_unit__in=serializer.validated_data["faculties"]) | User.objects.filter(
            id__in=serializer.validated_data["users"])).distinct()
        emails = [user.email for user in users_all]
        mail = mail_sender(topic=serializer.validated_data["topic"], text=serializer.validated_data["text"],
                           emails=emails, users=users_all)
        return Response(EmailSerializer(mail).data, status=200)
    return Response(serializer.errors, status=500)


class EmailSet(viewsets.ModelViewSet):
    queryset = SentMail.objects.all()
    serializer_class = EmailSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsAdminUser]
