def generate_checkpoint_plan(regular_checkpoint: list, programs: list, discipline: dict, final_checkpoint: dict,
                             course_project_checkpoint: dict, term: int, point_distribution: int,
                             additional_points: bool,
                             alternate_methods: bool,
                             has_course_project: bool):
    temp = {
        "additional_points": additional_points,
        "alternate_methods": alternate_methods,
        "has_course_project": has_course_project,
        "programs": programs,
        "status": "SAVED",
        "term": term,
        "regular_checkpoints": regular_checkpoint,
        "discipline": discipline,
        "final_checkpoint": final_checkpoint,
        "course_project_checkpoint": course_project_checkpoint,
        "point_distribution": point_distribution,
        "year": "2022/2023"
    }
    return temp


def generate_checkpoint(name, min, max, week, key, type_id=-1, test_id=-1):
    if type(min) is not int:
        min = 0
    temp = {
        "name": name,
        "min_grade": min,
        "max_grade": max,
        "week": week,
        "key": key,
        "type_id": type_id,
    }
    if test_id != -1:
        temp["test_id"] = test_id
    if type_id != -1:
        temp["type_id"] = type_id

    return temp


def generate_discipline(bars_id, name, term, course_project):
    temp = {
        "id": bars_id,
        "name": name,
        "term": term,
        "course_project": course_project
    }
    return temp


def generate_program(bars_id, code, name):
    temp = {
        "id": bars_id,
        "code": code,
        "name": name
    }
    return temp


def generate_fos(id: int, code: str, name: str):
    temp = {
        "id": id,
        "code": code + ".",
        "name": name
    }
    return temp


def generate_test(term: int, year: str, name: str):
    temp = {
        "name": name,
        "year": year,
        "term": term
    }
    return temp


# TODO: Придумать как избавиться от этого хардкод-прикола
def get_checkpoints_type(type, get_name=False):
    types = [{
        "id": 27,
        "name": "Диф. зачет",
        "type": "final",
        "ordering": 1,
        "created_by": "None",
        "updated_by": "None",
        "created_at": "None",
        "updated_at": "None",
        "type_here": 2
    },
        {
            "id": 26,
            "name": "Зачет",
            "type": "final",
            "ordering": 1,
            "created_by": "None",
            "updated_by": "None",
            "created_at": "None",
            "updated_at": "None",
            "type_here": 3
        },
        {
            "id": 25,
            "name": "Экзамен",
            "type": "final",
            "ordering": 1,
            "created_by": "None",
            "updated_by": "None",
            "created_at": "None",
            "updated_at": "None",
            "type_here": 1
        }]
    for el in types:
        if el["type_here"] == type:
            if not get_name:
                return el["id"]
            else:
                return el["name"]


def generate_checkpoint_new(name, min, max, week, key, type_name):
    temp = {
        "name": name,
        "min_grade": min,
        "max_grade": max,
        "week": week,
        "key": key,
        "type": type_name,
    }

    return temp
