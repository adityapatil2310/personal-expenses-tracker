from .models import Transactions
from rest_framework import serializers
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ['id', 'userId', 'text', 'amount', 'date', 'transType']