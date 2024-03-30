from django.urls import path

import records.views as views


urlpatterns = [
    path(
        'api/record/academic_plan/academic_wp_description/<int:pk>',
        views.OneAcademicPlanWithDescriptionWp.as_view()
    ),
    path(
        'api/record/academic_plan/academic_wp_description/all',
        views.AllAcademicPlanWithDescriptionWp.as_view()
    ),
    path(
        'api/record/academic_plan/wp_statistic_for_academic_plan',
        views.AllAcademicPlansWpExpertiseStatisticView.as_view()
    ),
    path('api/record/academic_plans', views.AcademicPlans),
    path(
        'api/record/academicplan/get_wp_by_year/<int:pk>',
        views.AcademicPlanRealisedInYear.as_view()
    ),
    path(
        'api/record/academicplans/quantity/<str:qualification>/<str:year>',
        views.number_of_academplans_by_qualification_and_year
    ),
    path(
        'api/record/modules/get_empty_selection_rule',
        views.ModulesWithoutSelectionRules.as_view()
    ),
    path('api/record/simple', views.SimpleStatistic),
    path('api/record/structural/empty', views.WpWithoutStructuralUnit),
    path('api/record/structural/workprogram', views.StructuralUnitWp),
    path(
        'api/record/structural/workprogram_extend',
        views.WorkProgramDetailsWithApAndSemesters.as_view()
    ),
    path('api/record/structural_units', views.StructuralUnits),
    path('api/record/tools/counter_type', views.WorkProgramEvaluationToolsCounter.as_view()),
    path('api/record/utils/fostoisu/<int:pk>', views.FieldOfStudyPlanToISU),
    path('api/record/workprogram/duplicates', views.GetDuplicates),
    path('api/record/workprogram/editors_statuses', views.EditorsByWPStatuses),
    path('api/record/workprogram/editors_wp/<int:pk>', views.GetAllWPsByEditor.as_view()),
    path('api/record/workprogram/empty_field_wp', views.GetAllWPsWithEmptyField.as_view()),
    path(
        'api/record/workprogram/get_items_by_up_id/<int:pk>',
        views.GetPrerequisitesAndOutcomesOfWpByStrUP.as_view()
    ),
    path('api/record/workprogram/get_wp_by_year', views.WorkProgramRealisedInYear.as_view()),
    path('api/record/workprogram/getemptystring', views.EmptyStringWp),
    path('api/record/workprogram/similarcode', views.WpWithSimilarCode),
    path('api/record/workprogram/similarcode_grouped', views.WpWithSimilarCodeGrouped),
    path('api/record/workprogram/veryshortwp', views.AllWpShort),
    path('api/record/workprogram/wpwithoutap', views.WpWithoutAP),
    path(
        'api/record/workprograms/quality',
        views.RecordOfWorkProgramQuality.as_view(),
        name='RecordWorkProgramQuality'
    ),
    path(
        'api/record/workprograms/quantity/<str:qualification>',
        views.report_of_number_of_workprograms_by_qualification
    ),
]
