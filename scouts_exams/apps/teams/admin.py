from django.contrib import admin

from apps.teams.models import Patrol, Team


@admin.register(Team)
class EventAdmin(admin.ModelAdmin):
    fields = ("name", "short_name", "colors")
    list_display = ("name", "short_name", "colors")


@admin.register(Patrol)
class EventAdmin(admin.ModelAdmin):
    fields = ("name", "team")
    list_display = ("name", "team")
    list_filter = ("team",)
