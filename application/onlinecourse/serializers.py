from rest_framework import serializers

from .models import Institution, Platform, OnlineCourse
from dataprocessing.models import Items
from workprogramsapp.models import (
    CourseCredit,
    CourseFieldOfStudy,
    DisciplineSection,
    FieldOfStudy,
    Topic,
    WorkProgram,
)


class FieldOfStudySerializer2(serializers.ModelSerializer):
    """
        Сериализатор образовательных программ (направлений)
    """
    class Meta:
        model = FieldOfStudy
        fields = "__all__"


class InstitutionSerializer(serializers.ModelSerializer):
    """Сериализатор Правообладателей"""
    class Meta:
        model = Institution
        fields = '__all__'


class PlatformSerializer(serializers.ModelSerializer):
    """Сериализатор Платформ"""
    class Meta:
        model = Platform
        fields = '__all__'


class CourseCreditSerializer(serializers.ModelSerializer):
    """Сериализатор Перезачетов"""
    course = serializers.SlugRelatedField(slug_field="title", read_only=True)
    institution = InstitutionSerializer()
    field_of_study = FieldOfStudySerializer2(many=False)

    class Meta:
        model = CourseCredit
        fields = '__all__'


class CourseFieldOfStudySerializer(serializers.ModelSerializer):
    """Сериализатор Направлений и онлайн курсов"""
    course = serializers.SlugRelatedField(slug_field="title", read_only=True)
    field_of_study = FieldOfStudySerializer2(many=False)

    class Meta:
        model = CourseFieldOfStudy
        fields = '__all__'


class ItemsForOnlineCourseSerializer(serializers.ModelSerializer):
    """Сериализатор результатов прохождения онлайн курсов"""
    class Meta:
        model = Items
        fields = ['id', 'name']


class OnlineCourseInWorkProgram(serializers.ModelSerializer):
    """Сериализатор для отображения рабочих программ, которые относятся к разделам дисциплин, к которым относятся темы,
    к которым относится курс"""
    class Meta:
        model = WorkProgram
        fields = '__all__'


class OnlineCourseInDisciplineSection(serializers.ModelSerializer):
    """Сериализатор для отображения разделов дисциплин, к которым относятся темы, к которым относится курс"""
    work_program = OnlineCourseInWorkProgram(many=False)

    class Meta:
        model = DisciplineSection
        fields = '__all__'


class OnlineCourseInTopics(serializers.ModelSerializer):
    """Сериализатор для отображения тем, к которым относится курс"""
    discipline_section = OnlineCourseInDisciplineSection(many=False)

    class Meta:
        model = Topic
        fields = '__all__'


class OnlineCourseSerializer(serializers.ModelSerializer):
    """Сериализатор Онлайн курса"""
    course_field_of_study = CourseFieldOfStudySerializer(many=True)
    course_credit = CourseCreditSerializer(many=True)
    institution = InstitutionSerializer(many=False)
    platform = PlatformSerializer(many=False)
    learning_outcome_list = ItemsForOnlineCourseSerializer(many=True)
    topic_with_online_course = OnlineCourseInTopics(many=True)

    class Meta:
        model = OnlineCourse
        fields = '__all__'
