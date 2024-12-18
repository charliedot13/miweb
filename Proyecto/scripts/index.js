var cart = [];
var logged = false;

onload = () => {
    document.getElementById("login-button").addEventListener("click", login);
    document.getElementById("register-button").addEventListener("click", registry);
    document.getElementById('cart-items').addEventListener("dblclick", removeItemFromCart);
    document.getElementById('empty-cart').addEventListener("click", resetCart);

    const carrito = document.querySelector(".carrito");
    carrito.addEventListener('click', e => addToCart(e));
    
    cart = getCartCookie();
    loadCartData();
    
    logged = getUserLoggedStatus();
}

function addToCart(event) {    
    let button = event.target.id;
    if (button === "") {
        return;
    }

    if (!logged) {
        alert("Debes iniciar sesión para añadir elementos");
        return;
    }
    
    alert("Has añadido el artículo al carrito");
    // Cargar el carrito a las cookies
    addItemToCart(button);
}

function addItemToCart(itemId) {
    let cartStrign = "";

    cart.forEach(i => {
        cartStrign = cartStrign.concat(i + "@");
    });
    cartStrign = cartStrign.concat(itemId);

    cart.push(itemId); // Añadir al array del carrito
    document.cookie = `cart=${cartStrign}; path=/`; // Añadir a la cookie
    loadCartData(); // Cargar el ticket
}

function removeItemFromCart(event) {
    let article = event.target.className;
    let articleId;

    // Borrar del array
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] === article) {
            articleId = i;
        }
    }

    cart.splice(articleId, 1); // Elimina un elemento del array, desde el indice

    // Guardar cookie actualizada
    let cartStrign = "";

    cart.forEach(i => {
        cartStrign = cartStrign.concat(i + "@");
    });
    document.cookie = `cart=${cartStrign}; path=/`; // Añadir a la cookie

    loadCartData(); // Mostrar ticket actualizado
}

function getCartCookie() {
    let cookies = document.cookie.split('; ');
    let cart2 = [];

    console.log(cookies)
    cookies.forEach(c => {
        let [key, value] = c.split('=');
        if (key === "cart") {
            cart2 = value.split('@');
        }
    });

    return cart2;
}

function loadCartData() {
    let totalPrice = 0;
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = "";

    cart.forEach(i => {
        switch (i) {
            case 'art1': 
                totalPrice += 500;
                cartItems.innerHTML += "<p class='art1'>PS5 - 500€</p>";
                break;
            case 'art2':
                totalPrice += 500;
                cartItems.innerHTML += "<p class='art2'>Monitor 240Hz - 500€</p>";
                break;
            case 'art3':
                totalPrice += 15;
                cartItems.innerHTML += "<p class='art3'>Teclado mecánico cherry red - 15€</p>";
                break;
            case 'art4':
                totalPrice += 2500;
                cartItems.innerHTML += "<p class='art4'>Entradas Final NBA - 2500€</p>";
                break;
            default:
                // console.log("Error, item no indexado: " + i);
                break;
        }
    });
    document.getElementById('cart-total').innerHTML = `Total: ${totalPrice}€`;
}

function registry() {
    window.location.replace("register.html");
}

function login() {
    window.location.replace("login.html");
}

function getUserLoggedStatus() {
    let cookies = document.cookie.split('; ');
    let userLogged = false

    cookies.forEach(c => {
        let [key, value] = c.split('=');
        if (key === "logged") {
            userLogged = value === "true";
        }
    });

    return userLogged;
}

function resetCart() {
    cart = []; // Reinicializar array
    document.cookie = `cart=; path=/`; // Borrar todo
    loadCartData(); // Actualizar lista
}
