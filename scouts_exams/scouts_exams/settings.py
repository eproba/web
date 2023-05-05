import os
from pathlib import Path

from firebase_admin import credentials, initialize_app

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "xp^6=5g0y=^mwy$+jx7^bf!5s&zr$slvz=0lvy4)n55i#0+ib2"


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DJANGO_DEBUG", "") == "True"


SITE_ID = 4
ALLOWED_HOSTS = ["*"]
ROOT_URLCONF = "scouts_exams.urls"
CSRF_TRUSTED_ORIGINS = ["https://eproba.pl"]
DEFAULT_AUTO_FIELD = "django.db.models.AutoField"
WSGI_APPLICATION = "scouts_exams.wsgi.application"


# Periodic tasks settings (Celery)
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"


# Crispy forms settings (https://django-crispy-forms.readthedocs.io/en/latest/)
CRISPY_TEMPLATE_PACK = "bootstrap5"


# Firebase
FIREBASE_APP = initialize_app(
    credentials.Certificate(
        BASE_DIR / "scouts-exams-firebase-adminsdk-43fka-cf32dfa703.json"
    )
)
FCM_DJANGO_SETTINGS = {"APP_VERBOSE_NAME": "Powiadomienia (FCM)"}


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sitemaps",
    "django.contrib.sites",
    "rest_framework",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.facebook",
    "apps.blog.apps.BlogConfig",
    "apps.core.apps.CoreConfig",
    "apps.exam.apps.ExamConfig",
    "apps.users.apps.UsersConfig",
    "apps.teams.apps.TeamsConfig",
    "crispy_forms",
    "crispy_bootstrap5",
    "fcm_django",
    "oauth2_provider",
    "django_celery_beat",
    "constance",
    "constance.backends.database",
    "maintenance_mode",
]


# Middleware
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "maintenance_mode.middleware.MaintenanceModeMiddleware",
]


# API
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "oauth2_provider.contrib.rest_framework.OAuth2Authentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
}


# Accounts and authentication
LOGIN_URL = "login"
LOGIN_REDIRECT_URL = "exam:exam"
LOGOUT_REDIRECT_URL = "frontpage"
AUTH_USER_MODEL = "users.User"
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_SIGNUP_REDIRECT_URL = "finish_signup"
ACCOUNT_DEFAULT_HTTP_PROTOCOL = "https"

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

OAUTH2_PROVIDER = {
    # this is the list of available scopes
    "SCOPES": {
        "read": "Odczytywanie zawartości i danych na twoim koncie",
        "write": "Modyfikacja zawartoci i danych na twoim koncie",
    },
    "ALLOWED_REDIRECT_URI_SCHEMES": ["https", "com.czaplicki.eproba"],
}


# Social accounts
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
    },
    "facebook": {
        "METHOD": "oauth2",
        "SDK_URL": "//connect.facebook.net/{locale}/sdk.js",
        "SCOPE": ["email", "public_profile"],
        "INIT_PARAMS": {"cookie": True},
        "FIELDS": [
            "id",
            "email",
            "first_name",
            "last_name",
            "middle_name",
            "name",
            "name_format",
            "verified",
            "locale",
            "picture",
            "short_name",
        ],
        "EXCHANGE_TOKEN": True,
    },
}

SOCIALACCOUNT_ADAPTER = "apps.users.adapter.SocialAccountAdapter"
SOCIALACCOUNT_LOGIN_ON_GET = True

CONSTANCE_BACKEND = "constance.backends.database.DatabaseBackend"

CONSTANCE_CONFIG = {
    "ADS_WEB": (True, "Ads (web)"),
    "ADS_MOBILE": (True, "Ads (mobile)"),
    "WEB_MAINTENANCE_MODE": (False, "Web app maintenance"),
    "MOBILE_MAINTENANCE_MODE": (False, "Mobile app maintenance"),
    "MINIMUM_APP_VERSION": (20230100, "Minimum app version"),
}

MAINTENANCE_MODE_TEMPLATE = "errors/503.html"
MAINTENANCE_MODE_IGNORE_ADMIN_SITE = True
# MAINTENANCE_MODE_IGNORE_SUPERUSER = True
MAINTENANCE_MODE_IGNORE_URLS = (
    r"^/api/",
    r"^/$",
    r"^/about",
    r"^/robots.txt",
    r"^/sitemap.xml",
    r"^/contact",
    r"^/privacy-policy",
    r"^/terms-of-service",
    r"^/site-management",
)

# Templates
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
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


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators
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
    {
        "NAME": "pwned_passwords_django.validators.PwnedPasswordsValidator",
        "OPTIONS": {
            "error_message": "To hasło zostało znalezione w bazie haseł, które zostały ujawnione w wyniku różnych ataków. Wybierz inne hasło. Aby dowiedzieć się więcej, odwiedź https://haveibeenpwned.com",
            "help_message": "Twoje hasło nie może być używane w zbyt wielu miejscach.",
        },
    },
]


# Emails
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
DEFAULT_FROM_EMAIL = "Epróba <noreply@eproba.pl>"
EMAIL_HOST = "smtp.sendgrid.net"
EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")
EMAIL_PORT = 587
EMAIL_USE_TLS = True


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/
LANGUAGE_CODE = "pl"

TIME_ZONE = "CET"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/
STATIC_URL = "/static/"
if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, "static")
else:
    STATICFILES_DIRS = [BASE_DIR / "static"]
