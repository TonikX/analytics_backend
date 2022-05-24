from django.urls import path

from workprogramsapp.expertise.views import UpdateCommentStatus, ExpertiseHistory, ChangeStatusesOfExpertiseWP

urlpatterns = [

    path('api/experise/comment/statusupdate', UpdateCommentStatus),
    path('api/expertise/history/<int:pk>', ExpertiseHistory, name="history_expertise"),
    path('api/experise/udate_statuses', ChangeStatusesOfExpertiseWP),

]
