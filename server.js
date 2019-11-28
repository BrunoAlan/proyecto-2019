var express = require("express");
var app = express();
var sqlite3 = require("sqlite3").verbose();
var multer = require("multer");
var path = require("path");
var bodyParser = require("body-parser");
var appDir = path.dirname(require.main.filename);
var fs = require("fs");
var db = new sqlite3.Database(appDir + "/db.sqlite");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, appDir + "/public/upload");
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage }).single("avatar");

app.post("/upload", (req, res, next) => {
	upload(req, res, function(err) {
		if (err) {
			// A Multer error occurred when uploading.
		} else if (err) {
			// An unknown error occurred when uploading.
		}

		// Everything went fine.
	});
});

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
		apellido: req.body.apellido,
		rutaAvatar: req.body.avatar
	};
	var sql = "INSERT INTO docentes (nombre, apellido, rutaAvatar) VALUES (?,?,?)";
	var params = [data.nombre, data.apellido, data.rutaAvatar];
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
	console.log("APP corriendo en puerto 3000");
});
