# Generated by Django 5.1.5 on 2025-02-01 15:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0005_categories_transactions_category'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='categories',
            unique_together={('name', 'userId')},
        ),
    ]
