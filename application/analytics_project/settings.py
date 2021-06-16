"""
Django settings for analytics_project project.

Generated by 'django-admin startproject' using Django 2.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

import environ

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
environ.Env.read_env()  # reading .env file

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

DATA_UPLOAD_MAX_NUMBER_FIELDS = 10000

#ALLOWED_HOSTS = ['94.250.249.177', '94.250.249.177:8000', 'localhost', '127.0.0.1']
ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'dataprocessing',
    'django_summernote',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'djoser',
    'corsheaders',
    'crispy_forms',
    'workprogramsapp',
    'django_tables2',
    'django_filters',
    'bootstrap_pagination',
    'rest_framework_swagger',
    'onlinecourse',
    'records',
    'django_extensions',
    #'oauth2_provider',
    #'social_django',
    #'rest_framework_social_oauth2',
    # 'social_auth',
    # 'social_django',  # django social auth
    # 'rest_social_auth',  # this package

]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    #'social_django.middleware.SocialAuthExceptionMiddleware',

    #'django.middleware.common.BrokenLinkEmailsMiddleware',
    #'django.middleware.common.CommonMiddleware',
    #'dataprocessing.CorsMiddleware',
]

# MIDDLEWARE_CLASSES = [
#     'dataprocessing.CorsMiddleware',
# ]

ROOT_URLCONF = 'analytics_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                #'social_django.context_processors.backends',
                #'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'analytics_project.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {'default': env.db('DATABASE_URL')}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static-backend/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static-backend')


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
GRAPH_ROOT = os.path.join(MEDIA_ROOT, 'graphs')
GRAPH_URL= f'{MEDIA_URL}graphs'
BACKEND_URL = "http://127.0.0.1:8000"

AUTH_USER_MODEL = 'dataprocessing.User'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAdminUser',
        'rest_framework.permissions.AllowAny',
    ),
    'PAGE_SIZE': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'EXCEPTION_HANDLER': 'rest_framework_json_api.exceptions.exception_handler',
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework_json_api.pagination.PageNumberPagination',
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        # 'rest_framework_json_api.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        # 'rest_framework_json_api.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'DEFAULT_METADATA_CLASS': 'rest_framework_json_api.metadata.JSONAPIMetadata',
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}

from datetime import timedelta

SIMPLE_JWT = {
    # 'AUTH_HEADER_TYPES': ('JWT',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=480),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}

AUTHENTICATION_BACKENDS = [
    #'social_core.backends.github.GithubOAuth2',
    'dataprocessing.social_auth_backend.FiwareAuth',
    'social_core.backends.facebook.FacebookOAuth2',
    'dataprocessing.itmo_backends.ItmoOAuth2',
    'django.contrib.auth.backends.ModelBackend'
]

# SOCIAL_AUTH_ITMOOAUTH2_KEY = ''
# SOCIAL_AUTH_ITMOOAUTH2_SECRET = ''

# CLIENT = 'nexoVnlgoNJnTuZ3CNBcbHgayXmhRjJUYfOb'
# SECRET = 'GV4SDAMfv5pgE3jzblcW7HUcND5pywqQL4be'
#
# SOCIAL_AUTH_AUTH0_DOMAIN = os.getenv("SOCIAL_AUTH_AUTH0_DOMAIN")
# SOCIAL_AUTH_AUTH0_KEY = os.getenv("SOCIAL_AUTH_AUTH0_KEY")
# SOCIAL_AUTH_AUTH0_SECRET = os.getenv("SOCIAL_AUTH_AUTH0_SECRET")

# FIWARE_APP_ID = ''
# FIWARE_API_SECRET = ''
# FIWARE_IDM_ENDPOINT = 'https://login.itmo.ru/cas/oauth2.0/authorize'
#
# FIWARE_IDM_API_VERSION = 2
# FIWARE_KEYSTONE_ENDPOINT = 'http://cloud.lab.fiware.org:4731'
#
# SOCIAL_AUTH_ENABLED_BACKENDS = ('fiware',)

# SOCIAL_AUTH_RAISE_EXCEPTIONS = False

AUTHENTICATION_BACKENDS = [
        #'social_core.backends.github.GithubOAuth2',
        # 'dataprocessing.social_auth_backend.FiwareAuth',
        # 'social_core.backends.facebook.FacebookOAuth2',
        # 'dataprocessing.itmo_backends.ItmoOAuth2',
        'django.contrib.auth.backends.ModelBackend'
]

CORS_ORIGIN_ALLOW_ALL = True
# #CORS_ALLOW_CREDENTIALS = True
# SESSION_COOKIE_SAMESITE = False
# CORS_ORIGIN_WHITELIST = [
#     'http://localhost:8080',
# ]
# CORS_ORIGIN_REGEX_WHITELIST = [
#     'http://localhost:8080',
# ]

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': '#/username/reset/confirm/{uid}/{token}',
    #'ACTIVATION_URL': '#/activate/{uid}/{token}',
    #'SEND_ACTIVATION_EMAIL': True,
    #'SERIALIZERS': {},
    'SET_USERNAME_RETYPE': True,
    'SERIALIZERS': {
        #'user': 'dataprocessing.serializers.UserSerializer',
        #'current_user': 'dataprocessing.serializers.UserSerializer',
        #'user_create': 'dataprocessing.serializers.UserSerializer',
    },
}

AUTH_USER_MODEL = 'dataprocessing.User'

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'api_key': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization'
        }
    },
}

ISU = {
    "ISU_CLIENT_ID": env('ISU_CLIENT_ID'),
    "ISU_CLIENT_SECRET": env('ISU_CLIENT_SECRET'),
    "ISU_REDIRECT_URI": env('ISU_REDIRECT_URI'),
}
BARS = {
    "BARS_LOGIN": env('BARS_LOGIN'),
    "BARS_PASSWORD": env('BARS_PASSWORD'),
}
