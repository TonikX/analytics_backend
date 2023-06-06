from django.contrib.postgres.search import SearchVector
from django.core.management import BaseCommand

from gia_practice_app.Practice.models import Practice
from workprogramsapp.models import DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, \
    WorkProgramInFieldOfStudy, Zun, Indicator, ImplementationAcademicPlan


class Command(BaseCommand):

    def handle(self, *args, **options):
        modules_for_filtering = DisciplineBlockModule.objects.annotate(search=SearchVector("name")).filter(
            search="универсальная подготовка")
        modules = DisciplineBlockModule.objects.none()
        for module in modules_for_filtering:
            imps = ImplementationAcademicPlan.get_all_imp_by_modules([module])
            if imps.filter(year=2023).exists():
                modules = modules | DisciplineBlockModule.objects.filter(id=module.id)
        is_used_wp_ids = []
        for module in modules:
            changeblocks = DisciplineBlockModule.get_all_changeblocks_from_module(module)
            for changeblock in changeblocks:
                changeblock: WorkProgramChangeInDisciplineBlockModule
                for wp in changeblock.work_program.all():
                    if wp.id in is_used_wp_ids:
                        continue
                    is_used_wp_ids.append(wp.id)
                    wp_in_fss = WorkProgramInFieldOfStudy.objects.filter(work_program=wp)
                    max_len_zuns = 0
                    zuns = None

                    for fs in wp_in_fss:
                        zuns_for_fs = Zun.objects.filter(wp_in_fs=fs)
                        if zuns_for_fs.count() > max_len_zuns:
                            max_len_zuns = zuns_for_fs.count()
                            zuns = zuns_for_fs
                    if max_len_zuns != 0:
                        indicators_new = Indicator.objects.filter(zun__in=zuns)
                        fs_2023 = WorkProgramInFieldOfStudy.objects.none()
                        module_for_fs = DisciplineBlockModule.objects.filter(
                            change_blocks_of_work_programs_in_modules__work_program=wp)
                        for module_fs in module_for_fs:
                            imps = ImplementationAcademicPlan.get_all_imp_by_modules([module_fs])
                            if imps.filter(year=2023).exists():
                                fs_2023 = fs_2023 | WorkProgramInFieldOfStudy.objects.filter(
                                    work_program_change_in_discipline_block_module__discipline_block_module=module_fs)
                        for fs in fs_2023:
                            indicators = Indicator.objects.filter(zun__wp_in_fs=fs)
                            diff_indicators = set(indicators_new) - set(indicators)
                            for ind in diff_indicators:
                                Zun.objects.create(indicator_in_zun=ind, wp_in_fs=fs)
                    else:
                        ...
        print("done")
