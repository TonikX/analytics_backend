import django_tables2 as tables
from .models import FieldOfStudyWorkProgram
from django_tables2.utils import A

class FieldOfStudyWPTable(tables.Table):
    class Meta:
        model = FieldOfStudyWorkProgram
        template_name = "django_tables2/bootstrap4.html"
        fields = ("id","field_of_study","work_program", "competence")
        