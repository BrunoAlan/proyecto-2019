var express = require("express");
var app = express();
var sqlite3 = require("sqlite3").verbose();

var path = require("path");
var appDir = path.dirname(require.main.filename);

var db = new sqlite3.Database(appDir + "/db.sqlite");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/palabras", function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM palabras", function(err, rows) {
			//console.log(row);
			res.json({ data: rows });
		});
	});
});

app.get("/estudiantes", (req, res) => {
	db.serialize(function() {
		db.all("SELECT * FROM estudiantes", function(err, rows) {
			//console.log(row);
			res.json({ data: rows });
		});
	});
});

app.get("/docentes", (req, res) => {
	db.serialize(function() {
		db.all("SELECT * FROM docentes", function(err, rows) {
			//console.log(row);
			res.json({ data: rows });
		});
	});
});

app.post("/docentes/", (req, res, next) => {
	var data = {
		nombre: req.body.nombre,
		apellido: req.body.apellido
	};
	var sql = "INSERT INTO docentes (nombre, apellido) VALUES (?,?)";
	var params = [data.nombre, data.apellido];
	db.run(sql, params, function(err, result) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "Docente agregado correctamente",
			data: data,
			id: this.lastID
		});
	});
});

app.listen(3000, function() {
	console.log("Example app listening on port 3000!");
});
