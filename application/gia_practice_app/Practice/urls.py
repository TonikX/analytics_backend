from django.conf.urls import include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from gia_practice_app.Practice.views import (
    OutcomesPracticeSet,
    PracticeInFieldOfStudyForWorkProgramList,
    PracticeInFieldOfStudySet,
    PracticeSet,
    PracticeTemplateSet,
    PrerequisitesPracticeSet,
    ZunPracticeManyForAllGhViewSet,
    ZunPracticeManyViewSet,
    zun_many_remove,
)

router = DefaultRouter()

router.register(r"api/practice", PracticeSet, basename="practice")
router.register(
    r"api/practice/practice_template", PracticeTemplateSet, basename="practice-template"
)
router.register(
    r"api/practice-prerequisites",
    PrerequisitesPracticeSet,
    basename="prerequisites-practice",
)
router.register(
    r"api/practice-outcomes", OutcomesPracticeSet, basename="practice-outcomes"
)
router.register(
    r"api/practice-in-field-of-study",
    PracticeInFieldOfStudySet,
    basename="fos-practice",
)
router.register(
    r"api/zun/practice-many",
    ZunPracticeManyViewSet,
    basename="practice_zun_many_create",
)

router.register(
    r"api/zun/practice-many_create_for_all_gh",
    ZunPracticeManyForAllGhViewSet,
    basename="practice_zun_many_create_for_all_gh",
)

urlpatterns = [
    path(
        "api/practice/fieldofstudies_for_competences/<int:practice_id>",
        PracticeInFieldOfStudyForWorkProgramList.as_view(),
    ),
    path("api/zun/practice-many-remove", zun_many_remove),
    re_path(r"^", include(router.urls)),
]
