from django.conf.urls import url, include
from django.urls.conf import path
from rest_framework.routers import DefaultRouter
from .views import AdditionalMaterialSet, StructuralUnitSet, UserStructuralUnitSet
router = DefaultRouter()
router.register(r'api/general_ch/additional_material_in_topic_of_rpd',
                AdditionalMaterialSet, basename='additional_material_in_topic_of_rpd')
router.register(r'api/structural_unit_set',
                StructuralUnitSet, basename='structural_unit')
router.register(r'api/user_structural_unit_set',
                UserStructuralUnitSet, basename='user_structural_unit_set')

urlpatterns = [
    url(r'^', include(router.urls)),


]