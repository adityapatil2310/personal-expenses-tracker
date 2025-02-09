from django.shortcuts import render
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Q
from django.db.models.functions import ExtractYear, ExtractMonth
from datetime import datetime
from .models import BudgetGoal, Transaction
from .serializers import BudgetGoalSerializer, MonthlyAnalyticsSerializer, YearlyAnalyticsSerializer


class BudgetGoalViewSet(viewsets.ModelViewSet):
    queryset = BudgetGoal.objects.all()
    serializer_class = BudgetGoalSerializer
class MonthlyAnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        year = int(request.query_params.get('year', datetime.now().year))
        month = int(request.query_params.get('month', datetime.now().month))
        
        transactions = Transaction.objects.filter(
            user=request.user,
            date__year=year,
            date__month=month
        )
        
        income = transactions.filter(transaction_type='INCOME').aggregate(
            total=Sum('amount'))['total'] or 0
        expenses = transactions.filter(transaction_type='EXPENSE').aggregate(
            total=Sum('amount'))['total'] or 0
        
        category_breakdown = transactions.filter(
            transaction_type='EXPENSE'
        ).values('category').annotate(
            total=Sum('amount')
        ).order_by('-total')
        
        data = {
            'month': datetime(year, month, 1).date(),
            'income': income,
            'expenses': expenses,
            'savings': income - expenses,
            'categories': {item['category']: item['total'] for item in category_breakdown}
        }
        
        serializer = MonthlyAnalyticsSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)


class YearlyAnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        year = int(request.query_params.get('year', datetime.now().year))
        
        transactions = Transaction.objects.filter(
            user=request.user,
            date__year=year
        )
        
        total_income = transactions.filter(transaction_type='INCOME').aggregate(
            total=Sum('amount'))['total'] or 0
        total_expenses = transactions.filter(transaction_type='EXPENSE').aggregate(
            total=Sum('amount'))['total'] or 0
        
        monthly_breakdown = transactions.annotate(
            month=ExtractMonth('date')
        ).values('month').annotate(
            income=Sum('amount', filter=Q(transaction_type='INCOME')),
            expenses=Sum('amount', filter=Q(transaction_type='EXPENSE'))
        ).order_by('month')
        
        category_breakdown = transactions.filter(
            transaction_type='EXPENSE'
        ).values('category').annotate(
            total=Sum('amount')
        ).order_by('-total')
        
        data = {
            'year': year,
            'total_income': total_income,
            'total_expenses': total_expenses,
            'total_savings': total_income - total_expenses,
            'monthly_breakdown': list(monthly_breakdown),
            'category_breakdown': {item['category']: item['total'] for item in category_breakdown}
        }
        
        serializer = YearlyAnalyticsSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)
