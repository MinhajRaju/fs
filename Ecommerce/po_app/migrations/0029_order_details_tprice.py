# Generated by Django 4.2.4 on 2023-09-12 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('po_app', '0028_remove_order_details_retail_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='order_details',
            name='tprice',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
