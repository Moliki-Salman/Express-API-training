const fs = require("fs");
const data = require("../model/datasource");
const { pool, s_users, insertUser_query } = require("../model/getpool");

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

const createUser = async (req, res) => {
  const userDetails = {
    fullname: req.body.fullname,
    username: req.body.username,
    contact: req.body.contact,
    email: req.body.email,
  };
  try {
    if (req.body.username.length <= 4) {
      res.status(200).json({ message: "invalid username" });
    } else {
      const rest = await addUsers(userDetails);

      if (rest.errno == 1062) {
        //1062 is an sql error no that indicates duplicate data entry.
        res.status(200).json({ message: "duplicate" });
      } else {
        res.status(200).json({ message: "successful" });
      }
    }
  } catch (err) {
    res.status(200).json(rest);
    // console.log(err);
    // return err;
  }
};

function getConnection() {
  //promise to check for connection, promise helps to return result
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
}

//  query function willonly runbased on the connection
function runQuary(connection, sql_query, values) {
  return new Promise((resolve, reject) => {
    // the .query method always require a callback function
    connection.query(sql_query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const addUsers = async (data) => {
  const connection = await getConnection(); //to execute the getConnection() first b4 anything
  try {
    const result = await runQuary(connection, insertUser_query, [
      data.fullname,
      data.username,
      data.contact,
      data.email,
    ]);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

//HERE WE HAVE BOTH OUR getConnection AND connection.query in a single function and it workd perfectly by given the response in the browswer console
// const insertUsers = async (res, userDetails) => {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.log("error in connection");
//       console.log(err);
//       return;
//     }

//     connection.query(
//       insertUser_query,
//       [
//         userDetails.fullname,
//         userDetails.username,
//         userDetails.contact,
//         userDetails.email,
//       ],
//       (err, result) => {
//         connection.release();
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   });
// };

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
