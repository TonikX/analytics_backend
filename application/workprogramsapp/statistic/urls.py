from django.conf.urls import url, include
from django.urls import path

from workprogramsapp.statistic.views import SimpleStatistic, EmptyStringWp, WpWithoutAP, WpWithSimilarCode, \
    WpWithoutStructuralUnit, StructuralUnitWp

urlpatterns = [

    # Сатистика системы
    path('api/statistic/simple', SimpleStatistic),
    path('api/statistic/workprogram/getemptystring', EmptyStringWp),
    path('api/statistic/workprogram/wpwithoutap', WpWithoutAP),
    path('api/statistic/workprogram/similarcode', WpWithSimilarCode),
    path('api/statistic/structural/workprogram', StructuralUnitWp),
    path('api/statistic/structural/empty', WpWithoutStructuralUnit)

]
