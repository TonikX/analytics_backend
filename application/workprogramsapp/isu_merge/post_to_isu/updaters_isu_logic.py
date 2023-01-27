import json

import requests

from analytics_project import settings
from workprogramsapp.models import СertificationEvaluationTool, WorkProgram


def generate_contents(type_id, order=None, volume=None, ):
    if volume:
        volume = int(volume)
    return {

        "volume": volume,
        "work_type_id": type_id
    }


def post_wp_to_isu(token, wp_id):
    wp = WorkProgram.objects.get(id=wp_id)
    certification_types = {'1': 5, '2': 9, '3': 6, '4': 7, '5': 8}
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
            fake_sro = 36 * ze[order] - lecture_list[order] + lab_list[order] + practice_list[order] + cons_list[order]
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
    response = requests.post(url, headers=headers, data=json.dumps(body, ensure_ascii=False).encode('utf-8'))
    print(response.text)
