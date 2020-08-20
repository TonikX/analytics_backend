from django.shortcuts import render, render_to_response,redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.http.response import HttpResponse,Http404
from .models import User, Domain, Items, Relation
from django.core.exceptions import ObjectDoesNotExist
from django.template.context_processors import csrf
from django.utils import timezone
from django.views import View,generic
from .forms import UserRegistrationForm, DomainForm, ItemsForm, RelationForm
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import logout as auth_logout
from django.urls import reverse
from django.template import loader, RequestContext
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.template.loader import render_to_string
from django.contrib.auth.forms import UserChangeForm, PasswordChangeForm
from django_tables2.paginators import LazyPaginator
from django_tables2 import SingleTableView, RequestConfig
from .tables import DomainTable, RelationTable, ItemsTable
from .filters import RelationFilter, DomainFilter #, ItemsFilter
from django_filters.views import FilterView
from django_tables2.views import SingleTableMixin

class ItemsListView(View):
    ''' 
        Generate a list items views 
    '''
    model = Items

    def get(self,request):
        #items_list = Items.objects.order_by('name').all()
        #table.paginate(page=request.GET.get("page", 1), per_page=25)
        
        items = Items.objects.all()
        filter_set = ItemsFilter(request.GET, queryset  = items)
        table = ItemsTable(filter_set.qs, order_by="name")
        domain_list = Domain.objects.all()
        RequestConfig(request, paginate={"paginator_class": LazyPaginator, "per_page": 10}).configure(
                                                table)
        return render(request, 'dataprocessing/items_list.html', {"table": table,"filter_set":filter_set,  'domain_list': domain_list})

def detail_item(request, pk):
    # Render the HTML template 
    item = get_object_or_404(Items, pk=pk)
    relation = Relation.objects.filter(item1 = pk)
    print(relation)
    return render(request, 'dataprocessing/detail_items.html', {'item': item, 'relation':relation})

def item_delete(request, pk):
        items = Items.objects.get (pk = pk)
        items.delete()
        return redirect('/items/')


class RelationListView(SingleTableMixin, FilterView):
    """ Generate a table of relations"""
    model = Relation
    table_class = RelationTable
    template_name = 'dataprocessing/relation_list.html'
    filterset_class = RelationFilter

class DomainListView(SingleTableMixin, FilterView):
    """ Generate a table of domains"""

    model = Domain
    table_class = DomainTable
    template_name = 'dataprocessing/domain_list.html'
    filterset_class = DomainFilter


def index(request):
    """Render the HTML template index.html with the data in the context variable"""
    domain_list = Domain.objects.filter(user=request.user)
    num_domain = Domain.objects.all().count()
    num_relation = Relation.objects.all().count()
    num_items = Items.objects.filter(author = request.user).count()
    return render(
        request,
        'index.html',
        context={'num_domain':num_domain,'num_items':num_items,'num_relation':num_relation,'domain_list':domain_list}
    )


'''
class RelationPost(View):
    """Render the HTML template to post relations"""
    
    def get(self, request):
        form = RelationForm()
        return render(request, 'dataprocessing/edit_relation.html', {'form': form})

    def post(self, request):
        if request.method == "POST":
            form = RelationForm(request.POST)
            if form.is_valid():
                if Relation.objects.filter(item1 = form.cleaned_data['item1'], relation = form.cleaned_data['relation']).exists():
                    rel = Relation.objects.get(item1 = form.cleaned_data['item1'], relation = form.cleaned_data['relation'])
                    existed_items = rel.item2.all()
                    new_items = form.cleaned_data['item2']
    
                    for i in new_items:
                        if i in existed_items:
                            #Подсчет веса ребра
                            conn = Connection.objects.get(relation=rel, items=i)
                            value = conn.count
                            conn.count = int(value) + 1
                            conn.save()
                        else:
                            conn = Connection(relation_id = rel.id, items_id = i.id)
                            conn.save()
                            
                            if form.cleaned_data['relation'] == '1':
                                set_relation_linear(new_items,'2')
                    #Подсчет  вершины
                    item = Items.objects.get(id = rel.item1.id)
                    value = item.value
                    item.value = int(value) + new_items.count()
                    item.save()
                    return redirect('/relation/')
               
                relation = form.save(commit=False)
                form.save()

                if relation.relation == '1':
                    set_relation_linear(relation.item2.all(),'2')
                
                item = Items.objects.get(id = relation.item1.id)
                value = item.value
                item.value = int(value) + relation.item2.all().count()
                item.save()

                return redirect('/relation/')
        else:
            form = RelationForm()
        return render(request, 'dataprocessing/edit_relation.html', {'form': form})

class RelationPostUpdate(View):
    """ Render the HTML template to edit relations """
    def get(self, request, pk):
        relation = get_object_or_404(Relation, id=pk)
        form = RelationForm(instance=relation)
        return render(request, 'dataprocessing/edit_relation.html', {'form': form})


    def post(self, request, pk):
        relation = get_object_or_404(Relation, pk=pk)
        
        if request.method == "POST":
            form = RelationForm(request.POST, instance=relation)
            if form.is_valid():
                to_set = form.cleaned_data['item2']
                relation = form.save(commit=False)
                form.save()
               
                if relation.relation == '1':
                    set_relation_linear(to_set,'2')
               
                item = Items.objects.get(id = relation.item1.id)
                value = item.value
                item.value = int(value) + to_set.count()
                item.save()

                return redirect('/relation/')
        else:
            form = RelationForm(instance=relation)
        return render(request, 'dataprocessing/edit_relation.html', {'form': form})

'''
class DomainPost(View):
    """ Render the HTML template for superuser to create domain"""
    def get(self, request):
        form = DomainForm()
        return render(request, 'dataprocessing/edit_domain.html', {'form': form})

    def post(self, request):
        if request.method == "POST":
            form = DomainForm(request.POST)
            if form.is_valid():
                domain = form.save(commit=False)
                form.save()
                return redirect('/domain/')
        else:
            form = DomainForm()

        return render(request, 'dataprocessing/edit_domain.html', {'form': form})


class DomainPostUpdate(View):
    """Render the HTML template to edit domain"""
    def get(self, request, pk):
        domain = get_object_or_404(Domain, pk=pk)
        form = DomainForm(instance=domain)
        return render(request, 'dataprocessing/edit_domain.html', {'form': form})

    def post(self, request, pk):
        domain = get_object_or_404(Domain, pk=pk)
        if request.method == "POST":
            form = DomainForm(request.POST, instance=domain)
            if form.is_valid():
                domain = form.save(commit=False)
                form.save()
                return redirect('/domain/')
        else:
            form = DomainForm(instance = domain)
        return render(request, 'dataprocessing/edit_domain.html', {'form': form})


class ItemPost(View):
    """
        Render the HTML template to post items
    """
    def get(self, request):
        form = ItemsForm()
        return render(request, 'dataprocessing/edit_items.html', {'form': form})

    def post(self, request):
        if request.method == "POST":
            form = ItemsForm(request.POST)
            if form.is_valid():
                #Duplicate check
                if not Items.objects.filter(name = form.cleaned_data['name']).exists():
                    items = form.save(commit=False)
                    items.author = request.user
                    form.save()
                return redirect('/items/')
        else:
            form = ItemsForm()
        return render(request, 'dataprocessing/edit_items.html', {'form': form})

class ItemPostUpdate(View):
    """ 
        Render the HTML template to edit items
    """
    def get(self, request, pk):
        item = get_object_or_404(Items, pk=pk)
        form = ItemsForm(instance=item)
        return render(request, 'dataprocessing/edit_items.html', {'form': form})

    def post(self, request, pk):
        items = get_object_or_404(Items, pk=pk)
        if request.method == "POST":
            form = ItemsForm(request.POST, instance=items)
            if form.is_valid():
                items = form.save(commit=False)
                form.save()
                return redirect('/items/')
        else:
            form = ItemsForm(instance = items)
        return render(request, 'dataprocessing/edit_items.html', {'form': form})



def register(request):
    # Render the HTML template to register
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            # Create a new user object but avoid saving it yet
            new_user = user_form.save(commit=False)
            # Set the chosen password
            new_user.set_password(user_form.cleaned_data['password'])
            # Save the User object
            new_user.save()
            return render(request, 'accounts/login.html', {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'accounts/register.html', {'user_form': user_form})

@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)

        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return redirect(reverse('accounts:view_profile'))
        else:
            return redirect(reverse('accounts:change_password'))
    else:
        form = PasswordChangeForm(user=request.user)

        args = {'form': form}
        return render(request, 'accounts/change_password.html', args)


def upload(request):
    ''' 
        Функция обрабработки txt-файла. 
        Запись связей между сущностями:
            '0' – 'неопределенное'
            '1' – 'включает в себя'
            '2' – 'является частью одного раздела'
            '4' – 'имеет пререквизит'
            '5' – 'тождество'
            '7' – 'отсутствует' 
    '''
    try:
        if request.method == 'POST':
            file = handle_uploaded_file(request.FILES['file'], str(request.FILES['file'])).splitlines()
            items_list = []
            for i in file:
                items_list.extend(i.strip().split(', '))

            domain_id = Domain.objects.get(name = request.POST.get("domain")).id
            
            for i in items_list:
                if Items.objects.filter(name = i).exists():
                    continue;
                else:
                    item = Items(name = i, domain = Domain.objects.get(pk=domain_id),
                        author = request.user, source = 'uploaded')
                    item.save()
            
            type_relation = str(request.POST.get("relation"))
            #print(file)
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

    except:
        return HttpResponse("Ошибка при обработке файла")
    
    return redirect('/relation/')


import os
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
    
    if Relation.objects.filter(item1 = item1, relation = type_relation).exists():
        print ('+')
        #existed_query = Relation.objects.filter(item1 = item1, relation = type_relation)
        saved = len(items_set)
        for item2 in items_set:
            print (item2)
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

    else:
        print ('-')
        for item2 in items_set:
            print(item2)
            #item2 = Items.objects.get(name = i)
            relation = Relation(item1 = item1 , relation = type_relation, item2 = item2)
            relation.save()
            list_of_items.append(relation.item2)

        #Подсчет значения вершины графа
        item = Items.objects.get(id = item1.id)
        value = item.value
        item.value = int(value) + len(items_set)
        item.save()
        print('ok-2')

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
        
        
from .serializers import DomainSerializer, ItemSerializer, ItemWithRelationSerializer, ItemCreateSerializer, RelationSerializer, RelationUpdateSerializer, FileUploadSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class DomainListCreateAPIView(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of Domains.
    """
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    filterset_fields = ['name','user']

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

class ItemsListCreateAPIView(generics.ListCreateAPIView):
    """
    Эндпоинт для создания сущностей
    """
    queryset = Items.objects.all()
    serializer_class = ItemCreateSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    filterset_fields = ['domain']

class ItemsListAPIView(generics.ListAPIView):
    """
    API endpoint список всех сущностей
    """
    queryset = Items.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    filterset_fields = ['domain']

class ItemsWithRelationListAPIView(generics.ListAPIView):
    """
    API endpoint список всех сущностей со связями
    """
    queryset = Items.objects.all()
    serializer_class = ItemWithRelationSerializer


class ItemDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single Item.
    """
    queryset = Items.objects.all()
    serializer_class = ItemCreateSerializer

#GET api/relation/ - Список связей (ответ JSON)
class RelationListCreateAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Relations.
    """
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = RelationFilter


class RelationListCreateGroupsAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Relations.
    """
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    #filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    #filterset_fields = ['item1', 'relation', 'item2']    

    
#GET api/relation/{item1_id} - Список связей по домену (ответ JSON)
class RelationListAPIView(generics.ListAPIView):
    """
    API endpoint that represents a list of Relations.
    """
    queryset = Relation.objects.all()
    serializer_class = RelationSerializer
    
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

#PUT api/relation/update/{id} - Редактирование темы
        #body: json(*) с измененными параметрами
class RelationUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Relation.objects.all()
    serializer_class = RelationUpdateSerializer


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
            print ('item1', item1)
            try:
                new_items = [Items.objects.get(pk = i) for i in item2]
                print ('new items', new_items)
            except:
                print ("new item was not found")

            set_relation(item1, new_items, relation)


            print(item1, new_items, relation)
            set_relation(item1, new_items, relation)

            return Response(status=200)
        except:
            return Response(status=400)
















            # item1 = Items.objects.get(pk = item1)
            # print (item1)
            # # new_items = [Items.objects.filter(pk = i)[0] for i in item2]
            # # new_items = Items.objects.get(pk = item2)
            # new_items=[]
            # for i in item2:
            #     print ('in circle', Items.objects.get(pk = i))
            #     item = Items.objects.get(pk = i)
            #     new_items.append(item)
            #     print (new_items)
