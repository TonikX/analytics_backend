from rest_framework import serializers
from workprogramsapp.expertise.models import Expertise


class ShortExpertiseSerializer(serializers.ModelSerializer):
    """
    Короткий вывод информации об экспертизе
    """

    class Meta:
        model = Expertise
        fields = ['id', 'expertse_users_in_rpd', 'expertise_status']
