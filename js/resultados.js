let listaDocentes = [];
let displayNombre = document.getElementById("nombre");
let displayApellido = document.getElementById("apellido");
let displayEdad = document.getElementById("edad");
let displayDescripcion = document.getElementById("descripcion");
const { app } = require("electron").remote;
const path = require("path");
const Database = require("better-sqlite3");
const dbFile = path.join(app.getAppPath(), "db.sqlite");
const db = new Database(dbFile);
let query = "SELECT * FROM estudiantes";
let row = db.prepare(query);
let palabrasDB = row.all();
palabrasDB.forEach((palabra) => {
	listaDocentes.push(palabra);
});

let div = document.getElementById("divEstudiantes");
for (let index = 0; index < listaDocentes.length; index++) {
	let nombreApellido = listaDocentes[index].nombre + " " + listaDocentes[index].apellido;
	let idDB = listaDocentes[index].id;
	let listItem = document.createElement("div");
	let pal = document.createElement("p");
	pal.setAttribute("class", "nyap");
	listItem.setAttribute("class", "col s6 estudiante");
	pal.innerHTML = nombreApellido;

	let img = document.createElement("img");
	img.setAttribute("class", "circle noSeleccionado");
	img.setAttribute("hight", "137");
	img.setAttribute("width", "137");
	img.setAttribute("avatar", nombreApellido);
	img.setAttribute("nombre", listaDocentes[index].nombre);
	img.setAttribute("apellido", listaDocentes[index].apellido);
	img.setAttribute("edad", listaDocentes[index].edad);
	img.setAttribute("descripcion", listaDocentes[index].descripcion);
	img.setAttribute("idDB", listaDocentes[index].id);
	listItem.innerHTML += img.outerHTML;
	listItem.innerHTML += pal.outerHTML;
	div.appendChild(listItem);
}

div.addEventListener("click", (e) => {
	if (e.target.tagName === "IMG") {
		let id = e.target.getAttribute("idDB");
		blankAll();
		e.target.setAttribute("class", "circle seleccionado");
		RemoveRow();
		resultados(id);
	}
});

function blankAll() {
	let childs = document.getElementById("divEstudiantes").getElementsByTagName("img");
	for (let index = 0; index < childs.length; index++) {
		childs[index].setAttribute("class", "circle noSeleccionado");
	}
}

function RemoveRow() {
	var elmtTable = document.getElementById("tbodyResultado");
	elmtTable.innerHTML = "";
}

function search() {
	var input, i, filter, li, ul, txtValue;
	input = document.getElementById("icon_prefix2");
	filter = input.value.toUpperCase();
	let childs = document.getElementById("divEstudiantes").getElementsByTagName("img");
	for (i = 0; i < childs.length; i++) {
		a = childs[i].getAttribute("nombre") + " " + childs[i].getAttribute("apellido");
		txtValue = a;
		console.log(txtValue);
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			childs[i].parentElement.style.display = "";
		} else {
			childs[i].parentElement.style.display = "none";
		}
	}
}

let tbody = document.getElementById("tbodyResultado");
function resultados(id) {
	let palabrasPorEjercicio;
	let queryResultadosPorAlumno = `select resultados.id,strftime('%d/%m/%Y',resultados.fecha) as fecha from resultados inner join resultadosPalabras where id_estudiante = ${id} and resultados.id = resultadosPalabras.id_resultado group by fecha`;
	row = db.prepare(queryResultadosPorAlumno);
	let resultadosPorAlumno = row.all();
	resultadosPorAlumno.forEach((element) => {
		let queryPalabrasPorEjercicio = `select palabra from resultados inner join palabras inner join resultadosPalabras where resultados.id = ${element.id} and resultadosPalabras.id_resultado = resultados.id and resultadosPalabras.id_palabra = palabras.id`;
		row = db.prepare(queryPalabrasPorEjercicio);
		palabrasPorEjercicio = row.all();
		let asd = "";
		for (let index = 0; index < palabrasPorEjercicio.length; index++) {
			asd += palabrasPorEjercicio[index].palabra + ", ";
		}

		let fila = document.createElement("tr");
		let celdaFecha = document.createElement("td");
		let textoFechaCelda = document.createTextNode(element.fecha);
		celdaFecha.appendChild(textoFechaCelda);
		let celdaPalabra = document.createElement("td");
		let textoCeldaPalabra = document.createTextNode(asd);
		celdaPalabra.appendChild(textoCeldaPalabra);
		fila.appendChild(celdaFecha);
		fila.appendChild(celdaPalabra);
		tbody.appendChild(fila);
	});
}
