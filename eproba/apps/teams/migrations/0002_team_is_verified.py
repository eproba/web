# Generated by Django 5.1 on 2024-08-26 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("teams", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="team",
            name="is_verified",
            field=models.BooleanField(default=True),
        ),
    ]
