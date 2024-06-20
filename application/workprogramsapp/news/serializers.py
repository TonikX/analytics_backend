from rest_framework import serializers

from workprogramsapp.news.models import NewsArticle


class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = ['id', 'title', 'text', 'preview_img', 'author', 'notify_all']