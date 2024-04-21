import os

from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import filters
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from workprogramsapp.models import OutcomesOfWorkProgram, PrerequisitesOfWorkProgram
from workprogramsapp.permissions import IsRpdDeveloperOrReadOnly
from .models import User, Domain, Items, Relation
from .serializers import (
    DomainSerializer,
    ItemSerializer,
    ItemWithRelationSerializer,
    ItemCreateSerializer,
    RelationSerializer,
    RelationUpdateSerializer,
    FileUploadSerializer,
    RelationCreateSerializer,
    userProfileSerializer,
    ItemWithRelationForSearchDuplicatesSerializer,
    DomainDetailSerializer,
)


def handle_uploaded_file(file, filename):
    """Функция обработчик загружаемого файла."""
    if not os.path.exists("upload/"):
        os.mkdir("upload/")
    with open("upload/" + filename, "wb+") as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    with open("upload/" + filename, encoding="utf-8") as f:
        data = f.read()
    return data


def set_relation(item1, items_set, type_relation):
    try:
        print("Создаю связи")
        list_of_items = []
        saved = len(items_set)

        for item2 in items_set:
            print(item2)
            flag = 0

            if Relation.objects.filter(
                item1=item1, relation=type_relation, item2=item2
            ).exists():
                # Если связь с i уже существует, то увеличиваем count
                # Подсчет веса ребра
                print("Связь существует")
                relation = Relation.objects.get(
                    item1=item1, relation=type_relation, item2=item2
                )
                value = relation.count
                relation.count = int(value) + 1
                relation.save()
                saved = saved - 1
                flag = 1

            elif Relation.objects.filter(
                item1=item1, relation="0", item2=item2
            ).exists():
                print("Проверка на существование неопределенной связи")
                # or Relation.objects.filter(item1 = item1, relation = '7', item2=item2).exists()
                relation = Relation.objects.get(item1=item1, relation="0", item2=item2)
                relation.relation = type_relation
                relation.save()
                list_of_items.append(relation.item2)

            else:
                # Если нет, то добавляем новую запись
                print("Создание новой связи")
                relation = Relation(item1=item1, relation=type_relation, item2=item2)
                relation.save()
                list_of_items.append(relation.item2)

        # Подсчет значения вершины графа
        item = Items.objects.get(name=item1)
        value = item.value
        item.value = int(value) + saved
        item.save()

        if type_relation == "1":
            print('Создаю связь для типа "включает в себя')
            print(flag)
            if (
                flag == 0
                and Relation.objects.filter(item1=item1, relation="1").exists()
            ):
                print("ok-1")
                items = [
                    rel.item2
                    for rel in Relation.objects.filter(item1=item1, relation="1")
                ]
                list_of_items.extend(items)
                print(list_of_items)

            if len(list_of_items) > 1:
                print("pk-2")
                query = Items.objects.filter(name__in=list(set(list_of_items)))
                print(query)
                set_relation_linear(query, "2")
                print("finish")

        print("Связи созданы")
    except:
        msg = f"Что-то пошло не так:("
        return Response(msg, status=status.HTTP_400_BAD_REQUEST)


def set_relation_hierarchy(items_query, type_relation):
    """Запись иерархических связей и пререквизитов."""
    try:
        for key, value in items_query.items():
            print(key)
            names = value.split(", ")
            names = [i.strip() for i in names]
            items_set = Items.objects.filter(name__in=names)
            item1 = Items.objects.get(name=key.strip())
            set_relation(item1, items_set, type_relation)
        return Response(status=200)
    except:
        return Response(status=400)


def set_relation_linear(items_query, type_relation):
    """Запись линейных связей."""
    try:
        for item in items_query:
            items_set = items_query.exclude(name=item)
            item1 = Items.objects.get(name=item)
            set_relation(item1, items_set, type_relation)

        return Response(status=200)
    except:
        return Response(status=400)


# Api endpoints


class DomainListCreateAPIView(generics.ListCreateAPIView):
    """API endpoint that represents a list of Domains."""

    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["name"]
    filterset_fields = ["name", "user"]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    # def get_queryset(self):
    #    user = self.request.user
    #    return Domain.objects.filter(user=user)

    def perform_create(self, serializer):
        # print (Topic.objects.filter(discipline_section = serializer.validated_data['discipline_section']).count()+1)
        print(self.request.user)
        serializer.save(user=[self.request.user])


class DomainDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint that represents a single Domain."""

    queryset = Domain.objects.all()
    serializer_class = DomainDetailSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ItemsListCreateAPIView(generics.ListCreateAPIView):
    """API endpoint to create an Item."""

    queryset = Items.objects.all()
    serializer_class = ItemCreateSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["name"]
    filterset_fields = ["domain"]
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        domain_obj = Domain.objects.get(id=request.data.get("domain"))
        item_name = request.data.get("name")
        if Items.objects.filter(name=item_name, domain=domain_obj).exists():
            msg = f"Учебная сущность {item_name} уже существует!"
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = ItemCreateSerializer(data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save()
                print("Сохранение прошло")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemsListAPIView(generics.ListAPIView):
    """API endpoint to retrieve list of the items."""

    queryset = Items.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["name"]
    filterset_fields = ["domain"]
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ItemsWithRelationListAPIView(generics.ListAPIView):
    """API endpoint список всех сущностей со связями."""

    queryset = Items.objects.all()
    serializer_class = ItemWithRelationSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ItemDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint that represents a single Item."""

    queryset = Items.objects.all()
    serializer_class = ItemCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


# GET api/relation/ - Список связей (ответ JSON)
class RelationListAPIView(generics.ListAPIView):
    """API endpoint that represents a list of Relations."""

    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["item1__name", "relation", "item2__name"]
    permission_classes = [IsRpdDeveloperOrReadOnly]


'''
#POST api/relation/new - Создание новой связи
class RelationCreateAPIView(APIView):
    """
    API endpoint to create relation
    """
    def post(self, request):
        try:
            item1 = request.data.get("item1")
            relation = request.data.get("relation")
            item2 = request.data.get("item2")
            print(item1, item2, relation)
            item1 = Items.objects.get(pk = item1)
            item2 = [Items.objects.get(pk = item2),]
            set_relation(item1, item2, relation)
            return Response(status=200)
        except:
            return Response(status=400)
'''
# POST api/relation/create - Создание новой связи


class RelationCreateAPIView(generics.ListCreateAPIView):
    """API endpoint to create relation."""

    queryset = Relation.objects.all()
    serializer_class = RelationCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def create(self, request):
        try:
            item1 = request.data.get("item1")
            relation = request.data.get("relation")
            item2 = request.data.get("item2")
            item1 = Items.objects.get(pk=item1)
            item2 = [
                Items.objects.get(pk=item2),
            ]
            set_relation(item1, item2, relation)
            return Response(status=200)
        except:
            return Response(status=400)


# GET api/relation/{item1_id} - Список связей по ключевому слову (ответ JSON)
class RelationListItemIdAPIView(generics.ListAPIView):
    """API endpoint that represents a list of Relations by Item1 id."""

    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get_queryset(self):

        if getattr(self, "swagger_fake_view", False):
            return Relation.objects.none()

        item1 = self.kwargs["item1_id"]
        return Relation.objects.filter(item1__id=item1)


# GET api/relation/detail/{id} - Получить связь с определенным id (ответ JSON)
# DELETE api/relation/detail/{id} - Удалить связь с конкретным id
class RelationRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    """API endpoint that represents/delete a single Relation."""

    # добавить удаление сопутсвующих связей? ("является частью раздела" при удалении "включает в себя"")
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def delete(self, request, *args, **kwargs):
        try:
            obj = Relation.objects.get(pk=kwargs["pk"])
            item = Items.objects.get(name=obj.item1)
            value = item.value
            item.value = int(value) - 1
            item.save()
            return self.destroy(request, *args, **kwargs)
        except:
            return Response(status=400)


# PUT api/relation/update/{id} - Редактирование темы
# body: json(*) с измененными параметрами
class RelationUpdateAPIView(generics.RetrieveUpdateAPIView):
    """API endpoint for the relation update."""

    queryset = Relation.objects.all()
    serializer_class = RelationUpdateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def update(self, request, *args, **kwargs):

        if Relation.objects.filter(
            item1=request.data.get("item1"),
            relation=request.data.get("relation"),
            item2=request.data.get("item2"),
        ).exists():
            msg = f"Уже существует!"
            return Response(msg, status=status.HTTP_302_FOUND)
        else:
            old_relation = Relation.objects.get(id=kwargs["pk"])

            if old_relation.item1.pk != request.data.get("item1"):
                print("Замена item1")
                item_pk = request.data.get("item1")
                item = Items.objects.get(pk=item_pk)
                value = item.value
                item.value = int(value) + 1
                item.save()

                item = Items.objects.get(name=old_relation.item1)
                value = item.value
                item.value = int(value) - 1
                item.save()

            serializer = RelationCreateSerializer(
                Relation.objects.get(id=kwargs["pk"]), data=request.data
            )

            if serializer.is_valid(raise_exception=True):
                serializer.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListForSearchView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = userProfileSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["username", "first_name", "last_name"]
    permission_classes = [IsRpdDeveloperOrReadOnly]


# POST api/upload/
# body: { domain:str, relation:int }
class FileUploadAPIView(APIView):
    """API endpoint to upload txt-file with keywords."""

    @extend_schema(request=None, responses=None)
    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # once validated, grab the file from the request itself
        try:
            file = handle_uploaded_file(
                request.FILES["file"], str(request.FILES["file"])
            ).splitlines()
            items_list = []

            for i in file:
                items_list.extend(i.split(", "))

            domain_id = Domain.objects.get(name=request.data.get("domain")).id

            for i in items_list:
                if Items.objects.filter(name=i.strip()).exists():
                    continue
                else:
                    item = Items(
                        name=i.strip(),
                        domain=Domain.objects.get(pk=domain_id),
                        author=request.user,
                        source="uploaded",
                    )
                    item.save()

            type_relation = str(request.data.get("relation"))

            course = file[0].strip()
            file.remove(file[0])

            if type_relation in ["1", "4"]:
                print("create")
                data = dict(zip(file[::2], file[1::2]))
                data.update({course: ", ".join(file[::2])})
                set_relation_hierarchy(data, type_relation)

            else:
                data = {course: ", ".join(file)}
                items_query = [Items.objects.get(name=i.strip()) for i in items_list]
                items_query = Items.objects.filter(name__in=items_query)
                items_query = items_query.exclude(name=course)
                # Создаем связь верхнего уровня для дисциплины и связанных с ней эелементов
                set_relation_hierarchy(data, "1")
                # Создаем линейные связи между элементами
                set_relation_linear(items_query, type_relation)

            return Response(status=200)
        except:
            return Response(status=400)


class HighValueOutcomesListAPIView(generics.ListAPIView):
    """Возвращаем синонимы с наивысшим вэлью для результатов и
    пререквизитов."""

    serializer_class = ItemSerializer

    def get_queryset(self):

        if getattr(self, "swagger_fake_view", False):
            return Items.objects.none()

        out_items = OutcomesOfWorkProgram.objects.filter(
            workprogram__id=self.kwargs["workprogram_id"]
        )
        items = [q.item for q in out_items]
        result = []
        # получаем синонимы, если они существуют
        for obj in items:

            if Relation.objects.filter(item1=obj, relation=5).exists():
                qset = Relation.objects.filter(item1=obj, relation=5)
                item = {q.item2: q.item2.value for q in qset}
                print(item)
                max_key = max(item, key=lambda k: item[k])
                result.append(max_key)

            elif Relation.objects.filter(relation=5, item2=obj).exists():
                qset = Relation.objects.filter(relation=5, item2=obj)
                item = {q.item1: q.item1.value for q in qset}
                print(item)
                max_key = max(item, key=lambda k: item[k])
                result.append(max_key)
            else:
                result.append(obj)

        return Items.objects.filter(name__in=set(result))


class HighValuePrerequisitesListAPIView(generics.ListAPIView):
    """Возвращаем синонимы с наивысшим вэлью для результатов и
    пререквизитов."""

    serializer_class = ItemSerializer

    def get_queryset(self):

        if getattr(self, "swagger_fake_view", False):
            return Items.objects.none()

        pre_items = PrerequisitesOfWorkProgram.objects.filter(
            workprogram__id=self.kwargs["workprogram_id"]
        )
        items = [q.item for q in pre_items]
        result = []
        # получаем синонимы, если они существуют
        for obj in items:

            if Relation.objects.filter(item1=obj, relation=5).exists():
                qset = Relation.objects.filter(item1=obj, relation=5)
                item = {q.item2: q.item2.value for q in qset}
                print(item)
                max_key = max(item, key=lambda k: item[k])
                result.append(max_key)

            elif Relation.objects.filter(relation=5, item2=obj).exists():
                qset = Relation.objects.filter(relation=5, item2=obj)
                item = {q.item1: q.item1.value for q in qset}
                print(item)
                max_key = max(item, key=lambda k: item[k])
                result.append(max_key)
            else:
                result.append(obj)

        return Items.objects.filter(name__in=set(result))


class ItemsDetailForDuplicateSearchAPIView(generics.RetrieveAPIView):
    """API endpoint to retrieve list of the items."""

    queryset = Items.objects.all()
    serializer_class = ItemWithRelationForSearchDuplicatesSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()  # here the object is retrieved
        serializer = self.get_serializer(instance)
        serializer_for_duplicates = self.get_serializer(
            Items.objects.filter(name=instance.name), many=True
        )

        return Response(
            data=[serializer.data, serializer_for_duplicates.data],
            status=status.HTTP_200_OK,
        )
