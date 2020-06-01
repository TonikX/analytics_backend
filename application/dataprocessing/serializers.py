from rest_framework import serializers, viewsets

from .models import User, Items, Domain, Relation

class userProfileSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с акканутами"""
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class DomainSerializer(serializers.ModelSerializer):
    """Сериализатор для предметной области"""
 
    class Meta:
        model = Domain
        fields = ('id', 'name','user')


class ItemCreateSerializer(serializers.ModelSerializer):
    """Сериализатор Ключевого слова"""
    class Meta:
        model = Items
        fields = ('id','name','domain')

class RelationInItemsSerializer(serializers.ModelSerializer):
    """Сериализатор для отоброжения связей в таблице сущностей"""
    item2 = ItemCreateSerializer()

    class Meta:
        model = Relation
        fields = ('id','relation','item2', 'count') 

class ItemSerializer(serializers.ModelSerializer):
    """Сериализатор Ключевого слова"""
    relation_with_item = RelationInItemsSerializer(many=True)

    class Meta:
        model = Items
        fields = ('id','name','domain','value','relation_with_item')

        
class RelationSerializer(serializers.ModelSerializer):
    """Сериализатор для создания связей"""
    item1 = ItemCreateSerializer()
    item2 = ItemCreateSerializer()
    class Meta:
        model = Relation
        fields = ('item1','relation','item2', 'count') 


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField(use_url=False)






