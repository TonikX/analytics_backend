from django.conf import settings
from django.db import models


class IndividualImplementationAcademicPlan(models.Model):
    """Модель индивидуального применения учебного плана в направлении."""

    implementation_of_academic_plan = models.ForeignKey(
        "ImplementationAcademicPlan",
        on_delete=models.CASCADE,
        verbose_name="Учебный план с направлением",
        related_name="implementation_of_academic_plan_in_field_of_study",
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True
    )
    comment = models.CharField(max_length=1024, blank=True, null=True)

    def __str__(self):
        return (
            str(self.pk)
            + "/"
            + str(self.implementation_of_academic_plan)
            + "/"
            + str(self.user)
        )


class WorkProgramInWorkProgramChangeInDisciplineBlockModule(models.Model):
    """Модель выбора РПД в блоке выборной РПД учебного плана."""

    work_program_change_in_discipline_block_module = models.ForeignKey(
        "WorkProgramChangeInDisciplineBlockModule",
        on_delete=models.CASCADE,
        related_name="changed_workprogram_in_wpcb",
    )
    work_program = models.ForeignKey("WorkProgram", on_delete=models.CASCADE)
    individual_implementation_of_academic_plan = models.ForeignKey(
        "IndividualImplementationAcademicPlan",
        on_delete=models.CASCADE,
        verbose_name="Учебный план с направлением в индивидуальном маршруте",
        related_name="implementation_of_academic_plan_in_field_of_study",
    )

    def __str__(self):
        return (
            str(self.pk)
            + "/"
            + str(self.work_program_change_in_discipline_block_module)
            + "/"
            + str(self.individual_implementation_of_academic_plan)
        )


class DisciplineBlockModuleInDisciplineBlock(models.Model):
    """Модель выбора модуля специализации в блоке учебного плана."""

    discipline_block = models.ForeignKey(
        "DisciplineBlock",
        on_delete=models.CASCADE,
        related_name="changed_workprogram_in_wpcb",
    )
    discipline_block_module = models.ForeignKey(
        "DisciplineBlockModule", on_delete=models.CASCADE
    )
    individual_implementation_of_academic_plan = models.ForeignKey(
        "IndividualImplementationAcademicPlan",
        on_delete=models.CASCADE,
        verbose_name="Учебный план с направлением в индивидуальном маршруте",
        related_name="implementation_of_academic_plan_in_field_of_study_for_bloc_module",
    )

    def __str__(self):
        return (
            str(self.pk)
            + "/"
            + str(self.discipline_block)
            + "/"
            + str(self.individual_implementation_of_academic_plan)
        )


class ElectiveWorkProgramInWorkProgramChangeInDisciplineBlockModule(models.Model):
    """Модель выбора факультатива в РПД учебного плана."""

    work_program_change_in_discipline_block_module = models.ForeignKey(
        "WorkProgramChangeInDisciplineBlockModule",
        on_delete=models.CASCADE,
        related_name="elective_changed_workprogram_in_wpcb",
    )
    discipline_block_module = models.ForeignKey(
        "DisciplineBlockModule", on_delete=models.CASCADE
    )
    individual_implementation_of_academic_plan = models.ForeignKey(
        "IndividualImplementationAcademicPlan",
        on_delete=models.CASCADE,
        verbose_name="Учебный план с направлением в индивидуальном маршруте",
    )
