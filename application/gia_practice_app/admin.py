from django.contrib import admin

from gia_practice_app.GIA.models import GIABaseTemplate, CriteriaVKR, GIA
from gia_practice_app.Practice.models import (
    OutcomesOfPractice,
    Practice,
    PracticeTemplate,
    ZunPractice,
)


admin.site.register(GIABaseTemplate)
admin.site.register(CriteriaVKR)
admin.site.register(GIA)
admin.site.register(Practice)
admin.site.register(PracticeTemplate)
admin.site.register(ZunPractice)
admin.site.register(OutcomesOfPractice)
