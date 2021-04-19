from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
# from workprogramsapp.educational_program.serializers import EducationalProgramSerializer
from workprogramsapp.expertise.models import UserExpertise, Expertise, ExpertiseComments
from workprogramsapp.serializers import WorkProgramShortForExperiseSerializer


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
        fields = ['expert', 'stuff_status', 'user_expertise_status', 'expert_result']

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
            }
        for group in request.user.groups.all():
            if group.name == "expertise_master":
                user_statuses["expertise_master"] = True

        return user_statuses

    def create(self, validated_data):
        is_exp_exist = Expertise.objects.filter(work_program=validated_data['work_program'])
        if is_exp_exist:
            print("такая экспертиза уже существует")
            return is_exp_exist[0]
        exp = Expertise.objects.create(**validated_data)
        request = self.context.get('request')
        UserExpertise.objects.create(expertise=exp, expert=request.user, stuff_status="AU")  # ???
        return exp

    def to_representation(self, value):
        self.fields['work_program'] = WorkProgramShortForExperiseSerializer(many=False, read_only=True)
        self.fields['experts'] = userProfileSerializer(many=True, read_only=True)
        self.fields['expertse_users_in_rpd'] = UserExpertiseForExpertiseSerializer(many=True, read_only=True)
        return super().to_representation(value)

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
