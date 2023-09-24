# Generated by Django 4.2.4 on 2023-09-21 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('po_app', '0034_rename_order_details_order_od_array'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='grand_total',
        ),
        migrations.RemoveField(
            model_name='order',
            name='od_array',
        ),
        migrations.AddField(
            model_name='order_details',
            name='order_status',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
