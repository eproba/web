# Generated by Django 3.1.7 on 2021-02-24 10:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("exam", "0005_auto_20210224_1123"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="task",
            name="key",
        ),
    ]
