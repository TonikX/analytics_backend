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


class LoginForm(forms.Form):

    """Форма для входа в систему
    """
    username = forms.CharField()
    password = forms.CharField()