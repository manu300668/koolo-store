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

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// ==========================
// CARRITO (estructura simple)
// ==========================

let carrito = [];


// ==========================
// CARGAR PRODUCTOS
// ==========================

function cargarProductos(){

const container =
document.getElementById("productosContainer");

db.collection("productos")
.onSnapshot(snapshot=>{

container.innerHTML = "";

snapshot.forEach(doc=>{

const p = doc.data();

if(p.stock <= 0) return;

container.innerHTML += `

<div class="producto">

<img src="${p.imagen}" />

<h3>${p.nombre}</h3>

<p>${p.descripcion || ""}</p>

<p>${p.precio.toFixed(2)} €</p>

<p>Stock: ${p.stock}</p>

<button onclick="sumarProducto('${doc.id}')">
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

if(!doc.exists) return;

const producto = doc.data();

const index =
carrito.findIndex(p => p.id === id);

if(index !== -1){

if(carrito[index].cantidad >= producto.stock){
alert("No hay stock suficiente");
return;
}

carrito[index].cantidad++;

}else{

carrito.push({

id:id,
nombre:producto.nombre,
precio:producto.precio,
imagen:producto.imagen,
cantidad:1

});

}
const cartCount =
document.getElementById("cartCount");

if(cartCount){

let total = 0;

carrito.forEach((item,index)=>{

const precio =
Number(item.precio) || 0;

const cantidad =
Number(item.cantidad) || 0;

const subtotal =
precio * cantidad;

total += subtotal;
});

cartCount.innerText =
totalItems;
}
guardarCarrito();
renderCarrito();

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
// GUARDAR CARRITO
// ==========================

function guardarCarrito(){

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

}


// ==========================
// RENDER CARRITO
// ==========================

function renderCarrito(){

const container =
document.getElementById("carritoContainer");

const totalEl =
document.getElementById("totalCarrito");

if(!container) return;

container.innerHTML = "";

let total = 0;

carrito.forEach((item,index)=>{

const subtotal =
item.precio * item.cantidad;

total += subtotal;

container.innerHTML += `

<div class="item">

<img src="${item.imagen}" width="70">

<div>

<h4>${item.nombre}</h4>

<p>${item.precio.toFixed(2)} €</p>

<p>Cantidad: ${item.cantidad}</p>

</div>

<div>

<button onclick="restarProducto(${index})">-</button>

<button onclick="sumarProducto('${item.id}')">+</button>

<button onclick="eliminarProducto(${index})">🗑</button>

</div>

</div>

`;

});

if(totalEl){
totalEl.innerText = total.toFixed(2) + " €";
}

guardarCarrito();

}


// ==========================
// IR A CHECKOUT
// ==========================

function irCheckout(){

if(carrito.length === 0){
alert("Carrito vacío");
return;
}

window.location.href = "checkout.html";

}


// ==========================
// INICIO
// ==========================

document.addEventListener("DOMContentLoaded",()=>{

// cargar carrito guardado
const saved =
localStorage.getItem("carrito");

if(saved){
carrito = JSON.parse(saved);
}

cargarProductos();
renderCarrito();

});
