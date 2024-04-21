import os
from datetime import timedelta

import environ
import sentry_sdk
from django.core.management.commands.runserver import Command as Runserver
from pyproject_parser import PyProject
from sentry_sdk.integrations.django import DjangoIntegration

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

pyproject = PyProject.load(filename=BASE_DIR + "/pyproject.toml").to_dict()

env = environ.Env(
    DEBUG=(bool, False),
    LOGGING_DEBUG=(bool, False),
    EMAIL_ENABLE=(bool, True),
    EMAIL_USE_TLS=(bool, True),
    EMAIL_USE_SSL=(bool, False),
)
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

PROJECT_HOST = env.str("PROJECT_HOST")
PROJECT_PORT = env.str("PROJECT_PORT")

Runserver.default_addr = PROJECT_HOST
Runserver.default_port = PROJECT_PORT

SECRET_KEY = env.str("SECRET_KEY")

DEBUG = env.bool("DEBUG")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.messages",
    "django.contrib.sessions",
    "django.contrib.staticfiles",
]

LOCAL_APPS = [
    "dataprocessing",
    "gia_practice_app",
    "onlinecourse",
    "records",
    "selection_of_keywords_for_rpd",
    "streams_app",
    "workprogramsapp",
]

THIRD_PARTY_APPS = [
    "cachalot",
    "corsheaders",
    "django_filters",
    "django_summernote",
    "django_tables2",
    "djoser",
    "drf_spectacular",
    "drf_spectacular_sidecar",
    "model_clone",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "rest_framework_swagger",
    "whitenoise.runserver_nostatic",
]

# Приложения только для среды разработки. Включаются при DEBUG=True.
# Не использовать в продуктиве!
DEV_APPS = [
    "debug_toolbar",
    "django_extensions",
]

INSTALLED_APPS = LOCAL_APPS + THIRD_PARTY_APPS + DJANGO_APPS

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

SPECTACULAR_SETTINGS = {
    "TITLE": "Analytics Backend API",
    "DESCRIPTION": "API Конструктора ОП",
    "VERSION": str(pyproject["project"]["version"]),
    "SERVE_INCLUDE_SCHEMA": False,
    "SWAGGER_UI_DIST": "SIDECAR",
    "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
    "REDOC_DIST": "SIDECAR",
    "DISABLE_ERRORS_AND_WARNINGS": False if DEBUG else True,
}

ROOT_URLCONF = "analytics_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

ASGI_APPLICATION = "analytics_project.asgi.application"
WSGI_APPLICATION = "analytics_project.wsgi.application"

DATABASES = {"default": env.db_url("DATABASE_URL")}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

DATA_UPLOAD_MAX_NUMBER_FIELDS = 100000

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"

LANGUAGE_CODE = "ru-RU"
TIME_ZONE = "Europe/Moscow"
USE_I18N = True
USE_L10N = True

STATIC_URL = "/static-backend/"
STATIC_ROOT = os.path.join(BASE_DIR, "static-backend")

# Шаблон учебного плана (Academic Plan)
XLSX_TEMPLATE_AP = env.str("XLSX_TEMPLATE_AP")
XLSX_TEMPLATE_AP_ABSPATH = STATIC_ROOT + "/export_template/" + XLSX_TEMPLATE_AP

# Шаблон рабочей программы дисциплины (РПД)
DOCX_TEMPLATE_RPD = env.str("DOCX_TEMPLATE_RPD")
DOCX_TEMPLATE_RPD_ABSPATH = STATIC_ROOT + "/export_template/" + DOCX_TEMPLATE_RPD

# Шаблон учебной программы (Syllabus)
DOCX_TEMPLATE_SB = env.str("DOCX_TEMPLATE_SB")
DOCX_TEMPLATE_SB_ABSPATH = STATIC_ROOT + "/export_template/" + DOCX_TEMPLATE_SB

# Шаблон общих характеристик (General Characteristics)
DOCX_TEMPLATE_GC = env.str("DOCX_TEMPLATE_GC")
DOCX_TEMPLATE_GC_ABSPATH = STATIC_ROOT + "/export_template/" + DOCX_TEMPLATE_GC

# Шаблон матрицы компетенций (Competence Matrix)
DOCX_TEMPLATE_CM = env.str("DOCX_TEMPLATE_CM")
DOCX_TEMPLATE_CM_ABSPATH = STATIC_ROOT + "/export_template/" + DOCX_TEMPLATE_CM

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

AUTH_USER_MODEL = "dataprocessing.User"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAdminUser",
        "rest_framework.permissions.AllowAny",
    ),
    "PAGE_SIZE": 10,
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "EXCEPTION_HANDLER": "rest_framework_json_api.exceptions.exception_handler",
    "DEFAULT_PAGINATION_CLASS": "rest_framework_json_api.pagination.PageNumberPagination",
    "DEFAULT_PARSER_CLASSES": (
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ),
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
    "DEFAULT_METADATA_CLASS": "rest_framework_json_api.metadata.JSONAPIMetadata",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=480),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

AUTHENTICATION_BACKENDS = ["django.contrib.auth.backends.ModelBackend"]

CORS_ORIGIN_ALLOW_ALL = True

DJOSER = {
    "PASSWORD_RESET_CONFIRM_URL": "#/password/reset/confirm/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "#/username/reset/confirm/{uid}/{token}",
    "SET_USERNAME_RETYPE": True,
    "SERIALIZERS": {
        "user": "dataprocessing.serializers.UserBaseSerializer",
        "current_user": "dataprocessing.serializers.UserBaseSerializer",
    },
}

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "api_key": {"type": "apiKey", "in": "header", "name": "Authorization"}
    },
    "DEFAULT_AUTO_SCHEMA_CLASS": "analytics_project.yasg_tag_class.CustomAutoSchema",
}

ONLINECOURSE_CERT = env.str("ONLINECOURSE_CERT")
ONLINECOURSE_KEY = env.str("ONLINECOURSE_KEY")

ISU = {
    "ISU_CLIENT_ID": env.str("ISU_CLIENT_ID"),
    "ISU_CLIENT_SECRET": env.str("ISU_CLIENT_SECRET"),
    "ISU_REDIRECT_URI": env.str("ISU_REDIRECT_URI"),
    "ISU_FINISH_URI": env.str("ISU_FINISH_URI_WITH_PROTOCOL"),
}

BARS = {
    "BARS_LOGIN": env.str("BARS_LOGIN"),
    "BARS_PASSWORD": env.str("BARS_PASSWORD"),
    "BARS_URL": env.str("BARS_URL"),
}

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER")
EMAIL_HOST = env.str("EMAIL_HOST")
EMAIL_PORT = env.str("EMAIL_PORT")
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS")
EMAIL_USE_SSL = env.bool("EMAIL_USE_SSL", default=False)
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD")
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

URL_FRONT = env.str("URL_FRONT")
ISU_URL_UPDATERS = env.str("ISU_URL_UPDATERS")
LAN_TOKEN = env.str("LAN_TOKEN")

sentry_sdk.init(
    dsn=env.str("SENTRY_URL"),
    integrations=[
        DjangoIntegration(),
    ],
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=0.5,
    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True,
)

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.memcached.PyMemcacheCache",
        "LOCATION": env.str("MEMCACHE_LOCATION"),
    }
}

# Секция только для целей разработки. Не выставлять DEBUG=True в продуктиве!
if DEBUG:

    INSTALLED_APPS += DEV_APPS

    MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")

    DEBUG_TOOLBAR_PANELS = [
        "debug_toolbar.panels.history.HistoryPanel",
        "debug_toolbar.panels.versions.VersionsPanel",
        "debug_toolbar.panels.timer.TimerPanel",
        "debug_toolbar.panels.settings.SettingsPanel",
        "debug_toolbar.panels.headers.HeadersPanel",
        "debug_toolbar.panels.request.RequestPanel",
        "debug_toolbar.panels.sql.SQLPanel",
        "debug_toolbar.panels.staticfiles.StaticFilesPanel",
        "debug_toolbar.panels.templates.TemplatesPanel",
        "debug_toolbar.panels.cache.CachePanel",
        "debug_toolbar.panels.signals.SignalsPanel",
        "debug_toolbar.panels.redirects.RedirectsPanel",
        "debug_toolbar.panels.profiling.ProfilingPanel",
    ]

    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK": lambda request: True,
    }

if env.bool("LOGGING_DEBUG", default=False):
    LOGGING = {
        "version": 1,
        "formatters": {
            "standard": {"format": "%(asctime)s [%(levelname)s]- %(message)s"}
        },
        "handlers": {
            "django_error": {
                "level": "DEBUG",
                "class": "logging.StreamHandler",
                "formatter": "standard",
            },
            "info": {
                "level": "DEBUG",
                "class": "logging.StreamHandler",
                "formatter": "standard",
            },
            "console": {
                "level": "DEBUG",
                "class": "logging.StreamHandler",
                "formatter": "standard",
            },
        },
        "loggers": {
            "info": {
                "handlers": ["info", "console"],
                "level": "DEBUG",
                "propagate": True,
            },
            "django": {
                "handlers": ["console"],
                "level": "INFO",
                "propagate": True,
            },
            "django.request": {
                "handlers": ["django_error", "console"],
                "level": "DEBUG",
                "propagate": True,
            },
            "django.db.backends": {
                "handlers": ["console"],
                "level": "DEBUG",
            },
        },
    }
