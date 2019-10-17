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

const ejerciciosObjetivo = 10;
let cantEjercicios = 0;
let rtasCorrectas = 0;
let rtasIncorrectas = 0;
const errores = [];


/* Parametros de configuración del ejercicio
Obtengo los ids de las palabras a trabajar y el tipo de imagen */
const conf = JSON.parse(localStorage.getItem('configuracion'));
const pal = conf.palabras.toString();
const tipoImg = conf.tipo;


// Ejecucion de la lógica del ejercicio

getPalabras(listaPalabras);
let tresAleatorios = generateThreeRandoms();
let correcta = generateCorrect();
cargarJuego(tresAleatorios, correcta);

btn1.onclick = () => {
  getAnswer();
};

btn2.onclick = () => {
  getAnswer();
};

btn3.onclick = () => {
  getAnswer();
};

// Fin ejecución de la lógica


// FUNCIONES

// Obtengo las palabras pasadas desde la configuración de la db
function getPalabras(listaPalabras) {
  // Armo mi query para trabajar con las palabras seleccionadas
  const query = `${'SELECT * FROM palabras WHERE id in ' + '('}${pal})`;
  const row = db.prepare(query);
  const palabrasDB = row.all();
  console.log(palabrasDB);
  palabrasDB.forEach((palabra) => {
    listaPalabras.push(palabra);
  });
}

/* Obtengo tres números aleatorios sin que se repitan y los retorno
 dentro de un array de 3 posiciones */
function generateThreeRandoms() {
  const lista = [];
  while (lista.length < 3) {
    const random = Math.floor(Math.random() * listaPalabras.length) + 0;
    if (lista.indexOf(random) === -1) lista.push(random);
  }
  return lista;
}


/* Determino qué opción es la correcta
Selecciono aleatoriamente una posición dentro del array generado por generateThreeRandoms()
*/
function generateCorrect() {
  const num1 = Math.floor(Math.random() * ((1 + 2) - 0) + 0);
  return num1;
}


// Asigno a cada tag de img una palabra y la palabra target
function cargarJuego(tresAleatorios, opcionCorrecta) {
  if (tipoImg === 'Imagen Real') {
    var prefix = '../public/images/Imagenes_reales/';
    document.getElementById('correcta').innerHTML = listaPalabras[tresAleatorios[opcionCorrecta]].palabra;
    document.getElementById('im1').src = prefix + listaPalabras[tresAleatorios[0]].rutaReal;
    document.getElementById('im2').src = prefix + listaPalabras[tresAleatorios[1]].rutaReal;
    document.getElementById('im3').src = prefix + listaPalabras[tresAleatorios[2]].rutaReal;
    document.getElementById('im1').palabra = listaPalabras[tresAleatorios[0]].palabra;
    document.getElementById('im2').palabra = listaPalabras[tresAleatorios[1]].palabra;
    document.getElementById('im3').palabra = listaPalabras[tresAleatorios[2]].palabra;
  } else {
    var prefix = '../public/images/Imagenes_dibujo/';
    document.getElementById('correcta').innerHTML = listaPalabras[tresAleatorios[opcionCorrecta]].palabra;
    document.getElementById('im1').src = prefix + listaPalabras[tresAleatorios[0]].rutaDibujo;
    document.getElementById('im2').src = prefix + listaPalabras[tresAleatorios[1]].rutaDibujo;
    document.getElementById('im3').src = prefix + listaPalabras[tresAleatorios[2]].rutaDibujo;
    document.getElementById('im1').palabra = listaPalabras[tresAleatorios[0]].palabra;
    document.getElementById('im2').palabra = listaPalabras[tresAleatorios[1]].palabra;
    document.getElementById('im3').palabra = listaPalabras[tresAleatorios[2]].palabra;
  }
}

// Si la respuesta es correcta se llama este método para cargar la nueva palabra target y opciones
function nextPlay() {
  tresAleatorios = generateThreeRandoms();
  correcta = generateCorrect();
  cargarJuego(tresAleatorios, correcta);
  rtasCorrectas++;
  console.log('Correcta');
}

// Controla si debe terminar el ejercicio
function endGame(cantEjercicios, ejerciciosObjetivo) {
  return cantEjercicios <= ejerciciosObjetivo;
}

// Obtengo la respuesta de los clicks en las imágenes
function getAnswer() {
  cantEjercicios++;
  if (endGame(cantEjercicios, ejerciciosObjetivo)) {
    if (event.srcElement.palabra == listaPalabras[tresAleatorios[correcta]].palabra) {
      nextPlay();
    } else {
      errores.push(listaPalabras[tresAleatorios[correcta]].palabra);
      rtasIncorrectas++;
      console.log('Incorrecta');
    }
  } else {
    alert(`Resultado: Correctas: ${rtasCorrectas} Incorrectas: ${rtasIncorrectas}`);
    console.log(errores.sort());
  }
}
