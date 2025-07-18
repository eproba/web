from django.contrib import admin

from .models import Task, TemplateTask, TemplateWorksheet, Worksheet


class TaskInline(admin.TabularInline):
    model = Task
    extra = 1


class WorksheetAdmin(admin.ModelAdmin):
    list_filter = (
        "is_archived",
        "deleted",
        "user__patrol__team",
    )

    fieldsets = [
        (None, {"fields": ["user", "supervisor"]}),
        (None, {"fields": ["name", "is_archived", "deleted", "template"]}),
        (None, {"fields": ["final_challenge", "final_challenge_description"]}),
    ]

    inlines = [TaskInline]


admin.site.register(Worksheet, WorksheetAdmin)


class TemplateTaskInline(admin.TabularInline):
    model = TemplateTask
    extra = 1


class TemplateWorksheetAdmin(admin.ModelAdmin):
    list_display = ("name", "team", "organization")
    fields = ("name", "description", "template_notes", "image", "team", "organization")
    inlines = [TemplateTaskInline]


admin.site.register(TemplateWorksheet, TemplateWorksheetAdmin)
