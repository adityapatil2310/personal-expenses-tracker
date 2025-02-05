from .models import Transactions, Categories
from rest_framework import serializers
class TransactionSerializer(serializers.ModelSerializer):
    datetime = serializers.DateTimeField(format="%d-%m-%Y %H:%M", input_formats=['%d-%m-%Y %H:%M'])
    class Meta:
        model = Transactions
        fields = ['id', 'userId', 'text', 'amount', 'datetime', 'transType', 'category', 'recipient']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id', 'name', 'userId']