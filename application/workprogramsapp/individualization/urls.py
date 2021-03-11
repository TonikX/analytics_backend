from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import IndividualImplementationAcademicPlansSet, SaveImplementationAcademicPlans,  \
    IndividualImplementationAcademicPlanForUser

router = DefaultRouter()

router.register(r'api/individualization/individual_path',
                IndividualImplementationAcademicPlansSet, basename='individual_path')
urlpatterns = [

    path('api/individualization/individual_path/for_this_user/', IndividualImplementationAcademicPlanForUser.as_view()),
    path('api/individualization/save_for_user', SaveImplementationAcademicPlans),

    url(r'^', include(router.urls)),

    ]
