const express = require("express");
const mysql = require("mysql2");
const app = express();

// NOTE: YOU CAN CONNECT WITH mySql WITHOUT RUNNING Express and you will be able to display the result on your console.;

//this is used to declare the sources  of the datatbase connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Practice",
});


//here is where you connectto the database.
app.get("/users", (req, res) => {
  // the getConnection() is a  mysql method that enables you to get conected with your database and also to run your query i.e mysql query
  pool.getConnection((err, connection) => { // the false parameter should come first before true in a callback function
    //note the first parameter is an error handler whicu must be falise(error), while the second parmeter must be true which indicates the connection.
    if (err) {
      res.send("error connecting to database");
      console.log(err);
      return;
    }
    connection.query("select * from customers", (err, result) => {
      connection.release();
      if (err) throw err;
      res.json(result);
    });
  });
});
app.listen(3001, function () {
  console.log("server is running on port 3001");
});
/*createPOOL a method that enable you to create a connection to your database.
// it enables you to maintain a connection with one connection
// NOTE CreatePool is better than createconnection because with createpool(), you dont need to always create
 a new connection everytimeyouhave to work on with your database*/
