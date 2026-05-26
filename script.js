// CONFIG FIREBASE

const firebaseConfig = {

apiKey: "TU_API_KEY",
authDomain: "TU_PROYECTO.firebaseapp.com",
projectId: "TU_PROYECTO",
storageBucket: "TU_PROYECTO.appspot.com",
messagingSenderId: "XXXX",
appId: "XXXX"

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
