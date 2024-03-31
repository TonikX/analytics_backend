from django.contrib import admin

from workprogramsapp import models as wpa_models
from workprogramsapp.bars_merge import models as bars_merge_models
from workprogramsapp.educational_program.educational_standart.models import (
    EducationalStandard,
    TasksForEducationalStandard,
)
from workprogramsapp.educational_program.general_prof_competencies import (
    models as ep_gpc_models,
)
from workprogramsapp.educational_program.key_competences import models as ep_kc_models
from workprogramsapp.educational_program.over_professional_competencies import (
    models as ep_opc_models,
)
from workprogramsapp.educational_program.pk_comptencies import models as ep_pkc_models
from workprogramsapp.expertise import models as expertise_models
from workprogramsapp.feedback.models import FeedbackRecord
from workprogramsapp.folders_ans_statistic import models as folder_models
from workprogramsapp.individualization import models as individualization_models
from workprogramsapp.notifications import models as notifications_models
from workprogramsapp.workprogram_additions import models as wp_add_models


class LogAdmin(admin.ModelAdmin):
    list_display = ("__str__", "updated_date_time")
    search_fields = ["object_type", "old_value", "new_value"]


class ImplementationAcademicPlanInLine(admin.StackedInline):
    model = wpa_models.ImplementationAcademicPlan
    extra = 1


class WorkProgramInFieldOfStudyInLine(admin.StackedInline):
    model = wpa_models.WorkProgramInFieldOfStudy
    extra = 1


class GiaInFieldOfStudyInLine(admin.StackedInline):
    model = wpa_models.GiaInFieldOfStudy
    extra = 1


class PracticeInFieldOfStudyInLine(admin.StackedInline):
    model = wpa_models.PracticeInFieldOfStudy
    extra = 1


@admin.register(wpa_models.AcademicPlan)
class AcademicPlanAdmin(admin.ModelAdmin):
    list_display = ("__str__", "id", "ap_isu_id", "year")
    search_fields = ["id", "ap_isu_id", "year"]
    inlines = [ImplementationAcademicPlanInLine]
    save_on_top = True
    save_as = True


@admin.register(wpa_models.WorkProgramChangeInDisciplineBlockModule)
class AcademicPlanAdmin(admin.ModelAdmin):
    # list_display = ("__str__", 'id', 'ap_isu_id', 'year')
    # search_fields = ['id', 'ap_isu_id', 'year']
    inlines = [
        WorkProgramInFieldOfStudyInLine,
        GiaInFieldOfStudyInLine,
        PracticeInFieldOfStudyInLine,
    ]
    save_on_top = True
    save_as = True


@admin.register(wpa_models.DisciplineBlockModuleInIsu)
class ModuleIsuAdmin(admin.ModelAdmin):
    list_display = ("id", "isu_id", "isu_father_id", "academic_plan", "module")
    search_fields = ["id", "isu_id", "isu_father_id", "academic_plan__id", "module__id"]
    save_on_top = True
    save_as = True


admin.site.register(ep_pkc_models.GroupOfPkCompetencesInGeneralCharacteristic)
admin.site.register(ep_pkc_models.IndicatorInPkCompetenceInGeneralCharacteristic)
admin.site.register(ep_pkc_models.PkCompetencesInGroupOfGeneralCharacteristic)

admin.site.register(ep_opc_models.GroupOfOverProfCompetencesInEducationalStandard)
admin.site.register(ep_opc_models.IndicatorInOverProfCompetenceInGeneralCharacteristic)
admin.site.register(ep_opc_models.OverProfCompetencesInGroupOfGeneralCharacteristic)

admin.site.register(ep_kc_models.GroupOfKeyCompetencesInEducationalStandard)
admin.site.register(ep_kc_models.IndicatorInKeyCompetenceInGeneralCharacteristic)
admin.site.register(ep_kc_models.KeyCompetencesInGroupOfGeneralCharacteristic)

admin.site.register(ep_gpc_models.GeneralProfCompetencesInGroupOfGeneralCharacteristic)
admin.site.register(ep_gpc_models.GroupOfGeneralProfCompetencesInEducationalStandard)
admin.site.register(
    ep_gpc_models.IndicatorInGeneralProfCompetenceInGeneralCharacteristic
)

admin.site.register(wpa_models.AcademicPlanUpdateConfiguration)
admin.site.register(wpa_models.AcademicPlanUpdateLog, LogAdmin)
admin.site.register(wpa_models.BibliographicReference)
admin.site.register(wpa_models.BugsLog)
admin.site.register(wpa_models.Certification)
admin.site.register(wpa_models.CertificationEvaluationTool)
admin.site.register(wpa_models.Competence)
admin.site.register(wpa_models.CourseCredit)
admin.site.register(wpa_models.CourseFieldOfStudy)
admin.site.register(wpa_models.Department)
admin.site.register(wpa_models.DisciplineBlock)
admin.site.register(wpa_models.DisciplineBlockModule)
admin.site.register(wpa_models.EducationalProgram)
admin.site.register(wpa_models.EvaluationTool)
admin.site.register(wpa_models.FieldOfStudy)
admin.site.register(wpa_models.GeneralCharacteristics)
admin.site.register(wpa_models.GeneralizedLaborFunctions)
admin.site.register(wpa_models.ImplementationAcademicPlan)
admin.site.register(wpa_models.Indicator)
admin.site.register(wpa_models.OutcomesOfWorkProgram)
admin.site.register(wpa_models.PracticeInFieldOfStudy)
admin.site.register(wpa_models.PrerequisitesOfWorkProgram)
admin.site.register(wpa_models.Profession)
admin.site.register(wpa_models.ProfessionalStandard)
admin.site.register(wpa_models.Role)
admin.site.register(wpa_models.Route)
admin.site.register(wpa_models.RouteComposition)
admin.site.register(wpa_models.SkillsOfProfession)
admin.site.register(wpa_models.SkillsOfRole)
admin.site.register(wpa_models.Topic)
admin.site.register(wpa_models.WorkProgram)
admin.site.register(wpa_models.WorkProgramIdStrUpForIsu)
admin.site.register(wpa_models.WorkProgramInFieldOfStudy)
admin.site.register(wpa_models.Zun)
admin.site.register(wpa_models.EmployerRepresentative)
admin.site.register(wpa_models.IsuModulesHashes)

admin.site.register(expertise_models.Expertise)
admin.site.register(expertise_models.ExpertiseComments)
admin.site.register(expertise_models.ExpertsOnStructuralUnit)
admin.site.register(expertise_models.UserExpertise)

admin.site.register(bars_merge_models.AcceptedBarsInWp)
admin.site.register(bars_merge_models.BarsEPAssociate)
admin.site.register(bars_merge_models.BarsWorkProgramsAssociate)
admin.site.register(bars_merge_models.HistoryOfSendingToBars)

admin.site.register(individualization_models.DisciplineBlockModuleInDisciplineBlock)
admin.site.register(
    individualization_models.ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule
)
admin.site.register(
    individualization_models.ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule
)
admin.site.register(individualization_models.IndividualImplementationAcademicPlan)
admin.site.register(
    individualization_models.WorkProgramInWorkProgramChangeInDisciplineBlockModule
)

admin.site.register(notifications_models.AcademicPlanUpdateNotification)
admin.site.register(notifications_models.EmailReset)
admin.site.register(notifications_models.ExpertiseNotification)
admin.site.register(notifications_models.NotificationComments)
admin.site.register(notifications_models.UserNotification)

admin.site.register(wp_add_models.AdditionalMaterial)
admin.site.register(wp_add_models.StructuralUnit)
admin.site.register(wp_add_models.UniversityPartner)
admin.site.register(wp_add_models.UserStructuralUnit)

admin.site.register(folder_models.Folder)
admin.site.register(folder_models.WorkProgramInFolder)

admin.site.register(FeedbackRecord)

admin.site.register(EducationalStandard)
admin.site.register(TasksForEducationalStandard)
