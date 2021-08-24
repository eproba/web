# Generated by Django 3.2.6 on 2021-08-24 13:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('short_name', models.CharField(max_length=10)),
                ('colors', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Patrol',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('team', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.RESTRICT, to='teams.team')),
            ],
        ),
    ]
