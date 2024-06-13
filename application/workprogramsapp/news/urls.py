from django.urls import path

from workprogramsapp.news.admin_site import news_article_admin_site
from workprogramsapp.news.view import NewsArticleRetrieveView, NewsArticleListView

urlpatterns = [
    path('api/news-articles/', NewsArticleListView.as_view(), name='news-article-list-create'),
    path('api/news-articles/<int:pk>/', NewsArticleRetrieveView.as_view(), name='news-article-detail'),
    path('news-admin/', news_article_admin_site.urls)
]