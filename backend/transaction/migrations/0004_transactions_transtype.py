# Generated by Django 5.1.5 on 2025-01-23 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0003_remove_transactions_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='transactions',
            name='transType',
            field=models.CharField(default='out', max_length=3),
        ),
    ]