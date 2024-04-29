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
        print(item)

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


# class SkillsOfProfessionInProfessionWithItemsList(generics.ListAPIView):
#     serializer_class = SkillsOfProfessionInProfessionCreateSerializer
#     filter_backends = [filters.OrderingFilter]
#     permission_classes = [IsAuthenticated]
#     pagination_class = PageNumberPagination
#
#
#     def get(self, request, *args, **kwargs):
#
#         if self.request.query_params.get('item_n') != None:
#             items = SkillsOfProfession.objects.filter(
#                 item__name__icontains=self.request.query_params.get('item_n')).values('id', 'item', 'item__name', 'masterylevel', 'profession__title').order_by('item__name')
#         else:
#             items = SkillsOfProfession.objects.values('id', 'item', 'item__name', 'masterylevel', 'profession__title').order_by('item__name')
#         rows = groupby(items, itemgetter('item__name'))
#         print (rows)
#         return Response({c_title: list(items) for c_title, items in rows})


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


# class SkillsOfRoleInRoleWithItemsList(generics.ListAPIView):
#     serializer_class = SkillsOfRoleInRoleCreateSerializer
#     filter_backends = [filters.OrderingFilter]
#     permission_classes = [IsAuthenticated]
#     #pagination_class = MyPaginator
#     #pagination_class = LimitOffsetPagination
#     paginate_by = 10
#     paginate_by_param = 'page_size'
#     max_paginate_by = 100
#
#
#     def list(self, request, *args, **kwargs):
#
#         if self.request.query_params.get('item_n') != None:
#             items = SkillsOfRole.objects.filter(
#                 item__name__icontains=self.request.query_params.get('item_n')).values('id', 'item', 'item__name', 'masterylevel', 'role__title').order_by('item__name')
#         else:
#             items = SkillsOfRole.objects.values('id', 'item', 'item__name', 'masterylevel', 'role__title').order_by('item__name')
#         rows = groupby(items, itemgetter('item__name'))
#         #paginator = MyPaginator()
#         print (items)
#         roles_with_items = {c_title: list(items) for c_title, items in rows}
#
#         # page = self.paginate(queryset)
#                 # if page is not None:
#                 #     #serializer = SkillsOfRoleInRoleCreateSerializer(page, many=True)
#                 #     return self.get_paginated_response(queryset)
#         #result_page = self.get_paginated_response(queryset)
#         # serializer = SkillsOfRoleInRoleCreateSerializer(result_page, many=True)
#         #serializer = SkillsOfRoleInRoleCreateSerializer(queryset, many=True)
#         print (roles_with_items)
#         #page = self.get_paginated_response(roles_with_items)
#
#         paginator = Paginator(roles_with_items, 10)
#
#         page = request.GET.get('page')
#         try:
#             roles_with_items = paginator.page(page)
#         except:
#             # If page is not an integer, deliver first page.
#             roles_with_items = paginator.page(1)
#
#         return Response(roles_with_items)
#         #return Response({c_title: list(items) for c_title, items in rows})


class ItemWithRoles(generics.ListAPIView):
    serializer_class = ItemWithRolesSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    permission_classes = [IsRpdDeveloperOrReadOnly]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        profs = SkillsOfRole.objects.all()
        # return Items.objects.prefetch_related('role_skils').all()
        return Items.objects.filter(item_in_sor__in=profs).distinct()


class SkillsOfRoleInRoleCreateAPIView(generics.CreateAPIView):
    serializer_class = SkillsOfRoleInRoleCreateSerializer
    queryset = SkillsOfRole.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        serializer = SkillsOfRoleInRoleCreateSerializer(data=request.data)

        # обновляем value для item
        item = Items.objects.get(id=request.data.get("item"))
        value = item.value
        item.value = int(value) + 1
        item.save()
        print(item)

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

            # изменяем значение value для item
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
        # return Items.objects.prefetch_related('profession_skils').all()
        return Items.objects.filter(item_in_sop__in=profs).distinct()
