from django.conf.urls import include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp.ap_improvement.competence_matrix import GetCompetenceMatrixCTE
from workprogramsapp.ap_improvement.views import (
    get_all_competences_and_indicators_for_wp_cte,
    get_all_ap_with_competences_and_indicators_cte,
)
from workprogramsapp.educational_program.views import (
    CompetenceCommentCreateView,
    CompetenceCommentsView,
    EducationalProgramCreateAPIView,
    EducationalProgramDestroyView,
    EducationalProgramDetailsView,
    EducationalProgramListAPIView,
    EducationalProgramUpdateView,
    EmployerSet,
    GeneralizedLaborFunctionsSet,
    GetCompetenceMatrix,
    KindsOfActivitySet,
    ObjectsOfActivitySet,
    UploadCompetences,
    UploadProfStandards,
    WorkProgramInFieldOfStudyWithAPByWP,
    academ_plan_check,
    get_all_unfilled_indicator,
    get_all_unfilled_wp,
    gh_check,
    new_ordinal_numbers_for_modules_in_ap,
    zun_copy,
    zun_copy_by_wps,
    zun_many_remove,
)
from workprogramsapp.educational_program.views import (
    GeneralCharacteristicsCreateAPIView,
    GeneralCharacteristicsDestroyView,
    GeneralCharacteristicsDetailsView,
    GeneralCharacteristicsDetailsWithEducationalProgramView,
    GeneralCharacteristicsListAPIView,
    GeneralCharacteristicsUpdateView,
)
from workprogramsapp.educational_program.views import ProfessionalStandardSet
from workprogramsapp.op_slection.views import (
    EducationalProgramRankingByProfession,
    EducationalProgramRankingByProfessionScientific,
)

router = DefaultRouter()

router.register(
    r"api/professionalstandard",
    ProfessionalStandardSet,
    basename="professional-standard",
)
router.register(
    r"api/generalizedlaborfunction",
    GeneralizedLaborFunctionsSet,
    basename="generalized-labor-function",
)
router.register(
    r"api/generalcharacteristic/kindsofactivity",
    KindsOfActivitySet,
    basename="kinds-of-activity",
)
router.register(
    r"api/generalcharacteristic/objectsofactivity",
    ObjectsOfActivitySet,
    basename="objects-of-activity",
)
router.register(
    r"api/generalcharacteristic/employers", EmployerSet, basename="employers"
)

urlpatterns = [
    # --Общая характеристика
    path("api/general_characteristic", GeneralCharacteristicsListAPIView.as_view()),
    path(
        "api/general_characteristic/create",
        GeneralCharacteristicsCreateAPIView.as_view(),
    ),
    path(
        "api/general_characteristic/detail/<int:pk>",
        GeneralCharacteristicsDetailsView.as_view(),
    ),
    path(
        "api/general_characteristic/delete/<int:pk>",
        GeneralCharacteristicsDestroyView.as_view(),
    ),
    path(
        "api/general_characteristic/update/<int:pk>",
        GeneralCharacteristicsUpdateView.as_view(),
    ),
    path(
        "api/general_characteristic/detail_with_educational_program/<int:pk>",
        GeneralCharacteristicsDetailsWithEducationalProgramView.as_view(),
    ),
    path("api/gh_check/<int:gh_id>", gh_check),
    path("api/general_characteristic/get_unfilled_wp/<int:gh_id>", get_all_unfilled_wp),
    path(
        "api/general_characteristic/get_unfilled_indicators/<int:gh_id>",
        get_all_unfilled_indicator,
    ),

    # --Образовательная программа
    path("api/EducationalProgram", EducationalProgramListAPIView.as_view()),
    path("api/EducationalProgram/create", EducationalProgramCreateAPIView.as_view()),
    path(
        "api/EducationalProgram/detail/<int:pk>",
        EducationalProgramDetailsView.as_view(),
    ),
    path(
        "api/EducationalProgram/delete/<int:pk>",
        EducationalProgramDestroyView.as_view(),
    ),
    path(
        "api/EducationalProgram/update/<int:pk>", EducationalProgramUpdateView.as_view()
    ),
    path("api/EducationalProgram/byprofessions", EducationalProgramRankingByProfession),
    path(
        "api/EducationalProgram/byprofessionsscience",
        EducationalProgramRankingByProfessionScientific,
    ),
    path("api/academicplan_check/<int:ap_id>", academ_plan_check),

    # --Компетенции
    path("api/competence/upload_comptence_from_csv", UploadCompetences),
    path("api/competence/get_all_ap_with_competences_and_indicators_to_wp/<int:wp_id>",
         get_all_ap_with_competences_and_indicators_cte),
    path("api/competence/get_all_competences_and_indicators_for_wp/<int:wp_id>",
         get_all_competences_and_indicators_for_wp_cte),
    path("api/competence/zun_many_remove", zun_many_remove),
    path("api/competence/zun_many_copy", zun_copy),
    path("api/competence/zun_copy_by_gh", zun_copy_by_wps),
    path("api/competence/comments/<int:pk>", CompetenceCommentsView.as_view()),
    path("api/competence/comments/create", CompetenceCommentCreateView.as_view()),

    # --Матрица компетенций
    path("api/general_characteristic/competence_matrix/<int:gen_pk>", GetCompetenceMatrixCTE),
    path("api/general_characteristic/competence_matrix_old/<int:gen_pk>", GetCompetenceMatrix),

    # --Проф. Стандарты
    path("api/competence/upload_prof_standard_from_csv", UploadProfStandards.as_view()),
    path(
        "api/new_ordinal_numbers_for_modules_in_ap",
        new_ordinal_numbers_for_modules_in_ap,
    ),

    # --Дополнительно
    path(
        "api/wp_in_fs/get_by_wp_id/<int:wp_id>",
        WorkProgramInFieldOfStudyWithAPByWP.as_view(),
    ),
    re_path(r"^", include(router.urls)),
    re_path(r"^", include("workprogramsapp.educational_program.key_competences.urls")),
    re_path(
        r"^",
        include(
            "workprogramsapp.educational_program.over_professional_competencies.urls"
        ),
    ),
    re_path(
        r"^",
        include("workprogramsapp.educational_program.general_prof_competencies.urls"),
    ),
    re_path(r"^", include("workprogramsapp.educational_program.pk_comptencies.urls")),
]
