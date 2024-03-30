from django.urls import path

from workprogramsapp.disciplineblockmodules.views import (
    CopyModules,
    CopyModulesToAnotherAPView,
    DisciplineBlockModuleCreateAPIView,
    DisciplineBlockModuleDestroyView,
    DisciplineBlockModuleDetailView,
    DisciplineBlockModuleShortListView,
    DisciplineBlockModuleUpdateView,
    InsertModule,
    InsertModuleInBlockAP,
    WorkWithBlocksApiView,
)

urlpatterns = [
    path(
        "api/disciplineblockmodule/create", DisciplineBlockModuleCreateAPIView.as_view()
    ),
    path(
        "api/disciplineblockmodule/delete/<int:pk>",
        DisciplineBlockModuleDestroyView.as_view(),
    ),
    path(
        "api/disciplineblockmodule/update/<int:pk>",
        DisciplineBlockModuleUpdateView.as_view(),
    ),
    path(
        "api/disciplineblockmodule/list", DisciplineBlockModuleShortListView.as_view()
    ),
    path(
        "api/disciplineblockmodule/detail/<int:pk>",
        DisciplineBlockModuleDetailView.as_view(),
    ),
    path("api/disciplineblockmodule/insert", InsertModule),
    path("api/disciplineblockmodule/insert_to_block", WorkWithBlocksApiView.as_view()),
    path(
        "api/disciplineblockmodule/insert_to_block_with_ap",
        InsertModuleInBlockAP.as_view(),
    ),
    path(
        "api/disciplineblockmodule/connect_modules_from_ap",
        CopyModulesToAnotherAPView.as_view(),
    ),
    path("api/disciplineblockmodule/copy", CopyModules.as_view()),
]
