const lunes = document.getElementById("lunes");
const martes = document.getElementById("martes");
const miercoles = document.getElementById("miercoles");
const jueves = document.getElementById("jueves");
const viernes = document.getElementById("viernes");
const sabado = document.getElementById("sabado");
const domingo = document.getElementById("domingo");

const lunes2 = document.getElementById("lunes2");
const martes2 = document.getElementById("martes2");
const miercoles2 = document.getElementById("miercoles2");
const jueves2 = document.getElementById("jueves2");
const viernes2 = document.getElementById("viernes2");
const sabado2 = document.getElementById("sabado2");
const domingo2 = document.getElementById("domingo2");
var hoyEs = document.getElementById("hoyEs");
var mananaEs = document.getElementById("mananaEs");
var ayerFue = document.getElementById("ayerFue");



//Obtengo la fecha del sistema

var date = new Date();
var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");

var hoy = diasSemana[(date.getDay())];
var ayer; if (hoy == "Domingo") { ayer = "Sábado" } else { ayer = diasSemana[(date.getDay() - 1)] };
var manana = diasSemana[(date.getDay() + 1) % 7]



//Función que despliega la alerta
function mostrarAlerta(tipo) {
	alerta.crearAlerta(tipo);

}


//Función que determina si el día elegido es correcto
function verificarDia(diaCorrecto, diaElegido, ejercicio) {
	if (diaCorrecto == diaElegido) {
		alert("acierto");
		cambiarDía(diaElegido, ejercicio)
	}
	else {
		alert("error")
	}
}

//Función que coloca el día correcto en el título del ejercicio

function cambiarDía(dia, ejercicio) {
	switch (ejercicio) {
		case "hoy":
			hoyEs.innerHTML = "Hoy es " + dia
			break;
		case "ayer":
			ayerFue.innerHTML = "Ayer fue  " + dia
			break;
		case "manana":
			mananaEs.innerHTML = "Mañana es " + dia
			break;

	}

}


//Lógia del ejercicio

//Dia de hoy

lunes.addEventListener("click", e => {
	verificarDia(hoy, "Lunes", "hoy")
})

martes.addEventListener("click", e => {
	verificarDia(hoy, "Martes", "hoy")
})

miercoles.addEventListener("click", e => {
	verificarDia(hoy, "Miércoles", "hoy")
})

jueves.addEventListener("click", e => {
	verificarDia(hoy, "Jueves", "hoy")
})

viernes.addEventListener("click", e => {
	verificarDia(hoy, "Viernes", "hoy")
})
sabado.addEventListener("click", e => {
	verificarDia(hoy, "Sábado", "hoy")
})
domingo.addEventListener("click", e => {
	verificarDia(hoy, "Domingo", "hoy")
})

//Día de mañana


lunes2.addEventListener("click", e => {
	verificarDia(manana, "Lunes", "manana")
})

martes2.addEventListener("click", e => {
	verificarDia(manana, "Martes", "manana")
})

miercoles2.addEventListener("click", e => {
	verificarDia(manana, "Miércoles", "manana")
})

jueves2.addEventListener("click", e => {
	verificarDia(manana, "Jueves", "manana")
})

viernes2.addEventListener("click", e => {
	verificarDia(manana, "Viernes", "manana")
})
sabado2.addEventListener("click", e => {
	verificarDia(manana, "Sábado", "manana")
})
domingo2.addEventListener("click", e => {
	verificarDia(manana, "Domingo", "manana")
})


//Día de ayer

lunes3.addEventListener("click", e => {
	verificarDia(ayer, "Lunes", "ayer")
})

martes3.addEventListener("click", e => {
	verificarDia(ayer, "Martes", "ayer")
})

miercoles3.addEventListener("click", e => {
	verificarDia(ayer, "Miércoles", "ayer")
})

jueves3.addEventListener("click", e => {
	verificarDia(ayer, "Jueves", "ayer")
})

viernes3.addEventListener("click", e => {
	verificarDia(ayer, "Viernes", "ayer")
})
sabado3.addEventListener("click", e => {
	verificarDia(ayer, "Sábado", "ayer")
})
domingo3.addEventListener("click", e => {
	verificarDia(ayer, "Domingo", "ayer")
})



console.log(hoy, ayer, manana, date.getDay())