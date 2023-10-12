from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from selection_of_keywords_for_rpd.views import RecommendationOfPrerequisitesFoUserList

urlpatterns = [

    path('api/recommendation_of_prerequisites/<int:user_id>', RecommendationOfPrerequisitesFoUserList.as_view(),
         name='recommendation_of_prerequisites_for_user'),
    ]