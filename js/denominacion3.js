//Requiero la DB y la instacio
const app = require('electron').remote.app;
const path = require('path');
const Database = require('better-sqlite3');
let dbFile = path.join(app.getAppPath(), 'db.sqlite')
const db = new Database(dbFile, { verbose: console.log });
const listaPalabras = []
const btn1 = document.getElementById('im1');
const btn2 = document.getElementById('im2');
const btn3 = document.getElementById('im3');

let ejerciciosObjetivo = 10
let cantEjercicios = 0
let rtasCorrectas = 0
let rtasIncorrectas = 0
let errores = []


//OBTENGO LA LISTA DE PALABRAS A TRABAJAR Y EL TIPO DE IMAGEN
let conf = JSON.parse(localStorage.getItem('configuracion'));
let pal = conf.palabras.toString();
let tipoImg = conf.tipo



//EJECUCION DEL JUEGO
getPalabras(listaPalabras);
let tresAleatorios = generateThreeRandoms();
let correcta = generateCorrect();

console.log(`${tresAleatorios} ${correcta}`)
cargarJuego(tresAleatorios, correcta);



function getPalabras(listaPalabras) {
  //ARMO MI QUERY PARA TRABAJAR CON LAS PALABRAS QUE ME PASARON DE LA CONFIG.
  let query = "SELECT * FROM palabras WHERE id in " + "(" + pal + ")"
  let row = db.prepare(query)
  let palabrasDB = row.all();
  console.log(palabrasDB);
  palabrasDB.forEach(palabra => {
    listaPalabras.push(palabra)
  });
}

btn1.onclick = () => {
  cantEjercicios++;
  if (endGame(cantEjercicios, ejerciciosObjetivo)) {
    if (btn1.palabra == listaPalabras[tresAleatorios[correcta]].palabra) {
      nextPlay()
    } else {
      errores.push(listaPalabras[tresAleatorios[correcta]].palabra)
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
    if (btn2.palabra == listaPalabras[tresAleatorios[correcta]].palabra) {
      nextPlay()
    } else {
      errores.push(listaPalabras[tresAleatorios[correcta]].palabra)
      rtasIncorrectas++
      console.log('Incorrecta');
    }
  } else {
    alert("Resultado: Correctas: " + rtasCorrectas + " Incorrectas: " + rtasIncorrectas)
    console.log(errores.sort())
  }
}

btn3.onclick = () => {
  cantEjercicios++;
  if (endGame(cantEjercicios, ejerciciosObjetivo)) {
    if (btn3.palabra == listaPalabras[tresAleatorios[correcta]].palabra) {
      nextPlay()
    } else {
      errores.push(listaPalabras[tresAleatorios[correcta]].palabra)
      rtasIncorrectas++
      console.log('Incorrecta');
    }
  } else {
    alert("Resultado: Correctas: " + rtasCorrectas + " Incorrectas: " + rtasIncorrectas)
    console.log(errores.sort())
  }
}

//Obtengo dos números aleatorios sin que se repitan
function generateThreeRandoms() {
  let lista = []
  while (lista.length < 3) {
    let random = Math.floor(Math.random() * listaPalabras.length) + 0;
    if (lista.indexOf(random) === -1) lista.push(random);
  }
  return lista;

}

//Determino qué opción es la correcta
function generateCorrect() {
  let num1 = Math.floor(Math.random() * ((1 + 2) - 0) + 0);
  return num1
}


function cargarJuego(tresAleatorios, opcionCorrecta) {
  if (tipoImg === "Imagen Real") {
    var prefix = "../public/images/Imagenes_reales/"
    document.getElementById('correcta').innerHTML = listaPalabras[tresAleatorios[opcionCorrecta]].palabra;
    document.getElementById('im1').src = prefix + listaPalabras[tresAleatorios[0]].rutaReal;
    document.getElementById('im2').src = prefix + listaPalabras[tresAleatorios[1]].rutaReal;
    document.getElementById('im3').src = prefix + listaPalabras[tresAleatorios[2]].rutaReal;

    document.getElementById('im1').palabra = listaPalabras[tresAleatorios[0]].palabra;
    document.getElementById('im2').palabra = listaPalabras[tresAleatorios[1]].palabra;
    document.getElementById('im3').palabra = listaPalabras[tresAleatorios[2]].palabra;

  } else {
    var prefix = "../public/images/Imagenes_dibujo/"
    document.getElementById('correcta').innerHTML = listaPalabras[tresAleatorios[opcionCorrecta]].palabra;
    document.getElementById('im1').src = prefix + listaPalabras[tresAleatorios[0]].rutaDibujo;
    document.getElementById('im2').src = prefix + listaPalabras[tresAleatorios[1]].rutaDibujo;
    document.getElementById('im3').src = prefix + listaPalabras[tresAleatorios[2]].rutaDibujo;

    document.getElementById('im1').palabra = listaPalabras[tresAleatorios[0]].palabra;
    document.getElementById('im2').palabra = listaPalabras[tresAleatorios[1]].palabra;
    document.getElementById('im3').palabra = listaPalabras[tresAleatorios[2]].palabra;

  }
}


function nextPlay() {
  tresAleatorios = generateThreeRandoms();
  correcta = generateCorrect();
  cargarJuego(tresAleatorios, correcta);
  rtasCorrectas++;
  console.log('Correcta');
}

function endGame(cantEjercicios, ejerciciosObjetivo) {
  return cantEjercicios <= ejerciciosObjetivo
}