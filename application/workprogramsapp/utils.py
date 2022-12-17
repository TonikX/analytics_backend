from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule, AcademicPlan, ImplementationAcademicPlan


def remove_empty_changeblocks():
    result = WorkProgramChangeInDisciplineBlockModule.objects.filter(
        discipline_block_module__descipline_block=None).delete()


def remove_old_implimentations():
    plans = AcademicPlan.objects.filter(academic_plan_in_field_of_study__year=2023)
    for plan in plans:
        imps = ImplementationAcademicPlan.objects.filter(academic_plan=plan).order_by("-id")
        if len(imps) > 1:
            print(imps)
            for i in range(len(imps)):
                if i != 0:
                    imps[i].delete()
