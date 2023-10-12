from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import GroupOfOverProfCompetencesInGeneralCharacteristicsSet, \
    OverProfCompetencesInGroupOfGeneralCharacteristicSet, IndicatorGroupOfOverProfCompetencesInGeneralCharacteristicSet


router = DefaultRouter()
router.register(r'api/general_ch/group_of_over_prof_competence/competence/indicator',
                IndicatorGroupOfOverProfCompetencesInGeneralCharacteristicSet,
                basename='indicator-in-over-prof-competences-in-pkgroup-in-gh')
router.register(r'api/general_ch/group_of_over_prof_competence/competence',
                OverProfCompetencesInGroupOfGeneralCharacteristicSet, basename='over-prof-competences-in-pkgroup-in-ghh')
router.register(r'api/general_ch/group_of_over_prof_competence',
                GroupOfOverProfCompetencesInGeneralCharacteristicsSet, basename='pkgroup-in-gh')

urlpatterns = [

    url(r'^', include(router.urls))

]