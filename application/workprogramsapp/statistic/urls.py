from django.conf.urls import url, include
from django.urls import path

from workprogramsapp.statistic.views import SimpleStatistic, EmptyStringWp, WpWithoutAP, WpWithSimilarCode, \
    WpWithoutStructuralUnit, StructuralUnitWp, FieldOfStudyPlanToISU, AllWpShort, WorkProgramDetailsWithApAndSemesters, \
    OneAcademicPlanWithDescriptionWp, AllAcademicPlanWithDescriptionWp, GetPrerequisitesAndOutcomesOfWpByStrUP, \
    EditorsByWPStatuses, GetAllWPsByEditor, GetAllWPsWithEmptyField

urlpatterns = [

    # Сатистика системы
    path('api/statistic/simple', SimpleStatistic),
    path('api/statistic/workprogram/getemptystring', EmptyStringWp),
    path('api/statistic/workprogram/wpwithoutap', WpWithoutAP),
    path('api/statistic/workprogram/similarcode', WpWithSimilarCode),
    path('api/statistic/workprogram/get_items_by_up_id/<int:pk>', GetPrerequisitesAndOutcomesOfWpByStrUP.as_view()),
    path('api/statistic/structural/workprogram', StructuralUnitWp),
    path('api/statistic/structural/empty', WpWithoutStructuralUnit),
    path('api/statistic/utils/fostoisu/<int:pk>', FieldOfStudyPlanToISU),
    path('api/statistic/workprogram/veryshortwp', AllWpShort),
    path('api/statistic/structural/workprogram_extend', WorkProgramDetailsWithApAndSemesters.as_view()),
    path('api/statistic/academic_plan/academic_wp_description/<int:pk>', OneAcademicPlanWithDescriptionWp.as_view()),
    path('api/statistic/academic_plan/academic_wp_description/all', AllAcademicPlanWithDescriptionWp.as_view()),
    path('api/statistic/workprogram/editors_statuses', EditorsByWPStatuses),
    path('api/statistic/workprogram/editors_wp/<int:pk>',GetAllWPsByEditor.as_view()),
    path('api/statistic/workprogram/empty_field_wp',GetAllWPsWithEmptyField.as_view())
    ]
