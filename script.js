// CONFIG FIREBASE

const firebaseConfig = {



};


// INICIAR FIREBASE

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log("Firebase iniciado");


// CARGAR PRODUCTOS

function cargarProductos(){

const contenedor = document.getElementById("listaProductos");

if(!contenedor){

console.error("No existe #listaProductos");

return;

}

contenedor.innerHTML = "Cargando productos...";

db.collection("productos")

.get()

.then(snapshot=>{

contenedor.innerHTML = "";

if(snapshot.empty){

contenedor.innerHTML = "<p>No hay productos</p>";

console.log("Colección productos vacía");

return;

}

snapshot.forEach(doc=>{

const p = doc.data();

contenedor.innerHTML += `

<div style="border:1px solid #ddd;padding:10px;margin:10px">

<img src="${p.imagen}" width="80">

<h3>${p.nombre}</h3>

<p>${p.precio} €</p>

<button onclick="borrarProducto('${doc.id}')">
Eliminar
</button>

</div>

`;

});

})

.catch(error=>{

console.error("ERROR FIRESTORE:", error);

contenedor.innerHTML = `

<p>Error: ${error.message}</p>

`;

});

}


// AGREGAR PRODUCTO

function agregarProducto(){

const nombre = document.getElementById("nombre").value.trim();

const precio = Number(document.getElementById("precio").value);

const imagen = document.getElementById("imagen").value.trim();

const descripcion = document.getElementById("descripcion").value.trim();


console.log({

nombre,
precio,
imagen,
descripcion

});


if(!nombre || !precio || !imagen){

alert("Completa nombre, precio e imagen");

return;

}


db.collection("productos")

.add({

nombre,
precio,
imagen,
descripcion,
fecha:new Date()

})

.then(()=>{

alert("Producto creado correctamente");

document.getElementById("nombre").value="";
document.getElementById("precio").value="";
document.getElementById("imagen").value="";
document.getElementById("descripcion").value="";

cargarProductos();

})

.catch(error=>{

console.error(error);

alert("Error creando producto: " + error.message);

});

}


// BORRAR

function borrarProducto(id){

if(!confirm("¿Eliminar producto?")) return;

db.collection("productos")

.doc(id)

.delete()

.then(()=>{

alert("Producto eliminado");

cargarProductos();

})

.catch(error=>{

console.error(error);

});

}


// INICIAR

document.addEventListener("DOMContentLoaded", ()=>{

console.log("Admin cargado");

cargarProductos();

});
