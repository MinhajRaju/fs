# Generated by Django 4.2.4 on 2023-09-03 03:06

import admin_app.models
import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('po_app', '0013_product_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='product_variation',
            name='categories',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(verbose_name=admin_app.models.Category), blank=True, null=True, size=None),
        ),
    ]
