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


function crearProducto(){

let nombre=document.getElementById("nombre").value
let precio=parseFloat(document.getElementById("precio").value)
let stock=parseInt(document.getElementById("stock").value)
let imagen=document.getElementById("imagen").value

let tallas=[]

document.querySelectorAll(".talla:checked").forEach(t=>{

tallas.push(t.value)

})

db.collection("productos").add({

nombre,
precio,
stock,
imagen,
tallas

})

.then(()=>{

alert("Producto creado")

cargarProductos()

})

}



function cargarProductos(){

db.collection("productos").get()

.then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let p=doc.data()

html+=`

<div class="productoAdmin">

<div>

<strong>${p.nombre}</strong><br>

Precio: ${p.precio}€<br>

Stock: ${p.stock}

</div>

<button onclick="eliminarProducto('${doc.id}')">
Eliminar
</button>

</div>

`

})

document.getElementById("listaProductos").innerHTML=html

})

}



function eliminarProducto(id){

if(confirm("Eliminar producto?")){

db.collection("productos").doc(id).delete()

.then(()=>{

cargarProductos()

})

}

}



function cargarPedidos(){

db.collection("pedidos").get()

.then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let p=doc.data()

html+=`

<div class="pedidoAdmin">

<strong>Pedido ${doc.id}</strong><br>

Total: ${p.total}€<br>

Productos:

<ul>

${p.productos.map(prod=>`<li>${prod.nombre}</li>`).join("")}

</ul>

</div>

`

})

document.getElementById("listaPedidos").innerHTML=html

})

}


cargarProductos()
cargarPedidos()
