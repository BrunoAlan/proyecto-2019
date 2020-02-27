// Requiero la DB y la instacio
const Swal = require('sweetalert2');
const { app } = require('electron').remote;
const path = require('path');
const Database = require('better-sqlite3');
const prefixReal = '../public/images/Imagenes_reales/';
const prefixDibujo = '../public/images/Imagenes_dibujo/';
const dbFile = path.join(app.getAppPath(), 'db.sqlite');
const db = new Database(dbFile);
let listaPalabras = [];
let listaDistractoresCercanos = [];
let listaDistractoresLejanos = [];
let listaEjercicio = [];
const btn1 = document.getElementById('im1');
const btn2 = document.getElementById('im2');
const btn3 = document.getElementById('im3');

let ejerciciosObjetivo;
let cantEjercicios = 0;
let rtasCorrectas = 0;
let rtasIncorrectas = 0;
let errores = [];

/* Parametros de configuración del ejercicio
Obtengo los ids de las palabras a trabajar y el tipo de imagen */
const conf = JSON.parse(localStorage.getItem('configuracion'));
const pal = conf.palabras.toString();
const tipoImg = conf.tipo;
const estudiante = conf.estudiante;
const nombreEstudiante = conf.nombreEstudiante;
ejerciciosObjetivo = conf.repeticiones;

const stmt = db.prepare("INSERT INTO RESULTADOS (id_estudiante, fecha) VALUES (?, datetime('now', 'localtime'))");
const info = stmt.run(estudiante);
let idUltimoResultado = info.lastInsertRowid;

conf.palabras.forEach((palabra) => {
	const stmt = db.prepare('INSERT INTO resultadosPalabras (id_resultado, id_palabra) VALUES (?, ?)');
	const info = stmt.run(idUltimoResultado, palabra);
});

// Ejecucion de la lógica del ejercicio

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
	palabrasDB.forEach((palabra) => {
		listaPalabras.push(palabra);
	});
}

// Si la respuesta es correcta se llama este método para cargar la nueva palabra target y opciones
function nextPlay() {
	palabraTarget = getPalabraTarget(listaPalabras);
	getListaDistractoresCercanos(listaDistractoresCercanos, palabraTarget);
	getListaDistractoresLejano(listaDistractoresLejanos, palabraTarget);
	setExercise(listaEjercicio, palabraTarget);
	shuffleExercise(listaEjercicio);
	setImages();
}

// Controla si debe terminar el ejercicio
function endGame(cantEjercicios, ejerciciosObjetivo) {
	return cantEjercicios >= ejerciciosObjetivo;
}

// Obtengo la respuesta de los clicks en las imágenes
function getAnswer() {
	if (event.srcElement.palabra == palabraTarget.palabra) {
		rtasCorrectas++;
		const arrayAciertos = ['¡MUY BIEN!', '¡EXCELENTE!', '¡BRAVO!', '¡GRANDIOSO!', '¡ESTUPENDO!', '¡FANTASTICO!'];
		const singleacierto = arrayAciertos[Math.floor(Math.random() * arrayAciertos.length)];
		Swal.fire({
			imageUrl: '../public/images/Felicitaciones.png',
			width: 400,
			imageWidth: 200,
			imageHeight: 300,
			background: '#e4f2f0',
			title: singleacierto,
			showConfirmButton: false,
			timer: 2000
		});
		nextPlay();
	} else {
		errores.push(palabraTarget.palabra);
		const arrayerror = ['¡INTENTALO OTRA VEZ!', '¡INTENTALO NUEVAMENTE!'];
		const singlerror = arrayerror[Math.floor(Math.random() * arrayerror.length)];
		Swal.fire({
			imageUrl: '../public/images/otravez.png',
			width: 400,
			imageWidth: 200,
			imageHeight: 300,
			background: '#e4f2f0',
			title: singlerror,
			showConfirmButton: false,
			timer: 2000
		});
		rtasIncorrectas++;
	}
	cantEjercicios++;
	if (endGame(cantEjercicios, ejerciciosObjetivo)) {
		sessionStorage.setItem('nombreDias', nombreEstudiante);
		window.location = '../views/festejofinal.html';
	}
}

function getPalabraTarget(listaPalabras) {
	let random = Math.floor(Math.random() * listaPalabras.length);
	return listaPalabras[random];
}

function getListaDistractoresCercanos(listaDistractoresCercanos, palabraTarget) {
	const query = `SELECT * FROM palabras WHERE palabras.categoriaSemantica = "${palabraTarget.categoriaSemantica}" 
                    AND palabras.palabra <> "${palabraTarget.palabra}" `;
	const row = db.prepare(query);
	const listaAux = row.all();
	listaDistractoresCercanos.length = 0;
	listaAux.forEach((palabra) => {
		listaDistractoresCercanos.push(palabra);
	});
}

function getListaDistractoresLejano(listaDistractoresLejanos, palabraTarget) {
	const query = `SELECT * FROM palabras WHERE palabras.categoriaSemantica <>"${palabraTarget.categoriaSemantica}" AND palabras.categoriaSemantica !="Resultados" `;
	const row = db.prepare(query);
	const listaAux = row.all();
	listaDistractoresLejanos.length = 0;
	listaAux.forEach((palabra) => {
		listaDistractoresLejanos.push(palabra);
	});
}

function setExercise(listaEjercicio, palabraTarget) {
	listaEjercicio.length = 0;
	listaEjercicio.push(palabraTarget);
	listaEjercicio.push(listaDistractoresCercanos[Math.floor(Math.random() * listaDistractoresCercanos.length)]);
	listaEjercicio.push(listaDistractoresLejanos[Math.floor(Math.random() * listaDistractoresLejanos.length)]);
}

function shuffleExercise(listaEjercicio) {
	for (let i = listaEjercicio.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[listaEjercicio[i], listaEjercicio[j]] = [listaEjercicio[j], listaEjercicio[i]];
	}
}

function setImages() {
	let prefix;
	if (tipoImg == 'Imagen Real') {
		prefix = prefixReal;
		document.getElementById('correcta').innerHTML = palabraTarget.palabra;
		document.getElementById('im1').src = prefix + listaEjercicio[0].rutaReal;
		document.getElementById('im2').src = prefix + listaEjercicio[1].rutaReal;
		document.getElementById('im3').src = prefix + listaEjercicio[2].rutaReal;
		document.getElementById('im1').palabra = listaEjercicio[0].palabra;
		document.getElementById('im2').palabra = listaEjercicio[1].palabra;
		document.getElementById('im3').palabra = listaEjercicio[2].palabra;
	} else {
		prefix = prefixDibujo;
		document.getElementById('correcta').innerHTML = palabraTarget.palabra;
		document.getElementById('im1').src = prefix + listaEjercicio[0].rutaDibujo;
		document.getElementById('im2').src = prefix + listaEjercicio[1].rutaDibujo;
		document.getElementById('im3').src = prefix + listaEjercicio[2].rutaDibujo;
		document.getElementById('im1').palabra = listaEjercicio[0].palabra;
		document.getElementById('im2').palabra = listaEjercicio[1].palabra;
		document.getElementById('im3').palabra = listaEjercicio[2].palabra;
	}
}

getPalabras(listaPalabras);
let palabraTarget = getPalabraTarget(listaPalabras);
getListaDistractoresCercanos(listaDistractoresCercanos, palabraTarget);
getListaDistractoresLejano(listaDistractoresLejanos, palabraTarget);
setExercise(listaEjercicio, palabraTarget);
shuffleExercise(listaEjercicio);
setImages();
