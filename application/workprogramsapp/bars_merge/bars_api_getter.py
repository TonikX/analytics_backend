import json
import threading

import requests

from analytics_project import settings

EDUC_PROGRAMS = []
BASE_URL = settings.BARS["BARS_URL"]
BASE_HEADERS = {'content-type': 'application/json'}


def login(setup):
    url = BASE_URL + "/login"
    body = {"login": settings.BARS["BARS_LOGIN"], "password": settings.BARS["BARS_PASSWORD"]}
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(body), headers=headers)
    BASE_HEADERS['Authorization'] = r.headers['Authorization']
    body_year = {"name": "current_year", "value": setup[0]}
    requests.post(BASE_URL + "/config/personal", data=json.dumps(body_year),
                  headers=BASE_HEADERS)
    body_term = {"name": "current_term", "value": setup[1]}
    requests.post(BASE_URL + "/config/personal", data=json.dumps(body_term),
                  headers=BASE_HEADERS)
    req = requests.get(BASE_URL + "/users/current_user/", headers=BASE_HEADERS)
    req.encoding = 'utf-8'
    return {'content-type': 'application/json', 'Authorization': r.headers['Authorization']}
    # print(json.loads(req.text)["selected_year"], json.loads(req.text)["selected_term"])


def get_disciplines():
    login()
    headers = BASE_HEADERS.copy()
    url = BASE_URL + "/disciplines_for_plan"
    r = requests.get(url, headers=headers)
    r.encoding = 'utf-8'
    return json.loads(r.text)


def get_get_educational_program_request(id_disp, term):
    headers = BASE_HEADERS.copy()
    url = BASE_URL + "/educational_programs/" + str(id_disp) + "/" + str(term)
    r = requests.get(url, headers=headers)
    r.encoding = 'utf-8'
    EDUC_PROGRAMS.extend(json.loads(r.text))


def get_one_educational_program(id_disp, term):
    login()
    url = BASE_URL + "/educational_programs/" + str(id_disp) + "/" + str(term)
    r = requests.get(url, headers=BASE_HEADERS)
    r.encoding = 'utf-8'
    return json.loads(r.text)


def get_list_of_regular_checkpoints(setup):
    headers = login(setup)
    print(headers)
    url = BASE_URL + "/checkpoint_types?type=regular"
    r = requests.get(url, headers=headers)
    r.encoding = 'utf-8'
    return json.loads(r.text)


def get_list_of_final_checkpoints(setup):
    headers = login(setup)
    url = BASE_URL + "/checkpoint_types?type=final"
    r = requests.get(url, headers=headers)
    r.encoding = 'utf-8'
    return json.loads(r.text)


def get_educational_program_main():
    disciplines = get_disciplines()
    threads = list()
    for discipline in disciplines:
        x = threading.Thread(target=get_get_educational_program_request, args=(discipline["id"], discipline["term"]))
        threads.append(x)
        x.start()
    for index, thread in enumerate(threads):
        thread.join(120)

    educ_programs = (list({v['id']: v for v in EDUC_PROGRAMS}.values()))
    return educ_programs


def post_checkpoint_plan(body, setup):
    headers = login(setup)
    url = BASE_URL + "/checkpoint_plans"
    print(headers)
    r = requests.post(url, data=json.dumps(body), headers=headers)
    return r.text, r.status_code


def get_tests(setup):
    headers = login(setup)
    url = BASE_URL + "/tests"
    r = requests.get(url, headers=headers)
    return json.loads(r.text)


def post_tests(body, setup):
    headers = login(setup)
    url = BASE_URL + "/tests"
    r = requests.post(url, data=json.dumps(body), headers=headers)
    return json.loads(r.text)
