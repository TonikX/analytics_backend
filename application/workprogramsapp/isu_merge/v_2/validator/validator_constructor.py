from workprogramsapp.models import DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, ImplementationAcademicPlan, AcademicPlan

from .validator_base import ValidatorBase


class ValidatorConstructorPlans(ValidatorBase):
    def __init__(self):
        super().__init__()

    def validate(self, id):
        errors = {
            "blocks": False,
            "hours": False,
            "specialization": False,
            "ognp": False,
        }
        ap = AcademicPlan.objects.get(id=id)

        sum_ze = 0
        ognp_ze = []
        specialization_ze = []
        for module in DisciplineBlockModule.objects.filter(descipline_block__academic_plan=ap):
                block_used = False
                for change in WorkProgramChangeInDisciplineBlockModule.objects.filter(discipline_block_module=module):
                    ze = sum(list(map(int, change.credit_units.split(','))))
                    if not block_used:
                        sum_ze += ze
                    if module.type == "ognp" or "ОГНП" in module.name:
                        found_ze = False
                        for x in ognp_ze:
                            if x["name"] == module.name:
                                x["value"] += ze
                                found_ze = True
                                break
                        if not found_ze:
                            ognp_ze.append({"name": module.name, "value": ze})
                    elif module.type == "specialization_module" or "Специализация" in module.name:
                        specialization_ze.append({"name": module.name, "value": ze})

                if len(ognp_ze) > 0:
                    ognp_value = ognp_ze[0]["value"]
                    for ognp in ognp_ze:
                        if ognp["value"] != ognp_value:
                            errors["ognp"] = True
                            break

                if len(specialization_ze) > 0:
                    specialization_value = specialization_ze[0]["value"]
                    for specialization in specialization_ze:
                        if specialization["value"] != specialization_value:
                            errors["specialization"] = True
                            break

        return errors
