from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import BudgetGoal, Transaction
from .serializers import BudgetGoalSerializer
from datetime import date, timedelta
from decimal import Decimal

class MonthlyAnalyticsAPITest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()
        self.client.login(username='testuser', password='testpassword')  # ✅ Fix password

        # Create transactions
        Transaction.objects.create(
            user=self.user,
            amount=Decimal('1000.00'),
            transaction_type='INCOME',
            category='Salary',
            date=date.today()
        )
        Transaction.objects.create(
            user=self.user,
            amount=Decimal('200.00'),
            transaction_type='EXPENSE',
            category='Groceries',
            date=date.today()
        )

    def test_monthly_analytics(self):
        """Test Monthly Analytics API response"""
        response = self.client.get('/budget/analytics/monthly/', {'year': date.today().year, 'month': date.today().month})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('income', response.data)
        self.assertIn('expenses', response.data)
        self.assertEqual(float(response.data['income']), 1000.00)
        self.assertEqual(float(response.data['expenses']), 200.00)

class YearlyAnalyticsAPITest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()
        self.client.login(username='testuser', password='testpassword')  # ✅ Fix password

        # Create transactions for multiple months
        for month in range(1, 13):
            Transaction.objects.create(
                user=self.user,
                amount=Decimal('2000.00'),
                transaction_type='INCOME',
                category='Salary',
                date=date.today().replace(month=month)
            )
            Transaction.objects.create(
                user=self.user,
                amount=Decimal('500.00'),
                transaction_type='EXPENSE',
                category='Bills',
                date=date.today().replace(month=month)
            )

    def test_yearly_analytics(self):
        """Test Yearly Analytics API response"""
        response = self.client.get('/budget/analytics/yearly/', {'year': date.today().year})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(float(response.data['total_income']), 24000.00)  # 2000 * 12
        self.assertEqual(float(response.data['total_expenses']), 6000.00)  # 500 * 12