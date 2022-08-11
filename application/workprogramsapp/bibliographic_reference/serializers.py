# Библиотеки для сариализации
from rest_framework import serializers

from workprogramsapp.models import BibliographicReference


# Модели данных
# Сериализаторы


class BibliographicReferenceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BibliographicReference
        fields = ["id", "accession_number", "title", "authors", "bib_reference", "description"]


class BibliographicReferenceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BibliographicReference
        fields = "__all__"
