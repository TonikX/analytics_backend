import json
import threading

import requests

EDUC_PROGRAMS = []
BASE_URL = "https://cas.crp.rocks/backend//rest"
BASE_HEADERS = {'content-type': 'application/json'}


def login():
    url = BASE_URL + "/login"
    body = {"login": "rpduser", "password": "asd123As"}
    headers = {'content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(body), headers=headers)
    BASE_HEADERS['Authorization'] = r.headers['Authorization']


def get_disciplines():
    login()
    headers = BASE_HEADERS.copy()
    url = BASE_URL + "/disciplines_for_plan"
    r = requests.get(url, headers=headers)
    r.encoding = 'utf-8'
    return json.loads(r.text)


def get_get_educational_program_request(id_disp, term):
    headers = BASE_HEADERS.copy()
    url = BASE_URL+"/educational_programs/" + str(id_disp) + "/" + str(term)
    r = requests.get(url, headers=headers)
    r.encoding = 'utf-8'
    EDUC_PROGRAMS.extend(json.loads(r.text))


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