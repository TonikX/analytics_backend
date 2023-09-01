import json

import requests
from sentry_sdk import capture_exception

from analytics_project import settings
from workprogramsapp.models import СertificationEvaluationTool, WorkProgram, WorkProgramChangeInDisciplineBlockModule, \
    IsuObjectsSendLogger


def generate_contents(type_id, order=None, volume=None, ):
    if volume:
        volume = int(volume)
    return {

        "volume": volume,
        "work_type_id": type_id
    }


def generate_response(url, headers, body, obj_name, obj_id, ap_id=None):
    # print(body)
    response = requests.post(url, headers=headers, data=json.dumps(body, ensure_ascii=False).encode('utf-8'))
    print(response.text)
    try:
        IsuObjectsSendLogger.objects.create(obj_id=obj_id, obj_type=obj_name, generated_json=body,
                                            error_status=response.json()["error_code"], returned_data=response.json(),
                                            ap_id=ap_id)
    except:
        IsuObjectsSendLogger.objects.create(obj_id=obj_id, obj_type=obj_name, generated_json=body, error_status=1001,
                                            returned_data={"prod_error": "как вытягивать ошибки с прода я не знаю"},
                                            ap_id=ap_id)
        return None, 1001, {"prod_error": "как вытягивать ошибки с прода я не знаю"}

    if response.json()["error_code"] == 0:
        try:
            return response.json()["result"][0]["id"], response.json()["error_code"], response.json()
        except:
            return None, response.json()["error_code"], response.json()
    else:
        return None, response.json()["error_code"], response.json()


def post_gia_to_isu(token, gia, ap_id):
    """
    from gia_practice_app.GIA.models import *
    gia = GIA.objects.get(id=134)
    from workprogramsapp.isu_merge.post_to_isu.updaters_isu_logic import *
    post_gia_to_isu("1", gia)
    """
    certification_types = {1: 5, 2: 9, 3: 6, 4: 7, 5: 8}
    body = [{"name_ru": "",
             "name_en": "",
             "type_id": 0,
             "format_id": 1,
             "rpd_url": "",
             "lang_id": 0,
             "department_id": 0,
             "description_ru": "",
             "description_en": "",
             "contents": [

             ]}]

    url = settings.ISU_URL_UPDATERS + "/constructor_rpd_isu/v1/disciplines/"
    headers = {'Content-Type': "application/json", 'Authorization': "Bearer " + token}
    practice_dict = body[0]

    gia_title_splitted = gia.title.split("/")
    practice_dict["name_ru"] = gia_title_splitted[0]
    if len(gia_title_splitted) > 1:
        practice_dict["name_en"] = gia_title_splitted[1]
        practice_dict["lang_id"] = 1
    else:
        practice_dict["lang_id"] = 4

    if practice_dict["name_ru"] == "preparation":
        practice_dict["name_ru"] = "Подготовка к защите и защита ВКР"
    elif practice_dict["name_ru"] == "preparation-en":
        practice_dict["name_ru"] = "Подготовка к защите и защита ВКР"
        practice_dict["name_en"] = "Preparation for Thesis Defense and Thesis Defense"
        practice_dict["lang_id"] = 1


    practice_dict["type_id"] = 3
    practice_dict["format_id"] = 1
    practice_dict["rpd_url"] = "https://op.itmo.ru/gia/" + str(gia.id)

    practice_dict["department_id"] = gia.structural_unit.isu_id
    ze = [int(unit) for unit in gia.ze_v_sem.split(", ")]

    for i, el in enumerate(ze):
        order_dict = {"order": i + 1,
                      "work_types": [generate_contents(type_id=5), generate_contents(type_id=4, volume=el * 36)]}
        practice_dict["contents"].append(order_dict)
    return generate_response(url, headers, body, "gia", gia.id, ap_id)[0]


def post_practice_to_isu(token, practice, ap_id):
    """
    from gia_practice_app.Practice.models import *
    prac = Practice.objects.get(id=422)
    from workprogramsapp.isu_merge.post_to_isu.updaters_isu_logic import *
    post_practice_to_isu("1", prac)
    """
    certification_types = {1: 5, 2: 9, 3: 6, 4: 7, 5: 8}
    body = [{"name_ru": "",
             "name_en": "",
             "type_id": 0,
             "format_id": 1,
             "rpd_url": "",
             "lang_id": 4,
             "department_id": 0,
             "description_ru": "",
             "description_en": "",
             "contents": [

             ]}]

    url = settings.ISU_URL_UPDATERS + "/constructor_rpd_isu/v1/disciplines/"
    headers = {'Content-Type': "application/json", 'Authorization': "Bearer " + token}
    practice_dict = body[0]

    if practice.language == "ru":
        practice_dict["lang_id"] = 4
    elif practice.language == "en":
        practice_dict["lang_id"] = 1
    elif practice.language == "kz":
        practice_dict["lang_id"] = 10
    elif practice.language == "de":
        practice_dict["lang_id"] = 3

    practice_dict["name_ru"] = practice.title
    practice_dict["type_id"] = 2
    practice_dict["format_id"] = 1
    practice_dict["rpd_url"] = "https://op.itmo.ru/practice/" + str(practice.id)
    practice_dict["department_id"] = practice.structural_unit.isu_id
    list_of_tools = eval(practice.evaluation_tools_v_sem)
    ze = [int(unit) for unit in practice.ze_v_sem.split(", ")]
    for i, el in enumerate(list_of_tools):
        if el:
            order_dict = {"order": i + 1,
                          "work_types": []}
            for type_os in el:
                order_dict["work_types"].append(generate_contents(type_id=certification_types[type_os]))
            order_dict["work_types"].append(generate_contents(type_id=4, volume=ze[i] * 36))
            practice_dict["contents"].append(order_dict)
    return generate_response(url, headers, body, "practice", practice.id, ap_id)[0]


def post_wp_to_isu(token, wp, ap_id):
    """

    from workprogramsapp.models import *
    wp=WorkProgram.objects.get(id=17525)
    from workprogramsapp.isu_merge.post_to_isu.updaters_isu_logic import *
    post_wp_to_isu("1", wp)
    """
    # wp = WorkProgram.objects.get(id=wp_id)
    certification_types = {'1': 5, '2': 9, '3': 6, '4': 7, '5': 8}
    body = [{"name_ru": "",
             "name_en": "",
             "type_id": 0,
             "format_id": 1,
             "rpd_url": "",
             "lang_id": 4,
             "department_id": 0,
             "description_ru": "",
             "description_en": "",
             "contents": [

             ]}]

    url = settings.ISU_URL_UPDATERS + "/constructor_rpd_isu/v1/disciplines/"
    headers = {'Content-Type': "application/json", 'Authorization': "Bearer " + token}

    wp_dict = body[0]
    wp_dict["name_ru"] = wp.title
    wp_dict["type_id"] = 1  # Это дисциплина

    if wp.implementation_format == "offline":
        wp_dict["format_id"] = 1
    elif wp.implementation_format == "mixed":
        wp_dict["format_id"] = 2
    elif wp.implementation_format == "online":
        wp_dict["format_id"] = 3

    wp_dict["rpd_url"] = "https://op.itmo.ru/work-program/" + str(wp.id)

    if wp.language == "ru":
        wp_dict["lang_id"] = 4
    elif wp.language == "en":
        wp_dict["lang_id"] = 1
    elif wp.language == "kz":
        wp_dict["lang_id"] = 10
    elif wp.language == "de":
        wp_dict["lang_id"] = 3

    wp_dict["department_id"] = wp.structural_unit.isu_id
    wp_dict["description_ru"] = wp.description
    lecture_list = [float(hour) for hour in wp.lecture_hours_v2.split(", ")]
    practice_list = [float(hour) for hour in wp.practice_hours_v2.split(", ")]
    sro_list = [float(hour) for hour in wp.srs_hours_v2.split(", ")]
    lab_list = [float(hour) for hour in wp.lab_hours_v2.split(", ")]
    ze = [int(unit) for unit in wp.ze_v_sem.split(", ")]
    try:
        cons_list = [float(hour) for hour in wp.consultation_v2.split(", ")]
    except Exception as e:
        cons_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for order, _ in enumerate(lecture_list):
        order_dict = {"order": order + 1, "work_types": []}
        if lecture_list[order] != 0:
            order_dict["work_types"].append(generate_contents(volume=lecture_list[order], type_id=1))
        if lab_list[order] != 0:
            order_dict["work_types"].append(generate_contents(order=order, volume=lab_list[order], type_id=2))
        if practice_list[order] != 0:
            order_dict["work_types"].append(generate_contents(order=order, volume=practice_list[order], type_id=3))
        if sro_list[order] != 0:
            fake_sro = 36 * ze[order] - lecture_list[order] - lab_list[order] - practice_list[order] - cons_list[order]
            order_dict["work_types"].append(generate_contents(order=order, volume=fake_sro, type_id=4))
        if cons_list[order] != 0:
            order_dict["work_types"].append(generate_contents(order=order, volume=cons_list[order], type_id=12))
        if order_dict["work_types"]:
            wp_dict["contents"].append(order_dict)

    # Относительный или абсолютный семестр? Что делать если у нас несколько семестров начала?
    for cerf in СertificationEvaluationTool.objects.filter(work_program=wp):
        founded = False
        for term_dict in wp_dict["contents"]:
            if term_dict["order"] == cerf.semester:
                founded = True
                term_dict["work_types"].append(generate_contents(type_id=certification_types[cerf.type]))
        if not founded:
            order_dict = {"order": cerf.semester,
                          "work_types": [generate_contents(type_id=certification_types[cerf.type])]}
            wp_dict["contents"].append(order_dict)
    return generate_response(url, headers, body, "wp", wp.id, ap_id)[0]


def post_module_to_isu(token, module, parent_id, block, ap_id):
    """
    from workprogramsapp.isu_merge.post_to_isu.updaters_isu_logic import *
    from workprogramsapp.models import *
    parent= DisciplineBlockModule.objects.get(id=147411)
    module = DisciplineBlockModule.objects.get(id=147412)
    token="xDDDDD ya ustal"
    block=DisciplineBlock.objects.get(id=29646)
    post_module_to_isu(token, module, parent, block)
    """
    block_ids = {"Блок 1. Модули (дисциплины)": 1, "Блок 2. Практика": 4, "Блок 3. ГИА": 5,
                 "Блок 4. Факультативные модули (дисциплины)": 6}
    rules_ids = {"choose_n_from_m": 1, "all": 2, "any_quantity": 21, "by_credit_units": 41,
                 "no_more_than_n_credits": 61}
    body = [
        {
            "module_name": "",
            "bloc_id": 0,
            "parent_module_id": None,
            "rules_id": 0,
            "params": [0],
            "rpd_module_id": 0
        }
    ]

    url = settings.ISU_URL_UPDATERS + "/constructor_rpd_isu/v1/modules/"
    headers = {'Content-Type': "application/json", 'Authorization': "Bearer " + token}

    module_dict = body[0]
    module_dict["module_name"] = module.name
    module_dict["bloc_id"] = block_ids[block.name]
    if parent_id:
        module_dict["parent_module_id"] = parent_id
    module_dict["rules_id"] = rules_ids[module.selection_rule]
    if module.selection_parametr:
        module_dict["params"] = [int(el) for el in module.selection_parametr.split(", ")]
    else:
        module_dict["params"] = None
    module_dict["rpd_module_id"] = module.id
    return generate_response(url, headers, body, "module", module.id, ap_id)[0]


def generate_wp_in_lower_module_for_ap_isu(disc_id, changeblock, module, isu_id_lower_module, required):
    replaceable = False
    #required = False
    if changeblock.change_type != "Required":
        replaceable = True

    return {"disc_id": disc_id,
            "module_id": isu_id_lower_module,
            "semester_start": changeblock.semester_start,
            "replaceable ": replaceable,
            "required": required,
            "choice_flow": False}


def post_ap_to_isu(token, ap_dict, ap):
    url = settings.ISU_URL_UPDATERS + "/constructor_rpd_isu/v1/study_plans/"
    headers = {'Content-Type': "application/json", 'Authorization': "Bearer " + token}
    return generate_response(url, headers, ap_dict, "ap", ap.id, ap.id)
