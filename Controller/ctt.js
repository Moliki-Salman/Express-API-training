const homefun = (req, res) => {
  res.send("Home Page");
};
const list = (req, res) => {
  res.send("list page");
};


module.exports = {
  homefun,
  list,
  createUser,
};