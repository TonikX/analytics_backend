from rest_framework import serializers

from dataprocessing.serializers import userProfileSerializer
from workprogramsapp.educational_program.serializers import EducationalProgramSerializer
from workprogramsapp.expertise.models import UserExpertise, Expertise, ExpertiseComments
from workprogramsapp.serializers import WorkProgramSerializer


class UserExpertiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExpertise
        fields = "__all__"

    def to_representation(self, value):
        self.fields['expert'] = userProfileSerializer(many=False)
        self.fields['expertise'] = ExpertiseSerializer(many=False, read_only=True)

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
        self.fields['work_program'] = WorkProgramSerializer(many=False, read_only=True)
        self.fields['experts'] = userProfileSerializer(many=True, read_only=True)
        return super().to_representation(value)

    class Meta:
        model = Expertise
        fields = "__all__"


class OnlyUserExpertiseSerializer(serializers.ModelSerializer):
    expert = userProfileSerializer(many=False)

    class Meta:
        model = UserExpertise
        fields = ['expert']


class CommentSerializer(serializers.ModelSerializer):
    """
    При отправке комментария автоматически указывает на отправителя
    """
    user_expertise = OnlyUserExpertiseSerializer(many=False, required=False)

    def create(self, validated_data):
        view = self.context.get('view')
        request = self.context.get('request')
        user_expertise = UserExpertise.objects.get(expertise=view.kwargs['pk'], expert=request.user)
        validated_data['user_expertise'] = user_expertise
        exp = ExpertiseComments.objects.create(**validated_data)
        return exp

    class Meta:
        model = ExpertiseComments
        fields = "__all__"
