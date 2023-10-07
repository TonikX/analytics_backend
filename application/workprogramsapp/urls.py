from django.conf.urls import url, include
from django.urls import path
from rest_framework.routers import DefaultRouter

from .educational_program.views import DepartmentCreateAPIView, DepartmentListAPIView, DepartmentDetailsView, \
    DepartmentDestroyView, DepartmentUpdateView, academic_plan_all_ids_by_year
from .expertise.views import ExpertiseCommentCreateView, UserExpertiseCreateView, UserExpertiseListView, \
    ExpertiseCommentsView, ChangeUserExpertiseView, \
    ChangeExpertiseView, ExpertiseCreateView, ExpertiseWorkProgramView, ExpertiseListView, ExpertiseViewById, \
    DeleteUserExpertise
from .files_export.views import DocxFileExportView, SyllabusExportView, UploadPlans, UploadPlansAPIView, \
    AcademicPlanGenerateXlsx, GeneralCharacteristicGenerateDocx, CompetenceMatrixGenerateExcel
from .folders_ans_statistic.views import FoldersListView, WorkProgramInFolderView, CreateFolderView, EditFolderView, \
    AddToFolderView, RemoveFromFolderView, DeleteFolderView, WorkProgramStatistic, \
    AcademicPlanInFolderView, AddToFolderAcademicPlanView, RemoveFromFolderAcademicPlanView, \
    ModuleInFolderView, AddToFolderModuleView, \
    RemoveFromFolderModuleView, IndividualImplementationAcademicPlanInFolderView, \
    AddToFolderndividualImplementationAcademicPlanView, RemoveFromFolderImplementationAcademicPlanView
from .op_slection.views import CreateProfessionByKeywords
from .profession.views import ProfessionsListApi, ProfessionCreateAPIView, ProfessionDetailsView, ProfessionDestroyView, \
    ProfessionUpdateView, ItemWithProfessions, ItemWithRoles, ProfessionsListWithoutPaginationApi
from .profession.views import RolesListApi, RoleCreateAPIView, RoleDetailsView, RoleDestroyView, RoleUpdateView
from .profession.views import SkillsOfProfessionInProfessionList, SkillsOfProfessionInProfessionCreateAPIView, \
    SkillsOfProfessionInProfessionUpdateView, SkillsOfProfessionInProfessionDestroyView
from .profession.views import SkillsOfRoleInRoleList, SkillsOfRoleInRoleCreateAPIView, SkillsOfRoleInRoleUpdateView, \
    SkillsOfRoleInRoleDestroyView
from .views import AcademicPlanCreateAPIView, AcademicPlanListAPIView, AcademicPlanDetailsView, AcademicPlanDestroyView, \
    AcademicPlanUpdateView, ImplementationAcademicPlanAPIView, ZunManyForAllGhViewSet
from .views import BibliographicReferenceListCreateAPIView, BibliographicReferenceDetailsView, \
    BibliographicReferenceDestroyView, \
    BibliographicReferenceUpdateView, WorkProgramBibliographicReferenceUpdateView, \
    BibliographicReferenceInWorkProgramList, EvaluationToolInWorkProgramList, \
    FileUploadWorkProgramAPIView, CompetenceCreateView, CompetencesListView, FileUploadWorkProgramOutcomesAPIView
from .views import CloneWorkProgramm
from .views import CompetenceListView, CompetenceUpdateView, CompetenceIndicatorDetailView, \
    DeleteIndicatorFromCompetenceView, \
    AddIndicatorToCompetenceView, OutcomesOfWorkProgramList
from .views import DisciplinesByNumber, WorkProgramArchiveUpdateView
from .views import EvaluationToolListAPI, EvaluationToolDetailAPI, DisciplineSectionListAPI, DisciplineSectionDetailAPI, \
    TopicsListAPI, TopicDetailAPI, NewOrdinalNumbersForDesciplineSectionAPI
from .views import FieldOfStudyDetailUpdateDeleteView, FieldOfStudyListCreateView
from .views import ImplementationAcademicPlanDetailsView, ImplementationAcademicPlanDestroyView, \
    ImplementationAcademicPlanUpdateView, ImplementationAcademicPlanListAPIView
from .views import IndicatorCreateAPIView, IndicatorListAPIView, IndicatorDetailsView, IndicatorDestroyView, \
    IndicatorUpdateView
from .views import NewOrdinalNumbersForTopicAPI, TopicCreateAPI
from .views import OutcomesOfWorkProgramDestroyView, OutcomesOfWorkProgramCreateAPIView, OutcomesOfWorkProgramUpdateView
from .views import PrerequisitesOfWorkProgramDestroyView, PrerequisitesOfWorkProgramCreateAPIView, \
    PrerequisitesOfWorkProgramUpdateView, PrerequisitesOfWorkProgramList
from .views import WorkProgramChangeInDisciplineBlockModuleCreateAPIView, \
    WorkProgramChangeInDisciplineBlockModuleListAPIView, WorkProgramChangeInDisciplineBlockModuleDetailsView, \
    WorkProgramChangeInDisciplineBlockModuleDestroyView, WorkProgramChangeInDisciplineBlockModuleUpdateView, \
    FileUploadAPIView, WorkProgramInFieldOfStudyListView, FieldOfStudiesForWorkProgramList, \
    WorkProgramInFieldOfStudyListAPI, WorkProgramInFieldOfStudyDetailAPI, \
    ZunListAPI, ZunDetailAPI, OutcomesForWorkProgramChangeBlock, WorkProgramDetailsWithDisciplineCodeView, \
    AcademicPlanListShortAPIView, \
    NewRealtionsForWorkProgramsInFieldOfStudyAPI, WorkProgramsWithOutcomesToPrerequisitesForThisWPView, \
    WorkProgramsWithPrerequisitesToOutocomesForThisWPView, WorkProgramsWithOutocomesForThisWPView, \
    WorkProgramInFieldOfStudyForWorkProgramForGHList
from .views import WorkProgramCreateAPIView, WorkProgramDetailsView, WorkProgramDestroyView, WorkProgramUpdateView
from .views import WorkProgramFullDetailsWithDisciplineCodeView, ZunManyViewSet, \
    WorkProgramInFieldOfStudyForWorkProgramList, ChangeItemsView
from .views import WorkProgramsListApi, UserGroups, TimeoutTest, WorkProgramEditorsUpdateView
from .views import СertificationEvaluationToolListAPI, СertificationEvaluationToolDetailAPI
from .workprogram_additions.views import CopyContentOfWorkProgram

# Контроллеры

router = DefaultRouter()

router.register(r'api/zun/many_create',
                ZunManyViewSet, basename='zun_many_create')
router.register(r'api/zun/many_create_for_all_gh',
                ZunManyForAllGhViewSet, basename='zun_many_create_for_all_gh')

urlpatterns = [

    # Старые урлы приложения удалены
    # Блок реализации API


    # Компетенции индикаторы
    # path('api/indicator/', IndicatorListView.as_view(), name='indicator'),
    # path('api/indicator/<int:pk>', IndicatorUpdateView.as_view(), name='indicator_update'),
    path('api/competences', CompetencesListView.as_view(), name='comptence'),
    path('api/competence/create', CompetenceCreateView.as_view(), name='comptence'),
    path('api/competence/', CompetenceListView.as_view(), name='comptence'),
    path('api/competence/<int:pk>', CompetenceUpdateView.as_view(), name='comptence_update'),
    path('api/competenceindicator/<int:pk>', CompetenceIndicatorDetailView.as_view(), name='comptenceindicator'),
    path('api/competenceindicator/indicator/delete', DeleteIndicatorFromCompetenceView.as_view(),
         name='DeleteIndicatorFromCompetenceView'),
    path('api/competenceindicator/indicator/add', AddIndicatorToCompetenceView.as_view(),
         name="AddIndicatorFromCompetenceView"),
    # path('api/outcomesofworkprogram/<int:workprogram_id>', IndicatorForCompetence.as_view()),

    path('api/indicator', IndicatorListAPIView.as_view()),
    path('api/indicator/create', IndicatorCreateAPIView.as_view()),
    path('api/indicator/detail/<int:pk>', IndicatorDetailsView.as_view()),
    path('api/indicator/delete/<int:pk>', IndicatorDestroyView.as_view()),
    path('api/indicator/update/<int:pk>', IndicatorUpdateView.as_view()),

    path('api/outcomesofworkprogram/<int:workprogram_id>', OutcomesOfWorkProgramList.as_view()),

    # Рабочая программа
    path('api/workprograms/', WorkProgramsListApi.as_view()),
    path('api/workprogram/create', WorkProgramCreateAPIView.as_view()),
    url(r'^api/workprogram/outcomes/prerequisites/relations/(?P<discipline_code>[0-9.]+)/$',
        WorkProgramsWithOutcomesToPrerequisitesForThisWPView.as_view()),
    url(r'^api/workprogram/prerequisites/outcomes/relations/(?P<discipline_code>[0-9.]+)/$',
        WorkProgramsWithPrerequisitesToOutocomesForThisWPView.as_view()),
    url(r'^api/workprogram/outcomes/relations/(?P<discipline_code>[0-9.]+)/$',
        WorkProgramsWithOutocomesForThisWPView.as_view()),
    path('api/workprogram/detail/<int:pk>', WorkProgramDetailsView.as_view()),
    path('api/workprogram/delete/<int:pk>', WorkProgramDestroyView.as_view()),
    path('api/workprogram/update/<int:pk>', WorkProgramUpdateView.as_view()),
    path('api/workprogram/update_editors/<int:pk>', WorkProgramEditorsUpdateView.as_view()),
    path('api/workprogram/update_status/<int:pk>', WorkProgramArchiveUpdateView.as_view()),
    path('api/workprogram/br/update/<int:pk>', WorkProgramBibliographicReferenceUpdateView.as_view()),
    path('api/workprogram/clone', CloneWorkProgramm),
    path('api/workprogram/merge_content', CopyContentOfWorkProgram),
    path('api/workprogramsinfieldofstudy', WorkProgramInFieldOfStudyListView.as_view()),
    path('api/workprogram/change_relations', NewRealtionsForWorkProgramsInFieldOfStudyAPI),
    path('api/workprogram/change_items', ChangeItemsView),
    # path('api/workprogram/itemrelations/<char:discipline_code>', WorkProgramDetailsWithDisciplineCodeView.as_view()),
    url(r'^api/workprogram/itemrelations/(?P<discipline_code>[0-9.]+)/$',
        WorkProgramDetailsWithDisciplineCodeView.as_view()),
    url(r'^api/workprogram/fullitemrelations/(?P<discipline_code>[0-9.]+)/$',
        WorkProgramFullDetailsWithDisciplineCodeView.as_view()),

    path('api/workprogram/getbynumbers', DisciplinesByNumber),

    path('api/workprogram/fieldofstudies/<int:workprogram_id>', FieldOfStudiesForWorkProgramList.as_view()),
    path('api/workprogram/fieldofstudies_for_competences/<int:workprogram_id>',
         WorkProgramInFieldOfStudyForWorkProgramList.as_view()),
    path('api/workprogram/fieldofstudies_for_competences_for_matrix/<int:workprogram_id>/<int:gh_id>',
         WorkProgramInFieldOfStudyForWorkProgramForGHList.as_view()),
    path('api/workprograminfieldofstudy/', WorkProgramInFieldOfStudyListAPI.as_view()),
    path('api/workprograminfieldofstudy/<int:pk>', WorkProgramInFieldOfStudyDetailAPI.as_view()),

    path('api/zun/', ZunListAPI.as_view()),
    path('api/zun/delete/competence/<int:competences_id>/wp_in_fs/<int:wp_in_fs_id>', ZunDetailAPI.as_view()),

    # Работы с темами и разделами
    path('api/tools/', EvaluationToolListAPI.as_view(), name='tools'),
    path('api/tools/<int:pk>', EvaluationToolDetailAPI.as_view(), name='tool_detail'),
    path('api/toolsinworkprogram/<int:workprogram_id>', EvaluationToolInWorkProgramList.as_view()),

    path('api/sections/', DisciplineSectionListAPI.as_view(), name='sections'),
    path('api/sections/<int:pk>', DisciplineSectionDetailAPI.as_view(), name='section_detail'),
    # path('api/sections/NewOrdinalNumbers', NewOrdinalNumbersForDesciplineSectionAPI.as_view()),
    path('api/sections/NewOrdinalNumbers', NewOrdinalNumbersForDesciplineSectionAPI),

    path('api/topics/', TopicsListAPI.as_view(), name='topics'),
    path('api/topics/create', TopicCreateAPI.as_view()),
    path('api/topics/<int:pk>', TopicDetailAPI.as_view(), name='topic_detail'),
    path('api/topics/NewOrdinalNumbers', NewOrdinalNumbersForTopicAPI),

    # Работа с результатами
    path('api/outcomesofworkprogram/<int:workprogram_id>', OutcomesOfWorkProgramList.as_view()),
    path('api/outcomesofworkprogram/create', OutcomesOfWorkProgramCreateAPIView.as_view()),
    path('api/outcomesofworkprogram/delete/<int:pk>', OutcomesOfWorkProgramDestroyView.as_view()),
    path('api/outcomesofworkprogram/update/<int:pk>', OutcomesOfWorkProgramUpdateView.as_view()),
    path('api/outcomesofworkprogramforacademycplan/<int:workprogram_id>', OutcomesForWorkProgramChangeBlock.as_view()),

    # Работа с пререквизитами
    path('api/prerequisitesofworkprogram/<int:workprogram_id>', PrerequisitesOfWorkProgramList.as_view()),
    path('api/prerequisitesofworkprogram/create', PrerequisitesOfWorkProgramCreateAPIView.as_view()),
    path('api/prerequisitesofworkprogram/delete/<int:pk>', PrerequisitesOfWorkProgramDestroyView.as_view()),
    path('api/prerequisitesofworkprogram/update/<int:pk>', PrerequisitesOfWorkProgramUpdateView.as_view()),

    # Работа с образовательными программами
    path('api/fieldofstudy/', FieldOfStudyListCreateView.as_view()),
    path('api/fieldofstudy/<int:pk>', FieldOfStudyDetailUpdateDeleteView.as_view()),

    # Библиографическая ссылка
    path('api/BibliographicReference', BibliographicReferenceListCreateAPIView.as_view()),
    path('api/BibliographicReference/create', BibliographicReferenceListCreateAPIView.as_view()),
    path('api/BibliographicReference/detail/<int:pk>', BibliographicReferenceDetailsView.as_view()),
    path('api/BibliographicReference/delete/<int:pk>', BibliographicReferenceDestroyView.as_view()),
    path('api/BibliographicReference/update/<int:pk>', BibliographicReferenceUpdateView.as_view()),
    path('api/bibliographicreferenceinworkprogram/<int:workprogram_id>',
         BibliographicReferenceInWorkProgramList.as_view()),

    # Работа с файлами (загрузка/экспорт)
    path('api/upload/wp', FileUploadWorkProgramAPIView.as_view()),
    path('api/upload/wpwithoutcomes', FileUploadWorkProgramOutcomesAPIView.as_view()),
    path('api/upload/csv', FileUploadAPIView.as_view()),
    path('api/export/docx', DocxFileExportView.as_view()),
    path('api/upload/plans', UploadPlansAPIView.as_view()),
    # path('api/export/docx2', DocxFileExportOldView.as_view()),
    path('api/export/docx/<int:pk>/<int:fs_id>/<int:ap_id>/<int:year>', DocxFileExportView.as_view()),
    path('api/export/syllabus/<int:pk>/<int:fs_id>/<int:ap_id>/<int:year>', SyllabusExportView.as_view()),
    path('api/export/academic_plan/<int:pk>', AcademicPlanGenerateXlsx.as_view()),
    path('api/export/general_characteristic/<int:pk>', GeneralCharacteristicGenerateDocx.as_view()),
    path('api/export/competence_matrix/<int:pk>', CompetenceMatrixGenerateExcel.as_view()),

    # Учебный планы
    path('api/academicplan', AcademicPlanListAPIView.as_view()),
    path('api/academicplan/short', AcademicPlanListShortAPIView.as_view()),
    path('api/academicplan/create', AcademicPlanCreateAPIView.as_view()),
    path('api/academicplan/detail/<int:pk>', AcademicPlanDetailsView.as_view()),
    path('api/academicplan/delete/<int:pk>', AcademicPlanDestroyView.as_view()),
    path('api/academicplan/update/<int:pk>', AcademicPlanUpdateView.as_view()),
    path('api/academicplan/all_ids/<int:year>', academic_plan_all_ids_by_year),

    # Учебные планы и направления
    path('api/implementationacademicplan', ImplementationAcademicPlanListAPIView.as_view()),
    path('api/implementationacademicplan/create', ImplementationAcademicPlanAPIView.as_view()),
    path('api/implementationacademicplan/detail/<int:pk>', ImplementationAcademicPlanDetailsView.as_view()),
    path('api/implementationacademicplan/delete/<int:pk>', ImplementationAcademicPlanDestroyView.as_view()),
    path('api/implementationacademicplan/update/<int:pk>', ImplementationAcademicPlanUpdateView.as_view()),

    path('api/academicplan/implemention', ImplementationAcademicPlanAPIView.as_view()),

    # РПД в учебных планах
    path('api/workprogramchangeindisciplineblockmodule', WorkProgramChangeInDisciplineBlockModuleListAPIView.as_view()),
    path('api/workprogramchangeindisciplineblockmodule/create',
         WorkProgramChangeInDisciplineBlockModuleCreateAPIView.as_view()),
    path('api/workprogramchangeindisciplineblockmodule/detail/<int:pk>',
         WorkProgramChangeInDisciplineBlockModuleDetailsView.as_view()),
    path('api/workprogramchangeindisciplineblockmodule/delete/<int:pk>',
         WorkProgramChangeInDisciplineBlockModuleDestroyView.as_view()),
    path('api/workprogramchangeindisciplineblockmodule/update/<int:pk>',
         WorkProgramChangeInDisciplineBlockModuleUpdateView.as_view()),

    # Работа с образовательными программами

    # --Факультет
    path('api/Department', DepartmentListAPIView.as_view()),
    path('api/Department/create', DepartmentCreateAPIView.as_view()),
    path('api/Department/detail/<int:pk>', DepartmentDetailsView.as_view()),
    path('api/Department/delete/<int:pk>', DepartmentDestroyView.as_view()),
    path('api/Department/update/<int:pk>', DepartmentUpdateView.as_view()),

    # --Экспертизы
    path('api/expertise/user', UserExpertiseListView.as_view()),
    path('api/expertise/user_with_expertise/<int:pk>', UserExpertiseListView.as_view()),
    path('api/expertise/user/create', UserExpertiseCreateView.as_view()),
    path('api/expertise/user/delete/<int:pk>', DeleteUserExpertise.as_view()),

    path('api/expertise/comments/<int:pk>', ExpertiseCommentsView.as_view()),
    path('api/expertise/comments/create', ExpertiseCommentCreateView.as_view()),
    path('api/expertise/create', ExpertiseCreateView.as_view()),
    path('api/expertise', ExpertiseListView.as_view()),
    path('api/expertise/work_program/<int:pk>', ExpertiseWorkProgramView.as_view()),
    path('api/expertise/<int:pk>', ExpertiseViewById.as_view()),
    path('api/expertise/user/update/<int:pk>', ChangeUserExpertiseView.as_view()),
    path('api/expertise/update/<int:pk>', ChangeExpertiseView.as_view()),

    # Работа с профессиями
    path('api/professions/', ProfessionsListApi.as_view()),
    path('api/professions/without_pagination', ProfessionsListWithoutPaginationApi.as_view()),
    path('api/profession/create', ProfessionCreateAPIView.as_view()),
    path('api/profession/detail/<int:pk>', ProfessionDetailsView.as_view()),
    path('api/profession/delete/<int:pk>', ProfessionDestroyView.as_view()),
    path('api/profession/update/<int:pk>', ProfessionUpdateView.as_view()),
    # path('api/itp', ItemWithProfessions.as_view()),
    path('api/profession/create/bykeywords', CreateProfessionByKeywords),

    # Работа с навыками прфоессий
    path('api/skillsofprofessioninprofession/<int:profession_id>', SkillsOfProfessionInProfessionList.as_view()),
    path('api/skillsofprofessioninprofession/create', SkillsOfProfessionInProfessionCreateAPIView.as_view()),
    path('api/skillsofprofessioninprofession/delete/<int:pk>', SkillsOfProfessionInProfessionDestroyView.as_view()),
    path('api/skillsofprofessioninprofession/update/<int:pk>', SkillsOfProfessionInProfessionUpdateView.as_view()),
    path('api/skillsofprofessioningroups', ItemWithProfessions.as_view()),

    # Работа с профессиями
    path('api/roles/', RolesListApi.as_view()),
    path('api/role/create', RoleCreateAPIView.as_view()),
    path('api/role/detail/<int:pk>', RoleDetailsView.as_view()),
    path('api/role/delete/<int:pk>', RoleDestroyView.as_view()),
    path('api/role/update/<int:pk>', RoleUpdateView.as_view()),

    # Работа с навыками прфоессий
    path('api/skillsofroleinrole/<int:role_id>', SkillsOfRoleInRoleList.as_view()),
    path('api/skillsofroleinrole/create', SkillsOfRoleInRoleCreateAPIView.as_view()),
    path('api/skillsofroleinrole/delete/<int:pk>', SkillsOfRoleInRoleDestroyView.as_view()),
    path('api/skillsofroleinrole/update/<int:pk>', SkillsOfRoleInRoleUpdateView.as_view()),
    path('api/skillsofroleingroups', ItemWithRoles.as_view()),

    # Информация о пользователе
    path('api/user/groups', UserGroups),

    # Папки и рейтинги
    path('api/folders', FoldersListView.as_view()),
    path('api/folders/create', CreateFolderView.as_view()),
    path('api/folders/edit/<int:pk>', EditFolderView.as_view()),
    path('api/folders/delete/<int:pk>', DeleteFolderView.as_view()),
    path('api/folders/work_program/content/<int:pk>', WorkProgramInFolderView.as_view()),
    path('api/folders/work_program/add', AddToFolderView.as_view()),
    path('api/folders/work_program/remove/<int:pk>', RemoveFromFolderView.as_view()),
    # --Папки для УП
    path('api/folders/academic_plan/content/<int:pk>', AcademicPlanInFolderView.as_view()),
    path('api/folders/academic_plan/add', AddToFolderAcademicPlanView.as_view()),
    path('api/folders/academic_plan/remove/<int:pk>', RemoveFromFolderAcademicPlanView.as_view()),
    # --Папки для Модулей
    path('api/folders/block_module/content/<int:pk>', ModuleInFolderView.as_view()),
    path('api/folders/block_module/add', AddToFolderModuleView.as_view()),
    path('api/folders/block_module/remove/<int:pk>', RemoveFromFolderModuleView.as_view()),
    # --Папки для Траекторий
    path('api/folders/individual_path/content/<int:pk>', IndividualImplementationAcademicPlanInFolderView.as_view()),
    path('api/folders/individual_path/add', AddToFolderndividualImplementationAcademicPlanView.as_view()),
    path('api/folders/individual_path/remove/<int:pk>', RemoveFromFolderImplementationAcademicPlanView.as_view()),
    # --прочее
    path('api/workprogram/statistic/<int:pk>', WorkProgramStatistic),
    path('api/folders/real_remove/<int:pk>', DeleteFolderView.as_view()),


    # Аттестационные оценочные средства
    path('api/certification_tools/', СertificationEvaluationToolListAPI.as_view()),
    path('api/certification_tools/<int:pk>', СertificationEvaluationToolDetailAPI.as_view()),
    url(r'^', include('workprogramsapp.educational_program.urls')),

    url(r'^', include('workprogramsapp.educational_program.urls')),
    url(r'^', include('workprogramsapp.workprogram_additions.urls')),
    url(r'^', include('workprogramsapp.bars_merge.urls')),

    url(r'^', include('workprogramsapp.individualization.urls')),
    url(r'^', include('workprogramsapp.isu_merge.urls')),
    url(r'^', include('workprogramsapp.notifications.urls')),
    url(r'^', include('workprogramsapp.feedback.urls')),
    path('api/nginx_timeout_test/', TimeoutTest),
    url(r'^', include(router.urls)),

    path('api/nginx_timeout_test/', TimeoutTest),
    url(r'^', include('workprogramsapp.expertise.urls')),
    url(r'^', include('workprogramsapp.educational_program.educational_standart.urls')),
    url(r'^', include('gia_practice_app.GIA.urls')),
    url(r'^', include('gia_practice_app.Practice.urls')),
    url(r'^', include('workprogramsapp.bibliographic_reference.urls')),
    url(r'^', include('workprogramsapp.disciplineblockmodules.urls')),


]
