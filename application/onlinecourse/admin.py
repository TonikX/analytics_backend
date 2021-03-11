from django.contrib import admin
from .models import Institution, Platform, OnlineCourse, CourseCredit, CourseRequirement, CourseFieldOfStudy,\
    CourseLearningOutcome, CourseWorkProgram

admin.site.register(Institution)
admin.site.register(Platform)
admin.site.register(OnlineCourse)
admin.site.register(CourseCredit)
admin.site.register(CourseRequirement)
admin.site.register(CourseFieldOfStudy)
admin.site.register(CourseLearningOutcome)
admin.site.register(CourseWorkProgram)
