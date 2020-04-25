import django_tables2 as tables
from .models import Items, Domain, Relation
from django_tables2.utils import A

class ItemsTable(tables.Table):
    name = tables.Column(linkify=("details", [tables.A("pk")])) # (viewname, args)
    edit = tables.LinkColumn('edit_items', args=[A('pk')], verbose_name = ' ',text=lambda record: " Редактировать", attrs={
        "a": {"style": "color: red;"}
    })

    class Meta:
        model = Items
        template_name = "django_tables2/bootstrap4.html"
        fields = ("id","name", "domain", "author", "value")

class DomainTable(tables.Table):
    name = tables.Column(linkify=("edit_domain", [tables.A("pk")])) # (viewname, args)
    edit = tables.LinkColumn('edit_domain', args=[A('pk')], verbose_name = ' ', text=lambda record: " Редактировать", attrs={
        "a": {"style": "color: red;"}
    })
    class Meta:
        model = Domain
        template_name = "django_tables2/bootstrap4.html"
        fields = ("id","name", "user")
        
class RelationTable(tables.Table):
    item1 = tables.Column(linkify=("details", [tables.A("pk")])) # (viewname, args)
    edit = tables.LinkColumn('edit_relation', args=[A('pk')], verbose_name = ' ', text=lambda record: " Редактировать", attrs={
        "a": {"style": "color: red;"}
    })
    class Meta:
        model = Relation
        template_name = "django_tables2/bootstrap4.html"
        fields = ("id","item1", "relation", "item2")
        
