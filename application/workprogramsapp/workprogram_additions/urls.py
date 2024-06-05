from django.conf.urls import include
from django.urls.conf import path, re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp.workprogram_additions.views import (
    AdditionalMaterialSet,
    ChangeSemesterInEvaluationsCorrect,
    CompetencesSet,
    GIAShortInfo,
    PracticeShortInfo,
    StructuralUnitSet,
    UserStructuralUnitSet,
    WorkProgramItemsPrerequisitesView,
    WorkProgramShortInfo,
    wp_in_general_characteristic,
)

router = DefaultRouter()

router.register(
    r"api/general_ch/additional_material_in_topic_of_rpd",
    AdditionalMaterialSet,
    basename="additional_material_in_topic_of_rpd",
)
router.register(
    r"api/structural_unit_set", StructuralUnitSet, basename="structural_unit"
)
router.register(
    r"api/user_structural_unit_set",
    UserStructuralUnitSet,
    basename="user_structural_unit_set",
)
router.register(r"api/competences_set", CompetencesSet, basename="competences_set")

urlpatterns = [
    path("api/gia/isu/<int:isu_id>", GIAShortInfo),
    path("api/practice/isu/<int:isu_id>", PracticeShortInfo),
    path("api/workprogram/in_gh/<int:gh_id>", wp_in_general_characteristic),
    path("api/workprogram/isu/<int:isu_id>", WorkProgramShortInfo),
    path(
        "api/workprogram/items_isu/<int:isu_id>",
        WorkProgramItemsPrerequisitesView.as_view(),
    ),
    path(
        "api/workprogram/make_evaluation_tools_correct",
        ChangeSemesterInEvaluationsCorrect,
    ),
    re_path(r"^", include(router.urls)),
]
