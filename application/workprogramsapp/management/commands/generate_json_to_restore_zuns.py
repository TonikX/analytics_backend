import json
import os

from django.core.management import BaseCommand

from workprogramsapp.models import Zun, WorkProgramInFieldOfStudy, DisciplineBlockModule


class Command(BaseCommand):

    def handle(self, *args, **options):
        zun_to_restore_list = []
        wp_in_fss = WorkProgramInFieldOfStudy.objects.filter(
            zun_in_wp__isnull=False,
            backup_module__isnull=True,
            work_program_change_in_discipline_block_module__discipline_block_module__selection_rule__isnull=False,
        )
        for wp_in_fs in wp_in_fss:
            try:
                module = DisciplineBlockModule.objects.get(
                    change_blocks_of_work_programs_in_modules__zuns_for_cb=wp_in_fs
                )
            except DisciplineBlockModule.DoesNotExist:
                continue
            zuns = Zun.objects.filter(wp_in_fs=wp_in_fs)
            zun_dict = {
                "wp_id": wp_in_fs.work_program.id,
                "module_id": module.id,
                "wp_in_fs_id": wp_in_fs.id,
                "zuns": [],
            }
            for zun in zuns:
                zun_dict["zuns"].append(zun.id)
            zun_to_restore_list.append(zun_dict)
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, "files/RESTORED_ZUNS.json")
        with open(filename, "w") as file:
            file.write(json.dumps(zun_to_restore_list, indent=2, ensure_ascii=False))
