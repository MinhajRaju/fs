# Generated by Django 4.2.4 on 2023-10-05 08:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('po_app', '0046_product_hightlights'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='hightlights',
            new_name='highlights',
        ),
    ]
