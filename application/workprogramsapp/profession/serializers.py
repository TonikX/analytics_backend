from rest_framework import serializers

from dataprocessing.models import Items
from dataprocessing.serializers import ItemSerializer
from workprogramsapp.models import Profession, SkillsOfProfession, Role, SkillsOfRole


class SkillsOfProfessionInProfessionSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с навыками профессии."""

    item = ItemSerializer()

    class Meta:
        model = SkillsOfProfession
        fields = ["id", "item", "masterylevel"]


class SkillsOfProfessionInProfessionCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с навыками профессии."""

    class Meta:
        model = SkillsOfProfession
        fields = ["id", "item", "masterylevel", "profession"]


class SkillsOfRoleInRoleSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с навыками роли."""

    item = ItemSerializer()

    class Meta:
        model = SkillsOfRole
        fields = ["id", "item", "masterylevel"]


class SkillsOfRoleInRoleCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с навыками роли."""

    class Meta:
        model = SkillsOfRole
        fields = ["id", "item", "masterylevel", "role"]


class ProfessionSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ."""

    skills = SkillsOfProfessionInProfessionSerializer(
        source="skillsofprofession_set", many=True
    )

    class Meta:
        model = Profession
        fields = "__all__"


class ProfessionCreateSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ."""

    class Meta:
        model = Profession
        fields = ["id", "title"]


class RoleSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ."""

    skills = SkillsOfRoleInRoleCreateSerializer(source="skillsofrole_set", many=True)

    class Meta:
        model = Role
        fields = "__all__"


class RoleCreateSerializer(serializers.ModelSerializer):
    """Сериализатор рабочих программ."""

    class Meta:
        model = Role
        fields = ["id", "title"]


class ItemWithProfessionsSerializer(serializers.ModelSerializer):
    """Сериализатор Ключевого слова."""

    profession_skils = ProfessionCreateSerializer(many=True)

    class Meta:
        model = Items
        fields = ("id", "name", "domain", "value", "profession_skils")


class ItemWithRolesSerializer(serializers.ModelSerializer):
    """Сериализатор Ключевого слова."""

    role_skils = RoleCreateSerializer(many=True)

    class Meta:
        model = Items
        fields = ("id", "name", "domain", "value", "role_skils")
