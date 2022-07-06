from .views import SearchInEBSCO
from django.conf.urls import url, include
from django.urls import path

urlpatterns = [
    path('api/workprogram_sources/search_in_ebsco', SearchInEBSCO),
    # path('api/source_in_workprogram/<int:workprogram_id>',
    #      WorkProgramSourceInWorkProgramList.as_view())

]