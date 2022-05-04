from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from gia_practice_app.Practice.models import PracticeTemplate, Practice
from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule
from workprogramsapp.serializers import WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer, \
    BibliographicReferenceSerializer
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
    practice_in_change_block = SerializerMethodField()

    def get_practice_in_change_block(self, instance):
        return WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(
            instance=WorkProgramChangeInDisciplineBlockModule.objects.filter(practice=instance), many=True).data

    def to_representation(self, value):
        self.fields['bibliographic_reference'] = BibliographicReferenceSerializer(required=False, many=True)
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
