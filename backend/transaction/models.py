from django.db import models

# Create your models here.
class Transactions(models.Model):
    userId = models.DecimalField(max_digits=5, decimal_places=0, default=0)
    amount = models.DecimalField(decimal_places=2, max_digits=15)
    date = models.DateField()
    text = models.CharField(max_length=500)
    transType = models.CharField(max_length=3, default='out')