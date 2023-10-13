import datetime
import json
import os

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from dataprocessing.models import User
from streams_app.models import Classroom, BuildingPart, Building, ClassroomGroup
from workprogramsapp.expertise.models import Expertise, UserExpertise
from workprogramsapp.models import DisciplineBlockModule, Department


class Command(BaseCommand):

    def convert_java_datetime(self, string):
        return datetime.datetime.strptime(string, "%Y-%m-%dT%H:%M:%S.%fZ")

    @transaction.atomic
    def handle(self, *args, **options):
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'files/response_group.json')
        f = open(filename, encoding="utf-8")
        data = json.load(f)
        for group_json in data:
            # Аудитории
            group, created = ClassroomGroup.objects.get_or_create(service_id=group_json["id"])
            if created:
                group.name = group_json["name"]
                group.version = group_json["version"]
                group.updated_at = self.convert_java_datetime(group_json["updatedAt"])
            group.save()
            for room_json in group_json["rooms"]:
                room = Classroom.objects.get(service_id=room_json["id"])
                room.group.add(group)
                room.save()
        print("done")
