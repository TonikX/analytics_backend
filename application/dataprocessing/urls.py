from django.conf.urls import url
from django.urls import path
from . import views
from django.contrib.auth import login, logout
# from django.contrib.auth.views import password_reset, password_reset_done, password_reset_confirm, password_reset_complete
from django.conf import settings

urlpatterns = [
    url(r'^$', views.index, name = 'index'),
    url(r'^register/$', views.register, name='register'),
    url(r'^web_login/$', login, {'template_name': 'accounts/login.html'}, name='web_login'),
    url(r'^web_logout/$', logout, {'next_page': settings.LOGOUT_REDIRECT_URL}, name='web_logout'),
    #url(r'^profile/edit/$', views.edit_profile, name='edit_profile'),
    #url(r'^change-password/$', views.change_password, name='change_password'),
    #url(r'^reset-password/$', password_reset, {'template_name': 'accounts/reset_password.html',
    #                                            'post_reset_redirect': 'accounts/password_reset_done.html',
    #                                            'email_template_name': 'accounts/reset_password_email.html'},
    #     name='reset_password'),
    #url(r'^reset-password/done/$', password_reset_done, {'template_name': 'accounts/reset_password_done.html'},
    #     name='password_reset_done'),
    #url(r'^reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', password_reset_confirm,
    #     {'template_name': 'accounts/reset_password_confirm.html',
    #      'post_reset_redirect': 'accounts:password_reset_complete'},
    #     name='password_reset_confirm'),
    #url(r'^reset-password/complete/$', password_reset_complete,{'template_name': 'accounts/reset_password_complete.html'},
    #     name='password_reset_complete'),
    
    #url(r'^domain/$', views.DomainListView, name = 'domain'),
    #url(r'^domain/new/$', views.DomainPost.as_view(), name='post_domain'),
    #url(r'^domain/edit/(?P<pk>\d+)/$', views.DomainPostUpdate.as_view(), name='edit_domain'),
    #url(r'^items/$', views.ItemsListView.as_view(), name = 'items'),
    #url(r'^upload/$', views.upload, name = 'upload'),
    #url(r'^items/new/$', views.ItemPost.as_view(), name='post_items'),
    #url(r'^items/edit/(?P<pk>\d+)/$', views.ItemPostUpdate.as_view(), name='edit_items'),
    #url(r'^items/detail/(?P<pk>\d+)/$', views.detail_item, name='details'),
    #url(r'^items/delete/(?P<pk>\d+)/$', views.item_delete, name='items_delete'),
    #url(r'^relation/$', views.RelationListView, name = 'relation'),
    #url(r'^relation/new/$', views.RelationPost.as_view(), name='post_relation'),
    #url(r'^relation/edit/(?P<pk>\d+)/$', views.RelationPostUpdate.as_view(), name='edit_relation'),

    #
    # API urls
    #
    

    path('api/domain/', views.DomainListCreateAPIView.as_view(),),
    path('api/domain/<int:pk>', views.DomainDetailAPIView.as_view(),),
    
    path('api/item/create', views.ItemsListCreateAPIView.as_view(),),
    path('api/item/', views.ItemsListAPIView.as_view(),),
    path('api/item/detail/<int:pk>', views.ItemDetailAPIView.as_view(),),
    
    path('api/relation/', views.RelationListCreateAPIView.as_view(),),
    path('api/relation/groupby', views.RelationListCreateGroupsAPIView.as_view(),),
    path('api/relation/<int:item1_id>', views.RelationListAPIView.as_view(),),
    path('api/relation/detail/<int:pk>', views.RelationRetrieveDestroyAPIView.as_view(),),
    path('api/relation/update/<int:pk>', views.RelationUpdateAPIView.as_view(),),
    path('api/relation/create', views.RelationPostAPIView.as_view(), ),

    path('api/upload/', views.FileUploadAPIView.as_view(), ),

    


]
