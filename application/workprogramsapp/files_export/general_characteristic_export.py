from docxtpl import DocxTemplate
from xml.etree import ElementTree

from workprogramsapp.educational_program.general_prof_competencies.models import \
    GroupOfGeneralProfCompetencesInEducationalStandard, GeneralProfCompetencesInGroupOfGeneralCharacteristic, \
    IndicatorInGeneralProfCompetenceInGeneralCharacteristic
from workprogramsapp.educational_program.key_competences.models import GroupOfKeyCompetencesInEducationalStandard, \
    KeyCompetencesInGroupOfGeneralCharacteristic, IndicatorInKeyCompetenceInGeneralCharacteristic
from workprogramsapp.educational_program.over_professional_competencies.models import \
    GroupOfOverProfCompetencesInEducationalStandard, OverProfCompetencesInGroupOfGeneralCharacteristic, \
    IndicatorInOverProfCompetenceInGeneralCharacteristic
from workprogramsapp.educational_program.pk_comptencies.models import GroupOfPkCompetencesInGeneralCharacteristic, \
    PkCompetencesInGroupOfGeneralCharacteristic, IndicatorInPkCompetenceInGeneralCharacteristic
from workprogramsapp.models import GeneralCharacteristics, FieldOfStudy, GeneralizedLaborFunctions, \
    EmployerRepresentative


def remove_tags(text):
    return ''.join(ElementTree.fromstring(text).itertext())


def generate_context(gh):
    context = {"op_name": "",
               "directions": [],
               "qualification": "",
               "language": "",
               "realization_form": "",
               "type_op": None,
               "format": "",
               "year": "",
               "annotation": "",
               "area_of_activity": [],
               "add_area": [],
               "spheres": [],
               "objects": [],
               "types": [],
               "key_competences": [],
               "general_prof_competences": [],
               "over_prof_competences": [],
               "pk_prof_competences": [],
               "pk_foresight_competences": [],
               "pk_minor_competences": [],
               "director_position": "",
               "ep_supervisor": "",
               "dean_position": "",
               "dean": "",
               "employers":[]}

    #gh = GeneralCharacteristics.objects.get(id=id_gh)

    pk_code_inc = 0  # Переменная для генерации кодов для ПК
    try:
        # Имя ОП
        context["op_name"] = gh.educational_program.all()[0].title

        # Год
        context["year"] = gh.educational_program.all()[0].year
    except IndexError:
        pass

    # Направления
    fieldsofstudies = FieldOfStudy.objects.filter(
        implementation_academic_plan_in_field_of_study__general_characteristics_in_educational_program=gh)
    for fos in fieldsofstudies:
        context["directions"].append({"code": fos.number, "name": fos.title})

    # Квалификации
    try:
        qualification = fieldsofstudies[0].qualification
        if qualification == "master":
            context["qualification"] = "Магистратура"
        if qualification == "bachelor":
            context["qualification"] = "Бакалавриат"
        if qualification == "specialist":
            context["qualification"] = "Специалитет"
    except IndexError:
        pass

    # Язык ОХ
    if gh.language == "ru":
        context["language"] = "Русский"
    elif gh.language == "en":
        context["language"] = "Английский"
    elif gh.language == "kz":
        context["language"] = "Казахский"
    elif gh.language == "de":
        context["language"] = "Немецкий"
    elif gh.language == "ru/en":
        context["language"] = "Русский/Английский"

    # Форма реализации
    if gh.is_only_in_university:
        context["realization_form"] += "только в университете ИТМО, "
    if gh.is_global_educational_program:
        context["realization_form"] += "имеет статус международной образовательной программы (МОП), "
    if gh.is_online_format:
        context["realization_form"] += "в сетевой форме "
    if gh.collaboration_russian_in_online_format:
        context[
            "realization_form"] += f"совместно с российским(-и) партнером(-ами): {gh.collaboration_russian_in_online_format}, "
    if gh.is_collaboration_foreign:
        context["realization_form"] += "в форме совместной образовательной программы"
    if gh.collaboration_foreign:
        context["realization_form"] += f"совместно с иностранным(-и) партнером(-ами): {gh.collaboration_foreign}, "
    context["realization_form"] = context["realization_form"][:-2]

    # Тип ОП
    if gh.science_type:
        context["type_op"] = "научная"
    if gh.industrial_type:
        context["type_op"] = "индустриальная"
    if gh.corporate_type:
        context["type_op"] = "корпоративная"
    if gh.enterprise_type:
        context["type_op"] = "предпринемательская"
    if gh.target_master_type:
        context["type_op"] = "магистратура перспективных направлений"

    # Формат реализации
    if gh.realization_format == "offline":
        context["format"] = "оффлайн"
    elif gh.realization_format == "online":
        context["format"] = "онлайн"

    # Аннотации
    context["annotation"] = remove_tags(gh.annotation)

    # Области и сферы проф. деятельности
    for i, area in enumerate(gh.area_of_activity.all()):
        context["area_of_activity"].append(
            {"number": i + 1, "codename": f"{area.code_of_prof_area} {area.name_of_prof_area}", "code": area.code,
             "title": area.title})

    # Дополнительные области проф. деятельности
    for i, area in enumerate(gh.additional_area_of_activity.all()):
        context["add_area"].append(
            {"number": i + 1, "codename": f"{area.code_of_prof_area} {area.name_of_prof_area}", "code": area.code,
             "title": area.title})

    # Сферы профессиональной деятельности
    for kind in gh.kinds_of_activity.all():
        context["spheres"].append(kind.name)

    # Объекты профессиональной деятельности
    for obj in gh.objects_of_activity.all():
        context["objects"].append(obj.name)

    # Типы задач профессиональной деятельности
    for type_task in gh.tasks_for_prof_standards.all():
        context["types"].append(type_task.name)

    # Ключевые компетенции
    for group in GroupOfKeyCompetencesInEducationalStandard.objects.filter(
            educational_standard=gh.educational_standard):

        group_dict = {"category": group.name, "competences": []}
        context["key_competences"].append(group_dict)

        for competence_in_group in KeyCompetencesInGroupOfGeneralCharacteristic.objects.filter(group_of_pk=group):
            competence_dict = {
                "codename": f"{competence_in_group.competence.number} {competence_in_group.competence.name}",
                "indicators": []}
            group_dict["competences"].append(competence_dict)
            for indicator_in_group in IndicatorInKeyCompetenceInGeneralCharacteristic.objects.filter(
                    competence_in_group_of_pk=competence_in_group):
                competence_dict["indicators"].append(
                    f"{indicator_in_group.indicator.number} {indicator_in_group.indicator.name}")

    # Общепрофессиональные компетенции
    for group in GroupOfGeneralProfCompetencesInEducationalStandard.objects.filter(
            educational_standard=gh.educational_standard):

        group_dict = {"category": group.name, "competences": []}
        context["general_prof_competences"].append(group_dict)

        for competence_in_group in GeneralProfCompetencesInGroupOfGeneralCharacteristic.objects.filter(
                group_of_pk=group):
            competence_dict = {
                "codename": f"{competence_in_group.competence.number} {competence_in_group.competence.name}",
                "indicators": []}
            group_dict["competences"].append(competence_dict)
            for indicator_in_group in IndicatorInGeneralProfCompetenceInGeneralCharacteristic.objects.filter(
                    competence_in_group_of_pk=competence_in_group):
                competence_dict["indicators"].append(
                    f"{indicator_in_group.indicator.number} {indicator_in_group.indicator.name}")

    # Надпрофессиональные компетенции
    for group in GroupOfOverProfCompetencesInEducationalStandard.objects.filter(
            educational_standard=gh.educational_standard):

        group_dict = {"category": group.name, "competences": []}
        context["over_prof_competences"].append(group_dict)

        for competence_in_group in OverProfCompetencesInGroupOfGeneralCharacteristic.objects.filter(
                group_of_pk=group):
            competence_dict = {
                "codename": f"{competence_in_group.competence.number} {competence_in_group.competence.name}",
                "indicators": []}
            group_dict["competences"].append(competence_dict)
            for indicator_in_group in IndicatorInOverProfCompetenceInGeneralCharacteristic.objects.filter(
                    competence_in_group_of_pk=competence_in_group):
                competence_dict["indicators"].append(
                    f"{indicator_in_group.indicator.number} {indicator_in_group.indicator.name}")

    # Проф компетенции (на основе профессиональных стандартов)
    for group in GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(
            general_characteristic=gh, type_of_pk_competence="prof"):

        group_dict = {"category": group.name, "competences": []}
        context["pk_prof_competences"].append(group_dict)

        for competence_in_group in PkCompetencesInGroupOfGeneralCharacteristic.objects.filter(
                group_of_pk=group):
            pk_code_inc += 1
            competence_dict = {
                "codename": f"ПК-{pk_code_inc} {competence_in_group.competence.name}",
                "indicators": [],
                "profstandard": f"{competence_in_group.professional_standard.code} "
                                f"{competence_in_group.professional_standard.title}",
                "labor_functions": []}
            group_dict["competences"].append(competence_dict)
            indicator_num_counter = 0
            for indicator_in_group in IndicatorInPkCompetenceInGeneralCharacteristic.objects.filter(
                    competence_in_group_of_pk=competence_in_group):
                indicator_num_counter += 1
                competence_dict["indicators"].append(
                    f"ПК-{pk_code_inc}.{indicator_num_counter} {indicator_in_group.indicator.name}")
            for func in competence_in_group.generalized_labor_functions.all():
                competence_dict["labor_functions"].append(f"{func.code} {func.name}")

    # Проф компетенции (на основе форсайтов)
    for group in GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(
            general_characteristic=gh, type_of_pk_competence="fore"):

        group_dict = {"category": group.name, "competences": []}
        context["pk_foresight_competences"].append(group_dict)

        for competence_in_group in PkCompetencesInGroupOfGeneralCharacteristic.objects.filter(
                group_of_pk=group):
            pk_code_inc += 1
            competence_dict = {
                "codename": f"ПК-{pk_code_inc} {competence_in_group.competence.name}",
                "indicators": [],
                "sphere": competence_in_group.kinds_of_activity.name}
            group_dict["competences"].append(competence_dict)
            indicator_num_counter = 0
            for indicator_in_group in IndicatorInPkCompetenceInGeneralCharacteristic.objects.filter(
                    competence_in_group_of_pk=competence_in_group):
                indicator_num_counter += 1
                competence_dict["indicators"].append(
                    f"ПК-{pk_code_inc}.{indicator_num_counter} {indicator_in_group.indicator.name}")

    # Проф компетенции (на основе майноров)
    for group in GroupOfPkCompetencesInGeneralCharacteristic.objects.filter(
            general_characteristic=gh, type_of_pk_competence="min"):

        group_dict = {"category": group.name, "competences": []}
        context["pk_minor_competences"].append(group_dict)

        for competence_in_group in PkCompetencesInGroupOfGeneralCharacteristic.objects.filter(
                group_of_pk=group):
            pk_code_inc += 1
            competence_dict = {
                "codename": f"ПК-{pk_code_inc} {competence_in_group.competence.name}",
                "indicators": [],
                "sphere": competence_in_group.kinds_of_activity_for_miner}
            group_dict["competences"].append(competence_dict)
            indicator_num_counter = 0
            for indicator_in_group in IndicatorInPkCompetenceInGeneralCharacteristic.objects.filter(
                    competence_in_group_of_pk=competence_in_group):
                indicator_num_counter += 1
                competence_dict["indicators"].append(
                    f"ПК-{pk_code_inc}.{indicator_num_counter} {indicator_in_group.indicator.name}")
    try:
        # Руководитель ОП
        patronymic = gh.ep_supervisor.patronymic if gh.ep_supervisor.patronymic else ""
        context["ep_supervisor"] = f"{gh.ep_supervisor.first_name} {gh.ep_supervisor.last_name} " \
                                   f"{patronymic}"
        context["director_position"] = gh.directors_position
    except AttributeError:
        pass
    try:
        # Руководитель подразделения
        patronymic = gh.dean_of_the_faculty.patronymic if gh.dean_of_the_faculty.patronymic else ""
        context["dean_position"] = gh.dean_of_the_faculty_directors_position
        context["dean"] = f"{gh.dean_of_the_faculty.first_name} {gh.dean_of_the_faculty.last_name} " \
                          f"{patronymic}"
    except AttributeError:
        pass

    # Представители работодателей
    for emp in EmployerRepresentative.objects.filter(general_characteristic=gh):
        context["employers"].append({"pos": emp.employer_position, "name": emp.fio_employer})

    return context


