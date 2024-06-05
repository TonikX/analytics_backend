from rest_framework import serializers

from workprogramsapp.educational_program.educational_standart.models import (
    EducationalStandard,
    TasksForEducationalStandard,
)
from workprogramsapp.educational_program.general_prof_competencies.serializers import (
    GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer,
)
from workprogramsapp.educational_program.key_competences.serializers import (
    GroupOfKeyCompetencesInGeneralCharacteristicSerializer,
)
from workprogramsapp.educational_program.over_professional_competencies.serializers import (
    GroupOfOverProfCompetencesInGeneralCharacteristicSerializer,
)


class TasksForEducationalStandardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TasksForEducationalStandard
        fields = "__all__"


class EducationalStandardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalStandard
        fields = ["id", "name", "standard_date"]


class EducationalStandardSingleObjectSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        self.fields["tasks_prof_standard"] = TasksForEducationalStandardSerializer(
            many=True, required=False
        )
        self.fields["group_of_over_prof_competences"] = (
            GroupOfOverProfCompetencesInGeneralCharacteristicSerializer(
                many=True, read_only=True
            )
        )
        self.fields["group_of_key_competences"] = (
            GroupOfKeyCompetencesInGeneralCharacteristicSerializer(
                many=True, read_only=True
            )
        )
        self.fields["group_of_general_prof_competences"] = (
            GroupOfGeneralProfCompetencesInGeneralCharacteristicSerializer(
                many=True, read_only=True
            )
        )

        return super().to_representation(value)

    class Meta:
        model = EducationalStandard
        fields = [
            "id",
            "name",
            "standard_date",
            "group_of_over_prof_competences",
            "group_of_key_competences",
            "group_of_general_prof_competences",
            "tasks_prof_standard",
        ]
