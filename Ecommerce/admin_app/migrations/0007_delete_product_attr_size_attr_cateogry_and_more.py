# Generated by Django 4.2.4 on 2023-09-30 02:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('po_app', '0042_remove_product_variation_p_attr_id_and_more'),
        ('admin_app', '0006_color_attr_size_attr'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Product_Attr',
        ),
        migrations.AddField(
            model_name='size_attr',
            name='cateogry',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='admin_app.category'),
        ),
        migrations.AddField(
            model_name='color_attr',
            name='cateogry',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='admin_app.category'),
        ),
    ]
