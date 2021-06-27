from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter


from .views import FileUploadAPIView, FileUploadOldVersionAPIView



urlpatterns = [

    # --Общая характеристика
    path('api/isu_v1/upload/csv/', FileUploadOldVersionAPIView.as_view()),

]