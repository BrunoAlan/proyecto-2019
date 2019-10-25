var Fancy = require("fancygrid");
var grid;

// PATU LEE ESTO!!

// PARA USAR EL METODO, CAMBIAR DENTRO DEL MODULO
// EN node_modules -> require('./client/fancy.full.js');
// fancy.full.js está modificado por ALAN

generateGrid();

window.addEventListener("resize", () => {
	grid.destroy();
	generateGrid();
});

document.getElementById("btn").addEventListener("click", () => {
	const palabrasSeleccionadas = [];
	const selection = grid.getSelection();
	selection.forEach((element) => {
		// console.log(element.id)
		palabrasSeleccionadas.push(element.id);
	});
	if (palabrasSeleccionadas.length == 0) {
		alert("Debe seleccionar al menos una palabra");
	} else {
		let tipoImagen = document.getElementById("mySelector").value;
		let cantRepeticiones = document.getElementById("inputRepeticiones").value;
		let dificultad = document.getElementById("dificultad").value;

		localStorage.setItem(
			"configuracion",
			JSON.stringify({ palabras: palabrasSeleccionadas, tipo: tipoImagen, repeticiones: cantRepeticiones })
		);
		//console.log(JSON.stringify({ palabras: palabrasSeleccionadas, tipo: tipoImagen, repeticiones: cantRepeticiones }));
		//console.log(JSON.stringify(palabrasSeleccionadas))
		switch (dificultad) {
			case "Baja":
				location.href = "denominacion.html";
				break;
			case "Media":
				location.href = "denominacion3.html";
				break;
			case "Alta":
				location.href = "denominacion4.html";
				break;
			default:
				location.href = "denominacion.html";
				break;
		}
	}
});

function generateGrid() {
	grid = new Fancy.Grid({
		renderTo: document.getElementById("conttabla"),
		theme: "material",
		tbar: [
			{
				type: "search",
				width: 350,
				emptyText: "Buscar"
			}
		],
		height: screen.height - 470,
		width: "fit",
		paging: {
			pageSize: 8,
			pageSizeData: [5, 10, 20, 50]
		},
		selModel: {
			type: "rows",
			memory: true
		},
		data: {
			proxy: {
				url: "http://localhost:3000/palabras"
			}
		},
		columns: [
			{
				type: "select",
				locked: true
			},
			{
				index: "id",
				title: "ID",
				type: "number"
			},
			{
				index: "palabra",
				title: "Palabra",
				type: "string",
				flex: 1
			}
		]
	});
}
