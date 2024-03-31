from django.core.management import BaseCommand

from workprogramsapp.models import WorkProgramInFieldOfStudy, Zun


class Command(BaseCommand):
    help = "Closes the specified poll for voting"

    def handle(self, *args, **options):

        fields_to_restore = WorkProgramInFieldOfStudy.objects.filter(
            backup_module__isnull=False, zun_in_wp__isnull=False
        )
        for field in fields_to_restore:
            wp_in_cbs = field.backup_ap.get_all_changeblocks_from_ap().filter(
                work_program=field.work_program
            )

            for wp_in_cb in wp_in_cbs:
                wp_in_fs = WorkProgramInFieldOfStudy.objects.get(
                    work_program_change_in_discipline_block_module=wp_in_cb
                )
                zuns = Zun.objects.filter(wp_in_fs=field)
                for zun in zuns:
                    zun.wp_in_fs = wp_in_fs
                    zun.save()
                print(wp_in_fs.work_program.id, field.work_program.id)
