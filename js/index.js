const remote = require("electron").remote;

const conf = JSON.parse(localStorage.getItem("login"));
const nombredocente = conf.nombreDocente;
const ruta = conf.ruta;

let docente = document.getElementById("nombredocente");
let avatar = document.getElementById("imgdocente");
docente.textContent = nombredocente;
console.log(ruta);
if (ruta != "../public/upload/") {
	avatar.src = ruta;
} else {
	avatar.setAttribute("avatar", nombredocente);
}

let btnSalir = document.getElementById("btnSalir");
btnSalir.addEventListener("click", () => {
	var window = remote.getCurrentWindow();
	window.close();
});
