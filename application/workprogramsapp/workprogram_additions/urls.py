from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import AdditionalMaterialSet


router = DefaultRouter()
router.register(r'api/general_ch/additional_material_in_topic_of_rpd',
                AdditionalMaterialSet, basename='pkgroup-in-gh')

urlpatterns = [
    url(r'^', include(router.urls))
]