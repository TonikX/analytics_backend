from rest_framework import serializers

from dataprocessing.serializers import ItemSerializer
from selection_of_keywords_for_rpd.models import RecommendationOfPrerequisitesFoUser


class RecommendationOfPrerequisitesFoUserSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = RecommendationOfPrerequisitesFoUser
        fields = ['id', 'item']