# Generated by Django 4.0.4 on 2022-05-12 22:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0006_auto_20211111_2141"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="scout",
            name="team",
        ),
    ]
