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


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class ItemSerializer(serializers.ModelSerializer):
    """Сериализатор Ключевого слова"""
     
    class Meta:
        model = Items
        fields = ('id','name','domain','value',)
        depth = 1

    
class ItemWithRelationSerializer(serializers.ModelSerializer):
    """Сериализатор Ключевого слова"""
    #relation_with_item = RecursiveField(many=True)
    relation_with_item = serializers.SerializerMethodField()
    
    class Meta:
        model = Items
        fields = ('id','name','domain','value','relation_with_item',)
        depth = 1

    def get_relation_with_item(self, obj):
        "obj is a Items instance. Returns list of dicts"""
        qset = Relation.objects.filter(item1=obj)
        return [RelationInSerializer(i).data for i in qset]


class RelationInSerializer(serializers.ModelSerializer):
    """Сериализатор для создания связей"""
    
    def to_representation(self,obj):  
        rep= super(RelationInSerializer,self).to_representation(obj)  
        rep['items']= [ ItemCreateSerializer(relation.item2).data for relation in Relation.objects.filter(item1 = obj.item1, relation=obj.relation).distinct()]  
        return rep  
    
    class Meta:
        model = Relation
        fields = ('relation',)


class RelationSerializer(serializers.ModelSerializer):
    """Сериализатор для создания связей"""
    item1 = ItemCreateSerializer()
    item2 = ItemCreateSerializer()
    class Meta:
        model = Relation
        fields = ('item1','relation','item2', 'count')


class RelationUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор для обновления связей"""

    class Meta:
        model = Relation
        fields = ('item1','relation','item2', 'count')


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField(use_url=False)






