import json
import threading

import requests

from analytics_project import settings

EDUC_PROGRAMS = []
BASE_URL = "https://cas.crp.rocks/backend//rest"
BASE_HEADERS = {'content-type': 'application/json'}


def login():
    url = BASE_URL + "/login"
    body = {"login": settings.BARS["BARS_LOGIN"], "password": settings.BARS["BARS_PASSWORD"]}
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(body), headers=headers)
    BASE_HEADERS['Authorization'] = r.headers['Authorization']
    body_year = {"name": "current_year", "value": "2021/2022"}
    r = requests.post("https://cas.crp.rocks/backend//rest/config/personal", data=json.dumps(body_year), headers=BASE_HEADERS)
    body_term = {"name": "current_term", "value": 0}
    r = requests.post("https://cas.crp.rocks/backend//rest/config/personal", data=json.dumps(body_term), headers=BASE_HEADERS)


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


def get_list_of_regular_checkpoints():
    login()
    url = BASE_URL + "/checkpoint_types?type=regular"
    r = requests.get(url, headers=BASE_HEADERS)
    r.encoding = 'utf-8'
    return json.loads(r.text)


def get_list_of_final_checkpoints():
    login()
    url = BASE_URL + "/checkpoint_types?type=final"
    r = requests.get(url, headers=BASE_HEADERS)
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

def post_checkpoint_plan(body):
    login()
    url = BASE_URL + "/checkpoint_plans"
    r = requests.post(url, data=json.dumps(body), headers=BASE_HEADERS)
    return r.text

