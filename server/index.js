const express = require('express')
const http = require('http');
const socketIO = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

server.listen(app.get('port'), function () {
    console.log('listening on port:', app.get('port'));
});

// Serial port connection
const port = new SerialPort({
    path: '/dev/ttyACM0',
    baudRate: 9600
},
    function (err) {
        if (err) {
            return console.log('Error: ', err.message);
        }
    }
);

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));


port.on('open', function () {
    console.log('connection is opened');
});

parser.on('data', function (data) {
    let temp = parseInt(data, 10);
    io.emit('temp', temp);
    console.log(temp);
});

