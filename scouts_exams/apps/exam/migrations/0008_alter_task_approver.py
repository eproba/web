# Generated by Django 3.2.8 on 2021-10-28 16:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0005_auto_20210827_1246"),
        ("exam", "0007_auto_20211028_1817"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="approver",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="approver",
                to="users.scout",
            ),
        ),
    ]
