from django.db import models

from analytics_project import settings
from dataprocessing.models import Items


class RecommendationOfPrerequisitesFoUser(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    item = models.ForeignKey(Items, related_name='prerequisites_for_user',
                             blank=True, null=True,
                             verbose_name="Учебная сущность",
                             on_delete=models.CASCADE)
