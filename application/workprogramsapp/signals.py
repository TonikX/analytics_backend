from django.contrib.auth.models import Group, User
from django.db.models.signals import post_save
from django.dispatch import receiver

from workprogramsapp.expertise.models import UserExpertise
from workprogramsapp.notifications.models import ExpertiseNotification


def populate_models(sender, **kwargs):
    list_of_groups = ["rpd_developer", "education_plan_developer", "op_leader", "roles_and_professions_master",
                      "student", "expertise_master", "academic_plan_developer"]
    for group in list_of_groups:
        Group.objects.get_or_create(name=group)


@receiver(post_save, sender=UserExpertise)
def create_profile(sender, instance, created, **kwargs):
    """Create a matching profile whenever a user object is created."""
    if created:
        ExpertiseNotification.objects.create(expertise=instance.expertise, user=instance.expert,
                                             message="Тестовое сообщение")
