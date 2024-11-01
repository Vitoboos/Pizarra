# Generated by Django 5.1.2 on 2024-10-31 13:38

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0002_alter_departamento_options_alter_proveedor_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='proyecto',
            name='departamentos',
        ),
        migrations.AlterField(
            model_name='proyecto',
            name='prioridad',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(3)]),
        ),
        migrations.RemoveField(
            model_name='proyecto',
            name='proveedores',
        ),
        migrations.AlterField(
            model_name='tarea',
            name='prioridad',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(3)]),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='departamentos',
            field=models.ManyToManyField(to='database.departamento'),
        ),
        migrations.AddField(
            model_name='proyecto',
            name='proveedores',
            field=models.ManyToManyField(to='database.proveedor'),
        ),
    ]