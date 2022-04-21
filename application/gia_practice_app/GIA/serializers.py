from rest_framework import serializers

from gia_practice_app.GIA.models import CriteriaVKR, GIABaseTemplate, GIA
from workprogramsapp.workprogram_additions.models import StructuralUnit


class ShortStructuralUnitSerializer(serializers.ModelSerializer):
    """
    Cериализатор подразделения разработчика РПД
    """

    class Meta:
        model = StructuralUnit
        fields = "__all__"


class CriteriaVKRSerializer(serializers.ModelSerializer):
    class Meta:
        model = CriteriaVKR
        fields = "__all__"


class GIABaseTemplateSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        self.fields['professional_problems_marks'] = CriteriaVKRSerializer(required=False)
        return super().to_representation(value)

    class Meta:
        model = GIABaseTemplate
        fields = "__all__"


class GIASerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        self.fields['structural_unit'] = ShortStructuralUnitSerializer(required=False)
        self.fields['content_correspondence_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['relevance_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['specialization_correspondence_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['correctness_of_methods_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['quality_and_logic_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['validity_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['significance_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['implementation_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['report_quality_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['presentation_quality_marks'] = CriteriaVKRSerializer(required=False)
        self.fields['answers_quality_marks'] = CriteriaVKRSerializer(required=False)
        return super().to_representation(value)

    class Meta:
        model = GIA
        fields = "__all__"


class GIAPrimitiveSerializer(serializers.ModelSerializer):

    class Meta:
        model = GIA
        fields = "__all__"


