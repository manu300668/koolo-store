// FIREBASE

const firebaseConfig = {

apiKey:"AIzaSyA7orSwoJ5XcDd-ABRj_o_OVySCdC05mxE",
authDomain:"koolo2026.firebaseapp.com",
projectId:"koolo2026",
storageBucket:"koolo2026.appspot.com",
messagingSenderId:"612039099714",
appId:"1:612039099714:web:38d14c2de43851c225c74db"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", async () => {

const productosContainer =
document.getElementById("productosContainer");

productosContainer.innerHTML =
"<h2>Cargando productos...</h2>";

try {

const snapshot =
await db.collection("productos").get();

productosContainer.innerHTML = "";

if(snapshot.empty){

productosContainer.innerHTML = `

<h2>No hay productos disponibles</h2>

`;

return;

}

snapshot.forEach(doc => {

const producto = doc.data();

productosContainer.innerHTML += `

<div class="producto">

<img
src="${producto.imagen}"
alt="${producto.nombre}"
class="producto-img"
>

<h3>${producto.nombre}</h3>

<p class="precio">

${producto.precio} €

</p>

<p>

${producto.descripcion}

</p>

<button class="btn-comprar">

Comprar

</button>

</div>

`;

});

}catch(error){

productosContainer.innerHTML = `

<h2>Error Firebase</h2>

<p>${error.message}</p>

`;

console.error(error);

}

});
