let btnIniciarSesion;
let btnNuevoDocente;
let div = document.getElementById('divEstudiantes');

btnIniciarSesion = document.getElementById('btnIniciarSesion');
btnNuevoDocente = document.getElementById('btnAgregarDocente');

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
		console.log(nombreSeleccionado);
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
		alert('Seleccione un docente antes de iniciar sesion');
	}
});
