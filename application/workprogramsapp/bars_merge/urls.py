from django.urls import path

import workprogramsapp.bars_merge.views as views

urlpatterns = [
    path("api/bars_tools/academicntcheckpoints", views.postAcademicNTCheckpoints),
    path(
        "api/bars_tools/add_wp_in_history_to_accepted",
        views.AddAcceptedWpToTableForAcceptedWp,
    ),
    path("api/bars_tools/get_wp/<int:isu_wp_id>", views.GetWPForBARS),
    path("api/bars_tools/history", views.BarsHistoryListView.as_view()),
    path("api/bars_tools/post_all_checkpoints", views.SendCheckpointsForAcceptedWP),
    path("api/bars_tools/post_checkpoint", views.CreateCheckPoint),
    path("api/bars_tools/set_bars_pointer_true", views.SetBarsPointerTrueToWP),
    path("api/bars_tools/similar_ep", views.FindSimilarEP),
    path("api/bars_tools/similar_wp", views.FindSimilarWP),
]
