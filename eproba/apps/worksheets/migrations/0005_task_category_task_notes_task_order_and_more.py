# Generated by Django 5.2 on 2025-05-27 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("worksheets", "0004_remove_worksheet_is_template_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="category",
            field=models.CharField(
                choices=[("general", "Ogólne"), ("individual", "Indywidualne")],
                default="general",
                max_length=20,
                verbose_name="Kategoria",
            ),
        ),
        migrations.AddField(
            model_name="task",
            name="notes",
            field=models.TextField(
                blank=True,
                default="",
                verbose_name="Notatki do zadania, ukryte przed użytkownikami",
            ),
        ),
        migrations.AddField(
            model_name="task",
            name="order",
            field=models.IntegerField(
                default=0, verbose_name="Kolejność zadania w próbie/kategorii"
            ),
        ),
        migrations.AddField(
            model_name="templatetask",
            name="category",
            field=models.CharField(
                choices=[("general", "Ogólne"), ("individual", "Indywidualne")],
                default="general",
                max_length=20,
                verbose_name="Kategoria",
            ),
        ),
        migrations.AddField(
            model_name="templatetask",
            name="order",
            field=models.IntegerField(
                default=0, verbose_name="Kolejność zadania w szablonie/kategorii"
            ),
        ),
        migrations.AddField(
            model_name="worksheet",
            name="notes",
            field=models.TextField(
                blank=True,
                default="",
                verbose_name="Notatki do próby, ukryte przed użytkownikami",
            ),
        ),
    ]
