# Generated by Django 4.2.4 on 2023-09-27 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer_app', '0010_alter_rating_comment_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating_comment',
            name='rating',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
