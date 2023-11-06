
  function createAccount() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let pwd = document.getElementById("password").value;

    let registerBody = {
        "email": email,
        "username": username,
        "password": pwd
    }
  }