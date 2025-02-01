from .models import Transactions, Categories
from rest_framework import serializers
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ['id', 'userId', 'text', 'amount', 'date', 'transType', 'category']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'name', 'userId']