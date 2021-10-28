from django.urls import path

from workprogramsapp.expertise.views import UpdateCommentStatus

urlpatterns = [

    path('api/experise/comment/statusupdate', UpdateCommentStatus),

]
