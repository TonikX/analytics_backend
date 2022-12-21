from django.db import transaction

from workprogramsapp.models import FieldOfStudy, AcademicPlan, DisciplineBlock, ImplementationAcademicPlan
from workprogramsapp.workprogram_additions.models import UniversityPartner, StructuralUnit


def get_qualification(direction_code: str) -> str:
    code_split = direction_code.split(".")
    qualification_code = code_split[1]
    if qualification_code == "03":
        return "bachelor"
    elif qualification_code == "04":
        return "master"


@transaction.atomic()
def process_headers(headers: list):
    academic_plan: dict
    counter_plans = 0
    for ap_header in headers:
        if ap_header["selection_year"] != 2023:
            continue

        qualification_name = get_qualification(ap_header["direction_code"])
        language = ""
        if ap_header["lang"] == "Английский":
            language = "en"
        elif ap_header["lang"] == "Русский":
            language = "ru"
        elif ap_header["lang"] == "Русский, Английский":
            language = "ru/en"

        total_intensity = 0
        try:
            total_intensity = int(ap_header["total_intensity"].split(" ")[0])
        except AttributeError:
            pass

        field_of_study, created = FieldOfStudy.objects.get_or_create(qualification=qualification_name,
                                                                     title=ap_header["direction_name"],
                                                                     number=ap_header["direction_code"])
        # print("FOS----------->", field_of_study, created)
        academic_plan, created = AcademicPlan.objects.get_or_create(ap_isu_id=ap_header["id"])
        # print("AP----------->", academic_plan, created)
        if created:
            DisciplineBlock.objects.create(name="Блок 1. Модули (дисциплины)", academic_plan=academic_plan)
            DisciplineBlock.objects.create(name="Блок 2. Практика", academic_plan=academic_plan)
            DisciplineBlock.objects.create(name="Блок 3. ГИА", academic_plan=academic_plan)
            DisciplineBlock.objects.create(name="Блок 4. Факультативные модули (дисциплины)",
                                           academic_plan=academic_plan)
        imp, created = ImplementationAcademicPlan.objects.get_or_create(ap_isu_id=ap_header["id"])
        # print("IMP----------->", imp, created)
        if created:
            imp.field_of_study.add(field_of_study)
        imp.plan_type = ap_header["plan_type"]
        imp.ns_id = ap_header["ns_id"]
        imp.op_isu_id = ap_header["edu_program_id"]
        imp.training_period = ap_header["training_period"]
        imp.language = language
        imp.military_department = bool(ap_header)
        imp.title = ap_header["edu_program_name"]
        imp.total_intensity = total_intensity,
        imp.academic_plan = academic_plan
        imp.year = 2023
        imp.qualification = qualification_name
        imp.save()
        print('!!', ImplementationAcademicPlan.objects.filter(id=imp.id))
        print('!!!!!!', ap_header["edu_program_name"])
        # print(created)
        if ap_header["university_partner"]:
            partner, created = UniversityPartner.objects.get_or_create(title=ap_header["university_partner"],
                                                                       country=ap_header["up_country"])
            if partner not in imp.university_partner.all():
                imp.university_partner.add(partner)
            # print("PARTNER----------->", partner, created)
        if ap_header["faculty_id"]:
            unit, created = StructuralUnit.objects.get_or_create(isu_id=ap_header["faculty_id"],
                                                                 title=ap_header["faculty_name"])
            imp.structural_unit = unit
            # print("UNIT---------->", unit, created)

        imp.save()
        counter_plans += 1
    return counter_plans
