const fs = require("fs");
const data = require("../model/datasource");
const { mysql, pool, s_users, insertUser_query } = require("../model/getpool");

const homefun = (req, res) => {
  res.send("Home Page");
};
const list = (req, res) => {
  res.send("list page");
};
// const createUser = (req, res) => {
//   //eg when there is a form that has firstName, lastname etc as the properties of the form in an HTML form, you pick the property name of the form and put all the properties inside an object
//   const userDetails = {
//     fname: req.body.firstName,
//     lname: req.body.lastName,
//     username: req.body.username,
//     password: req.body.password,
//   };
//   data.push(userDetails);
//   res.send("details received");
//   console.log(data);
//   let readFile = fs.readFileSync("data.json", "utf-8");
//   let newRead = JSON.parse(readFile);
//   // const template = Object.create(userDetails)
//   newRead.push(data);
//   fs.writeFileSync("data.json", JSON.stringify(newRead));
// };

const showUsers = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send("error connecting to database");
      console.log(err);
      return;
    }

    connection.query(s_users, (err, result) => {
      connection.release();
      if (err) throw err;
      res.json(result);
    });
  });
};

// const registerUser = async (req, res) => {
//   const userDetails = {
//     // cus_id: req.body.cus_id,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     phone_no: req.body.phone_no,
//   };
//   pool.getConnection((err, connection) => {
//     if (err) {
//       return "connection Error";
//     }

//     connection.query(
//       insertUser_query,
//       [
//         // userDetails.cus_id,
//         userDetails.first_name,
//         userDetails.last_name,
//         userDetails.email,
//         userDetails.phone_no,
//       ],
//       (err, result) => {
//         connection.release();
//         if (err) {
//           return "Error detected";
//         }
//         res.send(result);
//       }
//     );
//   });
// };

const createUser = async (req, res) => {
  const userDetails = {
    // cus_id: req.body.cus_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_no: req.body.phone_no,
  };

  await insertUsers(req, res, userDetails);
};

const insertUsers = async (req, res, userDetails) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error in connection");
      console.log(err);
      return;
    }

    connection.query(
      insertUser_query,
      [
        // userDetails.cus_id,
        userDetails.first_name,
        userDetails.last_name,
        userDetails.email,
        userDetails.phone_no,
      ],
      (err, result) => {
        connection.release();
        if (err) throw err;
        res.send(result);
      }
    );
  });
};

module.exports = {
  homefun,
  list,
  createUser,
  showUsers,
};

//  const userDetails2 = {
//    fname: null,
//    lname: null,
//    username: null,
//    password: null,
//  };

//  const newdata = Object.create(userDetails2);
//  userDetails2.fname = userDetails.fname;
//  userDetails2.lname = userDetails.lname;
//  userDetails2.username = userDetails.username;
//  userDetails2.password = userDetails.password;
// data.push(newdata);
// console.log(data);
