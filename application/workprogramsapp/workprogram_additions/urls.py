from django.conf.urls import url, include
from django.urls.conf import path
from rest_framework.routers import DefaultRouter

from .views import AdditionalMaterialSet, StructuralUnitSet, UserStructuralUnitSet, CompetencesSet, \
    ChangeSemesterInEvaluationsCorrect, WorkProgramShortInfo, WorkProgramItemsPrerequisitesView, PracticeShortInfo, \
    GIAShortInfo

router = DefaultRouter()
router.register(r'api/general_ch/additional_material_in_topic_of_rpd',
                AdditionalMaterialSet, basename='additional_material_in_topic_of_rpd')
router.register(r'api/structural_unit_set',
                StructuralUnitSet, basename='structural_unit')
router.register(r'api/user_structural_unit_set',
                UserStructuralUnitSet, basename='user_structural_unit_set')
router.register(r'api/competences_set',
                CompetencesSet, basename='competences_set')

urlpatterns = [
    url(r'^', include(router.urls)),

    path('api/workprogram/make_evaluation_tools_correct', ChangeSemesterInEvaluationsCorrect),
    path('api/workprogram/isu/<int:isu_id>', WorkProgramShortInfo),
    path('api/practice/isu/<int:isu_id>', PracticeShortInfo),
    path('api/gia/isu/<int:isu_id>', GIAShortInfo),
    path('api/workprogram/items_isu/<int:isu_id>', WorkProgramItemsPrerequisitesView.as_view()),


]