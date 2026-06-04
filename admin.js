// ==========================
// FIREBASE
// ==========================

const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_OVySCdC05mxE",
authDomain: "koolo2026.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "koolo2026.appspot.com",
messagingSenderId: "612039099714",
appId: "1:612039099714:web:38d14c2de43851c225c74db"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// ==========================
// LOGIN SIMPLE
// ==========================

function login(){

const user =
document.getElementById("user").value;

const pass =
document.getElementById("pass").value;


// credenciales (puedes cambiarlas)

if(user === "koolo" && pass === "Manu68."){

document.getElementById("loginBox").style.display = "none";

document.getElementById("adminPanel").style.display = "block";

cargarAdmin();

} else {

alert("Error login");

}

}


// ==========================
// CARGAR PANEL
// ==========================

function cargarAdmin(){

// PRODUCTOS

db.collection("productos").onSnapshot(snap=>{

const cont =
document.getElementById("productosAdmin");

cont.innerHTML = "";

snap.forEach(doc=>{

const p = doc.data();

cont.innerHTML += `

<div class="checkout-card">

<h3>${p.nombre}</h3>

<p>${p.precio} €</p>

<p>Stock: ${p.stock}</p>

<button onclick="borrarProd('${doc.id}')">
Eliminar
</button>

</div>

`;

});

});

function crearProducto(){

const nombre =
document.getElementById("nombre").value;

const precio =
Number(document.getElementById("precio").value);

const stock =
Number(document.getElementById("stock").value);

const file =
document.getElementById("imagenFile").files[0];


if(!file){
alert("Selecciona imagen");
return;
}


// referencia storage

const storageRef =
firebase.storage().ref(
"productos/" + file.name
);


// subir imagen

storageRef.put(file).then(()=>{

storageRef.getDownloadURL().then(url=>{


// guardar en firestore

db.collection("productos").add({

nombre,
precio,
stock,
imagen: url,
tallas:["S","M","L","XL"]

});


alert("Producto creado");

});

});

}
// PEDIDOS

db.collection("pedidos").onSnapshot(snap=>{

const cont =
document.getElementById("pedidosAdmin");

cont.innerHTML = "";

snap.forEach(doc=>{

const p = doc.data();

cont.innerHTML += `

<div class="checkout-card">

<h3>${p.referenciaPedido || "Pedido"}</h3>

<p>${p.total} €</p>

<p>${p.estado}</p>

</div>

`;

});

});

}


// ==========================
// BORRAR PRODUCTO
// ==========================

function borrarProd(id){

db.collection("productos").doc(id).delete();

}
