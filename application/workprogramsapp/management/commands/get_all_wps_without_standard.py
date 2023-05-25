import json
import os
from django.core.management.base import BaseCommand
from django.db import transaction
from django.db.models import Model, Q

from analytics_project import settings
from gia_practice_app.Practice.models import Practice
from workprogramsapp.isu_merge.academic_plan_update.isu_service import IsuService, IsuUser
from workprogramsapp.isu_merge.post_to_isu.updaters_isu_logic import post_practice_to_isu, post_wp_to_isu
from workprogramsapp.models import WorkProgram, Competence, Zun, DisciplineBlockModule


class Command(BaseCommand):
    def handle(self, *args, **options):
        wp_list = []
        dirname = os.path.dirname(__file__)
        key_filter = Q(group_key__group_of_pk__educational_standard__isnull=True)
        over_filter = Q(group_over__group_of_pk__educational_standard__isnull=True)
        general_filter = Q(
            group_general__group_of_pk__educational_standard__isnull=True)
        competences_to_delete = Competence.objects.filter(key_filter & over_filter & general_filter).exclude(
            number__icontains="ПК")
        zuns_without_standard = Zun.objects.filter(indicator_in_zun__competence__in=competences_to_delete)
        for wp in WorkProgram.objects.filter(zuns_for_wp__zun_in_wp__in=zuns_without_standard):
            wp_dict = {"id": wp.id, "title": wp.title, "url": "https://op.itmo.ru/work-program/" + str(wp.id),
                       "modules": [], "structural_unit": wp.structural_unit.title}
            for module in DisciplineBlockModule.objects.filter(
                    change_blocks_of_work_programs_in_modules__work_program=wp):
                wp_dict["modules"].append({"id": module.id, "title": module.name})
            wp_list.append(wp_dict)

        filename = os.path.join(dirname, 'files/wp_without_standards.json')
        f2 = open(filename, "w", encoding="utf-8")
        f2.write(str(wp_list))
        f2.close()
