from django.contrib import admin

from .bars_merge.models import BarsWorkProgramsAssociate, HistoryOfSendingToBars, BarsEPAssociate
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
    OnlineCourse
)
# FieldOfStudyWorkProgram,
from .models import EducationalProgram, GeneralCharacteristics, Department, Profession, SkillsOfProfession, SkillsOfRole, \
    Role, ProfessionalAreaOfGeneralCharacteristics, ProfessionalStandard

from .workprogram_additions.models import AdditionalMaterial, StructuralUnit

from .educational_program.pk_comptencies.models import GroupOfPkCompetencesInGeneralCharacteristic, \
    PkCompetencesInGroupOfGeneralCharacteristic, IndicatorInPkCompetenceInGeneralCharacteristic
from .educational_program.over_professional_competencies.models import GroupOfOverProfCompetencesInGeneralCharacteristic, \
    OverProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInOverProfCompetenceInGeneralCharacteristic
from .educational_program.key_competences.models import GroupOfKeyCompetencesInGeneralCharacteristic, \
    KeyCompetencesInGroupOfGeneralCharacteristic, IndicatorInKeyCompetenceInGeneralCharacteristic
from .educational_program.general_prof_competencies.models import GroupOfGeneralProfCompetencesInGeneralCharacteristic, \
    GeneralProfCompetencesInGroupOfGeneralCharacteristic, IndicatorInGeneralProfCompetenceInGeneralCharacteristic
from .individualization.models import ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule


admin.site.register(GroupOfPkCompetencesInGeneralCharacteristic)
admin.site.register(PkCompetencesInGroupOfGeneralCharacteristic)
admin.site.register(IndicatorInPkCompetenceInGeneralCharacteristic)

admin.site.register(GroupOfOverProfCompetencesInGeneralCharacteristic)
admin.site.register(OverProfCompetencesInGroupOfGeneralCharacteristic)
admin.site.register(IndicatorInOverProfCompetenceInGeneralCharacteristic)

admin.site.register(GroupOfKeyCompetencesInGeneralCharacteristic)
admin.site.register(KeyCompetencesInGroupOfGeneralCharacteristic)
admin.site.register(IndicatorInKeyCompetenceInGeneralCharacteristic)

admin.site.register(GroupOfGeneralProfCompetencesInGeneralCharacteristic)
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
#admin.site.register(FieldOfStudyWorkProgram)
admin.site.register(DisciplineSection)
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
admin.site.register(ProfessionalAreaOfGeneralCharacteristics)
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

admin.site.register(СertificationEvaluationTool)
admin.site.register(CourseCredit)
admin.site.register(CourseFieldOfStudy)
admin.site.register(ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule)
