from rest_framework import serializers

from dataprocessing.models import User
from dataprocessing.serializers import userProfileSerializer
# from workprogramsapp.educational_program.serializers import EducationalProgramSerializer
from gia_practice_app.GIA.models import GIA
from gia_practice_app.Practice.models import Practice
from workprogramsapp.expertise.models import UserExpertise, Expertise, ExpertiseComments
from workprogramsapp.models import WorkProgram
from workprogramsapp.workprogram_additions.serializers import ShortStructuralUnitSerializer


class UserExpertiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExpertise
        fields = "__all__"

    def to_representation(self, value):
        self.fields['expert'] = userProfileSerializer(many=False)
        self.fields['expertise'] = ExpertiseSerializer(many=False, read_only=True)

        return super().to_representation(value)


class UserExpertiseForExpertiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExpertise
        fields = ['id', 'expert', 'stuff_status', 'user_expertise_status', 'expert_result']

    def to_representation(self, value):
        self.fields['expert'] = userProfileSerializer(many=False)

        return super().to_representation(value)


class ExpertiseSerializer(serializers.ModelSerializer):
    """
    Автоматически добавляет пользователя-создателя как лидера экспертизы
    """
    user_status_in_expertise = serializers.SerializerMethodField()

    def get_user_status_in_expertise(self, instance):
        request = self.context.get("request")
        user_statuses = \
            {
                "expertise_master": False,
                "expertise_member": bool(UserExpertise.objects.filter(
                    expert=request.user, expertise_id=instance.id,
                    stuff_status="EX")),
                "structural_leader": bool(Expertise.objects.filter(
                    pk=instance.id,
                    work_program__structural_unit__user_in_structural_unit__user=request.user,
                    work_program__structural_unit__user_in_structural_unit__status__in=["leader", "deputy"]).distinct())
                    or bool(Expertise.objects.filter(
                    pk=instance.id,
                    gia__structural_unit__user_in_structural_unit__user=request.user,
                    gia__structural_unit__user_in_structural_unit__status__in=["leader", "deputy"]).distinct())
                    or bool(Expertise.objects.filter(
                    pk=instance.id,
                    practice__structural_unit__user_in_structural_unit__user=request.user,
                    practice__structural_unit__user_in_structural_unit__status__in=["leader", "deputy"]).distinct())
            }
        for group in request.user.groups.all():
            if group.name == "expertise_master":
                user_statuses["expertise_master"] = True

        return user_statuses

    def create(self, validated_data):
        try:
            exp_type = validated_data['expertise_type']
        except KeyError:
            exp_type=None
        if not exp_type or exp_type == "WP":
            is_exp_exist = Expertise.objects.filter(work_program=validated_data['work_program'])
        elif exp_type == "GIA":
            is_exp_exist = Expertise.objects.filter(gia=validated_data['gia'])
        elif exp_type == "PRAC":
            is_exp_exist = Expertise.objects.filter(practice=validated_data['practice'])

        request = self.context.get('request')
        if is_exp_exist:
            is_exp_exist[0].expertise_status = "EX"
            is_exp_exist[0].save()
            counter = is_exp_exist[0].expertise_counter
            if not counter:
                counter=0
            is_exp_exist.update(expertise_counter=counter + 1)
            all_user_expertise = UserExpertise.objects.filter(expertise=is_exp_exist[0])
            all_user_expertise.update(user_expertise_status=None)
            print("такая экспертиза уже существует")
            return is_exp_exist[0]
        exp = Expertise.objects.create(**validated_data)
        UserExpertise.objects.create(expertise=exp, expert=request.user, stuff_status="SE")  # ???

        # Автодобавление экспертов
        if not exp_type or exp_type == "WP":
            try:
                expert = User.objects.get(
                    experts_with_units__structural_units__workprogram_in_structural_unit=validated_data['work_program'])
                UserExpertise.objects.create(expertise=exp, expert=expert, stuff_status="EX")
            except User.DoesNotExist:
                pass

        if not exp_type or exp_type == "WP":
            editors = WorkProgram.objects.get(pk=validated_data['work_program'].pk).editors.all()
        elif exp_type == "GIA":
            editors = GIA.objects.get(pk=validated_data['gia'].pk).editors.all()
        elif exp_type == "PRAC":
            editors = Practice.objects.get(pk=validated_data['practice'].pk).editors.all()

        for editor in editors:
            if editor.pk != request.user.pk:
                UserExpertise.objects.create(expertise=exp, expert=editor, stuff_status="ED")
        return exp

    def to_representation(self, value):
        self.fields['work_program'] = WorkProgramShortForExperiseSerializerWithStructUnitWithEditors(many=False,
                                                                                                     read_only=True)
        self.fields['practice'] = PracticeShortForExpertiseSerializerWithStructUnitWithEditors(many=False,
                                                                                               read_only=True)
        self.fields['gia'] = GIAShortForExpertiseSerializerWithStructUnitWithEditors(many=False,
                                                                                     read_only=True)
        self.fields['experts'] = serializers.SerializerMethodField()
        self.fields['expertse_users_in_rpd'] = UserExpertiseForExpertiseSerializer(many=True, read_only=True)
        return super().to_representation(value)

    def get_experts(self, instance):
        experts_instances = instance.experts.filter()
        return userProfileSerializer(experts_instances, many=True).data

    class Meta:
        model = Expertise
        fields = "__all__"


# class ExpertiseWithUsersStatusSerializer(serializers.ModelSerializer):
#     """
#     Автоматически добавляет пользователя-создателя как лидера экспертизы
#     """
#     work_program = WorkProgramShortForExperiseSerializer(many=False, read_only=True)
#     expertse_users_in_rpd = UserExpertiseForExpertiseSerializer(many=True, read_only=True)
#
#
#     class Meta:
#         model = Expertise
#         fields = ['work_program', 'expertse_users_in_rpdd']


class CommentSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        self.fields['user_expertise'] = OnlyUserExpertiseSerializer(many=False, read_only=True)
        return super().to_representation(value)

    class Meta:
        model = ExpertiseComments
        fields = "__all__"


class OnlyUserExpertiseSerializer(serializers.ModelSerializer):
    expert = userProfileSerializer(many=False)

    class Meta:
        model = UserExpertise
        fields = ['expert']


class WorkProgramShortForExperiseSerializerWithStructUnit(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    structural_unit = ShortStructuralUnitSerializer(many=False)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code', 'qualification', 'prerequisites', 'outcomes', 'structural_unit']


class WorkProgramShortForExperiseSerializerWithStructUnitWithEditors(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    structural_unit = ShortStructuralUnitSerializer(many=False)
    editors = userProfileSerializer(many=True)

    class Meta:
        model = WorkProgram
        fields = ['id', 'title', 'discipline_code', 'qualification', 'prerequisites', 'outcomes', 'structural_unit',
                  'editors']


class PracticeShortForExpertiseSerializerWithStructUnitWithEditors(serializers.ModelSerializer):
    """Сериализатор практик"""
    structural_unit = ShortStructuralUnitSerializer(many=False)
    editors = userProfileSerializer(many=True)

    class Meta:
        model = Practice
        fields = ['id', 'title', 'discipline_code', 'structural_unit', 'editors']


class GIAShortForExpertiseSerializerWithStructUnitWithEditors(serializers.ModelSerializer):
    """Сериализатор практик"""
    structural_unit = ShortStructuralUnitSerializer(many=False)
    editors = userProfileSerializer(many=True)

    class Meta:
        model = GIA
        fields = ['id', 'title', 'discipline_code', 'structural_unit', 'editors']


class ShortExpertiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expertise
        fields = "__all__"


class CommentSerializerFull(serializers.ModelSerializer):
    """
    Сериализатор для notifications\serializers.py  ExpertiseCommentsNotificationSerializer
    """
    expertise = serializers.SerializerMethodField()

    def get_expertise(self, instance):
        return ShortExpertiseSerializer(
            instance=Expertise.objects.get(expertse_users_in_rpd__user_expertise_comment=instance)).data

    def to_representation(self, value):
        self.fields['user_expertise'] = UserExpertiseForExpertiseSerializer(many=False, read_only=True)

        return super().to_representation(value)

    class Meta:
        model = ExpertiseComments
        fields = "__all__"
