from rest_framework.response import Response
from rest_framework.views import APIView

from workprogramsapp.isu_merge.academic_plan_update.academic_plan_update_processor import (
    AcademicPlanUpdateProcessor,
)


class FileUploadAPIView_v2(APIView):
    """API-endpoint для загрузки файла sub_2019_2020_new."""

    def post(self, request):
        updater = AcademicPlanUpdateProcessor()
        updater.update_academic_plans()
        return Response(status=200)
