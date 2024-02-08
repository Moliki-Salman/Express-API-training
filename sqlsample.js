// const express = require("express");
const mysql = require("mysql2");
// const app = express();

// NOTE: YOU CAN CONNECT WITH mySql WITHOUT RUNNING Express and you will be able to display the result on your console.;

//this is used to declare the sources  of the datatbase connection
/*createPOOL a method that enable you to create a connection to your database.
 it enables you to maintain a connection with one connection
 NOTE CreatePool is better than createconnection because with createpool(), you dont need to always create
 a new connection everytimeyouhave to work on with your database*/
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

/*you call on the connection parameter dot query, i.e calling on the query, then you pass-in the table you want to disply in your database,
in this case customer table. select * from customers means display all data in the customer table.
NOTE: the first parameter for the query() method is a mysql string, and the second parameter should be a call back function */
    connection.query("select * from customers", (err, result) => {

/* The release()method is used to end the connection.the more connection is open, the slower your system, so it is advised to
close every database conection, also any connection you make is a new instance.  you can also use  close()  method to close your  connection. */
      connection.release();
      if (err) throw err;
      res.json(result);
    });
  });
});

app.listen(3001, function () {
  console.log("server is running on port 3001");
});

