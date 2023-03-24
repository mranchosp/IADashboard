const socket = io();

socket.on('connect', function () {
    console.log('connected');
});

socket.on('temp', function (data) {
    let temp = document.getElementById('temperatura');
    let barra = document.getElementById('barra');
    temp.innerHTML = `${data}°C`;
    barra.attributes[2].value = data;
    barra.innerHTML = `${data}%`;
    console.log(data);
});
