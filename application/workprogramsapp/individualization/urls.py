from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import IndividualImplementationAcademicPlansSet, SaveImplementationAcademicPlans

router = DefaultRouter()

router.register(r'api/individualization/individual_path',
                IndividualImplementationAcademicPlansSet, basename='individual_path')
urlpatterns = [

    url(r'^', include(router.urls)),
    path('api/individualization/save_for_user', SaveImplementationAcademicPlans),

    ]
