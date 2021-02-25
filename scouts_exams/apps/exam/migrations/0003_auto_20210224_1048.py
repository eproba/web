# Generated by Django 3.1.7 on 2021-02-24 09:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0005_delete_freeday"),
        ("exam", "0002_task_scout"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="task",
            name="scout",
        ),
        migrations.AddField(
            model_name="exam",
            name="scout",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.RESTRICT,
                related_name="scout",
                to="users.scout",
            ),
        ),
    ]
