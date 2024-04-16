from django.conf.urls import include
from django.urls import re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp.educational_program.pk_comptencies.views import (
    GroupOfPkCompetencesInGeneralCharacteristicsSet,
    IndicatorGroupOfPkCompetencesInGeneralCharacteristicSet,
    PkCompetencesInGroupOfGeneralCharacteristicSet,
)

router = DefaultRouter()

router.register(
    r"api/general_ch/group_of_pk_competence/competence/indicator",
    IndicatorGroupOfPkCompetencesInGeneralCharacteristicSet,
    basename="indicator-in-pk-competences-in-pkgroup-in-gh",
)
router.register(
    r"api/general_ch/group_of_pk_competence/competence",
    PkCompetencesInGroupOfGeneralCharacteristicSet,
    basename="pk-competences-in-pkgroup-in-ghh",
)
router.register(
    r"api/general_ch/group_of_pk_competence",
    GroupOfPkCompetencesInGeneralCharacteristicsSet,
    basename="pkgroup-in-gh",
)
urlpatterns = [re_path(r"^", include(router.urls))]
