import datetime
import json
import os

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from dataprocessing.models import User
from streams_app.models import Classroom, BuildingPart, Building
from workprogramsapp.expertise.models import Expertise, UserExpertise
from workprogramsapp.models import DisciplineBlockModule, Department


class Command(BaseCommand):

    def convert_java_datetime(self, string):
        return datetime.datetime.strptime(string, "%Y-%m-%dT%H:%M:%S.%fZ")
    @transaction.atomic
    def handle(self, *args, **options):
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'files/response.json')
        f = open(filename, encoding="utf-8")
        data = json.load(f)
        for class_json in data["list"]:
            # Аудитории
            classroom, created = Classroom.objects.get_or_create(service_id=class_json["id"])
            if created:
                classroom.name = class_json["name"]
                classroom.isu_id = class_json["isuId"]
                classroom.version = class_json["version"]
                classroom.updated_at = self.convert_java_datetime(class_json["updatedAt"])
                classroom.volume = class_json["volume"]
                classroom.is_fake = class_json["isFake"]

            # Часть здания
            building_part_json = class_json["buildingPart"]
            if building_part_json:
                building_part, created = BuildingPart.objects.get_or_create(service_id=building_part_json["id"])

                if created:
                    building_part.address = building_part_json["address"]
                    building_part.version = building_part_json["version"]
                    building_part.updated_at = self.convert_java_datetime(building_part_json["updatedAt"])
                    building_part.isu_id = building_part_json["isuId"]

                    # Здание
                    building_json = building_part_json["building"]
                    if building_json:
                        building, created = Building.objects.get_or_create(service_id=building_json["id"])
                        if created:
                            building.version = building_json["version"]
                            building.updated_at = self.convert_java_datetime(building_json["updatedAt"])
                            building.isu_id = building_json["isuId"]
                            building.name = building_json["name"]
                            building.short_name = building_json["shortName"]
                            building.is_external = building_json["isExternal"]
                        building.save()
                        building_part.building = building

                building_part.save()
                classroom.building_part = building_part

            # Подразделение
            for dep_json in class_json["departments"]:
                try:
                    department = Department.objects.get(mini_titile=dep_json["shortName"])
                except Department.DoesNotExist:
                    continue
                department.service_id = dep_json["id"]
                department.isu_id = dep_json["isuId"]
                department.title_service = dep_json["name"]
                department.activity_type = dep_json["activityType"]
                department.version = dep_json["version"]
                department.updated_at = self.convert_java_datetime(dep_json["updatedAt"])
                department.save()
                classroom.departments.add(department)
            classroom.save()
        print("done")
