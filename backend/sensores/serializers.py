from rest_framework import serializers
from .models import RegistroSensor

class RegistroSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroSensor
        fields = ('id', 'fecha', 'temperatura', 'humedad_ambiente','movimiento', 'humedad_suelo')
        read_only_fields = ('id', 'fecha')