import random
from datetime import timedelta

from django.conf import settings
from django.shortcuts import redirect
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.response import Response

from dataprocessing.models import User
from workprogramsapp.notifications.emails.models import SentMail
from workprogramsapp.notifications.emails.send_mail import mail_sender
from workprogramsapp.notifications.emails.serializers import (
    BaseEmailSerializer,
    EmailSerializer,
)
from workprogramsapp.notifications.models import EmailReset


@extend_schema(request=None, responses=None)
@api_view(["POST"])
@permission_classes(
    [
        IsAdminUser,
    ]
)
def CreateMail(request):
    """
    {
    "text": str,
    "topic": str,
    "groups": [str],
    "faculties": [int],
    "users": [int]
    "send_to_all: bool"
    }
    """
    serializer = BaseEmailSerializer(data=request.data)
    if serializer.is_valid():
        if serializer.validated_data["send_to_all"]:
            users_all = User.objects.all()
        else:
            users_all = (
                User.objects.filter(
                    groups__name__in=serializer.validated_data["groups"]
                )
                | User.objects.filter(
                    user_for_structural_unit__structural_unit__in=serializer.validated_data[
                        "faculties"
                    ]
                )
                | User.objects.filter(id__in=serializer.validated_data["users"])
            ).distinct()
        users_all = users_all.filter(do_email_notifications=True)
        emails = [user.email for user in users_all]
        mail = mail_sender(
            topic=serializer.validated_data["topic"],
            text=serializer.validated_data["text"],
            emails=emails,
            users=users_all,
        )
        return Response(EmailSerializer(mail).data, status=200)
    return Response(serializer.errors, status=500)


class EmailSet(viewsets.ModelViewSet):
    queryset = SentMail.objects.all()
    serializer_class = EmailSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    permission_classes = [IsAdminUser]


@extend_schema(request=None, responses=None)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def email_reset_request(request):
    # checking username
    email = request.data.get("email")
    user = request.user
    if email:
        EmailReset.objects.filter(user=user).delete()
        email_reset = EmailReset(
            user=user,
            key="".join(
                [
                    random.choice(
                        "!@$_-qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
                    )
                    for i in range(99)
                ]
            ),
            email=email,
        )
        email_reset.save()

        user.email = email
        user.save()

        # send email here
        subject = "op.itmo.ru: смена учетных данных"
        message = """
Здравствуйте, уважаемый пользователь!
Для подтверждения e-mail перейдите по ссылке: https://op.itmo.ru/api/email/confirm/{}

С уважением,
команда Конструктора ОП
        """.format(
            email_reset.key
        )
        recipient_list = [email]
        print(recipient_list)
        mail_sender(
            topic=subject, text=message, emails=recipient_list, users=[request.user]
        )
        return Response({"message": "success"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "empty mail"}, 404)


@extend_schema(request=None, responses=None)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def email_reset_confirm(request):
    # checking key
    queryset = EmailReset.objects.filter(key=request.data.get("key"))
    if queryset.exists():
        email_reset = queryset.first()
        email_reset.status = True
        email_reset.save()

        if email_reset.timestamp < timezone.now() - timedelta(minutes=30):
            # expired
            return Response(
                {"error": "email reset key is expired! Try fresh after some hours."}
            )
        else:
            # seting up the email
            user = email_reset.user
            user.email = queryset.first().email
            user.save()
            return Response({"message": "email updated successfully."})

    else:
        # invalid key
        return Response({"error": "Invalid key"})


@extend_schema(request=None, responses=None)
@api_view(["GET"])
@permission_classes((AllowAny,))
def CustomConfirmEmailView(request, key):
    try:
        print(key)
        email_reset = EmailReset.objects.get(key=key)
        print(email_reset)
        email_reset.status = True
        email_reset.save()
    except EmailReset.DoesNotExist:
        return redirect(f"{settings.URL_FRONT}email-confirm-success")

    if email_reset.timestamp < timezone.now() - timedelta(minutes=30):
        return redirect(f"{settings.URL_FRONT}email-confirm-error")
    else:
        user = email_reset.user
        user.email = email_reset.email
        user.save()
        # email_reset.delete()
        return redirect(f"{settings.URL_FRONT}")
