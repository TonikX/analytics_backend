from django.http import FileResponse
from django.shortcuts import redirect
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import ValidationRunResult, AcademicPlanValidationResult
from .serializers import ValidationRunResultSerializer, AcademicPlanValidationResultSerializer
from .validator_constructor import ValidatorConstructorPlans
from .validator_isu_old_plans import ValidatorISUOldPlans
from .validator_isu_new_plans import ValidatorISUNewPlans
import shutil


class ConstructorValidatorView(ListAPIView):

    def get(self, request, **kwargs):
        validator = ValidatorConstructorPlans()
        validation_result = validator.validate(kwargs['pk'])
        return Response(validation_result)


class ISUValidatorView(ListAPIView):

    def get(self, request, **kwargs):
        validator_old = ValidatorISUOldPlans()
        validator_new = ValidatorISUNewPlans()
        validation_run_result = ValidationRunResult.objects.create(plans_count=len(validator_new.ids) + len(validator_old.ids), invalid_plans_count=0)

        validator_old.process(validation_run_result)
        validator_new.process(validation_run_result)
        archive = open(shutil.make_archive("report", "zip", "report"), 'rb')

        response = FileResponse(archive)
        return response


class ValidationRunResultView(ListAPIView):
    serializer_class = ValidationRunResultSerializer

    def get_queryset(self):
        return ValidationRunResult.objects.all().order_by('-id')[:10][::-1]


class AcademicPlanValidationResultView(ListAPIView):
    serializer_class = AcademicPlanValidationResultSerializer

    def get_queryset(self):
        validation_run_result = ValidationRunResult.objects.get(id=self.kwargs['pk'])
        results = AcademicPlanValidationResult.objects.filter(validation_run_result=validation_run_result)
        return results
