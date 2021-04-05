from rest_framework import serializers
from workprogramsapp.serializers import FieldOfStudySerializer
from dataprocessing.serializers import ItemSerializer

from .models import Institution, Platform, OnlineCourse, CourseCredit, CourseRequirement, CourseFieldOfStudy, \
    CourseLearningOutcome, CourseWorkProgram


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


class CourseRequirementSerializer(serializers.ModelSerializer):
    """Сериализатор Треований для онлайн курса"""
    course = serializers.SlugRelatedField(slug_field="title", read_only=True)
    item = ItemSerializer(many=True)

    class Meta:
        model = CourseRequirement
        fields = '__all__'


class CourseFieldOfStudySerializer(serializers.ModelSerializer):
    """Сериализатор Направлений и онлайн курсов"""
    course = serializers.SlugRelatedField(slug_field="title", read_only=True)
    field_of_study = FieldOfStudySerializer(many=False)

    class Meta:
        model = CourseFieldOfStudy
        fields = '__all__'


class CourseWorkProgramSerializer(serializers.ModelSerializer):
    """Сериализатор РПД и онлайн курсов"""
    course = serializers.SlugRelatedField(slug_field="title", read_only=True)
    work_program = serializers.SlugRelatedField(slug_field="title", read_only=True)

    class Meta:
        model = CourseWorkProgram
        fields = '__all__'


class CourseLearningOutcomeSerializer(serializers.ModelSerializer):
    """Сериализатор Результатов для онлайн курса"""
    course = serializers.SlugRelatedField(slug_field="title", read_only=True)
    learning_outcome = ItemSerializer(many=True)

    class Meta:
        model = CourseLearningOutcome
        fields = '__all__'


class OnlineCourseSerializer(serializers.ModelSerializer):
    """Сериализатор Онлайн курса"""
    course_learning_outcome = CourseLearningOutcomeSerializer(many=True)
    course_field_of_study = CourseFieldOfStudySerializer(many=True)
    course_requirement = CourseRequirementSerializer(many=True)
    course_credit = CourseCreditSerializer(many=True)
    course_workprogram = CourseWorkProgramSerializer(many=True)
    institution = InstitutionSerializer(many=False)
    platform = PlatformSerializer(many=False)

    class Meta:
        model = OnlineCourse
        fields = '__all__'
