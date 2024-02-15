const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "Practice",
});

const s_users = "select * from customers";
const insertUser_query = "insert into customers(first_name, last_name, email, phone_no) values(?,?,?,?)";

module.exports= {
mysql,
pool,
s_users,
insertUser_query
}