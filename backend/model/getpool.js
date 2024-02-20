const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "user_table",
});

const s_users = "select * from userData";
const insertUser_query =
  "insert into userData(fullname, username, contact, email) values(?,?,?,?)";
module.exports = {
  pool,
  s_users,
  insertUser_query,
};
