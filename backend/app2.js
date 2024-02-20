const express = require("express");
const app = express();
//we need cors because we need to push some data to the users
const cors = require("cors");
/*body parser is used when you are accepting data from the user*/
const bodyParser = require("body-parser")
const logic = require("./Controller/logic");
const port = 5000;
const { routerManager } = require("./Routes/route");

//app.use is a middleware that runs automatically, middlewares do not need permissions to run, no need of a request for it to run/execute. the momment you start running your server, app.use executes.
// make sure you call cors() before you call on any routes to be executed.
app.use(cors());

/* bodyParser.urlencoded used to  encode whatever that will be passed to be decrypted to make it save;
-bodyParser.urlencoded method enables you to capture anything that is in the form.
 -EXPLANATION FOR extended:false =>when you pass/send a req.body,you pass this data/req as an object, thus the object will contain key pair values;
  so when you set the extended:false, you can get access to the content or the value as a string or an array which makes working with the data easy.
  but when the set to extended:true, the data could be of any type, usually used when you are uploading a file. but when you are uploading a string, you set extended:false
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 //because we are sending a json data , we use bodyParser.json()
app.use("/",routerManager);

app.get("/", (req, res) => {
  res.send("data");
});

app.listen(port, function () {
  console.log(`server running on port: ${port}`);
});
