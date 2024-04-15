from django.contrib import admin

from onlinecourse.models import Institution, Platform, OnlineCourse

admin.site.register(Institution)
admin.site.register(OnlineCourse)
admin.site.register(Platform)
