// function addUser(username, age) {
//   //create a dataStructure
//   const dataStruc = {
//     username: null,
//     age: null,

//   };

//   const data3 = fs.readFileSync("data.json", "utf-8");
//   let newData3 = JSON.parse(data3);
//   console.log(newData3);
//   let prop = Object.create(dataStruc);
//   prop.username = username;
//   prop.age = age;
//   newData3.push(prop);

//   //write into datasource.json filr using fs.writefileSync\

//   fs.writeFileSync("datasource.json", JSON.stringify(newData3));
// }

function addUser(req, res) {
  //create a dataStructure
  const dataStruc = {
    username: null,
    age: null,
  };

  const data3 = fs.readFileSync("data.json", "utf-8");
  let newData3 = JSON.parse(data3);
  console.log(newData3);
  let prop = Object.create(dataStruc);
  prop.username = username;
  prop.age = age;
  newData3.push(prop);

  //write into datasource.json filr using fs.writefileSync\
  fs.writeFileSync("datasource.json", JSON.stringify(newData3));
}


module.exports = addUser;
