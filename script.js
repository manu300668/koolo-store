const firebaseConfig = {
apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain: "koolo2026.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "koolo2026.firebasestorage.app",
messagingSenderId: "612039099714",
appId: "1:612039099714:web:38d14c2d43851c225c74db"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();


let carrito=[]


function inicio(){

document.getElementById("carrito").style.display="none"

}


function verCarrito(){

document.getElementById("carrito").style.display="block"
mostrarCarrito()

}



function cargarProductos(){

db.collection("productos").get().then(snapshot=>{

let html=""

snapshot.forEach(doc=>{

let p=doc.data()

html+=`

<div class="producto">

<img src="${p.imagen}">
<h3>${p.nombre}</h3>
<p>${p.precio} €</p>

<button onclick="agregarCarrito('${doc.id}','${p.nombre}',${p.precio})">
Comprar
</button>

</div>

`

})

document.getElementById("productos").innerHTML=html

})

}



function agregarCarrito(id,nombre,precio){

carrito.push({id,nombre,precio})

alert("Producto añadido")

}



function mostrarCarrito(){

let html=""

let total=0

carrito.forEach(p=>{

html+=`<p>${p.nombre} - ${p.precio}€</p>`

total+=p.precio

})

html+=`<h3>Total ${total}€</h3>`

document.getElementById("listaCarrito").innerHTML=html

}



function loginCliente(){

let email=prompt("Email")

let pass=prompt("Contraseña")

auth.signInWithEmailAndPassword(email,pass)

.then(()=>{

alert("Login correcto")

})

.catch(()=>{

auth.createUserWithEmailAndPassword(email,pass)

alert("Cuenta creada")

})

}



auth.onAuthStateChanged(user=>{

if(user){

if(user.email==="TUADMIN@gmail.com"){

document.getElementById("adminBtn").style.display="inline"

}

}

})



function cargarRedes(){

db.collection("config").doc("redes").get()

.then(doc=>{

let r=doc.data()

let html=""

if(r.instagram) html+=`<a href="${r.instagram}">Instagram</a>`
if(r.facebook) html+=`<a href="${r.facebook}">Facebook</a>`
if(r.tiktok) html+=`<a href="${r.tiktok}">TikTok</a>`

document.getElementById("redes").innerHTML=html

})

}



function cargarColores(){

db.collection("config").doc("colores").get()

.then(doc=>{

let c=doc.data()

document.documentElement.style.setProperty('--colorPrincipal',c.principal)

})

}



cargarProductos()
cargarRedes()
cargarColores()
