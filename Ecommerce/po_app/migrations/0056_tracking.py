# Generated by Django 4.2.4 on 2023-10-30 13:12

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('seller_app', '0006_alter_image_folder_img_id'),
        ('po_app', '0055_product_variation_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tracking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_items', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(max_length=1000), blank=True, null=True, size=None)),
                ('oder', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='po_app.order')),
                ('seller', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='seller_app.seller_profile')),
            ],
        ),
    ]