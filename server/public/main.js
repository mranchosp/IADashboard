const socket = io();

socket.on("connect", function () {
  console.log("connected!");
});

socket.on("temp", function (data) {
  let str = JSON.parse(data); //Then parse it
  let temp = document.getElementById("temperatura");
  let barra = document.getElementById("barra");
  let cel = str.temperature[0]["Celcius"];
  let far = str.temperature[0]["Fahrenheit"];
  temp.innerHTML = `${cel}°C`;
  barra.attributes[2].value = cel;
  barra.innerHTML = `${cel}%`;
  console.log(str);
});
