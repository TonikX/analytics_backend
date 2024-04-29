from rest_framework import filters
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from dataprocessing.models import Items
from workprogramsapp.models import Profession, SkillsOfProfession, Role, SkillsOfRole
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly
from workprogramsapp.profession.serializers import (
    ItemWithProfessionsSerializer,
    ItemWithRolesSerializer,
    ProfessionCreateSerializer,
    ProfessionSerializer,
    RoleCreateSerializer,
    RoleSerializer,
    SkillsOfProfessionInProfessionCreateSerializer,
    SkillsOfProfessionInProfessionSerializer,
    SkillsOfRoleInRoleCreateSerializer,
    SkillsOfRoleInRoleSerializer,
)


class ProfessionsListApi(generics.ListAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title"]
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionsListWithoutPaginationApi(generics.ListAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    pagination_class = None
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title"]
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionCreateAPIView(generics.CreateAPIView):
    serializer_class = ProfessionCreateSerializer
    queryset = Profession.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionDestroyView(generics.DestroyAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionUpdateView(generics.UpdateAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ProfessionDetailsView(generics.RetrieveAPIView):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class SkillsOfProfessionInProfessionList(generics.ListAPIView):
    serializer_class = SkillsOfProfessionInProfessionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return SkillsOfProfession.objects.filter(
            profession__id=self.kwargs["profession_id"]
        )


class SkillsOfProfessionInProfessionCreateAPIView(generics.CreateAPIView):
    serializer_class = SkillsOfProfessionInProfessionCreateSerializer
    queryset = SkillsOfProfession.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        serializer = SkillsOfProfessionInProfessionCreateSerializer(data=request.data)

        # обновляем value для item
        item = Items.objects.get(id=request.data.get("item"))
        value = item.value
        item.value = int(value) + 1
        item.save()

        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)


class SkillsOfProfessionInProfessionDestroyView(generics.DestroyAPIView):
    queryset = SkillsOfProfession.objects.all()
    serializer_class = SkillsOfProfessionInProfessionCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        try:
            obj = SkillsOfProfession.objects.get(pk=kwargs["pk"])

            # изменяем значение value для item
            item = obj.item
            value = item.value
            item.value = int(value) - 1
            item.save()

            return self.destroy(request, *args, **kwargs)
        except Exception:
            return Response(status=400)


class SkillsOfProfessionInProfessionUpdateView(generics.UpdateAPIView):
    queryset = SkillsOfProfession.objects.all()
    serializer_class = SkillsOfProfessionInProfessionCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RolesListApi(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title"]
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RoleCreateAPIView(generics.CreateAPIView):
    serializer_class = RoleCreateSerializer
    queryset = Role.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RoleDestroyView(generics.DestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RoleUpdateView(generics.UpdateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RoleDetailsView(generics.RetrieveAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class SkillsOfRoleInRoleList(generics.ListAPIView):
    serializer_class = SkillsOfRoleInRoleSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return SkillsOfRole.objects.filter(role__id=self.kwargs["role_id"])


class MyPaginator(PageNumberPagination):
    page_size = 100
    page_size_query_param = "page_size"
    max_page_size = 1000


class ItemWithRoles(generics.ListAPIView):
    serializer_class = ItemWithRolesSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    permission_classes = [IsRpdDeveloperOrReadOnly]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        profs = SkillsOfRole.objects.all()
        return Items.objects.filter(item_in_sor__in=profs).distinct()


class SkillsOfRoleInRoleCreateAPIView(generics.CreateAPIView):
    serializer_class = SkillsOfRoleInRoleCreateSerializer
    queryset = SkillsOfRole.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        serializer = SkillsOfRoleInRoleCreateSerializer(data=request.data)

        item = Items.objects.get(id=request.data.get("item"))
        value = item.value
        item.value = int(value) + 1
        item.save()

        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)


class SkillsOfRoleInRoleDestroyView(generics.DestroyAPIView):
    queryset = SkillsOfRole.objects.all()
    serializer_class = SkillsOfRoleInRoleCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        try:
            obj = SkillsOfRole.objects.get(pk=kwargs["pk"])

            item = obj.item
            value = item.value
            item.value = int(value) - 1
            item.save()

            return self.destroy(request, *args, **kwargs)
        except Exception:
            return Response(status=400)


class SkillsOfRoleInRoleUpdateView(generics.UpdateAPIView):
    queryset = SkillsOfRole.objects.all()
    serializer_class = SkillsOfRoleInRoleCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ItemWithProfessions(generics.ListAPIView):
    serializer_class = ItemWithProfessionsSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    permission_classes = [IsRpdDeveloperOrReadOnly]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        profs = SkillsOfProfession.objects.all()
        return Items.objects.filter(item_in_sop__in=profs).distinct()
