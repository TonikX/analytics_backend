from django.conf.urls import include
from django.urls import re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp.educational_program.over_professional_competencies.views import (
    GroupOfOverProfCompetencesInGeneralCharacteristicsSet,
    OverProfCompetencesInGroupOfGeneralCharacteristicSet,
    IndicatorGroupOfOverProfCompetencesInGeneralCharacteristicSet,
)

router = DefaultRouter()

router.register(
    r"api/general_ch/group_of_over_prof_competence/competence/indicator",
    IndicatorGroupOfOverProfCompetencesInGeneralCharacteristicSet,
    basename="indicator-in-over-prof-competences-in-pkgroup-in-gh",
)
router.register(
    r"api/general_ch/group_of_over_prof_competence/competence",
    OverProfCompetencesInGroupOfGeneralCharacteristicSet,
    basename="over-prof-competences-in-pkgroup-in-ghh",
)
router.register(
    r"api/general_ch/group_of_over_prof_competence",
    GroupOfOverProfCompetencesInGeneralCharacteristicsSet,
    basename="pkgroup-in-gh",
)

urlpatterns = [re_path(r"^", include(router.urls))]
