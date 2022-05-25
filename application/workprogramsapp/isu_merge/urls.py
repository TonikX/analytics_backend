from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import FileUploadAPIView, FileUploadOldVersionAPIView
from .v_2.isu_parser import FileUploadAPIView_v2
from .v_2.isu_change_parser import ChangeParser

urlpatterns = [

    # --Общая характеристика
    path('api/isu_v1/upload/csv/', FileUploadOldVersionAPIView.as_view()),
    path('api/isu_v2/test', FileUploadAPIView_v2.as_view()),
    path('api-servises/isu_changeparser', ChangeParser),

]

# todo update scheduler
# if scheduler.get_state() == 0:
# scheduler.start_job()
