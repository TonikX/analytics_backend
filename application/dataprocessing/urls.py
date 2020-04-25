from django.conf.urls import url
from . import views
# from django.contrib.auth.views import (
#     login, logout, password_reset, password_reset_done, password_reset_confirm,
#     password_reset_complete )
from django.conf import settings

urlpatterns = [
    url(r'^$', views.index, name = 'index'),
    # url(r'^register/$', views.register, name='register'),
    # url(r'^web_login/$', login, {'template_name': 'accounts/login.html'}, name='web_login'),
    # url(r'^web_logout/$', logout, {'next_page': settings.LOGOUT_REDIRECT_URL}, name='web_logout'),
    # #url(r'^profile/edit/$', views.edit_profile, name='edit_profile'),
    # url(r'^change-password/$', views.change_password, name='change_password'),
    # url(r'^reset-password/$', password_reset, {'template_name': 'accounts/reset_password.html',
    #                                            'post_reset_redirect': 'accounts/password_reset_done.html',
    #                                            'email_template_name': 'accounts/reset_password_email.html'},
    #     name='reset_password'),
    # url(r'^reset-password/done/$', password_reset_done, {'template_name': 'accounts/reset_password_done.html'},
    #     name='password_reset_done'),
    # url(r'^reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', password_reset_confirm,
    #     {'template_name': 'accounts/reset_password_confirm.html',
    #      'post_reset_redirect': 'accounts:password_reset_complete'},
    #     name='password_reset_confirm'),
    # url(r'^reset-password/complete/$', password_reset_complete,{'template_name': 'accounts/reset_password_complete.html'},
    #     name='password_reset_complete'),
    # url(r'^domain/$', views.DomainListView.as_view(), name = 'domain'),
    # url(r'^domain/new/$', views.post_domain, name='post_domain'),
    # url(r'^domain/(?P<pk>\d+)/edit/$', views.edit_domain, name='edit_domain'),
    # url(r'^items/$', views.ItemsListView.as_view(), name = 'items'),
    # url(r'^relation/$', views.RelationListView.as_view(), name = 'relation'),
    # url(r'^upload/$', views.upload, name = 'upload'),
    # url(r'^relation/new/$', views.post_relation, name='post_relation'),
    # #url(r'^relation/new/hierarchy$', views.post_relation_2, name='post_relation_2'),
    # #url(r'^relation/new/prerequisiter$', views.post_relation_3, name='post_relation_3'),
    # url(r'^relation/(?P<pk>\d+)/edit/$', views.edit_relation, name='edit_relation'),
    # url(r'^items/new/$', views.post_item, name='post_items'),
    # url(r'^items/(?P<pk>\d+)/edit/$', views.edit_item, name='edit_items'),
    # url(r'^items/(?P<pk>\d+)/detail/$', views.detail_item, name='details'),
    # url(r'^items/(?P<pk>\d+)/delete/$', views.item_delete, name='items_delete'),


]
