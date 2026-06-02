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

let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];


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

if(!container) return;

container.innerHTML = "";

let total = 0;
let totalItems = 0;


// carrito vacío

if(carrito.length === 0){

container.innerHTML =

`<p>Tu carrito está vacío</p>`;

if(totalEl){
totalEl.innerText =
"0.00 €";
}

if(cartCount){
cartCount.innerText = 0;
}

return;

}


// render productos

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

<img
src="${item.imagen}"
alt="${item.nombre}"
>

<div class="checkout-info">

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

<div class="checkout-actions">

<button
onclick="restarProducto(${index})"
>
−
</button>

<button
onclick="sumarProducto(${index})"
>
+
</button>

<button
onclick="eliminarProducto(${index})"
>
🗑
</button>

</div>

</div>

`;

});


// total

if(totalEl){

totalEl.innerText =
total.toFixed(2) + " €";

}


// contador header

if(cartCount){

cartCount.innerText =
totalItems;

}

guardarCarrito();

}


// ==========================
// SUMAR PRODUCTO
// ==========================

function sumarProducto(index){

carrito[index].cantidad++;

guardarCarrito();

renderCheckout();

}


// ==========================
// RESTAR PRODUCTO
// ==========================

function restarProducto(index){

if(carrito[index].cantidad > 1){

carrito[index].cantidad--;

}else{

carrito.splice(index,1);

}

guardarCarrito();

renderCheckout();

}


// ==========================
// ELIMINAR PRODUCTO
// ==========================

function eliminarProducto(index){

carrito.splice(index,1);

guardarCarrito();

renderCheckout();

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


// DATOS CLIENTE

const nombre =
document
.getElementById(
"nombre"
)
.value
.trim();

const telefono =
document
.getElementById(
"telefono"
)
.value
.trim();

const direccion =
document
.getElementById(
"direccion"
)
.value
.trim();

const ciudad =
document
.getElementById(
"ciudad"
)
.value
.trim();

const codigoPostal =
document
.getElementById(
"codigoPostal"
)
.value
.trim();

const email =
document
.getElementById(
"email"
)
.value
.trim();


// validar

if(
!nombre ||
!telefono ||
!direccion ||
!ciudad ||
!codigoPostal
){

mostrarToast(
"Completa todos los campos"
);

return;

}


// total pedido

let total = 0;

carrito.forEach(item=>{

total +=
(Number(item.precio)||0)
*
(Number(item.cantidad)||0);

});


// referencia pedido

const referenciaPedido =

"KO-" +

Date.now()
.toString()
.slice(-6);


// guardar pedido firebase

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


// mensaje

mostrarToast(
"Pedido realizado"
);


// volver home

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
