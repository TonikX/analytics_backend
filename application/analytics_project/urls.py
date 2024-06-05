from django.conf import settings
from django.conf.urls import include
from django.contrib import admin
from django.urls import path, re_path
from rest_framework_swagger.views import get_swagger_view

from analytics_project.yasg import urlpatterns as doc_url

schema_view = get_swagger_view(title="Analytics API")

urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(r"^", include("dataprocessing.urls")),
    path("", include("workprogramsapp.urls")),
    re_path(r"^", include("onlinecourse.urls")),
    re_path(r"^", include("records.urls")),
    re_path(r"^", include("selection_of_keywords_for_rpd.urls")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
    path("auth/", include("djoser.urls.jwt")),
]

# swagger docs
urlpatterns += doc_url

# django-debug-toolbar
if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
