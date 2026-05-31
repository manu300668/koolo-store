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
// CARRITO
// ==========================

let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];


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
// CARGAR PRODUCTOS
// ==========================

function cargarProductos(){

const container =
document.getElementById(
"productosContainer"
);

db.collection("productos")
.onSnapshot(snapshot=>{

container.innerHTML = "";

snapshot.forEach(doc=>{

const producto = doc.data();

if(producto.stock <= 0) return;

container.innerHTML += `

<div class="producto">

<img
src="${producto.imagen}"
alt="${producto.nombre}"
>

<h3>${producto.nombre}</h3>

<p>${producto.descripcion || ""}</p>

<p class="precio">

${producto.precio.toFixed(2)} €

</p>

${
producto.stock <= 3
?

`<p style="color:orange;">
⚠️ Pocas unidades
</p>`

:

""
}

<button
onclick="agregarCarrito(
'${doc.id}'
)"
>

Comprar

</button>

</div>

`;

});

});

}


// ==========================
// AGREGAR AL CARRITO
// ==========================

async function agregarCarrito(id){

const doc =
await db.collection("productos")
.doc(id)
.get();

if(!doc.exists){

alert("Producto no encontrado");

return;

}

const producto = doc.data();

const existe =
carrito.find(p=>p.id===id);

if(existe){

if(existe.cantidad >= producto.stock){

alert(
"No hay más stock disponible"
);

return;

}

existe.cantidad++;

}else{

carrito.push({

id:id,
nombre:producto.nombre,
precio:producto.precio,
imagen:producto.imagen,
cantidad:1

});

}

guardarCarrito();

renderCarrito();

alert("Producto añadido");

}


// ==========================
// RENDER CARRITO
// ==========================

function renderCarrito(){

const lista =
document.getElementById(
"carritoContainer"
);

const totalEl =
document.getElementById(
"totalCarrito"
);

if(!lista) return;

lista.innerHTML = "";

let total = 0;

if(carrito.length === 0){

lista.innerHTML =
"<p>Tu carrito está vacío</p>";

totalEl.innerHTML =
"0.00 €";

return;

}

carrito.forEach((item,index)=>{

const subtotal =
item.precio * item.cantidad;

total += subtotal;

lista.innerHTML += `

<div class="item-carrito">

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

Cantidad:
${item.cantidad}

</p>

</div>

<div>

<button
onclick="restarCantidad(${index})"
>

−

</button>

<button
onclick="sumarCantidad(${index})"
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

totalEl.innerHTML =
total.toFixed(2) + " €";

guardarCarrito();

}


// ==========================
// SUMAR
// ==========================

async function sumarCantidad(index){

const item = carrito[index];

const doc =
await db.collection("productos")
.doc(item.id)
.get();

const stock =
doc.data().stock;

if(item.cantidad >= stock){

alert("No hay más stock");

return;

}

item.cantidad++;

renderCarrito();

}


// ==========================
// RESTAR
// ==========================

function restarCantidad(index){

if(carrito[index].cantidad > 1){

carrito[index].cantidad--;

}else{

carrito.splice(index,1);

}

renderCarrito();

}


// ==========================
// ELIMINAR
// ==========================

function eliminarProducto(index){

carrito.splice(index,1);

renderCarrito();

}


// ==========================
// CHECKOUT
// ==========================

function irCheckout(){

if(carrito.length === 0){

alert("Tu carrito está vacío");

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

cargarProductos();

renderCarrito();

}
);
