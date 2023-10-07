import re

import pandas as pd


def generate_main_dict(id_op, op_name):
    competence_main_dict = {
        "id_op": id_op,
        "op_name": op_name,
        "competence_list": []
    }
    return competence_main_dict


def generate_competence_dict(id_comp, comp_name, comp_group, comp_type):
    competence_dict = {
        "id_competence": id_comp,
        "competence_name": comp_name,
        "competence_group": comp_group,
        "competence_type": comp_type,
        "indicators_list": []
    }
    return competence_dict


def generate_indicator_dict(id_indicator, indicator_name):
    indicator_dict = {
        "id_indicator": id_indicator,
        "indicator_name": indicator_name,
        "wp_list": []
    }
    return indicator_dict


def names_with_id_handler(pk_name):
    russian_lower = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
    russian_higher = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
    all_nums = "0123456789"

    # print(pk_name)
    def iterate_pk(offset):
        for index, char_pk in enumerate(pk_name[offset:]):
            if char_pk in russian_higher + russian_lower:
                pk_num = pk_name[:offset + index].replace(" ", "")
                while not pk_num[-1] in all_nums:
                    pk_num = pk_num[:-1]
                pk_title = pk_name[4 + index:]
                pk_title = re.sub(" +", " ", pk_title[0].upper() + pk_title[1:])
                return pk_num, pk_title

    try:
        return iterate_pk(4)
    except IndexError:
        return iterate_pk(5)


def competence_dict_generator(file_path):
    competences = pd.read_csv(file_path, delimiter=';', encoding="utf-8")
    competence_list = []
    for i, row in competences.iterrows():
        main_dict_find_bool = False
        competence_find_bool = False
        indicator_find_bool = False
        main_dict = None
        id_op = list(map(int, str(row["ИД ОП"]).split(",")))
        try:
            competence_id, competence_name = names_with_id_handler(row["Название компетенции"])
            print(competence_id)
            print(competence_name)
        except TypeError:
            competence_id, competence_name = "Без ИД компетенции", "Без названия компетенции"
            # print(row["Название индикатора"])
        competence_group = row["Название группы компетенций"]
        competence_type = row["Тип компетенции"]
        try:
            indicator_id, indicator_name = names_with_id_handler(row["Название индикатора"])
            print(indicator_id)
            print(indicator_name)
        except TypeError:
            indicator_id, indicator_name = "Без ИД индикатора", "Без названия индикатора"
            # print(row["Название компетенции"])
        for el in competence_list:
            if el["id_op"] == id_op:
                main_dict = el
                main_dict_find_bool = True
                break
        if not main_dict:
            op_name = row["ОП"]
            main_dict = generate_main_dict(id_op, op_name)
            competence_list.append(main_dict)

        competence = None
        if main_dict_find_bool:
            for el in main_dict["competence_list"]:
                if el["competence_name"] == competence_name:
                    competence = el
                    competence_find_bool = True
                    break
        if not competence:
            competence = generate_competence_dict(competence_id, competence_name, competence_group, competence_type)
            main_dict["competence_list"].append(competence)
        # Добавление  ид РПД для компетенции
        indicator = generate_indicator_dict(indicator_id, indicator_name)
        try:
            indicator["wp_list"] = list(map(int, str(row["ИД РПД"]).split(",")))
        except ValueError:
            indicator["wp_list"] = []
        competence["indicators_list"].append(indicator)
    return competence_list
