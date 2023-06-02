#include "DHT.h"
#include <Wire.h>
#include <EasyUltrasonic.h>

#include <ArduinoJson.h>
#include <Keypad.h>
#include <LiquidCrystal_I2C.h>
#include <EasyBuzzer.h>

// Set the LCD address to 0x3F for a 16 chars and 2 line display
//LiquidCrystal_I2C lcd(0x3F,16,2);
// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);

#define DHTPIN 2  // pin digital conectado al sensor DHT.
#define DHTTYPE DHT11 // Tipo de sensor DHT.

#define ECHOPIN 3 // pin digital conectado al pin echo del sensor ultrasonico.
#define TRIGPIN 3 // pin digital conectado al pin trig del sensor ultrasonico.

/* START KEYPAD CONFIG */
const byte ROWS = 4;
const byte COLS = 4;

char hexaKeys[ROWS][COLS] = {
/*  {'D', '#', '0', '*'},
  {'C', '9', '8', '7'},
  {'B', '6', '5', '4'},
  {'A', '3', '2', '1'}*/
  {'1','4','7','*'},
  {'2','7','8','0'},
  {'3','6','9','#'},
  {'A','B','C','D'}
};

byte colPINS[COLS] = {5, 6, 7, 8};
byte rowPINS[ROWS] = {9, 10, 11, 12};

Keypad customKeypad = Keypad(makeKeymap(hexaKeys), rowPINS, colPINS, ROWS, COLS);

/* FINISH KEYPAD CONFIG */


EasyUltrasonic ultrasonic; // Define un objeto ultrasonic.
DHT dht(DHTPIN, DHTTYPE);  // Inicializa el sensor DHT.

int CelciusOld = 0;
int distanceOld = 0;
bool abierto = false;

void setup() {
  Serial.begin(9600);
  ultrasonic.attach(TRIGPIN, ECHOPIN); // Adjunta el sensor ultrasonico a los pines definidos arriba.
  dht.begin(); // Inicializa el sensor DHT y lo pone a trabajar.
}

void loop() {
  // Keypad Test
  char customKey = customKeypad.getKey();

  if (customKey) {
    Serial.print("Key: ");
    Serial.println(customKey);
  }
  // Keypad Test

  float C = dht.readTemperature();     // variable para almacenar la temperatura en Celsius
  float F = dht.readTemperature(true); // variable para almacenar la temperatura en Fahrenheit
  float Hum = dht.readHumidity(); // Read humidity

  if (isnan(C) || isnan(F)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  int distance = roundf(ultrasonic.getPreciseDistanceCM(C, Hum) * 100) / 100;
  int Cel = roundf(C * 100)/100;
  int Far = roundf(F * 100)/100;
  
  if (CelciusOld != Cel || distance < 5 || (distance > 5 && distance < 70)) {
    /*Serial.print("CelOld: ");
    Serial.println(CelciusOld);
    Serial.print("Cel: ");
    Serial.println(Cel);
    Serial.print("disOld: ");
    Serial.println(distanceOld);
    Serial.print("dist: ");
    Serial.println(distance);*/
    /* Genera JSON para enviar a NodeJS */
    StaticJsonDocument<48> doc; // Se define variable doc para creacion del JSON de respuesta.

    doc["Celcius"] = Cel;
    doc["Farenheit"] = Far;
    doc["distance"] = distance;

    serializeJson(doc, Serial); // Transmite por el puerto serial el JSON generado arriba.
    Serial.println();

    CelciusOld = Cel;
    distanceOld = distance;
  }
}
