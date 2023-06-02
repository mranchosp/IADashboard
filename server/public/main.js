const socket = io();

socket.on("connect", function() {
  console.log("connected to Socket!");
});

socket.on("temp", function(data) {
  let str = JSON.parse(data); //Then parse it

  // Temperatura
  let cel = str["Celcius"];
  // let far = str.temperature[0]["Fahrenheit"];

  let spanTemp = document.getElementById("temperatura");
  let barraTemp = document.getElementById("barra_temp");
  spanTemp.textContent = `${cel}°C`;
  barraTemp.style.setProperty('--value', `${cel}`);
  if (cel < 27) {
    spanTemp.classList.add("text-purpledracula-200");
    barraTemp.classList.add("text-purpledracula-200");
  } else if (cel > 27) {
    spanTemp.classList.add("text-reddracula");
    barraTemp.classList.add("text-reddracula");
  }
  // Temperatura
  let distance = str["distance"];
  let snapDistancia = document.getElementById("distancia");
  let barraDistancia = document.getElementById("barra_distancia");

  snapDistancia.textContent = `${distance} cm`;
  barraDistancia.style.setProperty('--value', `${distance}`);

  if (distance < 10) {
    console.log("distancia menor a 10");
    snapDistancia.classList.add = "text-pinkdracula";
    barraDistancia.classList.add = "text-pinkdracula";
  } else {
    console.log("distancia mayor a 10");
    snapDistancia.classList.add = "text-reddracula";
    barraDistancia.classList.add = "text-reddracula";
  };
});

/* socket.on("dbtable", function(data) {
  let tabla = document.getElementById("dbtable");
}); */
