# Generated by Django 4.2.4 on 2023-10-05 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('po_app', '0048_product_sdes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('warrenty', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
