from django.contrib import admin

from .bars_merge.models import BarsWorkProgramsAssociate, HistoryOfSendingToBars, BarsEPAssociate, AcceptedBarsInWp
from .educational_program.educational_standart.models import EducationalStandard, TasksForEducationalStandard
from .educational_program.general_prof_competencies.models import GroupOfGeneralProfCompetencesInEducationalStandard, \
    GeneralProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInGeneralProfCompetenceInGeneralCharacteristic
from .educational_program.key_competences.models import GroupOfKeyCompetencesInEducationalStandard, \
    KeyCompetencesInGroupOfGeneralCharacteristic, IndicatorInKeyCompetenceInGeneralCharacteristic
from .educational_program.over_professional_competencies.models import GroupOfOverProfCompetencesInEducationalStandard, \
    OverProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInOverProfCompetenceInGeneralCharacteristic
from .educational_program.pk_comptencies.models import GroupOfPkCompetencesInGeneralCharacteristic, \
    PkCompetencesInGroupOfGeneralCharacteristic, IndicatorInPkCompetenceInGeneralCharacteristic
from .expertise.models import UserExpertise, ExpertiseComments, Expertise, ExpertsOnStructuralUnit
from .feedback.models import FeedbackRecord
from .folders_ans_statistic.models import Folder, WorkProgramInFolder
from .individualization.models import ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule
from .individualization.models import IndividualImplementationAcademicPlan, \
    WorkProgramInWorkProgramChangeInDisciplineBlockModule, DisciplineBlockModuleInDisciplineBlock
# FieldOfStudyWorkProgram,
from .models import EducationalProgram, GeneralCharacteristics, Department, Profession, SkillsOfProfession, \
    SkillsOfRole, \
    Role, ProfessionalStandard, IsuModulesHashes
from .models import (
    WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, FieldOfStudy, Zun,
    Competence, Indicator, EvaluationTool, Topic, WorkProgramInFieldOfStudy,
    RouteComposition, Route, Certification, BibliographicReference, AcademicPlan,
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule,
    СertificationEvaluationTool, CourseCredit, CourseFieldOfStudy,
    WorkProgramIdStrUpForIsu, GeneralizedLaborFunctions,
    AcademicPlanUpdateConfiguration,
    AcademicPlanUpdateLog, GiaInFieldOfStudy, PracticeInFieldOfStudy, DisciplineBlockModuleInIsu, EmployerRepresentative
)
from .notifications.models import ExpertiseNotification, UserNotification, NotificationComments, EmailReset, \
    AcademicPlanUpdateNotification
from .workprogram_additions.models import AdditionalMaterial, StructuralUnit, UserStructuralUnit, UniversityPartner

# from ckeditor_uploader.widgets import CKEditorUploadingWidget

admin.site.register(GroupOfPkCompetencesInGeneralCharacteristic)
admin.site.register(PkCompetencesInGroupOfGeneralCharacteristic)
admin.site.register(IndicatorInPkCompetenceInGeneralCharacteristic)

admin.site.register(GroupOfOverProfCompetencesInEducationalStandard)
admin.site.register(OverProfCompetencesInGroupOfGeneralCharacteristic)
admin.site.register(IndicatorInOverProfCompetenceInGeneralCharacteristic)

admin.site.register(GroupOfKeyCompetencesInEducationalStandard)
admin.site.register(KeyCompetencesInGroupOfGeneralCharacteristic)
admin.site.register(IndicatorInKeyCompetenceInGeneralCharacteristic)

admin.site.register(GroupOfGeneralProfCompetencesInEducationalStandard)
admin.site.register(GeneralProfCompetencesInGroupOfGeneralCharacteristic)
admin.site.register(IndicatorInGeneralProfCompetenceInGeneralCharacteristic)

admin.site.register(Zun)
admin.site.register(WorkProgram)
admin.site.register(OutcomesOfWorkProgram)
admin.site.register(PrerequisitesOfWorkProgram)
admin.site.register(WorkProgramInFieldOfStudy)
admin.site.register(FieldOfStudy)
# admin.site.register(CompetenceIndicator)
admin.site.register(Competence)
# admin.site.register(IndicatorWorkProgram)
admin.site.register(Indicator)
admin.site.register(EvaluationTool)
# admin.site.register(FieldOfStudyWorkProgram)
# admin.site.register(DisciplineSection)
admin.site.register(Topic)
admin.site.register(RouteComposition)
admin.site.register(Route)
admin.site.register(Certification)
admin.site.register(BibliographicReference)

# class AcademicPlanAdminHandler(admin.ModelAdmin):
#     list_display = ("__str__", 'id', 'ap_isu_id', 'year')
#     search_fields = ['id', 'ap_isu_id', 'year']
# admin.site.register(AcademicPlan, AcademicPlanAdminHandler)

admin.site.register(DisciplineBlock)
admin.site.register(ImplementationAcademicPlan)
admin.site.register(DisciplineBlockModule)
# admin.site.register(WorkProgramChangeInDisciplineBlockModule)

admin.site.register(EducationalProgram)
admin.site.register(GeneralCharacteristics)
admin.site.register(Department)
admin.site.register(Expertise)
admin.site.register(ExpertiseComments)
admin.site.register(UserExpertise)
admin.site.register(Profession)
admin.site.register(Role)
admin.site.register(SkillsOfProfession)
admin.site.register(SkillsOfRole)
admin.site.register(ProfessionalStandard)

admin.site.register(Folder)
admin.site.register(WorkProgramInFolder)
admin.site.register(AdditionalMaterial)
admin.site.register(BarsWorkProgramsAssociate)
admin.site.register(HistoryOfSendingToBars)
admin.site.register(BarsEPAssociate)
admin.site.register(IndividualImplementationAcademicPlan)

admin.site.register(DisciplineBlockModuleInDisciplineBlock)

admin.site.register(StructuralUnit)
admin.site.register(UserStructuralUnit)

admin.site.register(СertificationEvaluationTool)
admin.site.register(ExpertiseNotification)
admin.site.register(UserNotification)
admin.site.register(CourseCredit)
admin.site.register(CourseFieldOfStudy)
admin.site.register(ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule)
admin.site.register(WorkProgramIdStrUpForIsu)

admin.site.register(AcademicPlanUpdateConfiguration)
admin.site.register(NotificationComments)
admin.site.register(FeedbackRecord)
admin.site.register(AcceptedBarsInWp)
admin.site.register(GeneralizedLaborFunctions)
admin.site.register(EducationalStandard)
admin.site.register(TasksForEducationalStandard)


class LogAdmin(admin.ModelAdmin):
    list_display = ("__str__", "updated_date_time")
    search_fields = ['object_type', 'old_value', 'new_value']


admin.site.register(AcademicPlanUpdateLog, LogAdmin)
admin.site.register(EmailReset)
admin.site.register(ExpertsOnStructuralUnit)


class ImplementationAcademicPlanInLine(admin.StackedInline):
    model = ImplementationAcademicPlan
    extra = 1


@admin.register(AcademicPlan)
class AcademicPlanAdmin(admin.ModelAdmin):
    list_display = ("__str__", 'id', 'ap_isu_id', 'year')
    search_fields = ['id', 'ap_isu_id', 'year']
    inlines = [ImplementationAcademicPlanInLine]
    save_on_top = True
    save_as = True


admin.site.register(WorkProgramInWorkProgramChangeInDisciplineBlockModule)


class WorkProgramInFieldOfStudyInLine(admin.StackedInline):
    model = WorkProgramInFieldOfStudy
    extra = 1


class GiaInFieldOfStudyInLine(admin.StackedInline):
    model = GiaInFieldOfStudy
    extra = 1


class PracticeInFieldOfStudyInLine(admin.StackedInline):
    model = PracticeInFieldOfStudy
    extra = 1


@admin.register(WorkProgramChangeInDisciplineBlockModule)
class AcademicPlanAdmin(admin.ModelAdmin):
    # list_display = ("__str__", 'id', 'ap_isu_id', 'year')
    # search_fields = ['id', 'ap_isu_id', 'year']
    inlines = [WorkProgramInFieldOfStudyInLine, GiaInFieldOfStudyInLine, PracticeInFieldOfStudyInLine]
    save_on_top = True
    save_as = True


admin.site.register(PracticeInFieldOfStudy)
admin.site.register(UniversityPartner)
admin.site.register(AcademicPlanUpdateNotification)
admin.site.register(EmployerRepresentative)
admin.site.register(IsuModulesHashes)

@admin.register(DisciplineBlockModuleInIsu)
class ModuleIsuAdmin(admin.ModelAdmin):
    list_display = ('id', 'isu_id', 'isu_father_id', 'academic_plan', 'module')
    search_fields = ['id', 'isu_id', 'isu_father_id', 'academic_plan__id', 'module__id']
    save_on_top = True
    save_as = True
