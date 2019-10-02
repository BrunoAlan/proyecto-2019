
var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();

var path = require('path');
var appDir = path.dirname(require.main.filename);

var db = new sqlite3.Database(appDir + '/db.sqlite');



app.get('/palabras', function (req, res) {

  db.serialize(function () {
    db.all("SELECT * FROM palabras", function (err, rows) {
      //console.log(row);
      res.json({ "data": rows })
    });
  });
});

app.get('/estudiantes', function (req, res) {

  db.serialize(function () {
    db.all("SELECT * FROM estudiantes", function (err, rows) {
      //console.log(row);
      res.json({ "data": rows })
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});