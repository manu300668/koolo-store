// CONFIG FIREBASE
const firebaseConfig = {
  // PON TUS DATOS FIREBASE
  apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
  authDomain: "koolo.es.firebaseapp.com",
  projectId: "koolo2026",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// CARGAR PRODUCTOS EN ADMIN
function cargarProductos(){

const contenedor = document.getElementById("listaProductos");

contenedor.innerHTML = "Cargando...";

db.collection("productos").get().then(snapshot=>{

contenedor.innerHTML="";

snapshot.forEach(doc=>{

const p = doc.data();

contenedor.innerHTML += `
<div style="border:1px solid #ccc;padding:10px;margin:10px">

<img src="${p.imagen}" width="80">

<h3>${p.nombre}</h3>

<p>${p.precio} €</p>

<button onclick="borrarProducto('${doc.id}')">
Eliminar
</button>

</div>
`;

});

});

}


// AGREGAR PRODUCTO
function agregarProducto(){

const nombre = document.getElementById("nombre").value;
const precio = Number(document.getElementById("precio").value);
const imagen = document.getElementById("imagen").value;

if(!nombre || !precio || !imagen){

alert("Completa todos los campos");

return;

}

db.collection("productos").add({

nombre,
precio,
imagen

})

.then(()=>{

alert("Producto agregado");

cargarProductos();

});

}


// BORRAR PRODUCTO
function borrarProducto(id){

if(!confirm("Eliminar producto?")) return;

db.collection("productos").doc(id).delete()

.then(()=>{

alert("Producto eliminado");

cargarProductos();

});

}


// INICIAR
document.addEventListener("DOMContentLoaded", ()=>{

cargarProductos();

});
