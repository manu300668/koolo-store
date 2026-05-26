// CONFIG FIREBASE

const firebaseConfig = {

apiKey: "AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain: "koolo2026.firebaseapp.com",
projectId: "koolo2026",
storageBucket: "koolo2026.appspot.com",
messagingSenderId: "612039099714",
appId: "1:612039099714:web:38d14c2d43851c22574db"

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
