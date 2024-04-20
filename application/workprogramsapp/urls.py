from django.conf.urls import include
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from workprogramsapp import views as wpa_views
from workprogramsapp.educational_program import views as ep_views
from workprogramsapp.expertise import views as expertise_views
from workprogramsapp.files_export import views as fe_views
from workprogramsapp.folders_and_statistics import views as fas_views
from workprogramsapp.op_selection.views import CreateProfessionByKeywords
from workprogramsapp.profession import views as profession_views
from workprogramsapp.workprogram_additions.views import CopyContentOfWorkProgram

router = DefaultRouter()

router.register(
    r"api/zun/many_create", wpa_views.ZunManyViewSet, basename="zun_many_create"
)
router.register(
    r"api/zun/many_create_for_all_gh",
    wpa_views.ZunManyForAllGhViewSet,
    basename="zun_many_create_for_all_gh",
)

urlpatterns = [
    # path('api/indicator/', IndicatorListView.as_view(), name='indicator'),
    # path('api/indicator/<int:pk>', IndicatorUpdateView.as_view(), name='indicator_update'),
    path("api/competences", wpa_views.CompetencesListView.as_view(), name="comptence"),
    path(
        "api/competence/create",
        wpa_views.CompetenceCreateView.as_view(),
        name="comptence",
    ),
    path("api/competence/", wpa_views.CompetenceListView.as_view(), name="comptence"),
    path(
        "api/competence/<int:pk>",
        wpa_views.CompetenceUpdateView.as_view(),
        name="comptence_update",
    ),
    path(
        "api/competenceindicator/<int:pk>",
        wpa_views.CompetenceIndicatorDetailView.as_view(),
        name="comptenceindicator",
    ),
    path(
        "api/competenceindicator/indicator/delete",
        wpa_views.DeleteIndicatorFromCompetenceView.as_view(),
        name="DeleteIndicatorFromCompetenceView",
    ),
    path(
        "api/competenceindicator/indicator/add",
        wpa_views.AddIndicatorToCompetenceView.as_view(),
        name="AddIndicatorFromCompetenceView",
    ),
    # path('api/outcomesofworkprogram/<int:workprogram_id>', IndicatorForCompetence.as_view()),
    path("api/indicator", wpa_views.IndicatorListAPIView.as_view()),
    path("api/indicator/create", wpa_views.IndicatorCreateAPIView.as_view()),
    path("api/indicator/detail/<int:pk>", wpa_views.IndicatorDetailsView.as_view()),
    path("api/indicator/delete/<int:pk>", wpa_views.IndicatorDestroyView.as_view()),
    path("api/indicator/update/<int:pk>", wpa_views.IndicatorUpdateView.as_view()),
    path(
        "api/outcomesofworkprogram/<int:workprogram_id>",
        wpa_views.OutcomesOfWorkProgramList.as_view(),
    ),
    # Рабочая программа
    path("api/workprograms/", wpa_views.WorkProgramsListApi.as_view()),
    path("api/workprogram/create", wpa_views.WorkProgramCreateAPIView.as_view()),
    re_path(
        r"^api/workprogram/outcomes/prerequisites/relations/(?P<discipline_code>[0-9.]+)/$",
        wpa_views.WorkProgramsWithOutcomesToPrerequisitesForThisWPView.as_view(),
    ),
    re_path(
        r"^api/workprogram/prerequisites/outcomes/relations/(?P<discipline_code>[0-9.]+)/$",
        wpa_views.WorkProgramsWithPrerequisitesToOutocomesForThisWPView.as_view(),
    ),
    re_path(
        r"^api/workprogram/outcomes/relations/(?P<discipline_code>[0-9.]+)/$",
        wpa_views.WorkProgramsWithOutocomesForThisWPView.as_view(),
    ),
    path("api/workprogram/detail/<int:pk>", wpa_views.WorkProgramDetailsView.as_view()),
    path("api/workprogram/delete/<int:pk>", wpa_views.WorkProgramDestroyView.as_view()),
    path("api/workprogram/update/<int:pk>", wpa_views.WorkProgramUpdateView.as_view()),
    path(
        "api/workprogram/update_editors/<int:pk>",
        wpa_views.WorkProgramEditorsUpdateView.as_view(),
    ),
    path(
        "api/workprogram/update_status/<int:pk>",
        wpa_views.WorkProgramArchiveUpdateView.as_view(),
    ),
    path(
        "api/workprogram/br/update/<int:pk>",
        wpa_views.WorkProgramBibliographicReferenceUpdateView.as_view(),
    ),
    path("api/workprogram/clone", wpa_views.CloneWorkProgramm),
    path("api/workprogram/merge_content", CopyContentOfWorkProgram),
    path(
        "api/workprogramsinfieldofstudy",
        wpa_views.WorkProgramInFieldOfStudyListView.as_view(),
    ),
    path(
        "api/workprogram/change_relations",
        wpa_views.NewRealtionsForWorkProgramsInFieldOfStudyAPI,
    ),
    path("api/workprogram/change_items", wpa_views.ChangeItemsView),
    # path('api/workprogram/itemrelations/<char:discipline_code>', WorkProgramDetailsWithDisciplineCodeView.as_view()),
    re_path(
        r"^api/workprogram/itemrelations/(?P<discipline_code>[0-9.]+)/$",
        wpa_views.WorkProgramDetailsWithDisciplineCodeView.as_view(),
    ),
    re_path(
        r"^api/workprogram/fullitemrelations/(?P<discipline_code>[0-9.]+)/$",
        wpa_views.WorkProgramFullDetailsWithDisciplineCodeView.as_view(),
    ),
    path("api/workprogram/getbynumbers", wpa_views.DisciplinesByNumber),
    path(
        "api/workprogram/fieldofstudies/<int:workprogram_id>",
        wpa_views.FieldOfStudiesForWorkProgramList.as_view(),
    ),
    path(
        "api/workprogram/fieldofstudies_for_competences/<int:workprogram_id>",
        wpa_views.WorkProgramInFieldOfStudyForWorkProgramList.as_view(),
    ),
    path(
        "api/workprogram/fieldofstudies_for_competences_for_matrix/<int:workprogram_id>/<int:gh_id>",
        wpa_views.WorkProgramInFieldOfStudyForWorkProgramForGHList.as_view(),
    ),
    path(
        "api/workprograminfieldofstudy/",
        wpa_views.WorkProgramInFieldOfStudyListAPI.as_view(),
    ),
    path(
        "api/workprograminfieldofstudy/<int:pk>",
        wpa_views.WorkProgramInFieldOfStudyDetailAPI.as_view(),
    ),
    path("api/zun/", wpa_views.ZunListAPI.as_view()),
    path(
        "api/zun/delete/competence/<int:competences_id>/wp_in_fs/<int:wp_in_fs_id>",
        wpa_views.ZunDetailAPI.as_view(),
    ),
    # Работы с темами и разделами
    path("api/tools/", wpa_views.EvaluationToolListAPI.as_view(), name="tools"),
    path(
        "api/tools/<int:pk>",
        wpa_views.EvaluationToolDetailAPI.as_view(),
        name="tool_detail",
    ),
    path(
        "api/toolsinworkprogram/<int:workprogram_id>",
        wpa_views.EvaluationToolInWorkProgramList.as_view(),
    ),
    path(
        "api/sections/", wpa_views.DisciplineSectionListAPI.as_view(), name="sections"
    ),
    path(
        "api/sections/<int:pk>",
        wpa_views.DisciplineSectionDetailAPI.as_view(),
        name="section_detail",
    ),
    # path('api/sections/NewOrdinalNumbers', NewOrdinalNumbersForDesciplineSectionAPI.as_view()),
    path(
        "api/sections/NewOrdinalNumbers",
        wpa_views.NewOrdinalNumbersForDesciplineSectionAPI,
    ),
    path("api/topics/", wpa_views.TopicsListAPI.as_view(), name="topics"),
    path("api/topics/create", wpa_views.TopicCreateAPI.as_view()),
    path(
        "api/topics/<int:pk>", wpa_views.TopicDetailAPI.as_view(), name="topic_detail"
    ),
    path("api/topics/NewOrdinalNumbers", wpa_views.NewOrdinalNumbersForTopicAPI),
    # Работа с результатами
    path(
        "api/outcomesofworkprogram/<int:workprogram_id>",
        wpa_views.OutcomesOfWorkProgramList.as_view(),
    ),
    path(
        "api/outcomesofworkprogram/create",
        wpa_views.OutcomesOfWorkProgramCreateAPIView.as_view(),
    ),
    path(
        "api/outcomesofworkprogram/delete/<int:pk>",
        wpa_views.OutcomesOfWorkProgramDestroyView.as_view(),
    ),
    path(
        "api/outcomesofworkprogram/update/<int:pk>",
        wpa_views.OutcomesOfWorkProgramUpdateView.as_view(),
    ),
    path(
        "api/outcomesofworkprogramforacademycplan/<int:workprogram_id>",
        wpa_views.OutcomesForWorkProgramChangeBlock.as_view(),
    ),
    # Работа с пререквизитами
    path(
        "api/prerequisitesofworkprogram/<int:workprogram_id>",
        wpa_views.PrerequisitesOfWorkProgramList.as_view(),
    ),
    path(
        "api/prerequisitesofworkprogram/create",
        wpa_views.PrerequisitesOfWorkProgramCreateAPIView.as_view(),
    ),
    path(
        "api/prerequisitesofworkprogram/delete/<int:pk>",
        wpa_views.PrerequisitesOfWorkProgramDestroyView.as_view(),
    ),
    path(
        "api/prerequisitesofworkprogram/update/<int:pk>",
        wpa_views.PrerequisitesOfWorkProgramUpdateView.as_view(),
    ),
    # Работа с образовательными программами
    path("api/fieldofstudy/", wpa_views.FieldOfStudyListCreateView.as_view()),
    path(
        "api/fieldofstudy/<int:pk>",
        wpa_views.FieldOfStudyDetailUpdateDeleteView.as_view(),
    ),
    # Библиографическая ссылка
    path(
        "api/BibliographicReference",
        wpa_views.BibliographicReferenceListCreateAPIView.as_view(),
    ),
    path(
        "api/BibliographicReference/create",
        wpa_views.BibliographicReferenceListCreateAPIView.as_view(),
    ),
    path(
        "api/BibliographicReference/detail/<int:pk>",
        wpa_views.BibliographicReferenceDetailsView.as_view(),
    ),
    path(
        "api/BibliographicReference/delete/<int:pk>",
        wpa_views.BibliographicReferenceDestroyView.as_view(),
    ),
    path(
        "api/BibliographicReference/update/<int:pk>",
        wpa_views.BibliographicReferenceUpdateView.as_view(),
    ),
    path(
        "api/bibliographicreferenceinworkprogram/<int:workprogram_id>",
        wpa_views.BibliographicReferenceInWorkProgramList.as_view(),
    ),
    # Работа с файлами (загрузка/экспорт)
    path("api/upload/wp", wpa_views.FileUploadWorkProgramAPIView.as_view()),
    path(
        "api/upload/wpwithoutcomes",
        wpa_views.FileUploadWorkProgramOutcomesAPIView.as_view(),
    ),
    path("api/upload/csv", wpa_views.FileUploadAPIView.as_view()),
    path("api/export/docx", fe_views.DocxFileExportView.as_view()),
    path("api/upload/plans", fe_views.UploadPlansAPIView.as_view()),
    # path('api/export/docx2', DocxFileExportOldView.as_view()),
    path(
        "api/export/docx/<int:pk>/<int:fs_id>/<int:ap_id>/<int:year>",
        fe_views.DocxFileExportView.as_view(),
    ),
    path(
        "api/export/syllabus/<int:pk>/<int:fs_id>/<int:ap_id>/<int:year>",
        fe_views.SyllabusExportView.as_view(),
    ),
    path(
        "api/export/academic_plan/<int:pk>", fe_views.AcademicPlanGenerateXlsx.as_view()
    ),
    path(
        "api/export/general_characteristic/<int:pk>",
        fe_views.GeneralCharacteristicGenerateDocx.as_view(),
    ),
    path(
        "api/export/competence_matrix/<int:pk>",
        fe_views.CompetenceMatrixGenerateExcel.as_view(),
    ),
    # Учебный планы
    path("api/academicplan", wpa_views.AcademicPlanListAPIView.as_view()),
    path("api/academicplan/short", wpa_views.AcademicPlanListShortAPIView.as_view()),
    path("api/academicplan/create", wpa_views.AcademicPlanCreateAPIView.as_view()),
    path(
        "api/academicplan/detail/<int:pk>", wpa_views.AcademicPlanDetailsView.as_view()
    ),
    path(
        "api/academicplan/delete/<int:pk>", wpa_views.AcademicPlanDestroyView.as_view()
    ),
    path(
        "api/academicplan/update/<int:pk>", wpa_views.AcademicPlanUpdateView.as_view()
    ),
    path("api/academicplan/all_ids/<int:year>", ep_views.academic_plan_all_ids_by_year),
    # Учебные планы и направления
    path(
        "api/implementationacademicplan",
        wpa_views.ImplementationAcademicPlanListAPIView.as_view(),
    ),
    path(
        "api/implementationacademicplan/create",
        wpa_views.ImplementationAcademicPlanAPIView.as_view(),
    ),
    path(
        "api/implementationacademicplan/detail/<int:pk>",
        wpa_views.ImplementationAcademicPlanDetailsView.as_view(),
    ),
    path(
        "api/implementationacademicplan/delete/<int:pk>",
        wpa_views.ImplementationAcademicPlanDestroyView.as_view(),
    ),
    path(
        "api/implementationacademicplan/update/<int:pk>",
        wpa_views.ImplementationAcademicPlanUpdateView.as_view(),
    ),
    path(
        "api/academicplan/implemention",
        wpa_views.ImplementationAcademicPlanAPIView.as_view(),
    ),
    # РПД в учебных планах
    path(
        "api/workprogramchangeindisciplineblockmodule",
        wpa_views.WorkProgramChangeInDisciplineBlockModuleListAPIView.as_view(),
    ),
    path(
        "api/workprogramchangeindisciplineblockmodule/create",
        wpa_views.WorkProgramChangeInDisciplineBlockModuleCreateAPIView.as_view(),
    ),
    path(
        "api/workprogramchangeindisciplineblockmodule/detail/<int:pk>",
        wpa_views.WorkProgramChangeInDisciplineBlockModuleDetailsView.as_view(),
    ),
    path(
        "api/workprogramchangeindisciplineblockmodule/delete/<int:pk>",
        wpa_views.WorkProgramChangeInDisciplineBlockModuleDestroyView.as_view(),
    ),
    path(
        "api/workprogramchangeindisciplineblockmodule/update/<int:pk>",
        wpa_views.WorkProgramChangeInDisciplineBlockModuleUpdateView.as_view(),
    ),
    # Работа с образовательными программами
    # --Факультет
    path("api/Department", ep_views.DepartmentListAPIView.as_view()),
    path("api/Department/create", ep_views.DepartmentCreateAPIView.as_view()),
    path("api/Department/detail/<int:pk>", ep_views.DepartmentDetailsView.as_view()),
    path("api/Department/delete/<int:pk>", ep_views.DepartmentDestroyView.as_view()),
    path("api/Department/update/<int:pk>", ep_views.DepartmentUpdateView.as_view()),
    # --Экспертизы
    path("api/expertise/user", expertise_views.UserExpertiseListView.as_view()),
    path(
        "api/expertise/user_with_expertise/<int:pk>",
        expertise_views.UserExpertiseListView.as_view(),
    ),
    path(
        "api/expertise/user/create", expertise_views.UserExpertiseCreateView.as_view()
    ),
    path(
        "api/expertise/user/delete/<int:pk>",
        expertise_views.DeleteUserExpertise.as_view(),
    ),
    path(
        "api/expertise/comments/<int:pk>",
        expertise_views.ExpertiseCommentsView.as_view(),
    ),
    path(
        "api/expertise/comments/create",
        expertise_views.ExpertiseCommentCreateView.as_view(),
    ),
    path("api/expertise/create", expertise_views.ExpertiseCreateView.as_view()),
    path("api/expertise", expertise_views.ExpertiseListView.as_view()),
    path(
        "api/expertise/work_program/<int:pk>",
        expertise_views.ExpertiseWorkProgramView.as_view(),
    ),
    path("api/expertise/<int:pk>", expertise_views.ExpertiseViewById.as_view()),
    path(
        "api/expertise/user/update/<int:pk>",
        expertise_views.ChangeUserExpertiseView.as_view(),
    ),
    path(
        "api/expertise/update/<int:pk>", expertise_views.ChangeExpertiseView.as_view()
    ),
    # Работа с профессиями
    path("api/professions/", profession_views.ProfessionsListApi.as_view()),
    path(
        "api/professions/without_pagination",
        profession_views.ProfessionsListWithoutPaginationApi.as_view(),
    ),
    path("api/profession/create", profession_views.ProfessionCreateAPIView.as_view()),
    path(
        "api/profession/detail/<int:pk>",
        profession_views.ProfessionDetailsView.as_view(),
    ),
    path(
        "api/profession/delete/<int:pk>",
        profession_views.ProfessionDestroyView.as_view(),
    ),
    path(
        "api/profession/update/<int:pk>",
        profession_views.ProfessionUpdateView.as_view(),
    ),
    # path('api/itp', ItemWithProfessions.as_view()),
    path("api/profession/create/bykeywords", CreateProfessionByKeywords),
    # Работа с навыками прфоессий
    path(
        "api/skillsofprofessioninprofession/<int:profession_id>",
        profession_views.SkillsOfProfessionInProfessionList.as_view(),
    ),
    path(
        "api/skillsofprofessioninprofession/create",
        profession_views.SkillsOfProfessionInProfessionCreateAPIView.as_view(),
    ),
    path(
        "api/skillsofprofessioninprofession/delete/<int:pk>",
        profession_views.SkillsOfProfessionInProfessionDestroyView.as_view(),
    ),
    path(
        "api/skillsofprofessioninprofession/update/<int:pk>",
        profession_views.SkillsOfProfessionInProfessionUpdateView.as_view(),
    ),
    path(
        "api/skillsofprofessioningroups", profession_views.ItemWithProfessions.as_view()
    ),
    # Работа с профессиями
    path("api/roles/", profession_views.RolesListApi.as_view()),
    path("api/role/create", profession_views.RoleCreateAPIView.as_view()),
    path("api/role/detail/<int:pk>", profession_views.RoleDetailsView.as_view()),
    path("api/role/delete/<int:pk>", profession_views.RoleDestroyView.as_view()),
    path("api/role/update/<int:pk>", profession_views.RoleUpdateView.as_view()),
    # Работа с навыками прфоессий
    path(
        "api/skillsofroleinrole/<int:role_id>",
        profession_views.SkillsOfRoleInRoleList.as_view(),
    ),
    path(
        "api/skillsofroleinrole/create",
        profession_views.SkillsOfRoleInRoleCreateAPIView.as_view(),
    ),
    path(
        "api/skillsofroleinrole/delete/<int:pk>",
        profession_views.SkillsOfRoleInRoleDestroyView.as_view(),
    ),
    path(
        "api/skillsofroleinrole/update/<int:pk>",
        profession_views.SkillsOfRoleInRoleUpdateView.as_view(),
    ),
    path("api/skillsofroleingroups", profession_views.ItemWithRoles.as_view()),
    # Работа с пользователями
    path("api/user/groups", wpa_views.UserGroups),
    path("api/bugs_log", wpa_views.BugsLogView.as_view()),
    # Папки и рейтинги
    path("api/folders", fas_views.FoldersListView.as_view()),
    path("api/folders/create", fas_views.CreateFolderView.as_view()),
    path("api/folders/edit/<int:pk>", fas_views.EditFolderView.as_view()),
    path("api/folders/delete/<int:pk>", fas_views.DeleteFolderView.as_view()),
    path(
        "api/folders/work_program/content/<int:pk>",
        fas_views.WorkProgramInFolderView.as_view(),
    ),
    path("api/folders/work_program/add", fas_views.AddToFolderView.as_view()),
    path(
        "api/folders/work_program/remove/<int:pk>",
        fas_views.RemoveFromFolderView.as_view(),
    ),
    # --Папки для УП
    path(
        "api/folders/academic_plan/content/<int:pk>",
        fas_views.AcademicPlanInFolderView.as_view(),
    ),
    path(
        "api/folders/academic_plan/add", fas_views.AddToFolderAcademicPlanView.as_view()
    ),
    path(
        "api/folders/academic_plan/remove/<int:pk>",
        fas_views.RemoveFromFolderAcademicPlanView.as_view(),
    ),
    # --Папки для Модулей
    path(
        "api/folders/block_module/content/<int:pk>",
        fas_views.ModuleInFolderView.as_view(),
    ),
    path("api/folders/block_module/add", fas_views.AddToFolderModuleView.as_view()),
    path(
        "api/folders/block_module/remove/<int:pk>",
        fas_views.RemoveFromFolderModuleView.as_view(),
    ),
    # --Папки для Траекторий
    path(
        "api/folders/individual_path/content/<int:pk>",
        fas_views.IndividualImplementationAcademicPlanInFolderView.as_view(),
    ),
    path(
        "api/folders/individual_path/add",
        fas_views.AddToFolderndividualImplementationAcademicPlanView.as_view(),
    ),
    path(
        "api/folders/individual_path/remove/<int:pk>",
        fas_views.RemoveFromFolderImplementationAcademicPlanView.as_view(),
    ),
    # --прочее
    path("api/workprogram/statistic/<int:pk>", fas_views.WorkProgramStatistic),
    path("api/folders/real_remove/<int:pk>", fas_views.DeleteFolderView.as_view()),
    # Аттестационные оценочные средства
    path(
        "api/certification_tools/",
        wpa_views.CertificationEvaluationToolListAPI.as_view(),
    ),
    path(
        "api/certification_tools/<int:pk>",
        wpa_views.CertificationEvaluationToolDetailAPI.as_view(),
    ),
    re_path(r"^", include("workprogramsapp.educational_program.urls")),
    re_path(r"^", include("workprogramsapp.educational_program.urls")),
    re_path(r"^", include("workprogramsapp.workprogram_additions.urls")),
    re_path(r"^", include("workprogramsapp.bars_merge.urls")),
    re_path(r"^", include("workprogramsapp.individualization.urls")),
    re_path(r"^", include("workprogramsapp.isu_merge.urls")),
    re_path(r"^", include("workprogramsapp.notifications.urls")),
    re_path(r"^", include("workprogramsapp.feedback.urls")),
    path("api/nginx_timeout_test/", wpa_views.TimeoutTest),
    re_path(r"^", include(router.urls)),
    path("api/nginx_timeout_test/", wpa_views.TimeoutTest),
    re_path(r"^", include("workprogramsapp.expertise.urls")),
    re_path(
        r"^", include("workprogramsapp.educational_program.educational_standart.urls")
    ),
    re_path(r"^", include("gia_practice_app.GIA.urls")),
    re_path(r"^", include("gia_practice_app.Practice.urls")),
    re_path(r"^", include("workprogramsapp.bibliographic_reference.urls")),
    re_path(r"^", include("workprogramsapp.disciplineblockmodules.urls")),
]
