# Generated by Django 3.2.8 on 2021-10-29 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("exam", "0008_alter_task_approver"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="description",
            field=models.TextField(blank=True, default=""),
        ),
    ]
