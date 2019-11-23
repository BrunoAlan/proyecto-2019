var nombreDocente;
let listaDocentes = [];
let l = [];
var seleccionado;
const { app } = require("electron").remote;
const path = require("path");
const Database = require("better-sqlite3");
const dbFile = path.join(app.getAppPath(), "db.sqlite");
const db = new Database(dbFile);
const query = "SELECT * FROM docentes";
const row = db.prepare(query);
const docentesDB = row.all();
docentesDB.forEach((docente) => {
	listaDocentes.push(docente);
});
var ul = document.getElementById("listaDocentes");
for (let index = 0; index < listaDocentes.length; index++) {
	let nombreApellido = listaDocentes[index].nombre + " " + listaDocentes[index].apellido;
	let idDB = listaDocentes[index].id;
	let listItem = document.createElement("li");
	listItem.setAttribute("idDB", idDB);
	listItem.setAttribute("class", "collection-item ");
	listItem.textContent = nombreApellido;
	ul.appendChild(listItem);
}
ul.addEventListener("click", () => {
	blankAll();
	event.target.setAttribute("class", "collection-item active");
	nombreDocente = event.target.textContent;
});

function blankAll() {
	var ul = document.getElementById("listaDocentes");
	var items = ul.getElementsByTagName("li");
	for (var i = 0; i < items.length; ++i) {
		items[i].setAttribute("class", "collection-item");
	}
}

let btnIniciar = document.getElementById("btnIniciarSesion");
let btnNuevo = document.getElementById("btnNuevo");

btnIniciar.addEventListener("click", () => {
	if (nombreDocente != null) {
		localStorage.setItem("login", JSON.stringify({ nombreDocente: nombreDocente }));
		location.href = "index.html";
	}
});

btnNuevo.addEventListener("click", () => {
	location.href = "altaDocente.html";
});
