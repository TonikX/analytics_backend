from rest_framework import serializers

from workprogramsapp.serializers import ImplementationAcademicPlanSerializer
from .models import ValidationRunResult, AcademicPlanValidationResult

class ValidationRunResultSerializer(serializers.ModelSerializer):
    """
        Сериализатор запуска валидации
    """

    class Meta:
        model = ValidationRunResult
        fields = "__all__"


class AcademicPlanValidationResultSerializer(serializers.ModelSerializer):
    """
        Сериализатор результата валидации учебного плана
    """
    implementation_of_academic_plan = ImplementationAcademicPlanSerializer()
    class Meta:
        model = AcademicPlanValidationResult
        fields = '__all__'
