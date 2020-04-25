from django import forms
from .models import User, Domain, Items, Relation
from django.forms import inlineformset_factory
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column
from django.forms import CheckboxSelectMultiple
from django.contrib.auth.forms import UserCreationForm
import random

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Repeat password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name' )

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Passwords don\'t match.')
        return cd['password2']


class DomainForm(forms.ModelForm):
    class Meta:
        model = Domain
        fields = ('name', 'user')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['user'].widget.attrs.update({'class': 'selectpicker'})
        

class ItemsForm(forms.ModelForm):
    
    class Meta:
        model = Items
        fields = ('name', 'domain')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['domain'].widget.attrs.update({'class': 'selectpicker'})
    

class RelationForm(forms.ModelForm):
    """
        A) Выбрать ключевое слово 1, ключевое слово 2 и тип связи. 
        Как вариант, пусть слова выбираются случайно автоматически, 
        пользователю нужно только установить тип связи.
        B) Поиск синонимов (тождество). Пока только через вариант А), 
        но на будущее можно попытаться автоматизировать. На будущее, 
        подумать, что вообще делать с синонимами и переводами ключевых 
        слов на английский язык.  
 
    """
    # item1 = forms.ModelChoiceField(widget = forms.Select(attrs={'class': 'selectpicker','data-live-search':'true'}),
    #     label = 'Элементы РПД',initial= Items.objects.order_by("?").first(),
    #     queryset=Items.objects.order_by('name'))
    # item2 = forms.ModelMultipleChoiceField(widget = forms.SelectMultiple(attrs={'class': 'selectpicker','data-live-search':'true'}),
    #     label = 'Элементы РПД', initial= Items.objects.order_by("?").first(),
    #     queryset=Items.objects.order_by('name'))
    #
    class Meta:
        model = Relation
        fields = ('item1','relation', 'item2')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)    
        self.fields['relation'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})    

'''    
class RelationFormHierarhy(forms.ModelForm):
    """
        B) Иерархическая связь. 
        Автоматически выбрать ключевое слово (нужно выбирать либо такие, 
        у которых ещё не связей, либо такие, у которых высокая важность). 
        Автоматически выбрать связь «Включает в себя». Выбрать от 0 до 
        нескольких ключевых слов. Если выбрано несколько слов, то соединить 
        из связью «содержатся в одном разделе».
    """
    first_id = Items.objects.first().id
    last_id = Items.objects.last().id
    
    initial = Items.objects.order_by("?").first()
    rand_ids = random.sample(range(first_id, last_id), 10)
    query_set = Items.objects.filter(id__in=rand_ids).exclude(name = initial)

    item1 = forms.ModelChoiceField(widget = forms.Select(attrs={'class': 'selectpicker','data-live-search':'true'}),
        label = 'Элементы РПД',initial = initial, 
        queryset=Items.objects.all())
    item2 = forms.ModelMultipleChoiceField(widget = forms.CheckboxSelectMultiple, label = 'Выберите соотвествующие элементы РПД:',
        initial=query_set, queryset=query_set) 
    
    class Meta:
        model = Relation
        fields = ('item1','relation', 'item2')
   
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)    
        self.fields['relation'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})

class RelationFormPrerequisiter(forms.ModelForm):
    """
        В) Пререквизиты. Автоматически выбрать случайное ключевое слово. 
        Установить связь «является пререквизитом для». Автоматически выбрать 
        10 случайных слов из предметной области. Эксперт может из этих десяти 
        выбрать от 0 до 10 слов.  
        Г) Пререквизиты. То же самое, как и в предыдущем 
        случае, но связь в обратную сторону. То есть Автоматически выбираются 
        10 случайных слов из предметной области. Устанавливается связь «является 
        пререквизитом для». Автоматически выбирается одно ключевое слово. 
        Эксперт выбирает из 10 слов те, которые являются пререквизитами. 
    """
    first_id = Items.objects.first().id
    last_id = Items.objects.last().id

    rand_ids = random.sample(range(first_id, last_id), 10)
    initial = Items.objects.order_by("?").first()
    query_set = Items.objects.filter(id__in=rand_ids).exclude(name = initial)
    
    item1 = forms.ModelChoiceField(widget = forms.Select(attrs={'class': 'selectpicker','data-live-search':'true'}),
        label = 'Элементы РПД',initial= initial, 
        queryset=Items.objects.all())
    item2 = forms.ModelMultipleChoiceField(widget = forms.CheckboxSelectMultiple, label = 'Выберите соотвествующие элементы РПД:',
        initial=query_set, queryset=query_set) 
    
    class Meta:
        model = Relation
        fields = ('item1','relation', 'item2')
   
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)    
        self.fields['relation'].widget.attrs.update({'class': 'selectpicker','data-live-search':'true'})
        self.fields['relation'].initial = '3'

'''
class UploadFileForm(forms.Form):
    file = forms.FileField()

class LoginForm(forms.Form):

    """Форма для входа в систему
    """
    username = forms.CharField()
    password = forms.CharField()