const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain: "koolo2026.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "koolo2026.appspot.com",
messagingSenderId: "612039099714",
appId: "1:612039099714:web:38d14c2d43851c225c74db"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();



////////////////////////////////////////////////
//// SUBIR PRODUCTO
////////////////////////////////////////////////

function subirProducto(){

let nombre=document.getElementById("nombre").value
let precio=document.getElementById("precio").value

let file=document.getElementById("imagenFile").files[0]

let ref=storage.ref("productos/"+file.name)

ref.put(file).then(()=>{

ref.getDownloadURL().then(url=>{

db.collection("productos").add({

nombre,
precio,
imagen:url

})
.then(()=>{

alert("Producto creado")

cargarProductos()

})

})

})

}



////////////////////////////////////////////////
//// CARGAR PRODUCTOS
////////////////////////////////////////////////

function cargarProductos(){

db.collection("productos").get().then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let p=doc.data()

html+=`

<div class="productoAdmin">

<img src="${p.imagen}">

<span>${p.nombre} - ${p.precio}€</span>

<button onclick="eliminarProducto('${doc.id}')">Eliminar</button>

</div>

`

})

document.getElementById("productosAdmin").innerHTML=html

})

}



////////////////////////////////////////////////
//// ELIMINAR PRODUCTO
////////////////////////////////////////////////

function eliminarProducto(id){

db.collection("productos").doc(id).delete()

.then(()=>{

cargarProductos()

})

}



////////////////////////////////////////////////
//// CONFIGURACIÓN
////////////////////////////////////////////////

function guardarConfig(){

let color=document.getElementById("colorPrincipal").value

let instagram=document.getElementById("instagram").value
let facebook=document.getElementById("facebook").value
let tiktok=document.getElementById("tiktok").value

db.collection("config").doc("tienda").set({

color,
instagram,
facebook,
tiktok

})
.then(()=>{

alert("Configuración guardada")

})

}



////////////////////////////////////////////////
//// PEDIDOS
////////////////////////////////////////////////

function cargarPedidos(){

db.collection("pedidos").get().then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let p=doc.data()

html+=`

<div class="pedidoAdmin">

Pedido: ${doc.id} <br>
Total: ${p.total}€

</div>

`

})

document.getElementById("listaPedidos").innerHTML=html

})

}



cargarProductos()
cargarPedidos()
