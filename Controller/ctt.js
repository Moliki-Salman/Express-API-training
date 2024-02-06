const fs = require("fs")
const data = require("../model/datasource")

const homefun = (req, res) => {
  res.send("Home Page");
};
const list = (req, res) => {
  res.send("list page");
};
const createUser = (req, res) => {
  //eg when there is a form that has firstName, lastname etc as the properties of the form in an HTML form, you pick the property name of the form and put all the properties inside an object
  const userDetails = {
    fname: req.body.firstName,
    lname: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  };
  data.push(userDetails)
  res.send("details received");
  console.log(data);
let readFile = fs.readFileSync("data.json", "utf-8");
let newRead =JSON.parse(readFile)
// const template = Object.create(userDetails)
newRead.push(data)
fs.writeFileSync("data.json", JSON.stringify(newRead));

};


module.exports = {
  homefun,
  list,
  createUser,
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