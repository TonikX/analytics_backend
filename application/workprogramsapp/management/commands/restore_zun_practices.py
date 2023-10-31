import json
import os

from django.core.management import BaseCommand

from gia_practice_app.Practice.models import ZunPractice
from workprogramsapp.models import AcademicPlan, Zun, WorkProgramInFieldOfStudy, DisciplineBlockModule, \
    PracticeInFieldOfStudy
from workprogramsapp.serializers import ZunForManyCreateSerializer


class Command(BaseCommand):

    def handle(self, *args, **options):
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'files/RESTORED_ZUNS_PRACTICE.json')
        f = open(filename)
        data = json.load(f)
        skipped_counter = 0
        recreated_counter = 0
        not_exisisted_zuns = 0
        restored_counter = 0
        more_than_one_fs_count = 0
        for restored_data in data:
            prac_in_fss = PracticeInFieldOfStudy.objects.filter(practice=restored_data["practice_id"],
                                                                 work_program_change_in_discipline_block_module__discipline_block_module__id=
                                                                 restored_data["module_id"]).distinct()
            restored_counter += 1
            if prac_in_fss.count() == 0:
                print(prac_in_fss)
                continue

            if prac_in_fss.count() > 1:
                more_than_one_fs_count += 1
            prac_in_fs = None
            for prac_in_fs_needed in prac_in_fss:
                break_this_cycle = False
                zuns = ZunPractice.objects.filter(practice_in_fs=prac_in_fs_needed)
                if zuns.exists():
                    zuns_list_to_find = [zun.id for zun in zuns]
                    for restored_zun_id in restored_data["zuns"]:
                        if restored_zun_id in zuns_list_to_find:
                            prac_in_fs = prac_in_fs_needed
                            break_this_cycle = True
                            break
                    if break_this_cycle:
                        break
            if not prac_in_fs:
                prac_in_fs = prac_in_fss.first()

            zuns = ZunPractice.objects.filter(practice_in_fs=prac_in_fs)
            zuns_fs_list = [zun.id for zun in zuns]
            if prac_in_fs.id == restored_data["prac_in_fs_id"] and set(zuns_fs_list) == set(restored_data["zuns"]):
                #print("skipped")
                skipped_counter += 1
                continue
            else:
                for zun_id in restored_data["zuns"]:
                    if zun_id not in zuns_fs_list:
                        try:
                            zun_to_connect = ZunPractice.objects.get(id=zun_id)
                        except Zun.DoesNotExist:
                            #print(zun_id)
                            not_exisisted_zuns += 1
                            continue
                        zun_to_connect.wp_in_fs = prac_in_fs
                        zun_to_connect.save()
                        recreated_counter += 1
                        #print(zun_to_connect, wp_in_fs)
        print(
            f"records: {recreated_counter}, skipped: {skipped_counter}, more than one wp in fs {more_than_one_fs_count}"
            f", not_existed_zuns: {not_exisisted_zuns}, finded_fos: {restored_counter}")
