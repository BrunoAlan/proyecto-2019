////////////////////////////////////////////////////////////////////////////////
///////////DATOS PARA LOS DATOS DE LOS CUENTOS EN EL EJERCICIO//////////////////
////////////////////////////////////////////////////////////////////////////////

///Parametros de configuración del ejercicio que pase por el json
const datosejercicio = JSON.parse(localStorage.getItem('configDactilologico'));
const alumno = datosejercicio.alumno;
const dificultad = datosejercicio.dificultad;
const ejercitacion = datosejercicio.ejercicio;
let repeticiones = datosejercicio.repeticiones;
if (repeticiones == 'default') {
	repeticiones = 5;
}
const linkImagen = '../public/images/dactilológico/';
const Swal = require('sweetalert2');
console.log(datosejercicio);

//////////////////////////////////////////////////////////////////////////////////////
//////////////Funciones que le dan la funcionalidad al ejercicio//////////////////////
//////////////////////////////////////////////////////////////////////////////////////

let pasoActual = 0;
generarImagenes(ejercitacion, pasoActual);

//Funcion que se encarga de generar las imagenes correspondientes a la Fase del ¿Que es?
function generarImagenes(ejercitacion, pasoActual) {
	let listadoDistractores = []; //defino los distractores que voy a usar
	let divContenedor = document.getElementById('contenedorejercicio'); //me paro en el div del contenedor
	let elementoActual = ejercitacion[pasoActual]; //tomo el elemento actual a partir del numero aleatorio

	//Escribo el mensaje superior que sirve como guia del ejercicio
	document.getElementById('ejercitacion_paso_inferior').innerHTML = elementoActual;

	//Creo la imagen
	var imagenCorrecta = document.createElement('img'); //Imagen 1 es la opcion correcta
	imagenCorrecta.className = 'material';

	imagenCorrecta.src = linkImagen + elementoActual + '.jpg';
	divContenedor.appendChild(imagenCorrecta);

	let divContenedor2 = document.getElementById('contenedorejercicio2'); //me paro en el div del contenedor

	//creo el boton de siguiente
	var botonSiguiente = document.createElement('button');
	botonSiguiente.className = 'teal lighten-3 separarBotones';
	botonSiguiente.addEventListener(
		'click',
		function() {
			avanzarEtapa();
		},
		false
	); //llamo a la funcion al clickear
	var botonSiguienteContent = document.createTextNode('SIGUIENTE');
	botonSiguiente.appendChild(botonSiguienteContent);

	//creo el boton de anterior
	var botonAnterior = document.createElement('button');
	botonAnterior.className = 'teal lighten-3 separarBotones';
	botonAnterior.addEventListener(
		'click',
		function() {
			retrocederEtapa();
		},
		false
	); //llamo a la funcion al clickear
	var botonAnteriorContent = document.createTextNode('ANTERIOR');
	botonAnterior.appendChild(botonAnteriorContent);

	//separador

	divContenedor2.appendChild(botonAnterior);

	divContenedor2.appendChild(botonSiguiente);
}

//Funcion que retorna a la etapa anterior
function retrocederEtapa() {
	if (pasoActual == 0) {
	} else {
		document.getElementById('contenedorejercicio').innerHTML = ' ';
		document.getElementById('contenedorejercicio2').innerHTML = ' ';
		//tengo que eliminar el contenido de este div contenedorejercicio
		--pasoActual;
		generarImagenes(ejercitacion, pasoActual);
	}
}

//Funcion que la utilizo para avanzar un nuevo paso
function avanzarEtapa() {
	if (pasoActual == ejercitacion.length - parseInt(1)) {
		finalEjercicio();
	} else {
		document.getElementById('contenedorejercicio').innerHTML = ' ';
		document.getElementById('contenedorejercicio2').innerHTML = ' ';
		//tengo que eliminar el contenido de este div contenedorejercicio
		pasoActual++;
		generarImagenes(ejercitacion, pasoActual); //si no es el final vuelvo a generar otra opcion
	}
}

function finalEjercicio() {
	setTimeout(function() {
		location.href = 'configuracionDactilologico.html';
	}, 1500);
}
