# Generated by Django 3.2.9 on 2021-11-11 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0005_auto_20210827_1246"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="first_name",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="last_name",
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
    ]
