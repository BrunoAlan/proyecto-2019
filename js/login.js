const Swal = require('sweetalert2');
let btnIniciarSesion;
let btnNuevoDocente;
let btnEliminarDocente;
let div = document.getElementById('divEstudiantes');

btnIniciarSesion = document.getElementById('btnIniciarSesion');
btnNuevoDocente = document.getElementById('btnAgregarDocente');
btnEliminarDocente = document.getElementById('btnEliminarDocente');

let idSeleccionado;
let nombreSeleccionado;
let listaDocentes = [];
let displayNombre = document.getElementById('nombre');
let eliminarDocente = document.getElementById('eliminarEstudiante');
const { app } = require('electron').remote;
const path = require('path');
const Database = require('better-sqlite3');
const dbFile = path.join(app.getAppPath(), 'db.sqlite');
const db = new Database(dbFile);
const query = 'SELECT * FROM docentes';
const row = db.prepare(query);
const docenteDB = row.all();
docenteDB.forEach((docente) => {
	listaDocentes.push(docente);
});

for (let index = 0; index < listaDocentes.length; index++) {
	let nombreApellido = listaDocentes[index].nombre + ' ' + listaDocentes[index].apellido;
	let idDB = listaDocentes[index].id;
	let listItem = document.createElement('div');
	let pal = document.createElement('p');
	pal.setAttribute('class', 'nyap');
	listItem.setAttribute('class', 'col s6 estudiante');
	pal.innerHTML = nombreApellido;
	let img = document.createElement('img');
	img.setAttribute('class', 'circle noSeleccionado');
	img.setAttribute('hight', '100');
	img.setAttribute('width', '100');
	img.setAttribute('avatar', nombreApellido);
	img.setAttribute('nombre', listaDocentes[index].nombre);
	img.setAttribute('apellido', listaDocentes[index].apellido);
	img.setAttribute('id', listaDocentes[index].id);
	listItem.innerHTML += img.outerHTML;
	listItem.innerHTML += pal.outerHTML;
	div.appendChild(listItem);
}

div.addEventListener('click', (e) => {
	if (e.target.tagName === 'IMG') {
		idSeleccionado = e.target.getAttribute('id');
		nombreSeleccionado = e.target.getAttribute('avatar');
		blankAll();
		e.target.setAttribute('class', 'circle seleccionado');
		console.log(idSeleccionado);
	}
});

function blankAll() {
	let childs = document.getElementById('divEstudiantes').getElementsByTagName('img');
	for (let index = 0; index < childs.length; index++) {
		childs[index].setAttribute('class', 'circle noSeleccionado');
	}
}

btnNuevoDocente.addEventListener('click', (e) => {
	location.href = 'altaDocente.html';
});

btnIniciarSesion.addEventListener('click', (e) => {
	if (idSeleccionado != null) {
		localStorage.setItem('login', JSON.stringify({ nombreDocente: nombreSeleccionado }));
		location.href = 'index.html';
	} else {
		Swal.fire({
			width: 550,
			background: '#ffffff',
			title: 'SELECCIONE A UN DOCENTE ANTES DE INICIAR SESIÓN',
			showConfirmButton: false,
			timer: 2000
		});
	}
});

btnEliminarDocente.addEventListener('click', (e) => {
	if (nombreSeleccionado != undefined) {
		Swal.fire({
			title: `¿ESTÁ SEGURO DE ELIMINAR AL DOCENTE? \n\n ${nombreSeleccionado.toUpperCase()}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#86D6C6',
			cancelButtonColor: '#ffcc80',
			confirmButtonText: 'SI, ELIMINAR',
			cancelButtonText: 'CANCELAR'
		}).then((result) => {
			if (result.value) {
				deleteDocente();
			}
		});
	} else {
		Swal.fire({ title: 'DEBE SELECCIONAR A UN DOCENTE', confirmButtonColor: '#86D6C6', type: 'warning' });
	}
});

function deleteDocente() {
	let query = `DELETE FROM docentes WHERE docentes.id = "${idSeleccionado}"`;
	let row = db.prepare(query);
	row.run();
	location.href = 'login.html';
	//console.log(idSeleccionado);
}
