from django.conf.urls import url, include
from django.urls.conf import path
from rest_framework.routers import DefaultRouter
from .views import EducationalStandardListView, \
    EducationalStandardCreateView, EducationalStandardSingleObjectView, EducationalStandardSingleObjectDeleteView, \
    EducationalStandardSingleObjectEditView, TasksForProfStandardListView, TasksForProfStandardCreateView, \
    TasksForProfStandardSingleObjectView, TasksForProfStandardDeleteView, TasksForProfStandardEditView

urlpatterns = [

    # --образовательный стандарт
    path('api/educational_standarts', EducationalStandardListView.as_view()),
    path('api/educational_standarts/create', EducationalStandardCreateView.as_view()),
    path('api/educational_standarts/detail/<int:pk>', EducationalStandardSingleObjectView.as_view()),
    path('api/educational_standarts/delete/<int:pk>', EducationalStandardSingleObjectDeleteView.as_view()),
    path('api/educational_standarts/update/<int:pk>', EducationalStandardSingleObjectEditView.as_view()),

    # --задачи проф. стандарта
    path('api/task_prof_standarts', TasksForProfStandardListView.as_view()),
    path('api/task_prof_standarts/create', TasksForProfStandardCreateView.as_view()),
    path('api/task_prof_standarts/detail/<int:pk>', TasksForProfStandardSingleObjectView.as_view()),
    path('api/task_prof_standarts/delete/<int:pk>', TasksForProfStandardDeleteView.as_view()),
    path('api/task_prof_standarts/update/<int:pk>', TasksForProfStandardEditView.as_view()),

]
