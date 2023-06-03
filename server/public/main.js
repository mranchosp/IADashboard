const socket = io();

socket.on("connect", function() {
  console.log("connected to Socket!");
});

socket.on("temp", function(data) {
  let str = JSON.parse(data); //Then parse it

  // Temperatura
  let cel = str["Celcius"];
  let cardTemp = document.getElementById("card_temp");
  let cardDist = document.getElementById("card_dist");
  let cardPuerta = document.getElementById("card_puerta");

  let spanTemp = document.getElementById("temperatura");
  let barraTemp = document.getElementById("barra_temp");
  spanTemp.textContent = `${cel}°C`;
  barraTemp.style.setProperty('--value', `${cel}`);
  if (cel < 29) {
    spanTemp.classList.remove("text-reddracula");
    barraTemp.classList.remove("text-reddracula");
    spanTemp.classList.add("text-purpledracula-200");
    barraTemp.classList.add("text-purpledracula-200");
    cardTemp.classList.remove("drop-shadow-reddracula");
  } else if (cel >= 29) {
    spanTemp.classList.remove("text-purpledracula-200");
    barraTemp.classList.remove("text-purpledracula-200");
    spanTemp.classList.add("text-reddracula");
    barraTemp.classList.add("text-reddracula");
    cardTemp.classList.add("drop-shadow-reddracula");
  }
  // Temperatura
  let distance = str["distance"];
  let snapDistancia = document.getElementById("distancia");
  let barraDistancia = document.getElementById("barra_distancia");

  snapDistancia.textContent = `${distance} cm`;
  barraDistancia.style.setProperty('--value', `${distance}`);

  if (distance > 6) {
    snapDistancia.classList.remove("text-reddracula");
    barraDistancia.classList.remove("text-reddracula");
    snapDistancia.classList.add("text-pinkdracula");
    barraDistancia.classList.add("text-pinkdracula");
    cardDist.classList.remove("drop-shadow-reddracula");
  } else {
    snapDistancia.classList.remove("text-pinkdracula");
    barraDistancia.classList.remove("text-pinkdracula");
    snapDistancia.classList.add("text-reddracula");
    barraDistancia.classList.add("text-reddracula");
    cardDist.classList.add("drop-shadow-reddracula");
  };
});

socket.on('datos', (rows) => {
  const tbody = document.querySelector('#tabla tbody');

  // Limpia los datos existentes en la tabla
  tbody.innerHTML = '';

  // Agrega los nuevos datos a la tabla
  rows.forEach((row) => {
    const tr = document.createElement('tr');

    const idTd = document.createElement('td');
    idTd.textContent = row.id;
    tr.appendChild(idTd);

    const celciusTd = document.createElement('td');
    celciusTd.textContent = row.celcius;
    tr.appendChild(celciusTd);

    const distanciaTd = document.createElement('td');
    distanciaTd.textContent = row.distancia;
    tr.appendChild(distanciaTd);

    const timestampTd = document.createElement('td');
    timestampTd.textContent = row.timestamp;
    tr.appendChild(timestampTd);

    tbody.appendChild(tr);
  });
});
