// CONFIGURACIÓN FIREBASE

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "koolo2026.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "koolo2026.firebasestorage.app",
  messagingSenderId: "612039099714",
  appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// CARRITO

let cart = [];

const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");


// ABRIR CARRITO

cartIcon.onclick = () => {

cartPanel.classList.toggle("open");

};



// CARGAR PRODUCTOS DESDE FIREBASE

function loadProducts(){

const container = document.getElementById("productsList");

container.innerHTML = "";

db.collection("productos").get().then(snapshot => {

snapshot.forEach(doc => {

const p = doc.data();

container.innerHTML += `

<div class="product">

<img src="${p.imagen}" alt="${p.nombre}">

<h3>${p.nombre}</h3>

<p>€${p.precio}</p>

<button onclick="addToCart('${p.nombre}', ${p.precio})">
Añadir al carrito
</button>

</div>

`;

});

});

}

loadProducts();



// AÑADIR PRODUCTO AL CARRITO

function addToCart(nombre, precio){

cart.push({

nombre: nombre,
precio: precio

});

updateCart();

}



// ACTUALIZAR CARRITO

function updateCart(){

cartItems.innerHTML = "";

let total = 0;

cart.forEach(item => {

total += item.precio;

cartItems.innerHTML += `

<p>${item.nombre} - €${item.precio}</p>

`;

});

cartTotal.innerText = total;

cartCount.innerText = cart.length;

renderPaypal(total);

}



// BOTÓN PAYPAL

function renderPaypal(total){

document.getElementById("paypal-button-container").innerHTML = "";

if(total === 0) return;

paypal.Buttons({

createOrder: function(data, actions){

return actions.order.create({

purchase_units: [{

amount: {

value: total.toString()

}

}]

});

},

onApprove: function(data, actions){

return actions.order.capture().then(function(details){

// GUARDAR PEDIDO EN FIREBASE

db.collection("pedidos").add({

cliente: details.payer.name.given_name,

email: details.payer.email_address,

total: total,

productos: cart,

fecha: new Date()

});

alert("Pago completado correctamente");

cart = [];

updateCart();

});

}

}).render("#paypal-button-container");

}
