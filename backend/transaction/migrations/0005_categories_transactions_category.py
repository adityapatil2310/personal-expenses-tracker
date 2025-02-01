# Generated by Django 5.1.5 on 2025-01-28 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0004_transactions_transtype'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('userId', models.DecimalField(decimal_places=0, max_digits=5)),
            ],
        ),
        migrations.AddField(
            model_name='transactions',
            name='category',
            field=models.CharField(default='other', max_length=50),
        ),
    ]
