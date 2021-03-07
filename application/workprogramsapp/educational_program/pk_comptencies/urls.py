from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import GroupOfPkCompetencesInGeneralCharacteristicsSet, PkCompetencesInGroupOfGeneralCharacteristicSet, \
    IndicatorGroupOfPkCompetencesInGeneralCharacteristicSet


router = DefaultRouter()
router.register(r'api/general_ch/group_of_pk_competence/competence/indicator',
                IndicatorGroupOfPkCompetencesInGeneralCharacteristicSet,
                basename='indicator-in-pk-competences-in-pkgroup-in-gh')
router.register(r'api/general_ch/group_of_pk_competence/competence',
                PkCompetencesInGroupOfGeneralCharacteristicSet, basename='pk-competences-in-pkgroup-in-ghh')
router.register(r'api/general_ch/group_of_pk_competence',
                GroupOfPkCompetencesInGeneralCharacteristicsSet, basename='pkgroup-in-gh')
urlpatterns = [

    url(r'^', include(router.urls))

]