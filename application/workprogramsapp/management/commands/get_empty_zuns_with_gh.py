import json
import os

import pandas as pd
from django.core.management import BaseCommand

from workprogramsapp.models import Zun, Indicator, GeneralCharacteristics


class Command(BaseCommand):

    def handle(self, *args, **options):
        dirname = os.path.dirname(__file__)
        filename_csv = os.path.join(dirname, "files/CSV_DROPPED_FOS_NONE.csv")
        gh_dict = {
            "ID_ИНДИКАТОРА": [],
            "КОД_ИНДИКАТОРА": [],
            "ИМЯ_ИНДИКАТОРА": [],
            "ID_ОХ": [],
            "ID_ПЛАНА": [],
            "ISU_ID_ПЛАНА": [],
            "ИМЯ_ПЛАНА": [],
            "ZUN_ID": [],
            "ЗНАНИЯ": [],
            "УМЕНИЯ": [],
            "НАВЫКИ": [],
        }
        filename = os.path.join(dirname, "files/old_db_dropped_zuns.json")
        f = open(filename)
        old_ids = set(json.load(f))
        filename = os.path.join(dirname, "files/new_db_dropped_zuns.json")
        f = open(filename)
        new_ids = set(json.load(f))

        data_for_iter = new_ids - old_ids
        print(len(data_for_iter))

        counter = 0
        for zun_id in data_for_iter:
            zun = Zun.objects.get(id=zun_id)
            counter += 1
            print(counter)
            try:
                indicator = Indicator.objects.get(zun__id=zun.id)
            except Indicator.DoesNotExist:
                continue
            gh_list = GeneralCharacteristics.objects.filter(
                educational_standard__standard_date=2022
            )
            # Q(group_of_pk_competences__competence_in_group_of_pk_competences__indicator_of_competence_in_group_of_pk_competences__indicator=indicator) |
            gh_list = gh_list.filter(
                group_of_pk_competences__competence_in_group_of_pk_competences__indicator_of_competence_in_group_of_pk_competences__indicator=indicator
            ).distinct()
            for gh in gh_list:
                plans = gh.educational_program.all()
                plans = plans.filter(year=2023)
                for plan in plans:

                    gh_dict["ID_ИНДИКАТОРА"].append(indicator.id)
                    gh_dict["КОД_ИНДИКАТОРА"].append(indicator.number)
                    gh_dict["ИМЯ_ИНДИКАТОРА"].append(indicator.name)
                    gh_dict["ID_ОХ"].append(gh.id)
                    gh_dict["ID_ПЛАНА"].append(plan.academic_plan.id)
                    gh_dict["ISU_ID_ПЛАНА"].append(plan.ap_isu_id)
                    gh_dict["ИМЯ_ПЛАНА"].append(plan.title)
                    gh_dict["ZUN_ID"].append(zun.id)
                    gh_dict["ЗНАНИЯ"].append(zun.knowledge)
                    gh_dict["УМЕНИЯ"].append(zun.skills)
                    gh_dict["НАВЫКИ"].append(zun.attainments)
            print(gh_list)
        print(
            len(gh_dict["ID_ИНДИКАТОРА"]),
            len(gh_dict["КОД_ИНДИКАТОРА"]),
            len(gh_dict["ИМЯ_ИНДИКАТОРА"]),
            len(gh_dict["ID_ОХ"]),
            len(gh_dict["ID_ПЛАНА"]),
            len(gh_dict["ISU_ID_ПЛАНА"]),
            len(gh_dict["ИМЯ_ПЛАНА"]),
        )
        df = pd.DataFrame.from_dict(gh_dict)
        df.to_csv(filename_csv)
