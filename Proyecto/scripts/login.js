
onload = () => {
    document.getElementById("return").addEventListener("click", returnToIndex);
    document.getElementById("login-button").addEventListener("click", login);
}

function returnToIndex() {
    window.location.replace("index.html");
}

function login() {
    let error = document.getElementById("error-message");

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let passwords = getAllPasswords();

    let userIndex = getUserIndex(user);
    console.log(userIndex);
    if (userIndex != undefined) {
        console.log("user ok")
        if (pass == passwords[userIndex]) {
            returnToIndex();
        } else {
            console.log("pass mal")
            error.innerText = "Contraseña incorrecta";
            error.style.display = "block";
        }
    } else {
        console.log("user mal")
        error.innerText = "Usuario no encontrado";
        error.style.display = "block";
    }
}

function getUserIndex(username) {
    let users = getAllUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i] == username) {
            return i;
        }
    }
}

function getAllUsers() {
    let cookies = document.cookie.split('; ');
    let users = [];

    console.log(cookies)
    cookies.forEach(c => {
        let [key, value] = c.split('=');
        if (key === "users") {
            console.log(value.split('@'))
            users = value.split('@');
        }
    });

    return users;
}

function getAllPasswords() {
    let cookies = document.cookie.split('; ');
    let passwords = [];

    cookies.forEach(cookie => {
        let [key, value] = cookie.split('=');
        if (key === "passwords") {
            passwords = value.split('@');
        }
    });

    return passwords;
}
