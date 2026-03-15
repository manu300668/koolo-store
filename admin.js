const firebaseConfig = {

apiKey:"AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain:"koolo.es.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"TU_PROYECTO.appspot.com",
messagingSenderId:"XXXX",
appId:"XXXX"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


/* CARGAR PEDIDOS */

function cargarPedidos(){

const contenedor = document.getElementById("listaPedidos");

let totalVentas = 0;

db.collection("pedidos").get().then(snapshot=>{

contenedor.innerHTML="";

snapshot.forEach(doc=>{

const p = doc.data();

totalVentas += p.total;

contenedor.innerHTML += `

<div class="pedido">

<h3>${p.cliente}</h3>

<p>${p.email}</p>

<p>Total: ${p.total} €</p>

<p>Dirección: ${p.direccion}</p>

</div>

`;

});

document.getElementById("ventasTotal").innerText = totalVentas + " €";

});

}


/* CARGAR PRODUCTOS */

function cargarProductos(){

const contenedor = document.getElementById("listaProductos");

db.collection("productos").get().then(snapshot=>{

contenedor.innerHTML="";

snapshot.forEach(doc=>{

const p = doc.data();

contenedor.innerHTML += `

<div class="productoAdmin">

<img src="${p.imagen}" width="60">

${p.nombre} - ${p.precio} €

<button onclick="borrarProducto('${doc.id}')">
Eliminar
</button>

</div>

`;

});

});

}


/* CREAR PRODUCTO */

function agregarProducto(){

let nombre = document.getElementById("nombre").value;
let precio = Number(document.getElementById("precio").value);
let imagen = document.getElementById("imagen").value;
let descripcion = document.getElementById("descripcion").value;

db.collection("productos").add({

nombre,
precio,
imagen,
descripcion

})

.then(()=>{

alert("Producto creado");

cargarProductos();

});

}


/* BORRAR PRODUCTO */

function borrarProducto(id){

if(!confirm("Eliminar producto?")) return;

db.collection("productos").doc(id).delete()

.then(()=>{

cargarProductos();

});

}


/* INICIAR */

document.addEventListener("DOMContentLoaded",()=>{

cargarPedidos();

cargarProductos();

});
