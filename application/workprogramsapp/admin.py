from django.contrib import admin
from .models import (
    WorkProgram, OutcomesOfWorkProgram, PrerequisitesOfWorkProgram, FieldOfStudy,
    Competences, IndicatorWorkProgram, Indicator, EvaluationTool, FieldOfStudyWorkProgram, DisciplineSection, Topic,
    RouteComposition, Route, Certification, OnlineCourse, BibliographicReference
)


admin.site.register(WorkProgram)
admin.site.register(OutcomesOfWorkProgram)
admin.site.register(PrerequisitesOfWorkProgram)

admin.site.register(FieldOfStudy)
# admin.site.register(CompetenceIndicator)
admin.site.register(Competences)
admin.site.register(IndicatorWorkProgram)
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