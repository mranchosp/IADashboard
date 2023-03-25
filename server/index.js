import app from "./app";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import { connectDB } from "./db";
import { PORT } from "./config";
import serial from "./serial";

connectDB();

// Inicializa un servidor HTTP y le pasa la app de express
const server = http.createServer(app);

// Inicializa el servidor en el puerto PORT o el que se pase por variable de entorno
const httpServer = server.listen(PORT);
console.log("Server is listening on port: " + PORT);

// Inicializa el servidor de websockets
const io = new WebSocketServer(server);
//sockets(io);
serial(io);
