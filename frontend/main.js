const baseUrl = "http://localhost:5000/";
const fetchUser = () => {
  const url = `${baseUrl}showUsers`;
  //fetch() is called fetch API in javascript that is used to  run HTTP requests and handles responses assynchronously
  // the fetch(url) has a url parameter
  //the fetch().then().then(), it takes two .then(), the second .then() is used to display the records/data
  fetch(url)
    .then(function (r) {
      console.log(r);
      return r.json(); //u have to call return data here to the second .then() for it to work because any data you return here will be proceed by the second.then()
    })
    .then(function (res) {
      console.log(res);
      displayUsers(res);
    })
    .catch(function (err) {
      // displays any connection error to the database, code was gotten from sweetalert afterbuting the sweetalert link in the html file.
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error connection to the data!",
      });
    });
};

// assigns the data tothe tbody element on html
function displayUsers(res) {
  const tBody = document.getElementById("userList");
  let htmlData = "";

  for (i = 0; i < res.length; i++) {
    htmlData += `<tr>`;
    htmlData += `<td> ${res[i].fullname}</td> `;
    htmlData += `<td> ${res[i].username} </td> `;
    htmlData += `<td> ${res[i].contact} </td> `;
    htmlData += `<td> ${res[i].email} </td>`;
    htmlData += `</tr>`;
  }

  tBody.innerHTML = htmlData;
}

fetchUser();
//to  ensure that validation occurs before runnning axios.
function validate() {
  return new Promise((resolve, reject) => {
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("email").value;

    if (
      fullname.length <= 0 ||
      username.length <= 0 ||
      contact.length <= 0 ||
      email.length <= 0
    ) {
      reject("invalid data");
    } else {
      resolve({ fullname, username, contact, email }); //pass in the object because they are already values
    }
  });
}

const send = document.getElementById("send");
send.addEventListener("click", function () {
  validate()
    .then((response) => {
      addUser(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

function addUser(userData) {
  axios
    .post(`${baseUrl}register`, userData)
    .then(function (response) {
      fetchUser();
      if (response.data.message == "invalid" || response.data.message == "dupliicate") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: "Successful",
          title: "Data saved succesfully",
          text: response.data.message,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// to implement response after inputing data on the form, butwe need the response in the console

// const sendData = () => {
//   const url = `${baseUrl}register`;
//   //fetch API can take more than one parameter,the first parameter is the url/ endpoint, the second parameter here is the form details,
//   // in the second parameter you pass in an object that includes the  req method(), in this case its a post method,
//   //the body is the data we are passing which is the PAYLOAD
//   fetch(url, {
//     method: "POST",
//     body: null,
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//   })
//     .then()
//     .catch();
// };
