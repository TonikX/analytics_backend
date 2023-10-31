import json
import os

import pandas as pd
from django.core.management import BaseCommand

from workprogramsapp.models import AcademicPlan, Zun, WorkProgramInFieldOfStudy, DisciplineBlockModule, Indicator, \
    GeneralCharacteristics, WorkProgram
from workprogramsapp.serializers import ZunForManyCreateSerializer


class Command(BaseCommand):

    def handle(self, *args, **options):
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'files/DROPPED_ZUNS.json')
        filename_csv = os.path.join(dirname, 'files/CSV_DROPPED.json')
        f = open(filename)
        data = json.load(f)
        gh_dict = {"ID_ИНДИКАТОРА": [], "КОД_ИНДИКАТОРА": [], "ИМЯ_ИНДИКАТОРА": [], "ID_ОХ": [], "ID_ПЛАНА": [],
                   "ISU_ID_ПЛАНА": [], "ИМЯ_ПЛАНА": [], "РПД_ИД": [], "ИМЯ_РПД": [], }
        for zun_id in data:
            indicator = Indicator.objects.get(zun__id=zun_id)
            gh_list = GeneralCharacteristics.objects.filter(
                group_of_pk_competences__competence_in_group_of_pk_competences__indicator_of_competence_in_group_of_pk_competences__indicator=indicator).distinct()
            for gh in gh_list:
                plans = gh.educational_program.all()
                work_profram_from_zun = WorkProgram.objects.get(zuns_for_wp__zun_in_wp=zun_id)
                for plan in plans:
                    gh_dict["ID_ИНДИКАТОРА"].append(indicator.id)
                    gh_dict["КОД_ИНДИКАТОРА"].append(indicator.number)
                    gh_dict["ИМЯ_ИНДИКАТОРА"].append(indicator.name)
                    gh_dict["ID_ОХ"].append(gh.id)
                    gh_dict["ID_ПЛАНА"].append(plan.academic_plan.id)
                    gh_dict["ISU_ID_ПЛАНА"].append(plan.ap_isu_id)
                    gh_dict["ИМЯ_ПЛАНА"].append(plan.title)
                    gh_dict["РПД_ИД"].append(work_profram_from_zun.id)
                    gh_dict["ИМЯ_РПД"].append(work_profram_from_zun.title)
        df = pd.DataFrame(gh_dict)
        df.to_csv(filename_csv, index=False)
