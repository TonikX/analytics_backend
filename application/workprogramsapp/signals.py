from django.contrib.auth.models import Group


def populate_models(sender, **kwargs):
    list_of_groups = ["rpd_developer", "education_plan_developer", "op_leader", "roles_and_professions_master",
                      "student", "expertise_master", "academic_plan_developer"]
    for group in list_of_groups:
        Group.objects.get_or_create(name=group)
