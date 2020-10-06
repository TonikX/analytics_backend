# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных

from workprogramsapp.models import Profession, SkillsOfProfession

# Другие сериализаторы

from dataprocessing.serializers import ItemSerializer


class SkillsOfProfessionInProfessionSerializer(serializers.ModelSerializer):
    """Сериализатор вывода пререквизита обучения для вывода пререквизита в рабочей программе"""
    item  = ItemSerializer()
    class Meta:
        model = SkillsOfProfession
        fields = ['id', 'item', 'masterylevel']


class ProfessionSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ"""
    skills = SkillsOfProfessionInProfessionSerializer(source='profession_skils', many=True)

    class Meta:
        model = Profession
        fields = "__all__"

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Profession.objects.create(**validated_data)
