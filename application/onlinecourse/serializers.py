from rest_framework import serializers
from workprogramsapp.serializers import FieldOfStudySerializer

from .models import Institution, Platform, OnlineCourse, CourseCredit, CourseFieldOfStudy


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
    field_of_study = FieldOfStudySerializer(many=False)

    class Meta:
        model = CourseCredit
        fields = '__all__'


class CourseFieldOfStudySerializer(serializers.ModelSerializer):
    """Сериализатор Направлений и онлайн курсов"""
    course = serializers.SlugRelatedField(slug_field="title", read_only=True)
    field_of_study = FieldOfStudySerializer(many=False)

    class Meta:
        model = CourseFieldOfStudy
        fields = '__all__'


class OnlineCourseSerializer(serializers.ModelSerializer):
    """Сериализатор Онлайн курса"""
    course_field_of_study = CourseFieldOfStudySerializer(many=True)
    course_credit = CourseCreditSerializer(many=True)
    institution = InstitutionSerializer(many=False)
    platform = PlatformSerializer(many=False)

    class Meta:
        model = OnlineCourse
        fields = '__all__'
