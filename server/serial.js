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
    function (err) {
      if (err) {
        return console.log("Error: ", err.message);
      }
    }
  );

  //  const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  const parser = port.pipe(new ReadlineParser());
  port.on("open", function () {
    console.log("Serial Port Connected on /dev/ttyACM0")
  });

const datos = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM sensores");
    console.log(rows);
  } catch (error) {
    console.error(error);
  }
}

const insertar = async (obj) => {
  let conn;
  try {
    conn = await pool.getConnection();
      console.log("temp: " + obj.Celcius);
      console.log("distance: " + obj.distance);
    const rows = await conn.query("INSERT INTO sensores (celcius, distancia) VALUES (?, ?)", [obj.Celcius, obj.distance]);
    console.log(rows);
  } catch (error) {
      console.error(error);
  }
}

  parser.on("data", function (data) {
    try {
      const obj = JSON.parse(data);
      insertar(obj);
      io.emit("temp", data);
      // io.emit("dbtable", datos());
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  });
};
