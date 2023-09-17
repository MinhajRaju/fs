# Generated by Django 4.2.4 on 2023-09-05 05:25

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer_app', '0002_customer_profile_product_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer_profile',
            name='product_id',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(max_length=1000), blank=True, null=True, size=None),
        ),
    ]
