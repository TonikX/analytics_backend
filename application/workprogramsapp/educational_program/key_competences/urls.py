from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from workprogramsapp.educational_program.key_competences.views import (
    GroupOfKeyCompetencesInGeneralCharacteristicsSet,
    IndicatorGroupOfKeyCompetencesInGeneralCharacteristicSet,
    KeyCompetencesInGroupOfGeneralCharacteristicSet,
)

router = DefaultRouter()

router.register(
    r"api/general_ch/group_of_key_competence/competence/indicator",
    IndicatorGroupOfKeyCompetencesInGeneralCharacteristicSet,
    basename="indicator-in-key-competences-in-pkgroup-in-gh",
)
router.register(
    r"api/general_ch/group_of_key_competence/competence",
    KeyCompetencesInGroupOfGeneralCharacteristicSet,
    basename="key-competences-in-pkgroup-in-ghh",
)
router.register(
    r"api/general_ch/group_of_key_competence",
    GroupOfKeyCompetencesInGeneralCharacteristicsSet,
    basename="pkgroup-in-gh",
)

urlpatterns = [url(r"^", include(router.urls))]
