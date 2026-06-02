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

const db =
firebase.firestore();


// ==========================
// CARRITO
// ==========================

let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];


// ==========================
// TOAST
// ==========================

function mostrarToast(texto){

const toast =
document.createElement("div");

toast.className =
"toast-cart";

toast.innerText =
texto;

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},1800);

}


// ==========================
// RENDER CHECKOUT
// ==========================

function renderCheckout(){

const container =
document.getElementById(
"checkoutCarrito"
);

const totalEl =
document.getElementById(
"checkoutTotal"
);

const cartCount =
document.getElementById(
"cartCount"
);

container.innerHTML = "";

let total = 0;
let totalItems = 0;

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

carrito.forEach(item=>{

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

<img
src="${item.imagen}"
alt="${item.nombre}"
>

<div>

<h3>
${item.nombre}
</h3>

<p>
${precio.toFixed(2)} €
</p>

<p>
Cantidad:
${cantidad}
</p>

<p>
Subtotal:
${subtotal.toFixed(2)} €
</p>

</div>

</div>

`;

});

totalEl.innerText =
total.toFixed(2) + " €";

if(cartCount){
cartCount.innerText =
totalItems;
}

}


// ==========================
// CREAR PEDIDO
// ==========================

async function crearPedido(){

if(carrito.length === 0){

mostrarToast(
"Carrito vacío"
);

return;

}

const nombre =
document
.getElementById(
"nombre"
)
.value.trim();

const telefono =
document
.getElementById(
"telefono"
)
.value.trim();

const direccion =
document
.getElementById(
"direccion"
)
.value.trim();

const ciudad =
document
.getElementById(
"ciudad"
)
.value.trim();

const codigoPostal =
document
.getElementById(
"codigoPostal"
)
.value.trim();

const email =
document
.getElementById(
"email"
)
.value.trim();

if(
!nombre ||
!telefono ||
!direccion ||
!ciudad ||
!codigoPostal
){

mostrarToast(
"Completa los campos"
);

return;

}

let total = 0;

carrito.forEach(item=>{

total +=
(Number(item.precio)||0)
*
(Number(item.cantidad)||0);

});

const referenciaPedido =
"KO-" +
Date.now()
.toString()
.slice(-6);


// guardar pedido

await db
.collection("pedidos")
.add({

referenciaPedido,

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

estado: "pendiente",

fechaCreacion:
firebase.firestore
.FieldValue
.serverTimestamp()

});


// descontar stock

for(const item of carrito){

await db
.collection("productos")
.doc(item.id)
.update({

stock:
firebase.firestore
.FieldValue
.increment(
-item.cantidad
)

});

}


// limpiar carrito

localStorage.removeItem(
"carrito"
);

carrito = [];

mostrarToast(
"Pedido realizado"
);

setTimeout(()=>{

window.location.href =
"index.html";

},1500);

}


// ==========================
// INIT
// ==========================

document.addEventListener(
"DOMContentLoaded",
()=>{

renderCheckout();

}
);
