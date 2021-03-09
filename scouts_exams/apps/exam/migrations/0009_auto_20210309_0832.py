# Generated by Django 3.1.7 on 2021-03-09 07:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("exam", "0008_auto_20210226_1447"),
    ]

    operations = [
        migrations.AlterField(
            model_name="senttask",
            name="task",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="exam.task",
            ),
        ),
    ]
