// FIREBASE CONFIG

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


// ADMIN LOGIN SIMPLE

const ADMIN_EMAIL = "eumanu@msn.com";
const ADMIN_PASS = "Manu68.";


function login(){

let email = document.getElementById("email").value;
let pass = document.getElementById("password").value;

if(email === ADMIN_EMAIL && pass === ADMIN_PASS){

document.getElementById("loginBox").style.display="none";
document.getElementById("adminPanel").style.display="block";

loadProducts();
loadOrders();

}else{

document.getElementById("loginError").innerText="Credenciales incorrectas";

}

}



////////////////////////////////////////////////////////
// PRODUCTOS
////////////////////////////////////////////////////////


function addProduct(){

let name=document.getElementById("name").value;
let price=document.getElementById("price").value;
let image=document.getElementById("image").value;

db.collection("products").add({

name:name,
price:price,
image:image

})
.then(()=>{

alert("Producto añadido");

loadProducts();

});

}



function loadProducts(){

db.collection("products").get().then(snapshot=>{

let html="";

snapshot.forEach(doc=>{

let p=doc.data();

html+=`

<div class="productAdmin">

<img src="${p.image}" width="60">

<b>${p.name}</b>

€${p.price}

<button onclick="deleteProduct('${doc.id}')">Eliminar</button>

</div>

`;

});

document.getElementById("productsAdmin").innerHTML=html;

});

}



function deleteProduct(id){

db.collection("products").doc(id).delete().then(()=>{

loadProducts();

});

}



////////////////////////////////////////////////////////
// PEDIDOS
////////////////////////////////////////////////////////


function loadOrders(){

db.collection("orders").get().then(snapshot=>{

let html="";

snapshot.forEach(doc=>{

let o=doc.data();

html+=`

<div class="order">

<b>Pedido:</b> ${doc.id}<br>
<b>Total:</b> €${o.total}<br>
<b>Estado:</b> ${o.status}

<button onclick="setSent('${doc.id}')">
Marcar enviado
</button>

</div>

`;

});

document.getElementById("ordersAdmin").innerHTML=html;

});

}



function setSent(id){

db.collection("orders").doc(id).update({

status:"Enviado"

}).then(()=>{

loadOrders();

});

}
