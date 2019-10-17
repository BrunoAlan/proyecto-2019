// Requiero la DB y la instacio
const { app } = require('electron').remote;
const path = require('path');
const Database = require('better-sqlite3');

const dbFile = path.join(app.getAppPath(), 'db.sqlite');
const db = new Database(dbFile, { verbose: console.log });
const listaPalabras = [];
const btn1 = document.getElementById('im1');
const btn2 = document.getElementById('im2');
const btn3 = document.getElementById('im3');
const btn4 = document.getElementById('im4');
const ejerciciosObjetivo = 2;
let cantEjercicios = 1;
let rtasCorrectas = 0;
let rtasIncorrectas = 0;
const errores = [];
const startTime = new Date();
let endTime;


/* Parametros de configuración del ejercicio
Obtengo los ids de las palabras a trabajar y el tipo de imagen */
const conf = JSON.parse(localStorage.getItem('configuracion'));
const pal = conf.palabras.toString();
const tipoImg = conf.tipo;


// Ejecucion de la lógica del ejercicio
getPalabras(listaPalabras);
let cuatroAleatorios = generateFourRandoms();
let correcta = generateCorrect();
cargarJuego(cuatroAleatorios, correcta);

btn1.onclick = () => {
  getAnswer();
};

btn2.onclick = () => {
  getAnswer();
};

btn3.onclick = () => {
  getAnswer();
};

btn4.onclick = () => {
  getAnswer();
};

// Fin ejecución de la lógica


// FUNCIONES

// Obtengo las palabras pasadas desde la configuración de la db

function getPalabras(listaPalabras) {
  // Armo mi query para trabajar con las palabras seleccionadas
  const query = 'SELECT * FROM palabras WHERE id in ' + '(' + pal + ')';
  const row = db.prepare(query);
  const palabrasDB = row.all();
  console.log(palabrasDB);
  palabrasDB.forEach((palabra) => {
    listaPalabras.push(palabra);
  });
}


/* Obtengo tres números aleatorios sin que se repitan y los retorno
 dentro de un array de 3 posiciones */
function generateFourRandoms() {
  const lista = [];
  while (lista.length < 4) {
    const random = Math.floor(Math.random() * listaPalabras.length) + 0;
    if (lista.indexOf(random) === -1) lista.push(random);
  }
  return lista;
}

/* Determino qué opción es la correcta
Selecciono aleatoriamente una posición dentro del array generado por generateThreeRandoms()
*/
function generateCorrect() {
  const num1 = Math.floor(Math.random() * ((1 + 3) - 0) + 0);
  return num1;
}

// Asigno a cada tag de img una palabra y la palabra target
function cargarJuego(cuatroAleatorios, opcionCorrecta) {
  if (tipoImg === 'Imagen Real') {
    var prefix = '../public/images/Imagenes_reales/';
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
    var prefix = '../public/images/Imagenes_dibujo/';
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

// Si la respuesta es correcta se llama este método para cargar la nueva palabra target y opciones
function nextPlay() {
  cuatroAleatorios = generateFourRandoms();
  correcta = generateCorrect();
  cargarJuego(cuatroAleatorios, correcta);
  rtasCorrectas++;
  console.log('Correcta');
}

// Controla si debe terminar el ejercicio
function endGame(cantEjercicios, ejerciciosObjetivo) {
  return cantEjercicios === ejerciciosObjetivo;
}

// Muestro los resultados al terminar el ejercicio
function displayResults() {
  endTime = new Date();
  const tiempoTrasncurrido = endTime - startTime;
  alert('Resultado: Correctas: ' + rtasCorrectas + ' Incorrectas: ' + rtasIncorrectas);
  console.log(`Respuestas incorrectas: ${JSON.stringify(errores)},
  Tiempo transcurrido: ${tiempoTrasncurrido / 1000} segundos`); // console.log(errores)
}

// Obtengo la respuesta de los clicks en las imágenes
function getAnswer() {
  console.log(`cantidad de ejercicios realizados: ${cantEjercicios},
  ejercicios objetivo: ${ejerciciosObjetivo}`)
  cantEjercicios++;
  if (endGame(cantEjercicios, ejerciciosObjetivo)) {
    if (event.srcElement.palabra == listaPalabras[cuatroAleatorios[correcta]].palabra) {
      nextPlay();
    } else {
      errores.push({ 'target': listaPalabras[cuatroAleatorios[correcta]].palabra, 'error': event.srcElement.palabra });
      rtasIncorrectas++;
      console.log('Incorrecta');
    }
  } else {
    displayResults();
  }
}
