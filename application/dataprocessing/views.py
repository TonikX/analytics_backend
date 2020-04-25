from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from django.shortcuts import render, render_to_response,redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.http.response import HttpResponse,Http404
from .models import User, Domain, Items, Relation
from django.core.exceptions import ObjectDoesNotExist
from django.template.context_processors import csrf
from django.utils import timezone
from django.views import View,generic
from .forms import UserRegistrationForm, DomainForm, ItemsForm, RelationForm, UploadFileForm
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
''' 
    ItemsListView, RelationListView, DomainListView, DataListView 
    classes to generate a list items views 
'''
class ItemsListView(View):
    model = Items

    def get(self,request):
        #items_list = Items.objects.order_by('name').all()
        table = ItemsTable(Items.objects.all(), order_by="name")
        #table.paginate(page=request.GET.get("page", 1), per_page=25)
        domain_list = Domain.objects.all()
        RequestConfig(request, paginate={"paginator_class": LazyPaginator, "per_page": 10}).configure(
            table)
        return render(request, 'dataprocessing/items_list.html', {"table": table, 'domain_list': domain_list})

class RelationListView(SingleTableView):
    model = Relation
    table_class = RelationTable
    template_name = 'dataprocessing/relation_list.html'
    #def get_queryset(self):
    #    return Relation.objects.all()

class DomainListView(SingleTableView):
    model = Domain
    table_class = DomainTable
    template_name = 'dataprocessing/domain_list.html'
    #def get_queryset(self):
    #    return Domain.objects.all()

'''
    index to render the main page  
'''
@login_required
def index(request):
    # Render the HTML template index.html with the data in the context variable
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
    Relation Block
    post and edit relation views  
'''
@login_required
def edit_relation(request, pk):
    # Render the HTML template to edit relations
    relation = get_object_or_404(Relation, pk=pk)
    if request.method == "POST":
        form = RelationForm(request.POST, instance=relation)

        if form.is_valid():
            relation = form.save(commit=False)
            form.save()
            return redirect('/relation/')
    else:
        form = RelationForm(instance=relation)
    return render(request, 'dataprocessing/edit_relation.html', {'form': form})

def same_parent_relation(form):
    try:
        if form.cleaned_data['relation'] == '1':
            items_same_parent = list(form.cleaned_data['item2'])
            for item in items_same_parent:
                q = form.cleaned_data['item2'].exclude(name = item)
                item_id = Items.objects.get(name = item).id
                relation = Relation(item1 = Items.objects.get(pk = item_id), relation = '6')
                relation.save()
                relation.item2.set(q)
    except:
        pass

@login_required
def post_relation(request):
    # Render the HTML template to post relations
    if request.method == "POST":
        form = RelationForm(request.POST)
        if form.is_valid():
            same_parent_relation(form)
            relation = form.save(commit=False)
            form.save()
            item = Items.objects.get(id = relation.item1.id)
            value = item.value
            item.value = int(value) + relation.item2.all().count()
            item.save()
            return redirect('/relation/')
    else:
        form = RelationForm()
    return render(request, 'dataprocessing/edit_relation.html', {'form': form})
'''
    Domain Block
    post and edit domain views  
'''
@login_required
@permission_required('is_staff')
def post_domain(request):
    # Render the HTML template for superuser to create domain
    if request.method == "POST":
        form = DomainForm(request.POST)
        if form.is_valid():
            domain = form.save(commit=False)
            form.save()
            return redirect('/domain/')
    else:
        form = DomainForm()

    return render(request, 'dataprocessing/edit_domain.html', {'form': form})

@login_required
@permission_required('is_staff')
def edit_domain(request, pk):
    # Render the HTML template to edit domain
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

''' 
    Items Block
    post and edit item views  
'''

@login_required
def post_item(request):
    # Render the HTML template to post items
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

@login_required
def edit_item(request, pk):
    # Render the HTML template to edit items
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
@login_required
def detail_item(request, pk):
    # Render the HTML template to edit items
    item = get_object_or_404(Items, pk=pk)
    relation = Relation.objects.filter(item1 = pk)
    print(relation)
    return render(request, 'dataprocessing/detail_items.html', {'item': item, 'relation':relation})

@login_required
def item_delete(request, pk):
    items = Items.objects.get (pk = pk)
    items.delete()
    return redirect('/items/')

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
''' 
    File Upload Block
    views for uploading keywords via txt file
'''

def upload(request):
    try:
        if request.method == 'POST':
            data = handle_uploaded_file(request.FILES['file'], str(request.FILES['file'])).splitlines()
            items_list = []

            for i in data:
                items_list.extend(i.strip().split(', '))

            domain_id = Domain.objects.get(name = request.POST.get("domain")).id

            for i in items_list:
                if Items.objects.filter(name = i).exists():
                    continue;
                else:
                    item = Items(name = i, domain = Domain.objects.get(pk=domain_id),
                                 author = request.user, source = 'uploaded')
                    item.save()

            if request.POST.get("hierarchy"):
                print('hi')
                set_relation(data,"1")
            return redirect('/items/')
    except:
        HttpResponse("Что-то не так")
    return redirect('/items/')

"""
Функция обработчик загружаемого файла
"""
import os
def handle_uploaded_file(file, filename):
    if not os.path.exists('upload/'):
        os.mkdir('upload/')
    with open('upload/' + filename, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    with open('upload/' + filename, encoding = 'utf-8') as f:
        data=f.read()
    return data

def set_relation(file, type_relation):
    course = file[0]
    file.remove(file[0])
    section = file[::2]
    print(course, section)
    for t in section:
        print(Items.objects.get(name = t))
    new_items = [ Items.objects.get(name = t) for t in section ]
    #check whether relation already exist
    print(new_items)
    item_id = Items.objects.get(name = course).id
    print(item_id)
    rel = Relation(item1 = Items.objects.get(pk=item_id) , relation = type_relation)
    rel.save()
    print(rel)
    rel.item2.set(new_items)
    print('OK')
    items_same_parent = rel.item2.all()
    print('OK-1')
    same_parent_relation_2(items_same_parent)
    print('OK-2')

    data = dict(zip(file[::2],file[1::2]))

    for key,value in data.items():

        items_list = value.split(', ')
        items_query = [ Items.objects.get(name = i) for i in items_list]
        #check whether relation already exist

        item_id = Items.objects.get(name = key).id
        relation = Relation(item1 = Items.objects.get(pk=item_id) , relation = type_relation)
        relation.save()
        relation.item2.set(items_query)
        items_same_parent = relation.item2.all()
        same_parent_relation_2(items_same_parent)
        same_parent_relation_2(items_query)


"""
Функция, которая создает связь является частью одного раздела
пока не учитывает выбор на форме
плюс надо добавить обработчик других связей
"""

def same_parent_relation_2(items_same_parent):

    for item in items_same_parent:
        try:
            q = items_same_parent.exclude(name = item)
            item_id = Items.objects.get(name = item).id
            relation = Relation(item1 = Items.objects.get(pk = item_id), relation = '6')
            relation.save()
            print('ok')
            relation.item2.set(q)
        except:
            print(item)

