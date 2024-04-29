import time
from pprint import pprint

from rest_framework.test import APIRequestFactory, force_authenticate

from dataprocessing.models import User
from workprogramsapp.bars_merge.views import postAcademicNTCheckpoints


def bars_send_lenght(username):
    # from workprogramsapp.bars_merge.test_bars.AcademicNTTests import bars_send_lenght
    factory = APIRequestFactory()
    user = User.objects.get(username=username)
    view = postAcademicNTCheckpoints
    start_time = time.time()
    request = factory.post(
        "api/bars_tools/academicntcheckpoints",
        {"year": "2021/2022", "from_date": "20.09.2021"},
        format="json",
    )
    force_authenticate(request, user=user)
    response = view(request)
    response.render()
    pprint(len(response.data["rpd"]))
    print(time.time() - start_time)
