from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import GroupOfGeneralProfCompetencesInGeneralCharacteristicsSet, \
    GeneralProfCompetencesInGroupOfGeneralCharacteristicSet, IndicatorGroupOfGeneralProfCompetencesInGeneralCharacteristicSet


router = DefaultRouter()
router.register(r'api/general_ch/group_of_general_prof_competence/competence/indicator',
                IndicatorGroupOfGeneralProfCompetencesInGeneralCharacteristicSet,
                basename='indicator-in-general-prof-competences-in-pkgroup-in-gh')
router.register(r'api/general_ch/group_of_general_prof_competence/competence',
                GeneralProfCompetencesInGroupOfGeneralCharacteristicSet, basename='general-prof-competences-in-pkgroup-in-ghh')
router.register(r'api/general_ch/group_of_general_prof_competence',
                GroupOfGeneralProfCompetencesInGeneralCharacteristicsSet, basename='pkgroup-in-gh')

urlpatterns = [

    url(r'^', include(router.urls))

]