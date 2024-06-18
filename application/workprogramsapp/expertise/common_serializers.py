from rest_framework import serializers
from workprogramsapp.expertise.models import Expertise


class ShortExpertiseSerializer(serializers.ModelSerializer):
    """
    Короткий вывод информации об экспертизе
    """

    class Meta:
        model = Expertise
        ref_name = "ShortExpertiseSerializerCommon"
        fields = ['id', 'expertse_users_in_rpd', 'expertise_status']
