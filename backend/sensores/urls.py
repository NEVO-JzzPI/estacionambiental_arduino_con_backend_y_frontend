from django.urls import path
from .views import recibir_datos

urlpatterns = [
    path('api/datos/', recibir_datos, name='recibir_datos'),
]