
onload = () => {
    document.getElementById("return").addEventListener("click", returnToIndex);
    document.getElementById("register-button").addEventListener("click", register);
}

function returnToIndex() {
    window.location.replace("index.html");
}

function register() {
    let error = document.getElementById("error-message");

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let tfln = document.getElementById("tlfn").value;

    // Check de usuario
    let userFormat = /^[a-zA-Z0-9_-]{3,}$/
    if (!userFormat.test(user)) {
        error.innerText = "Usuario no valido";
        error.style.display = "block";
        return
    } else {
        error.style.display = "none";
    }

    // Check de contraseña
    let passFormat = /^[a-zA-Z0-9_-]{8,}$/
    if (!passFormat.test(pass)) {
        error.innerText = "Contraseña no valida (mínimo 8 carácteres)";
        error.style.display = "block";
        return
    } else {
        error.style.display = "none";
    }

    // Check de email
    let emailFormat = /^.*@{1}.*\.[a-zA-Z]{2,3}/;
    if (!emailFormat.test(email)) {
        error.innerText = "Email no valido";
        error.style.display = "block";
        return
    } else {
        error.style.display = "none";
    }

    // Check numero
    let tlfnFormat = /^[679]\d{8}$/;
    if (!tlfnFormat.test(tfln)) {
        error.innerText = "Numero de telefono no valido";
        error.style.display = "block";
        return
    } else {
        error.style.display = "none";
    }


    // Comprobar que el usuario exista
    let users = getAllUsers();
    let userUnico = true;
    users.forEach(u => {
        console.log(u)
        if (u == user) {
            userUnico = false;
        }
    });

    if (userUnico) {
        addCookies(user, pass);
        returnToIndex();
    } else {
        error.innerText = "El usuario ya está registrado, utilice otro";
        error.style.display = "block";
        return
    }
}

function addCookies(user, pass) {
    // Añadir el usuario
    let users = getAllUsers();
    let userString = "";

    users.forEach(u => {
        userString = userString.concat(u + "@");
    });
    userString = userString.concat(user);

    // Añadir la contraseña
    let passwords = getAllPasswords();
    let passString = "";

    passwords.forEach(p => {
        passString = passString.concat(p + "@");
    });
    passString = passString.concat(pass);

    console.log(users)
    console.log(userString)
    console.log("=========")
    console.log(passwords)
    console.log(passString)


    // Añadir a las cookies
    document.cookie = `users=${userString}; path=/`;
    document.cookie = `passwords=${passString}; path=/`;
    document.cookie = `cart=; path=/`;
    document.cookie = `logged=true; path=/`;
}

function getAllUsers() {
    let cookies = document.cookie.split('; ');
    let users = [];

    for (let i = 0; i < cookies.length; i++) {
        let key = cookies[i].split('=')[0];
        let value = cookies[i].split('=')[1];
        if (key == "users") {
            users = value.split('@');
        }
    }

    return users;
}

function getAllPasswords() {
    let cookies = document.cookie.split('; ');
    let passwords = [];

    for (let i = 0; i < cookies.length; i++) {
        let key = cookies[i].split('=')[0];
        let value = cookies[i].split('=')[1];
        if (key == "passwords") {
            passwords = value.split('@');
        }
    }

    return passwords;
}


function reset() {
    document.cookie = `users=; path=/`;
    document.cookie = `passwords=; path=/`;
}
