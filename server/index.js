const express = require('express')
const http = require('http');
const morgan = require('morgan');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(cors());

/* Create Server */
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
    console.log(data);
});

/* API */
app.get("/api", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});
