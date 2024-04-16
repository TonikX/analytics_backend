from django.conf.urls import include
from django.urls import re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp.educational_program.general_prof_competencies.views import (
    GeneralProfCompetencesInGroupOfGeneralCharacteristicSet,
    GroupOfGeneralProfCompetencesInGeneralCharacteristicsSet,
    IndicatorGroupOfGeneralProfCompetencesInGeneralCharacteristicSet,
)

router = DefaultRouter()

router.register(
    r"api/general_ch/group_of_general_prof_competence/competence/indicator",
    IndicatorGroupOfGeneralProfCompetencesInGeneralCharacteristicSet,
    basename="indicator-in-general-prof-competences-in-pkgroup-in-gh",
)
router.register(
    r"api/general_ch/group_of_general_prof_competence/competence",
    GeneralProfCompetencesInGroupOfGeneralCharacteristicSet,
    basename="general-prof-competences-in-pkgroup-in-ghh",
)
router.register(
    r"api/general_ch/group_of_general_prof_competence",
    GroupOfGeneralProfCompetencesInGeneralCharacteristicsSet,
    basename="pkgroup-in-gh",
)

urlpatterns = [re_path(r"^", include(router.urls))]
