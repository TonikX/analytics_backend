from django.urls import path

from workprogramsapp.expertise.views import UpdateCommentStatus, ExpertiseHistory

urlpatterns = [

    path('api/experise/comment/statusupdate', UpdateCommentStatus),
    path('api/expertise/history/<int:pk>', ExpertiseHistory, name="history_expertise"),

]
