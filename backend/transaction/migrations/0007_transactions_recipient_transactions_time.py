# Generated by Django 5.1.5 on 2025-02-05 04:59

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0006_alter_categories_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='transactions',
            name='recipient',
            field=models.CharField(default='other', max_length=50),
        ),
        migrations.AddField(
            model_name='transactions',
            name='time',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
