from rest_framework import serializers
from rest_framework.fields import BooleanField

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.serializers import ImplementationAcademicPlanSerializer


class EducationalProgramSerializerWithNum(serializers.ModelSerializer):
    """Сериализатор образовательной программы."""

    manager = userProfileSerializer()
    academic_plan_for_ep = ImplementationAcademicPlanSerializer()
    can_edit = BooleanField(read_only=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            data["can_edit"] = self.context["request"].user == instance.manager or bool(
                self.context["request"].user.groups.filter(
                    name="education_plan_developer"
                )
            )
        except KeyError:
            data["can_edit"] = False
        return data
