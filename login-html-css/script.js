async function register(registerBody) {     
  
  console.log(registerBody);
  console.log(JSON.stringify(registerBody));

  fetch("http://localhost:8000/api/v1/auth/register", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerBody),
    cache: 'no-cache'
  }).then(resonse => {

    if (resonse.ok) {
      console.log("reponse ok 200");

      return resonse.json();
    }

  }).then(json => {
    
    console.log(json);

    if (json.hasOwnProperty("token")) {
      console.log(json.token);
      location.replace("/login-html-css/app-hub.html")
    }
    else if (json.hasOwnProperty("ErrorMessage")) {

      console.log(json.ErrorMessage);
    }
  }).catch(error => {

    console.log(error);
  });
}

async function login(loginBody) {     
  
  console.log(loginBody);
  console.log(JSON.stringify(loginBody));

  const response = await fetch("http://localhost:8000/api/v1/auth/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginBody),
    cache: 'no-cache'
  }).then(resonse => {

    if (resonse.ok) {

      return resonse.json();
    }

  }).then(json => {

    if (json.hasOwnProperty("token")) {
      
      location.replace("/login-html-css/app-hub.html")
    }
    else if (json.hasOwnProperty("ErrorMessage")) {

      console.log(json.ErrorMessage);
    }
  }).catch(error => {

    console.log(error);
  });
}

function createAccount() {
  let email = document.querySelector("#email").value;
  let username = document.querySelector("#username").value;
  let pwd = document.querySelector("#password").value;

  let registerBody = {
      "email": email,
      "username": username,
      "password": pwd
  }

  register(registerBody);  
}

function loginUser() {
  let email = document.querySelector("#email").value;
  let pwd = document.querySelector("#password").value;

  let loginBody = {
      "email": email,
      "password": pwd
  }
  
  login(loginBody);  
}