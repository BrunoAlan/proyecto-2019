
const Swal = require('sweetalert2')
const lunes = document.getElementById("lunes");
const martes = document.getElementById("martes");
const miercoles = document.getElementById("miercoles");
const jueves = document.getElementById("jueves");
const viernes = document.getElementById("viernes");
const sabado = document.getElementById("sabado");
const domingo = document.getElementById("domingo");

//Obtengo la fecha del sistema

var date = new Date();
var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");

var hoy = diasSemana[(date.getDay())];
var ayer; if (hoy == "Domingo") { ayer = "Sábado" } else { ayer = diasSemana[(date.getDay() - 1)] };
var manana = diasSemana[(date.getDay() + 1) % 7]

//Obtendo el html desde el que estoy requiriendo este js
//me devuelve diasSemanaHoy.html , diasSemanaAyer.html o diasSemanaManana.html
var locat = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));


switch (locat) {
	case "diasSemanaHoy.html":
		setToday();
		break;
	case "diasSemanaAyer.html":
		setYesterday();
		break;
	case "diasSemanaManana.html":
		setTomorrow()
		break;
}


//Función que determina si el día elegido es correcto
function verificarDia(diaCorrecto, diaElegido, ejercicio) {
	if (diaCorrecto == diaElegido) {
		var arrayAciertos = ['¡Muy bien!', '¡Excelente!', '¡Bravo!', '¡Grandioso!', '¡Estupendo!', '¡Fantastico!'];
		var singleacierto = arrayAciertos[Math.floor(Math.random() * arrayAciertos.length)];
		Swal.fire({
			imageUrl: '../public/images/muybien.png',
			width: 400,
			imageWidth: 200,
			imageHeight: 300,
			background: '#e4f2f0',
			title: singleacierto,
			showConfirmButton: true,
			confirmButtonText: 'Siguiente'
		}).then((result) => {
			if (result.value) {
				//location.href='index.html';
				switch (ejercicio) {
					case "hoy":
						location.href = 'diasSemanaAyer.html'
						break;
					case "ayer":
						location.href = 'diasSemanaManana.html'
						break;
					case "manana":
						location.href = 'index.html'
						break;

				}
			}
		});
		cambiarDía(diaElegido, ejercicio)
	}
	else {
		var arrayerror = ['¡Intentalo otra vez!', '¡Intentalo nuevamente!', '¡Una vez mas, tu puedes hacerlo!'];
		var singlerror = arrayerror[Math.floor(Math.random() * arrayerror.length)];
		Swal.fire({
			imageUrl: '../public/images/otravez.png',
			width: 400,
			imageWidth: 200,
			imageHeight: 300,
			background: '#e4f2f0',
			title: singlerror,
			showConfirmButton: false,
			timer: 2000
		});
	}
}

//Función que coloca el día correcto en el título del ejercicio

function cambiarDía(dia, ejercicio) {
	switch (ejercicio) {
		case "hoy":
			textoResolucion.innerHTML = "Hoy es " + dia
			break;
		case "ayer":
			textoResolucion.innerHTML = "Ayer fue  " + dia
			break;
		case "manana":
			textoResolucion.innerHTML = "Mañana es " + dia
			break;
	}
}




//LÓGICA DEL EJERCICIO

//Dia de hoy
function setToday() {
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
}


//Día de mañana
function setTomorrow() {
	lunes.addEventListener("click", e => {
		verificarDia(manana, "Lunes", "manana")
	})

	martes.addEventListener("click", e => {
		verificarDia(manana, "Martes", "manana")
	})

	miercoles.addEventListener("click", e => {
		verificarDia(manana, "Miércoles", "manana")
	})

	jueves.addEventListener("click", e => {
		verificarDia(manana, "Jueves", "manana")
	})

	viernes.addEventListener("click", e => {
		verificarDia(manana, "Viernes", "manana")
	})
	sabado.addEventListener("click", e => {
		verificarDia(manana, "Sábado", "manana")
	})
	domingo.addEventListener("click", e => {
		verificarDia(manana, "Domingo", "manana")
	})

}



//Día de ayer
function setYesterday() {

	lunes.addEventListener("click", e => {
		verificarDia(ayer, "Lunes", "ayer")
	})

	martes.addEventListener("click", e => {
		verificarDia(ayer, "Martes", "ayer")
	})

	miercoles.addEventListener("click", e => {
		verificarDia(ayer, "Miércoles", "ayer")
	})

	jueves.addEventListener("click", e => {
		verificarDia(ayer, "Jueves", "ayer")
	})

	viernes.addEventListener("click", e => {
		verificarDia(ayer, "Viernes", "ayer")
	})
	sabado.addEventListener("click", e => {
		verificarDia(ayer, "Sábado", "ayer")
	})
	domingo.addEventListener("click", e => {
		verificarDia(ayer, "Domingo", "ayer")
	})
}

console.log(hoy, ayer, manana, date.getDay())
