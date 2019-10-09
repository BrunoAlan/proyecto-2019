//Requiero la DB y la instacio
const app = require('electron').remote.app;
//const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
let dbFile = path.join(app.getAppPath(), 'db.sqlite')
const db = new Database(dbFile, { verbose: console.log });
const listaPalabras = []
const btn1 = document.getElementById('im1');
const btn2 = document.getElementById('im2');
var ejerciciosObjetivo = 10
var cantEjercicios = 0
var rtasCorrectas = 0
var rtasIncorrectas = 0
var errores = []


//OBTENGO LA LISTA DE PALABRAS A TRABAJAR
var conf = JSON.parse(localStorage.getItem('configuracion'));


//ejecucion del juego
getPalabras(listaPalabras);
var dosAleatorios = generateTwoRandoms();
var correcta = generateCorrect();
cargarJuego(dosAleatorios, correcta);



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

btn1.onclick = () => {
  cantEjercicios++;
  if (endGame(cantEjercicios, ejerciciosObjetivo)) {
    if (btn1.palabra == listaPalabras[dosAleatorios[correcta]].palabra) {
      nextPlay()
    } else {
      errores.push(listaPalabras[dosAleatorios[correcta]].palabra)
      rtasIncorrectas++
      console.log('Incorrecta');
    }
  } else {
    alert("Resultado: Correctas: " + rtasCorrectas + " Incorrectas: " + rtasIncorrectas)
    console.log(errores.sort())
  }
}

btn2.onclick = () => {
  cantEjercicios++;
  if (endGame(cantEjercicios, ejerciciosObjetivo)) {
    if (btn2.palabra == listaPalabras[dosAleatorios[correcta]].palabra) {
      nextPlay()
    } else {
      errores.push(listaPalabras[dosAleatorios[correcta]].palabra)
      rtasIncorrectas++
      console.log('Incorrecta');
    }
  } else {
    alert("Resultado: Correctas: " + rtasCorrectas + " Incorrectas: " + rtasIncorrectas)
    console.log(errores.sort())
  }
}



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
  var prefix = "../public/images/Imagenes_reales/"
  document.getElementById('correcta').innerHTML = listaPalabras[dosAleatorios[opcionCorrecta]].palabra;
  document.getElementById('im1').src = prefix + listaPalabras[dosAleatorios[0]].rutaReal;
  document.getElementById('im2').src = prefix + listaPalabras[dosAleatorios[1]].rutaReal;
  document.getElementById('im1').palabra = listaPalabras[dosAleatorios[0]].palabra;
  document.getElementById('im2').palabra = listaPalabras[dosAleatorios[1]].palabra;
}


function nextPlay() {
  dosAleatorios = generateTwoRandoms();
  correcta = generateCorrect();
  cargarJuego(dosAleatorios, correcta);
  rtasCorrectas++;
  console.log('Correcta');
}

function endGame(cantEjercicios, ejerciciosObjetivo) {
  return cantEjercicios <= ejerciciosObjetivo
}