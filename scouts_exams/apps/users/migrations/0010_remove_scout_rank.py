# Generated by Django 4.1 on 2022-09-11 15:01

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0009_convert_rank_to_new_format"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="scout",
            name="rank",
        ),
    ]
