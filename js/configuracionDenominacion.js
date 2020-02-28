const Swal = require('sweetalert2');

document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems);
});

let listaAlumnos = [];
let listaPalabras = [];
var idEstudiante;
let nombreEstudiante;
const { app } = require('electron').remote;
const path = require('path');
const Database = require('better-sqlite3');
const dbFile = path.join(app.getAppPath(), 'db.sqlite');
const db = new Database(dbFile);
let query = 'SELECT * FROM estudiantes';
let row = db.prepare(query);
let alumnosDB = row.all();
alumnosDB.forEach((alumno) => {
	listaAlumnos.push(alumno);
});

query = 'SELECT * FROM palabras WHERE palabras.categoriaSemantica != "Resultados"';
//query = 'SELECT * FROM palabras';
row = db.prepare(query);
const palabrasDB = row.all();
palabrasDB.forEach((palabra) => {
	listaPalabras.push(palabra);
});

var ul = document.getElementById('listaPalabras');
for (let index = 0; index < listaPalabras.length; index++) {
	let palabra = listaPalabras[index].palabra;
	let idDB = listaPalabras[index].id;
	let categoria = listaPalabras[index].categoriaSemantica;
	let listItem = document.createElement('li');
	listItem.setAttribute('idDB', idDB);
	listItem.setAttribute('class', 'collection-item palabras');
	listItem.textContent = palabra.toUpperCase();
	listItem.setAttribute('categoria', categoria);
	ul.appendChild(listItem);
}

let listaSeleccionados = document.getElementById('seleccionados');
let asd = document.querySelector('#listaPalabras ');
asd.addEventListener('click', (e) => {
	if (e.target.tagName === 'LI') {
		listaSeleccionados.appendChild(e.target);
	}
});

let listPalabras = document.getElementById('listaPalabras');
let asd2 = document.querySelector('#seleccionados');
asd2.addEventListener('click', (e) => {
	if (e.target.tagName === 'LI') {
		listPalabras.appendChild(e.target);
	}
});

let div = document.getElementById('divEstudiantes');
div.addEventListener('click', (e) => {
	if (e.target.tagName === 'IMG') {
		blankAllEstudiantes();
		e.target.setAttribute('class', 'circle avatar seleccionado');
		idEstudiante = e.target.getAttribute('idDB');
		nombreEstudiante = e.target.getAttribute('avatar');
		console.log(idEstudiante);
	}
});

for (let index = 0; index < listaAlumnos.length; index++) {
	let nombreApellido = listaAlumnos[index].nombre + ' ' + listaAlumnos[index].apellido;
	let idDB = listaAlumnos[index].id;
	let listItem = document.createElement('div');
	let pal = document.createElement('p');
	pal.setAttribute('class', 'nyap');
	listItem.setAttribute('class', 'col s6 estudiante');
	pal.innerHTML = nombreApellido;

	let img = document.createElement('img');
	img.setAttribute('class', 'circle avatar noSeleccionado ');
	img.setAttribute('hight', '80');
	img.setAttribute('width', '80');
	img.setAttribute('avatar', nombreApellido);
	img.setAttribute('nombre', listaAlumnos[index].nombre);
	img.setAttribute('apellido', listaAlumnos[index].apellido);
	img.setAttribute('edad', listaAlumnos[index].edad);
	img.setAttribute('descripcion', listaAlumnos[index].descripcion);
	img.setAttribute('idDB', listaAlumnos[index].id);
	listItem.innerHTML += img.outerHTML;
	listItem.innerHTML += pal.outerHTML;
	div.appendChild(listItem);
}

let searchBarEstudiante = document.getElementById('buscarEstudiante').addEventListener('keyup', searchNombre);
function searchNombre() {
	var input, i, filter, li, ul, txtValue;
	input = document.getElementById('buscarEstudiante');
	filter = input.value.toUpperCase();
	let childs = document.getElementById('divEstudiantes').getElementsByTagName('img');
	for (i = 0; i < childs.length; i++) {
		a = childs[i].getAttribute('nombre') + ' ' + childs[i].getAttribute('apellido');
		txtValue = a;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			childs[i].parentElement.style.display = '';
		} else {
			childs[i].parentElement.style.display = 'none';
		}
	}
}

let searchBarPalabra = document.getElementById('buscarPalabra').addEventListener('keyup', searchPalabra);
function searchPalabra() {
	var input, i, filter, li, ul, txtValue;
	input = document.getElementById('buscarPalabra');
	filter = input.value.toUpperCase();
	ul = document.getElementById('listaPalabras');
	li = ul.getElementsByTagName('li');

	for (i = 0; i < li.length; i++) {
		a = li[i].textContent;
		b = li[i].getAttribute('categoria');
		txtValue = a;
		txtValue2 = b;
		if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = '';
		} else {
			li[i].style.display = 'none';
		}
	}
}

function blankAllEstudiantes() {
	let childs = document.getElementById('divEstudiantes').getElementsByTagName('img');
	for (let index = 0; index < childs.length; index++) {
		childs[index].setAttribute('class', 'circle avatar noSeleccionado');
	}
}

let btnIniciar = document.getElementById('btnIniciar');
btnIniciar.addEventListener('click', iniciar);

function iniciar() {
	let selectDificultad = document.getElementById('dificultad');
	let selectRepeticiones = document.getElementById('repeticiones');
	let selectImagen = document.getElementById('tipoImagen');
	let dificultad = selectDificultad.value;
	let repeticiones = selectRepeticiones.value;
	let tipoImagen = selectImagen.value;

	let listaSeleccionados = document.getElementById('seleccionados');
	let li = listaSeleccionados.getElementsByTagName('li');
	let idsSeleccionados = [];
	for (let index = 0; index < li.length; index++) {
		idsSeleccionados.push(li[index].getAttribute('idDB'));
	}

	if (idsSeleccionados.length > 0 && idEstudiante != null) {
		localStorage.setItem(
			'configuracion',
			JSON.stringify({
				nombreEstudiante: nombreEstudiante,
				estudiante: idEstudiante,
				palabras: idsSeleccionados,
				tipo: tipoImagen,
				repeticiones: repeticiones
			})
		);
		switch (dificultad) {
			case 'Baja':
				location.href = 'denominacion.html';
				break;
			case 'Media':
				location.href = 'denominacion3.html';
				break;
			case 'Alta':
				location.href = 'denominacion4.html';
				break;
			default:
				location.href = 'denominacion.html';
				break;
		}
	} else {
		if (idEstudiante == null) {
			Swal.fire({ title: 'DEBE SELECCIONAR UN ESTUDIANTE', confirmButtonColor: '#86D6C6', type: 'warning' });
		}

		if (idsSeleccionados.length == 0) {
			Swal.fire({ title: 'DEBE SELECCIONAR AL MENOS UNA PALABRA', confirmButtonColor: '#86D6C6', type: 'warning' });
		}
	}
}
