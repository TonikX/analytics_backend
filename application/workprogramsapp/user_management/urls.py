from django.urls import path

from workprogramsapp.user_management.views import UserListView, UserRetrieveView

urlpatterns = [

    path('api/user_management/user_list', UserListView.as_view()),
    path('api/user_management/crud_single_user/<int:pk>', UserRetrieveView.as_view()),
]
