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
const btn4 = document.getElementById('im4');
let ejerciciosObjetivo = 10
let cantEjercicios = 0
let rtasCorrectas = 0
let rtasIncorrectas = 0
let errores = []




/* Parametros de configuración del ejercicio
Obtengo los ids de las palabras a trabajar y el tipo de imagen */
let conf = JSON.parse(localStorage.getItem('configuracion'));
let pal = conf.palabras.toString();
let tipoImg = conf.tipo



//Ejecucion de la lógica del ejercicio
getPalabras(listaPalabras);
let cuatroAleatorios = generateFourRandoms();
let correcta = generateCorrect();
cargarJuego(cuatroAleatorios, correcta);

btn1.onclick = () => {
  getAnswer()
}

btn2.onclick = () => {
  getAnswer()
}

btn3.onclick = () => {
  getAnswer()
}

btn4.onclick = () => {
  getAnswer()
}

//Fin ejecución de la lógica


//FUNCIONES 

//Obtengo las palabras pasadas desde la configuración de la db

function getPalabras(listaPalabras) {
  //Armo mi query para trabajar con las palabras seleccionadas
  let query = "SELECT * FROM palabras WHERE id in " + "(" + pal + ")"
  let row = db.prepare(query)
  let palabrasDB = row.all();
  console.log(palabrasDB);
  palabrasDB.forEach(palabra => {
    listaPalabras.push(palabra)
  });
}


/*Obtengo tres números aleatorios sin que se repitan y los retorno
 dentro de un array de 3 posiciones */
function generateFourRandoms() {
  let lista = []
  while (lista.length < 4) {
    let random = Math.floor(Math.random() * listaPalabras.length) + 0;
    if (lista.indexOf(random) === -1) lista.push(random);
  }
  return lista;
}

/* Determino qué opción es la correcta 
Selecciono aleatoriamente una posición dentro del array generado por generateThreeRandoms()
*/
function generateCorrect() {
  let num1 = Math.floor(Math.random() * ((1 + 3) - 0) + 0);
  return num1
}

//Asigno a cada tag de img una palabra y la palabra target
function cargarJuego(cuatroAleatorios, opcionCorrecta) {
  if (tipoImg === "Imagen Real") {
    var prefix = "../public/images/Imagenes_reales/"
    document.getElementById('correcta').innerHTML = listaPalabras[cuatroAleatorios[opcionCorrecta]].palabra;
    document.getElementById('im1').src = prefix + listaPalabras[cuatroAleatorios[0]].rutaReal;
    document.getElementById('im2').src = prefix + listaPalabras[cuatroAleatorios[1]].rutaReal;
    document.getElementById('im3').src = prefix + listaPalabras[cuatroAleatorios[2]].rutaReal;
    document.getElementById('im4').src = prefix + listaPalabras[cuatroAleatorios[3]].rutaReal;
    document.getElementById('im1').palabra = listaPalabras[cuatroAleatorios[0]].palabra;
    document.getElementById('im2').palabra = listaPalabras[cuatroAleatorios[1]].palabra;
    document.getElementById('im3').palabra = listaPalabras[cuatroAleatorios[2]].palabra;
    document.getElementById('im4').palabra = listaPalabras[cuatroAleatorios[3]].palabra;
  } else {
    var prefix = "../public/images/Imagenes_dibujo/"
    document.getElementById('correcta').innerHTML = listaPalabras[cuatroAleatorios[opcionCorrecta]].palabra;
    document.getElementById('im1').src = prefix + listaPalabras[cuatroAleatorios[0]].rutaDibujo;
    document.getElementById('im2').src = prefix + listaPalabras[cuatroAleatorios[1]].rutaDibujo;
    document.getElementById('im3').src = prefix + listaPalabras[cuatroAleatorios[2]].rutaDibujo;
    document.getElementById('im4').src = prefix + listaPalabras[cuatroAleatorios[3]].rutaDibujo;
    document.getElementById('im1').palabra = listaPalabras[cuatroAleatorios[0]].palabra;
    document.getElementById('im2').palabra = listaPalabras[cuatroAleatorios[1]].palabra;
    document.getElementById('im3').palabra = listaPalabras[cuatroAleatorios[2]].palabra;
    document.getElementById('im4').palabra = listaPalabras[cuatroAleatorios[3]].palabra;
  }
}

//Si la respuesta es correcta se llama este método para cargar la nueva palabra target y opciones
function nextPlay() {
  cuatroAleatorios = generateFourRandoms();
  correcta = generateCorrect();
  cargarJuego(cuatroAleatorios, correcta);
  rtasCorrectas++;
  console.log('Correcta');
}

//Controla si debe terminar el ejercicio
function endGame(cantEjercicios, ejerciciosObjetivo) {
  return cantEjercicios <= ejerciciosObjetivo
}

//Obtengo la respuesta de los clicks en las imágenes
function getAnswer() {
  cantEjercicios++;
  if (endGame(cantEjercicios, ejerciciosObjetivo)) {
    if (event.srcElement.palabra == listaPalabras[cuatroAleatorios[correcta]].palabra) {
      nextPlay()
    } else {
      errores.push(listaPalabras[cuatroAleatorios[correcta]].palabra)
      rtasIncorrectas++
      console.log('Incorrecta');
    }
  } else {
    alert("Resultado: Correctas: " + rtasCorrectas + " Incorrectas: " + rtasIncorrectas)
    console.log(errores.sort())
  }
}