
const baseUrl = "http://localhost:5000/";
const fetchUser = () => {
  const url = `${baseUrl}showUsers`;
  //fetch() is called fetch API in javascript that is used to run request and response
  // the fetch(url) has a url parameter
  //the fetch().then().then(), it takes two .then(), the second .then() is used to display the records/data
  fetch(url)
    .then(function (data) {
      console.log(data);
      return data.json(); //u have to call return data here for the second .then() to work
    })
    .then(function (res) {
      console.log(res);
      displayUsers(res);
    })
    .catch(function (err) {
      console.log(err);
    });
};

fetchUser();

function displayUsers(res) {
  const tBody = document.getElementById("userList");
  let htmlData = "";

  for (i = 0; i < res.length; i++) {
    htmlData += `<tr>`;
    htmlData += `<td> ${res[i].cus_id}</td> `;
    htmlData += `<td> ${res[i].first_name} </td> `;
    htmlData += `<td> ${res[i].last_name} </td> `;
    htmlData += `<td> ${res[i].email} </td> `;
    htmlData += `<td> ${res[i].phone_no} </td> `;
    htmlData += `</tr>`;
  }

  tBody.innerHTML = htmlData;
}

const sendData = () => {
  const url = `${baseUrl}register`;
  //fetch API can take more than one parameter,the first parameter is the url/ endpoint, the second parameter here is the form details,
  // in the second parameter you pass in an object that includes the  req method(), in this case its a post method,
  //the body is the data we are passing which is the PAYLOAD
  fetch(url, {
    method: "POST",
    body: null,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then()
    .catch();
};
