from django.contrib.admin import AdminSite
from django.contrib import admin

from workprogramsapp.news.models import NewsArticle


class NewsArticleAdminSite(AdminSite):
    site_header = "Администрирование новостей"
    site_title = "NewsArticle Admin"
    index_title = "Управление новостями"


news_article_admin_site = NewsArticleAdminSite(name='news_article_admin')


class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'notify_all')
    search_fields = ('title', 'text')
    list_filter = ('notify_all',)
    ordering = ('-id',)
    """"""


news_article_admin_site.register(NewsArticle, NewsArticleAdmin)
