# Generated by Django 3.2.6 on 2021-08-27 10:46

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0004_auto_20210826_2035"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="scout",
            name="is_patrol_leader",
        ),
        migrations.RemoveField(
            model_name="scout",
            name="is_second_patrol_leader",
        ),
        migrations.RemoveField(
            model_name="scout",
            name="is_second_team_leader",
        ),
        migrations.RemoveField(
            model_name="scout",
            name="is_team_leader",
        ),
        migrations.AlterField(
            model_name="scout",
            name="function",
            field=models.IntegerField(
                choices=[
                    (0, "Druh"),
                    (1, "Podzastępowy"),
                    (2, "Zastępowy"),
                    (3, "Przyboczny"),
                    (4, "Drużynowy"),
                    (5, "Wyższa funkcja"),
                ],
                default=0,
            ),
        ),
    ]
