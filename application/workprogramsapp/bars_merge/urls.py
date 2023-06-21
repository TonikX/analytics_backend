# Запросы для работы с БАРС
from django.urls import path, include

from workprogramsapp.bars_merge.views import FindSimilarEP, FindSimilarWP, CreateCheckPoint, \
    SendCheckpointsForAcceptedWP, SetBarsPointerTrueToWP, BarsHistoryListView, AddAcceptedWpToTableForAcceptedWp, \
    postAcademicNTCheckpoints, GetWPForBARS

urlpatterns = [
    path('api/bars_tools/academicntcheckpoints', postAcademicNTCheckpoints),
    path('api/bars_tools/similar_ep', FindSimilarEP),
    path('api/bars_tools/similar_wp', FindSimilarWP),
    path('api/bars_tools/post_checkpoint', CreateCheckPoint),
    path('api/bars_tools/post_all_checkpoints', SendCheckpointsForAcceptedWP),
    path('api/bars_tools/set_bars_pointer_true', SetBarsPointerTrueToWP),
    path('api/bars_tools/history', BarsHistoryListView.as_view()),
    path('api/bars_tools/add_wp_in_history_to_accepted', AddAcceptedWpToTableForAcceptedWp),
    path('api/bars_tools/get_wp/<int:isu_wp_id>', GetWPForBARS),
]
