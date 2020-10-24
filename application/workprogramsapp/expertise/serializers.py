from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
#from workprogramsapp.educational_program.serializers import EducationalProgramSerializer
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

    def create(self, validated_data):
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
