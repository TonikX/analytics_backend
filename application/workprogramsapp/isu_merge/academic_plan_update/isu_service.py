import time
import requests
import json


class IsuUser:
    def __init__(self, client_id, client_secret):
        self.client_id = client_id
        self.client_secret = client_secret


class IsuService:
    def __init__(self, isu_user):
        self.requested_in = None
        self.expires_in = None
        self.token = None
        self.isu_user = isu_user
        self.auth_url = "https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/token"
        self.academic_plan_url = "https://disc.itmo.su/api/v1/academic_plans"
        self.academic_plan_headers_url = "https://disc.itmo.su/api/v1/academic_plans_heading"
        self.wp_bank = "https://disc.itmo.su/api/v1/disciplines"
        self.wp_hours = "https://disc.itmo.su/api/v1/disciplines_volumes"
        self.grant_type = "client_credentials"

    def get_access_token(self, add_headers=None):
        auth_data = {"client_id": self.isu_user.client_id, "client_secret": self.isu_user.client_secret,
                     "grant_type": self.grant_type}
        if add_headers:
            for key, value in add_headers.items():
                auth_data[key] = value
        response = requests.post(self.auth_url, auth_data).text
        self.token = json.loads(response)["access_token"]
        self.expires_in = json.loads(response)["expires_in"]
        self.requested_in = time.time()

    def __check_token__(self):
        if self.token is None or time.time() >= self.requested_in + self.expires_in:
            self.get_access_token()

    def get_academic_plan(self, academic_plan_id):
        self.__check_token__()
        headers = {'Content-Type': "application/json", 'Authorization': "Token " + self.token}
        url = self.academic_plan_url + "/" + academic_plan_id
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            # print("Error: academic plan fetch failed: ", response.status_code, academic_plan_id)
            raise Exception("Error: academic plan fetch failed: id: {id}, responce_code: {code}" \
                            .format(code=str(response.status_code), id=str(academic_plan_id)))

        return response.json()['result']

    def get_academic_plan_headers(self):
        self.__check_token__()
        headers = {'Content-Type': "application/json", 'Authorization': "Token " + self.token}
        url = self.academic_plan_headers_url
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            # print("Error: academic plan fetch failed: ", response.status_code)
            return

        # print(response.json()['result'])

        return response.json()['result']

    def get_wp_from_bank(self):
        self.__check_token__()
        headers = {'Content-Type': "application/json", 'Authorization': "Token " + self.token}
        url = self.wp_bank
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            return

        return response.json()['result']

    def get_wp_hours(self, isu_id):
        self.__check_token__()
        headers = {'Content-Type': "application/json", 'Authorization': "Token " + self.token}
        url = self.wp_hours + "/" + isu_id
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            return

        return response.json()['result']

