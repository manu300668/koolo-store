// FIREBASE CONFIG

const firebaseConfig = {

  apiKey:"AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.appspot.com",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2de43851c225c74db"

};


// INICIAR FIREBASE

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// CUANDO CARGUE LA PÁGINA

document.addEventListener("DOMContentLoaded", () => {

const productosContainer =
document.getElementById("productosContainer");


// MENSAJE CARGANDO

productosContainer.innerHTML = `

<h2>Cargando productos...</h2>

`;


// LEER PRODUCTOS FIRESTORE

db.collection("productos")

.get()

.then(snapshot => {

productosContainer.innerHTML = "";


// SI NO HAY PRODUCTOS

if(snapshot.empty){

productosContainer.innerHTML = `

<h2>No hay productos disponibles</h2>

`;

return;

}


// CREAR PRODUCTOS

snapshot.forEach(doc => {

const producto = doc.data();

productosContainer.innerHTML += `

<div class="producto">

<img src="${producto.imagen}" alt="${producto.nombre}">

<h3>${producto.nombre}</h3>

<p>${producto.precio} €</p>

<a href="product.html?id=${doc.id}">

<button>Ver producto</button>

</a>

</div>

`;

});

})

.catch(error => {

console.error(error);

productosContainer.innerHTML = `

<h2>Error Firebase</h2>

<p>${error.message}</p>

`;

});

});




// CARRITO SIMPLE

function abrirCarrito(){

document
.getElementById("carritoPanel")
.classList.remove("oculto");

}


function cerrarCarrito(){

document
.getElementById("carritoPanel")
.classList.add("oculto");

}


function vaciarCarrito(){

localStorage.removeItem("carrito");

location.reload();

}
