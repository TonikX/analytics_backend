from django.urls.conf import path

from workprogramsapp.educational_program.educational_standart.views import (
    EducationalStandardCreateView,
    EducationalStandardListView,
    EducationalStandardSingleObjectDeleteView,
    EducationalStandardSingleObjectEditView,
    EducationalStandardSingleObjectView,
    TasksForEducationalStandardCreateView,
    TasksForEducationalStandardDeleteView,
    TasksForEducationalStandardEditView,
    TasksForEducationalStandardListView,
    TasksForEducationalStandardSingleObjectView,
)

urlpatterns = [
    # --образовательный стандарт
    path("api/educational_standarts", EducationalStandardListView.as_view()),
    path("api/educational_standarts/create", EducationalStandardCreateView.as_view()),
    path(
        "api/educational_standarts/detail/<int:pk>",
        EducationalStandardSingleObjectView.as_view(),
    ),
    path(
        "api/educational_standarts/delete/<int:pk>",
        EducationalStandardSingleObjectDeleteView.as_view(),
    ),
    path(
        "api/educational_standarts/update/<int:pk>",
        EducationalStandardSingleObjectEditView.as_view(),
    ),
    # --задачи проф. стандарта
    path("api/task_prof_standarts", TasksForEducationalStandardListView.as_view()),
    path(
        "api/task_prof_standarts/create",
        TasksForEducationalStandardCreateView.as_view(),
    ),
    path(
        "api/task_prof_standarts/detail/<int:pk>",
        TasksForEducationalStandardSingleObjectView.as_view(),
    ),
    path(
        "api/task_prof_standarts/delete/<int:pk>",
        TasksForEducationalStandardDeleteView.as_view(),
    ),
    path(
        "api/task_prof_standarts/update/<int:pk>",
        TasksForEducationalStandardEditView.as_view(),
    ),
]
