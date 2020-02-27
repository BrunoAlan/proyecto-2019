////////////////////////////////////////////////////////////////////////////////
///////////DATOS PARA LOS DATOS DE LOS CUENTOS EN EL EJERCICIO//////////////////
////////////////////////////////////////////////////////////////////////////////

///Parametros de configuración del ejercicio que pase por el json
const datosejercicio = JSON.parse(localStorage.getItem('configCuentos'));
const alumno = datosejercicio.alumno; //me guardo el dato del alumno
const cuento = datosejercicio.cuento; //me guardo el cuento como un array
const nrocuento = cuento.nrocuento; //me guardo el nro del cuento seleccionado
const totalPasos = cuento.pasos.length; //me guardo la cantidad de pasos totales que tiene el cuento
const apellidoAlumno = alumno.apellido;
const nombreAlumno = alumno.nombre;
let faseActualCuento = 'Lectura';
let pasoActual = '1'; //variable que voy a manejar para moverme entre los pasos del cuento
console.log(datosejercicio);
let palabrasEjercitadas = []; //contendra las palabras que ejercito el alumno
const Swal = require('sweetalert2');

//Tenemos que generar el codigo HTML para cada modal (x cada paso que tengamos) dinamicamente
//generarmodal el id donde se tiene que generar todos los modales
let variablecontrol = 1; //lo uso para realizar las iteraciones del while

while (variablecontrol <= totalPasos) {
	var div1 = document.createElement('div');
	div1.className = 'modalDialog';
	div1.setAttribute('id', 'resolverpalabra' + variablecontrol);
	var div2 = document.createElement('div');
	div2.className = 'modalFondo';
	var a = document.createElement('a');
	a.href = '#close';
	a.title = 'Close';
	a.className = 'close';
	var textoclose = document.createTextNode('X');
	a.appendChild(textoclose);
	var h5 = document.createElement('h5');
	h5.className = 'titulomodal';
	var hr5contenido = document.createTextNode('Seleccione la palabra Correcta');
	h5.appendChild(hr5contenido);

	//Primer boton con la opcion correcta
	var abutton1 = document.createElement('a');
	abutton1.className = 'waves-effect waves-light btn-large';
	abutton1.addEventListener(
		'click',
		function() {
			opcionCorrecta();
		},
		false
	); //llamo a la funcion al clickear
	var abutton1content = document.createTextNode(cuento.palabrasobjetivo[parseInt(variablecontrol) - parseInt(1)]);
	abutton1.appendChild(abutton1content);

	//Boton Ficticio para separar los otros botones (pinto hacerlo asi son las 4am)
	var buttonimaginario = document.createElement('button');
	buttonimaginario.className = 'botonseparador';

	//Segundo boton con la opcion correcta
	var abutton2 = document.createElement('a');
	abutton2.className = 'waves-effect waves-light btn-large';
	abutton2.addEventListener(
		'click',
		function() {
			opcionIncorrecta();
		},
		false
	); //llamo a la funcion al clickear
	var abutton2content = document.createTextNode(cuento.palabrasdistractores[parseInt(variablecontrol) - parseInt(1)]);
	abutton2.appendChild(abutton2content);

	//Me traigo el ID donde vamos a crear todos los elementos anteriores
	var center = document.createElement('center');
	var generarmodal = document.getElementById('generarmodal');
	generarmodal
		.appendChild(div1)
		.appendChild(div2)
		.appendChild(a);
	div2.insertBefore(h5, a);
	div2.appendChild(center);

	//vamos a hacer que las imagenes roten el orden de forma aleatoria
	let aleatorio1 = Math.random();
	let aleatorio2 = Math.random();
	if (aleatorio1 < aleatorio2) {
		center.appendChild(abutton1);
		center.appendChild(buttonimaginario);
		center.appendChild(abutton2);
	} else {
		center.appendChild(abutton2);
		center.appendChild(buttonimaginario);
		center.appendChild(abutton1);
	}
	//no es mucho pero al menos no van a quedar fijos siempre en el mismo orden
	variablecontrol++; //incremento el contador
}

////////////////////////////////////////////////////////////////////////////////
////////////////////FUNCIONES JS PARA EL CONTROL DEL EJERCICIO//////////////////
////////////////////////////////////////////////////////////////////////////////

//Funcion que se carga al cargar la vista , solo deja precargado el ejercicio
function cargarEjercicio() {
	cambiarFondo(1);
	var textopaso = cuento.pasos[0];
	document.getElementById('contenedortexto').innerHTML = textopaso;
	pasoActual = 1; //inicio en el paso 1
}

//Funcion que se carga al cargar la pagina , recibe el parametro del nrocuento y el nropaso del ejercicio
function iniciarEjercicio() {
	var nropaso = pasoActual;
	cambiarFondo(nropaso);
	var textopaso = cuento.pasos[parseInt(nropaso) - parseInt(1)];
	var palabra = cuento.palabrasobjetivo[parseInt(nropaso) - parseInt(1)];
	document.getElementById('contenedortexto').innerHTML = textopaso;
	var funcion_paso = "iniciarPaso('" + textopaso + "','" + palabra + "','" + nropaso + "')";
	setTimeout(funcion_paso, 100); //espero 3 segundos para invocar a la funcion de iniciar el paso 1
}

//Funcion para cambiar el fondo para cada ejercicio , recibe el nro de ejercicio y la imagen correspondiente
function cambiarFondo(nroimagenpaso) {
	let urlimagen = '../public/images/cuentos/' + nrocuento + '/' + nroimagenpaso + '.jpg';
	document.getElementById('contenedorcuento').style.backgroundImage = 'url(' + urlimagen + ')';
}

//Funcion que se utiliza para volver a un paso anterior
function retrocederEjercicio() {
	let nropaso = pasoActual;
	let nropasoanterior = parseInt(nropaso) - parseInt(1);
	var textopaso = cuento.pasos[parseInt(nropaso) - parseInt(2)]; //vuelvo 2 para atras porque la cuenta arranca en 0 , tengo un desplazamiento

	if (nropaso == '1') {
		Swal.fire({
			width: 400,
			imageWidth: 200,
			imageHeight: 300,
			background: '#e4f2f0',
			title: 'Es el paso inicial , no se puede volver',
			showConfirmButton: false,
			timer: 1000
		});
	} else {
		cambiarFondo(nropasoanterior); //cambio el fondo al fondo correspondiente al paso anterior
		document.getElementById('contenedortexto').innerHTML = textopaso;
		pasoActual = nropasoanterior;
	}

	var faseActual = faseActualCuento;
	if (faseActual == 'Ejercitacion') {
		iniciarEjercicio();
	}
}

//Funcion que es utilizada para avanzar un paso hacia adelante
function avanzarEjercicio(nropaso) {
	if (verificarEsfinal() == true) {
		finalEjercicio();
	} else {
		var faseActual = faseActualCuento;
		if (faseActual == 'Ejercitacion') {
			cambiarFondo(nropaso);
			avanzarPaso();
			var textopaso = cuento.pasos[parseInt(nropaso) - parseInt(2)];
			document.getElementById('contenedortexto').innerHTML = textopaso;
			iniciarEjercicio();
		} else {
			var nropaso = parseInt(pasoActual) + parseInt(1);
			cambiarFondo(nropaso);
			avanzarPaso();
			var textopaso = cuento.pasos[parseInt(nropaso) - parseInt(1)];
			document.getElementById('contenedortexto').innerHTML = textopaso;
		}
	}
}

//Funcion que vuelve a ejecutar un ejercicio cuando se respondio incorrectamente
function repetirEjercicio() {
	var nropaso = parseInt(pasoActual);
	cambiarFondo(nropaso);
	avanzarPaso();
	var textopaso = cuento.pasos[parseInt(nropaso) - parseInt(1)];
	document.getElementById('contenedortexto').innerHTML = textopaso;
}

//Funcion que sirve para registrar la palabra ejercitada
function palabraEjercitada() {
	//Me almaceno la palabra correcta que el estudiante ejercito
	var nropaso = parseInt(pasoActual) - parseInt(1); //se tiene en cuenta el desplazamiento
	let palabra = cuento.palabrasobjetivo[parseInt(nropaso)];
	palabrasEjercitadas.push(palabra);
}

//Funcion que solo actua cuando se seleccciona la opcion correcta en el modal de opciones
function opcionCorrecta() {
	//alert("La Opcion MSarcada es la correcta");
	location.href = '#close';
	var nropaso = pasoActual;
	palabraEjercitada(); //registro la palabra que se ejercito
	aciertoEjercicio(); //muestro la animacion de es correcto
	setTimeout(function() {
		avanzarEjercicio(nropaso);
	}, 1000); //avanzo en el ejercicio
}

//Funcion que solo actua cuando se seleccciona la opcion incorrecta en el modal de opciones
function opcionIncorrecta() {
	//alert("La Opcion Marcada NO es correcta");
	location.href = '#close';
	palabraEjercitada(); //registro la palabra que se ejercito
	errorEjercicio(); //muestro la animacion de que la opcion no era la correcta
	iniciarEjercicio();
}

//Funcion que sirve para iniciar la ejecucion de un paso
function iniciarPaso(textopaso, palabra, nropaso) {
	var abrirmodal = "<a id='palabra' class='resolverpalabra' href='#resolverpalabra" + nropaso + "'>_ _ _ _ _ </a>";
	var textopaso_resolver = textopaso.replace(palabra, abrirmodal);
	var textopaso_modal = textopaso.replace(palabra, '**********');
	var resolverpalabranro = 'textoresolverpalabra' + nropaso;
	document.getElementById('contenedortexto').innerHTML = textopaso_resolver;
}

//Funcion para avanzar un paso en el ejercicio , si se selecciono la opcion correcta
function avanzarPaso() {
	var pasoanterior = pasoActual;
	var pasostotales = parseInt(pasoanterior) + parseInt(1);
	pasoActual = pasostotales;
	location.href = '#close';
}

//Funcion que verifica si hemos llegado al final del ejercicio , es decir terminamos el paso final
function verificarEsfinal() {
	//Pasos[i] es mi Array con los pasos
	var cantidadpasos = 0; //voy a hacer un contador para todos los pasos que existan
	var pasoactual = pasoActual; //me guardo el paso actual
	var faseActual = faseActualCuento; //me guardo la fase actual
	var cantidadpasosmax = cuento.pasos.length;

	for (var i = 0; i < cantidadpasosmax; i++) {
		cantidadpasos = parseInt(cantidadpasos) + parseInt(1);
	}
	if (pasoactual == cantidadpasos) {
		return true;
	} else {
		return false;
	}
}

//Funcion que activa la animacion cuando hay un acierto en el ejercicio
function aciertoEjercicio() {
	const arrayAciertos = ['¡Muy bien!', '¡Excelente!', '¡Bravo!', '¡Grandioso!', '¡Estupendo!', '¡Fantastico!'];
	const singleacierto = arrayAciertos[Math.floor(Math.random() * arrayAciertos.length)];
	Swal.fire({
		imageUrl: '../public/images/Felicitaciones.png',
		width: 400,
		imageWidth: 200,
		imageHeight: 300,
		background: '#e4f2f0',
		title: singleacierto,
		showConfirmButton: false,
		timer: 1000
	});
}

//Funcion que activa la animacion cuando hay un error en el ejercicio
function errorEjercicio() {
	const arrayerror = ['¡Intentalo otra vez!', '¡Intentalo nuevamente!', '¡Una vez mas, tu puedes hacerlo!'];
	const singlerror = arrayerror[Math.floor(Math.random() * arrayerror.length)];
	Swal.fire({
		imageUrl: '../public/images/otravez.png',
		width: 400,
		imageWidth: 200,
		imageHeight: 300,
		background: '#e4f2f0',
		title: singlerror,
		showConfirmButton: false,
		timer: 1000
	});
}

//Funcion que sirve para terminar el ejercicio y mostrar los resultados finales
function finalEjercicio() {
	var faseActual = faseActualCuento;

	//Si estoy en la fase de lectura avanzo a la fase de ejercitacion
	if (faseActual == 'Lectura') {
		faseActualCuento = 'Ejercitacion';
		cargarEjercicio();
		iniciarEjercicio();
	} else {
		var pasos = pasoActual; //me guardo el paso actual
		localStorage.setItem('resultadosCuentos', JSON.stringify({ alumno: alumno, cuento: cuento, palabrasEjercitadas: palabrasEjercitadas }));
		setTimeout(function() {
			location.href = 'configuracionCuentos.html';
		}, 1500);
		//Debo realizar el INSERT EN LA BD CON LOS RESULTADOS DEL EJERCICIO
	}
}
