import json
import os

from django.core.management import BaseCommand

from workprogramsapp.models import AcademicPlan, Zun, WorkProgramInFieldOfStudy, DisciplineBlockModule
from workprogramsapp.serializers import ZunForManyCreateSerializer


class Command(BaseCommand):

    def handle(self, *args, **options):
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'files/RESTORED_ZUNS.json')
        f = open(filename)
        data = json.load(f)
        skipped_counter = 0
        recreated_counter = 0
        not_exisisted_zuns = 0
        restored_counter = 0
        more_than_one_fs_count = 0
        for restored_data in data:
            wp_in_fss = WorkProgramInFieldOfStudy.objects.filter(work_program=restored_data["wp_id"],
                                                                 work_program_change_in_discipline_block_module__discipline_block_module__id=
                                                                 restored_data["module_id"]).distinct()
            if wp_in_fss.count() == 0:
                print(wp_in_fss)
                continue
            restored_counter += 1
            if wp_in_fss.count() > 1:
                more_than_one_fs_count += 1
            wp_in_fs = None
            for wp_in_fs_needed in wp_in_fss:
                zuns = Zun.objects.filter(wp_in_fs=wp_in_fs_needed)
                if zuns.exists():
                    wp_in_fs = wp_in_fs_needed
                    break
            if not wp_in_fs:
                wp_in_fs = wp_in_fss.first()

            zuns = Zun.objects.filter(wp_in_fs=wp_in_fs)
            zuns_fs_list = [zun.id for zun in zuns]
            if wp_in_fs.id == restored_data["wp_in_fs_id"] and set(zuns_fs_list) == set(restored_data["zuns"]):
                #print("skipped")
                skipped_counter += 1
                continue
            else:
                for zun_id in restored_data["zuns"]:
                    if zun_id not in zuns_fs_list:
                        try:
                            zun_to_connect = Zun.objects.get(id=zun_id)
                        except Zun.DoesNotExist:
                            #print(zun_id)
                            not_exisisted_zuns += 1
                            continue
                        zun_to_connect.wp_in_fs = wp_in_fs
                        zun_to_connect.save()
                        recreated_counter += 1
                        #print(zun_to_connect, wp_in_fs)
        print(
            f"records: {recreated_counter}, skipped: {skipped_counter}, more than one wp in fs {more_than_one_fs_count}"
            f", not_existed_zuns: {not_exisisted_zuns}, restored_zuns: {restored_counter}")
