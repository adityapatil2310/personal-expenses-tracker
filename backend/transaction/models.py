from django.db import models

# Create your models here.
class Transactions(models.Model):
    userId = models.DecimalField(max_digits=5, decimal_places=0, default=0)
    amount = models.DecimalField(decimal_places=2, max_digits=15)
    date = models.DateField()
    time = models.TimeField()
    text = models.CharField(max_length=500)
    transType = models.CharField(max_length=3, default='out')
    category = models.CharField(max_length=50, default='other')
    recipient = models.CharField(max_length=50, default='other')
    
class Categories(models.Model):
    name = models.CharField(max_length=50)
    userId = models.DecimalField(max_digits=5, decimal_places=0)
    
    class Meta:
        unique_together = ('name', 'userId')