from rest_framework import serializers

from workprogramsapp.workprogram_additions.Practice.models import PracticeTemplate, Practice
from workprogramsapp.workprogram_additions.models import StructuralUnit


class ShortStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор подразделения разработчика РПД
    """

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class PracticeTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeTemplate
        fields = "__all__"


class PracticeSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        self.fields['practice_base'] = PracticeTemplateSerializer(required=False)
        self.fields['structural_unit'] = ShortStructuralUnitSerializer(required=False)
        return super().to_representation(value)

    class Meta:
        model = Practice
        fields = "__all__"

class PracticePrimitiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practice
        fields = "__all__"
