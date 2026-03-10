const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain: "koolo.es.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "TU_PROYECTO.appspot.com",
messagingSenderId: "XXXX",
appId: "XXXX"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let carrito = [];


/* CARGAR PRODUCTOS */

function cargarProductos(){

const contenedor = document.getElementById("productosContainer");

contenedor.innerHTML="Cargando...";

db.collection("productos").get()

.then(snapshot=>{

contenedor.innerHTML="";

snapshot.forEach(doc=>{

const p = doc.data();

contenedor.innerHTML+=`

<div class="producto">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p>${p.precio} €</p>

<button onclick="agregarCarrito('${p.nombre}',${p.precio})">
Añadir al carrito
</button>

</div>

`;

});

});

}


/* CARRITO */

function agregarCarrito(nombre,precio){

carrito.push({nombre,precio});

actualizarCarrito();

}


function actualizarCarrito(){

const lista=document.getElementById("listaCarrito");

const total=document.getElementById("totalCarrito");

const contador=document.getElementById("contadorCarrito");

lista.innerHTML="";

let suma=0;

carrito.forEach(p=>{

lista.innerHTML+=`<p>${p.nombre} - ${p.precio} €</p>`;

suma+=p.precio;

});

total.innerText=suma;

contador.innerText=carrito.length;

}


function abrirCarrito(){

document.getElementById("carritoPanel").style.display="block";

}


function cerrarCarrito(){

document.getElementById("carritoPanel").style.display="none";

}


function vaciarCarrito(){

carrito=[];

actualizarCarrito();

}


/* INICIAR */

document.addEventListener("DOMContentLoaded",()=>{

cargarProductos();

});
