import pandas as pd


def generate_main_dict(id_op):
    competence_main_dict = {
        "id_op": id_op,
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
        "indicator_name": indicator_name

    }
    return indicator_dict


def competence_dict_generator(file_path):
    competences = pd.read_csv(file_path, delimiter=';', encoding="utf-8")
    competence_list = []
    for i, row in competences.iterrows():
        main_dict_find_bool = False
        competence_find_bool = False
        indicator_find_bool = False
        main_dict = None
        try:
            id_op = list(map(int, row["ИД ОП"].split(",")))
        except AttributeError:
            id_op = [2613]
        try:
            competence_id, competence_name = row["Название компетенции"].split(" ", 1)
        except AttributeError:
            competence_id, competence_name = "Без ИД компетенции", "Без названия компетенции"
            print(row["Название индикатора"])
        competence_group = row["Название группы компетенций"]
        competence_type = row["Тип компетенции"]
        try:
            indicator_id, indicator_name = row["Название индикатора"].split(" ", 1)
        except AttributeError:
            indicator_id, indicator_name = "Без ИД индикатора", "Без названия индикатора"
            print(row["Название компетенции"])
        for el in competence_list:
            if el["id_op"] == id_op:
                main_dict = el
                main_dict_find_bool = True
                break
        if not main_dict:
            main_dict = generate_main_dict(id_op)
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

        indicator = generate_indicator_dict(indicator_id, indicator_name)
        competence["indicators_list"].append(indicator)
    return competence_list
