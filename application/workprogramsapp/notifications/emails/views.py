import random
from datetime import timedelta


# from allauth.account.views import ConfirmEmailView
from django.utils import timezone
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.response import Response

from dataprocessing.models import User
from workprogramsapp.notifications.emails.models import SentMail
from workprogramsapp.notifications.emails.send_mail import mail_sender
from workprogramsapp.notifications.emails.serializers import BaseEmailSerializer, EmailSerializer
from workprogramsapp.notifications.models import EmailReset


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
        users_all = users_all.objects.filter(do_email_notifications=True)
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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def email_reset_request(request):
    # checking username
    email = request.data.get("email")
    user = request.user
    email_reset = EmailReset(
        user=user,
        key="".join(
            [random.choice("!@$_-qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890") for i in
             range(99)]
        ),
        email=email
    )
    email_reset.save()

    # send email here
    subject = "op.itmo.ru: смена учетных данных"
    message = """Ваш код для смены учетных данных: {}
   С уважением,
   команда Конструктора РПД""".format(email_reset.key)
    recipient_list = [email]
    print(recipient_list)
    mail_sender(topic=subject, text=message, emails=recipient_list, users=[request.user])
    return Response({"message": "success"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def email_reset_confirm(request):
    # checking key
    queryset = EmailReset.objects.filter(key=request.data.get("key"))
    if queryset.exists():
        email_reset = queryset.first()

        if email_reset.timestamp < timezone.now() - timedelta(minutes=30):
            # expired
            return Response({"error": "email reset key is expired! Try fresh after some hours."})
        else:
            # seting up the email
            user = email_reset.user
            user.email = queryset.first().email
            user.save()
            return Response({"message": "email updated successfully."})

    else:
        # invalid key
        return Response({"error": "Invalid key"})


"""class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, *args, **kwargs):
        print('работает')
        try:
            self.object = self.get_object()
        except Http404:
            self.object = None
        print('работает')
        user = User.objects.get(email=self.object.email_address.email)
        email = self.object.email_address
        email.verified = True
        email.save()
        redirect_url = 'https://outlance.wtf/'
        return redirect(redirect_url)

"""
