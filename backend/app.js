const express = require("express"); // importexport
const app = express();  // created an instance of the express./ created an object out of the express or creating a server.

const logic = require("./Controller/logic")
const port =3400;


app.get("/", logic.home) // callback function do not need to be called with the bracket() when used in the position of a callback function.

app.get("/users", logic.users)  // created an object out of the express module

app.listen(port, function() {
console.log(`server running on port: ${port}`);
})
// you use promise when you want to implement some level of asynchronous programming
//accessing a variable  is difficult in the receiving function in the case of  call back function
//nvc achitecture