# Generated by Django 3.2.6 on 2021-08-26 14:16

from django.db import migrations


def detect_function(apps, schema_editor):
    # We can't import the Person model directly as it may be a newer
    # version than this migration expects. We use the historical version.
    Scout = apps.get_model("users", "Scout")
    for scout in Scout.objects.all():
        if scout.is_team_leader:
            scout.function = 4
        elif scout.is_second_team_leader:
            scout.function = 3
        elif scout.is_patrol_leader:
            scout.function = 2
        elif scout.is_second_patrol_leader:
            scout.function = 1
        else:
            scout.function = 0
        scout.save()


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_scout_function"),
    ]

    operations = [
        migrations.RunPython(detect_function),
    ]
