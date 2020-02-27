////////////////////////////////////////////////////////////////////////////////
/////Datos de prueba donde se muestra el resultado del ejercicio realizado//////
////////////////////////////////////////////////////////////////////////////////

///Parametros de configuración del ejercicio que pase por el json
//const resultadosEjercicio=JSON.parse(localStorage.getItem("resultadosConceptos"));
//console.log(resultadosEjercicio);

////////////////////////////////////////////////////////////////////////////////
/////Datos necesarios para generar el listado dinamico de cuentos y alumnos/////
////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems);
});

const { app } = require('electron').remote;
const path = require('path');
const Database = require('better-sqlite3');
const dbFile = path.join(app.getAppPath(), 'db.sqlite');
const db = new Database(dbFile);
const Swal = require('sweetalert2');
var idEstudiante; //voy a trabajar con el ID de cada estudiante

////////////////////////////////////////////////////////////////////////////////
//////////////////////////DACTILOLOGICO DESDE LA BASE DE DATOS//////////////////////
////////////////////////////////////////////////////////////////////////////////

const ABECEDARIO = [
	'A',
	'B',
	'C',
	'CH',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'LL',
	'M',
	'N',
	'Ñ',
	'O',
	'P',
	'Q',
	'R',
	'RR',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z'
];
const NUMEROS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const COLORES = ['Rojo', 'Azul', 'Amarillo', 'Verde', 'Naranja', 'Marron', 'Gris', 'Negro'];

//listadodactilologico

////////////////////////////////////////////////////////////////////////////////
////////////EL SIGUIENTE WHILE GENERA EL LISTADO DINAMICO DE ALUMNOS////////////
////////////////////////////////////////////////////////////////////////////////

////Obtengo los alumnos de la Base de datos
let listaAlumnos = []; //Array donde tengo el listado de mis alumnos
let alumnosDB = db.prepare('SELECT * FROM estudiantes').all();
alumnosDB.forEach((alumno) => {
	listaAlumnos.push(alumno);
});

let div_estudiantes = document.getElementById('listadoalumnos'); //Creo un DIV para el listado
div_estudiantes.addEventListener('click', (e) => {
	if (e.target.tagName === 'IMG') {
		blankAllEstudiantes();
		e.target.setAttribute('class', 'circle avatar seleccionado');
		idEstudiante = e.target.getAttribute('idDB');
	}
});

function blankAllEstudiantes() {
	let array_aux = document.getElementById('listadoalumnos').getElementsByTagName('img');
	for (let index = 0; index < array_aux.length; index++) {
		array_aux[index].setAttribute('class', 'circle avatar noSeleccionado');
	}
}

let searchBarEstudiante = document.getElementById('buscarEstudiante').addEventListener('keyup', searchNombre);
function searchNombre() {
	var input, i, filter, li, ul, txtValue;
	input = document.getElementById('buscarEstudiante');
	filter = input.value.toUpperCase();
	let array_aux = document.getElementById('listadoalumnos').getElementsByTagName('img');
	for (i = 0; i < array_aux.length; i++) {
		a = array_aux[i].getAttribute('nombre') + ' ' + array_aux[i].getAttribute('apellido');
		txtValue = a;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			array_aux[i].parentElement.style.display = '';
		} else {
			array_aux[i].parentElement.style.display = 'none';
		}
	}
}

var contadoralumno = 0; //contador
while (contadoralumno <= listaAlumnos.length) {
	//console.log(listaAlumnos[contadoralumno].nombre + " " + listaAlumnos[contadoralumno].apellido);
	let nombreApellido = listaAlumnos[contadoralumno].nombre + ' ' + listaAlumnos[contadoralumno].apellido;
	let idDB = listaAlumnos[contadoralumno].id;
	let listItem = document.createElement('div');
	let pal = document.createElement('p');
	pal.setAttribute('class', 'nyap');
	listItem.setAttribute('class', 'col s6 estudiante');
	pal.innerHTML = nombreApellido;
	let img = document.createElement('img');
	img.setAttribute('class', 'circle avatar noSeleccionado ');

	img.setAttribute('avatar', nombreApellido);
	img.setAttribute('nombre', listaAlumnos[contadoralumno].nombre);
	img.setAttribute('apellido', listaAlumnos[contadoralumno].apellido);
	img.setAttribute('edad', listaAlumnos[contadoralumno].edad);
	img.setAttribute('descripcion', listaAlumnos[contadoralumno].descripcion);
	img.setAttribute('idDB', listaAlumnos[contadoralumno].id);
	listItem.innerHTML += img.outerHTML;
	listItem.innerHTML += pal.outerHTML;
	div_estudiantes.appendChild(listItem);
	contadoralumno++;
}

////////////////////////////////////////////////////////////////////////////////
////////Funciones necesarias para el control de todas las configuraciones///////
////////////////////////////////////////////////////////////////////////////////

//Funcion que desactiva el check de los input que no sean seleccionados
function desactivarAllInputs(inputActivo) {
	let arrayInputs = ['input_abecedario', 'input_numeros', 'input_colores', 'input_meses'];
	for (let index = 0; index < arrayInputs.length; index++) {
		if (inputActivo !== arrayInputs[index]) {
			desactivarInput(arrayInputs[index]);
		}
	}
}

//Funcion que desactiva un input seleccionado
function desactivarInput(input) {
	document.getElementById(input).checked = false;
	document.getElementById(input).value = 'desactivado';
}

//Funcion que activa un input seleccionado
function activarInput(input) {
	document.getElementById(input).checked = true;
	document.getElementById(input).value = 'activado';
}

//Funcion que chequea si se activo el input Abecedario
function check(inputSeleccionado, tipoEjercicio) {
	if (document.getElementById(inputSeleccionado).checked == false) {
		document.getElementById(tipoEjercicio).className = 'collection-item active text white';
		activarInput(inputSeleccionado); //activo el input selecionado
		desactivarAllInputs(inputSeleccionado); //desactivo las demas opciones
	} else {
		document.getElementById(tipoEjercicio).className = 'collection-item';
		desactivarAllInputs(inputSeleccionado); //desactivo el input
	}
}

function iniciarEjercicio() {
	let filtro = false;
	let alumno_definido = listaAlumnos[parseInt(idEstudiante) - parseInt(1)];
	let inputAbecedario = document.getElementById('input_abecedario').value;
	let inputNumeros = document.getElementById('input_numeros').value;
	let inputColores = document.getElementById('input_colores').value;
	let inputMeses = document.getElementById('input_meses').value;
	var ejercicioContenido = new Object(); //creo mi objeto que tendra las opciones seleccionadas del ejercicio
	ejercicioContenido = null;

	//si el abecedario se activo , incluyo las letras al array de ejercicio
	if (inputAbecedario == 'activado') {
		ejercicioContenido = ABECEDARIO;
		filtro = true;
	}

	//si los numeros se seleccionaron , los incluyo al ejercicio
	if (inputNumeros == 'activado') {
		ejercicioContenido = NUMEROS;
		filtro = true;
	}

	//si los colores se seleccionaron , los incluyo al ejercicio
	if (inputColores == 'activado') {
		ejercicioContenido = COLORES;
		filtro = true;
	}

	//si los meses se seleccionaron , los incluyo al ejercicio
	if (inputMeses == 'activado') {
		ejercicioContenido = MESES;
		filtro = true;
	}

	if (alumno_definido == null) {
		Swal.fire({ title: 'DEBE SELECCIONAR A UN ESTUDIANTE', confirmButtonColor: '#86D6C6', type: 'warning' });
	} else {
		if (filtro == false) {
			Swal.fire({ title: 'DEBE SELECCIONAR UN CONJUNTO A PRACTICAR', confirmButtonColor: '#86D6C6', type: 'warning' });
		} else {
			localStorage.setItem(
				'configDactilologico',
				JSON.stringify({
					ejercicio: ejercicioContenido,
					alumno: alumno_definido
				})
			);
			location.href = 'dactilologico.html';
		}
	}
}
