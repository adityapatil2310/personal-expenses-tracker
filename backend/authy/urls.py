from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.Register, name='register'),
    path('login/', views.Login, name='login'),
    path('getId/', views.getId, name='getId'),
    path('logout/', views.logout, name='logout'),
]
