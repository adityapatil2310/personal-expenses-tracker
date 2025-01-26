from django.urls import re_path
from . import views

urlpatterns = [
    re_path('login/', views.Login),
    re_path('register/', views.Register),
    re_path('getid/', views.getId),
    re_path('logout/', views.logout)
]
