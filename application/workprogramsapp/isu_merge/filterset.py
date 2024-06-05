import django_filters

from workprogramsapp.models import IsuObjectsSendLogger


class HistoryFilter(django_filters.FilterSet):
    class Meta:
        model = IsuObjectsSendLogger
        fields = {
            "date_of_sending": [
                "exact",
            ],
            "error_status": ["gt", "exact"],
            "obj_id": ["exact"],
            "obj_type": ["exact"],
            "ap_id": ["exact"],
        }
