# Библиотеки для сариализации
from rest_framework import serializers

from workprogramsapp.models import BibliographicReference, WorkProgram


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


class BibliographicReferenceCreateWithWpSerializer(BibliographicReferenceDetailSerializer):
    wp_id = serializers.IntegerField(required=True, write_only=True)

    def create(self, validated_data):
        wp_id = validated_data.pop("wp_id")
        work_program = WorkProgram.objects.get(id=wp_id)
        try:
            bib_ref = BibliographicReference.objects.get(accession_number=validated_data["accession_number"])
        except BibliographicReference.DoesNotExist:
            bib_ref = BibliographicReference.objects.create(**validated_data)
        work_program.bibliographic_reference.add(bib_ref)
        return bib_ref
