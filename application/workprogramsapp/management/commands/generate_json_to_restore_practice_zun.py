import json
import os

from django.core.management import BaseCommand

from gia_practice_app.Practice.models import ZunPractice
from workprogramsapp.models import AcademicPlan, Zun, WorkProgramInFieldOfStudy, DisciplineBlockModule, \
    PracticeInFieldOfStudy
from workprogramsapp.serializers import ZunForManyCreateSerializer


class Command(BaseCommand):

    def handle(self, *args, **options):
        zun_to_restore_list = []
        prac_in_fss = PracticeInFieldOfStudy.objects.filter(zun_in_practice__isnull=False,
                work_program_change_in_discipline_block_module__discipline_block_module__selection_rule__isnull=False)
        for prac_in_fs in prac_in_fss:
            try:
                module = DisciplineBlockModule.objects.get(
                    change_blocks_of_work_programs_in_modules__zuns_for_cb_for_practice=prac_in_fs)
            except DisciplineBlockModule.DoesNotExist:
                continue
            zuns = ZunPractice.objects.filter(practice_in_fs=prac_in_fs)
            zun_dict = {"practice_id": prac_in_fs.practice.id,
                        "module_id": module.id,
                        "prac_in_fs_id":prac_in_fs.id,
                        "zuns": []}
            for zun in zuns:
                zun_dict["zuns"].append(zun.id)
            print(zun_dict)
            zun_to_restore_list.append(zun_dict)
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'files/RESTORED_ZUNS_PRACTICE.json')
        with open(filename, 'w') as file:
            file.write(json.dumps(zun_to_restore_list, indent=2, ensure_ascii=False))
