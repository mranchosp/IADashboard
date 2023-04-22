const socket = io();

socket.on("connect", function () {
  console.log("connected!");
});

socket.on("temp", function (data) {
  let str = JSON.parse(data); //Then parse it
  let temp = document.getElementById("temperatura");
  let barra = document.getElementById("barra");
  let div_distancia = document.getElementById("distancia");
  let cel = str.temperature[0]["Celcius"];
  let far = str.temperature[0]["Fahrenheit"];
  let distance = str["distance"];
  temp.innerHTML = `${cel}°C`;
  barra.attributes[2].value = cel;
  barra.innerHTML = `${cel}%`;
  div_distancia.innerHTML = `${distance} cm`;
  if (distance < 10) {
    div_distancia.style.color = "red";
  } else {
    div_distancia.style.color = "black";
  };
  if (cel <= 25) {
    temp.style.color = "green";
  } else {
    temp.style.color = "red";
  }
});
