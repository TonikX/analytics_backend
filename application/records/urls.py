from django.urls import path
from .views import RecordOfWorkProgram, RecordOfAcademicPlan, RecordOfWorkProgramQuality,  SimpleStatistic, EmptyStringWp, WpWithoutAP, WpWithSimilarCode, \
    WpWithoutStructuralUnit, StructuralUnitWp,WorkProgramDetailsWithApAndSemesters, StructuralUnits, \
    OneAcademicPlanWithDescriptionWp, AcademicPlans
urlpatterns = [
    path('api/record/workprograms/quantity/<str:qualification>', RecordOfWorkProgram.as_view(), name='RecordWorkProgram'),
    path('api/record/workprograms/quality', RecordOfWorkProgramQuality.as_view(), name='RecordWorkProgramQuality'),
    path('api/record/academicplans/quantity/<str:qualification>/<str:year>', RecordOfAcademicPlan.as_view(), name='RecordEducationalProgram'),
    path('api/statistic/simple', SimpleStatistic),
    path('api/statistic/workprogram/getemptystring', EmptyStringWp),
    path('api/statistic/workprogram/wpwithoutap', WpWithoutAP),
    path('api/statistic/workprogram/similarcode', WpWithSimilarCode),
    path('api/statistic/structural/workprogram', StructuralUnitWp),
    path('api/statistic/structural/empty', WpWithoutStructuralUnit),
    path('api/statistic/structural_units', StructuralUnits),
    path('api/statistic/academic_plans', AcademicPlans),
    path('api/statistic/structural/workprogram_extend', WorkProgramDetailsWithApAndSemesters),
    path('api/statistic/academic_plan/academic_wp_description/<int:pk>', OneAcademicPlanWithDescriptionWp.as_view()),

]