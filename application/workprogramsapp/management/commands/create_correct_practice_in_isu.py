import json
import os

from django.core.management.base import BaseCommand

from analytics_project import settings
from gia_practice_app.Practice.models import Practice
from workprogramsapp.isu_merge.academic_plan_update.isu_service import (
    IsuService,
    IsuUser,
)
from workprogramsapp.isu_merge.post_to_isu.updaters_isu_logic import (
    post_practice_to_isu,
    post_wp_to_isu,
)
from workprogramsapp.models import WorkProgram


class Command(BaseCommand):
    def handle(self, *args, **options):
        new_lines = []
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, "files/ISU_MAIN_PLAN_FROM_RPD.json")
        f = open(filename)
        data = json.load(f)
        isu_logger = IsuService(
            IsuUser(settings.ISU["ISU_CLIENT_ID"], settings.ISU["ISU_CLIENT_SECRET"])
        )
        isu_logger.get_access_token(add_headers={"scope": "service.edu-complex-isu"})
        TOKEN = isu_logger.token

        for el in data:
            try:
                practice = Practice.objects.get(discipline_code=el["DISC_ID"])
                new_id = post_practice_to_isu(TOKEN, practice, 0)
                if new_id:
                    el["DISC_ID"] = new_id
                    new_lines.append(el)
                    practice.discipline_code = new_id
                    practice.save()
            except Practice.DoesNotExist:
                pass
            try:
                wp = WorkProgram.objects.get(discipline_code=str(el["DISC_ID"]))
                new_id = post_wp_to_isu(TOKEN, wp, 0)
                if new_id:
                    el["DISC_ID"] = new_id
                    new_lines.append(el)
                    wp.discipline_code = str(new_id)
                    wp.save()
            except WorkProgram.DoesNotExist:
                pass
        filename = os.path.join(dirname, "files/NEW_ISU_IDS.json")
        f2 = open(filename, "w")
        f2.write(str(new_lines))
        f2.close()
