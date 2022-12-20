from django.core.management.base import BaseCommand

from workprogramsapp.models import AcademicPlan, ImplementationAcademicPlan


class Command(BaseCommand):

    def handle(self, *args, **options):
        plans = AcademicPlan.objects.filter(academic_plan_in_field_of_study__year=2023)
        for plan in plans:
            imps = ImplementationAcademicPlan.objects.filter(academic_plan=plan).order_by("-id")
            if len(imps) > 1:
                print(imps)
                for i in range(len(imps)):
                    if i != 0:
                        imps[i].delete()
