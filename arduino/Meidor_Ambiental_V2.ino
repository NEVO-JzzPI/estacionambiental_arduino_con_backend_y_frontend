//MISMA VERSION PERO AGREGA LA LOGICA UE SOLO MANDA UN POST CUANDO CUANDO SE DETECTA MOVIMIENTOS
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h> //Solo para probar
#include <DHT.h>

#define DHTPIN D2
#define PIRPIN D5
#define DHTTYPE DHT11

const char* ssid = "VTR-8377326";    
const char* password = "j9tBcwffxjmx";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  
  Serial.begin(115200);
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) { //mientras no se conecte...
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado!");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
  
  pinMode(PIRPIN, INPUT);
  dht.begin();

  Serial.println("Sistema de monitoreo ambiental esta listo.");
}

void loop() {
  //define la temperatura y humedad
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  int humedadSuelo = analogRead(A0);
  bool movimiento_actual = digitalRead(PIRPIN);
  static bool movimiento_anterior = false;
  
 if(movimiento_actual && !movimiento_anterior){

    Serial.println("Se Detecto Movimiento: ");
    Serial.println("----- LECTURAS -----");
    Serial.print("Temperatura: "); Serial.println(t);
    Serial.print("Humedad ambiente: "); Serial.println(h);
    Serial.print("Humedad del suelo: "); Serial.println(humedadSuelo);
    Serial.println("---------------------");
  
    if (WiFi.status() == WL_CONNECTED) {
      
        HTTPClient http;
        WiFiClient client;
       
    
        
        // Reemplaza esta URL por la tuya real o de webhook.site
        http.begin(client,"http://192.168.0.22:8000/api/datos/"); 
        http.addHeader("Content-Type", "application/json");
    
        String payload = "{";
        payload += "\"temperatura\": " + String(t) + ",";
        payload += "\"humedad_ambiente\": " + String(h) + ",";
        payload += "\"movimiento\": " + String(movimiento_actual ? "true" : "false") + ",";
        payload += "\"humedad_suelo\": " + String(humedadSuelo);
        payload += "}";
    
        int httpResponseCode = http.POST(payload);
        Serial.print("Código de respuesta HTTP: ");
        Serial.println(httpResponseCode);
    
        http.end();}
       else {
        Serial.println("Error: WiFi desconectado");
      }
      delay(10000); 
  }
  movimiento_anterior = movimiento_actual;
  
}
