from django.contrib import admin

# Register your models here.
from gia_practice_app.GIA.models import GIABaseTemplate, CriteriaVKR, GIA
from gia_practice_app.Practice.models import Practice, PracticeTemplate

admin.site.register(GIABaseTemplate)
admin.site.register(CriteriaVKR)
admin.site.register(GIA)
admin.site.register(Practice)
admin.site.register(PracticeTemplate)