from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from workprogramsapp.news.models import NewsArticle
from workprogramsapp.news.serializers import NewsArticleSerializer


class NewsArticleListView(generics.ListAPIView):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        request.user.unread_news = 0
        request.user.save()
        return self.list(request, *args, **kwargs)


class NewsArticleRetrieveView(generics.RetrieveAPIView):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    permission_classes = [IsAuthenticated]
