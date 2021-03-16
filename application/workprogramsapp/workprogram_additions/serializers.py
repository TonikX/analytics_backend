# Библиотеки для сариализации
from rest_framework import serializers, viewsets

# Модели данных
from .models import AdditionalMaterial

# Другие сериализаторы


"""
Материалы тем
"""

class AdditionalMaterialSerializer(serializers.ModelSerializer):
    """
    Дополнительный материал в теме РПД
    """


    class Meta:
        model = AdditionalMaterial
        fields = "__all__"


class CreateAdditionalMaterialSerializer(serializers.ModelSerializer):
    """
    Дополнительный материал в теме РПД
    """

    class Meta:
        model = AdditionalMaterial
        fields = "__all__"



