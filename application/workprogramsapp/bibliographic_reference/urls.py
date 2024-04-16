from django.conf.urls import include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from .views import (
    SearchInEBSCO,
    BibliographicReferenceViewSet,
    BibliographicReferenceCreateWithWpView,
)

router = DefaultRouter()
router.register(
    r"api/workprogram_sources/bibliographic_reference",
    BibliographicReferenceViewSet,
    basename="bibliographic_references",
)
urlpatterns = [
    path("api/workprogram_sources/search_in_ebsco", SearchInEBSCO),
    re_path(r"^", include(router.urls)),
    path(
        "api/workprogram_sources/bibliographic_reference/create_with_wp",
        BibliographicReferenceCreateWithWpView.as_view(),
    ),
    # path('api/source_in_workprogram/<int:workprogram_id>',
    #      WorkProgramSourceInWorkProgramList.as_view())
]
