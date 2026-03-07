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
const auth = firebase.auth();

let carrito=[];

function mostrarProductos(){

document.getElementById("carrito").style.display="none";

}

function verCarrito(){

document.getElementById("carrito").style.display="block";

mostrarCarrito();

}


function cargarProductos(){

db.collection("productos").get()

.then(snapshot=>{

let html="";

snapshot.forEach(doc=>{

let p=doc.data();

html+=`

<div class="producto">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p>${p.precio}€</p>

<button onclick="agregarCarrito('${p.nombre}',${p.precio})">
Comprar
</button>

</div>

`;

});

document.getElementById("productos").innerHTML=html;

});

}


function agregarCarrito(nombre,precio){

carrito.push({nombre,precio});

document.getElementById("cartCount").innerText=carrito.length;

}


function mostrarCarrito(){

let html="";
let total=0;

carrito.forEach(p=>{

html+=`<p>${p.nombre} - ${p.precio}€</p>`;

total+=p.precio;

});

html+=`<h3>Total: ${total}€</h3>`;

document.getElementById("listaCarrito").innerHTML=html;

paypalCheckout(total);

}


function paypalCheckout(total){

paypal.Buttons({

createOrder:function(data,actions){

return actions.order.create({

purchase_units:[{

amount:{value:total}

}]

});

},

onApprove:function(data,actions){

return actions.order.capture().then(function(details){

guardarPedido(total);

alert("Pago completado");

});

}

}).render('#paypal-button-container');

}


function guardarPedido(total){

db.collection("pedidos").add({

total,
fecha:new Date()

});

}


function login(){

let email=prompt("Email");
let pass=prompt("Contraseña");

auth.signInWithEmailAndPassword(email,pass)

.catch(()=>{

auth.createUserWithEmailAndPassword(email,pass);

});

}

cargarProductos();
