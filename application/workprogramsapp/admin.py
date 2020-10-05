from django.contrib import admin

from .expertise.models import Expertise, ExpertiseComments, UserExpertise
from .models import (
    WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, FieldOfStudy, Zun,
    Competence, Indicator, EvaluationTool, FieldOfStudyWorkProgram, DisciplineSection, Topic, WorkProgramInFieldOfStudy,
    RouteComposition, Route, Certification, OnlineCourse, BibliographicReference, AcademicPlan,
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule
)

from .models import EducationalProgram, GeneralCharacteristics, Department

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
admin.site.register(FieldOfStudyWorkProgram)
admin.site.register(DisciplineSection)
admin.site.register(Topic)
admin.site.register(RouteComposition)
admin.site.register(Route)
admin.site.register(Certification)
admin.site.register(OnlineCourse)
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

