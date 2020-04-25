from django.contrib import admin
from .models import (
    WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, FieldOfStudy, CompetenceIndicator,
    Competence, IndicatorWorkProgram, Indicator, EvaluationTool, FieldOfStudyWorkProgram, DisciplineSection, Topic,
    RouteComposition, Route
)


admin.site.register(WorkProgram)
admin.site.register(OutcomesOfWorkProgram)
admin.site.register(PrerequisitesOfWorkProgram)

admin.site.register(FieldOfStudy)
admin.site.register(CompetenceIndicator)
admin.site.register(Competence)
admin.site.register(IndicatorWorkProgram)
admin.site.register(Indicator)
admin.site.register(EvaluationTool)
admin.site.register(FieldOfStudyWorkProgram)
admin.site.register(DisciplineSection)
admin.site.register(Topic)
admin.site.register(RouteComposition)
admin.site.register(Route)
