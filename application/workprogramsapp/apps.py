from django.apps import AppConfig
from django.db.models.signals import post_migrate


class WorkprogramsappConfig(AppConfig):
    name = "workprogramsapp"

    def ready(self):
        from workprogramsapp.signals import populate_models

        post_migrate.connect(populate_models, sender=self)
