// ==========================
// FIREBASE CONFIG
// ==========================

const firebaseConfig = {

apiKey:"AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.appspot.com",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2de43851c225c74db"

};


// ==========================
// INIT FIREBASE
// ==========================

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// ==========================
// CARRITO
// ==========================

let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];


// ==========================
// DOM READY
// ==========================

document.addEventListener(
"DOMContentLoaded",
async () => {

actualizarContador();

renderCarrito();

const productosContainer =
document.getElementById(
"productosContainer"
);

productosContainer.innerHTML = `

<h2>

Cargando productos...

</h2>

`;

try {

const snapshot =
await db
.collection("productos")
.get();

productosContainer.innerHTML = "";

if(snapshot.empty){

productosContainer.innerHTML = `

<h2>

No hay productos disponibles

</h2>

`;

return;

}

snapshot.forEach(doc => {

const producto = doc.data();

productosContainer.innerHTML += `

<div class="producto">

<img
src="${producto.imagen}"
alt="${producto.nombre}"
>

<h3>

${producto.nombre.trim()}

</h3>

<p class="precio">

${producto.precio} €

</p>

<p>

${producto.descripcion.trim()}

</p>

<button
onclick="agregarCarrito(
'${doc.id}',
'${producto.nombre}',
${producto.precio},
'${producto.imagen}'
)"
>

Comprar

</button>

</div>

`;

});

}catch(error){

console.error(error);

productosContainer.innerHTML = `

<h2>

Error Firebase

</h2>

<p>

${error.message}

</p>

`;

}

});


// ==========================
// AGREGAR CARRITO
// ==========================

function agregarCarrito(
id,
nombre,
precio,
imagen
){

carrito.push({

id,
nombre,
precio,
imagen

});

guardarCarrito();

renderCarrito();

actualizarContador();

alert("Producto añadido al carrito");

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
// CONTADOR
// ==========================

function actualizarContador(){

const contador =
document.getElementById(
"contadorCarrito"
);

if(contador){

contador.textContent =
carrito.length;

}

}


// ==========================
// RENDER CARRITO
// ==========================

function renderCarrito(){

const lista =
document.getElementById(
"listaCarrito"
);

const total =
document.getElementById(
"totalCarrito"
);

if(!lista || !total) return;

lista.innerHTML = "";

if(carrito.length === 0){

lista.innerHTML = `

<p>

El carrito está vacío

</p>

`;

total.textContent = "0";

return;

}

let totalPrecio = 0;

carrito.forEach(
(producto,index) => {

totalPrecio +=
Number(producto.precio);

lista.innerHTML += `

<div class="item-carrito">

<div>

<strong>

${producto.nombre}

</strong>

<p>

${producto.precio} €

</p>

</div>

<button
onclick="eliminarProducto(${index})"
>

X

</button>

</div>

`;

});

total.textContent =
totalPrecio.toFixed(2);

}


// ==========================
// ELIMINAR PRODUCTO
// ==========================

function eliminarProducto(index){

carrito.splice(index,1);

guardarCarrito();

renderCarrito();

actualizarContador();

}


// ==========================
// ABRIR CARRITO
// ==========================

function abrirCarrito(){

document
.getElementById(
"carritoPanel"
)
.classList.remove(
"oculto"
);

}


// ==========================
// CERRAR CARRITO
// ==========================

function cerrarCarrito(){

document
.getElementById(
"carritoPanel"
)
.classList.add(
"oculto"
);

}


// ==========================
// VACIAR CARRITO
// ==========================

function vaciarCarrito(){

carrito = [];

guardarCarrito();

renderCarrito();

actualizarContador();

}
