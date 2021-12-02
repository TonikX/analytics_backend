from django.urls import path
from .views import number_of_academplans_by_qualification_and_year, RecordOfWorkProgramQuality, StructuralUnits, \
    AcademicPlans, report_of_number_of_workprograms_by_qualification
from .views import SimpleStatistic, EmptyStringWp, WpWithoutAP, WpWithSimilarCode, \
    WpWithoutStructuralUnit, StructuralUnitWp, FieldOfStudyPlanToISU, AllWpShort, WorkProgramDetailsWithApAndSemesters, \
    OneAcademicPlanWithDescriptionWp, AllAcademicPlanWithDescriptionWp, GetPrerequisitesAndOutcomesOfWpByStrUP, \
    EditorsByWPStatuses, GetAllWPsByEditor, GetAllWPsWithEmptyField, AllAcademicPlansWpExpertiseStatisticView

urlpatterns = [
    path('api/record/workprograms/quantity/<str:qualification>', report_of_number_of_workprograms_by_qualification), #'+'
    path('api/record/workprograms/quality', RecordOfWorkProgramQuality.as_view(), name='RecordWorkProgramQuality'),
    path('api/record/academicplans/quantity/<str:qualification>/<str:year>', number_of_academplans_by_qualification_and_year), #'+'
    path('api/record/simple', SimpleStatistic), #'+'
    path('api/record/workprogram/getemptystring', EmptyStringWp),#'-'
    path('api/record/workprogram/wpwithoutap', WpWithoutAP),#'-'
    path('api/record/workprogram/similarcode', WpWithSimilarCode),#'-'
    path('api/record/structural/workprogram', StructuralUnitWp), #'+'
    path('api/record/structural/empty', WpWithoutStructuralUnit), #'+'
    path('api/record/structural_units', StructuralUnits),
    path('api/record/academic_plans', AcademicPlans),
    path('api/record/structural/workprogram_extend', WorkProgramDetailsWithApAndSemesters),#'+'
    path('api/record/academic_plan/academic_wp_description/<int:pk>', OneAcademicPlanWithDescriptionWp.as_view()),#'+'

    # нет фронта
    path('api/record/workprogram/get_items_by_up_id/<int:pk>', GetPrerequisitesAndOutcomesOfWpByStrUP.as_view()),
    path('api/record/utils/fostoisu/<int:pk>', FieldOfStudyPlanToISU),
    path('api/record/workprogram/veryshortwp', AllWpShort),
    path('api/record/academic_plan/academic_wp_description/all', AllAcademicPlanWithDescriptionWp.as_view()),
    path('api/record/workprogram/editors_statuses', EditorsByWPStatuses),
    path('api/record/workprogram/editors_wp/<int:pk>', GetAllWPsByEditor.as_view()),
    path('api/record/workprogram/empty_field_wp', GetAllWPsWithEmptyField.as_view()),
    path('api/record/academic_plan/wp_statistic_for_academic_plan',
         AllAcademicPlansWpExpertiseStatisticView.as_view()),

]