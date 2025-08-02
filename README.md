# Estación Ambiental con Arduino, Django y React

## Descripción general

Este proyecto consiste en una estación ambiental que registra información del entorno mediante sensores conectados a un dispositivo Arduino. Los datos recolectados (temperatura, humedad ambiente y humedad del suelo) son enviados a un backend desarrollado con Django y se visualizan en un frontend hecho en React.

El objetivo principal es monitorear en tiempo real las condiciones ambientales y poder consultar o exportar registros almacenados.

## Tecnologías utilizadas

* Arduino IDE (C++)
* ESP8266 (WiFi)
* Sensor DHT11 (temperatura y humedad)
* Sensor de humedad de suelo
* Python 3.x
* Django + Django REST Framework
* React + Tailwind CSS
* Netlify (deploy del frontend)

## Arquitectura del proyecto

```
raíz/
├── arduino/                  # Código fuente para el ESP8266
├── backend/                  # Proyecto Django (API REST)
│   ├── estacion_ambiental/
│   ├── sensores/
│   └── manage.py
├── frontend/                 # Aplicación React (visualización)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

## Instalación y ejecución

### 1. Arduino

* Cargar el sketch en el ESP8266 desde la carpeta `arduino/`
* Asegurarse de tener configurado el WiFi y la IP del servidor Django correctamente

### 2. Backend (Django)

```bash
cd backend
python -m virtualvenv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev  # o npm start según configuración
```

## Características principales

* Registro automático de datos desde Arduino a Django REST API
* Visualización en tiempo real con gráficos (Recharts)
* Tabla con registros recientes
* Filtro de registros por cantidad y fecha
* Exportación de datos a CSV
* Autoactualización de los datos cada 10 segundos
* Deploy del frontend en Netlify

## Exportación a CSV

Desde la interfaz React, se puede exportar el contenido actual de la tabla de registros en formato CSV con un solo clic. Esto permite un análisis posterior o respaldo de los datos recolectados.

## Deploy en Netlify

El frontend fue desplegado en Netlify mediante conexión directa con el repositorio de GitHub. La URL generada permite acceder desde cualquier dispositivo con conexión a internet, siempre que el backend esté encendido y disponible.

## Autor

Nicolas Esteban Vergara Orellana- Proyecto de portafolio personal (2025)

Estudiante de ingeniería Informática Universidad Santo Tomas Arica

---

Este proyecto fue desarrollado con fines educativos y como parte del aprendizaje de integración de sistemas embebidos, desarrollo web y visualización de datos.
