import pandas as pd
import json
import re
import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response

from workprogramsapp.models import WorkProgramIdStrUpForIsu, FieldOfStudy, WorkProgram, AcademicPlan, \
    ImplementationAcademicPlan, DisciplineBlock, DisciplineBlockModule, WorkProgramChangeInDisciplineBlockModule, \
    WorkProgramInFieldOfStudy, Zun
from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_processor import AcademicPlanUpdateProcessor
import time


class FileUploadAPIView_v2(APIView):
    """
    API-endpoint для загрузки файла sub_2019_2020_new
    """

    def post(self, request):
        updater = AcademicPlanUpdateProcessor()
        updater.update_academic_plans()
        return Response(status=200)
