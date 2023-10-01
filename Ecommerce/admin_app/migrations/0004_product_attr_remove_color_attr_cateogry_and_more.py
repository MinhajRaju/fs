# Generated by Django 4.2.4 on 2023-09-29 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_app', '0003_size_attr_color_attr'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product_Attr',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=150, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='color_attr',
            name='cateogry',
        ),
        migrations.RemoveField(
            model_name='size_attr',
            name='cateogry',
        ),
    ]