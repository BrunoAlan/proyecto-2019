//Requiero la DB y la instacio
const app = require('electron').remote.app;
const path = require('path');
const Database = require('better-sqlite3');
let dbFile = path.join(app.getAppPath(), 'db.sqlite')
const db = new Database(dbFile, { verbose: console.log });
const listaPalabras = []
const btn1 = document.getElementById('im1');
const btn2 = document.getElementById('im2');
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
let dosAleatorios = generateTwoRandoms();
let correcta = generateCorrect();
cargarJuego(dosAleatorios, correcta);

btn1.onclick = () => {
  getAnswer()
}

btn2.onclick = () => {
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

/*Obtengo dos números aleatorios sin que se repitan y los retorno
 dentro de un array de 2 posiciones */

function generateTwoRandoms() {
  let lista = []
  while (lista.length < 2) {
    let random = Math.floor(Math.random() * listaPalabras.length) + 0;
    if (lista.indexOf(random) === -1) lista.push(random);
  }
  return lista;
}

/* Determino qué opción es la correcta 
Selecciono aleatoriamente una posición dentro del array generado por generateTwoRandoms()
*/
function generateCorrect() {
  let num1 = Math.floor(Math.random() * ((1 + 1) - 0) + 0);
  return num1
}

//Asigno a cada tag de img una palabra y la palabra target
function cargarJuego(dosAleatorios, opcionCorrecta) {
  if (tipoImg === "Imagen Real") {
    var prefix = "../public/images/Imagenes_reales/"
    document.getElementById('correcta').innerHTML = listaPalabras[dosAleatorios[opcionCorrecta]].palabra;
    document.getElementById('im1').src = prefix + listaPalabras[dosAleatorios[0]].rutaReal;
    document.getElementById('im2').src = prefix + listaPalabras[dosAleatorios[1]].rutaReal;
    document.getElementById('im1').palabra = listaPalabras[dosAleatorios[0]].palabra;
    document.getElementById('im2').palabra = listaPalabras[dosAleatorios[1]].palabra;
  } else {
    var prefix = "../public/images/Imagenes_dibujo/"
    document.getElementById('correcta').innerHTML = listaPalabras[dosAleatorios[opcionCorrecta]].palabra;
    document.getElementById('im1').src = prefix + listaPalabras[dosAleatorios[0]].rutaDibujo;
    document.getElementById('im2').src = prefix + listaPalabras[dosAleatorios[1]].rutaDibujo;
    document.getElementById('im1').palabra = listaPalabras[dosAleatorios[0]].palabra;
    document.getElementById('im2').palabra = listaPalabras[dosAleatorios[1]].palabra;
  }
}

//Si la respuesta es correcta se llama este método para cargar la nueva palabra target y opciones
function nextPlay() {
  dosAleatorios = generateTwoRandoms();
  correcta = generateCorrect();
  cargarJuego(dosAleatorios, correcta);
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
    if (event.srcElement.palabra == listaPalabras[dosAleatorios[correcta]].palabra) {
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