// CONFIG FIREBASE

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

let cart = JSON.parse(localStorage.getItem("cart")) || [];


const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");


// ABRIR CARRITO

cartIcon.onclick = () => {

cartPanel.classList.toggle("open");

};



// CARGAR PRODUCTOS

function loadProducts(){

const container = document.getElementById("productsList");

container.innerHTML = "";

db.collection("productos").get().then(snapshot=>{

snapshot.forEach(doc=>{

const p = doc.data();

container.innerHTML += `

<div class="product">

<img src="${p.imagen}" alt="${p.nombre}">

<h3>${p.nombre}</h3>

<p>€${p.precio}</p>

<button onclick="addToCart('${p.nombre}',${p.precio})">
Añadir al carrito
</button>

</div>

`;

});

});

}

loadProducts();




// AÑADIR AL CARRITO

function addToCart(nombre,precio){

const item = cart.find(p => p.nombre === nombre);

if(item){

item.cantidad++;

}else{

cart.push({
nombre:nombre,
precio:precio,
cantidad:1
});

}

saveCart();

updateCart();

}



// GUARDAR CARRITO

function saveCart(){

localStorage.setItem("cart", JSON.stringify(cart));

}



// ELIMINAR PRODUCTO

function removeItem(nombre){

cart = cart.filter(p => p.nombre !== nombre);

saveCart();

updateCart();

}



// CAMBIAR CANTIDAD

function changeQty(nombre,delta){

const item = cart.find(p => p.nombre === nombre);

item.cantidad += delta;

if(item.cantidad <= 0){

removeItem(nombre);

return;

}

saveCart();

updateCart();

}



// ACTUALIZAR CARRITO

function updateCart(){

cartItems.innerHTML = "";

let total = 0;

let count = 0;

cart.forEach(item=>{

total += item.precio * item.cantidad;

count += item.cantidad;

cartItems.innerHTML += `

<div class="cart-item">

<p>${item.nombre}</p>

<p>€${item.precio}</p>

<div class="qty">

<button onclick="changeQty('${item.nombre}',-1)">-</button>

<span>${item.cantidad}</span>

<button onclick="changeQty('${item.nombre}',1)">+</button>

</div>

<button onclick="removeItem('${item.nombre}')">
❌
</button>

</div>

`;

});

cartTotal.innerText = total;

cartCount.innerText = count;

renderPaypal(total);

}

updateCart();




// PAYPAL

function renderPaypal(total){

document.getElementById("paypal-button-container").innerHTML = "";

if(total === 0) return;

paypal.Buttons({

createOrder:function(data,actions){

return actions.order.create({

purchase_units:[{

amount:{ value: total.toString() }

}]

});

},

onApprove:function(data,actions){

return actions.order.capture().then(function(details){

// GUARDAR PEDIDO

db.collection("pedidos").add({

cliente: details.payer.name.given_name,

email: details.payer.email_address,

productos: cart,

total: total,

fecha: new Date()

});

alert("Pago completado correctamente");

cart = [];

saveCart();

updateCart();

});

}

}).render("#paypal-button-container");

}
