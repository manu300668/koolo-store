const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain: "koolo.es.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "TU_PROYECTO.appspot.com",
messagingSenderId: "XXXX",
appId: "XXXX"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


function comprar(){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if(carrito.length==0){

alert("Carrito vacío");

return;

}

let nombre = document.getElementById("nombre").value;
let email = document.getElementById("email").value;
let direccion = document.getElementById("direccion").value;

let total = 0;

carrito.forEach(p=>{

total += p.precio;

});


db.collection("pedidos").add({

cliente:nombre,
email:email,
direccion:direccion,
productos:carrito,
total:total,
fecha:new Date()

})

.then(()=>{

localStorage.removeItem("carrito");

alert("Pedido realizado");

window.location="index.html";

});

}
