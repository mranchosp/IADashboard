import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import pool from "./db";

export default (io) => {
  // Serial port connection
  const port = new SerialPort(
    {
      path: "/dev/ttyACM0",
      baudRate: 9600,
    },
    function(err) {
      if (err) {
        return console.log("Error: ", err.message);
      }
    }
  );

  //  const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  const parser = port.pipe(new ReadlineParser());
  port.on("open", function() {
    console.log("Serial Port Connected on /dev/ttyACM0")
  });

  const insertar = async (obj) => {
    let conn;
    try {
      conn = await pool.getConnection();
      /* console.log("temp: " + obj.Celcius);
      console.log("distance: " + obj.distance); */
      const rows = await conn.query("INSERT INTO sensores (celcius, distancia, puerta) VALUES (?, ?, ?)", [obj.Celcius, obj.distance, obj.puerta]);
      conn.release();
      console.log(rows);
    } catch (error) {
      console.error(error);
    }
  }

  parser.on("data", function(data) {
    try {
      const obj = JSON.parse(data);
      insertar(obj);
      io.emit("temp", data);
      pool.getConnection()
        .then((conn) => {
          conn.query('SELECT * FROM sensores ORDER BY id DESC LIMIT 10')
            .then((rows) => {
              io.emit('datos', rows);
              conn.release();
            })
            .catch((error) => {
              console.error('Error al ejecutar la consulta:', error);
              conn.release();
            });
        })
        .catch((error) => {
          console.error('Error al obtener la conexión:', error);
        });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  });
};
