from rest_framework import serializers, viewsets

from .models import User, Items, Domain, Relation, Connection

class userProfileSerializer(serializers.ModelSerializer):
    """Сериализатор для работы с акканутами"""
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    """Сериализатор Ключевого слова"""
    class Meta:
        model = Items
        fields = ('name','domain')


class DomainSerializer(serializers.ModelSerializer):
    """Сериализатор для предметной области"""
 
    class Meta:
        model = Domain
        fields = ('name','user')


class ConnectionSerializer(serializers.ModelSerializer):
    """Сериализатор для связей"""
    #def to_representation(self, value):
    #     return value.items.name
    items = ItemSerializer()

    class Meta:
        model = Connection
        fields = ('relation','items','count')


class RelationCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания связей"""
    
    class Meta:
        model = Relation
        fields = ('item1','relation','item2') 

class RelationSerializer(serializers.ModelSerializer):
    item2 = ConnectionSerializer(source = 'connection_set', many=True)
    item1 = ItemSerializer()

    class Meta:
        model = Relation
        fields = ('item1','relation','item2') 

'''
class RelationWithItemSerializer(serializers.ModelSerializer):
    """Сериализатор для связей"""
    item2 = ConnectionSerializer(source = 'connection_set',many=True)
    item = serializers.CharField(source='item1')
    class Meta:
        model = Relation
        fields = ('id','item','relation','item2') 

'''
'''
class RelationSerializer(serializers.ModelSerializer):
    """Сериализатор cоздания связей"""
    item = serializers.CharField(source='item1')
    item2 = ConnectionSerializer(many=True)
    class Meta:
        model = Relation
        fields = ('item','relation','item2') 
'''





