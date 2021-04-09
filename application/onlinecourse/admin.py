from django.contrib import admin

from .models import Institution, Platform, OnlineCourse, CourseCredit, CourseFieldOfStudy

admin.site.register(Institution)
admin.site.register(Platform)
admin.site.register(OnlineCourse)
admin.site.register(CourseCredit)
admin.site.register(CourseFieldOfStudy)
