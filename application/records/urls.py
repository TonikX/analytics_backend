from django.urls import path
from .views import RecordOfWorkProgram, RecordOfAcademicPlan, RecordOfWorkProgramQuality, SimpleStatistic, \
    EmptyStringWp, WpWithoutAP, WpWithSimilarCode, \
    WpWithoutStructuralUnit, StructuralUnitWp, WorkProgramDetailsWithApAndSemesters, StructuralUnits, \
    OneAcademicPlanWithDescriptionWp, AcademicPlans

urlpatterns = [
    path('api/record/workprograms/quantity/<str:qualification>', RecordOfWorkProgram.as_view(),
         name='RecordWorkProgram'),
    path('api/record/workprograms/quality', RecordOfWorkProgramQuality.as_view(), name='RecordWorkProgramQuality'),
    path('api/record/academicplans/quantity/<str:qualification>/<str:year>', RecordOfAcademicPlan.as_view(),
         name='RecordEducationalProgram'),
    path('api/record/simple', SimpleStatistic),
    path('api/record/workprogram/getemptystring', EmptyStringWp),
    path('api/record/workprogram/wpwithoutap', WpWithoutAP),
    path('api/record/workprogram/similarcode', WpWithSimilarCode),
    path('api/record/structural/workprogram', StructuralUnitWp),
    path('api/record/structural/empty', WpWithoutStructuralUnit),
    path('api/record/structural_units', StructuralUnits),
    path('api/record/academic_plans', AcademicPlans),
    path('api/record/structural/workprogram_extend', WorkProgramDetailsWithApAndSemesters),
    path('api/record/academic_plan/academic_wp_description/<int:pk>', OneAcademicPlanWithDescriptionWp.as_view()),

]