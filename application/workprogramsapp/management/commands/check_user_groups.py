from django.contrib.auth.models import Group
from django.core.management import BaseCommand

from dataprocessing.models import User
from workprogramsapp.models import WorkProgram


class Command(BaseCommand):
    list_of_groups = [
        "rpd_developer",
        "education_plan_developer",
        "op_leader",
        "student",
    ]
    list_of_groups_for_student = ["student"]
    list_of_groups_for_rpd_developer = ["rpd_developer"]

    def handle(self, *args, **options):
        for user in User.objects.all():
            groups = user.groups.values_list("name", flat=True)
            if list(groups) == self.list_of_groups:
                if WorkProgram.objects.filter(editors=user).exists():
                    user.groups.clear()
                    for group in self.list_of_groups_for_rpd_developer:
                        user.groups.add(Group.objects.get(name=group))
                else:
                    user.groups.clear()
                    for group in self.list_of_groups_for_student:
                        user.groups.add(Group.objects.get(name=group))
