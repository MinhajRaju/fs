# Generated by Django 4.2.4 on 2023-09-30 02:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admin_app', '0006_color_attr_size_attr'),
        ('po_app', '0041_remove_product_variation_color_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product_variation',
            name='p_attr_id',
        ),
        migrations.AddField(
            model_name='product_variation',
            name='color',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='admin_app.color_attr'),
        ),
        migrations.AddField(
            model_name='product_variation',
            name='size',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='admin_app.size_attr'),
        ),
    ]
