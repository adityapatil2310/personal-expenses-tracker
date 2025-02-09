from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BudgetGoalViewSet, MonthlyAnalyticsView, YearlyAnalyticsView

router = DefaultRouter()
router.register(r'budget-goals', BudgetGoalViewSet, basename='budgetgoal')

urlpatterns = [
    path('', include(router.urls)),  # This includes the budget-goals URLs
    path('analytics/monthly/', MonthlyAnalyticsView.as_view(), name='monthly-analytics'),
    path('analytics/yearly/', YearlyAnalyticsView.as_view(), name='yearly-analytics'),
]