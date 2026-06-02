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
JSON.parse(localStorage.getItem("carrito"))
|| [];


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

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},1800);

}


// ==========================
// CARGAR PRODUCTOS
// ==========================

function cargarProductos(){

const container =
document.getElementById(
"productosContainer"
);

if(!container) return;

db.collection("productos")
.onSnapshot(snapshot=>{

container.innerHTML = "";

snapshot.forEach(doc=>{

const producto =
doc.data();

const stock =
Number(producto.stock || 0);

container.innerHTML += `

<div class="producto">

<img
src="${producto.imagen}"
alt="${producto.nombre}"
>

<h3>
${producto.nombre}
</h3>

<p>
${producto.descripcion || ""}
</p>

<p class="precio">
${Number(producto.precio).toFixed(2)} €
</p>

<p>
Stock: ${stock}
</p>

<button
onclick="sumarProducto('${doc.id}')"
>

Comprar

</button>

</div>

`;

});

});

}


// ==========================
// SUMAR PRODUCTO
// ==========================

async function sumarProducto(id){

const doc =
await db.collection("productos")
.doc(id)
.get();

if(!doc.exists){

mostrarToast(
"Producto no encontrado"
);

return;

}

const producto =
doc.data();

const stock =
Number(producto.stock || 0);

const index =
carrito.findIndex(
p => p.id === id
);

if(index !== -1){

if(
carrito[index].cantidad
>= stock
){

mostrarToast(
"No hay más stock"
);

return;

}

carrito[index].cantidad++;

}else{

carrito.push({

id: id,

nombre:
producto.nombre,

precio:
Number(producto.precio),

imagen:
producto.imagen,

cantidad: 1

});

}


// guardar

guardarCarrito();


// render badge

renderCarrito();


// toast

mostrarToast(
"Producto añadido"
);


// animación carrito

const cart =
document.querySelector(
".cart-header"
);

if(cart){

cart.classList.add(
"bump"
);

setTimeout(()=>{

cart.classList.remove(
"bump"
);

},250);

}

}


// ==========================
// RESTAR PRODUCTO
// ==========================

function restarProducto(index){

if(
carrito[index].cantidad > 1
){

carrito[index].cantidad--;

}else{

carrito.splice(index,1);

}

guardarCarrito();
renderCarrito();

}


// ==========================
// ELIMINAR PRODUCTO
// ==========================

function eliminarProducto(index){

carrito.splice(index,1);

guardarCarrito();
renderCarrito();

}


// ==========================
// RENDER CARRITO HEADER
// ==========================

function renderCarrito(){

const cartCount =
document.getElementById(
"cartCount"
);

if(!cartCount) return;

let totalItems = 0;

carrito.forEach(item=>{

totalItems +=
Number(item.cantidad) || 0;

});

cartCount.innerText =
totalItems;

guardarCarrito();

}


// ==========================
// IR CHECKOUT
// ==========================

function irCheckout(){

if(carrito.length === 0){

mostrarToast(
"El carrito está vacío"
);

return;

}

window.location.href =
"checkout.html";

}


// ==========================
// INICIO
// ==========================

document.addEventListener(
"DOMContentLoaded",
()=>{

renderCarrito();
cargarProductos();

}
);
