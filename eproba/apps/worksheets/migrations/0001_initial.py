# Generated by Django 5.1 on 2024-08-15 09:40

import uuid

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Worksheet",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=200, verbose_name="Nazwa próby")),
                (
                    "is_archived",
                    models.BooleanField(
                        default=False, verbose_name="Próba zarchiwizowana?"
                    ),
                ),
                (
                    "is_template",
                    models.BooleanField(default=False, verbose_name="Szablon?"),
                ),
                (
                    "deleted",
                    models.BooleanField(default=False, verbose_name="Usunięta?"),
                ),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "supervisor",
                    models.ForeignKey(
                        blank=True,
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.RESTRICT,
                        related_name="supervised_worksheets",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Opiekun próby",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.RESTRICT,
                        related_name="worksheets",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Właściciel próby",
                    ),
                ),
            ],
            options={
                "verbose_name": "Próba",
                "verbose_name_plural": "Próby",
            },
        ),
        migrations.CreateModel(
            name="Task",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("task", models.CharField(max_length=250, verbose_name="Zadanie")),
                (
                    "status",
                    models.IntegerField(
                        choices=[
                            (0, "Do zrobienia"),
                            (1, "Oczekuje na zatwierdzenie"),
                            (2, "Zatwierdzono"),
                            (3, "Odrzucono"),
                        ],
                        default=0,
                        verbose_name="Status",
                    ),
                ),
                (
                    "approval_date",
                    models.DateTimeField(
                        blank=True,
                        default=django.utils.timezone.now,
                        null=True,
                        verbose_name="Data zatwierdzenia",
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True, default="", verbose_name="Opis zadania"
                    ),
                ),
                (
                    "approver",
                    models.ForeignKey(
                        blank=True,
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="approved_tasks",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Zatwierdzający",
                    ),
                ),
                (
                    "worksheet",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tasks",
                        to="worksheets.worksheet",
                    ),
                ),
            ],
            options={
                "verbose_name": "Zadanie",
                "verbose_name_plural": "Zadania",
            },
        ),
    ]
