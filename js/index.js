const remote = require("electron").remote;

const conf = JSON.parse(localStorage.getItem("login"));
const nombredocente = conf.nombreDocente;

let docente = document.getElementById("nombredocente");
docente.textContent = nombredocente;

let btnSalir = document.getElementById("btnSalir");
btnSalir.addEventListener("click", () => {
	var window = remote.getCurrentWindow();
	window.close();
});
