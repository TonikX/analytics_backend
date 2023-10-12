from pprint import pprint

from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate, APILiveServerTestCase

from dataprocessing.models import User
from workprogramsapp.expertise.views import ExpertiseHistory


def history_response(id, username):
    # from workprogramsapp.expertise.tests_expertises.HistoryTests import history_response
    factory = APIRequestFactory()
    user = User.objects.get(username=username)
    view = ExpertiseHistory
    request = factory.get(f'api/expertise/history/{id}')
    force_authenticate(request, user=user)
    response = view(request, pk=id)
    response.render()
    pprint(response.data)
