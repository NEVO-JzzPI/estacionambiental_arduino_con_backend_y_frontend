from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import RegistroSensor
from .serializers import RegistroSensorSerializer

@api_view(['GET','POST'])
def recibir_datos(request):
    if request.method == 'POST':
        serializer = RegistroSensorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Datos recibidos correctamente."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        registros = RegistroSensor.objects.all().order_by('-fecha')
        serializer = RegistroSensorSerializer(registros, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

