from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from gia_practice_app.Practice.views import PracticeSet, PracticeTemplateSet

router = DefaultRouter()
router.register(r'api/practice', PracticeSet, basename='practice')
router.register(r'api/practice_template', PracticeTemplateSet, basename='practice-template')

urlpatterns  = [

    url(r'^', include(router.urls)),

]
