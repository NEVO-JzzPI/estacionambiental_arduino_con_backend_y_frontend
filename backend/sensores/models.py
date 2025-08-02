from django.db import models

class RegistroSensor(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    temperatura = models.FloatField()
    humedad_ambiente = models.FloatField()
    humedad_suelo = models.IntegerField()
    movimiento = models.BooleanField()

    def __str__(self):
        return f"{self.fecha} - T: {self.temperatura}°C, HA: {self.humedad_ambiente} %, HS: {self.humedad_suelo}%"

