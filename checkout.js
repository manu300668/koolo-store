// FIREBASE

const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",

authDomain: "koolo2026.firebaseapp.com",

projectId: "koolo2026",

storageBucket: "koolo2026.appspot.com",

messagingSenderId: "612039099714",

appId: ""1:612039099714:web:38d14c2de43851c225c74db

};


// INICIAR FIREBASE

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// CARRITO

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaResumen = document.getElementById("listaResumen");

const totalHTML = document.getElementById("total");

let total = 0;


// MOSTRAR PRODUCTOS

carrito.forEach(producto => {

listaResumen.innerHTML += `

<div class="itemResumen">

<p>${producto.nombre}</p>

<p>${producto.precio} €</p>

</div>

`;

total += producto.precio;

});


// TOTAL

totalHTML.innerText = total.toFixed(2);


// CONFIRMAR PEDIDO

function confirmarPedido(){

const nombre = document.getElementById("nombre").value;

const email = document.getElementById("email").value;

const direccion = document.getElementById("direccion").value;


// VALIDACIÓN

if(!nombre || !email || !direccion){

alert("Completa todos los campos");

return;

}


// CARRITO VACÍO

if(carrito.length === 0){

alert("El carrito está vacío");

return;

}


// GUARDAR PEDIDO EN FIREBASE

db.collection("pedidos").add({

cliente: nombre,

email: email,

direccion: direccion,

productos: carrito,

total: total,

metodoPago: "Bizum",

telefonoBizum: "+34654056391",

estado: "pendiente_confirmacion",

fecha: new Date()

})

.then(() => {

localStorage.removeItem("carrito");

alert("Pedido enviado correctamente");

window.location = "index.html";

})

.catch(error => {

console.error(error);

alert("Error al guardar el pedido");

});

}
