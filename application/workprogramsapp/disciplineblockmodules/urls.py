from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from workprogramsapp.disciplineblockmodules.views import DisciplineBlockModuleCreateAPIView, \
    DisciplineBlockModuleDestroyView, DisciplineBlockModuleUpdateView, DisciplineBlockModuleShortListView, \
    DisciplineBlockModuleDetailListView, DisciplineBlockModuleDetailListForUserView, DisciplineBlockModuleDetailView, \
    InsertModule

urlpatterns = [
    path('api/disciplineblockmodule/create', DisciplineBlockModuleCreateAPIView.as_view()),
    path('api/disciplineblockmodule/delete/<int:pk>', DisciplineBlockModuleDestroyView.as_view()),
    path('api/disciplineblockmodule/update/<int:pk>', DisciplineBlockModuleUpdateView.as_view()),
    path('api/disciplineblockmodule/short', DisciplineBlockModuleShortListView.as_view()),
    path('api/disciplineblockmodule/list', DisciplineBlockModuleDetailListView.as_view()),
    path('api/disciplineblockmodule/list/for_this_user', DisciplineBlockModuleDetailListForUserView.as_view()),
    path('api/disciplineblockmodule/detail/<int:pk>', DisciplineBlockModuleDetailView.as_view()),
    path('api/disciplineblockmodule/insert', InsertModule),

]