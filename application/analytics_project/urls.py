from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from rest_framework_swagger.views import get_swagger_view

from analytics_project.yasg import urlpatterns as doc_url

schema_view = get_swagger_view(title="Analytics API")

urlpatterns = [
    path("admin/", admin.site.urls),
    # path('hho/', include('oauth2_provider.urls')),
    url(r"^", include("dataprocessing.urls")),
    path("", include("workprogramsapp.urls")),
    url(r"^", include("onlinecourse.urls")),
    url(r"^", include("records.urls")),
    url(r"^", include("selection_of_keywords_for_rpd.urls")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
    path("auth/", include("djoser.urls.jwt")),
    # path('auth/social/itmo/', ItmoOAuth2),
    # path('djoser/auth/social/', include('djoser.social.urls')),
    # path("api/accounts/", include("accounts.urls")),
    # path(r'swagger-docs/', schema_view),
    # url(r'^auth0/', include('rest_framework_social_oauth2.urls')),
    # url(r'^social-docs/', include('social_django.urls')),
    # path('hho/', include('oauth2_provider.urls')),
    # url(r'social_auth/', include('social_auth.urls')),
    # url(r'^login/', include('rest_social_auth.urls_jwt_pair')),
    # url(r'^login/', include('rest_social_auth.urls_jwt')),
]

# swagger docs
urlpatterns += doc_url

# django-debug-toolbar
if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
