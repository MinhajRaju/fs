# Generated by Django 4.2.4 on 2023-10-12 03:15

from django.db import migrations, models
import po_app.helper


class Migration(migrations.Migration):

    dependencies = [
        ('po_app', '0050_product_oservices_product_wservices'),
    ]

    operations = [
        migrations.AddField(
            model_name='product_image',
            name='thumbnail',
            field=models.ImageField(null=True, upload_to=po_app.helper.RandomFileName('thumbnail_image/')),
        ),
    ]
