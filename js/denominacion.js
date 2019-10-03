//Requiero la DB y la instacio

const app = require('electron').remote.app;
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
let dbFile = path.join(app.getAppPath(), 'db.sqlite')
const db = new Database(dbFile, { verbose: console.log });

const listaPalabras = []
const btn1 = document.getElementById('im1');
const btn2 = document.getElementById('im2');

var puntos = 0;


// async function getAPI() {
//   const response = await fetch('http://localhost:3000/palabras');
//   const data = await response.json();
//   return data
// }

// const json = getAPI()
// json.then((data) => {
//   console.log(data)
// })

//OBTENGO LA LISTA DE PALABRAS A TRABAJAR
var conf = JSON.parse(localStorage.getItem('configuracion'));


function getPalabras(listaPalabras) {
  //ARMO MI QUERY PARA TRABAJAR CON LAS PALABRAS QUE ME PASARON DE LA CONFIG.
  var query = "SELECT * FROM palabras WHERE id in " + "(" + conf + ")"
  const row = db.prepare(query)
  const palabrasDB = row.all();
  console.log(palabrasDB);
  palabrasDB.forEach(palabra => {
    listaPalabras.push(palabra)
  });
}

btn1.addEventListener('click', () => {
  if (btn1.palabra == listaPalabras[dosAleatorios[correcta]].palabra) {
    dosAleatorios = generateTwoRandoms();
    correcta = generateCorrect();
    cargarJuego(dosAleatorios, correcta);
    console.log('Correcta');
  } else {
    console.log('Incorrecta');
  }
})

btn2.addEventListener('click', () => {
  if (btn2.palabra == listaPalabras[dosAleatorios[correcta]].palabra) {
    //window.location = "palabras.html"

    dosAleatorios = generateTwoRandoms();
    correcta = generateCorrect();
    cargarJuego(dosAleatorios, correcta);
    console.log('Correcta');
  } else {
    console.log('Incorrecta')
  }
})



getPalabras(listaPalabras);
var dosAleatorios = generateTwoRandoms();
var correcta = generateCorrect();
cargarJuego(dosAleatorios, correcta);


//Obtengo dos números aleatorios sin que se repitan
function generateTwoRandoms() {
  let lista = []
  while (lista.length < 2) {
    let random = Math.floor(Math.random() * listaPalabras.length) + 0;
    if (lista.indexOf(random) === -1) lista.push(random);
  }
  return lista;

}

//Determino qué opción es la correcta
function generateCorrect() {
  let num1 = Math.floor(Math.random() * ((1 + 1) - 0) + 0);
  return num1
}


function cargarJuego(dosAleatorios, opcionCorrecta) {

  document.getElementById('correcta').innerHTML = listaPalabras[dosAleatorios[opcionCorrecta]].palabra;
  document.getElementById('im1').src = "../public/images/" + listaPalabras[dosAleatorios[0]].ruta;
  document.getElementById('im2').src = "../public/images/" + listaPalabras[dosAleatorios[1]].ruta;
  document.getElementById('im1').palabra = listaPalabras[dosAleatorios[0]].palabra;
  document.getElementById('im2').palabra = listaPalabras[dosAleatorios[1]].palabra;
}
