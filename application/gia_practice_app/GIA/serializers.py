from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from dataprocessing.serializers import userProfileSerializer
from gia_practice_app.GIA.models import CriteriaVKR, GIABaseTemplate, GIA
from gia_practice_app.logic import get_permissions_gia_practice
from workprogramsapp.expertise.models import Expertise, UserExpertise
from workprogramsapp.expertise.serializers import ShortExpertiseSerializer
from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule
from workprogramsapp.serializers import WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer
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
    gia_in_change_block = SerializerMethodField()
    permissions_info = SerializerMethodField()

    def create(self, validated_data):
        request = self.context.get('request')
        editors = validated_data.pop('editors', None)
        gia = GIA.objects.create(**validated_data)
        print(gia)

        if editors:
            gia.editors.set(editors)
            gia.editors.add(request.user)

        if not gia.gia_base:
            gia.gia_base = GIABaseTemplate.objects.create()
            gia.save()
        return gia

    def get_permissions_info(self, instance):
        request = self.context.get("request")
        try:
            exp = Expertise.objects.get(gia=instance)
            user_exp_queryset = UserExpertise.objects.filter(expert=request.user, expertise=exp)
            ue_stuff = user_exp_queryset.filter(stuff_status="EX")
            if ue_stuff.exists():
                user_exp = ue_stuff.first()
            else:
                user_exp = user_exp_queryset.first()
        except Expertise.DoesNotExist:
            exp = None
            user_exp = None
        except UserExpertise.DoesNotExist:
            user_exp = None

        return get_permissions_gia_practice(instance, exp, user_exp, request)

    def get_gia_in_change_block(self, instance):
        return WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(
            instance=WorkProgramChangeInDisciplineBlockModule.objects.filter(gia=instance), many=True).data

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
        self.fields['editors'] = userProfileSerializer(many=True)
        self.fields['gia_in_change_block'] = WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(many=True)
        self.fields['expertise_with_gia'] = ShortExpertiseSerializer(many=True,)
        data = super().to_representation(value)
        if value.discipline_code == None:
            data["can_send_to_isu"] = bool(self.context['request'].user.groups.filter(name="expertise_master"))
        return data

    class Meta:
        model = GIA
        fields = "__all__"


class GIAPrimitiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = GIA
        fields = "__all__"


class GIASmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = GIA
        fields = ['id', 'title']