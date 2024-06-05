from django.contrib import admin

from streams_app.models import Building, BuildingPart, Classroom, ClassroomGroup


admin.site.register(Building)
admin.site.register(BuildingPart)
admin.site.register(Classroom)
admin.site.register(ClassroomGroup)
