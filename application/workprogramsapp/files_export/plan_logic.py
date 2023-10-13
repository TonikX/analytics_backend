import os

import pandas as pd

from workprogramsapp.models import FieldOfStudy, AcademicPlan, ImplementationAcademicPlan, DisciplineBlock


def handle_uploaded_file_v2(file, filename):
    """
    Обработка файла xlsx
    """

    if not os.path.exists('upload/'):
        os.mkdir('upload/')
    path = 'upload/' + filename

    with open(path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    return path


def plans_processor(file):
    path = handle_uploaded_file_v2(file, str(file))
    plans = pd.read_excel(path)
    i=0
    for i in range(len(plans)):
        qualification = plans["Квалификация"][i]
        year = plans["Год приема"][i]
        plan_ids = str(plans["ИД плана"][i]).split("\n")
        direction_codes = str(plans["Код направления"][i]).split("\n")
        directions_names = str(plans["Направление подготовки"][i]).split("\n")
        op_name = plans["Название образовательной программы"][i]
        if plan_ids[0] == 'nan':
            break
        create_plans_in_row(qualification, year, plan_ids, direction_codes, directions_names, op_name)

    return i


def create_plans_in_row(qualification: int, year: int, plan_ids: list, direction_codes: list, directions_names: list,
                        op_name: str):
    qualification_name = "bachelor" if qualification == 62 else "master"
    for i in range(len(direction_codes)):
        field_of_study, created = FieldOfStudy.objects.get_or_create(qualification=qualification_name,
                                                                     title=directions_names[i],
                                                                     number=direction_codes[i])
        academic_plan = AcademicPlan.objects.create(ap_isu_id=int(plan_ids[i]))

        DisciplineBlock.objects.create(name="Блок 1. Модули (дисциплины)", academic_plan=academic_plan)
        DisciplineBlock.objects.create(name="Блок 2. Практика", academic_plan=academic_plan)
        DisciplineBlock.objects.create(name="Блок 3. ГИА", academic_plan=academic_plan)
        DisciplineBlock.objects.create(name="Блок 4. Факультативные модули (дисциплины)", academic_plan=academic_plan)

        imp = ImplementationAcademicPlan.objects.create(academic_plan=academic_plan,
                                                        year=year, qualification=qualification_name,
                                                        ap_isu_id=int(plan_ids[i]), title=op_name)
        imp.field_of_study.add(field_of_study)
        imp.save()
