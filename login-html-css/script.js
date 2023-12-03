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

    let failedLoginElement = document.querySelector("#failed-login");
    if (json.hasOwnProperty("token")) {
      
      failedLoginElement.style.display = 'hidden';
      location.replace("/login-html-css/app-hub.html")
    }
    else if (json.hasOwnProperty("ErrorMessage")) {
      
      failedLoginElement.innerHTML = json.ErrorMessage;
      failedLoginElement.style.display = 'block';

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

  if (!validateInput()) {

    return;
  }

  let registerBody = {
      "email": email,
      "username": username,
      "password": pwd
  }

  register(registerBody);  
}

function loginUser() {

  if (!validateInput()) {

    return;
  }

  let email = document.querySelector("#email").value;
  let pwd = document.querySelector("#password").value;

  let loginBody = {
      "email": email,
      "password": pwd
  }
  
  login(loginBody);  
}

function logout() {

  location.replace("/login-html-css/index.html")  
}

function validateEmail(email) {

  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function validateInput() {

  let invalidEmailElement = document.querySelector("#invalid-email");
  let emailElement = document.querySelector("#email")
  let email = emailElement.value;

  let pwdElement = document.querySelector("#password")
  let invalidPwdElement = document.querySelector("#invalid-password");
  let pwd = pwdElement.value;

  let usernameElement = document.querySelector("#username")

  let valid = true;

  if (usernameElement !== null) {

    let invalidUsernameElement = document.querySelector("#invalid-username");
    let username = usernameElement.value;

    if (username.length === 0) {

      invalidUsernameElement.style.display = 'block';
      usernameElement.style.borderColor = 'red';
      valid = false;
    }
    else {
  
      invalidUsernameElement.style.display = 'none';
      usernameElement.style.borderColor = 'black';
    }
  }

  if (email.length === 0) {

    invalidEmailElement.style.display = 'block';
    emailElement.style.borderColor = 'red';
    valid = false;
  }
  else {

    invalidEmailElement.style.display = 'none';
    emailElement.style.borderColor = 'black';
  }

  if (pwd.length < 4 || pwd.length > 20) {
    
    invalidPwdElement.style.display = 'block';
    pwdElement.style.borderColor = 'red';
    valid = false;
  }
  else {

    invalidPwdElement.style.display = 'none';
    pwdElement.style.borderColor = 'black';
  }

  if (!validateEmail(email)) {

    invalidEmailElement.style.display = 'block';
    emailElement.style.borderColor = 'red';
    valid = false;
  }
  else {

    invalidEmailElement.style.display = 'none';
    emailElement.style.borderColor = 'black';
  }
  
  return valid;
}