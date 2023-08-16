from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from dataprocessing.models import Items
from dataprocessing.serializers import ItemSerializer, userProfileSerializer
from gia_practice_app.Practice.models import PracticeTemplate, Practice, PrerequisitesOfPractice, OutcomesOfPractice, \
    ZunPractice
from gia_practice_app.logic import get_permissions_gia_practice
from workprogramsapp.expertise.models import Expertise, UserExpertise
from workprogramsapp.expertise.serializers import ShortExpertiseSerializer
from workprogramsapp.models import WorkProgramChangeInDisciplineBlockModule, Competence, Zun, Indicator, \
    ImplementationAcademicPlan, PracticeInFieldOfStudy, DisciplineBlockModule
from workprogramsapp.serializers import WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer, \
    BibliographicReferenceSerializer, IndicatorSerializer, ImplementationAcademicPlanSerializer, \
    WorkProgramChangeInDisciplineBlockModuleForCompetencesSerializer
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


class ItemInPracticeCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""

    class Meta:
        model = PrerequisitesOfPractice
        fields = ['item', 'practice', 'masterylevel']


class OutcomesInPracticeCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""

    class Meta:
        model = OutcomesOfPractice
        fields = ['item', 'practice', 'masterylevel']


class PrerequisitesOfPracticeSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    """Сериализатор создания пререквизита обучения"""

    class Meta:
        model = PrerequisitesOfPractice
        fields = ['id', 'item', 'masterylevel']


class OutcomesOfPracticeSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    """Сериализатор создания пререквизита обучения"""

    class Meta:
        model = OutcomesOfPractice
        fields = ['id', 'item', 'masterylevel']


class PracticeSerializer(serializers.ModelSerializer):
    practice_in_change_block = SerializerMethodField()
    permissions_info = SerializerMethodField()
    prac_isu_id = SerializerMethodField()

    def create(self, validated_data):
        request = self.context.get('request')
        editors = validated_data.pop('editors', None)
        bibliographic_reference = validated_data.pop('bibliographic_reference', None)
        practice = Practice.objects.create(**validated_data)
        if bibliographic_reference:
            practice.bibliographic_reference.set(bibliographic_reference)
        if editors:
            practice.editors.set(editors)
        practice.editors.add(request.user)

        if not practice.practice_base:
            practice.practice_base = PracticeTemplate.objects.create()
            practice.save()
        return practice

    def get_permissions_info(self, instance):
        request = self.context.get("request")
        try:
            exp = Expertise.objects.get(practice=instance)
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

    def get_practice_in_change_block(self, instance):
        return WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(
            instance=WorkProgramChangeInDisciplineBlockModule.objects.filter(practice=instance), many=True).data

    def get_prac_isu_id(self, instance):
        return instance.discipline_code

    def to_representation(self, value):
        self.fields['bibliographic_reference'] = BibliographicReferenceSerializer(required=False, many=True)
        self.fields['practice_base'] = PracticeTemplateSerializer(required=False)
        self.fields['structural_unit'] = ShortStructuralUnitSerializer(required=False)
        self.fields['prerequisites'] = PrerequisitesOfPracticeSerializer(source='prerequisitesofpractice_set',
                                                                         many=True)
        self.fields['outcomes'] = OutcomesOfPracticeSerializer(source='outcomesofpractice_set',
                                                               many=True)
        self.fields['competences'] = SerializerMethodField()
        self.fields['editors'] = userProfileSerializer(many=True)
        self.fields['practice_in_change_block'] = WorkProgramChangeInDisciplineBlockModuleForWPinFSSerializer(many=True)
        self.fields['expertise_with_practice'] = ShortExpertiseSerializer(many=True,)
        data = super().to_representation(value)
        if value.discipline_code == None:
            data["can_send_to_isu"] = bool(self.context['request'].user.groups.filter(name="expertise_master"))
        return data


    def get_competences(self, instance):
        competences = Competence.objects.filter(
            indicator_in_competencse__zun_practice__practice_in_fs__practice__id=instance.id).distinct()
        competences_dict = []
        for competence in competences:
            zuns = ZunPractice.objects.filter(practice_in_fs__practice__id=instance.id,
                                              indicator_in_zun__competence__id=competence.id)
            zuns_array = []
            for zun in zuns:
                try:
                    indicator = Indicator.objects.get(competence=competence.id,
                                                      zun_practice__id=zun.id)
                    indicator = IndicatorSerializer(indicator).data
                except:
                    indicator = None
                items_array = []
                items = Items.objects.filter(practice_item_in_outcomes__item_in_practice__id=zun.id,
                                             practice_item_in_outcomes__item_in_practice__practice_in_fs__practice__id=instance.id,
                                             practice_item_in_outcomes__item_in_practice__indicator_in_zun__competence__id=competence.id)
                for item in items:
                    items_array.append({"id": item.id, "name": item.name})
                modules = DisciplineBlockModule.objects.filter(
                    change_blocks_of_work_programs_in_modules__zuns_for_cb_for_practice__zun_in_practice__id=zun.id)
                queryset = ImplementationAcademicPlan.get_all_imp_by_modules(modules=modules)
                serializer = ImplementationAcademicPlanSerializer(queryset, many=True)
                zuns_array.append({"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                                   "attainments": zun.attainments, "indicator": indicator,
                                   "items": items_array, "educational_program": serializer.data,
                                   "wp_in_fs": PracticeInFieldOfStudyCreateSerializer(
                                       PracticeInFieldOfStudy.objects.get(zun_in_practice=zun.id)).data["id"]})
            competences_dict.append({"id": competence.id, "name": competence.name, "number": competence.number,
                                     "zuns": zuns_array})
        return competences_dict

    class Meta:
        model = Practice
        fields = "__all__"


class PracticePrimitiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practice
        fields = "__all__"


class ItemInPracticeCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""

    class Meta:
        model = PrerequisitesOfPractice
        fields = ['item', 'practice', 'masterylevel']


class OutcomesInPracticeCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""

    class Meta:
        model = OutcomesOfPractice
        fields = ['item', 'practice', 'masterylevel']


class PracticeInFieldOfStudyCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания пререквизита обучения"""

    class Meta:
        model = PracticeInFieldOfStudy
        fields = "__all__"


class ZunPracticeForManyCreateSerializer(serializers.ModelSerializer):
    """Сериализатор создания нескольких Зунов"""

    # def __init__(self, *args, **kwargs):
    #     many = kwargs.pop('many', True)
    #     super(ZunForManyCreateSerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = ZunPractice
        fields = ['id', 'indicator_in_zun', 'items', 'practice_in_fs', 'knowledge', 'skills', 'attainments']


class PracticeInFieldOfStudyForCompeteceListSerializer(serializers.ModelSerializer):
    """Сериализатор Зунов"""
    work_program_change_in_discipline_block_module = WorkProgramChangeInDisciplineBlockModuleForCompetencesSerializer()

    class Meta:
        model = PracticeInFieldOfStudy
        fields = ['id', 'work_program_change_in_discipline_block_module', 'zun_in_practice']


class PracticeCompetenceSerializer(serializers.ModelSerializer):
    competences = SerializerMethodField()

    def get_competences(self, instance):
        competences = Competence.objects.filter(
            indicator_in_competencse__zun_practice__practice_in_fs__practice__id=instance.id).distinct()
        competences_dict = []
        for competence in competences:
            zuns = ZunPractice.objects.filter(practice_in_fs__practice__id=instance.id,
                                              indicator_in_zun__competence__id=competence.id)
            zuns_array = []
            for zun in zuns:
                try:
                    indicator = Indicator.objects.get(competence=competence.id,
                                                      zun_practice__id=zun.id)
                    indicator = IndicatorSerializer(indicator).data
                except:
                    indicator = None
                # indicators_array = []
                # for indicator in indicators:
                #     indicators_array.append({"id": indicator.id, "name": indicator.name, "number": indicator.number})
                items_array = []
                items = Items.objects.filter(practice_item_in_outcomes__item_in_practice__id=zun.id,
                                             practice_item_in_outcomes__item_in_practice__practice_in_fs__practice__id=instance.id,
                                             practice_item_in_outcomes__item_in_practice__indicator_in_zun__competence__id=competence.id)
                for item in items:
                    items_array.append({"id": item.id, "name": item.name})
                # serializer = WorkProgramInFieldOfStudySerializerForCb(WorkProgramInFieldOfStudy.objects.get(zun_in_wp = zun.id))
                queryset = ImplementationAcademicPlan.objects.filter(
                    academic_plan__discipline_blocks_in_academic_plan__modules_in_discipline_block__change_blocks_of_work_programs_in_modules__zuns_for_cb_for_practice__zun_in_practice__id=zun.id)
                serializer = ImplementationAcademicPlanSerializer(queryset, many=True)
                zuns_array.append({"id": zun.id, "knowledge": zun.knowledge, "skills": zun.skills,
                                   "attainments": zun.attainments, "indicator": indicator,
                                   "items": items_array, "educational_program": serializer.data,
                                   "wp_in_fs": PracticeInFieldOfStudyCreateSerializer(
                                       PracticeInFieldOfStudy.objects.get(zun_in_practice=zun.id)).data["id"]})
            competences_dict.append({"id": competence.id, "name": competence.name, "number": competence.number,
                                     "zuns": zuns_array})
        return competences_dict

    class Meta:
        model = Practice
        fields = ['id', 'title', 'competences']
