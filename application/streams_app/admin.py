
from django.contrib import admin

# Register your models here.
from streams_app.models import Building, BuildingPart, Classroom, ClassroomGroup

admin.site.register(ClassroomGroup)
admin.site.register(Classroom)
admin.site.register(BuildingPart)
admin.site.register(Building)