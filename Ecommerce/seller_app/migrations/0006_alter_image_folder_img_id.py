# Generated by Django 4.2.4 on 2023-10-27 16:55

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seller_app', '0005_image_folder'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image_folder',
            name='img_id',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(max_length=1000), blank=True, null=True, size=None),
        ),
    ]
