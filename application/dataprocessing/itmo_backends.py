import hashlib

import requests
from django.conf import settings
from django.contrib.auth.models import Group
from django.http import HttpResponseRedirect
from django.utils.crypto import (
    get_random_string,
)
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken

from dataprocessing.models import User


class GetAuthenticationCodeISU(ListAPIView):
    permission_classes = [AllowAny]

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    def get_queryset(self, *args, **kwargs):

        if getattr(self, "swagger_fake_view", False):
            return User.objects.none()

    def get(self, request, **kwargs):
        cas_auth_uri = (
            "https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/auth?"
            "response_type=code&"
            f'client_id={settings.ISU["ISU_CLIENT_ID"]}&'
            f'redirect_uri={settings.ISU["ISU_REDIRECT_URI"]}&'
            f"scope=profile"
        )
        return HttpResponseRedirect(cas_auth_uri)


class AuthenticateByCodeISU(ListAPIView):
    permission_classes = [AllowAny]

    def get_serializer(self, *args, **kwargs):
        pass

    def get_serializer_class(self):
        pass

    @staticmethod
    def new_password_with_random(isu, given_name):
        password_rule = (f"{isu}" f"{given_name}" f"{get_random_string}").encode()

        return hashlib.sha256(password_rule).hexdigest()

    def get_queryset(self, *args, **kwargs):

        if getattr(self, "swagger_fake_view", False):
            return User.objects.none()

    def get(self, request, **kwargs):

        # Забираем код авторизации из GET параметра
        authorization_code = request.GET["code"]
        obtain_isu_url = requests.post(
            "https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/token",
            # params = {'code':{authorization_code}},
            data={
                "grant_type": "authorization_code",
                "client_id": f'{settings.ISU["ISU_CLIENT_ID"]}',
                "client_secret": f'{settings.ISU["ISU_CLIENT_SECRET"]}',
                "redirect_uri": f'{settings.ISU["ISU_REDIRECT_URI"]}',
                "code": {authorization_code},
            },
        )
        # Отправляем запрос на получение токена
        obtain_isu = obtain_isu_url.json()

        # Проверяем правильный ли ответ от ИСУ
        if "access_token" in obtain_isu:
            # Получаем информацию о пользователе
            isu_profile = requests.get(
                "https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/userinfo?",
                headers={"Authorization": f'Bearer {obtain_isu["access_token"]}'},
            ).json()

            # Проверяем есть ли пользователь в системе
            user = User.objects.filter(username=isu_profile["isu"])

            # Если пользователя нет, то регистрируем
            if not user:
                password = self.new_password_with_random(
                    isu_profile["isu"], isu_profile["given_name"]
                )

                user = User.objects.create_user(
                    username=isu_profile["isu"],
                    password=password,
                    first_name=isu_profile["given_name"],
                    last_name=isu_profile["family_name"],
                    isu_number=isu_profile["isu"],
                    is_active=True,
                )

                try:
                    user.patronymic = isu_profile["patronymic"]
                except:
                    pass

                user.save()

                groups = ["student"]
                for group in groups:
                    user.groups.add(Group.objects.get(name=group))

            else:
                user = user[0]
                password_rule = (
                    f'{isu_profile["isu"]}' f'{isu_profile["given_name"]}'
                ).encode()
                password = hashlib.sha256(password_rule).hexdigest()

                if user.check_password(password):
                    user.password = self.new_password_with_random(
                        isu_profile["isu"], isu_profile["given_name"]
                    )
                    user.save()

            # Авторизация
            refresh_token = TokenObtainPairSerializer().get_token(user)
            access_token = AccessToken().for_user(user)

            return HttpResponseRedirect(
                f'{settings.ISU["ISU_FINISH_URI"]}/{access_token}/{refresh_token}'
            )


def isu_client_credentials_request(url):
    obtain_isu_url = requests.post(
        "https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/token",
        data={
            "grant_type": "client_credentials",
            "client_id": f'{settings.ISU["ISU_CLIENT_ID"]}',
            "client_secret": f'{settings.ISU["ISU_CLIENT_SECRET"]}',
        },
    )
    obtain_isu = obtain_isu_url.json()
    if "access_token" in obtain_isu:
        req = requests.post(
            url, headers={"Authorization": "Bearer " + obtain_isu["access_token"]}
        )
