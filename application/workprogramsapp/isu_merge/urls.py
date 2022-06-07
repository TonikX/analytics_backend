from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import FileUploadAPIView, FileUploadOldVersionAPIView, AcademicPlanUpdateExcelCreatorView, \
    AcademicPlanUpdateLogsView, AcademicPlanUpdateSchedulerConfigurationView, AcademicPlanUpdateConfigurationView, \
    AcademicPlanUpdateConfigurationUpdateView, AcademicPlanUpdateConfigurationCreateAPIView,\
    AcademicPlanUpdateSchedulerConfigurationUpdateView, UpdateAcademicPlansView
from .v_2.isu_change_parser import ChangeParser

urlpatterns = [

    # --Общая характеристика
    path('api/isu_v1/upload/csv/', FileUploadOldVersionAPIView.as_view()),
    path('api/isu_v2/academic-plans/update', UpdateAcademicPlansView.as_view()),
    path('api-servises/isu_changeparser', ChangeParser),
    path('api/isu_v2/academic-plans/excel', AcademicPlanUpdateExcelCreatorView.as_view()),
    path('api/isu_v2/logs', AcademicPlanUpdateLogsView.as_view()),
    path('api/isu_v2/scheduler', AcademicPlanUpdateSchedulerConfigurationView.as_view()),
    path('api/isu_v2/scheduler/configuration/update', AcademicPlanUpdateSchedulerConfigurationUpdateView.as_view()),
    path('api/isu_v2/academic-plans/configuration', AcademicPlanUpdateConfigurationView.as_view()),
    path('api/isu_v2/academic-plans/configuration/create', AcademicPlanUpdateConfigurationCreateAPIView.as_view()),
    path('api/isu_v2/academic-plans/configuration/update/<int:pk>', AcademicPlanUpdateConfigurationUpdateView.as_view())
]

# todo update scheduler
# if scheduler.get_state() == 0:
# scheduler.start_job()
