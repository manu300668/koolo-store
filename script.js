un// CONFIG FIREBASE

const firebaseConfig = {

apiKey:"AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.appspot.com",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2de43851c225c74db"

};


// INICIAR FIREBASE

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// TEST

document.addEventListener("DOMContentLoaded", () => {

const productos = document.getElementById("productosContainer");

productos.innerHTML = "<h2>Conectando con Firebase...</h2>";

db.collection("productos")

.get()

.then(snapshot => {

if(snapshot.empty){

productos.innerHTML = `

<h2>No hay productos en Firebase</h2>

`;

return;

}

productos.innerHTML = "<h2>Firebase conectado ✅</h2>";

snapshot.forEach(doc => {

const p = doc.data();

productos.innerHTML += `

<div style="padding:20px;border:1px solid #ccc;margin:20px;background:white">

<h3>${p.nombre}</h3>

<p>${p.precio} €</p>

</div>

`;

});

})

.catch(error => {

productos.innerHTML = `

<h2>Error Firebase ❌</h2>

<p>${error.message}</p>

`;

console.error(error);

});

});
