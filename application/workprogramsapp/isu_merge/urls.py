from django.urls import path

from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_scheduler import (
    AcademicPlanUpdateScheduler,
)
from workprogramsapp.isu_merge.v_2.isu_change_parser import ChangeParser
from workprogramsapp.isu_merge.views import (
    AcademicPlanUpdateConfigurationCreateAPIView,
    AcademicPlanUpdateConfigurationUpdateView,
    AcademicPlanUpdateConfigurationView,
    AcademicPlanUpdateExcelCreatorView,
    AcademicPlanUpdateLogsView,
    AcademicPlanUpdateSchedulerConfigurationUpdateView,
    AcademicPlanUpdateSchedulerConfigurationView,
    FileUploadOldVersionAPIView,
    IsuHistoryListView,
    IsuModulesDuplicates,
    SendAcademicPlansLinesToIsu,
    SendGIAToISU,
    SendPracticeToISU,
    SendWorkProgramToISU,
    UpdateAcademicPlans2023View,
    UpdateAcademicPlansHeadersView,
    UpdateAcademicPlansView,
    UpdateModulesRelationships,
)

urlpatterns = [
    path("api/isu_v1/upload/csv/", FileUploadOldVersionAPIView.as_view()),
    path("api/isu_v2/academic-plans/update", UpdateAcademicPlansView.as_view()),
    path(
        "api/isu_v2/academic-plans_2023/update", UpdateAcademicPlans2023View.as_view()
    ),
    path("api-servises/isu_changeparser", ChangeParser),
    path(
        "api/isu_v2/academic-plans/excel", AcademicPlanUpdateExcelCreatorView.as_view()
    ),
    path("api/isu_v2/logs", AcademicPlanUpdateLogsView.as_view()),
    path(
        "api/isu_v2/scheduler", AcademicPlanUpdateSchedulerConfigurationView.as_view()
    ),
    path(
        "api/isu_v2/scheduler/configuration/update",
        AcademicPlanUpdateSchedulerConfigurationUpdateView.as_view(),
    ),
    path(
        "api/isu_v2/academic-plans/configuration",
        AcademicPlanUpdateConfigurationView.as_view(),
    ),
    path(
        "api/isu_v2/academic-plans/configuration/create",
        AcademicPlanUpdateConfigurationCreateAPIView.as_view(),
    ),
    path(
        "api/isu_v2/academic-plans/configuration/update/<int:pk>",
        AcademicPlanUpdateConfigurationUpdateView.as_view(),
    ),
    path(
        "api/isu_v2/academic-plans/headers/update",
        UpdateAcademicPlansHeadersView.as_view(),
    ),
    path(
        "api/isu_v2/modules/update_relationships", UpdateModulesRelationships.as_view()
    ),
    path(
        "api/isu_v2/academic-plans/send_to_isu", SendAcademicPlansLinesToIsu.as_view()
    ),
    path("api/isu_v2/academic-plans/send_to_isu/history", IsuHistoryListView.as_view()),
    path("api/isu_v2/academic-plans/send_wp_to_isu/", SendWorkProgramToISU.as_view()),
    path(
        "api/isu_v2/academic-plans/send_practice_to_isu/", SendPracticeToISU.as_view()
    ),
    path("api/isu_v2/academic-plans/send_gia_to_isu/", SendGIAToISU.as_view()),
    # --Ису модули
    path("api/isu_modules/logs", IsuModulesDuplicates),
]

sd = AcademicPlanUpdateScheduler()
# todo uncomment to enable cron job
# sd.invoke_update_plans_job()
