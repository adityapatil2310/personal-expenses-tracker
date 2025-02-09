from rest_framework import serializers
from django.db import models
from .models import BudgetGoal, Transaction

class BudgetGoalSerializer(serializers.ModelSerializer):
    progress = serializers.SerializerMethodField()
    
    class Meta:
        model = BudgetGoal
        fields = ['id', 'user', 'category', 'amount', 'start_date', 'end_date', 'progress']  # Added 'user'
        
    def get_progress(self, obj):
        total_spent = Transaction.objects.filter(
            user=obj.user,
            category=obj.category,
            transaction_type='EXPENSE',
            date__range=[obj.start_date, obj.end_date]
        ).aggregate(total=models.Sum('amount'))['total'] or 0

        remaining = max(0, float(obj.amount) - float(total_spent))
        
        percentage = 0
        if float(obj.amount) > 0:
            percentage = min(100, round((float(total_spent) / float(obj.amount)) * 100, 2))

        return {
            'spent': float(total_spent),
            'remaining': remaining,
            'percentage': percentage
        }

class MonthlyAnalyticsSerializer(serializers.Serializer):
    month = serializers.DateField()
    income = serializers.DecimalField(max_digits=10, decimal_places=2)
    expenses = serializers.DecimalField(max_digits=10, decimal_places=2)
    savings = serializers.DecimalField(max_digits=10, decimal_places=2)
    categories = serializers.DictField()

class YearlyAnalyticsSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    total_income = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_expenses = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_savings = serializers.DecimalField(max_digits=10, decimal_places=2)
    monthly_breakdown = serializers.ListField(child=serializers.DictField())  # Fixed
    category_breakdown = serializers.DictField()