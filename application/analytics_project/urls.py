from django.contrib import admin
from django.urls import path, include
from rest_framework_swagger.views import get_swagger_view
from django.conf.urls import url, include


schema_view = get_swagger_view(title='Analytica API')

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include('dataprocessing.urls')),
    url(r'^', include('workprogramsapp.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    # path("api/accounts/", include("accounts.urls")),
    path(r'swagger-docs/', schema_view),
]

