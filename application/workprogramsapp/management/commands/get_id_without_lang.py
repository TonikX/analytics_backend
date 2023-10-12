from django.core.management import BaseCommand

from workprogramsapp.models import AcademicPlan


class Command(BaseCommand):

    def handle(self, *args, **options):
        plans = AcademicPlan.objects.filter(academic_plan_in_field_of_study__year=2023)
        wp_ids = []
        practice_ids = []
        for plan in plans:
            for changeblock in plan.get_all_changeblocks_from_ap():
                if changeblock.work_program.all():
                    if not changeblock.work_program.all()[0].language:
                        wp_ids.append(changeblock.work_program.all()[0].id)
                if changeblock.practice.all():
                    if not changeblock.practice.all()[0].language:
                        practice_ids.append(changeblock.practice.all()[0].id)
        print("wp: ", set(wp_ids))
        print("")
        print("")
        print("practice: ", set(practice_ids))
