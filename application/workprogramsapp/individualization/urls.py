from django.conf.urls import include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp.individualization.views import (
    DisciplineBlockModuleInDisciplineBlockSet,
    ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleCreateAPIView,
    ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSet,
    IndividualImplementationAcademicPlanForUser,
    IndividualImplementationAcademicPlansSet,
    SaveImplementationAcademicPlans,
    WorkProgramInWorkProgramChangeInDisciplineBlockModuleSet,
)

router = DefaultRouter()

router.register(
    r"api/individualization/individual_path/elective",
    ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleSet,
    basename="elective_specialization_in_individual_path",
)
router.register(
    r"api/individualization/individual_path/change_specialization",
    DisciplineBlockModuleInDisciplineBlockSet,
    basename="specialization_in_individual_path",
)
router.register(
    r"api/individualization/individual_path/change_workprogram",
    WorkProgramInWorkProgramChangeInDisciplineBlockModuleSet,
    basename="workprogram_in_individual_path",
)
router.register(
    r"api/individualization/individual_path",
    IndividualImplementationAcademicPlansSet,
    basename="individual_path",
)


urlpatterns = [
    path(
        "api/individualization/individual_path/for_this_user/",
        IndividualImplementationAcademicPlanForUser.as_view(),
    ),
    path("api/individualization/save_for_user", SaveImplementationAcademicPlans),
    path(
        "api/individualization/individual_path/electives/create",
        ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModuleCreateAPIView.as_view(),
    ),
    re_path(r"^", include(router.urls)),
]
