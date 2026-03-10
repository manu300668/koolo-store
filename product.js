// CONFIG FIREBASE

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


// OBTENER ID PRODUCTO DE LA URL

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let productoActual;


// CARGAR PRODUCTO

db.collection("productos").doc(id).get().then(doc=>{

const p = doc.data();

productoActual = p;

document.getElementById("imagenProducto").src = p.imagen;
document.getElementById("nombreProducto").innerText = p.nombre;
document.getElementById("precioProducto").innerText = p.precio + " €";
document.getElementById("descripcionProducto").innerText = p.descripcion || "";

});


// CARRITO LOCAL

function agregarCarrito(){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

carrito.push(productoActual);

localStorage.setItem("carrito",JSON.stringify(carrito));

alert("Producto añadido al carrito");

}
