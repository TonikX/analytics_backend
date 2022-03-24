from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from workprogramsapp.educational_program.views import EducationalProgramCreateAPIView, EducationalProgramListAPIView, \
    EducationalProgramDetailsView, EducationalProgramDestroyView, EducationalProgramUpdateView, UploadCompetences, \
    GeneralizedLaborFunctionsSet, KindsOfActivitySet, EmployerSet, GetCompetenceMatrix
from workprogramsapp.educational_program.views import GeneralCharacteristicsCreateAPIView, \
    GeneralCharacteristicsListAPIView, \
    GeneralCharacteristicsDetailsView, GeneralCharacteristicsDestroyView, GeneralCharacteristicsUpdateView, \
    GeneralCharacteristicsDetailsWithEducationalProgramView
from ..op_slection.views import EducationalProgramRankingByProfession, EducationalProgramRankingByProfessionScientific
from .views import ProfessionalStandardSet

router = DefaultRouter()
router.register(r'api/professionalstandard', ProfessionalStandardSet, basename='professional-standard')
router.register(r'api/generalizedlaborfunction', GeneralizedLaborFunctionsSet,
                basename='generalized-labor-function')
router.register(r'api/generalcharacteristic/kindsofactivity', KindsOfActivitySet, basename='kinds-of-activity')
router.register(r'api/generalcharacteristic/employers', EmployerSet, basename='employers')

urlpatterns = [

    # --Общая характеристика
    path('api/general_characteristic', GeneralCharacteristicsListAPIView.as_view()),
    path('api/general_characteristic/create', GeneralCharacteristicsCreateAPIView.as_view()),
    path('api/general_characteristic/detail/<int:pk>', GeneralCharacteristicsDetailsView.as_view()),
    path('api/general_characteristic/delete/<int:pk>', GeneralCharacteristicsDestroyView.as_view()),
    path('api/general_characteristic/update/<int:pk>', GeneralCharacteristicsUpdateView.as_view()),
    path('api/general_characteristic/detail_with_educational_program/<int:pk>',
         GeneralCharacteristicsDetailsWithEducationalProgramView.as_view()),

    # --Образовательная программа
    path('api/EducationalProgram', EducationalProgramListAPIView.as_view()),
    path('api/EducationalProgram/create', EducationalProgramCreateAPIView.as_view()),
    path('api/EducationalProgram/detail/<int:pk>', EducationalProgramDetailsView.as_view()),
    path('api/EducationalProgram/delete/<int:pk>', EducationalProgramDestroyView.as_view()),
    path('api/EducationalProgram/update/<int:pk>', EducationalProgramUpdateView.as_view()),
    path('api/EducationalProgram/byprofessions', EducationalProgramRankingByProfession),
    path('api/EducationalProgram/byprofessionsscience', EducationalProgramRankingByProfessionScientific),

    # --Компетенции
    path('api/competence/upload_comptence_from_csv', UploadCompetences),

    # --Матрица компетенций
    path('api/general_characteristic/competence_matrix/<int:gen_pk>', GetCompetenceMatrix),

    url(r'^', include(router.urls)),
    url(r'^', include('workprogramsapp.educational_program.key_competences.urls')),
    url(r'^', include('workprogramsapp.educational_program.over_professional_competencies.urls')),
    url(r'^', include('workprogramsapp.educational_program.general_prof_competencies.urls')),
    url(r'^', include('workprogramsapp.educational_program.pk_comptencies.urls')),

]
