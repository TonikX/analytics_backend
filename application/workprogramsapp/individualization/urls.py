from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import IndividualImplementationAcademicPlansSet, SaveImplementationAcademicPlans,  \
    IndividualImplementationAcademicPlanForUser, WorkProgramInWorkProgramChangeInDisciplineBlockModuleSet,\
    DisciplineBlockModuleInDisciplineBlockSet, ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSet

router = DefaultRouter()

router.register(r'api/individualization/individual_path/elective',
                ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSet, basename='elective_specialization_in_individual_path')
router.register(r'api/individualization/individual_path/change_specialization',
                DisciplineBlockModuleInDisciplineBlockSet, basename='specialization_in_individual_path')
router.register(r'api/individualization/individual_path/change_workprogram',
                WorkProgramInWorkProgramChangeInDisciplineBlockModuleSet, basename='workprogram_in_individual_path')
router.register(r'api/individualization/individual_path',
                IndividualImplementationAcademicPlansSet, basename='individual_path')


urlpatterns = [

    path('api/individualization/individual_path/for_this_user/', IndividualImplementationAcademicPlanForUser.as_view()),
    path('api/individualization/save_for_user', SaveImplementationAcademicPlans),


    url(r'^', include(router.urls)),

    ]
