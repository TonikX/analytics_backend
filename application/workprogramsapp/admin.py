from django.contrib import admin

from .bars_merge.models import BarsWorkProgramsAssociate, HistoryOfSendingToBars, BarsEPAssociate, AcceptedBarsInWp
from .expertise.models import UserExpertise, ExpertiseComments, Expertise
from .folders_ans_statistic.models import Folder, WorkProgramInFolder
from .individualization.models import IndividualImplementationAcademicPlan, \
    WorkProgramInWorkProgramChangeInDisciplineBlockModule, DisciplineBlockModuleInDisciplineBlock
from .models import (
    WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, FieldOfStudy, Zun,
    Competence, Indicator, EvaluationTool, DisciplineSection, Topic, WorkProgramInFieldOfStudy,
    RouteComposition, Route, Certification, BibliographicReference, AcademicPlan,
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule,
    СertificationEvaluationTool, CourseCredit, CourseFieldOfStudy,
    OnlineCourse, WorkProgramIdStrUpForIsu, GeneralizedLaborFunctions
)
# FieldOfStudyWorkProgram,
from .models import EducationalProgram, GeneralCharacteristics, Department, Profession, SkillsOfProfession, \
    SkillsOfRole, \
    Role, ProfessionalStandard, KindsOfActivity
from .notifications.models import ExpertiseNotification, UserNotification, NotificationComments


from .workprogram_additions.models import AdditionalMaterial, StructuralUnit, UserStructuralUnit

from .educational_program.pk_comptencies.models import GroupOfPkCompetencesInGeneralCharacteristic, \
    PkCompetencesInGroupOfGeneralCharacteristic, IndicatorInPkCompetenceInGeneralCharacteristic
from .educational_program.over_professional_competencies.models import GroupOfOverProfCompetencesInEducationalStandard, \
    OverProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInOverProfCompetenceInGeneralCharacteristic
from .educational_program.key_competences.models import GroupOfKeyCompetencesInEducationalStandard, \
    KeyCompetencesInGroupOfGeneralCharacteristic, IndicatorInKeyCompetenceInGeneralCharacteristic
from .educational_program.general_prof_competencies.models import GroupOfGeneralProfCompetencesInEducationalStandard, \
    GeneralProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInGeneralProfCompetenceInGeneralCharacteristic
from .individualization.models import ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule
from .feedback.models import FeedbackRecord
from .educational_program.educational_standart.models import EducationalStandard, TasksForEducationalStandard
from ckeditor_uploader.widgets import CKEditorUploadingWidget

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
admin.site.register(AcademicPlan)
admin.site.register(DisciplineBlock)
admin.site.register(ImplementationAcademicPlan)
admin.site.register(DisciplineBlockModule)
admin.site.register(WorkProgramChangeInDisciplineBlockModule)

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
admin.site.register(WorkProgramInWorkProgramChangeInDisciplineBlockModule)
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
admin.site.register(NotificationComments)
admin.site.register(FeedbackRecord)
admin.site.register(AcceptedBarsInWp)
admin.site.register(GeneralizedLaborFunctions)
admin.site.register(EducationalStandard)
admin.site.register(TasksForEducationalStandard)


class EvaluationToolInLine(admin.StackedInline):
    model = EvaluationTool
    extra = 1


@admin.register(DisciplineSection)
class DisciplineSectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'ordinal_number', 'work_program')
    list_filter = ('name', 'ordinal_number', 'work_program')
    inlines = [EvaluationToolInLine]
    save_on_top = True
    save_as = True
