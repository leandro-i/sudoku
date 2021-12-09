from django.urls import path
from django.shortcuts import redirect
from . import views

urlpatterns = [
    path('', lambda request: redirect('easy/', permanent=False)),
    path('<str:dificultad>/', views.index, name='index'),
]
