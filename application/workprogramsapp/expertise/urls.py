from django.urls import path

from workprogramsapp.expertise.views import UpdateCommentStatus, ExpertiseHistory, ChangeStatusesOfExpertiseWP, \
    ExpertiseChangeLogListView

urlpatterns = [

    path('api/experise/comment/statusupdate', UpdateCommentStatus),
    path('api/expertise/history/<int:pk>', ExpertiseHistory, name="history_expertise"),
    path('api/experise/udate_statuses', ChangeStatusesOfExpertiseWP),
    path('api/expertise/log_accept/<int:pk>', ExpertiseChangeLogListView.as_view(), name="expertise_log_pk"),
    path('api/expertise/log_accept', ExpertiseChangeLogListView.as_view(), name="expertise_log"),

]
