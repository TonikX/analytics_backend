import time
import requests
import json
from .academic_module_isu import AcademicModuleISU, AcademicModuleRuleISU

class UserISU:
  def __init__(self, client_id, client_secret):
    self.client_id = client_id
    self.client_secret = client_secret

class ISUService:
  def __init__(self, isu_user):
    self.requested_in = None
    self.expires_in = None
    self.token = None
    self.isu_user = isu_user
    self.auth_url = "https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/token"
    self.academic_plan_url = "https://disc.itmo.su/api/v1/academic_plans"
    self.modules_url = 'https://references.itmo.su/api/v1/references/modules?limit=5000&offset=0'
    self.rules_url = 'https://references.itmo.su/api/v1/references/module_choice_params'
    self.grant_type = "client_credentials"

  def get_access_token(self):
    auth_data = {"client_id": self.isu_user.client_id, "client_secret": self.isu_user.client_secret,
                 "grant_type": self.grant_type}
    response = requests.post(self.auth_url, auth_data).text
    self.token = json.loads(response)["access_token"]
    self.expires_in = json.loads(response)["expires_in"]
    self.requested_in = time.time()

  def check_token(self):
      if self.token is None or time.time() >= self.requested_in + self.expires_in:
          self.get_access_token()

  def get_academic_plan(self, id):
    self.check_token()
    headers = {'Content-Type': "application/json", 'Authorization': "Token " + self.token}
    url = self.academic_plan_url + "/" + id
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
      print("error from isu", response.status_code, id)
      return

    return response.json()['result']

  def get_modules_info(self):
    self.check_token()
    headers = {'Content-Type': "application/json", 'Authorization': "Token " + self.token}
    response = requests.get(self.modules_url, headers=headers)

    if response.status_code != 200:
      print("error from isu", response.status_code, id)
      return

    modules_data = response.json()['result']['data']
    # modules_list = []
    # for i in modules_data:
    #   module = AcademicModuleISU(i["id"], i["name"], i["parent_id"],  i["rules"], i["params_rules"], i["sort"], i["language_id"], i["language_code"])
    #   modules_list.append(module)

    return modules_data

  def get_rules_info(self):
    self.check_token()
    headers = {'Content-Type': "application/json", 'Authorization': "Token " + self.token}
    response = requests.get(self.rules_url, headers=headers)

    if response.status_code != 200:
      print("error from isu", response.status_code, id)
      return

    data = response.json()['result']['data']
    info_list = []
    for i in data:
      info = AcademicModuleRuleISU(i["id"], i["name"], i["language_id"], i["language_code"])
      info_list.append(info)

    return info_list