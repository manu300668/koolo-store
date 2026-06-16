
// ==========================
// FIREBASE
// ==========================

const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain: "koolo2026.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "koolo2026.appspot.com",
messagingSenderId: "612039099714",
appId: "1:612039099714:web:38d14c2de43851c225c74db"

};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


// ==========================
// CARRITO
// ==========================

carrito = [];
localStorage.removeItem("carrito");

}

function volverTienda(){
  window.location.href = "index.html";
}

// ==========================
// GUARDAR CARRITO
// ==========================

function guardarCarrito(){

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

}


// ==========================
// RENDER CHECKOUT
// ==========================

function renderCheckout(){

const container =
document.getElementById("checkoutCarrito");

const totalEl =
document.getElementById("checkoutTotal");

const cartCount =
document.getElementById("cartCount");

container.innerHTML = "";

let total = 0;
let totalItems = 0;


// vacío

if(carrito.length === 0){

container.innerHTML =
"<p>Tu carrito está vacío</p>";

totalEl.innerText =
"0.00 €";

if(cartCount){
cartCount.innerText = 0;
}

return;

}


// productos

carrito.forEach((item,index)=>{

const precio =
Number(item.precio) || 0;

const cantidad =
Number(item.cantidad) || 0;

const subtotal =
precio * cantidad;

total += subtotal;
totalItems += cantidad;

container.innerHTML += `

<div class="checkout-item">

<img src="${item.imagen}">

<div>

<h3>${item.nombre}</h3>

<p>Talla: ${item.talla}</p>

<p>${precio.toFixed(2)} €</p>

<p>Cantidad: ${cantidad}</p>

<p>Subtotal: ${subtotal.toFixed(2)} €</p>

</div>

<div class="checkout-actions">

<button onclick="restar(${index})">-</button>

<button onclick="sumar(${index})">+</button>

<button onclick="eliminar(${index})">🗑</button>

</div>

</div>

`;

});

totalEl.innerText = total.toFixed(2) + " €";

if(cartCount){
cartCount.innerText = totalItems;
}

guardarCarrito();

}


// ==========================
// ACCIONES
// ==========================

function sumar(i){
carrito[i].cantidad++;
guardarCarrito();
renderCheckout();
}

function restar(i){
if(carrito[i].cantidad > 1){
carrito[i].cantidad--;
} else {
carrito.splice(i,1);
}
guardarCarrito();
renderCheckout();
}

function eliminar(i){
carrito.splice(i,1);
guardarCarrito();
renderCheckout();
}


// ==========================
// CREAR PEDIDO
// ==========================

async function crearPedido(){

if(carrito.length === 0) return;


// datos cliente

const nombre =
document.getElementById("nombre").value;

const telefono =
document.getElementById("telefono").value;

const direccion =
document.getElementById("direccion").value;

const ciudad =
document.getElementById("ciudad").value;

const codigoPostal =
document.getElementById("codigoPostal").value;

const email =
document.getElementById("email").value;


// total

let total = 0;

carrito.forEach(i=>{
total += i.precio * i.cantidad;
});


// pedido ID

const referencia =
"koolo-" + Date.now().toString().slice(-6);


// guardar pedido

await db.collection("pedidos").add({

referenciaPedido: referencia,

cliente:{
nombre,
telefono,
direccion,
ciudad,
codigoPostal,
email
},

productos: carrito,

total,

estado: "Pendiente de pago",

fecha: Date.now()

});


// descontar stock

for(let item of carrito){

await db.collection("productos")
.doc(item.id)
.update({

stock:
firebase.firestore.FieldValue.increment(-item.cantidad);

});

}


// limpiar

localStorage.removeItem("carrito");

carrito = [];

renderCheckout();

// generar número pedido

// mostrar pantalla confirmación
document.getElementById("checkoutCarrito").style.display = "none";
document.getElementById("pedidoConfirmado").style.display = "block";

// mostrar número pedido
document.getElementById("numeroPedido").innerText = referencia;

// link whatsapp
document.getElementById("whatsappLink").href =
"https://wa.me/34654056391?text=Hola%20he%20realizado%20el%20pedido%20" + referencia;

// limpiar carrito visualmente
carrito = [];
localStorage.removeItem("carrito");
}// 
  function volverTienda(){
window.location.href = "index.html";
  
}


// ==========================
// INIT
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  console.log("INIT CHECKOUT");
  console.log(carrito);
  renderCheckout();
});
