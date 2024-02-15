//HERE:I was able to run mysql data on the console without using express.
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Practice",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("error connecting to database");
    console.log(err);
    return;
  }

  connection.query("select * from customers", (err, result) => {
    connection.release();
    if (err) throw err;
    console.log(result);
  });
});
