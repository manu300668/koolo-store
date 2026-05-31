// ==========================
// FIREBASE
// ==========================

const firebaseConfig = {

apiKey:"AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.appspot.com",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2de43851c225c74db"

};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


// ==========================
// CARRITO
// ==========================

let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];


// ==========================
// RENDER CHECKOUT
// ==========================

function renderCheckout(){

const container =
document.getElementById("checkoutCarrito");

const totalEl =
document.getElementById("checkoutTotal");

container.innerHTML = "";

let total = 0;

if(carrito.length === 0){

container.innerHTML =
"<p>Tu carrito está vacío</p>";

totalEl.innerHTML =
"0.00 €";

return;

}

carrito.forEach(item=>{

const subtotal =
item.precio * item.cantidad;

total += subtotal;

container.innerHTML += `

<div class="checkout-item">

<img
src="${item.imagen}"
width="80"
>

<div>

<h3>${item.nombre}</h3>

<p>
${item.precio.toFixed(2)} €
</p>

<p>
Cantidad: ${item.cantidad}
</p>

<p>
Subtotal:
${subtotal.toFixed(2)} €
</p>

</div>

</div>

`;

});

totalEl.innerHTML =
total.toFixed(2) + " €";

}


// ==========================
// CREAR PEDIDO
// ==========================

async function crearPedido(){

if(carrito.length === 0){

alert("Tu carrito está vacío");

return;

}


// CLIENTE

const nombre =
document.getElementById("nombre").value.trim();

const telefono =
document.getElementById("telefono").value.trim();

const direccion =
document.getElementById("direccion").value.trim();

const ciudad =
document.getElementById("ciudad").value.trim();

const codigoPostal =
document.getElementById("codigoPostal").value.trim();

const email =
document.getElementById("email").value.trim();


// VALIDAR

if(
!nombre ||
!telefono ||
!direccion ||
!ciudad ||
!codigoPostal
){

alert("Completa todos los campos");

return;

}


// TOTAL

let total = 0;

carrito.forEach(item=>{

total +=
item.precio * item.cantidad;

});


// REFERENCIA PEDIDO

const referenciaPedido =
"KO-" +
Date.now()
.toString()
.slice(-6);


// GUARDAR PEDIDO

await db.collection("pedidos").add({

referenciaPedido,

cliente: {

nombre,
telefono,
direccion,
ciudad,
codigoPostal,
email

},

productos: carrito,

total,

estado: "pendiente",

fechaCreacion:
firebase.firestore
.FieldValue
.serverTimestamp()

});


// DES
