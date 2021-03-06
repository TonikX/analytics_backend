from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter


from workprogramsapp.educational_program.views import EducationalProgramCreateAPIView, EducationalProgramListAPIView, \
    EducationalProgramDetailsView, EducationalProgramDestroyView, EducationalProgramUpdateView
from workprogramsapp.educational_program.views import GeneralCharacteristicsCreateAPIView, GeneralCharacteristicsListAPIView, \
    GeneralCharacteristicsDetailsView, GeneralCharacteristicsDestroyView, GeneralCharacteristicsUpdateView, \
    GeneralCharacteristicsDetailsWithEducationalProgramView
from workprogramsapp.educational_program.views import GroupOfPkCompetencesInGeneralCharacteristicsSet, PkCompetencesInGroupOfGeneralCharacteristicSet, IndicatorGroupOfPkCompetencesInGeneralCharacteristicSet
from ..op_slection.views import EducationalProgramRankingByProfession, EducationalProgramRankingByProfessionScientific

router = DefaultRouter()
router.register(r'api/general_ch/group_of_pk_competence/competence/indicator', IndicatorGroupOfPkCompetencesInGeneralCharacteristicSet, basename='indicator-in-pk-competences-in-pkgroup-in-gh')
router.register(r'api/general_ch/group_of_pk_competence/competence', PkCompetencesInGroupOfGeneralCharacteristicSet, basename='pk-competences-in-pkgroup-in-ghh')
router.register(r'api/general_ch/group_of_pk_competence', GroupOfPkCompetencesInGeneralCharacteristicsSet, basename='pkgroup-in-gh')

urlpatterns = [

    # --Общая характеристика
    path('api/GeneralCharacteristics', GeneralCharacteristicsListAPIView.as_view()),
    path('api/GeneralCharacteristics/create', GeneralCharacteristicsCreateAPIView.as_view()),
    path('api/GeneralCharacteristics/detail/<int:pk>', GeneralCharacteristicsDetailsView.as_view()),
    path('api/GeneralCharacteristics/delete/<int:pk>', GeneralCharacteristicsDestroyView.as_view()),
    path('api/GeneralCharacteristics/update/<int:pk>', GeneralCharacteristicsUpdateView.as_view()),
    path('api/GeneralCharacteristics/detail_with_educational_program/<int:pk>',
         GeneralCharacteristicsDetailsWithEducationalProgramView.as_view()),

    # --Образовательная программа
    path('api/EducationalProgram', EducationalProgramListAPIView.as_view()),
    path('api/EducationalProgram/create', EducationalProgramCreateAPIView.as_view()),
    path('api/EducationalProgram/detail/<int:pk>', EducationalProgramDetailsView.as_view()),
    path('api/EducationalProgram/delete/<int:pk>', EducationalProgramDestroyView.as_view()),
    path('api/EducationalProgram/update/<int:pk>', EducationalProgramUpdateView.as_view()),
    path('api/EducationalProgram/byprofessions', EducationalProgramRankingByProfession),
    path('api/EducationalProgram/byprofessionsscience', EducationalProgramRankingByProfessionScientific),

    url(r'^', include(router.urls)),
    url(r'^', include('workprogramsapp.educational_program.key_competences.urls')),
    url(r'^', include('workprogramsapp.educational_program.over_professional_competencies.urls')),
    url(r'^', include('workprogramsapp.educational_program.general_prof_competencies.urls')),

]