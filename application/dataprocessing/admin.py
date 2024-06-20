from django.contrib import admin
from django.contrib.admin.models import LogEntry
from django.contrib.auth.admin import UserAdmin

from .models import Domain, Items, Relation
from .models import User

UserAdmin.fieldsets += ('Custom fields set', {'fields': (
    'isu_number', 'is_rpd_developer', 'is_expertise_master', 'expertise_status_notification',
    'expertise_comments_notification', 'unread_news', 'do_news_notification')}),
admin.site.register(User, UserAdmin)


# admin.site.register(Membership)


class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'domain', 'value',)
    list_filter = ('domain',)
    empty_value_display = 'None'


class RelationAdmin(admin.ModelAdmin):
    list_display = ('id', 'item1', 'relation', 'item2',)
    list_filter = ('item1', 'relation')
    empty_value_display = 'None'


admin.site.register(LogEntry)
admin.site.register(Domain)
admin.site.register(Items, ItemAdmin)
admin.site.register(Relation, RelationAdmin)
