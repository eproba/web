# Generated by Django 3.2.9 on 2021-11-11 20:25

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exam", "0009_alter_task_description"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="approval_date",
            field=models.DateTimeField(
                blank=True, default=django.utils.timezone.now, null=True
            ),
        ),
    ]
