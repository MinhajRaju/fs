# Generated by Django 4.2.4 on 2023-09-02 13:28

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('po_app', '0012_product_discount_product_flashsale'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='tags',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=1000), blank=True, null=True, size=None),
        ),
    ]
