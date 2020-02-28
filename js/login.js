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
const query = 'SELECT * FROM docentes order by docentes.nombre';
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

//
//CARGAR DB
//Para cargar la db descomentar la linea de abajo, la que llama al método cargarDB()
//una vez ejecutada la app volver a comentar
//
//cargarDB();

class Palabra {
	constructor(nombre, categoria) {
		this.nombre = nombre;
		this.rutaReal = `/${getCleanedString(categoria)}/${getCleanedString(nombre)}.jpg`;
		this.rutaDibujo = `/${getCleanedString(categoria)}/${getCleanedString(nombre)}.jpg`;
		this.categoria = categoria;
	}
}

//CATEGORIAS
const ANIMALES_DOMESTICO = 'Animales domésticos';
const ANIMALES_GRANJA = 'Animales de granja';
const ANIMALES_SALVAJES = 'Animales Salvajes';
const INSECTOS = 'Insectos';
const VEHICULOS = 'Vehículos';
const BEBIDAS = 'Bebidas';
const VERDURAS = 'Verduras';
const ALIMENTOS = 'Alimentos';
const FRUTAS = 'Frutas';
const ROPA_ACCESORIOS = 'Ropa y accesorios';
const PARTES_CUERPO = 'Partes del cuerpo';
const UTENSILIOS = 'Utensilios';
const MUEBLES_CUARTOS = 'Muebles y cuartos';
const OBJETOS_FUERA_CASA = 'Objetos fuera de la casa';
const PROFESIONES = 'Profesiones';
const ESCUELA = 'Escuela';

let animales_domesticos = ['Gato', 'Pajaro', 'Pato', 'Perro', 'Pez', 'Ratón', 'Tortuga'];
let animales_granja = ['Caballo', 'Chancho', 'Gallina', 'Vaca', 'Oveja', 'Conejo'];
let animales_salvajes = [
	'Ballena',
	'Canguro',
	'Cocodrilo',
	'Delfín',
	'Elefante',
	'Jirafa',
	'Leon',
	'Mono',
	'Oso',
	'Sapo',
	'Vibora',
	'Tiburon'
];
let insectos = ['Abeja', 'Araña', 'Hormiga', 'Mariposa', 'Mosca'];
let vehiculos = ['Ambulancia', 'Auto', 'Avión', 'Barco', 'Bicicleta', 'Camioneta', 'Camión', 'Colectivo', 'Moto', 'Tren'];
let bebidas = ['Agua', 'Café', 'Chocolatada', 'Jugo', 'Leche', 'Mate', 'Gaseosa', 'Té'];
let verduras = ['Cebolla', 'Choclo', 'Lechuga', 'Papa', 'Tomate', 'Zanahoria'];
let alimentos = [
	'Alfajor',
	'Arroz',
	'Azúcar',
	'Caramelo',
	'Carne',
	'Cereales',
	'Chocolate',
	'Chupetín',
	'Empanada',
	'Fideos',
	'Galletita',
	'Hamburguesa',
	'Helado',
	'Huevo',
	'Milanesa',
	'Pan',
	'Papas fritas',
	'Pizza',
	'Pochoclo',
	'Pollo',
	'Queso',
	'Salchicha',
	'Torta'
];

let frutas = ['Banana', 'Durazno', 'Frutilla', 'Limón', 'Manzana', 'Pera', 'Naranja', 'Sandia', 'Uva'];

let ropa = [
	'Anteojos',
	'Botas',
	'Botón',
	'Bufanda',
	'Buzo',
	'Calzoncillo',
	'Camisa',
	'Campera',
	'Cartera',
	'Collar',
	'Gorra',
	'Guantes',
	'Medias',
	'Mochila',
	'Ojotas',
	'Pantalón',
	'Pañal',
	'Pijama',
	'Remera',
	'Vestido',
	'Zapatilla'
];

let partesCuerpo = [
	'Barba',
	'Bigote',
	'Boca',
	'Brazo',
	'Cabeza',
	'Dedo',
	'Dientes',
	'Hombro',
	'Lengua',
	'Mano',
	'Nariz',
	'Ojos',
	'Oreja',
	'Panza',
	'Pelo',
	'Piernas',
	'Pies',
	'Rodilla',
	'Uñas'
];

let utensilios = [
	'Alfombra',
	'Almohada',
	'Balde',
	'Basura',
	'Bolsa',
	'Botella',
	'Caja',
	'Celular',
	'Cepillo de dientes',
	'Chupete',
	'Cigarrillos',
	'Cuchara',
	'Cuchillo',
	'Diario',
	'Dinero',
	'Escoba',
	'Espejo',
	'Jabón',
	'Lámpara',
	'Llave',
	'Luz',
	'Mamadera',
	'Martillo',
	'Papel',
	'Peine',
	'Plancha',
	'Plato',
	'Reloj',
	'Taza',
	'Tenedor',
	'Tijera',
	'Vaso',
	'Vela'
];

let muebles_cuartos = [
	'Banco',
	'Bañadera',
	'Baño',
	'Cama',
	'Cocina',
	'Computadora',
	'Ducha',
	'Escaleras',
	'Habitación',
	'Heladera',
	'Inodoro',
	'Lavarropas',
	'Mesa',
	'Patio',
	'Placard',
	'Puerta',
	'Silla',
	'Sillón',
	'Televisión',
	'Casa'
];
let objetos_fuera_casa = [
	'Árbol',
	'Bandera',
	'Cielo',
	'Flor',
	'Fuego',
	'Lluvia',
	'Nube',
	'Pala',
	'Pasto',
	'Piedra',
	'Pileta',
	'Sol',
	'Timbre'
];

let profesiones = ['Bombero', 'Carpintero', 'Chofer', 'Cocinero', 'Maestra', 'Mecánico', 'Médico', 'Panadero', 'Policía'];
let escuela = ['Aula', 'Biblioteca', 'Cuaderno', 'Escuela', 'Goma', 'Libro', 'Mapa', 'Patio'];

function cargarCategoria(listaPalabras, categoria) {
	for (let i = 0; i < listaPalabras.length; i++) {
		pal = new Palabra(listaPalabras[i], categoria);
		let queryInsert = `INSERT INTO palabras (palabra,rutaReal,rutaDibujo,categoriaSemantica) VALUES("${pal.nombre}","${pal.rutaReal}","${pal.rutaDibujo}","${pal.categoria}")`;
		let rowinsert = db.prepare(queryInsert);
		rowinsert.run();
	}
}
function getCleanedString(cadena) {
	var specialChars = '!@#$^&%*()+=-[]/{}|:<>?,.';
	for (var i = 0; i < specialChars.length; i++) {
		cadena = cadena.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
		cadena = cadena.toLowerCase();
		cadena = cadena.replace(/ /g, '_');
		cadena = cadena.replace(/á/gi, 'a');
		cadena = cadena.replace(/é/gi, 'e');
		cadena = cadena.replace(/í/gi, 'i');
		cadena = cadena.replace(/ó/gi, 'o');
		cadena = cadena.replace(/ú/gi, 'u');
		cadena = cadena.replace(/ñ/gi, 'n');
		return cadena;
	}
}

function cargarDB() {
	cargarCategoria(animales_domesticos, ANIMALES_DOMESTICO);
	cargarCategoria(animales_granja, ANIMALES_GRANJA);
	cargarCategoria(animales_salvajes, ANIMALES_SALVAJES);
	cargarCategoria(insectos, INSECTOS);
	cargarCategoria(vehiculos, VEHICULOS);
	cargarCategoria(bebidas, BEBIDAS);
	cargarCategoria(verduras, VERDURAS);
	cargarCategoria(alimentos, ALIMENTOS);
	cargarCategoria(frutas, FRUTAS);
	cargarCategoria(ropa, ROPA_ACCESORIOS);
	cargarCategoria(partesCuerpo, PARTES_CUERPO);
	cargarCategoria(utensilios, UTENSILIOS);
	cargarCategoria(muebles_cuartos, MUEBLES_CUARTOS);
	cargarCategoria(objetos_fuera_casa, OBJETOS_FUERA_CASA);
	cargarCategoria(profesiones, PROFESIONES);
}
