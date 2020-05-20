//conecta mi aplicacion con la base de datos:
var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : "localhost",
  port     : "3306",
  user     : "root",
  password : "123456789",
  database : "queveohoy"
});

module.exports = connection;

