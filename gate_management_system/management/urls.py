from django.urls import path
from . import views

urlpatterns = [
    path('gates/', views.gate_list, name='gate_list'),
    path('gates/<int:pk>/', views.gate_detail, name='gate_detail'),
    path('guard-assignments/', views.guard_assignment_list, name='guard_assignment_list'),
    path('guard-assignments/<int:pk>/', views.guard_assignment_detail, name='guard_assignment_detail'),
]
