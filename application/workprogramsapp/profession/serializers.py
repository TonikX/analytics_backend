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
    prerequisites = SkillsOfProfessionInProfessionSerializer(source='profession_skils', many=True)

    class Meta:
        model = Profession
        fields = ['id', 'approval_date', 'authors', 'discipline_code', 'qualification', 'prerequisites', 'outcomes', 'title', 'hoursFirstSemester', 'hoursSecondSemester', 'discipline_sections','discipline_certification', 'bibliographic_reference', 'description', 'video', 'work_program_in_change_block']

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Profession.objects.create(**validated_data)
