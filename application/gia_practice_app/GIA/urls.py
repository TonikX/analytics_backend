from django.conf.urls import include
from django.urls import re_path
from rest_framework.routers import DefaultRouter

from gia_practice_app.GIA.views import GIASet, GIABaseTemplateSet, CriteriaVKRSet

router = DefaultRouter()

router.register(r"api/gia", GIASet, basename="gia")
router.register(r"api/gia/gia_template", GIABaseTemplateSet, basename="gia-template")
router.register(r"api/gia/vkr_criteria", CriteriaVKRSet, basename="vkr-criteria")

urlpatterns = [
    re_path(r"^", include(router.urls)),
]
