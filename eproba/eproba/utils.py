from constance import config
from constance.signals import config_updated
from django.dispatch import receiver
from maintenance_mode.core import set_maintenance_mode
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class ApiConfigView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return Response(
            {
                "ads": config.ADS_MOBILE,
                "api_maintenance": config.API_MAINTENANCE_MODE,
                "min_version": config.MINIMUM_APP_VERSION,
            }
        )


@receiver(config_updated)
def constance_updated(sender, key, old_value, new_value, **kwargs):
    if key == "WEB_MAINTENANCE_MODE" and old_value != new_value:
        set_maintenance_mode(new_value)
