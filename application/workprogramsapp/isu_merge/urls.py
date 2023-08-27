from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import FileUploadAPIView, FileUploadOldVersionAPIView, AcademicPlanUpdateExcelCreatorView, \
    AcademicPlanUpdateLogsView, AcademicPlanUpdateSchedulerConfigurationView, AcademicPlanUpdateConfigurationView, \
    AcademicPlanUpdateConfigurationUpdateView, AcademicPlanUpdateConfigurationCreateAPIView, \
    AcademicPlanUpdateSchedulerConfigurationUpdateView, UpdateAcademicPlansView, UpdateAcademicPlansHeadersView, \
    SendAcademicPlansLinesToIsu, IsuHistoryListView, SendWorkProgramToISU, SendPracticeToISU, SendGIAToISU, \
    UpdateModulesRelationships, UpdateAcademicPlans2023View, IsuModulesDuplicates
from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_scheduler import AcademicPlanUpdateScheduler
from .v_2.isu_change_parser import ChangeParser

urlpatterns = [

    # --Общая характеристика
    path('api/isu_v1/upload/csv/', FileUploadOldVersionAPIView.as_view()),
    path('api/isu_v2/academic-plans/update', UpdateAcademicPlansView.as_view()),
    path('api/isu_v2/academic-plans_2023/update', UpdateAcademicPlans2023View.as_view()),
    path('api-servises/isu_changeparser', ChangeParser),
    path('api/isu_v2/academic-plans/excel', AcademicPlanUpdateExcelCreatorView.as_view()),
    path('api/isu_v2/logs', AcademicPlanUpdateLogsView.as_view()),
    path('api/isu_v2/scheduler', AcademicPlanUpdateSchedulerConfigurationView.as_view()),
    path('api/isu_v2/scheduler/configuration/update', AcademicPlanUpdateSchedulerConfigurationUpdateView.as_view()),
    path('api/isu_v2/academic-plans/configuration', AcademicPlanUpdateConfigurationView.as_view()),
    path('api/isu_v2/academic-plans/configuration/create', AcademicPlanUpdateConfigurationCreateAPIView.as_view()),
    path('api/isu_v2/academic-plans/configuration/update/<int:pk>',
         AcademicPlanUpdateConfigurationUpdateView.as_view()),
    path('api/isu_v2/academic-plans/headers/update', UpdateAcademicPlansHeadersView.as_view()),
    path('api/isu_v2/modules/update_relationships', UpdateModulesRelationships.as_view()),
    path('api/isu_v2/academic-plans/send_to_isu', SendAcademicPlansLinesToIsu.as_view()),
    path('api/isu_v2/academic-plans/send_to_isu/history', IsuHistoryListView.as_view()),
    path('api/isu_v2/academic-plans/send_wp_to_isu/', SendWorkProgramToISU.as_view()),
    path('api/isu_v2/academic-plans/send_practice_to_isu/', SendPracticeToISU.as_view()),
    path('api/isu_v2/academic-plans/send_gia_to_isu/', SendGIAToISU.as_view()),

    # --Ису модули
    path('api/isu_modules/logs', IsuModulesDuplicates),
]

sd = AcademicPlanUpdateScheduler()
# todo uncomment to enable cron job
# sd.invoke_update_plans_job()
