﻿const Swal = require('sweetalert2');

const lunes = document.getElementById('lunes');
const martes = document.getElementById('martes');
const miercoles = document.getElementById('miercoles');
const jueves = document.getElementById('jueves');
const viernes = document.getElementById('viernes');
const sabado = document.getElementById('sabado');
const domingo = document.getElementById('domingo');
const siguiente = document.getElementById('siguiente');

siguiente.style.visibility = 'hidden';

// Obtengo la fecha del sistema

const date = new Date();
const diasSemana = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');

const hoy = diasSemana[date.getDay()];
let ayer;
if (hoy == 'Domingo') {
	ayer = 'Sábado';
} else {
	ayer = diasSemana[date.getDay() - 1];
}
const manana = diasSemana[(date.getDay() + 1) % 7];

// Obtengo el html desde el que estoy requiriendo este js
// me devuelve diasSemanaHoy.html , diasSemanaAyer.html o diasSemanaManana.html
const locat = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

switch (locat) {
	case 'diasSemanaHoy.html':
		setToday();
		break;
	case 'diasSemanaAyer.html':
		setYesterday();
		break;
	case 'diasSemanaManana.html':
		setTomorrow();
		break;
}

// Función que determina si el día elegido es correcto
function verificarDia(diaCorrecto, diaElegido, ejercicio) {
	if (diaCorrecto == diaElegido) {
		const arrayAciertos = ['¡MUY BIEN!', '¡EXCELENTE!', '¡BRAVO!', '¡GRANDIOSO!', '¡ESTUPENDO!', '¡FANTASTICO!'];
		const singleacierto = arrayAciertos[Math.floor(Math.random() * arrayAciertos.length)];

		Swal.fire({
			imageUrl: '../public/images/Felicitaciones.png',
			width: 400,
			imageWidth: 200,
			imageHeight: 300,
			background: '#ffffff',
			title: singleacierto,
			showConfirmButton: false,
			timer: 2000
		});
		cambiarDía(diaElegido, ejercicio);
		document.getElementById('siguiente').style.visibility = 'visible';
		switch (ejercicio) {
			case 'hoy':
				siguiente.addEventListener('click', () => {
					location.href = 'diasSemanaAyer.html';
				});

				break;
			case 'ayer':
				siguiente.addEventListener('click', () => {
					location.href = 'diasSemanaManana.html';
				});
				break;
			case 'manana':
				siguiente.addEventListener('click', () => {
					location.href = 'festejofinal.html';
				});
				break;
		}
	} else {
		const arrayerror = ['¡INTENTALO OTRA VEZ!', '¡INTENTALO NUEVAMENTE!'];
		const singlerror = arrayerror[Math.floor(Math.random() * arrayerror.length)];
		Swal.fire({
			imageUrl: '../public/images/otravez.png',
			width: 400,
			imageWidth: 200,
			imageHeight: 300,
			background: '#ffffff',
			title: singlerror,
			showConfirmButton: false,
			timer: 2000
		});
	}
}

// Función que coloca el día correcto en el título del ejercicio

function cambiarDía(dia, ejercicio) {
	switch (ejercicio) {
		case 'hoy':
			textoResolucion.innerHTML = `HOY ES  ${dia.toUpperCase()}`;
			break;
		case 'ayer':
			textoResolucion.innerHTML = `AYER FUE  ${dia.toUpperCase()}`;
			break;
		case 'manana':
			textoResolucion.innerHTML = `MAÑANA ES ${dia.toUpperCase()}`;
			break;
	}
}

// LÓGICA DEL EJERCICIO

// Dia de hoy
function setToday() {
	lunes.addEventListener('click', (e) => {
		verificarDia(hoy, 'Lunes', 'hoy');
	});

	martes.addEventListener('click', (e) => {
		verificarDia(hoy, 'Martes', 'hoy');
	});

	miercoles.addEventListener('click', (e) => {
		verificarDia(hoy, 'Miércoles', 'hoy');
	});

	jueves.addEventListener('click', (e) => {
		verificarDia(hoy, 'Jueves', 'hoy');
	});

	viernes.addEventListener('click', (e) => {
		verificarDia(hoy, 'Viernes', 'hoy');
	});
	sabado.addEventListener('click', (e) => {
		verificarDia(hoy, 'Sábado', 'hoy');
	});
	domingo.addEventListener('click', (e) => {
		verificarDia(hoy, 'Domingo', 'hoy');
	});
}

// Día de mañana
function setTomorrow() {
	const siguiente = document.getElementById('siguiente');
	siguiente.innerText = 'Finalizar';

	lunes.addEventListener('click', (e) => {
		verificarDia(manana, 'Lunes', 'manana');
	});

	martes.addEventListener('click', (e) => {
		verificarDia(manana, 'Martes', 'manana');
	});

	miercoles.addEventListener('click', (e) => {
		verificarDia(manana, 'Miércoles', 'manana');
	});

	jueves.addEventListener('click', (e) => {
		verificarDia(manana, 'Jueves', 'manana');
	});

	viernes.addEventListener('click', (e) => {
		verificarDia(manana, 'Viernes', 'manana');
	});
	sabado.addEventListener('click', (e) => {
		verificarDia(manana, 'Sábado', 'manana');
	});
	domingo.addEventListener('click', (e) => {
		verificarDia(manana, 'Domingo', 'manana');
	});
}

// Día de ayer
function setYesterday() {
	lunes.addEventListener('click', (e) => {
		verificarDia(ayer, 'Lunes', 'ayer');
	});

	martes.addEventListener('click', (e) => {
		verificarDia(ayer, 'Martes', 'ayer');
	});

	miercoles.addEventListener('click', (e) => {
		verificarDia(ayer, 'Miércoles', 'ayer');
	});

	jueves.addEventListener('click', (e) => {
		verificarDia(ayer, 'Jueves', 'ayer');
	});

	viernes.addEventListener('click', (e) => {
		verificarDia(ayer, 'Viernes', 'ayer');
	});
	sabado.addEventListener('click', (e) => {
		verificarDia(ayer, 'Sábado', 'ayer');
	});
	domingo.addEventListener('click', (e) => {
		verificarDia(ayer, 'Domingo', 'ayer');
	});
}

//Guardo los resultados en la db
const { app } = require('electron').remote;
const path = require('path');
const Database = require('better-sqlite3');
const dbFile = path.join(app.getAppPath(), 'db.sqlite');
const db = new Database(dbFile);
let idSeleccionado = sessionStorage.getItem('idNombreDías');

const stmt = db.prepare("INSERT INTO RESULTADOS (id_estudiante, fecha) VALUES (?, datetime('now', 'localtime'))");
const info = stmt.run(idSeleccionado);
let idUltimoResultado = info.lastInsertRowid;

const queryRes = db.prepare(`SELECT id FROM palabras WHERE palabras.categoriaSemantica = "Resultados"`);
let idRes = queryRes.all();
console.log(idRes[0].id);

let stmt2 = db.prepare('INSERT INTO resultadosPalabras (id_resultado, id_palabra) VALUES (?, ?)');
const info2 = stmt2.run(idUltimoResultado, idRes[0].id);

console.log(hoy, ayer, manana, date.getDay());
