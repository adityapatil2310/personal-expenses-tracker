from django.urls import path
from . import views

urlpatterns = [
    path('give/', views.show_all_transactions),
    path('user/<int:userid>/', views.user_transactions),
    path('see/<int:id>/', views.transactions)
]
