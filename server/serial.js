import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { Readline } from "@serialport/parser-readline";

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
    console.log("connection is opened");
  });

  parser.on("data", function (data) {
    io.emit("temp", data);
    console.log(data);
  });
};
