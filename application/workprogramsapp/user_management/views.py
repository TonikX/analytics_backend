# Сериализаторы
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

# Права доступа
from dataprocessing.models import User


# Сериализаторы
from workprogramsapp.user_management.serializers import UserSerializer


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
