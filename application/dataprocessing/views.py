from django.shortcuts import render, render_to_response,redirect, get_object_or_404
from django.http.response import HttpResponse,Http404
from .models import User, Domain, Items, Relation
from django.utils import timezone
from django.views import View,generic
from django.urls import reverse
import os

# Permissions
from workprogramsapp.permissions import IsOwnerOrReadOnly, IsRpdDeveloperOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

# Api-libs
from .serializers import DomainSerializer, ItemSerializer, ItemWithRelationSerializer, ItemCreateSerializer, RelationSerializer, RelationUpdateSerializer, FileUploadSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


def handle_uploaded_file(file, filename):
    """
        Функция обработчик загружаемого файла
    """
    if not os.path.exists('upload/'):
        os.mkdir('upload/')
    with open('upload/' + filename, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    with open('upload/' + filename, encoding = 'utf-8') as f:
        data=f.read()
    return data

def set_relation(item1, items_set, type_relation):
    print('set_relation')
    list_of_items = []
    
    saved = len(items_set)
    for item2 in items_set:
        #item2 = Items.objects.get(name = i)
        if Relation.objects.filter(item1 = item1, relation = type_relation, item2=item2).exists():
            #Если связь с i уже существует, то увеличиваем count
            #Подсчет веса ребра
            relation = Relation.objects.get(item1 = item1, relation = type_relation, item2=item2)
            value = relation.count
            relation.count = int(value) + 1
            relation.save()
            saved = saved - 1
        else:
            #Если нет, то добавляем новую запись
            relation = Relation(item1 = item1, relation = type_relation, item2 = item2)
            relation.save()
            list_of_items.append(relation.item2)
    #Подсчет значения вершины графа
    item = Items.objects.get(name = item1)
    value = item.value
    item.value = int(value) + saved
    item.save()
    print('ok-1')

    if type_relation == '1':
        query = Items.objects.filter(name__in = list_of_items)
        set_relation_linear(query,'2')
        
    print('ok-3')


def set_relation_hierarchy(items_query, type_relation):
    """
        Запись иерархических связей и пререквизитов
    """
    try:
        for key,value in items_query.items():
            names = value.split(', ')
            items_set = Items.objects.filter(name__in = names)
            item1 = Items.objects.get(name = key)
            set_relation(item1, items_set, type_relation)
        return Response(status=200)
    except:
        return Response(status=400)   
                
def set_relation_linear(items_query, type_relation):
    """
        Запись линейных связей
    """
    print('set_linear')
    try:
        for item in items_query:
            items_set = items_query.exclude(name = item)
            item1 = Items.objects.get(name = item)
            set_relation(item1, items_set, type_relation)

        return Response(status=200)
    except:
        return Response(status=400)


# Api endpoints

class DomainListCreateAPIView(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of Domains.
    """
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    filterset_fields = ['name','user']
    permission_classes = [IsRpdDeveloperOrReadOnly]

    #def get_queryset(self):
    #    user = self.request.user
    #    return Domain.objects.filter(user=user)

    def perform_create(self, serializer):
        # print (Topic.objects.filter(discipline_section = serializer.validated_data['discipline_section']).count()+1)
        print (self.request.user)
        serializer.save(user=[self.request.user])


class DomainDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Domain.
    """
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ItemsListCreateAPIView(generics.ListCreateAPIView):
    """
    Эндпоинт для создания сущностей
    """
    queryset = Items.objects.all()
    serializer_class = ItemCreateSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    filterset_fields = ['domain']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ItemsListAPIView(generics.ListAPIView):
    """
    API endpoint список всех сущностей
    """
    queryset = Items.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    filterset_fields = ['domain']
    permission_classes = [IsRpdDeveloperOrReadOnly]

class ItemsWithRelationListAPIView(generics.ListAPIView):
    """
    API endpoint список всех сущностей со связями
    """
    queryset = Items.objects.all()
    serializer_class = ItemWithRelationSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


class ItemDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Item.
    """
    queryset = Items.objects.all()
    serializer_class = ItemCreateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

#GET api/relation/ - Список связей (ответ JSON)
class RelationListCreateAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Relations.
    """
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['item1__name', 'relation__relation', 'item2__name']
    permission_classes = [IsRpdDeveloperOrReadOnly]


class RelationListCreateGroupsAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Relations.
    """
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    #filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    #filterset_fields = ['item1', 'relation', 'item2']
    permission_classes = [IsRpdDeveloperOrReadOnly]

    
#GET api/relation/{item1_id} - Список связей по домену (ответ JSON)
class RelationListAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Relations.
    """
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]
    
    def get_queryset(self):
        item1 = self.kwargs['item1_id']
        return Relation.objects.filter(item1__id=item1)

#GET api/relation/detail/{id} - Получить связь с определенным id (ответ JSON)
#DELETE api/relation/detail/{id} - Удалить связь с конкретным id  
class RelationRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    """
        API endpoint that represents a single Relation.
    """
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]

#PUT api/relation/update/{id} - Редактирование темы
        #body: json(*) с измененными параметрами
class RelationUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Relation.objects.all()
    serializer_class = RelationUpdateSerializer
    permission_classes = [IsRpdDeveloperOrReadOnly]


#POST api/upload/
#body: 
#{
#    domain:str
#    relation:int
#}
class FileUploadAPIView(APIView):
    def post(self, request):

        serializer = FileUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # once validated, grab the file from the request itself
        try:
            file = handle_uploaded_file(request.FILES['file'], str(request.FILES['file'])).splitlines()
            items_list = []
            
            for i in file:
                items_list.extend(i.strip().split(', '))

            domain_id = Domain.objects.get(name = request.data.get("domain")).id

            for i in items_list:
                if Items.objects.filter(name = i).exists():
                    continue;
                else:
                    item = Items(name = i, domain = Domain.objects.get(pk=domain_id),
                        author = request.user, source = 'uploaded')
                    item.save()
            
            type_relation = str(request.data.get("relation"))
            
            course = file[0]
            file.remove(file[0])  
            if type_relation in ['1','4']:
                data = dict(zip(file[::2],file[1::2]))
                data.update({course:', '.join(file[::2])})
                set_relation_hierarchy(data, type_relation)
  
            else:
                data = {course:', '.join(file)}
                items_query = [Items.objects.get(name = i) for i in items_list]
                items_query = Items.objects.filter(name__in = items_query)
                items_query = items_query.exclude(name = course)
                #Создаем связь верхнего уровня для дисциплины и связанных с ней эелементов
                set_relation_hierarchy(data, '1')
                #Создаем линейные связи между элементами
                set_relation_linear(items_query,type_relation) 
            return Response(status=200)  
        except:
            return Response(status=400)



#POST api/relation/new - Создание новой связи
class RelationPostAPIView(APIView):
    """Render the HTML template to post relations"""
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














