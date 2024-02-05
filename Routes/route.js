const express = require("express");
const { homefun, list } = require("./Controller/ctt");
//when express.Router() is assigned to a variable, it becomes an object, so you export it in an object form
const routerManager = express.Router(); //express has a methods that helps in routing

routerManager.get("/", homefun);
routerManager.get("/", list);


module.exports = {
  routerManager,
};// exported routerManageras an object, meaning that it has to be imported using destructing as an object